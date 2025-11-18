import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Link from "next/link";

export default async function CtaSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.CtaSection;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t.title}
          <br />
          <span className="text-indigo-600 text-3xl sm:text-4xl block mt-2">
            {t.subtitle}
          </span>
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
          <Link
            href={`/${lang}/kapcsolat?targy=arajanlat`}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {t.primary_btn}
          </Link>
          <Link
            href={`/${lang}/referenciak`}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {t.secondary_btn} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
