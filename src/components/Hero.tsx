import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image"; // Importáltuk a next/image-t

export default async function Hero({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.Hero;

  return (
    <div className="bg-stone-50 relative">
      <div className="mx-auto max-w-7xl xl:flex xl:min-h-[calc(100vh-80px)]">
        <div className="relative z-20 px-6 py-12 sm:py-24 xl:py-0 xl:px-8 xl:w-full xl:max-w-3xl xl:flex xl:flex-col xl:justify-center">
          {/* A vágás (háromszög) csak XL mérettől látszik */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="absolute inset-y-0 right-1 hidden h-full w-80 translate-x-1/2 transform fill-stone-50 xl:block pointer-events-none"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

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
              <Button href={`/${lang}/referenciak`} className="btn-contact">
                {t.cta_references} <span aria-hidden="true">→</span>
              </Button>
              <Button href={`/${lang}/kapcsolat`} className="btn-quote">
                {t.cta_contact} <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* A KÉP KONTÉNER:
         - Alapból (mobil): relative, h-64 (fix magasság), w-full. Így a szöveg ALATT lesz.
         - XL-től: absolute, inset-y-0, right-0, w-1/2, h-auto. Így beúszik JOBBRA.
      */}
      <div className="relative h-64 w-full bg-gray-50 xl:absolute xl:inset-y-0 xl:right-0 xl:h-auto xl:w-1/2">
        <Image
          alt="Modern Terra Forte Bau fém játszótér komplexum csúszdás toronnyal"
          src="/images/hero/modern-fem-jatszoter-komplexum-csuszdas-torony-hintaallvany.jpg"
          fill // Kitölti a konténert
          className="object-cover" // Méretarányos kitöltés
          priority // Fontos a betöltési sebesség miatt (LCP)
          sizes="(max-width: 1280px) 100vw, 50vw" // Mobilon teljes szélesség, asztalin fél
        />
      </div>
    </div>
  );
}
