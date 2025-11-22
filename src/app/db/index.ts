import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

// Itt inicializáljuk a Drizzle klienst a Vercel SQL driverrel
// A következő lépésben (Sémák) majd bővítjük ezt a schema importálásával
export const db = drizzle(sql);
