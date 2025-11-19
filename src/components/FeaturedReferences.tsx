import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Catalyst Button, ha van, vagy sima HTML
import Image from "next/image";

export default async function FeaturedReferences({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.FeaturedReferences;

  return (
    <section className="overflow-hidden bg-stone-50 py-32">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          {/* Szöveges tartalom */}
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-6 text-xl leading-8 text-gray-700">{t.subtitle}</p>
            <p className="mt-6 text-base leading-7 text-gray-600">
              {t.description}
            </p>
            <div className="mt-10 flex">
              <Link
                href={`/${lang}/referenciak`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t.cta} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Képes kollázs (Referencia fotók helye) */}
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <Image
                alt="Telepített játszótér referenciakép 1"
                src="/Referencia/ref-1.jpg"
                width={1152}
                height={842}
                className="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover"
              />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                <Image
                  alt="Telepített játszótér referenciakép 2"
                  src="/Referencia/ref-2.jpeg"
                  width={768}
                  height={604}
                  className="aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <Image
                  alt="Telepített játszótér referenciakép 3"
                  src="/Referencia/ref-3.jpg"
                  width={1152}
                  height={842}
                  className="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <Image
                  alt="Telepített játszótér referenciakép 4"
                  src="/Referencia/ref-4.webp"
                  width={768}
                  height={604}
                  className="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
