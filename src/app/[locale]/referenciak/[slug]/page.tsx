import { db } from "@/db";
import { references } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { getDictionary, Locale } from "@/app/[locale]/dictionaries";
import {
  ArrowLeftIcon,
  MapPinIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

// ISR: 60 másodpercenként frissül az oldal, ha változott az adat
export const revalidate = 60;

// SEO Metaadatok
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const refResult = await db
    .select()
    .from(references)
    .where(eq(references.slug, slug))
    .limit(1);
  const reference = refResult[0];

  if (!reference) return { title: "A referencia nem található" };

  return {
    title: reference.title,
    description: reference.description,
  };
}

export default async function ReferenceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = locale as Locale;
  const dict = await getDictionary(lang);

  // 1. Adatlekérés
  const refResult = await db
    .select()
    .from(references)
    .where(eq(references.slug, slug))
    .limit(1);
  const reference = refResult[0];

  if (!reference) {
    notFound();
  }

  // Címkék fordítása
  const labels = {
    back:
      lang === "hu"
        ? "Vissza a referenciákhoz"
        : lang === "de"
          ? "Zurück zu den Referenzen"
          : "Back to References",
    location: lang === "hu" ? "Helyszín" : lang === "de" ? "Ort" : "Location",
    client:
      lang === "hu"
        ? "Ügyfél típusa"
        : lang === "de"
          ? "Kundentyp"
          : "Client Type",
    gallery: lang === "hu" ? "Galéria" : lang === "de" ? "Galerie" : "Gallery",
  };

  // Kategória nevének "szépítése" a szótárból
  // JAVÍTÁS: 'as any' castolás a TypeScript hiba elkerülésére
  const filters = dict.ReferencesPage.filters as any;
  const categoryLabel =
    filters[reference.category || "custom"] || reference.category;

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Vissza gomb */}
        <div className="mb-8">
          <Link
            href={`/${lang}/referenciak`}
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors group"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {labels.back}
          </Link>
        </div>

        {/* Fő szekció (Kétoszlopos: Adatok + Fő kép) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          {/* Bal oldal: Szöveges információk */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <Badge color="indigo" className="text-sm px-3 py-1">
                {categoryLabel}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-6">
              {reference.title}
            </h1>
            <p className="text-lg text-gray-600 leading-8">
              {reference.description}
            </p>

            {/* Meta adatok rácsban */}
            <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div className="border-l-2 border-indigo-100 pl-4">
                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {labels.location}
                </dt>
                <dd className="mt-2 text-base font-medium text-gray-900 flex items-center">
                  <MapPinIcon className="h-5 w-5 mr-2 text-indigo-600 shrink-0" />
                  {reference.location}
                </dd>
              </div>
              <div className="border-l-2 border-indigo-100 pl-4">
                <dt className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  {labels.client}
                </dt>
                <dd className="mt-2 text-base font-medium text-gray-900 flex items-center">
                  <BuildingOfficeIcon className="h-5 w-5 mr-2 text-indigo-600 shrink-0" />
                  {reference.clientType}
                </dd>
              </div>
            </dl>
          </div>

          {/* Jobb oldal: Fő kép (Kiemelt) */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-900/10 bg-gray-200">
            {reference.images && reference.images.length > 0 ? (
              <Image
                src={reference.images[0]}
                alt={reference.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 bg-gray-100">
                Nincs kép
              </div>
            )}
          </div>
        </div>

        {/* Galéria (További képek) - Csak akkor jelenik meg, ha van több kép */}
        {reference.images && reference.images.length > 1 && (
          <div className="border-t border-gray-200 pt-16">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">
              {labels.gallery}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reference.images.slice(1).map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-md ring-1 ring-gray-900/5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                >
                  <Image
                    src={img}
                    alt={`${reference.title} galéria kép ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
