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
