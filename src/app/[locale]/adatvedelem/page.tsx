import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import LegalLayout from "@/components/LegalLayout";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);
  const t = dict.LegalPages.Privacy;

  return (
    <LegalLayout title={t.title} subtitle={t.lastUpdated}>
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          1. Bevezetés
        </h2>
        <p>
          A Terra Forte Bau Kft. (a továbbiakban: Szolgáltató) elkötelezett a
          felhasználók személyes adatainak védelme iránt. Jelen tájékoztató
          célja, hogy rögzítse azokat az elveket és szabályokat, amelyek alapján
          a weboldalunkon keresztül megadott adatokat kezeljük, összhangban a
          GDPR (EU 2016/679) rendelettel.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          2. Az adatkezelő adatai
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Cégnév:</strong> Terra Forte Bau Kft.
          </li>
          <li>
            <strong>Székhely:</strong> 3662, Ózd-Somsályfő Telep 1.
          </li>
          <li>
            <strong>E-mail:</strong> info@terrafortebau.hu
          </li>
          <li>
            <strong>Adószám:</strong> 12345678-2-12 (Példa)
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          3. A kezelt adatok köre
        </h2>
        <p>
          A weboldal használata során, különösen az ajánlatkérő és kapcsolati
          űrlapok kitöltésekor a következő adatokat kezeljük:
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-2">
          <li>Név (Kapcsolattartó)</li>
          <li>E-mail cím</li>
          <li>Telefonszám</li>
          <li>Település/Helyszín (az ajánlatadáshoz szükséges)</li>
        </ul>
      </section>

      {/* Ide jön a többi jogi szöveg... */}
      <p className="italic text-sm mt-8">
        (Ez egy minta szöveg. Kérjük, a véglegesítéshez konzultáljon jogi
        szakértővel.)
      </p>
    </LegalLayout>
  );
}
