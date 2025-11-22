import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { hu } from "date-fns/locale";
import {
  Pagination,
  PaginationGap,
  PaginationList,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Kép generátor (marad a régi)
const getImageUrl = (category: string, id: number | string) => {
  const themes = [
    { bg: "e0e7ff", text: "3730a3" },
    { bg: "f0fdf4", text: "166534" },
    { bg: "fefce8", text: "854d0e" },
    { bg: "f1f5f9", text: "334155" },
  ];
  const index =
    (typeof id === "number" ? id : parseInt(id.toString()) || 0) %
    themes.length;
  const theme = themes[index];
  return `https://placehold.co/1200x800/${theme.bg}/${
    theme.text
  }?text=${encodeURIComponent(category || "Blog")}`;
};

type DbPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
};

type Props = {
  t: {
    title: string;
    subtitle: string;
  };
  posts: DbPost[];
  lang: string;
  // ÚJ: Lapozási adatok
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
  };
};

export default function BlogList({ t, posts, lang, pagination }: Props) {
  const { currentPage, totalPages, totalItems, pageSize } = pagination;

  // Számoljuk ki, mettől meddig látjuk az elemeket (pl. "1-3 / 10")
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {t.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">{t.subtitle}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between group"
            >
              <div className="relative w-full overflow-hidden rounded-2xl">
                <Image
                  src={post.coverImage || getImageUrl("Blog", post.id)}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={post.publishedAt?.toISOString()}
                    className="text-gray-500"
                  >
                    {post.publishedAt
                      ? format(new Date(post.publishedAt), "yyyy. MMM d.", {
                          locale: hu,
                        })
                      : "Dátum nélkül"}
                  </time>
                  <Badge color="zinc">Blog</Badge>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/${lang}/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- LAPOZÓ SZEKCIÓ --- */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-between border-t border-stone-200 px-4 py-3 sm:px-6">
            {/* Mobil nézet */}
            <div className="flex flex-1 justify-between sm:hidden">
              <PaginationPrevious
                href={
                  currentPage > 1
                    ? `/${lang}/blog?page=${currentPage - 1}`
                    : null
                }
              />
              <PaginationNext
                href={
                  currentPage < totalPages
                    ? `/${lang}/blog?page=${currentPage + 1}`
                    : null
                }
              />
            </div>

            {/* Asztali nézet */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                {/* JAVÍTÁS: Zöldes kiemelés a szövegben */}
                <p className="text-sm text-stone-600">
                  <span className="font-bold text-indigo-700">{startItem}</span>
                  -tól{" "}
                  <span className="font-bold text-indigo-700">{endItem}</span>
                  -ig megjelenítve, összesen{" "}
                  <span className="font-bold text-indigo-700">
                    {totalItems}
                  </span>{" "}
                  találat
                </p>
              </div>
              <div>
                <Pagination>
                  <PaginationPrevious
                    href={
                      currentPage > 1
                        ? `/${lang}/blog?page=${currentPage - 1}`
                        : null
                    }
                  />
                  <PaginationList>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationPage
                          key={page}
                          href={`/${lang}/blog?page=${page}`}
                          current={page === currentPage}
                        >
                          {page}
                        </PaginationPage>
                      )
                    )}
                  </PaginationList>
                  <PaginationNext
                    href={
                      currentPage < totalPages
                        ? `/${lang}/blog?page=${currentPage + 1}`
                        : null
                    }
                  />
                </Pagination>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
