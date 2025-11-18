import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";
import {
  PencilSquareIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";

export default async function ServicesSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.ServicesSection;

  // Ikonok hozzárendelése a listaelemekhez sorrendben
  const icons = [PencilSquareIcon, Cog6ToothIcon, WrenchScrewdriverIcon];

  return (
    <section className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {/* Szöveges rész (Jobb oldalon nagy képernyőn) */}
          <div className="lg:ml-auto lg:pt-4 lg:pl-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                {t.badge}
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {t.title}
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">{t.description}</p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {t.features.map((feature: any, index: number) => {
                  const Icon = icons[index] || WrenchScrewdriverIcon;
                  return (
                    <div key={feature.name} className="relative pl-9">
                      <dt className="inline font-semibold text-gray-900">
                        <Icon
                          aria-hidden="true"
                          className="absolute top-1 left-1 size-5 text-indigo-600"
                        />
                        {feature.name}
                      </dt>{" "}
                      <dd className="inline">{feature.description}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          {/* Kép (Bal oldalon nagy képernyőn az 'lg:order-first' miatt) */}
          <div className="flex items-start justify-end lg:order-first">
            <Image
              alt="Játszótér tervezés és kivitelezés folyamata"
              // FONTOS: Ezt a képet majd fel kell töltened a public/Szolgaltatas mappába!
              // Ha még nincs meg, ideiglenesen a hero képet használom, de cseréld le!
              src="/Hero/hero.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
