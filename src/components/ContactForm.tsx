"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button"; // Catalyst gomb
import { submitContactForm } from "@/app/actions"; // Vedd ki a kommentből!
import { Switch } from "@/components/ui/switch"; // Ha kellene GDPR checkbox, de most egyszerűsítünk

// Egyelőre importáljuk a típust, a Server Action-t később kötjük be
// import { submitContactForm } from "@/app/actions";

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
  };
};

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
      // ITT FOGJUK MEGHÍVNI A SERVER ACTION-t (KÖVETKEZŐ LÉPÉS)
      // Server Action hívása
      const result = await submitContactForm(data);

      if (!result.success) {
        throw new Error(result.error || "Hiba történt a küldéskor");
      }

      setStatus("success");
      reset(); // Űrlap törlése siker esetén
    } catch (error) {
      console.error("Hiba történt:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-10">
      {status === "success" ? (
        <div className="text-center py-12 animate-fade-in">
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
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
        >
          {/* Keresztnév */}
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t.first_name}
            </label>
            <div className="mt-2.5">
              <input
                {...register("firstName")}
                type="text"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.firstName.message}
                </p>
              )}
            </div>
          </div>

          {/* Vezetéknév */}
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t.last_name}
            </label>
            <div className="mt-2.5">
              <input
                {...register("lastName")}
                type="text"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t.email}
            </label>
            <div className="mt-2.5">
              <input
                {...register("email")}
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Telefon */}
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t.phone}
            </label>
            <div className="mt-2.5">
              <input
                {...register("phone")}
                type="tel"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Üzenet */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              {t.message}
            </label>
            <div className="mt-2.5">
              <textarea
                {...register("message")}
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.message.message}
                </p>
              )}
            </div>
          </div>

          {/* Gomb */}
          <div className="sm:col-span-2 mt-4">
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
      )}
    </div>
  );
}
