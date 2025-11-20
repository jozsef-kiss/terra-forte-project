import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import LegalLayout from "@/components/LegalLayout";

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // Rövidítések a könnyebb olvashatóságért
  const t = dict.LegalPages.Imprint;
  const p = t.provider;
  const c = t.contact;
  const h = t.hosting;

  return (
    <LegalLayout title={t.title} subtitle={t.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* --- Szolgáltató Adatai --- */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {p.title}
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>{p.company_label}</strong> {p.company_value}
            </li>
            <li>
              <strong>{p.address_label}</strong> {p.address_value}
            </li>
            <li>
              <strong>{p.reg_label}</strong> {p.reg_value}
            </li>
            <li>
              <strong>{p.tax_label}</strong> {p.tax_value}
            </li>
            <li>
              <strong>{p.rep_label}</strong> {p.rep_value}
            </li>
          </ul>
        </div>

        {/* --- Elérhetőségek --- */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {c.title}
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>{c.phone_label}</strong>{" "}
              <a
                href={`tel:${c.phone_value}`}
                className="hover:text-indigo-600"
              >
                {c.phone_value}
              </a>
            </li>
            <li>
              <strong>{c.email_label}</strong>{" "}
              <a
                href={`mailto:${c.email_value}`}
                className="hover:text-indigo-600"
              >
                {c.email_value}
              </a>
            </li>
            <li>
              <strong>{c.web_label}</strong>{" "}
              <a
                href={`https://${c.web_value}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                {c.web_value}
              </a>
            </li>
          </ul>
        </div>

        {/* --- Tárhelyszolgáltató --- */}
        <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {h.title}
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>{h.name_label}</strong> {h.name_value}
            </li>
            <li>
              <strong>{h.address_label}</strong> {h.address_value}
            </li>
            <li>
              <strong>{h.web_label}</strong>{" "}
              <a
                href={h.web_value}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                {h.web_value}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </LegalLayout>
  );
}
