import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A támogatott nyelvek
const locales = ["hu", "en", "de"];
const defaultLocale = "hu";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Megnézzük, hogy az URL tartalmaz-e már nyelvkódot (pl. /hu/...)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Ha már van nyelvkód, nem csinálunk semmit, engedjük tovább
  if (pathnameHasLocale) return;

  // 2. Ha nincs nyelvkód, átirányítjuk az alapértelmezett nyelvre (/hu)
  const locale = defaultLocale;

  // Az új URL összeállítása (pl. localhost:3000/ -> localhost:3000/hu/)
  request.nextUrl.pathname = `/${locale}${pathname}`;

  // Végrehajtjuk az átirányítást
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Ez mondja meg, mely útvonalakon fusson le a middleware
  // Kivételek: api, _next (rendszerfájlok), képek, favicon
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
