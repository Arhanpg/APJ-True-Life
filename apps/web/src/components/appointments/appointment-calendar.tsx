"use client";

import { appointmentEvents } from "@/lib/mock-data";
import { useState } from "react";
import { StatusBadge } from "@/components/shared/status-badge";
import { todaySchedule } from "@/lib/mock-data";

export function AppointmentCalendar() {
  const [view, setView] = useState<"calendar" | "list">("list");

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("list")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            view === "list" ? "bg-[#1A5C38] text-white" : "bg-[#E1F2E8] text-[#404941]"
          }`}
        >
          List View
        </button>
        <button
          onClick={() => setView("calendar")}
          className={`rounded-xl px-4 py-2 text-sm font-medium ${
            view === "calendar" ? "bg-[#1A5C38] text-white" : "bg-[#E1F2E8] text-[#404941]"
          }`}
        >
          Calendar View
        </button>
      </div>

      {view === "list" ? (
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#E1F2E8] text-[#404941]">
                <th className="pb-3 font-medium">Time</th>
                <th className="pb-3 font-medium">Patient</th>
                <th className="pb-3 font-medium">Purpose</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E1F2E8]">
              {todaySchedule.map((item) => (
                <tr key={`${item.time}-${item.patient}`}>
                  <td className="py-4 font-mono text-xs text-[#404941]">{item.time}</td>
                  <td className="py-4 font-medium text-[#111E18]">{item.patient}</td>
                  <td className="py-4 text-[#404941]">{item.purpose}</td>
                  <td className="py-4"><StatusBadge label={item.status} /></td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg bg-[#1A5C38] px-3 py-1.5 text-xs text-white">Confirm</button>
                      <button className="rounded-lg border border-[#C0C9BF] px-3 py-1.5 text-xs">Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-[#004324]">Week of {new Date().toDateString()}</h3>
          </div>
          <div className="space-y-3">
            {appointmentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 rounded-xl p-4"
                style={{ backgroundColor: event.backgroundColor + "20", borderLeft: `4px solid ${event.backgroundColor}` }}
              >
                <div>
                  <p className="font-medium text-[#111E18]">{event.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-[#404941]">
                    {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} –{" "}
                    {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
