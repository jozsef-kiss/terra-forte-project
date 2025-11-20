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
  const t = dict.LegalPages.Imprint;

  return (
    <LegalLayout title={t.title} subtitle={t.subtitle}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Szolgáltató Adatai
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Cégnév:</strong> Terra Forte Bau Kft.
            </li>
            <li>
              <strong>Székhely:</strong> 3662, Ózd-Somsályfő Telep 1.
            </li>
            <li>
              <strong>Cégjegyzékszám:</strong> XX-XX-XXXXXX
            </li>
            <li>
              <strong>Adószám:</strong> XXXXXXXX-X-XX
            </li>
            <li>
              <strong>Képviselő:</strong> Kiss József ügyvezető
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Elérhetőségek
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Telefon:</strong> +36 70 410 8284
            </li>
            <li>
              <strong>E-mail:</strong> info@terrafortebau.hu
            </li>
            <li>
              <strong>Web:</strong> www.terrafortebau.hu
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Tárhelyszolgáltató
          </h2>
          <ul className="space-y-1">
            <li>
              <strong>Név:</strong> Vercel Inc.
            </li>
            <li>
              <strong>Cím:</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA
            </li>
            <li>
              <strong>Web:</strong> https://vercel.com
            </li>
          </ul>
        </div>
      </div>
    </LegalLayout>
  );
}
