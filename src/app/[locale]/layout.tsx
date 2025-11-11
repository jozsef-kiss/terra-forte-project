import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css"; // <-- FONTOS: Módosítsd az import útvonalát!

// Importáld a komponenseket
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// next-intl importok
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Terra Forte Bau Kft. - Játszótér építés",
  description: "Professzionális játszóterek tervezése és kivitelezése.",
};

// 1. Definiáljuk a típusokat egyszerűen, itt helyben:
type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

// 2. A 'RootLayoutProps' helyett használjuk a 'Props'-t
//    és NE destrukturáljuk a 'locale'-t azonnal!
export default async function RootLayout({ children, params }: Props) {
  // 3. Itt már biztonságosan destrukturálhatjuk:
  // 3. JAVÍTÁS: A hibaüzenet szerint
  // ki kell csomagolni a Promise-t egy 'await'-tel.
  const { locale } = await params; // <-- EZ A JAVÍTÁS
  const messages = await getMessages({ locale });

  // ... (a Metadata-t is itt kellene definiálni, ha dinamikus)

  return (
    // Használjuk a dinamikus 'locale'-t
    <html lang={locale}>
      <body className={inter.className}>
        {/* Beállítjuk a 'provider'-t */}
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
