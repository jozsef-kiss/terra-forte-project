import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import ContactForm from "@/components/ContactForm";
import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const t = dict.ContactPage;

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* --- 1. HERO SZEKCIÓ --- */}
      {/* JAVÍTÁS: lg:pb-48 - Még több helyet hagyunk alul a háttérnek */}
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
                id="contact-pattern"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M100 200V.5M.5 .5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              fill="url(#contact-pattern)"
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
      {/* JAVÍTÁS: lg:-mt-10 - Itt a lényeg! Sokkal kevésbé húzzuk fel a kártyákat (korábban -32 volt) */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-8 sm:-mt-12 lg:-mt-10 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* BAL OLDAL: Elérhetőségek & Térkép */}
          <div className="space-y-4">
            {/* Kontakt Kártya */}
            <div className="bg-white rounded-2xl p-8 shadow-lg ring-1 ring-gray-900/5">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Terra Forte Bau Kft.
              </h3>
              <dl className="space-y-6 text-base text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{t.info.address_label}</span>
                    <MapPinIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    {t.info.address_value_1}
                    <br />
                    {t.info.address_value_2}
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{t.info.phone_label}</span>
                    <PhoneIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`tel:${t.info.phone_value}`}
                      className="hover:text-indigo-600 font-medium"
                    >
                      {t.info.phone_value}
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">{t.info.email_label}</span>
                    <EnvelopeIcon
                      className="h-7 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${t.info.email_value}`}
                      className="hover:text-indigo-600 font-medium"
                    >
                      {t.info.email_value}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Térkép (Google Maps Embed) */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-900/5 h-80 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.7237237237237!2d20.286944!3d48.220833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDEzJzE1LjAiTiAyMMKwMTcnMTMuMCJF!5e0!3m2!1shu!2shu!4v1620000000000!5m2!1shu!2shu"
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

          {/* JOBB OLDAL: Űrlap */}
          <div className="relative">
            <ContactForm t={t.form} />
          </div>
        </div>
      </div>
    </div>
  );
}
