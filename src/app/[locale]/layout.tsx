import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Locale } from "./dictionaries";
import "../globals.css";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // JAVÍTVA: A mappa neve [locale], ezért itt is 'locale' a kulcs!
  params: Promise<{ locale: Locale }>;
}) {
  // JAVÍTVA: Itt is 'locale'-t bontunk ki, nem 'lang'-ot
  const { locale } = await params;
  console.log("🚀 Layout: Nyelv megérkezett:", locale); // <--- DEBUG 1
  return (
    // A HTML nyelvnek a locale-t adjuk
    <html lang={locale}>
      <body>
        {/* A Header komponensünk 'lang' néven várja a props-ot (így írtuk meg a Header.tsx-ben),
          ezért a mi 'locale' változónkat átadjuk neki.
        */}
        <Header lang={locale} />
        <main>{children}</main>
      </body>
    </html>
  );
}
