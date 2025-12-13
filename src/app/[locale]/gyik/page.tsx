import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Link from "next/link";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import FaqClient from "./FaqClient"; // Importáljuk az új komponenst

// --- SEO JSON-LD Generátor ---
function FaqJsonLd({ items }: { items: any }) {
  const allQuestions = Object.values(items).flat() as any[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const t = dict.FAQPage;

  const categories = [
    "general",
    "safety",
    "installation",
    "maintenance",
    "tenders",
    "products",
    "private",
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      <FaqJsonLd items={t.items} />

      {/* --- 1. HERO SZEKCIÓ (Marad Server Side a gyors betöltésért) --- */}
      <div className="relative isolate overflow-hidden bg-indigo-950 py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg
            aria-hidden="true"
            className="absolute left-[50%] top-0 h-[48rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {t.Hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-indigo-200">
              {t.Hero.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* --- 2. INTERAKTÍV RÉSZ (Kliens Komponens) --- */}
      <FaqClient
        categories={categories}
        t_categories={t.categories}
        t_items={t.items}
      />

      {/* --- 3. CTA SZEKCIÓ --- */}
      <div className="bg-white border-t border-stone-200">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-stone-100 px-6 py-16 text-center shadow-xs sm:rounded-3xl sm:px-16 border border-stone-200">
            <div className="mx-auto max-w-2xl flex flex-col items-center">
              <div className="mb-6 rounded-full bg-indigo-100 p-3 text-indigo-600">
                <QuestionMarkCircleIcon className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t.CTA.title}
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                {t.CTA.subtitle}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href={`/${lang}/kapcsolat`}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t.CTA.btn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
