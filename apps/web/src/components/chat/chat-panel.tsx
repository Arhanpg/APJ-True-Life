"use client";
import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const INITIAL_MESSAGES = [
  { author: "patient" as const, text: "Doctor, the nasal blockage is improving a lot today.", time: "10:02 AM" },
  { author: "doctor" as const, text: "Great to hear. Please continue Nasya twice daily. Avoid cold foods for 3 more days.", time: "10:05 AM" },
  { author: "patient" as const, text: "Understood. I will also upload the steam inhalation photo shortly.", time: "10:06 AM" },
  { author: "doctor" as const, text: "Perfect. I’ll review and update your phase notes accordingly.", time: "10:08 AM" },
];

export function ChatPanel() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { author: "doctor", text: input.trim(), time: "Now" }]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-160px)] min-h-[500px] flex-col rounded-2xl border border-outlinevariant bg-white shadow-card">
      {/* Chat header */}
      <div className="border-b border-outlinevariant p-5">
        <h3 className="text-lg font-semibold text-primary-dark">Rahul Nair</h3>
        <p className="text-sm text-muted">
          Treatment-scoped chat · Nasal Polyp - Nasya Course
        </p>
        <div className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs text-warning">
          ⚠️ Chat messages will be permanently deleted when this treatment is completed.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-surface-low p-5">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.author === "patient" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-sm rounded-2xl px-4 py-3 text-sm ${
                msg.author === "patient"
                  ? "bg-primary text-white"
                  : "border border-outlinevariant bg-white text-onsurface"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`mt-1 text-[11px] ${msg.author === "patient" ? "text-white/70" : "text-muted"}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-outlinevariant p-4">
        <div className="flex gap-3">
          <button className="rounded-xl border border-outlinevariant p-3 text-muted hover:bg-surface-low" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a treatment message…"
            className="flex-1 rounded-xl border border-outlinevariant px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={send}
            className="rounded-xl bg-primary px-4 py-3 text-white transition hover:bg-primary-dark"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
