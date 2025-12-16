import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  PencilSquareIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export default async function ServicesSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.ServicesSection;

  // Ikonok hozzárendelése a listaelemekhez sorrendben
  const icons = [
    PencilSquareIcon, // Tervezés / Tanácsadás
    Cog6ToothIcon, // Gyártás / Egyedi
    WrenchScrewdriverIcon, // Telepítés
    ShieldCheckIcon, // Karbantartás / Audit
  ];

  return (
    <section className="overflow-hidden bg-stone-50 py-24 sm:py-32">
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
              {/* Gomb */}
              <div className="mt-10 flex items-center gap-x-6">
                <Button
                  href={`/${lang}/szolgaltatasok`}
                  className="btn-contact"
                >
                  {t.cta_services} <span aria-hidden="true">→</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Kép (Bal oldalon nagy képernyőn az 'lg:order-first' miatt) */}
          <div className="flex items-start justify-end lg:order-first">
            <Image
              alt="Fa játszótér tervezése és kivitelezése parkos környezetben"
              src="/images/services/fa-jatszoter-tervezes-es-kivitelezes-szolgaltatas.jpg"
              width={2432}
              height={1442}
              sizes="(max-width: 1024px) 100vw, 50vw" // Mobilon teljes, desktopon fél szélesség
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
