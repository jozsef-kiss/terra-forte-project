"use client"; // Kötelező, mert az Error boundaryk mindig kliens komponensek

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";

// Mivel az Error komponens nem lehet async (szerver),
// itt helyben definiáljuk a biztonsági szövegeket.
const translations = {
  hu: {
    title: "Valami hiba történt!",
    description:
      "Sajnáljuk, váratlan hiba lépett fel az oldal betöltése közben. A fejlesztőink már értesültek a problémáról.",
    retry: "Próbálja újra",
    home: "Vissza a főoldalra",
  },
  en: {
    title: "Something went wrong!",
    description:
      "We apologize, an unexpected error occurred while loading the page. Our developers have been notified.",
    retry: "Try again",
    home: "Back to Home",
  },
  de: {
    title: "Etwas ist schief gelaufen!",
    description:
      "Es tut uns leid, beim Laden der Seite ist ein unerwarteter Fehler aufgetreten. Unsere Entwickler wurden benachrichtigt.",
    retry: "Erneut versuchen",
    home: "Zurück zur Startseite",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const params = useParams();
  // Biztonsági háló: ha nincs nyelvkód, magyarra esünk vissza
  const lang = (params.locale as "hu" | "en" | "de") || "hu";
  const t = translations[lang] || translations["hu"];

  useEffect(() => {
    // Itt lehetne naplózni a hibát egy külső rendszerbe (pl. Sentry)
    console.error("Alkalmazás hiba:", error);
  }, [error]);

  return (
    <div className="bg-stone-50 min-h-[80vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-6">
          <ExclamationTriangleIcon
            className="h-8 w-8 text-red-600"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {t.title}
        </h1>

        <p className="mt-6 text-base leading-7 text-gray-600 max-w-lg mx-auto">
          {t.description}
        </p>

        {/* Ha van hibakód (digest), kiírjuk diszkréten a fejlesztéshez */}
        {error.digest && (
          <p className="mt-2 text-xs text-gray-400 font-mono">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* Reset gomb: Megpróbálja újratölteni a hibás komponenst */}
          <Button onClick={() => reset()} color="indigo">
            {t.retry}
          </Button>

          {/* Főoldal gomb: Biztonságos kimenekülés */}
          <Button href={`/${lang}`} plain>
            {t.home} <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
