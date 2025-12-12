import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";

export default async function Partners({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);

  // Ellenőrizzük, hogy hol van a JSON-ben a Partners blokk.
  // Ha a gyökérbe tetted: dict.Partners
  // Ha a HomePage alá: dict.HomePage.Partners
  // A biztonság kedvéért így írom:
  const t = dict.Partners || dict.HomePage?.Partners;

  if (!t) return null; // Ha nincs adat, nem jelenítünk meg semmit

  return (
    <section className="bg-stone-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Fejléc */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">{t.subtitle}</p>
        </div>

        {/* Logók Rácsa */}
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-5 items-start">
          {/* @ts-ignore - A JSON típusát nem mindig ismeri fel, de működik */}
          {t.items.map((partner: any, index: number) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-start gap-4 text-center"
            >
              {/* Logó tartó doboz (Fix magasság a rendezettségért) */}
              <div className="relative h-16 w-full max-w-[140px] transition-all duration-300 filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain" // Ez torzítás nélkül méretezi a logót
                />
              </div>

              {/* Szöveges rész */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {partner.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
