"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

// Nyelvek és zászlók (CDN)
const languages = [
  { key: "hu", name: "Magyar", flagUrl: "https://flagcdn.com/w40/hu.png" },
  { key: "en", name: "English", flagUrl: "https://flagcdn.com/w40/gb.png" },
  { key: "de", name: "Deutsch", flagUrl: "https://flagcdn.com/w40/de.png" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const safePathname = pathname && pathname.length > 0 ? pathname : "/";
  const pathSegments = safePathname.split("/").filter(Boolean);
  const currentLangKey = pathSegments[0] ?? "hu";
  const selectedLanguage =
    languages.find((l) => l.key === currentLangKey) || languages[0];

  const handleLocaleChange = (newLocale: string) => {
    const segments = [...pathSegments];
    if (segments.length > 0) {
      segments[0] = newLocale;
    } else {
      segments.push(newLocale);
    }
    const newPath = `/${segments.join("/")}`;
    setIsOpen(false);
    router.push(newPath);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* --- FŐ GOMB (3D Hatással) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        // ITT A MÓDOSÍTÁS:
        // 1. transition-all: Minden változás (szín, pozíció, árnyék) animálva van.
        // 2. focus:outline-none: Eltüntettük a kék/zöld keretet.
        // 3. Feltételes formázás (isOpen ? ... : ...):
        //    - Ha NYITVA van: sötétebb háttér (bg-stone-100), belső árnyék (shadow-inner), és 1px-el lejjebb csúszik (translate-y-px).
        //    - Ha ZÁRVA van: fehér háttér, külső árnyék (shadow-sm), és hover-re kiemelkedik (shadow-md).
        className={`
          group inline-flex items-center justify-center rounded-xl border border-stone-200 px-3 py-2 text-sm font-medium text-stone-700 
          transition-all duration-200 ease-out focus:outline-none
          ${
            isOpen
              ? "bg-stone-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] translate-y-[1px] border-stone-300"
              : "bg-white shadow-sm hover:bg-stone-50 hover:shadow-md hover:-translate-y-[1px]"
          }
        `}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden border border-stone-200 mr-2 shadow-sm bg-white">
          <img
            src={selectedLanguage.flagUrl}
            alt={selectedLanguage.name}
            className="w-full h-full object-cover transform scale-125"
          />
        </div>

        <span className="uppercase font-bold text-stone-600 select-none">
          {selectedLanguage.key}
        </span>

        <svg
          // A nyíl is alkalmazkodik: ha benyomva van, kicsit sötétebb
          className={`ml-2 h-4 w-4 transition-transform duration-300 ${
            isOpen
              ? "rotate-180 text-indigo-600"
              : "text-indigo-600 group-hover:text-indigo-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>

      {/* --- LENYÍLÓ LISTA --- */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-xl shadow-xl bg-white ring-1 ring-black/5 focus:outline-none animate-dropdown-open overflow-hidden z-50">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.key}
                onClick={() => handleLocaleChange(language.key)}
                className={`${
                  selectedLanguage.key === language.key
                    ? "bg-stone-50 text-indigo-700 font-semibold"
                    : "text-stone-700 hover:bg-stone-50"
                } group flex w-full items-center px-4 py-2.5 text-sm transition-colors duration-150`}
              >
                <div className="flex items-center justify-center w-5 h-5 rounded-full overflow-hidden border border-stone-200 mr-3 shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <img
                    src={language.flagUrl}
                    alt={language.name}
                    className="w-full h-full object-cover transform scale-125"
                  />
                </div>
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
