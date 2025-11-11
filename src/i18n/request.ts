import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// A Mester Tervben meghatározott nyelvek
const locales = ["hu", "en", "de"];

export default getRequestConfig(async ({ locale }) => {
  // Ellenőrzés, hogy a 'locale' érvényes-e
  if (!locales.includes(locale as any)) notFound();

  return {
    // A hivatalos doksi a 'messages' mappát a gyökérben javasolja
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
