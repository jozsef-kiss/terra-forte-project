// src/app/[locale]/blog/page.tsx
import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import BlogList from "@/components/BlogList";
import { db } from "@/db";
import { posts } from "@/db/schema";
import { desc, count } from "drizzle-orm";

export const revalidate = 60;
const PAGE_SIZE = 3;

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  const currentPage = page ? parseInt(page) : 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const totalResult = await db.select({ count: count() }).from(posts);
  const totalItems = totalResult[0].count;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const dbPosts = await db
    .select()
    .from(posts)
    .orderBy(desc(posts.publishedAt))
    .limit(PAGE_SIZE)
    .offset(offset);

  // --- NYELVI LOGIKA: Kiválasztjuk a megfelelő oszlopot ---
  const localizedPosts = dbPosts.map((post) => {
    // Alapértelmezés: Magyar
    let title = post.titleHu;
    let excerpt = post.excerptHu;

    // Ha angol a nyelv és van angol fordítás
    if (lang === "en" && post.titleEn) {
      title = post.titleEn;
      excerpt = post.excerptEn;
    }
    // Ha német a nyelv és van német fordítás
    else if (lang === "de" && post.titleDe) {
      title = post.titleDe;
      excerpt = post.excerptDe;
    }

    // Visszaadjuk "title" és "excerpt" néven, hogy a komponens értse
    return {
      ...post,
      title: title,
      excerpt: excerpt,
    };
  });

  return (
    <main className="bg-white min-h-screen">
      <BlogList
        t={{
          title: dict.BlogPage.title,
          subtitle: dict.BlogPage.subtitle,
        }}
        posts={localizedPosts} // A formázott adatokat adjuk át
        lang={lang}
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
