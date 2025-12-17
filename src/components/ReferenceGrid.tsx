"use client";

import { useState } from "react";
import Image from "next/image";
// Link import törölve
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "motion/react";
import { MapPinIcon } from "@heroicons/react/24/outline";

type Reference = {
  id: number;
  slug: string;
  title: string;
  location: string | null;
  category: string | null;
  images: string[] | null;
};

type Props = {
  t: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      wooden: string;
      metal: string;
      fitness: string;
    };
  };
  items: Reference[];
  lang: string;
};

export default function ReferenceGrid({ t, items, lang }: Props) {
  const [filter, setFilter] = useState("all");

  // Kategóriák listája (egyezik az adatbázisban lévő kulcsokkal)
  const categories = ["all", "wooden", "metal", "fitness"];

  // Szűrés logika
  const filteredItems = items.filter(
    (item) => filter === "all" || item.category === filter
  );

  return (
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
              {/* @ts-ignore - Dinamikus kulcs elérés */}
              {t.filters[cat] || cat}
            </button>
          ))}
        </div>

        {/* Képes Rács (Grid) Animációval */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl bg-stone-50 shadow-sm ring-1 ring-gray-900/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Kép */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-200">
                  <Image
                    // Az első képet vesszük a tömbből, vagy placeholdert
                    src={
                      item.images?.[0] ||
                      "https://placehold.co/800x600?text=Nincs+kép"
                    }
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    {/* JAVÍTÁS: color="white" eltávolítva, helyette 'zinc' vagy üres, a className úgyis felülírja */}
                    <Badge
                      color="zinc"
                      className="shadow-sm bg-white/90 backdrop-blur-sm font-semibold !text-indigo-200"
                    >
                      {/* @ts-ignore - Kategória név a szótárból */}
                      {t.filters[item.category || "custom"]}
                    </Badge>
                  </div>
                </div>

                {/* Tartalom */}
                <div className="p-6 flex flex-1 flex-col">
                  {/* Link eltávolítva, csak a cím maradt */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}
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
  );
}
