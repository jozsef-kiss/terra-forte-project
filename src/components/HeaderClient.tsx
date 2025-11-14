"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";

import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

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

type Props = {
  lang: string;
  dict: any;
};

const languages = [
  { code: "hu", name: "Magyar", flag: "🇭🇺" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

export default function HeaderClient({ lang, dict }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const nav = dict?.navbar || {};
  const megaMenu = nav?.mega_menu || {};
  const engagementLinks = megaMenu?.engagement?.links || [];
  const resourcesLinks = megaMenu?.resources?.links || [];

  const isActive = (path: string) => {
    return (
      pathname === `/${lang}${path}` || pathname?.startsWith(`/${lang}${path}/`)
    );
  };

  const switchLanguage = (newLang: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLang;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  // Ez nyitja meg a menüt, ha az egér a gomb fölé ér
  const onHover = (open: boolean) => {
    if (!open) {
      buttonRef.current?.click();
    }
  };

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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 isolate">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
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

        <div className="hidden lg:flex lg:gap-x-12">
          <Popover className="flex">
            {(
              { open, close } // Itt kérjük el a 'close' függvényt
            ) => (
              <div
                className="flex"
                // 1. Ha az egér belép ebbe a közös térbe (gomb + panel), kinyitjuk
                onMouseEnter={() => onHover(open)}
                // 2. Ha az egér ELHAGYJA ezt a közös teret, bezárjuk
                onMouseLeave={() => {
                  if (open) {
                    close(); // Ez a Headless UI hivatalos bezáró függvénye
                  }
                }}
              >
                <PopoverButton
                  ref={buttonRef}
                  className={`flex items-center gap-x-1 text-sm font-semibold leading-6 outline-none transition-colors ${
                    open
                      ? "text-indigo-600"
                      : "text-gray-900 hover:text-indigo-600"
                  }`}
                >
                  {nav?.products || "Termékek"}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`size-5 flex-none text-gray-400 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute inset-x-0 top-full z-20 bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {/* Mivel ez a Panel a fenti 'div' gyereke, amíg itt van az egér,
                      az onMouseLeave NEM fut le. Ez a titok! */}
                  <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
                      <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
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
              </div>
            )}
          </Popover>

          <Link
            href={`/${lang}/rolunk`}
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActive("/rolunk")
                ? "text-indigo-600"
                : "text-gray-900 hover:text-indigo-600"
            }`}
          >
            {nav?.about || "Rólunk"}
          </Link>
          <Link
            href={`/${lang}/referenciak`}
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActive("/referenciak")
                ? "text-indigo-600"
                : "text-gray-900 hover:text-indigo-600"
            }`}
          >
            {nav?.references || "Referenciák"}
          </Link>
          <Link
            href={`/${lang}/kapcsolat`}
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActive("/kapcsolat")
                ? "text-indigo-600"
                : "text-gray-900 hover:text-indigo-600"
            }`}
          >
            {nav?.contact || "Kapcsolat"}
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 items-center">
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="group inline-flex items-center justify-center text-sm font-semibold text-gray-900 hover:text-indigo-600">
              <GlobeAltIcon
                className="mr-1.5 h-5 w-5 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
              />
              {lang.toUpperCase()}
              <ChevronDownIcon
                className="-mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-indigo-500"
                aria-hidden="true"
              />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                {languages.map((l) => (
                  <MenuItem key={l.code}>
                    <button
                      onClick={() => switchLanguage(l.code)}
                      className={`group flex w-full items-center px-4 py-2 text-sm ${
                        lang === l.code
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                      }`}
                    >
                      <span className="mr-3 text-lg">{l.flag}</span>
                      <span className="flex-1 text-left">{l.name}</span>
                      {lang === l.code && (
                        <CheckIcon
                          className="h-4 w-4 text-indigo-600"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>

          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

          <Link
            href={`/${lang}/ajanlatkeres`}
            className="text-sm font-semibold leading-6 text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-500 shadow-sm transition-all hover:shadow-md"
          >
            {nav?.quote_btn || "Ajánlatkérés"}
          </Link>
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
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
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                    isActive("/rolunk")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.about || "Rólunk"}
                </Link>
                <Link
                  href={`/${lang}/referenciak`}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                    isActive("/referenciak")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.references || "Referenciák"}
                </Link>
                <Link
                  href={`/${lang}/kapcsolat`}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                    isActive("/kapcsolat")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.contact || "Kapcsolat"}
                </Link>
              </div>

              <div className="py-6">
                <div className="mb-4 flex gap-4 justify-center">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        switchLanguage(l.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`px-3 py-1 rounded-md text-sm font-semibold ${
                        lang === l.code
                          ? "bg-indigo-100 text-indigo-600"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {l.flag} {l.code.toUpperCase()}
                    </button>
                  ))}
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
