import Link from "next/link";
import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Image from "next/image";

// Social ikonok definiálása (SVG)
const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/terrafortebau",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

// ASZINKRON SZERVER KOMPONENS
export const Footer = async ({ lang }: { lang: Locale }) => {
  // 1. Betöltjük a szótárat
  const dict = await getDictionary(lang);
  const f = dict.Footer;
  const sections = f.sections;

  const year = new Date().getFullYear();

  return (
    // HÁTTÉR: #595a5c
    <footer className="bg-indigo-950" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Lábléc
      </h2>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* LOGO és LEÍRÁS vagy HELYKITÖLTŐ */}
          <div className="space-y-8">
            <Link href={`/${lang}`}>
              <Image
                src="/terra-forte-bau-logo.svg" // Ha SVG-d van, írd át .svg-re!
                alt="Terra Forte Bau Logo"
                width={180} // Ez az alap szélesség (arányos legyen a képpel)
                height={60} // Ez az alap magasság
                className="h-12 w-auto md:h-16 brightness-0 invert" // Mobilon 40px magas (h-10), gépen 48px (h-12)
                priority // Fontos: ez biztosítja, hogy azonnal, villanás nélkül betöltődjön
              />
            </Link>
            {/* Szöveg: text-gray-300 (világos szürke) */}
            <p className="text-sm leading-6 text-white mt-5">
              {f.marketing_text}
            </p>
          </div>

          {/* NAVIGÁCIÓS RÁCS */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Termékek */}
              <div>
                {/* Fejléc: text-white */}
                <h3 className="text-sm/6 font-semibold text-white">
                  {sections.products.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.products.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        // Linkek: text-gray-300 hover:text-white
                        className="text-sm/6 text-white hover:text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Segítség */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">
                  {sections.support.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.support.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-white hover:text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Cégünk */}
              <div>
                <h3 className="text-sm/6 font-semibold text-white">
                  {sections.company.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.company.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-white hover:text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jogi */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-white">
                  {sections.legal.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.legal.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-white hover:text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* HÍRLEVÉL SZEKCIÓ */}
        {/* Border: border-white/10 */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-white">
              {f.newsletter.title}
            </h3>
            <p className="mt-2 text-sm/6 text-white">
              {f.newsletter.description}
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder={f.newsletter.placeholder}
              autoComplete="email"
              // Input maradt fehér, sötét szöveggel (kontrasztos)
              className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus-visible:outline-indigo-500 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {f.newsletter.button}
              </button>
            </div>
          </form>
        </div>

        {/* ALSÓ SÁV (Copyright + Social) */}
        {/* Border: border-white/10 */}
        <div className="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                // Ikonok: text-gray-400 hover:text-gray-300
                className="text-white hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-white md:order-1 md:mt-0">
            {f.copyright.replace("{year}", year.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
