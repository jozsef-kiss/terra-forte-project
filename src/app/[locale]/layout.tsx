import Header from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getDictionary, Locale } from "./dictionaries";
import { Poppins, Open_Sans } from "next/font/google";
import "../globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import CookieBanner from "@/components/CookieBanner";
import ChatWidget from "@/components/ChatWidget";
import ImageProtector from "@/components/ImageProtector";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
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
  params: Promise<{ locale: string }>;
}) {
  // 1. Itt egyszer (és csak egyszer!) kinyerjük a nyelvet
  const { locale } = await params;
  const lang = locale as Locale;

  // 2. Betöltjük a szótárat
  const dict = await getDictionary(lang);

  // 3. GTM ID környezeti változó beolvasása
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || "";

  return (
    <html lang={lang} className={`${poppins.variable} ${openSans.variable}`}>
      <head>
        <script
          id="consent-mode"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'analytics_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-stone-50 text-stone-900">
        {/* Csak akkor rendereljük a GTM-et, ha van érvényes ID */}
        {gtmId && <GoogleTagManager gtmId={gtmId} />}

        <Header lang={lang} />
        <main>{children}</main>
        <ImageProtector />
        <Footer lang={lang} />

        <ChatWidget />

        <CookieBanner t={dict.CookieBanner} lang={lang} />
      </body>
    </html>
  );
}
