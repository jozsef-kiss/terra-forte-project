"use client";

import { useState, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, type QuoteFormData } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { submitQuoteForm } from "@/app/actions";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
// ÚJ: Ikonok importálása az inputokhoz
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

type Props = {
  t: {
    personal_title: string;
    project_title: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    type_label: string;
    type_options: Record<string, string>;
    timing_label: string;
    timing_options: Record<string, string>;
    message: string;
    submit_btn: string;
    success_title: string;
    success_desc: string;
    error_title: string;
    error_desc: string;
    // ÚJ: Placeholder mezők a típusdefinícióban
    first_name_placeholder: string;
    last_name_placeholder: string;
    email_placeholder: string;
    phone_placeholder: string;
    message_placeholder: string;
  };
};

// Alap stílus (outline nélkül, ring-gel)
const baseInputClasses =
  "block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white";

// Sima inputokhoz (paddinggal)
const inputClasses = `${baseInputClasses} px-3.5`;

// Ikonos inputokhoz (bal oldali extra paddinggal)
const inputWithIconClasses = `${baseInputClasses} pl-10 pr-3.5`;

export default function QuoteForm({ t }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
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

        {/* 1. Személyes Adatok */}
        <div>
          <h3 className="text-base font-semibold leading-7 text-gray-900 mb-4 border-b border-gray-100 pb-2">
            {t.personal_title}
          </h3>
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
                  className={inputWithIconClasses} // Itt használjuk a paddingos osztályt
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
                  className={inputWithIconClasses} // Itt is
                  placeholder={t.phone_placeholder}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
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
              <Controller
                control={control}
                name="projectType"
                render={({ field }) => (
                  <Listbox value={field.value} onChange={field.onChange}>
                    <Label className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                      {t.type_label}
                    </Label>
                    <div className="relative">
                      <ListboxButton
                        className={`${inputClasses} text-left relative pr-10`}
                      >
                        <span
                          className={`block truncate ${
                            !field.value ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {field.value
                            ? t.type_options[field.value]
                            : "Válasszon..."}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronUpDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                      </ListboxButton>

                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {Object.entries(t.type_options).map(
                            ([key, label]) => (
                              <ListboxOption
                                key={key}
                                value={key}
                                className="group relative cursor-default py-2 pr-4 pl-9 text-gray-900 select-none data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                              >
                                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                  {label}
                                </span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 group-not-data-[selected]:hidden group-data-[focus]:text-white">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </ListboxOption>
                            )
                          )}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                )}
              />
              {errors.projectType && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.projectType.message}
                </p>
              )}
            </div>

            {/* Időzítés választó */}
            <div className="sm:col-span-2">
              <Controller
                control={control}
                name="timing"
                render={({ field }) => (
                  <Listbox value={field.value} onChange={field.onChange}>
                    <Label className="block text-sm font-semibold leading-6 text-gray-900 mb-2">
                      {t.timing_label}
                    </Label>
                    <div className="relative">
                      <ListboxButton
                        className={`${inputClasses} text-left relative pr-10`}
                      >
                        <span
                          className={`block truncate ${
                            !field.value ? "text-gray-400" : "text-gray-900"
                          }`}
                        >
                          {field.value
                            ? t.timing_options[field.value]
                            : "Válasszon..."}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronUpDownIcon
                            aria-hidden="true"
                            className="h-5 w-5 text-gray-400"
                          />
                        </span>
                      </ListboxButton>

                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <ListboxOptions className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {Object.entries(t.timing_options).map(
                            ([key, label]) => (
                              <ListboxOption
                                key={key}
                                value={key}
                                className="group relative cursor-default py-2 pr-4 pl-9 text-gray-900 select-none data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                              >
                                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                                  {label}
                                </span>
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600 group-not-data-[selected]:hidden group-data-[focus]:text-white">
                                  <CheckIcon
                                    aria-hidden="true"
                                    className="size-5"
                                  />
                                </span>
                              </ListboxOption>
                            )
                          )}
                        </ListboxOptions>
                      </Transition>
                    </div>
                  </Listbox>
                )}
              />
              {errors.timing && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.timing.message}
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
