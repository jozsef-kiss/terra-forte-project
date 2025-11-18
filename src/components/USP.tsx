import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import {
  ShieldCheckIcon,
  StarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default async function USP({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.USP;

  return (
    // 1. HÁTTÉR: A kért #f0f0f0 szín (arbitrary value)
    // 2. MAGASSÁG: py-12 sm:py-16 (a korábbi 24/32 helyett), hogy keskenyebb legyen
    <section className="bg-[#f0f0f0] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Cím és Alcím (Visszaállítva sötétre a világos háttér miatt) */}
        <div className="mx-auto max-w-2xl text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.section_title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {t.section_subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3 lg:max-w-none lg:gap-x-8">
          {/* 1. KÁRTYA */}
          <div className="relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 shrink-0">
              <ShieldCheckIcon
                className="h-7 w-7 text-white"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {t.standard}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                {t.standard_desc}
              </p>
            </div>
          </div>

          {/* 2. KÁRTYA */}
          <div className="relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 shrink-0">
              <StarIcon className="h-7 w-7 text-white" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {t.premium}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                {t.premium_desc}
              </p>
            </div>
          </div>

          {/* 3. KÁRTYA */}
          <div className="relative flex flex-col gap-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 transition-transform hover:-translate-y-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 shrink-0">
              <WrenchScrewdriverIcon
                className="h-7 w-7 text-white"
                aria-hidden="true"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold leading-8 text-gray-900">
                {t.full_service}
              </h3>
              <p className="mt-2 text-base leading-7 text-gray-600">
                {t.full_service_desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
