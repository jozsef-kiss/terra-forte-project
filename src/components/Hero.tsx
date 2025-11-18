import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.Hero;

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            {/* Dekoratív háromszög vágás a képen (Tailwind UI design elem) */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            >
              <polygon points="0,0 90,0 50,100 0,100" />
            </svg>

            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                {/* Badge Szekció */}
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                    {t.badge_text}{" "}
                    <Link
                      href={`/${lang}/rolunk`}
                      className="font-semibold whitespace-nowrap text-indigo-600 pl-1"
                    >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {t.badge_link} <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                </div>

                {/* Főcím */}
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl text-pretty">
                  {t.title}
                </h1>

                {/* Alcím */}
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  {t.subtitle}
                </p>

                {/* Gombok */}
                <div className="mt-10 flex items-center gap-x-6">
                  <Button href={`/${lang}/termekek`} color="indigo">
                    {t.cta_products}
                  </Button>
                  <Button href={`/${lang}/kapcsolat`} plain>
                    {t.cta_contact} <span aria-hidden="true">→</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobb oldali Kép */}
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            alt="Modern játszótér mászóka gyerekekkel"
            src="https://images.unsplash.com/photo-1566227964570-3d3a2215a6ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
            className="aspect-3/2 object-cover lg:aspect-auto lg:size-full"
          />
        </div>
      </div>
    </div>
  );
}
