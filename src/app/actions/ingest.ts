"use server";

import { db } from "@/db";
import { embeddings } from "@/db/schema";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";

// FONTOS: Kivettük innen a pdf-parse és mammoth importokat!
// Csak ott töltjük be őket, ahol használjuk (Lazy Load).

// Segédfüggvény: Szöveg darabolása (Chunking)
function chunkText(text: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  // Egyszerűsített darabolás
  if (!text) return [];
  const sentences = text.replace(/([.?!])\s+(?=[A-Z])/g, "$1|").split("|");

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = "";
    }
    currentChunk += sentence + " ";
  }
  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Segédfüggvény: Szöveg tisztítása
function cleanText(text: string): string {
  if (!text) return "";
  return text
    .replace(/\s+/g, " ") // Felesleges szóközök, sortörések törlése
    .trim();
}

// A Fő Server Action
export async function processDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "Nincs fájl feltöltve" };
    }

    console.log(`Feldolgozás indítása: ${file.name} (${file.type})`);

    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    // --- DYNAMIC IMPORTS (Csak akkor töltjük be, ha kell) ---
    if (file.type === "application/pdf") {
      // Csak PDF esetén töltjük be a modult
      const pdf = require("pdf-parse");
      const pdfData = await pdf(buffer);
      rawText = pdfData.text;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Csak DOCX esetén importáljuk a mammoth-ot
      const mammoth = await import("mammoth");
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else if (file.type === "text/plain") {
      // TXT esetén semmilyen külső lib nem töltődik be -> Nincs DOMMatrix hiba!
      rawText = buffer.toString("utf-8");
    } else {
      return { success: false, error: "Nem támogatott fájltípus" };
    }

    // 2. Tisztítás és Darabolás
    const cleanedText = cleanText(rawText);

    if (cleanedText.length < 10) {
      return {
        success: false,
        error: "A fájl nem tartalmaz olvasható szöveget.",
      };
    }

    const chunks = chunkText(cleanedText);
    console.log(`Szöveg kinyerve. Darabok száma: ${chunks.length}`);

    // 3. Embedding generálás és Mentés
    for (const chunk of chunks) {
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: chunk,
      });

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

    return { success: true };
  } catch (error: any) {
    console.error("Hiba a dokumentum feldolgozása közben:", error);
    // Jobb hibaüzenet visszaadása a kliensnek
    return {
      success: false,
      error: error.message || "Ismeretlen szerver hiba",
    };
  }
}
