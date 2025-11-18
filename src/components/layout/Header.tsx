import { getDictionary, Locale } from "@/app/[locale]/dictionaries"; // Állítsd be a helyes útvonalat
import HeaderClient from "./HeaderClient";

// Ez a komponens egy ASZINKRON SZERVER KOMPONENS
export default async function Header({ lang }: { lang: Locale }) {
  // 1. Lekérjük a szótárat a szerver oldalon
  const dict = await getDictionary(lang);
  // 2. Átadjuk a nyelvet (lang) és a szótárat (dict) a Kliens Komponensnek
  return <HeaderClient lang={lang} dict={dict} />;
}
