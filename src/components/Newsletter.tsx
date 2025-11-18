import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import Link from "next/link";

export default async function Newsletter({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  const t = dict.HomePage.Newsletter;

  return (
    // HÁTTÉR: #f0f0f0 (világosszürke)
    <div className="bg-[#f0f0f0] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        {/* Cím: Sötét marad a kontraszt miatt */}
        <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl lg:col-span-7">
          {t.title}
        </h2>

        {/* Űrlap */}
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder={t.placeholder}
              autoComplete="email"
              // INPUT HÁTTÉR: bg-white (fehér), hogy elváljon a szürke laptól
              className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t.button}
            </button>
          </div>

          {/* Adatvédelmi szöveg: Sötét marad */}
          <p className="mt-4 text-sm/6 text-gray-900">
            {t.privacy_text}{" "}
            <Link
              href={`/${lang}/adatvedelem`}
              className="font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500"
            >
              {t.privacy_link_text}
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
