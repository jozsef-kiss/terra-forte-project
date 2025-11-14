import "server-only";

// Itt definiáljuk, melyik nyelvnél melyik fájlt töltjük be
const dictionaries = {
  hu: () =>
    import("../../dictionaries/hu.json").then((module) => module.default),
  en: () =>
    import("../../dictionaries/en.json").then((module) => module.default),
  de: () =>
    import("../../dictionaries/de.json").then((module) => module.default),
};

// Ez a típus segít, hogy a 'lang' csak a megengedett érték lehessen
export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  console.log("📚 Szótár betöltése ehhez a nyelvhez:", locale); // <--- EZT ADD HOZZÁ!
  // Ha véletlenül olyan nyelvkód jönne, ami nincs, alapértelmezetten magyarra esünk vissza (biztonsági háló)
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries["hu"]();
};
