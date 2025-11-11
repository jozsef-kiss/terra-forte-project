// src/i18n/request.ts

import { getRequestConfig } from "next-intl/server";

// Definiáljuk az alapértelmezett nyelvet, pont mint a middleware-ben
const defaultLocale = "hu";

export default getRequestConfig(async ({ locale }) => {
  // JAVÍTÁS:
  // Ha a 'locale' 'undefined',
  // helyette a 'defaultLocale'-t ('hu') használjuk.
  const finalLocale = locale ?? defaultLocale;

  return {
    messages: // A 'finalLocale' már garantáltan string
    (await import(`../../messages/${finalLocale}.json`)).default,

    // Most már a 'locale' tulajdonság (finalLocale)
    // értéke 'string', ahogy a TypeScript elvárja.
    locale: finalLocale,
  };
});
