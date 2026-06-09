"use client";

import { conversations } from "@/lib/mock-data";
import { MessageSquare } from "lucide-react";

interface Props {
  activeId?: string;
  onSelect?: (id: string) => void;
}

export function ConversationList({ activeId, onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-[#C0C9BF] bg-white shadow-sm">
      <div className="border-b border-[#E1F2E8] p-5">
        <h3 className="font-semibold text-[#004324]">Conversations</h3>
        <input
          placeholder="Search conversations…"
          className="mt-3 w-full rounded-xl border border-[#C0C9BF] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1A5C38]"
        />
      </div>
      <div className="divide-y divide-[#E1F2E8]">
        {conversations.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect?.(item.id)}
            className={`w-full p-4 text-left hover:bg-[#F5FBF7] ${
              activeId === item.id ? "bg-[#E1F2E8]" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-medium text-[#111E18]">{item.patientName}</p>
                <p className="mt-0.5 truncate text-xs text-[#707971]">{item.treatmentName}</p>
              </div>
              {item.unread > 0 && (
                <span className="shrink-0 rounded-full bg-[#1A5C38] px-2 py-0.5 text-xs font-bold text-white">
                  {item.unread}
                </span>
              )}
            </div>
            <p className="mt-2 truncate text-sm text-[#404941]">{item.preview}</p>
            <p className="mt-1 text-xs text-[#707971]">{item.timestamp}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
