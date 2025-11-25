"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

// Saját típus definíció, hogy a TypeScript ne szóljon be
type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // --- SAJÁT STATE KEZELÉS (Library nélkül) ---
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // -------------------------------------------

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Görgetés
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // --- SAJÁT SUBMIT FÜGGVÉNY (Ez 100% hogy létezik) ---
  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // 1. Felhasználó üzenetének hozzáadása
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); // Input törlése
    setIsLoading(true);

    try {
      // 2. Kérés küldése a szervernek
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Szerver hiba");
      if (!response.body) throw new Error("Üres válasz");

      // 3. Stream olvasása (Kézi feldolgozás)
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = "";

      // Létrehozunk egy üres üzenetet az AI-nak
      setMessages((prev) => [
        ...prev,
        { id: "ai-" + Date.now(), role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // Az OpenAI stream soronként küldi az adatot "data: {...}" formátumban
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.includes("[DONE]")) continue;
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.replace("data: ", ""));
              const content = json.choices[0]?.delta?.content || "";
              if (content) {
                assistantMessage += content;
                // Frissítjük az utolsó üzenetet a state-ben
                setMessages((prev) => {
                  const newArr = [...prev];
                  newArr[newArr.length - 1].content = assistantMessage;
                  return newArr;
                });
              }
            } catch (e) {
              // Néha a chunk nem teljes JSON, ez normális streamelésnél
            }
          }
        }
      }
    } catch (error) {
      console.error("Hiba:", error);
      alert("Hiba történt a kommunikációban.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4 font-sans">
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-indigo-900 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                Terra Forte AI
              </h3>
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
              <div className="text-center text-gray-500 text-sm mt-10 px-4">
                <p className="font-bold">👋 Üdvözlöm!</p>
                <p className="text-xs mt-2">Miben segíthetek?</p>
              </div>
            )}

            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-xs text-gray-500 p-2 italic">Írok...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleManualSubmit}
            className="p-3 bg-white border-t border-gray-100"
          >
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-50 border border-gray-300 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 text-black"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Kérdezzen..."
              />
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700"
              >
                <PaperAirplaneIcon className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full shadow-xl flex items-center justify-center bg-indigo-600 text-white hover:bg-indigo-700 transition-transform hover:scale-105"
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
