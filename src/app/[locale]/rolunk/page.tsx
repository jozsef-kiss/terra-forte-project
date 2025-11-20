import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // Rövidítés a könnyebb olvashatóságért
  const t = dict.AboutPage;

  return (
    <div className="bg-white overflow-hidden">
      <main className="isolate">
        {/* --- 1. HERO SZEKCIÓ --- */}
        <div className="relative isolate -z-10 border-b border-stone-100">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
          />

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                {t.Hero.title}
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  {t.Hero.subtitle}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href={`/${lang}/kapcsolat`}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {t.Hero.cta}
                  </Link>
                </div>
              </div>
              <Image
                src="/Hero/hero.png"
                alt="Terra Forte Csapat munka közben"
                width={1280}
                height={800}
                priority
                className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36 shadow-xl"
              />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>

        {/* --- 2. STATISZTIKA SZEKCIÓ --- */}
        <div className="mx-auto mt-16 max-w-7xl px-6 lg:px-8 pb-16 border-b border-stone-100">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t.Stats.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {t.Stats.subtitle}
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {t.Stats.items.map((stat: any) => (
                <div
                  key={stat.label}
                  className="flex flex-col bg-stone-50/50 p-8 hover:bg-stone-100 transition-colors"
                >
                  <dt className="text-sm font-semibold leading-6 text-gray-600">
                    {stat.label}
                  </dt>
                  <dd className="order-first text-3xl font-bold tracking-tight text-indigo-600">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* --- 3. KÜLDETÉS --- */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
          <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
            <div className="w-full lg:max-w-lg lg:flex-auto">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t.Mission.title_part1} <br />
                <span className="text-indigo-600">
                  {t.Mission.title_highlight}
                </span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                {t.Mission.subtitle}
              </p>
              <div className="mt-10 text-base leading-7 text-gray-700 space-y-4">
                <p>{t.Mission.description_p1}</p>
                <p>
                  {t.Mission.description_p2_pre}{" "}
                  <strong>{t.Mission.description_p2_bold}</strong>
                  {t.Mission.description_p2_post}
                </p>
              </div>
            </div>
            <div className="w-full lg:max-w-xl lg:flex-auto">
              <div className="aspect-[7/5] w-full rounded-2xl bg-stone-50 object-cover shadow-lg overflow-hidden relative">
                <Image
                  src="/Referencia/ref-3.jpg"
                  alt="Minőségi kivitelezés"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. ÉRTÉKEINK --- */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 mb-24 border-t border-stone-100 pt-24 sm:pt-32">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.Values.title}
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {t.Values.subtitle}
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {t.Values.items.map((value: any) => (
              <li
                key={value.name}
                className="rounded-2xl border border-stone-200 bg-white p-8 hover:border-indigo-600 transition-colors duration-300 shadow-sm"
              >
                <div className="flex items-center gap-x-3">
                  <div className="flex-none rounded-full bg-indigo-50 p-2 text-indigo-600">
                    <CheckCircleIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {value.name}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* --- 5. CTA SZEKCIÓ --- */}
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-stone-50 border-t border-stone-200">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.CTA.title_part1}
              <br />
              {t.CTA.title_part2}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              {t.CTA.description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${lang}/ajanlatkeres`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t.CTA.primary_btn}
              </Link>
              <Link
                href={`/${lang}/referenciak`}
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
              >
                {t.CTA.secondary_btn} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
