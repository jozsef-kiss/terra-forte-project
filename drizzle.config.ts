import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Betöltjük a .env.local fájlt
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
