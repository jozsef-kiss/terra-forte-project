import { Locale } from "./dictionaries";
import Hero from "@/components/Hero";
import USP from "@/components/USP";
import CategoryPreview from "@/components/CategoryPreview";
import Newsletter from "@/components/Newsletter";
import FeaturedReferences from "@/components/FeaturedReferences";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 1. Itt nyerjük ki a 'lang'-ot
  const { locale } = await params;
  const lang = locale as Locale;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main>
        {/* Átadjuk a nyelvet a komponenseknek */}
        <Hero lang={lang} />
        <USP lang={lang} />
        <CategoryPreview lang={lang} />
        <Newsletter lang={lang} />
        <FeaturedReferences lang={lang} />
      </main>
    </div>
  );
}
