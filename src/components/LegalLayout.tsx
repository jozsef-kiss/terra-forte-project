import React from "react";

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function LegalLayout({
  title,
  subtitle,
  children,
}: LegalLayoutProps) {
  return (
    <div className="bg-stone-50 min-h-screen py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 text-lg leading-8 text-gray-600">{subtitle}</p>
          )}
        </div>

        <div className="bg-white px-6 py-10 shadow-sm sm:rounded-3xl sm:px-10 ring-1 ring-gray-900/5">
          {/* Ez a div szimulálja a 'prose' osztályt */}
          <div className="space-y-6 text-base leading-7 text-gray-600">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
