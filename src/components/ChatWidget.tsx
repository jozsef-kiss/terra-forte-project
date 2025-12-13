"use client";

import { useState, useRef, useEffect } from "react";
// @ts-ignore
import { useChat } from "@ai-sdk/react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
  SparklesIcon, // Hozzáadva az új gombhoz
} from "@heroicons/react/24/outline";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // --- FORMÁZÓ ---
  const formatMessage = (text: string) => {
    const paragraphs = text.split(/\n\s*\n/);
    return paragraphs.map((paragraph, pIndex) => {
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={pIndex} className="mb-3 last:mb-0 leading-relaxed">
          {parts.map((part, partIndex) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong
                  key={partIndex}
                  className="font-semibold text-indigo-700"
                >
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={partIndex}>{part}</span>;
          })}
        </p>
      );
    });
  };

  // --- KÜLDÉS ---
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Hiba");
      if (!response.body) throw new Error("Üres válasz");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      setMessages((prev) => [
        ...prev,
        { id: "ai-" + Date.now(), role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.includes("[DONE]")) continue;
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.replace("data: ", ""));
              const content = json.choices[0]?.delta?.content || "";
              if (content) {
                assistantMessage += content;
                setMessages((prev) => {
                  const newArr = [...prev];
                  newArr[newArr.length - 1].content = assistantMessage;
                  return newArr;
                });
              }
            } catch (e) {}
          }
        }
      }
    } catch (error) {
      console.error("Hiba:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">
      {/* Chat Ablak */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
          {/* Fejléc (Hanna) */}
          <div className="bg-indigo-900 p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              {/* Egy kis ikon az arcnak */}
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white">
                <UserCircleIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Hanna</h3>
                <p className="text-indigo-200 text-xs">
                  Terra Forte Bau Asszisztens
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-indigo-100 hover:text-white p-1"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 text-sm mt-10 px-4 border border-dashed border-gray-300 rounded-lg p-4 bg-white">
                <p className="font-bold text-gray-900 mb-2">Szia! 👋</p>
                <p className="text-xs mt-2 leading-relaxed">
                  Hanna vagyok, a Terra Forte Bau virtuális asszisztense.
                  Kérdezz bátran a játszótereinkről vagy szolgáltatásainkról!
                </p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {m.role === "user" ? (
                    <p>{m.content}</p>
                  ) : (
                    <div>{formatMessage(m.content)}</div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-2 text-xs text-gray-500 animate-pulse flex items-center gap-2">
                  <span>Hanna ír...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleManualSubmit}
            className="p-3 bg-white border-t border-gray-100 shrink-0"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-black focus:outline-none transition-all"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Kérdezzen Hannától..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 shadow-md"
              >
                <PaperAirplaneIcon className="h-5 w-5 -ml-0.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* A MÓDOSÍTOTT GOMB (INTUITÍV + NINCS BORDER) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          shadow-xl flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 hover:scale-105 z-50 outline-none border-none
          ${isOpen ? "h-14 w-14 rounded-full" : "h-14 px-6 rounded-full gap-3"} 
        `}
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <>
            <div className="relative">
              <ChatBubbleLeftRightIcon className="h-7 w-7" />
              <SparklesIcon className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300 animate-pulse" />
            </div>
            <span className="font-semibold text-base whitespace-nowrap">
              Hanna AI Asszisztens
            </span>
          </>
        )}
      </button>
    </div>
  );
}
