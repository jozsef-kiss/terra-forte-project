"use client"; // Fontos: Kliens oldali, hogy hozzáférjünk a params-hoz

import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

// Helyi fordítások a stabilitás érdekében
const translations = {
  hu: {
    title: "Az oldal nem található",
    description:
      "Sajnáljuk, de a keresett oldal nem létezik, vagy időközben áthelyezésre került.",
    home: "Vissza a főoldalra",
  },
  en: {
    title: "Page Not Found",
    description: "Sorry, we couldn’t find the page you’re looking for.",
    home: "Back to Home",
  },
  de: {
    title: "Seite nicht gefunden",
    description: "Entschuldigung, wir konnten die gesuchte Seite nicht finden.",
    home: "Zurück zur Startseite",
  },
};

export default function NotFound() {
  // Kinyerjük a nyelvet az URL-ből (pl. /hu/...)
  const pathname = usePathname();
  const langCode = pathname?.split("/")[1];

  // Biztonsági háló: ha nem felismerhető a nyelv, magyar legyen
  const lang = (
    langCode === "en" || langCode === "de" ? langCode : "hu"
  ) as keyof typeof translations;
  const t = translations[lang];

  return (
    <div className="bg-stone-50 min-h-[80vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 mb-6">
          <MagnifyingGlassIcon
            className="h-8 w-8 text-indigo-600"
            aria-hidden="true"
          />
        </div>

        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t.title}
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600 max-w-lg mx-auto">
          {t.description}
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* Vissza a főoldalra gomb */}
          <Button href={`/${lang}`} color="indigo">
            {t.home}
          </Button>
        </div>
      </div>
    </div>
  );
}
