import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import {
  ShieldCheckIcon,
  StarIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default async function USP({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.USP;

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-y-16 gap-x-8 sm:max-w-none sm:grid-cols-3">
          {/* 1. USP: Szabvány */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <ShieldCheckIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {t.standard}
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              {t.standard_desc}
            </p>
          </div>

          {/* 2. USP: Prémium Anyagok */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <StarIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {t.premium}
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              {t.premium_desc}
            </p>
          </div>

          {/* 3. USP: Teljeskörű Kivitelezés */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <WrenchScrewdriverIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </div>
            <h3 className="text-base font-semibold leading-7 text-gray-900">
              {t.full_service}
            </h3>
            <p className="mt-2 text-base leading-7 text-gray-600">
              {t.full_service_desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
