import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import ReferenceGrid from "@/components/ReferenceGrid";
import { db } from "@/db";
import { references } from "@/db/schema";
import { desc } from "drizzle-orm";

// Cache frissítése 60 másodpercenként (ISR)
export const revalidate = 60;

export default async function ReferencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // 1. Adatok lekérdezése az adatbázisból
  // (A legújabb ID szerint rendezve)
  const dbReferences = await db
    .select()
    .from(references)
    .orderBy(desc(references.id));

  // Átalakítjuk az adatokat, hogy a komponens biztosan tömböt kapjon
  const cleanReferences = dbReferences.map((ref) => {
    // 1. KÉPEK KEZELÉSE
    let cleanImages = [];
    if (Array.isArray(ref.images)) {
      cleanImages = ref.images;
    } else if (typeof ref.images === "string") {
      // Ha tömbnek néz ki a szöveg (pl: '["kep1.jpg", "kep2.jpg"]'), akkor parse-oljuk
      if (ref.images.trim().startsWith("[")) {
        try {
          cleanImages = JSON.parse(ref.images);
        } catch (e) {
          cleanImages = [ref.images];
        }
      } else {
        cleanImages = [ref.images];
      }
    }

    // 2. KATEGÓRIÁK KEZELÉSE (Itt a hiba nálad!)
    let cleanCategories: string[] = [];
    if (Array.isArray(ref.categories)) {
      cleanCategories = ref.categories as string[];
    } else if (typeof ref.categories === "string") {
      const catString = ref.categories as string;
      // HA a szöveg így néz ki: '["wooden", "metal"]', akkor szedjük szét!
      if (catString.trim().startsWith("[")) {
        try {
          cleanCategories = JSON.parse(catString);
        } catch (e) {
          // Ha nem sikerült parse-olni, akkor csak simán betesszük
          cleanCategories = [catString];
        }
      } else {
        // Ha csak sima szó (pl: "wooden"), akkor betesszük a tömbbe
        cleanCategories = [catString];
      }
    }

    return {
      ...ref,
      images: cleanImages,
      categories: cleanCategories,
    };
  });

  return (
    <main className="bg-stone-50 min-h-screen">
      {/* Itt a cleanReferences-t adjuk át a dbReferences helyett */}
      {/* @ts-ignore - Ha esetleg a típusok még mindig nem egyeznek tökéletesen */}
      <ReferenceGrid
        t={dict.ReferencesPage}
        items={cleanReferences}
        lang={lang}
      />
    </main>
  );
}
