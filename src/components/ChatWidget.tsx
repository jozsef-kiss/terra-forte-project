"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // A Vercel AI SDK hook-ja: ez kezeli a teljes chat logikát!
  // Automatikusan hívja majd a /api/chat végpontot (amit a következő lépésben írunk meg).
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onError: (error) => {
        console.error("Chat hiba:", error);
      },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Automatikus görgetés az új üzenethez
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">
      {/* Chat Ablak (csak ha nyitva van) */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Fejléc */}
          <div className="bg-indigo-900 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                Terra Forte AI
              </h3>
              <p className="text-indigo-200 text-xs">
                Azonnali válaszok a dokumentációból
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-indigo-100 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Üzenetek listája */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-10 px-4">
                <div className="bg-indigo-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <ChatBubbleLeftRightIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="font-medium text-gray-900">Üdvözlöm! 👋</p>
                <p className="mt-1">
                  Én a Terra Forte Bau AI asszisztense vagyok. Kérdezzen bátran
                  a játszótereinkről, szabványokról vagy szolgáltatásainkról!
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Töltés indikátor */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-xs text-gray-500 italic animate-pulse">
                  A válasz generálása folyamatban...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input mező */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-gray-100"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={input}
                onChange={handleInputChange}
                placeholder="Írja ide a kérdését..."
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full w-10 h-10 p-0 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white shrink-0"
              >
                <PaperAirplaneIcon className="h-5 w-5 -ml-0.5" />
                <span className="sr-only">Küldés</span>
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Nyitó Gomb (Floating Action Button) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen
            ? "bg-white text-gray-600 border border-gray-200"
            : "bg-indigo-600 text-white hover:bg-indigo-700 border-4 border-white ring-1 ring-gray-200"
        }`}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-7 w-7" />
        )}
      </button>
    </div>
  );
}
