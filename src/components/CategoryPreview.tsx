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
      // Fa játszótér kép
      imageSrc: "/Kategoria/fa-jatszoter.png",
      imageAlt: "Fa mászóka és csúszda parkos környezetben",
      className: "sm:row-span-2 sm:aspect-square", // A "nagy" kártya (bal oldal)
    },
    {
      name: t.items.metal.title,
      cta: t.items.metal.cta,
      href: `/${lang}/termekek/fem-jatszoterek`,
      // Fém játszótér kép
      imageSrc: "/Kategoria/fem-jatszoter.png",
      imageAlt: "Modern fém mászóka",
      className: "sm:aspect-auto", // A "kicsi" kártya (jobb felső)
    },
    {
      name: t.items.fitness.title,
      cta: t.items.fitness.cta,
      href: `/${lang}/termekek/kulteri-fitnesz`,
      // Fitnesz kép
      imageSrc: "/Kategoria/fitnesz.png",
      imageAlt: "Kültéri fitnesz eszközök",
      className: "sm:aspect-auto", // A "kicsi" kártya (jobb alsó)
    },
  ];

  return (
    <section className="bg-gray-50">
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
                className="object-cover object-center group-hover:opacity-75 transition-opacity"
              />
              {/* Sötét átmenet a szöveg olvashatóságáért */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
              />

              {/* Szöveg és Link */}
              <div className="absolute inset-0 flex items-end p-6">
                <div>
                  <h3 className="font-semibold text-white">
                    <Link href={category.href}>
                      <span className="absolute inset-0" />
                      {category.name}
                    </Link>
                  </h3>
                  <p aria-hidden="true" className="mt-1 text-sm text-white">
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
