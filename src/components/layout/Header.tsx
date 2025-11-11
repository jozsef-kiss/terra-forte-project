"use client"; // <-- FONTOS!
import Link from "next/link";
import { useTranslations } from "next-intl"; // <-- Importáld
import { CubeIcon } from "@heroicons/react/24/outline"; // <-- Importáld a Heroicon-ra

export const Header = () => {
  const t = useTranslations("Header"); // <-- Töltsd be a "Header" szekciót

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CubeIcon className="h-6 w-6" /> {/* Heroicon */}
          <span className="font-bold sm:inline-block">Terra Forte Bau</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link
            href="/termekek"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("products")} {/* Fordított szöveg */}
          </Link>
          <Link
            href="/referenciak"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {t("references")} {/* Fordított szöveg */}
          </Link>
          <Link
            href="/rolunk"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {t("about")} {/* Fordított szöveg */}
          </Link>
          <Link
            href="/kapcsolat"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {t("contact")} {/* Fordított szöveg */}
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            ({t("lang_switcher")})
          </p>
        </div>
      </div>
    </header>
  );
};
