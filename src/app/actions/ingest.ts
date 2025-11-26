"use server";

import { db } from "@/db";
import { embeddings } from "@/db/schema";

// Segédfüggvény: Embedding generálás
async function getEmbedding(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Nincs API kulcs");

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    }),
  });

  if (!response.ok) throw new Error("OpenAI Embedding Hiba");
  const data = await response.json();
  return data.data[0].embedding;
}

// Segédfüggvény: PDF Szöveg kinyerése (pdf2json)
async function extractPdfText(buffer: Buffer): Promise<string> {
  const PDFParser = require("pdf2json");
  const parser = new PDFParser(null, 1);

  return new Promise((resolve, reject) => {
    parser.on("pdfParser_dataError", (errData: any) =>
      reject(errData.parserError)
    );
    parser.on("pdfParser_dataReady", (pdfData: any) => {
      const raw = parser.getRawTextContent();
      resolve(raw);
    });
    parser.parseBuffer(buffer);
  });
}

// Segédfüggvény: Darabolás
function chunkText(text: string, chunkSize: number = 1000): string[] {
  if (!text) return [];
  const chunks: string[] = [];
  let currentChunk = "";

  // Mondatokra bontás
  const sentences = text.replace(/([.?!])\s+(?=[A-Z])/g, "$1|").split("|");

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
    currentChunk += sentence + " ";
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks;
}

// --- JAVÍTOTT TISZTÍTÓ FÜGGVÉNY ---
function cleanText(text: string): string {
  if (!text) return "";
  try {
    text = decodeURIComponent(text);
  } catch (e) {
    // Ha nem sikerül dekódolni, marad az eredeti
  }

  return (
    text
      // KRITIKUS JAVÍTÁS: Null byte-ok (\0) eltávolítása, mert ezek ölik meg a Postgres-t
      .replace(/\u0000/g, "")
      // Egyéb vezérlőkarakterek szűrése (biztonság kedvéért)
      .replace(/[\u0001-\u0008\u000B-\u001F]/g, "")
      .replace(/----------------Page \(\d+\) Break----------------/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}
// -----------------------------------

// --- FŐ FELDOLGOZÓ ---
export async function processDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "Nincs fájl" };

    console.log(`Feldolgozás: ${file.name} (${file.type})`);

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    // 1. TARTALOM KINYERÉSE
    if (file.type === "application/pdf") {
      console.log("PDF feldolgozása (pdf2json)...");
      rawText = await extractPdfText(buffer);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const mammoth = require("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else if (file.type === "text/plain") {
      rawText = buffer.toString("utf-8");
    } else {
      return { success: false, error: "Nem támogatott fájltípus" };
    }

    // 2. TISZTÍTÁS
    const cleanedText = cleanText(rawText);
    if (cleanedText.length < 10)
      return {
        success: false,
        error: "Nem sikerült olvasható szöveget kinyerni.",
      };

    const chunks = chunkText(cleanedText);
    console.log(
      `Szöveg kinyerve. Hossz: ${cleanedText.length}, Darabok: ${chunks.length}`
    );

    // 3. MENTÉS
    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);

      await db.insert(embeddings).values({
        content: chunk,
        embedding: embedding,
        metadata: {
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
        },
      });
    }

    console.log("✅ Sikeres mentés!");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Ingest Hiba:", error);
    // Részletesebb hibaüzenet a kliensnek
    return {
      success: false,
      error: "Adatbázis hiba: " + (error.message || "Ismeretlen"),
    };
  }
}
