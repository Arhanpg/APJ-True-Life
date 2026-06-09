"use client";

import { useState } from "react";
import { conversations } from "@/lib/mock-data";

export function ConversationList({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = conversations.filter((c) =>
    c.patientName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col rounded-2xl border border-outlinevariant bg-white shadow-card">
      <div className="border-b border-outlinevariant p-4">
        <h3 className="text-lg font-semibold text-primary-dark">Conversations</h3>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients…"
          className="mt-3 w-full rounded-xl border border-outlinevariant px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full border-b border-outlinevariant/50 p-4 text-left transition hover:bg-surface-low ${
              activeId === item.id ? "bg-surface-tint" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 overflow-hidden">
                <p className="font-medium text-onsurface">{item.patientName}</p>
                <p className="text-xs text-muted">{item.treatmentName}</p>
                <p className="mt-1 truncate text-sm text-muted">{item.preview}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="whitespace-nowrap text-xs text-muted">{item.timestamp}</p>
                {item.unread > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                    {item.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
