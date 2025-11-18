import Link from "next/link";
import { getDictionary, Locale } from "@/app/[locale]/dictionaries";

// Social ikonok definiálása (SVG)
const socialLinks = [
  {
    name: "Facebook",
    href: "#",
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
  {
    name: "Instagram",
    href: "#",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465C9.673 2.013 10.027 2 12.315 2zm-1.094 4.677a7.786 7.786 0 00-2.655.505c-.703.27-1.293.624-1.818 1.15-.526.525-.88 1.115-1.15 1.817a7.785 7.785 0 00-.506 2.656v.002c0 2.127.004 2.493.112 2.918.108.418.33.899.72 1.294.416.415.868.658 1.295.766.425.108.791.112 2.917.112 2.126 0 2.493-.004 2.918-.112.427-.108.899-.33 1.294-.72.395-.39.632-.846.74-1.274.108-.425.112-.791.112-2.917 0-2.126-.004-2.493-.112-2.918-.108-.427-.33-.899-.72-1.294a3.732 3.732 0 00-1.295-.766c-.425-.108-.791-.112-2.917-.112h-.002zm0 1.835a5.967 5.967 0 011.53.206c.285.075.51.2.72.41.21.21.335.435.41.72.137.542.145 1.05.145 3.21s-.008 2.668-.145 3.21c-.075.285-.2.51-.41.72-.21.21-.435.335-.72.41-.542.137-1.05.145-3.21.145s-2.668-.008-3.21-.145c-.285-.075-.51-.2-.72-.41-.21-.21-.335-.435-.41-.72-.137-.542-.145-1.05-.145-3.21s.008-2.668.145-3.21c.075-.285.2-.51.41-.72.21-.21.435-.335.72-.41.543-.137 1.051-.145 3.211-.145H11.22zm5.348-1.675a1.376 1.376 0 100 2.752 1.376 1.376 0 000-2.752z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
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
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Lábléc
      </h2>

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* LOGO és LEÍRÁS vagy HELYKITÖLTŐ */}
          <div className="space-y-8">
            <Link href={`/${lang}`}>
              <img
                alt="Terra Forte Bau"
                src="https://placehold.co/200x50/indigo/white?text=Terra+Forte"
                className="h-9"
              />
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              Professzionális játszóterek tervezése és kivitelezése.
            </p>
          </div>

          {/* NAVIGÁCIÓS RÁCS */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Termékek */}
              <div>
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  {sections.products.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.products.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Segítség */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  {sections.support.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.support.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
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
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  {sections.company.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.company.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Jogi */}
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold text-gray-900">
                  {sections.legal.title}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {sections.legal.links.map((item: any) => (
                    <li key={item.name}>
                      <Link
                        href={`/${lang}${item.href}`}
                        className="text-sm/6 text-gray-600 hover:text-gray-900"
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
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm/6 font-semibold text-gray-900">
              {f.newsletter.title}
            </h3>
            <p className="mt-2 text-sm/6 text-gray-600">
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
              className="w-full min-w-0 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus-visible:outline-indigo-600 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:mt-0 sm:ml-4 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {f.newsletter.button}
              </button>
            </div>
          </form>
        </div>

        {/* ALSÓ SÁV (Copyright + Social) */}
        <div className="mt-8 border-t border-gray-900/10 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex gap-x-6 md:order-2">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-gray-800"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-sm/6 text-gray-600 md:order-1 md:mt-0">
            {f.copyright.replace("{year}", year.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};
