"use client";

import { useState } from "react";
import Link from "next/link";

// --- JAVÍTVA: HIÁNYZÓ IMPORTOK PÓTOLVA ---
// Ezek kellenek a mobil menühöz és a lenyíláshoz
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Ikonok az új Mega-Menühöz (ahogy kérted)
import {
  BookOpenIcon,
  BriefcaseIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  NewspaperIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  UsersIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";

// --- Dinamikus Ikon Térkép (Változatlan) ---
// Ez köti össze a JSON-t és az importált ikonokat
const iconMap: { [key: string]: React.ComponentType<any> } = {
  "/rolunk": InformationCircleIcon,
  "/partnerek": UsersIcon,
  "/hirek": NewspaperIcon,
  "/karrier": BriefcaseIcon,
  "/tanusitvanyok": ShieldCheckIcon,
  "/kozosseg": UserGroupIcon,
  "/telepites": BookOpenIcon,
  "/biztonsag": GlobeAltIcon,
  "/gyik": VideoCameraIcon,
};

// --- Props (Változatlan) ---
type Props = {
  lang: string;
  dict: any;
};

export default function HeaderClient({ lang, dict }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // TÖRÖLVE: const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  // --- Adatok a szótárból (Változatlan) ---
  const nav = dict?.navbar || {};
  const megaMenu = nav?.mega_menu || {};
  const engagementLinks = megaMenu?.engagement?.links || [];
  const resourcesLinks = megaMenu?.resources?.links || [];

  // Statikus "Recent Posts" (Változatlan)
  const recentPosts = [
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "#",
      date: "Mar 16, 2023",
      datetime: "2023-03-16",
      imageUrl:
        "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    },
    {
      id: 2,
      title: "How to use search engine optimization",
      href: "#",
      date: "Mar 10, 2023",
      datetime: "2023-03-10",
      imageUrl:
        "https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3270&q=80",
    },
  ];

  return (
    // JAVÍTVA: Hozzáadtam az 'isolate' osztályt.
    // Ez egy új stacking context-et hoz létre, ami garantálja,
    // hogy a 'z-50' header és a 'z-10' panelje MINDIG a <main> tartalom FELETT legyen.
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 isolate">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* LOGO (Változatlan) */}
        <div className="flex lg:flex-1">
          <Link href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Terra Forte Bau</span>
            <img
              alt="Terra Forte Bau Logo"
              src="https://placehold.co/200x50/indigo/white?text=Terra+Forte"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* MOBIL MENÜ GOMB (Változatlan) */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Menü nyitása</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>

        {/* ASZTALI MENÜ */}
        <div className="hidden lg:flex lg:gap-x-12">
          {/* --- CSERE KEZDETE: A "Mankó" helyett a Headless UI Mega-Menü --- */}
          {/* A 'z-50' itt már nem kell, mert a szülő <header> kezeli */}
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 outline-none hover:text-indigo-600 transition-colors data-[open]:text-indigo-600">
              {nav?.products || "Termékek"}
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none text-gray-400 transition-transform data-[open]:rotate-180"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              // JAVÍTVA: 'z-10' hozzáadva, hogy a headeren belül is felül legyen
              className="absolute inset-x-0 -left-1/2 top-full z-10 mt-5 w-screen max-w-7xl overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              {/* Ez a rész 1:1-ben az új Catalyst kód, amit küldtél, csak magyarítva */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 top-1/2 bg-white shadow-lg ring-1 ring-gray-900/5"
                />
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
                  {/* Bal oszlop: Linkek */}
                  <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
                    {/* Cégünkről szekció */}
                    <div>
                      <h3 className="text-sm font-medium leading-6 text-gray-500">
                        {megaMenu?.engagement?.title || "Cégünkről"}
                      </h3>
                      <div className="mt-6 flow-root">
                        <div className="-my-2">
                          {engagementLinks.map((item: any) => {
                            const Icon =
                              iconMap[item.href] || InformationCircleIcon;
                            return (
                              <Link
                                key={item.name}
                                href={`/${lang}${item.href}`}
                                className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                              >
                                <Icon
                                  aria-hidden="true"
                                  className="size-6 flex-none text-gray-400"
                                />
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    {/* Tudástár szekció */}
                    <div>
                      <h3 className="text-sm font-medium leading-6 text-gray-500">
                        {megaMenu?.resources?.title || "Tudástár"}
                      </h3>
                      <div className="mt-6 flow-root">
                        <div className="-my-2">
                          {resourcesLinks.map((item: any) => {
                            const Icon = iconMap[item.href] || BookOpenIcon;
                            return (
                              <Link
                                key={item.name}
                                href={`/${lang}${item.href}`}
                                className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                              >
                                <Icon
                                  aria-hidden="true"
                                  className="size-6 flex-none text-gray-400"
                                />
                                {item.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Jobb oszlop: Friss Hírek (Statikus) */}
                  <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                    <h3 className="sr-only">
                      {megaMenu?.recent_posts_title || "Friss Hírek"}
                    </h3>
                    {recentPosts.map((post) => (
                      <article
                        key={post.id}
                        className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                      >
                        <div className="relative flex-none">
                          <img
                            alt=""
                            src={post.imageUrl}
                            className="aspect-[2/1] w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto"
                            onError={(e) =>
                              (e.currentTarget.src =
                                "https://placehold.co/360x180?text=Hirkep")
                            }
                          />
                          <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div>
                          <div className="flex items-center gap-x-4">
                            <time
                              dateTime={post.datetime}
                              className="text-sm leading-6 text-gray-600"
                            >
                              {post.date}
                            </time>
                          </div>
                          <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                            <a href={post.href}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </a>
                          </h4>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Popover>
          {/* --- CSERE VÉGE --- */}

          {/* SIMA MENÜPONTOK (Változatlan) */}
          <Link
            href={`/${lang}/rolunk`}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {nav?.about || "Rólunk"}
          </Link>
          <Link
            href={`/${lang}/referenciak`}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {nav?.references || "Referenciák"}
          </Link>
          <Link
            href={`/${lang}/kapcsolat`}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600 transition-colors"
          >
            {nav?.contact || "Kapcsolat"}
          </Link>
        </div>

        {/* GOMBOK (Változatlan) */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          <div className="text-sm font-semibold text-gray-900">HU | EN</div>
          <Link
            href={`/${lang}/ajanlatkeres`}
            className="text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 shadow-sm transition-all hover:shadow-md"
          >
            {nav?.quote_btn || "Ajánlatkérés"}
          </Link>
        </div>
      </nav>

      {/* MOBIL MENÜ (JAVÍTVA: Headless UI-t használ) */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        {/* Most már a Dialog is a 'z-50'-es header kontextusban van */}
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 slide-in-from-right duration-300">
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`} className="-m-1.5 p-1.5">
              <img
                alt="Logo"
                src="https://placehold.co/200x50/indigo/white?text=Terra+Forte"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* Mobil Termékek (JAVÍTVA: Disclosure-t használ) */}
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    {nav?.products || "Termékek"}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2 pl-6 border-l-2 border-gray-100 ml-2">
                    {engagementLinks.map((item: any) => (
                      <Link
                        key={item.name}
                        href={`/${lang}${item.href}`}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    {resourcesLinks.map((item: any) => (
                      <Link
                        key={item.name}
                        href={`/${lang}${item.href}`}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </DisclosurePanel>
                </Disclosure>

                <Link
                  href={`/${lang}/rolunk`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.about || "Rólunk"}
                </Link>
                <Link
                  href={`/${lang}/referenciak`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.references || "Referenciák"}
                </Link>
                <Link
                  href={`/${lang}/kapcsolat`}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.contact || "Kapcsolat"}
                </Link>
              </div>
              <div className="py-6">
                {/* <LanguageSwitcher /> */}
                <div className="text-sm font-semibold text-gray-900 mb-4">
                  HU | EN
                </div>
                <Link
                  href={`/${lang}/ajanlatkeres`}
                  className="block w-full text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.quote_btn || "Ajánlatkérés"}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
