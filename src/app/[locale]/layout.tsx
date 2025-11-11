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

// Definiáljuk a Prospokat
interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function RootLayout({
  children,
  params: { locale }, // Itt kapjuk meg a locale-t
}: Readonly<RootLayoutProps>) {
  const messages = await getMessages({ locale }); // Lekérjük az adott nyelv üzeneteit

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
