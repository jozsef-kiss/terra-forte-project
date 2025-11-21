"use server";

import { Resend } from "resend";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import ContactFormEmail from "@/emails/ContactFormEmail";

// Inicializáljuk a Resend klienst az API kulccsal
const resend = new Resend(process.env.RESEND_API_KEY);

// Ez a cím fogja kapni az értesítéseket (ideiglenesen a sajátodat írd be tesztelni, később az info@-t)
const RECIPIENT_EMAIL = "info@terrafortebau.hu"; // VAGY a saját teszt email címed

export async function submitContactForm(data: ContactFormData) {
  // 1. Szerver oldali validáció (Biztonsági háló)
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Érvénytelen adatok" };
  }

  const { firstName, lastName, email, phone, message } = result.data;

  try {
    // 2. Email küldése a Resend segítségével
    const { data: emailData, error } = await resend.emails.send({
      from: "Terra Forte Web <onboarding@resend.dev>", // Teszt módban csak ez működik! Élesben majd átállítjuk.
      to: [RECIPIENT_EMAIL],
      subject: `Új megkeresés: ${lastName} ${firstName}`,
      replyTo: email, // Így ha a "Válasz"-ra kattintasz, az ügyfélnek megy
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
