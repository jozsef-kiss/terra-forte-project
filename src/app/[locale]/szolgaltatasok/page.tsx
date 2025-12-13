import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";
import Link from "next/link";
import {
  ClipboardDocumentCheckIcon,
  PencilSquareIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

// Kis segédkomponens a pipákhoz
function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`w-5 h-5 flex-none ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  );
}

// Ikonok térképe a folyamathoz
const workflowIcons = [
  ClipboardDocumentCheckIcon, // Igényfelmérés
  PencilSquareIcon, // Tervezés
  Cog6ToothIcon, // Gyártás
  WrenchScrewdriverIcon, // Kivitelezés
];

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const t = dict.ServicesPage;

  return (
    <div className="bg-stone-50 overflow-hidden">
      <main className="isolate">
        {/* --- 1. HERO SZEKCIÓ --- */}
        <div className="relative isolate -z-10 border-b border-stone-200 bg-white">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-stone-50 opacity-80"></div>
          </div>

          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t.Hero.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              {t.Hero.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${lang}/ajanlatkeres`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t.Hero.cta}
              </Link>
            </div>
          </div>
        </div>

        {/* --- 2. MUNKAFOLYAMAT (WORKFLOW) --- */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.Workflow.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              {t.Workflow.subtitle}
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            {t.Workflow.steps.map((step: any, index: number) => {
              const Icon = workflowIcons[index] || WrenchScrewdriverIcon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:border-indigo-100 transition-colors"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 mb-6">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- 3. RÉSZLETES SZOLGÁLTATÁSOK --- */}
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
            {/* Title */}
            <div className="mx-auto  text-center mb-30">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t.Details.title}
              </h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                {t.Details.subtitle}
              </p>
            </div>
            {/* Production */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                  <Image
                    src="/Szolgaltatasok/service-1.png"
                    alt="Játszótér tervezés"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                  {t.Details.Production.title}
                </h2>
                <p className="text-lg leading-8 text-gray-600">
                  {t.Details.Production.description}
                </p>
                {/* DINAMIKUS LISTA */}
                <ul className="mt-8 space-y-3 text-gray-600">
                  {t.Details.Production.features.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-indigo-600" /> {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Consulting */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                  {t.Details.Consulting.title}
                </h2>
                <p className="text-lg leading-8 text-gray-600">
                  {t.Details.Consulting.description}
                </p>
                {/* DINAMIKUS LISTA */}
                <ul className="mt-8 space-y-3 text-gray-600">
                  {t.Details.Consulting.features.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-indigo-600" /> {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="order-2">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                  <Image
                    src="/Szolgaltatasok/service-2.png"
                    alt="Játszótér gyártás"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Installation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                  <Image
                    src="/Szolgaltatasok/service-3.png"
                    alt="Játszótér kivitelezés"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                  {t.Details.Installation.title}
                </h2>
                <p className="text-lg leading-8 text-gray-600">
                  {t.Details.Installation.description}
                </p>
                {/* DINAMIKUS LISTA */}
                <ul className="mt-8 space-y-3 text-gray-600">
                  {t.Details.Installation.features.map(
                    (item: string, i: number) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="text-indigo-600" /> {item}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Audit */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-1">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600 mb-6">
                  <ShieldCheckIcon className="h-4 w-4" />{" "}
                  {t.Details.Audit.badge}
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
                  {t.Details.Audit.title}
                </h2>
                <p className="text-lg leading-8 text-gray-600">
                  {t.Details.Audit.description}
                </p>
                {/* DINAMIKUS LISTA */}
                <ul className="mt-8 space-y-3 text-gray-600">
                  {t.Details.Audit.features.map((item: string, i: number) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="text-indigo-600" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-2">
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl border border-stone-200">
                  <Image
                    src="/Szolgaltatasok/service-4.png"
                    alt="Játszótér karbantartás"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. FAQ (GYIK) --- */}
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900 text-center mb-10">
              {t.FAQ.title}
            </h2>
            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
              {t.FAQ.items.map((faq: any) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  <dt>
                    {/* A gomb változatlan marad a tiltásokkal */}
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900 hover:!transform-none hover:!shadow-none">
                      <span className="text-base font-semibold leading-7">
                        {faq.question}
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <ChevronDownIcon
                          className="h-6 w-6 transform text-indigo-600 transition-transform duration-200 group-data-[open]:rotate-180"
                          aria-hidden="true"
                        />
                      </span>
                    </DisclosureButton>
                  </dt>

                  {/* JAVÍTÁS: Grid trükk a magasság animálásához */}
                  <DisclosurePanel
                    transition
                    className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out data-[closed]:grid-rows-[0fr]"
                  >
                    {/* Belső wrapper az overflow-hidden miatt (ez vágja le a tartalmat csukáskor) */}
                    <div className="overflow-hidden">
                      {/* A padding/margin ide került be, hogy az is animálódjon */}
                      <p className="mt-2 pr-12 text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>

        {/* --- 5. CTA --- */}
        <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 bg-stone-100 border-t border-stone-200">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {t.CTA.title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
              {t.CTA.subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href={`/${lang}/ajanlatkeres`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {t.CTA.btn}
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
