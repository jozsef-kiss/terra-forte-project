import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "../src/db/schema";

// Környezeti változók betöltése
config({ path: ".env.local" });

const sql = neon(process.env.POSTGRES_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("🌱 Adatbázis feltöltése (Seeding) folyamatban...");

    // 1. Töröljük a meglévő adatokat (Tiszta lap)
    await db.delete(schema.posts);
    await db.delete(schema.references);

    // 2. Blogbejegyzések feltöltése
    console.log("📝 Blogbejegyzések létrehozása...");
    await db.insert(schema.posts).values([
      {
        slug: "hogyan-valasszunk-biztonsagos-jatszoteret",
        title: "Hogyan válasszunk biztonságos játszóteret?",
        excerpt:
          "A gyermekek biztonsága az első. Szakértői útmutatónk segít eligazodni a szabványok és tanúsítványok világában.",
        content: `
          <h2>Miért fontos az MSZ EN 1176?</h2>
          <p>A játszóterek biztonságát Európában szigorú szabványok szabályozzák. A Terra Forte Bau minden eszköze megfelel ezeknek...</p>
          <h3>Mire figyeljünk fenntartóként?</h3>
          <p>Az éves felülvizsgálatok nem csak kötelezőek, de életmentőek is lehetnek. A kopóalkatrészek rendszeres cseréje...</p>
        `,
        coverImage:
          "https://images.unsplash.com/photo-1562655337-7d2235967c24?q=80&w=1000&auto=format&fit=crop",
        publishedAt: new Date("2025-01-15"),
      },
      {
        slug: "a-fa-jatszoterek-karbantartasa",
        title: "A fa játszóterek karbantartása: Tippek és trükkök",
        excerpt:
          "A természetes anyagok törődést igényelnek. Így őrizheti meg fa játékainak élettartamát évtizedeken át.",
        content: `
          <h2>A fa természetes öregedése</h2>
          <p>A fa repedése természetes folyamat, de van, amikor már beavatkozást igényel. A felületkezelés fontossága...</p>
        `,
        coverImage:
          "https://images.unsplash.com/photo-1568835679605-ba9196468b82?q=80&w=1000&auto=format&fit=crop",
        publishedAt: new Date("2025-02-10"),
      },
    ]);

    // 3. Referenciák feltöltése
    console.log("🏗️ Referenciák létrehozása...");
    await db.insert(schema.references).values([
      {
        slug: "varosi-kalandpark-bp18",
        title: "Városi Kalandpark",
        location: "Budapest, XVIII. kerület",
        clientType: "Önkormányzat",
        category: "metal",
        description:
          "Egy modern, vandálbiztos fém játszótér kialakítása a lakótelep szívében, 500nm-en, ütéscsillapító gumiburkolattal.",
        images: [
          "/Referencia/ref-1.jpg",
          "https://images.unsplash.com/photo-1573457977840-68100797c548?q=80&w=1000&auto=format&fit=crop",
        ],
      },
      {
        slug: "napraforgo-ovoda-debrecen",
        title: "Napraforgó Óvoda",
        location: "Debrecen",
        clientType: "Közintézmény",
        category: "wooden",
        description:
          "Természetközeli fa játékok telepítése, árnyékolókkal és homokozóval, kifejezetten az óvodás korosztály számára.",
        images: ["/Referencia/ref-2.jpeg"],
      },
      {
        slug: "erdei-tornapalya-visegrad",
        title: "Erdei Tornapálya",
        location: "Visegrád",
        clientType: "Erdészet",
        category: "wooden",
        description:
          "Erdei környezetbe illeszkedő, rönkfa elemekből álló fitnesz és ügyességi pálya a turisták számára.",
        images: ["/Referencia/ref-3.jpg"],
      },
      {
        slug: "lovagvar-tematikus-park",
        title: "Lovagvár Tematikus Park",
        location: "Székesfehérvár",
        clientType: "Önkormányzat",
        category: "custom",
        description:
          "Egyedi tervezésű, háromtornyos lovagvár csúszdarendszerrel és interaktív elemekkel.",
        images: ["/Referencia/ref-4.webp"],
      },
    ]);

    console.log("✅ Adatbázis sikeresen feltöltve!");
  } catch (error) {
    console.error("❌ Hiba történt a feltöltés közben:", error);
    process.exit(1);
  }
};

main();
