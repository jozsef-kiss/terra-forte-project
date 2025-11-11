"use client"; // <-- FONTOS!

import { useTranslations } from "next-intl"; // <-- Importáld

export const Footer = () => {
  const t = useTranslations("Footer"); // <-- Töltsd be a "Footer" szekciót
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          {t("copyright", { year: year })} {/* Változó átadása */}
        </p>
        <nav className="flex gap-4">
          <p className="text-sm text-muted-foreground">({t("privacy")})</p>
          <p className="text-sm text-muted-foreground">({t("imprint")})</p>
        </nav>
      </div>
    </footer>
  );
};
