import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import QuoteForm from "@/components/QuoteForm";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default async function QuotePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // Itt a QuotePage szövegeit használjuk a címekhez
  const t = dict.QuotePage;
  // De az elérhetőségekhez újrahasznosítjuk a ContactPage adatait (DRY elv)
  const contactInfo = dict.ContactPage.info;

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* --- 1. HERO SZEKCIÓ --- */}
      <div className="relative isolate bg-indigo-950 pt-24 pb-32 sm:pt-32 lg:pb-48">
        {/* Háttér minta */}
        <div className="absolute inset-0 -z-10 opacity-20">
          <svg
            aria-hidden="true"
            className="absolute left-[50%] top-0 h-[48rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="quote-pattern"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              fill="url(#quote-pattern)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {t.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-200 max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>
      </div>

      {/* --- 2. TARTALMI RÉSZ (GRID) --- */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-10 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* BAL OLDAL: Elérhetőségek & Térkép (Ugyanaz, mint a Kapcsolatnál) */}
          <div className="space-y-4">
            {/* Kontakt Kártya */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-900/5">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Terra Forte Bau Kft.
              </h3>
              <dl className="space-y-6 text-base text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{contactInfo.address_label}</span>
                    <MapPinIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    {contactInfo.address_value_1}
                    <br />
                    {contactInfo.address_value_2}
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{contactInfo.phone_label}</span>
                    <PhoneIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`tel:${contactInfo.phone_value}`}
                      className="hover:text-indigo-600 font-medium"
                    >
                      {contactInfo.phone_value}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{contactInfo.email_label}</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${contactInfo.email_value}`}
                      className="hover:text-indigo-600 font-medium"
                    >
                      {contactInfo.email_value}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Térkép (A frissített címmel) */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-900/5 h-80 relative">
              <iframe
                src="https://maps.google.com/maps?q=3662,+%C3%93zd-Soms%C3%A1lyf%C5%91+Telep+1&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
                title="Terra Forte Bau Kft. Térkép"
              ></iframe>
            </div>
          </div>

          {/* JOBB OLDAL: Az új Árajánlatkérő Űrlap */}
          <div className="relative">
            <QuoteForm t={t.form} />
          </div>
        </div>
      </div>
    </div>
  );
}
