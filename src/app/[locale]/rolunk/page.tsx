import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

// Adatok
const stats = [
  { label: "Év szakmai tapasztalat", value: "10+" },
  { label: "Sikeresen átadott játszótér", value: "50+" },
  { label: "Magyar tulajdon", value: "100%" },
  { label: "Garancia a termékekre", value: "5 Év" },
];

const values = [
  {
    name: "Biztonság mindenek felett",
    description:
      "Nem ismerünk kompromisszumot, ha gyerekekről van szó. Minden eszközünk megfelel a legszigorúbb MSZ EN 1176 szabványoknak.",
  },
  {
    name: "Innovatív anyaghasználat",
    description:
      "UV-stabil műanyagok, CNC-megmunkált elemek és időjárásálló kezelések biztosítják a hosszú élettartamot.",
  },
  {
    name: "Közösségépítés",
    description:
      "Célunk nem csak eszközök telepítése, hanem olyan terek létrehozása, ahol a családok és közösségek találkozhatnak.",
  },
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;

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
                Több mint 10 éve építünk közösségi tereket.
              </h1>
              <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                <p className="text-lg leading-8 text-gray-600">
                  A Terra Forte Bau Kft. története a szenvedélyről, a
                  biztonságról és a hazai szakértelemről szól. Célunk, hogy
                  olyan játszótereket alkossunk, amelyek generációkon át
                  szolgálják a gyermekek örömét.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href={`/${lang}/kapcsolat`}
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Vegye fel velünk a kapcsolatot
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
                Számokban a megbízhatóság
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                Büszkék vagyunk az elért eredményeinkre és a partnereink
                bizalmára.
              </p>
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
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
                Nem csak építünk. <br />
                <span className="text-indigo-600">Értéket teremtünk.</span>
              </h2>
              <p className="mt-6 text-xl leading-8 text-gray-600">
                Saját gyártói kapacitásunkkal és telepítő csapatunkkal a
                folyamat minden lépését kézben tartjuk.
              </p>
              <div className="mt-10 text-base leading-7 text-gray-700 space-y-4">
                <p>
                  A Terra Forte Bau-nál hiszünk abban, hogy a játszótér több,
                  mint egymás mellé helyezett eszközök halmaza. Ez a gyermekkor
                  színtere, a mozgás örömének forrása és a közösség találkozási
                  pontja.
                </p>
                <p>
                  Mint <strong>magyar gyártó</strong>, különös figyelmet
                  fordítunk arra, hogy termékeink ne csak megfeleljenek az uniós
                  szabványoknak, hanem esztétikailag is illeszkedjenek a
                  környezetbe, legyen szó modern lakóparkról vagy erdei
                  iskoláról.
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

        {/* --- 4. ÉRTÉKEINK (ITT A MÓDOSÍTÁS) --- */}
        {/* Hozzáadva: border-t border-stone-200 pt-24 (Felső vonal + térköz) */}
        <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8 mb-24 border-t border-stone-100 pt-24 sm:pt-32">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Alapelveink
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Ezek azok az oszlopok, amelyekre minden projektünket építjük.
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8"
          >
            {values.map((value) => (
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
              Készen áll a tervezésre?
              <br />
              Valósítsuk meg elképzeléseit.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Kérjen ingyenes helyszíni felmérést, és mi segítünk kiválasztani a
              területhez és költségkerethez legjobban illeszkedő eszközöket.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${lang}/ajanlatkeres`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ingyenes Árajánlatkérés
              </Link>
              <Link
                href={`/${lang}/referenciak`}
                className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
              >
                Referenciák megtekintése <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
