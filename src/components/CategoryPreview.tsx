import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Link from "next/link";
import Image from "next/image";

export default async function CategoryPreview({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.Categories;

  // Adatok összerendelése
  const categories = [
    {
      name: t.items.wooden.title,
      cta: t.items.wooden.cta,
      href: `/${lang}/termekek/fa-jatszoterek`,
      // 1. FA JÁTSZÓTÉR (A nagy kártya)
      imageSrc:
        "/images/categories/hagyomanyos-fa-jatszoter-maszoka-es-csuszda.jpg",
      imageAlt:
        "Hagyományos fa játszótér mászókával és csúszdával természetes környezetben",
      className: "sm:row-span-2 sm:aspect-square",
    },
    {
      name: t.items.metal.title,
      cta: t.items.metal.cta,
      href: `/${lang}/termekek/fem-jatszoterek`,
      // 2. FÉM JÁTSZÓTÉR
      imageSrc:
        "/images/categories/modern-fem-jatszoter-vandalbiztos-kozteruleti-jatek.jpg",
      imageAlt: "Modern, vandálbiztos fém játszótér eszközök közterületre",
      className: "sm:aspect-auto",
    },
    {
      name: t.items.fitness.title,
      cta: t.items.fitness.cta,
      href: `/${lang}/termekek/kulteri-fitnesz`,
      // 3. FITNESZ
      imageSrc:
        "/images/categories/kulteri-fitnesz-park-felnott-jatszoter-eszkozok.jpg",
      imageAlt:
        "Kültéri fitnesz park és felnőtt játszótér eszközök sportoláshoz",
      className: "sm:aspect-auto",
    },
  ];

  return (
    <section className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        {/* Fejléc + Link */}
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {t.section_title}
          </h2>
          <Link
            href={`/${lang}/termekek`}
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            {t.browse_all}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        {/* Képes Rács */}
        <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`group relative aspect-[2/1] overflow-hidden rounded-lg ${category.className}`}
            >
              <Image
                src={category.imageSrc}
                alt={category.imageAlt}
                fill
                // OPTIMALIZÁLÁS:
                // Mobilon (max-width: 640px) 100vw (teljes szélesség)
                // Azon felül 50vw (a képernyő fele, mivel 2 oszlopos a grid)
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out" // Tettem rá egy kis zoom effektet hoverre :)
              />
              {/* Sötét átmenet a szöveg olvashatóságáért */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-80"
              />

              {/* Szöveg és Link */}
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-white text-xl">
                    <Link href={category.href}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-gray-300">
                    {category.cta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobil Link (csak kis képernyőn látszik) */}
        <div className="mt-6 sm:hidden">
          <Link
            href={`/${lang}/termekek`}
            className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500"
          >
            {t.browse_all}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
