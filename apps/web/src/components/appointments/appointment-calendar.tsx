"use client";

import { useState } from "react";
import { appointmentEvents } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

export function AppointmentCalendar() {
  const [view, setView] = useState<"calendar" | "list">("list");

  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-primary-dark">Appointment Calendar</h3>
        <div className="flex gap-2">
          {(["list", "calendar"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-lg px-4 py-2 text-sm capitalize ${
                view === v ? "bg-primary text-white" : "border border-outlinevariant text-muted"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {appointmentEvents.map((event, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-outlinevariant p-4">
              <div>
                <p className="font-medium text-onsurface">{event.title}</p>
                <p className="font-mono text-xs text-muted">
                  {new Date(event.start).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
              <StatusBadge label="Confirmed" />
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="mb-3 grid grid-cols-[64px_repeat(7,1fr)] gap-1 text-center text-xs font-medium text-muted">
              <div />
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="rounded-lg bg-surface-tint py-2">{d}</div>
              ))}
            </div>
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-[64px_repeat(7,1fr)] gap-1">
                <div className="py-2 text-right pr-2 font-mono text-xs text-muted">{hour}</div>
                {Array.from({ length: 7 }).map((_, d) => {
                  const match = appointmentEvents.find(
                    (e) => new Date(e.start).getDay() === (d + 1) % 7 &&
                      new Date(e.start).getHours() === parseInt(hour)
                  );
                  return (
                    <div
                      key={d}
                      className={`min-h-[40px] rounded-lg border p-1 text-xs ${
                        match ? "border-primary/40 bg-primary/10 text-primary" : "border-outlinevariant/40"
                      }`}
                    >
                      {match && <span className="line-clamp-2">{match.title}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
