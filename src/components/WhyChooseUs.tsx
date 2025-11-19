import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import {
  UserGroupIcon,
  ShieldCheckIcon,
  PencilSquareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

export default async function WhyChooseUs({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.WhyChooseUs;

  // Ikonok sorrendben a szövegekhez
  const icons = [
    UserGroupIcon, // Családi/Helyi
    ShieldCheckIcon, // Biztonság
    PencilSquareIcon, // Egyedi tervezés
    SparklesIcon, // Tartósság/Minőség
  ];

  return (
    <section className="bg-stone-100 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-left mb-16">
          {/* A Moduplay stílusú sárga/színes vonal a cím előtt (itt Indigo) */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-2 bg-indigo-600 rounded-full"></div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.title}
            </h2>
          </div>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t.description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {t.features.map((feature: any, index: number) => {
              const Icon = icons[index] || SparklesIcon;
              return (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    {/* Kerek ikon háttér, mint a képen */}
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-indigo-600">
                      <Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 pl-14">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
