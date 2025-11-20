"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { sendGTMEvent } from "@next/third-parties/google";

type Props = {
  t: {
    title: string;
    description: string;
    accept: string;
    decline: string;
    privacy_link: string;
  };
  lang: string;
};

export default function CookieBanner({ t, lang }: Props) {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (status: "granted" | "denied") => {
    localStorage.setItem("cookie_consent", status);

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("consent", "update", {
        analytics_storage: status,
        ad_storage: status,
        ad_user_data: status,
        ad_personalization: status,
      });
    }

    sendGTMEvent({ event: "consent_update", status });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-gray-900/10 md:flex md:items-center md:justify-between md:gap-8">
          <div className="md:flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{t.title}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {t.description}{" "}
              <Link
                href={`/${lang}/adatvedelem`}
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
              >
                {t.privacy_link}
              </Link>
              .
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-0 md:flex-shrink-0">
            {/* JAVÍTÁS: Sima HTML gombok használata a láthatóságért */}
            <button
              onClick={() => updateConsent("denied")}
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {t.decline}
            </button>
            <button
              onClick={() => updateConsent("granted")}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {t.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
