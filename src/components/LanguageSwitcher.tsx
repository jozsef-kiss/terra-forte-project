"use client"; // Ez jelzi, hogy ez egy interaktív Kliens Komponens

import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // A Next.js router a legelső client rendernél ideiglenesen adhat vissza null-t.
  // Ilyenkor esünk vissza az alapértelmezett "/" értékre, hogy ne dobjunk hibát.
  const safePathname = pathname && pathname.length > 0 ? pathname : "/";

  // Normalizáljuk az útvonalat (eltávolítjuk az üres szegmenseket), így minden esetet kezelünk.
  const pathSegments = safePathname.split("/").filter(Boolean);

  // Az aktuális nyelv kinyerése az URL-ből (pl. /en/...)
  // A pathname stringet felbontjuk a "/" mentén. A második elem (index 1) a nyelvkód.
  const currentLang = pathSegments[0] ?? "hu";

  const handleLocaleChange = (newLocale: string) => {
    const segments = [...pathSegments];

    // Kicseréljük a nyelvkódot az új nyelvre
    // Feltételezzük, hogy az URL mindig /[lang]/... formátumú
    if (segments.length > 0) {
      segments[0] = newLocale;
    } else {
      // Ha esetleg a gyökérben lennénk (bár a middleware ezt kezeli), beszúrjuk
      segments.push(newLocale);
    }

    const newPath = `/${segments.join("/")}`;
    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLang}
        onChange={(e) => handleLocaleChange(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-8 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer bg-transparent"
        aria-label="Nyelv kiválasztása / Select Language"
      >
        <option value="hu">🇭🇺 HU</option>
        <option value="en">🇬🇧 EN</option>
        <option value="de">🇩🇪 DE</option>
      </select>
    </div>
  );
}
