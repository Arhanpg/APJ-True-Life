"use client";

import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

const INITIAL_MESSAGES = [
  { id: "1", author: "patient" as const, text: "Doctor, the nasal blockage is significantly better today. Steam inhalation is really helping.", time: "10:02 AM" },
  { id: "2", author: "doctor" as const, text: "Great progress, Rahul. Continue the Nasya twice daily for 3 more days. Avoid cold foods and drinks completely.", time: "10:05 AM" },
  { id: "3", author: "patient" as const, text: "Understood. Should I reduce the steam time as well?", time: "10:07 AM" },
  { id: "4", author: "doctor" as const, text: "No, keep it at 10 minutes. I will review you again on Thursday.", time: "10:08 AM" },
];

export function ChatPanel() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), author: "doctor", text: input.trim(), time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-full min-h-[600px] flex-col rounded-2xl border border-[#C0C9BF] bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E1F2E8] p-5">
        <div>
          <h3 className="font-semibold text-[#004324]">Rahul Nair</h3>
          <p className="text-sm text-[#707971]">Nasal Polyp - Nasya Course · Treatment-scoped chat</p>
        </div>
        <button className="rounded-xl border border-[#C0C9BF] px-3 py-2 text-sm text-[#404941] hover:bg-[#F5FBF7]">
          Video Call (coming soon)
        </button>
      </div>

      {/* Warning banner */}
      <div className="border-b border-amber-200 bg-amber-50 px-5 py-2.5 text-xs text-amber-800">
        ⚠️ Chat messages will be permanently deleted when this treatment is completed.
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-[#F5FBF7] p-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.author === "doctor" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.author === "doctor"
                  ? "bg-[#1A5C38] text-white"
                  : "bg-white text-[#111E18] border border-[#E1F2E8]"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`mt-1.5 text-right text-[10px] ${
                msg.author === "doctor" ? "text-white/70" : "text-[#707971]"
              }`}>
                {msg.time} {msg.author === "doctor" ? "✓✓" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-[#E1F2E8] p-4">
        <div className="flex items-center gap-3">
          <button className="shrink-0 text-[#707971] hover:text-[#1A5C38]" aria-label="Attach file">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type a message…"
            className="flex-1 rounded-xl border border-[#C0C9BF] px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1A5C38]"
          />
          <button
            onClick={send}
            className="shrink-0 rounded-xl bg-[#1A5C38] p-2.5 text-white hover:bg-[#004324]"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
