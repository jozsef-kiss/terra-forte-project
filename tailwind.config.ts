// tailwind.config.ts
import type { Config } from "tailwindcss";
import "@tailwindcss/forms"; // A Catalyst űrlapoknak szüksége van erre!

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // <--- FONTOS
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/ui/**/*.{js,ts,jsx,tsx,mdx}", // <--- ÍGY ADD HOZZÁ
  ],
  theme: {
    extend: {},
  },
};
export default config;
