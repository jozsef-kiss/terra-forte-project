// scripts/sync-knowledge.ts
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { sql } from "drizzle-orm"; // Ez kell a törléshez
import fs from "fs";
import path from "path";

// Környezeti változók betöltése
config({ path: ".env.local" });

const dbUrl = process.env.POSTGRES_URL;
if (!dbUrl) {
  throw new Error("Nincs beállítva a POSTGRES_URL a .env.local fájlban!");
}

const sqlClient = neon(dbUrl);
const db = drizzle(sqlClient, { schema });

// Embedding generáló függvény
async function getEmbedding(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("Nincs beállítva az OPENAI_API_KEY!");

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

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API Hiba: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function main() {
  console.log("🚀 Tudásbázis szinkronizálása (hu.json)...");

  const fileName = "hu.json";

  try {
    // 1. LÉPÉS: RÉGI ADATOK TÖRLÉSE
    // Ez a rész biztosítja, hogy ne halmozódjanak fel az adatok.
    // A metadata egy JSON mező, így speciális SQL szintaxissal szűrünk rá.
    console.log(`🗑️  Korábbi '${fileName}' adatok törlése...`);

    await db
      .delete(schema.embeddings)
      .where(sql`metadata->>'fileName' = ${fileName}`);

    console.log("✅ Törlés sikeres.");

    // 2. LÉPÉS: JSON BEOLVASÁSA ÉS FELDOLGOZÁSA
    const dictPath = path.join(process.cwd(), "src/dictionaries/hu.json");

    if (!fs.existsSync(dictPath)) {
      throw new Error(`A fájl nem található: ${dictPath}`);
    }

    const dictContent = fs.readFileSync(dictPath, "utf-8");
    const dict = JSON.parse(dictContent);

    // Rekurzívan kinyerjük a szövegeket
    const chunks: string[] = [];

    function traverse(obj: any, context: string = "") {
      for (const key in obj) {
        if (typeof obj[key] === "string") {
          // Csak a releváns hosszúságú szövegeket vesszük fel (pl. > 20 karakter)
          // Vagy kulcsszavakat is, ha fontosak (pl. menüpontok nevei)
          if (obj[key].length > 10) {
            // A kontextus segít az AI-nak érteni, hogy ez mi (pl. "Főoldal > Hero > Cím")
            chunks.push(`${context} [${key}]: ${obj[key]}`);
          }
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          traverse(obj[key], context ? `${context} > ${key}` : key);
        }
      }
    }

    traverse(dict, "Weboldal");

    console.log(`📦 ${chunks.length} új szövegrészlet feldolgozása...`);

    // 3. LÉPÉS: BEILLESZTÉS (Embedding generálással)
    // Ezt lehetne párhuzamosítani (Promise.all), de az OpenAI rate limit miatt jobb sorban.
    for (const [index, chunk] of chunks.entries()) {
      process.stdout.write(`\r⏳ Feldolgozás: ${index + 1}/${chunks.length}`);

      const embedding = await getEmbedding(chunk);

      await db.insert(schema.embeddings).values({
        content: chunk,
        embedding: embedding,
        metadata: {
          fileName: fileName,
          type: "website_content",
          updatedAt: new Date().toISOString(),
        },
      });
    }

    console.log("\n🎉 Kész! Hanna tudása sikeresen frissítve.");
  } catch (error) {
    console.error("\n❌ Hiba történt:", error);
    process.exit(1);
  }
}

main();
