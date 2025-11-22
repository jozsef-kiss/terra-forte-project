import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Itt fogjuk definiálni az adattáblákat a következő lépésben
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
