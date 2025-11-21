"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, type QuoteFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { submitQuoteForm } from "@/app/actions"; // Az új Server Action

type Props = {
  t: {
    personal_title: string;
    project_title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    type_label: string;
    type_options: Record<string, string>; // Kulcs-érték párok
    timing_label: string;
    timing_options: Record<string, string>;
    message: string;
    submit_btn: string;
    success_title: string;
    success_desc: string;
    error_title: string;
    error_desc: string;
  };
};

export default function QuoteForm({ t }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setStatus("idle");

    try {
      const result = await submitQuoteForm(data);

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
          Új ajánlat kérése
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-xl ring-1 ring-gray-900/5 rounded-2xl p-8 sm:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* 1. Személyes Adatok */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4 border-b border-gray-100 pb-2">
            {t.personal_title}
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t.phone}
              </label>
              <div className="mt-2.5">
                <input
                  {...register("phone")}
                  type="tel"
                  id="phone"
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
          </div>
        </div>

        {/* 2. Projekt Részletek */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4 border-b border-gray-100 pb-2">
            {t.project_title}
          </h3>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* Típus választó */}
            <div className="sm:col-span-2">
              <label
                htmlFor="projectType"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t.type_label}
              </label>
              <div className="mt-2.5">
                <select
                  {...register("projectType")}
                  id="projectType"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected>
                    Válasszon...
                  </option>
                  {Object.entries(t.type_options).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.projectType.message}
                  </p>
                )}
              </div>
            </div>

            {/* Időzítés választó */}
            <div className="sm:col-span-2">
              <label
                htmlFor="timing"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                {t.timing_label}
              </label>
              <div className="mt-2.5">
                <select
                  {...register("timing")}
                  id="timing"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected>
                    Válasszon...
                  </option>
                  {Object.entries(t.timing_options).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                {errors.timing && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.timing.message}
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
