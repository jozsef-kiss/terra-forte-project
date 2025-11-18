import Header from "@/components/Header";
//import Hero from "@/components/Hero";
import { Locale } from "./dictionaries";
import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // JAVÍTÁS 1: A Next.js felé 'string'-et kommunikálunk, hogy megfeleljen a szabványnak
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // JAVÍTÁS 2: Itt mondjuk meg a TypeScript-nek: "Bízz bennem, ez egy valid Locale!"
  // Mivel a middleware.ts már szűrte, ez biztonságos.
  const lang = locale as Locale;

  return (
    <html lang={lang}>
      <body>
        {/* Itt már a 'lang' változót adjuk át, ami a castolás miatt 'Locale' típusú */}
        <Header lang={lang} />
        <main>{children}</main>
      </body>
    </html>
  );
}
