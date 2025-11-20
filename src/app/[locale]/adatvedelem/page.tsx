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
      {/* 1. Bevezetés */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.intro.title}
        </h2>
        <p>{t.intro.content}</p>
      </section>

      {/* 2. Adatkezelő */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.controller.title}
        </h2>
        <p className="mb-2">{t.controller.content}</p>
        <ul className="list-disc pl-5 space-y-1">
          {t.controller.items.map((item: string, index: number) => (
            <li key={index}>
              <strong>{item.split(":")[0]}:</strong>
              {item.split(":")[1]}
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Adatgyűjtés */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.data_collection.title}
        </h2>
        <div className="space-y-6">
          {t.data_collection.sections.map((section: any, index: number) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {section.subtitle}
              </h3>
              <p>{section.text}</p>
              {section.list && (
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {section.list.map((li: string, i: number) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 4. Cookies */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.cookies.title}
        </h2>
        <p className="mb-2">{t.cookies.content}</p>
        <ul className="list-disc pl-5 space-y-1 mb-2">
          {t.cookies.types.map((type: string, index: number) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
        <p className="italic text-sm">{t.cookies.note}</p>
      </section>

      {/* 5. Jogok */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.rights.title}
        </h2>
        <p>{t.rights.content}</p>
      </section>

      {/* 6. Hosting */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
          {t.hosting.title}
        </h2>
        <p>{t.hosting.content}</p>
        <p className="mt-2 text-sm text-gray-500">{t.hosting.details}</p>
      </section>

      <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-500 text-center">
        <p>
          Ez a dokumentum tájékoztató jellegű. Hivatalos jogi állásfoglalásért
          kérjük, konzultáljon jogi szakértővel.
        </p>
      </div>
    </LegalLayout>
  );
}
