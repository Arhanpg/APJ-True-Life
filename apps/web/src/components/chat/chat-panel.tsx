"use client";

import { useState } from "react";
import { conversations } from "@/lib/mock-data";
import { Paperclip, Send } from "lucide-react";

const sampleMessages = [
  { from: "patient", text: "Doctor, the nasal blockage is improving today.", time: "10:02 AM" },
  { from: "doctor", text: "Great progress! Continue Nasya twice daily and avoid cold food for 3 more days.", time: "10:05 AM" },
  { from: "patient", text: "Understood. I will upload the steam inhalation photo shortly.", time: "10:06 AM" },
  { from: "doctor", text: "Perfect. Let me know if there is any discomfort during the evening session.", time: "10:08 AM" },
];

export function ChatPanel({ conversationId }: { conversationId: string }) {
  const [message, setMessage] = useState("");
  const conversation = conversations.find((c) => c.id === conversationId) ?? conversations[0];

  return (
    <div className="flex h-full min-h-[600px] flex-col rounded-2xl border border-outlinevariant bg-white shadow-card">
      {/* Header */}
      <div className="border-b border-outlinevariant p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-dark">{conversation.patientName}</h3>
            <p className="text-sm text-muted">
              Treatment-scoped chat &middot; {conversation.treatmentName}
            </p>
          </div>
          <button className="rounded-xl border border-outlinevariant px-3 py-2 text-sm text-muted transition hover:bg-surface-low">
            Video Call
          </button>
        </div>
        {/* Warning banner */}
        <div className="mt-3 rounded-xl bg-amber-50 px-4 py-2 text-xs text-amber-700">
          ⚠ Chat messages will be permanently deleted when this treatment is completed.
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-surface-low p-6">
        {sampleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm rounded-2xl px-4 py-3 text-sm ${
                msg.from === "patient"
                  ? "bg-primary text-white"
                  : "border border-outlinevariant bg-white text-onsurface"
              }`}
            >
              <p>{msg.text}</p>
              <p
                className={`mt-1 text-[11px] ${
                  msg.from === "patient" ? "text-white/70" : "text-muted"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t border-outlinevariant p-4">
        <div className="flex items-center gap-3">
          <button className="text-muted hover:text-primary" aria-label="Attach file">
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a treatment message…"
            className="flex-1 rounded-xl border border-outlinevariant px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            className="rounded-xl bg-primary p-3 text-white transition hover:bg-primary-dark"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
