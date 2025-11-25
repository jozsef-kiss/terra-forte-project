import { openai } from "@ai-sdk/openai";
import { db } from "@/db";
import { embeddings } from "@/db/schema";
import { sql } from "drizzle-orm";

export const maxDuration = 30;

// --- 1. Embedding Segédfüggvény (Marad a régi, mert ez biztosan jó) ---
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

    // D. Prompt
    const systemPrompt = `
      Te a Terra Forte Bau Kft. asszisztense vagy.
      Válaszolj a kérdésre az alábbi adatok alapján.
      
      ADATOK:
      ${contextText}
    `;

    // E. Válasz generálása (Közvetlen OpenAI hívás, stream módban)
    // Ez egy szabványos webes Response-t küld vissza.
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        stream: true, // FONTOS: Streamelés bekapcsolva
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: any) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    // F. Stream továbbítása a kliensnek
    // Nem használunk semmilyen library-t, csak továbbadjuk a nyers adatot
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
