import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography"; // 1. Importáld be

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // 1. BETŰTÍPUSOK BEKÖTÉSE
      fontFamily: {
        // A 'sans' lesz az alapértelmezett (szövegtörzs) -> Open Sans
        sans: ["var(--font-open-sans)", "sans-serif"],
        // A 'heading' a címsoroknak -> Poppins
        heading: ["var(--font-poppins)", "sans-serif"],
      },
      // 2. SZÍNPALETTA (Eco & Nature: Zöld - Borostyán - Kő)
      colors: {
        // Felülírjuk az 'indigo'-t a márkaszínünkre (Erdőzöld)
        indigo: {
          50: "#f2fbf5",
          100: "#e1f6e8",
          200: "#c2ead0",
          300: "#94d7ad",
          400: "#5ebb84",
          500: "#389e62",
          600: "#28804d", // Fő gomb szín
          700: "#22663f", // Hover szín
          800: "#1e5235",
          900: "#19432d",
          950: "#0d2519",
        },
        // A hideg szürke helyett a melegebb 'Stone' árnyalatok
        gray: colors.stone,
        // Kiegészítő szín: Borostyán (Amber) a kiemelésekhez
        accent: colors.amber,
      },
      // 3. LEKEREKÍTÉS (Barátságosabb formák)
      borderRadius: {
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
      },
    },
  },
  plugins: [
    forms, // Itt aktiváljuk a plugint
    typography,
  ],
};

export default config;
