"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/actions";
// ÚJ: Ikonok importálása
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

type Props = {
  t: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    message: string;
    submit_btn: string;
    success_title: string;
    success_desc: string;
    error_title: string;
    error_desc: string;
    // ÚJ: Placeholder mezők
    first_name_placeholder: string;
    last_name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    message_placeholder: string;
  };
};

// Közös stílusosztályok (Ugyanaz, mint a QuoteForm-nál)
const baseInputClasses =
  "block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white";

const inputClasses = `${baseInputClasses} px-3.5`;
const inputWithIconClasses = `${baseInputClasses} pl-10 pr-3.5`;

export default function ContactForm({ t }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const result = await submitContactForm(data);

      if (!result.success) {
        throw new Error(result.error || "Hiba történt a küldéskor");
      }

      setStatus("success");
      reset();
    } catch (error) {
      console.error("Hiba történt:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-10 text-center animate-fade-in">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
          <svg
            className="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {t.success_title}
        </h3>
        <p className="mt-2 text-gray-600">{t.success_desc}</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          Új üzenet küldése
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* --- HONEYPOT (SPAM CSAPDA) --- */}
        {/* Ez a mező láthatatlan a felhasználóknak, de a botok kitöltik */}
        <div
          className="absolute opacity-0 -z-10 select-none pointer-events-none"
          aria-hidden="true"
        >
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            {...register("honeypot")}
            type="text"
            id="honeypot"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Keresztnév */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
            >
              {t.first_name}
            </label>
            <input
              {...register("firstName")}
              type="text"
              id="firstName"
              className={inputClasses}
              placeholder={t.first_name_placeholder}
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Vezetéknév */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
            >
              {t.last_name}
            </label>
            <input
              {...register("lastName")}
              type="text"
              id="lastName"
              className={inputClasses}
              placeholder={t.last_name_placeholder}
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email - IKONNAL */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
            >
              {t.email}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                className={inputWithIconClasses}
                placeholder={t.email_placeholder}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Telefon - IKONNAL */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone"
              className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
            >
              {t.phone}
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <PhoneIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
              <input
                {...register("phone")}
                type="tel"
                id="phone"
                className={inputWithIconClasses}
                placeholder={t.phone_placeholder}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Üzenet */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900 mb-2"
            >
              {t.message}
            </label>
            <textarea
              {...register("message")}
              id="message"
              rows={4}
              className={inputClasses}
              placeholder={t.message_placeholder}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">
                {errors.message.message}
              </p>
            )}
          </div>
        </div>

        {/* Gomb */}
        <div className="mt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-md shadow-sm transition-all"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Küldés...
              </span>
            ) : (
              t.submit_btn
            )}
          </Button>

          {status === "error" && (
            <p className="mt-4 text-center text-sm text-red-600 bg-red-50 p-2 rounded-md">
              {t.error_title}: {t.error_desc}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
