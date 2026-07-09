"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Bonjour et bienvenue chez TimeTravel Agency. Je suis votre concierge temporel — posez-moi vos questions sur nos destinations, nos tarifs ou le choix d'une époque. ✨",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.ok
            ? data.reply
            : "Désolé, je rencontre une turbulence temporelle. Réessayez dans un instant.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, je rencontre une turbulence temporelle. Réessayez dans un instant.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Fenêtre de chat */}
      <div
        className={`fixed bottom-24 right-5 z-50 w-[min(92vw,380px)] origin-bottom-right transition-all duration-300 ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-[min(72vh,560px)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/50">
          {/* En-tête */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-lg">
              🕰️
            </span>
            <div className="min-w-0">
              <p className="font-display text-lg leading-tight text-gold-soft">Concierge temporel</p>
              <p className="truncate text-xs text-muted">TimeTravel Agency</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto text-muted transition-colors hover:text-foreground"
              aria-label="Fermer le chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-gold text-background"
                      : "rounded-bl-sm border border-border bg-surface-2 text-foreground"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-4 py-3">
                  <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                </div>
              </div>
            )}
          </div>

          {/* Saisie */}
          <div className="border-t border-border bg-surface-2 p-3">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-gold/60">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="text-gold transition-colors hover:text-gold-soft disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Envoyer"
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulle flottante */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gradient-to-br from-gold to-gold-soft text-2xl text-background shadow-lg shadow-black/40 transition-transform hover:scale-105 active:scale-95"
        aria-label={open ? "Fermer le chat" : "Ouvrir le chat"}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}

function Dot({ delay = "0s" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-muted"
      style={{ animationDelay: delay }}
    />
  );
}
