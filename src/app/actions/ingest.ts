"use server";

import { db } from "@/db";
import { embeddings } from "@/db/schema";
import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import pdf from "pdf-parse";
import mammoth from "mammoth";

// Segédfüggvény: Szöveg darabolása (Chunking)
// Ez azért kell, mert az AI modelleknek van egy limitje (context window),
// és a keresés is pontosabb, ha kisebb darabokban tároljuk az infót.
function chunkText(text: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  let currentChunk = "";

  // Egyszerűsített darabolás mondatok/bekezdések mentén
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
  return text
    .replace(/\s+/g, " ") // Felesleges szóközök, sortörések törlése
    .trim();
}

// A Fő Server Action, amit a frontend hív meg
export async function processDocument(formData: FormData) {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, error: "Nincs fájl feltöltve" };
    }

    console.log(`Feldolgozás indítása: ${file.name} (${file.type})`);

    // 1. Fájl tartalmának kinyerése
    const buffer = Buffer.from(await file.arrayBuffer());
    let rawText = "";

    if (file.type === "application/pdf") {
      const pdfData = await pdf(buffer);
      rawText = pdfData.text;
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else if (file.type === "text/plain") {
      rawText = buffer.toString("utf-8");
    } else {
      return { success: false, error: "Nem támogatott fájltípus" };
    }

    // 2. Tisztítás és Darabolás
    const cleanedText = cleanText(rawText);
    const chunks = chunkText(cleanedText);

    console.log(`Szöveg kinyerve. Darabok száma: ${chunks.length}`);

    // 3. Embedding generálás és Mentés
    // Minden darabot elküldünk az OpenAI-nak, hogy csináljon belőle vektort
    for (const chunk of chunks) {
      // Vektor generálása (OpenAI text-embedding-3-small modell)
      const { embedding } = await embed({
        model: openai.embedding("text-embedding-3-small"),
        value: chunk,
      });

      // Mentés az adatbázisba
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

    console.log(`Sikeresen mentve: ${file.name}`);
    return { success: true };
  } catch (error: any) {
    console.error("Hiba a dokumentum feldolgozása közben:", error);
    return { success: false, error: error.message };
  }
}
