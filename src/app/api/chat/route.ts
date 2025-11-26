import { openai } from "@ai-sdk/openai";
import { db } from "@/db";
import { embeddings } from "@/db/schema";
import { sql } from "drizzle-orm";

export const maxDuration = 30;

// --- 1. Embedding Segédfüggvény ---
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

  if (!response.ok) throw new Error("Embedding Hiba");
  const data = await response.json();
  return data.data[0].embedding;
}

// --- 2. FŐ VÉGPONT ---
export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    // A. Embedding
    const embedding = await getEmbedding(lastMessage.content);

    // B. Keresés
    const similarChunks = await db
      .select({
        content: embeddings.content,
        metadata: embeddings.metadata,
      })
      .from(embeddings)
      .orderBy(
        sql`${embeddings.embedding} <-> ${JSON.stringify(embedding)}::vector`
      )
      .limit(5);

    // C. Kontextus
    const contextText = similarChunks
      .map((chunk: any) => {
        const meta = chunk.metadata as Record<string, any>;
        const fileName = meta?.fileName || "Ismeretlen";
        return `TARTALOM: "${chunk.content}"\nFORRÁS: [${fileName}]`;
      })
      .join("\n\n---\n\n");

    // D. PROMPT (Itt adjuk meg a személyiséget!)
    const systemPrompt = `
      A neved Hanna. Te a Terra Forte Bau Kft. barátságos és szakértő asszisztense vagy.
      
      SZEMÉLYISÉGED:
      - Kedves, közvetlen és segítőkész hangnemben beszélj (magázódva, de barátságosan).
      - Kerüld a "robotos" megfogalmazásokat (pl. "mint nyelvi modell...").
      - Úgy viselkedj, mint egy profi ügyfélszolgálatos kolléga.
      
      FELADATOD:
      Válaszolj a felhasználó kérdésére KIZÁRÓLAG az alábbi "Adatok" alapján.
      Ha a válasz nincs az adatokban, mondd ezt: "Sajnos erre a kérdésre most nem tudok pontos választ adni a dokumentációimból. Kérlek, vedd fel a kapcsolatot kollégáimmal a Kapcsolat menüpontban, ők biztosan segítenek!"
      
      FORRÁSMEGJELÖLÉS:
      A válaszod végén mindig jelöld meg, melyik dokumentumból dolgoztál (pl. Forrás: Árlista.pdf).
      
      ADATOK:
      ${contextText}
    `;

    // E. Válasz generálása (Streamelve)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    return new Response(response.body, {
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error: any) {
    console.error("API HIBA:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
