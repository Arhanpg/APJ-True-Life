"use client";
import { cn } from "@/lib/utils";
import { conversations } from "@/lib/mock-data";

export function ConversationList({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-outlinevariant bg-white shadow-card">
      <div className="border-b border-outlinevariant p-5">
        <h2 className="text-lg font-semibold text-primary-dark">Conversations</h2>
        <input
          placeholder="Search conversations…"
          className="mt-3 w-full rounded-xl border border-outlinevariant px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={cn(
              "w-full border-b border-outlinevariant/60 p-4 text-left transition hover:bg-surface-low",
              activeId === item.id && "bg-surface-tint"
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium text-primary-dark">{item.patientName}</p>
                <p className="truncate text-xs text-muted">{item.treatmentName}</p>
              </div>
              {item.unread > 0 && (
                <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-white">
                  {item.unread}
                </span>
              )}
            </div>
            <p className="mt-2 truncate text-sm text-muted">{item.preview}</p>
            <p className="mt-1 text-xs text-muted">{item.timestamp}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
