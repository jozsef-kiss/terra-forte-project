import { z } from "zod";

// Ez a séma határozza meg, milyen adatok fogadhatók el
export const contactFormSchema = z.object({
  firstName: z.string().min(2, "A keresztnév túl rövid"),
  lastName: z.string().min(2, "A vezetéknév túl rövid"),
  email: z.string().email("Érvénytelen e-mail cím formátum"),
  phone: z.string().min(6, "A telefonszám túl rövid"), // Opcionálisan regex is mehetne, de a min hossz biztonságosabb nemzetközileg
  message: z
    .string()
    .min(10, "Az üzenetnek legalább 10 karakter hosszúnak kell lennie"),
});

// Ezt a típust használjuk majd a komponensben (automatikusan generálódik a sémából)
export type ContactFormData = z.infer<typeof contactFormSchema>;

// ... (contactFormSchema marad)

export const quoteFormSchema = z.object({
  firstName: z.string().min(2, "A keresztnév túl rövid"),
  lastName: z.string().min(2, "A vezetéknév túl rövid"),
  email: z.string().email("Érvénytelen e-mail cím formátum"),
  phone: z.string().min(6, "A telefonszám túl rövid"),
  // Új mezők:
  projectType: z.enum(["wooden", "metal", "fitness", "street", "other"], {
    errorMap: () => ({ message: "Kérjük válasszon típust" }),
  }),
  timing: z.enum(["asap", "1_3_months", "3_6_months", "planning"], {
    errorMap: () => ({ message: "Kérjük válasszon időzítést" }),
  }),
  message: z.string().optional(), // Itt opcionálissá tehetjük, vagy maradhat kötelező
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
