import { db } from "@/db";
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { hu, enUS, de } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Locale } from "@/app/[locale]/dictionaries";

// Frissítés: 60 másodpercenként újragenerálja az oldalt, ha változott az adat
export const revalidate = 60;

// SEO Metaadatok generálása
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const postResult = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  const post = postResult[0];

  if (!post) return { title: "A cikk nem található" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Locale;

  // 1. Adatlekérés az adatbázisból
  const postResult = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  const post = postResult[0];

  // 2. Ha nincs ilyen cikk, 404 oldalra dobjuk
  if (!post) {
    notFound();
  }

  // Dátum lokalizáció beállítása
  const dateLocale = lang === "en" ? enUS : lang === "de" ? de : hu;

  // Vissza gomb szöveg
  const backText =
    lang === "en"
      ? "Back to Blog"
      : lang === "de"
      ? "Zurück zum Blog"
      : "Vissza a Blogra";

  return (
    <div className="bg-stone-50 min-h-screen py-24 sm:py-32">
      <article className="mx-auto max-w-3xl px-6 lg:px-8">
        {/* Vissza gomb */}
        <div className="mb-8">
          <Link
            href={`/${lang}/blog`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1 transition-colors"
          >
            &larr; {backText}
          </Link>
        </div>

        {/* Fejléc */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4 text-sm text-gray-500">
            <time dateTime={post.publishedAt?.toISOString()}>
              {post.publishedAt
                ? format(new Date(post.publishedAt), "yyyy. MMMM d.", {
                    locale: dateLocale,
                  })
                : ""}
            </time>
            <Badge color="zinc">Blog</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 leading-8 italic">
            {post.excerpt}
          </p>
        </div>

        {/* Borítókép */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 shadow-lg ring-1 ring-gray-900/5">
          <Image
            src={post.coverImage || "https://placehold.co/1200x600?text=Blog"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* TARTALOM (A "prose" osztály varázsolja széppé a HTML-t) */}
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm ring-1 ring-gray-900/5">
          <div
            className="prose prose-lg prose-stone prose-indigo mx-auto max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />
        </div>
      </article>
    </div>
  );
}
