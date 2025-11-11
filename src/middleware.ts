import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A támogatott nyelvek
  locales: ["hu", "en", "de"],

  // Alapértelmezett nyelv
  defaultLocale: "hu",
});

export const config = {
  // A middleware mindenre fusson, kivéve a statikus fájlokat és az API-t
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
