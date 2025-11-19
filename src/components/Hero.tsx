import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.Hero;

  return (
    // JAVÍTÁS: bg-white -> bg-stone-50
    <div className="bg-stone-50 relative">
      {/* VÁLTOZÁS: lg: -> xl:
          A 'xl:flex' miatt csak 1280px felett lesz egymás mellett.
          Alatta (tehát 1200px-en is) marad a mobil nézet (egymás alatt).
      */}
      <div className="mx-auto max-w-7xl xl:flex xl:min-h-[calc(100vh-80px)]">
        <div className="relative z-20 px-6 py-24 sm:py-32 xl:py-0 xl:px-8 xl:w-full xl:max-w-3xl xl:flex xl:flex-col xl:justify-center">
          {/* A vágás is csak XL mérettől látszik */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            // JAVÍTÁS: fill-white -> fill-stone-50 (hogy beleolvadjon a háttérbe)
            className="absolute inset-y-0 right-1 hidden h-full w-80 translate-x-1/2 transform fill-stone-50 xl:block pointer-events-none"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          {/* A szövegdoboz szélesség korlátja is csak XL-en lép életbe */}
          <div className="mx-auto max-w-2xl xl:mx-0 xl:max-w-xl">
            {/* Badge */}
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

            {/* Cím */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl text-pretty">
              {t.title}
            </h1>

            {/* Szöveg */}
            <p className="mt-6 text-lg leading-8 text-gray-600">{t.subtitle}</p>

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

      {/* KÉP: 
         - xl:absolute (csak 1280px felett úszik jobbra)
         - xl:w-1/2 (csak 1280px felett lesz 50%-os)
         - Alatta sima blokk elemként viselkedik (mobil nézet)
      */}
      <div className="bg-gray-50 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2 h-64 xl:h-auto w-full">
        <img
          alt="Modern játszótér mászóka gyerekekkel"
          src="/Hero/hero.png"
          className="aspect-[3/2] object-cover w-full h-full xl:aspect-auto"
        />
      </div>
    </div>
  );
}
