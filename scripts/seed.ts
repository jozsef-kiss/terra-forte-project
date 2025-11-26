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
    //await db.delete(schema.references);

    // 2. Blogbejegyzések feltöltése (Többnyelvű)
    console.log("📝 Blogbejegyzések létrehozása...");
    await db.insert(schema.posts).values([
      {
        slug: "msz-en-1176-szabvany-kisokos-onkormanyzatoknak",
        coverImage: "/Kategoria/fem-jatszoter.png",
        publishedAt: new Date("2025-09-18"),

        // --- MAGYAR ---
        titleHu: "MSZ EN 1176 Kisokos: Miért nem játék a játszótér biztonsága?",
        excerptHu:
          "Minden fenntartó rémálma a baleset. Cikkünkből megtudhatja, melyek a legkritikusabb szabványügyi előírások, és hogyan kerülheti el a jogi kockázatokat.",
        contentHu: `
          <h2>A biztonság nem választás kérdése</h2>
          <p>Magyarországon minden közterületi játszótérnek meg kell felelnie az MSZ EN 1176 szabványsorozatnak. Ez nem csupán egy bürokratikus előírás, hanem a gyermekek testi épségének garanciája.</p>
          <h3>A leggyakoribb hibaforrások</h3>
          <ul>
            <li><strong>Nem megfelelő ütéscsillapítás:</strong> A szabvány szigorúan előírja, milyen esésmagassághoz milyen vastag gumi- vagy kavicságy szükséges.</li>
            <li><strong>Fejbeszorulás veszélye:</strong> A mászókák rácsainak távolságát úgy kell méretezni, hogy a gyermek feje ne szorulhasson be.</li>
            <li><strong>Karbantartás hiánya:</strong> Az időjárás és a használat koptatja az alkatrészeket.</li>
          </ul>
          <h3>A Terra Forte garanciája</h3>
          <p>Minden általunk telepített eszköz rendelkezik a szükséges TÜV tanúsítvánnyal, és az átadáskor jegyzőkönyvvel igazoljuk a szabványosságot.</p>
        `,

        // --- ANGOL ---
        titleEn: "MSZ EN 1176 Guide: Why Playground Safety is No Game",
        excerptEn:
          "Accidents are every operator's nightmare. Learn about the most critical standard regulations and how to avoid legal risks.",
        contentEn: `
          <h2>Safety is Not a Choice</h2>
          <p>In Hungary, every public playground must comply with the MSZ EN 1176 standard series. This is not just a bureaucratic requirement but a guarantee of children's physical safety.</p>
          <h3>Most Common Errors</h3>
          <ul>
            <li><strong>Inadequate Shock Absorption:</strong> The standard strictly prescribes the thickness of rubber or gravel beds required for specific fall heights.</li>
            <li><strong>Head Entrapment Hazards:</strong> Climbing frame gaps must be sized so that a child's head cannot get stuck.</li>
            <li><strong>Lack of Maintenance:</strong> Weather and usage wear down components over time.</li>
          </ul>
          <h3>The Terra Forte Guarantee</h3>
          <p>Every piece of equipment we install comes with the necessary TÜV certification, and we provide a protocol verifying compliance upon handover.</p>
        `,

        // --- NÉMET ---
        titleDe:
          "MSZ EN 1176 Leitfaden: Warum Spielplatzsicherheit kein Spiel ist",
        excerptDe:
          "Unfälle sind der Albtraum jedes Betreibers. Erfahren Sie, welche Vorschriften am wichtigsten sind und wie Sie rechtliche Risiken vermeiden.",
        contentDe: `
          <h2>Sicherheit ist keine Wahl</h2>
          <p>In Ungarn muss jeder öffentliche Spielplatz der Normenreihe MSZ EN 1176 entsprechen. Dies ist nicht nur eine bürokratische Vorschrift, sondern eine Garantie für die körperliche Unversehrtheit der Kinder.</p>
          <h3>Häufigste Fehlerquellen</h3>
          <ul>
            <li><strong>Unzureichende Stoßdämpfung:</strong> Die Norm schreibt streng vor, wie dick Gummi- oder Kiesbetten bei bestimmten Fallhöhen sein müssen.</li>
            <li><strong>Gefahr von Kopfangst:</strong> Die Abstände der Klettergerüste müssen so bemessen sein, dass der Kopf eines Kindes nicht stecken bleiben kann.</li>
            <li><strong>Mangelnde Wartung:</strong> Wetter und Nutzung nutzen die Bauteile mit der Zeit ab.</li>
          </ul>
          <h3>Die Terra Forte Garantie</h3>
          <p>Jedes von uns installierte Gerät verfügt über das erforderliche TÜV-Zertifikat, und wir bestätigen die Konformität bei der Übergabe mit einem Protokoll.</p>
        `,
      },
      {
        slug: "fa-vagy-fem-jatszoter-melyiket-valassza",
        coverImage: "/Kategoria/fa-jatszoter.png",
        publishedAt: new Date("2025-10-10"),

        // --- MAGYAR ---
        titleHu: "Fa vagy Fém? Melyik az ideális választás az Ön településére?",
        excerptHu:
          "Természetes harmónia vagy vandálbiztos modernitás? Összehasonlítjuk a két legnépszerűbb alapanyagot, hogy segítsünk a döntésben.",
        contentHu: `
          <h2>Az örök dilemma: Természetes vs. Modern</h2>
          <p>Amikor egy önkormányzat vagy intézmény játszóteret tervez, az első kérdés mindig az anyaghasználat. Mindkét típusnak megvannak a maga előnyei.</p>
          <h3>A Fa játszóterek előnyei</h3>
          <p>A fa melegséget, természetességet sugároz. Tökéletesen illeszkedik zöldövezetekbe, parkokba. A Terra Forte Bau válogatott, rétegragasztott borovi fenyőt használ, amely kevésbé repedezik és UV-álló.</p>
          <h3>Mikor válasszon fémet?</h3>
          <p>A fém a "városi harcos". Lakótelepekre, nagy forgalmú közterekre ajánljuk, ahol magasabb a vandalizmus kockázata. A fém eszközök gyakorlatilag gondozásmentesek és rendkívül tartósak.</p>
        `,

        // --- ANGOL ---
        titleEn:
          "Wood or Metal? Which is the Ideal Choice for Your Municipality?",
        excerptEn:
          "Natural harmony or vandal-proof modernity? We compare the two most popular materials to help you decide.",
        contentEn: `
          <h2>The Eternal Dilemma: Natural vs. Modern</h2>
          <p>When a municipality or institution plans a playground, the first question is always the material. Both types have their advantages.</p>
          <h3>Advantages of Wooden Playgrounds</h3>
          <p>Wood radiates warmth and naturalness. It fits perfectly into green belts and parks. Terra Forte Bau uses selected, laminated Scots pine, which cracks less and is UV-resistant.</p>
          <h3>When to Choose Metal?</h3>
          <p>Metal is the "urban warrior". We recommend it for housing estates and high-traffic public spaces where the risk of vandalism is higher. Metal equipment is virtually maintenance-free and extremely durable.</p>
        `,

        // --- NÉMET ---
        titleDe: "Holz oder Metall? Was ist die ideale Wahl für Ihre Gemeinde?",
        excerptDe:
          "Natürliche Harmonie oder vandalensichere Modernität? Wir vergleichen die zwei beliebtesten Materialien, um Ihnen bei der Entscheidung zu helfen.",
        contentDe: `
          <h2>Das ewige Dilemma: Natürlich vs. Modern</h2>
          <p>Wenn eine Gemeinde oder Institution einen Spielplatz plant, ist die erste Frage immer das Material. Beide Typen haben ihre Vorteile.</p>
          <h3>Vorteile von Holzspielplätzen</h3>
          <p>Holz strahlt Wärme und Natürlichkeit aus. Es passt perfekt in Grünzonen und Parks. Terra Forte Bau verwendet ausgewähltes, laminiertes Kiefernholz, das weniger reißt und UV-beständig ist.</p>
          <h3>Wann Metall wählen?</h3>
          <p>Metall ist der "Stadtkrieger". Wir empfehlen es für Wohnsiedlungen und stark frequentierte öffentliche Plätze, wo das Risiko von Vandalismus höher ist. Metallgeräte sind praktisch wartungsfrei und extrem langlebig.</p>
        `,
      },
      {
        slug: "kozossegepites-kulteri-fitnesz-parkokkal",
        coverImage: "/Kategoria/fitnesz.png",
        publishedAt: new Date("2025-10-25"),

        // --- MAGYAR ---
        titleHu:
          "Nem csak gyerekjáték: Így épít közösséget egy kültéri fitnesz park",
        excerptHu:
          "Hogyan tegyük vonzóvá a köztereket a felnőttek és az idősebb korosztály számára? A generációk találkozása a modern köztereken.",
        contentHu: `
          <h2>Egészségmegőrzés ingyen, a szabadban</h2>
          <p>A modern településfejlesztés már nem csak a gyerekekre gondol. A felnőtt lakosság körében egyre nagyobb az igény az ingyenes, kültéri sportolási lehetőségekre.</p>
          <h3>Többgenerációs terek</h3>
          <p>A legnépszerűbb projektjeink azok, ahol a játszótér közvetlen közelében fitnesz eszközöket is telepítünk. Így amíg a gyerekek játszanak, a szülők is aktívan tölthetik az időt.</p>
          <h3>Mit kínál a Terra Forte?</h3>
          <ul>
            <li>Kardió gépek az idősebb korosztálynak</li>
            <li>Saját testsúlyos elemek a fiataloknak</li>
            <li>Nyújtó és lazító eszközök mindenkinek</li>
          </ul>
        `,

        // --- ANGOL ---
        titleEn:
          "Not Just Child's Play: How Outdoor Fitness Parks Build Community",
        excerptEn:
          "How to make public spaces attractive for adults and the elderly? Where generations meet in modern public spaces.",
        contentEn: `
          <h2>Health Maintenance for Free, Outdoors</h2>
          <p>Modern urban development no longer thinks only of children. There is a growing demand among the adult population for free outdoor sports opportunities.</p>
          <h3>Multi-Generational Spaces</h3>
          <p>Our most popular projects are those where we install fitness equipment right next to the playground. This way, while the children play, parents can also spend their time actively.</p>
          <h3>What Does Terra Forte Offer?</h3>
          <ul>
            <li>Cardio machines for the older generation</li>
            <li>Bodyweight elements for the youth</li>
            <li>Stretching and relaxing equipment for everyone</li>
          </ul>
        `,

        // --- NÉMET ---
        titleDe:
          "Nicht nur Kinderspiel: So baut ein Outdoor-Fitnesspark Gemeinschaft auf",
        excerptDe:
          "Wie macht man öffentliche Plätze für Erwachsene und Senioren attraktiv? Wo sich Generationen in modernen öffentlichen Räumen treffen.",
        contentDe: `
          <h2>Gesundheitserhaltung kostenlos, im Freien</h2>
          <p>Moderne Stadtentwicklung denkt nicht mehr nur an Kinder. In der erwachsenen Bevölkerung wächst der Bedarf an kostenlosen Sportmöglichkeiten im Freien.</p>
          <h3>Mehrgenerationenplätze</h3>
          <p>Unsere beliebtesten Projekte sind die, bei denen wir Fitnessgeräte direkt neben dem Spielplatz installieren. So können Eltern ihre Zeit aktiv verbringen, während die Kinder spielen.</p>
          <h3>Was bietet Terra Forte?</h3>
          <ul>
            <li>Kardiogeräte für die ältere Generation</li>
            <li>Eigengewichtselemente für die Jugend</li>
            <li>Dehn- und Entspannungsgeräte für alle</li>
          </ul>
        `,
      },
    ]);

    // 3. Referenciák feltöltése
    /* console.log("🏗️ Referenciák létrehozása...");
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
    ]);*/

    console.log("✅ Adatbázis sikeresen feltöltve!");
  } catch (error) {
    console.error("❌ Hiba történt a feltöltés közben:", error);
    process.exit(1);
  }
};

main();
