"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { XMarkIcon } from "@heroicons/react/24/outline"; // Ezt importáltuk a bezáró gombhoz

type Reference = {
  id: number;
  slug: string;
  title: string;
  location: string | null;
  categories: string[] | null;
  images: string[] | string | null; // Rugalmas típuskezelés
};

type Props = {
  // A "any" típus kikapcsolja a szigorú ellenőrzést a fordításoknál
  t: any;
  items: Reference[];
  lang: string;
};

export default function ReferenceGrid({ t, items, lang }: Props) {
  const [filter, setFilter] = useState("all");

  // ÚJ: Állapot a kiválasztott nagy képnek (ha null, nincs megnyitva semmi)
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    "all",
    "wooden",
    "metal",
    "fitness",
    "grass",
    "rubber", // Javítva rubber-re
    "sand",
  ];

  const filteredItems = items.filter((item) => {
    if (filter === "all") return true;
    // Biztosítjuk, hogy a categories tömb legyen
    const itemCats = Array.isArray(item.categories) ? item.categories : [];
    return itemCats.includes(filter);
  });

  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Fejléc */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {t.title}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">{t.subtitle}</p>
          </div>

          {/* Szűrő Gombok */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ring-1 ring-inset ${
                  filter === cat
                    ? "bg-indigo-600 text-white ring-indigo-600 shadow-md scale-105"
                    : "bg-white text-gray-600 ring-gray-200 hover:bg-stone-50 hover:ring-gray-300"
                }`}
              >
                {t.filters[cat] || cat}
              </button>
            ))}
          </div>

          {/* Képes Rács */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                // Kép URL kinyerése biztonságosan
                const imageSrc =
                  (Array.isArray(item.images) ? item.images[0] : item.images) ||
                  "https://placehold.co/800x600?text=Nincs+kép";

                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    key={item.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl bg-stone-50 shadow-sm ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Kép Konténer - Most már kattintható! */}
                    <div
                      className="relative h-64 w-full overflow-hidden bg-gray-200 cursor-pointer"
                      onClick={() => setSelectedImage(imageSrc)} // KATTINTÁS ESEMÉNY
                    >
                      <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="shadow-sm bg-white/90 backdrop-blur-sm font-semibold !text-black hover:bg-white">
                          {
                            t.filters[
                              (Array.isArray(item.categories)
                                ? item.categories[0]
                                : "wooden") || "wooden"
                            ]
                          }
                        </Badge>
                      </div>

                      {/* Nagyítás ikon (opcionális visual hint) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                        <span className="text-white font-semibold bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                          Nagyítás
                        </span>
                      </div>
                    </div>

                    {/* Tartalom */}
                    <div className="p-6 flex flex-1 flex-col">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500">
                Jelenleg nincs megjeleníthető referencia ebben a kategóriában.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 text-indigo-600 font-semibold hover:underline"
              >
                Összes mutatása
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- LIGHTBOX / MODAL (NAGY KÉP MEGJELENÍTŐ) --- */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Fix pozíció, teljes képernyő, legmagasabb Z-index
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)} // Háttérre kattintva bezár
          >
            {/* Bezáró Gomb */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[110]"
              onClick={() => setSelectedImage(null)}
            >
              <XMarkIcon className="h-10 w-10" />
            </button>

            {/* A Nagy Kép */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // A képre kattintva NE záródjon be
            >
              <Image
                src={selectedImage}
                alt="Nagyított referencia"
                fill
                className="object-contain rounded-lg shadow-2xl"
                sizes="100vw"
                priority // Fontos, hogy ez azonnal betöltsön
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
