"use server";

import { Resend } from "resend";
import {
  contactFormSchema,
  quoteFormSchema,
  type ContactFormData,
  type QuoteFormData,
} from "@/lib/schemas";
import ContactFormEmail from "@/emails/ContactFormEmail";
import QuoteFormEmail from "@/emails/QuoteFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

// FONTOS: Tesztelés alatt ideiglenesen a saját címedet használd!
// Ha már éles a domain a Resend-en, akkor mehet az info@terrafortebau.hu
const RECIPIENT_EMAIL = "vona.2015@gmail.com";

// --- 1. KAPCSOLAT ŰRLAP (Ez már megvolt) ---
export async function submitContactForm(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Érvénytelen adatok" };
  }

  const { firstName, lastName, email, phone, message } = result.data;

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: "Terra Forte Web <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `Új megkeresés: ${lastName} ${firstName}`,
      replyTo: email,
      react: ContactFormEmail({ firstName, lastName, email, phone, message }),
    });

    if (error) {
      console.error("Resend hiba:", error);
      return { success: false, error: "Sikertelen küldés" };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Szerver hiba:", error);
    return { success: false, error: "Váratlan hiba történt" };
  }
}

// --- 2. ÁRAJÁNLATKÉRŐ ŰRLAP (Ez az új) ---
export async function submitQuoteForm(data: QuoteFormData) {
  // 1. Validáció az új sémával
  const result = quoteFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Érvénytelen adatok" };
  }

  const { firstName, lastName, email, phone, projectType, timing, message } =
    result.data;

  try {
    // 2. Email küldése az új sablonnal
    const { data: emailData, error } = await resend.emails.send({
      from: "Terra Forte Web <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `ÁRAJÁNLATKÉRÉS: ${lastName} ${firstName}`,
      replyTo: email,
      // Itt az új QuoteFormEmail sablont használjuk
      react: QuoteFormEmail({
        firstName,
        lastName,
        email,
        phone,
        projectType,
        timing,
        message,
      }),
    });

    if (error) {
      console.error("Resend hiba:", error);
      return { success: false, error: "Sikertelen küldés" };
    }

    return { success: true, data: emailData };
  } catch (error) {
    console.error("Szerver hiba:", error);
    return { success: false, error: "Váratlan hiba történt" };
  }
}
