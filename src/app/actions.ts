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
// ÚJ: Adatbázis kliens és séma importálása
import { db } from "@/db";
import { leads } from "@/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// Teszteléshez marad a saját címed
const RECIPIENT_EMAIL = "vona.2015@gmail.com";

// --- 1. KAPCSOLAT ŰRLAP (Adatbázis mentéssel) ---
export async function submitContactForm(data: ContactFormData) {
  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Érvénytelen adatok" };
  }

  const { firstName, lastName, email, phone, message, honeypot } = result.data;

  // Spam védelem
  if (honeypot && honeypot.length > 0) {
    return { success: true, data: null };
  }

  try {
    // 1. MENTÉS AZ ADATBÁZISBA (Mini-CRM)
    // Előbb mentünk, aztán küldünk emailt (hogy biztos meglegyen az adat)
    await db.insert(leads).values({
      name: `${lastName} ${firstName}`, // Összefűzzük a nevet egy mezőbe
      email: email,
      phone: phone,
      message: message,
      // A type és timing itt üres marad, mert ez csak sima kapcsolatfelvétel
    });

    // 2. EMAIL KÜLDÉSE
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

// --- 2. ÁRAJÁNLATKÉRŐ ŰRLAP (Adatbázis mentéssel) ---
export async function submitQuoteForm(data: QuoteFormData) {
  const result = quoteFormSchema.safeParse(data);

  if (!result.success) {
    return { success: false, error: "Érvénytelen adatok" };
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    projectType,
    timing,
    message,
    honeypot,
  } = result.data;

  if (honeypot && honeypot.length > 0) {
    return { success: true, data: null };
  }

  try {
    // 1. MENTÉS AZ ADATBÁZISBA (Minden részlettel)
    await db.insert(leads).values({
      name: `${lastName} ${firstName}`,
      email: email,
      phone: phone,
      message: message, // Ez opcionális, lehet null
      projectType: projectType, // Extra mező
      timing: timing, // Extra mező
    });

    // 2. EMAIL KÜLDÉSE
    const { data: emailData, error } = await resend.emails.send({
      from: "Terra Forte Web <onboarding@resend.dev>",
      to: [RECIPIENT_EMAIL],
      subject: `ÁRAJÁNLATKÉRÉS: ${lastName} ${firstName}`,
      replyTo: email,
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
