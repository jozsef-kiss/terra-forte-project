import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import BlogList from "@/components/BlogList";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, count } from "drizzle-orm";

export const revalidate = 60;
const PAGE_SIZE = 3; // Itt állítjuk be, hogy 3 cikk legyen oldalanként

export default async function BlogPage({
  params,
  searchParams, // Ez kell a ?page=X olvasásához
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // 1. Aktuális oldalszám meghatározása (ha nincs, akkor 1)
  const currentPage = page ? parseInt(page) : 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  // 2. Összes bejegyzés megszámolása (a lapozóhoz kell)
  // (Visszaadja, hogy pl. összesen 12 poszt van)
  const totalResult = await db.select({ count: count() }).from(posts);
  const totalItems = totalResult[0].count;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  // 3. Csak az adott oldalhoz tartozó posztok lekérése
  const dbPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.publishedAt))
    .limit(PAGE_SIZE) // Csak 3 darab
    .offset(offset); // A megfelelő helytől kezdve

  return (
    <main className="bg-white min-h-screen">
      <BlogList
        t={{
          title: dict.BlogPage.title,
          subtitle: dict.BlogPage.subtitle,
        }}
        posts={dbPosts}
        lang={lang}
        // Átadjuk a lapozási adatokat is a komponensnek
        pagination={{
          currentPage,
          totalPages,
          totalItems,
          pageSize: PAGE_SIZE,
        }}
      />
    </main>
  );
}
