import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Locale } from "./dictionaries";
import { Poppins, Open_Sans } from "next/font/google";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Szükséges súlyok
  variable: "--font-poppins", // Ez lesz a CSS változó neve
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

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
    <html lang={lang} className={`${poppins.variable} ${openSans.variable}`}>
      <body className="font-sans antialiased bg-stone-50 text-stone-900">
        {/* Itt már a 'lang' változót adjuk át, ami a castolás miatt 'Locale' típusú */}
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
