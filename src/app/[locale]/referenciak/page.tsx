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

  return (
    <main className="bg-stone-50 min-h-screen">
      <ReferenceGrid t={dict.ReferencesPage} items={dbReferences} lang={lang} />
    </main>
  );
}
