"use client";

import { useState, useRef, useEffect } from "react"; // ÚJ: useEffect importálva
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Image from "next/image";

// --- Headless UI Importok ---
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

// Heroicons
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  MapPinIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

import {
  CubeIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon,
  PuzzlePieceIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

// Ikon térkép a kategóriákhoz
const iconMap: { [key: string]: React.ComponentType<any> } = {
  "/termekek/fa-jatszoterek": CubeIcon,
  "/termekek/fem-jatszoterek": BuildingLibraryIcon,
  "/termekek/hintak": SparklesIcon,
  "/termekek/kulteri-fitnesz": HeartIcon,
  "/termekek/rugos-jatekok": PuzzlePieceIcon,
  "/termekek/utcabutorok": TrophyIcon,
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

  // --- ÚJ: Görgetés figyelése állapottal ---
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const nav = dict?.navbar || {};
  const topBar = nav?.top_bar || {};
  const megaMenu = nav?.mega_menu || {};
  const categoryLinks = megaMenu?.categories?.links || [];
  const featuredLinks = megaMenu?.featured?.links || [];

  // --- ÚJ: useEffect a görgetés figyelésére ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // A Top Bar kb 40-50px magas. Ezért a határértéket
      // nagyobbra vesszük (60), hogy biztosan eltűnjön, mire váltunk.
      // Külön 'if'-eket használunk, hogy legyen egy "semleges zóna" 40 és 60 között.

      if (currentScroll > 100) {
        setIsScrolled(true); // Összenyomás
      } else if (currentScroll < 40) {
        setIsScrolled(false); // Visszanövelés
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const onHover = (open: boolean) => {
    if (!open) {
      buttonRef.current?.click();
    }
  };

  return (
    // A sticky 'top-0' miatt a Top Bar + Navbar együtt tapad a tetejére
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 isolate transition-all duration-300">
      {/* --- TOP BAR (BANNER) --- */}
      {/* ÚJ: Ha görgetünk (isScrolled), a magasságot 0-ra vesszük és elrejtjük (overflow-hidden), 
          így teljesen eltűnik görgetéskor, még több helyet hagyva. 
          HA azt akarod, hogy maradjon, csak töröld a `transition-all` és `h-0` részeket. */}
      <div
        className={`bg-indigo-950 text-white overflow-hidden transition-all duration-300 ${
          isScrolled ? "h-0 py-0 opacity-0" : "h-auto py-2 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 text-xs sm:text-sm">
          {/* Bal oldal: Kapcsolat */}
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            <a
              href={`tel:${topBar.phone}`}
              className="flex items-center gap-x-2 hover:text-indigo-300 transition"
            >
              <PhoneIcon className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">
                {topBar.call_us || "Hívjon minket:"}
              </span>
              <span className="font-semibold">{topBar.phone}</span>
            </a>
            <a
              href={`mailto:${topBar.email}`}
              className="hidden sm:flex items-center gap-x-2 hover:text-indigo-300 transition"
            >
              <EnvelopeIcon className="h-4 w-4" aria-hidden="true" />
              <span>{topBar.email}</span>
            </a>
            <div className="hidden xl:flex items-center gap-x-2 text-slate-300">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              <span>{topBar.address}</span>
            </div>
          </div>
          {/* Közép: Marketing */}
          <div className="hidden lg:block font-medium text-indigo-300">
            {topBar.marketing_text}
          </div>
          {/* Jobb oldal: Social */}
          <div className="flex items-center gap-x-4">
            <a
              href="https://www.facebook.com/terrafortebau"
              className="hover:text-indigo-300 transition"
              aria-label="Facebook"
              target="_blank"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* --- FŐ NAVBAR  --- */}
      {/* ÚJ: Dinamikus padding (p-6 helyett py-X) és transition */}
      <nav
        aria-label="Global"
        className={`mx-auto flex max-w-7xl items-center justify-between transition-all duration-300 px-6 lg:px-8 ${
          isScrolled ? "py-2" : "py-6"
        }`}
      >
        {/* LOGO */}
        <div className="flex lg:flex-1">
          <Link href={`/${lang}`} className="-m-1.5 p-1.5">
            <span className="sr-only">Terra Forte Bau</span>
            {/* ÚJ: Dinamikus logó méret */}
            <Image
              src="/terra-forte-bau-logo.svg"
              alt="Terra Forte Bau Logo"
              width={180}
              height={60}
              className={`w-auto transition-all duration-300 ${
                isScrolled ? "h-10 md:h-12" : "h-12 md:h-16"
              }`}
              priority
            />
          </Link>
        </div>

        {/* MOBIL MENÜ GOMB */}
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
        <div className="hidden lg:flex lg:gap-x-8">
          {/* 1. TERMÉKEINK (MEGA MENU) */}
          <Popover className="flex">
            {({ open, close }) => (
              <div
                className="flex"
                onMouseEnter={() => onHover(open)}
                onMouseLeave={() => {
                  if (open) close();
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
                  {nav?.products || "Termékeink"}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className={`size-5 flex-none text-indigo-500 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute inset-x-0 top-full z-20 bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                      {/* Kategóriák oszlop (Szélesebb) */}
                      <div className="col-span-3 grid grid-cols-3 gap-x-6 gap-y-10">
                        <div>
                          <h3 className="text-sm font-medium leading-6 text-gray-500">
                            {megaMenu?.categories?.title || "Kategóriák"}
                          </h3>
                          <div className="mt-6 flow-root">
                            <div className="-my-2">
                              {categoryLinks.map((item: any) => {
                                const Icon = iconMap[item.href] || CubeIcon;
                                return (
                                  <Link
                                    key={item.name}
                                    href={`/${lang}${item.href}`}
                                    className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
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
                        {/* Kiemelt */}
                        <div>
                          <h3 className="text-sm font-medium leading-6 text-gray-500">
                            {megaMenu?.featured?.title || "Kiemelt"}
                          </h3>
                          <div className="mt-6 flow-root">
                            <div className="-my-2">
                              {featuredLinks.map((item: any) => (
                                <Link
                                  key={item.name}
                                  href={`/${lang}${item.href}`}
                                  className="flex gap-x-4 py-2 text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Blog / Friss hírek oszlop (Jobb szél) */}
                      <div className="col-span-1">
                        <h3 className="text-sm font-medium leading-6 text-gray-500">
                          {nav?.blog || "Blog"}
                        </h3>
                        <div className="mt-6 text-sm">
                          <p className="text-gray-600">
                            Friss hírek a játszótér építés világából...
                          </p>
                          <Link
                            href={`/${lang}/blog`}
                            className="mt-4 inline-block text-indigo-600 hover:text-indigo-500 font-semibold"
                          >
                            Tovább a blogra &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </div>
            )}
          </Popover>

          {/* EGYÉB MENÜPONTOK */}
          <Link
            href={`/${lang}/szolgaltatasok`}
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActive("/szolgaltatasok")
                ? "text-indigo-600"
                : "text-gray-900 hover:text-indigo-600"
            }`}
          >
            {nav?.services || "Szolgáltatások"}
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
            href={`/${lang}/blog`}
            className={`text-sm font-semibold leading-6 transition-colors ${
              isActive("/blog")
                ? "text-indigo-600"
                : "text-gray-900 hover:text-indigo-600"
            }`}
          >
            {nav?.blog || "Blog"}
          </Link>
        </div>

        {/* JOBB OLDAL: NYELVVÁLTÓ + CTA */}
        <div className="hidden lg:flex lg:flex-1 pl-6 lg:justify-end lg:gap-4 items-center">
          {/* Nyelvváltó */}
          <LanguageSwitcher />

          <div className="h-6 w-px bg-gray-200" aria-hidden="true" />

          {/* Másodlagos CTA: Kapcsolat */}
          <Button
            href={`/${lang}/kapcsolat`}
            className="btn-contact hidden lg:inline-flex"
          >
            {nav?.contact_btn || "Kapcsolat"}
          </Button>

          {/* Elsődleges CTA: Árajánlat */}
          <Button
            href={`/${lang}/ajanlatkeres`}
            className="btn-quote hidden lg:inline-flex "
          >
            {nav?.quote_btn || "Árajánlatkérés"}
          </Button>
        </div>
      </nav>

      {/* MOBIL MENÜ */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 slide-in-from-right duration-300">
          <div className="flex items-center justify-between">
            <Link href={`/${lang}`} className="-m-1.5 p-1.5">
              <Image
                src="/terra-forte-bau-logo.svg"
                alt="Terra Forte Bau Logo"
                width={180}
                height={60}
                className="h-12 w-auto"
                priority
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
                    {nav?.products || "Termékeink"}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2 pl-6 border-l-2 border-gray-100 ml-2">
                    {[...categoryLinks, ...featuredLinks].map((item: any) => (
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
                  href={`/${lang}/szolgaltatasok`}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                    isActive("/szolgaltatasok")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.services || "Szolgáltatások"}
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
                  href={`/${lang}/blog`}
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 ${
                    isActive("/blog")
                      ? "text-indigo-600 bg-gray-50"
                      : "text-gray-900"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.blog || "Blog"}
                </Link>
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
              </div>

              {/* Mobil gombok */}
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
                  href={`/${lang}/kapcsolat`}
                  className="block w-full text-center rounded-md px-3.5 py-2.5 text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-500 mb-3 border border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.contact_btn || "Kapcsolat"}
                </Link>

                <Link
                  href={`/${lang}/ajanlatkeres`}
                  className="block w-full text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {nav?.quote_btn || "Árajánlatkérés"}
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
