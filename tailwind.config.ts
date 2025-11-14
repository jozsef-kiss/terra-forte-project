import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms"; // Így importáljuk helyesen

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // <--- EZ A "MINDENT LÁTÓ SZEM" (app, components, minden)
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // ✅ EZ KELLETT NAGYON!
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    forms, // Itt aktiváljuk a plugint
  ],
};

export default config;
