"use client";

import { useState } from "react";
import { phases } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { ChevronDown, ChevronUp } from "lucide-react";

export function PhaseTimeline() {
  const [expanded, setExpanded] = useState<string | null>("phase-2");

  return (
    <div className="space-y-4">
      {phases.map((phase, index) => {
        const isOpen = expanded === phase.id;
        return (
          <div key={phase.id} className="rounded-2xl border border-[#C0C9BF] bg-white shadow-sm">
            <button
              className="flex w-full items-center justify-between p-5 text-left"
              onClick={() => setExpanded(isOpen ? null : phase.id)}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    phase.status === "Completed"
                      ? "bg-[#1A5C38] text-white"
                      : phase.status === "Current"
                      ? "bg-[#C9A84C] text-white"
                      : "bg-[#E1F2E8] text-[#404941]"
                  }`}
                >
                  {phase.status === "Completed" ? "✓" : index + 1}
                </div>
                <div>
                  <p className="font-semibold text-[#004324]">{phase.title}</p>
                  <p className="mt-0.5 text-sm text-[#404941]">{phase.goal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge label={phase.status} />
                {isOpen ? <ChevronUp className="h-4 w-4 text-[#707971]" /> : <ChevronDown className="h-4 w-4 text-[#707971]" />}
              </div>
            </button>

            {isOpen && (
              <div className="border-t border-[#E1F2E8] p-5">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#004324]">Procedures</p>
                    <ul className="space-y-2">
                      {phase.procedures.map((p) => (
                        <li key={p} className="flex gap-2 text-sm text-[#404941]">
                          <span className="mt-0.5 text-[#1A5C38]">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#004324]">Medicines</p>
                    <ul className="space-y-3">
                      {phase.medicines.map((m) => (
                        <li key={m.name} className="rounded-xl bg-[#F5FBF7] p-3 text-sm">
                          <p className="font-medium text-[#111E18]">{m.name}</p>
                          <p className="text-xs text-[#404941]">{m.dosage} · {m.frequency} · {m.timing}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-semibold text-[#004324]">Diet Guidelines</p>
                    <div className="space-y-2">
                      {phase.dietConsume.map((d) => (
                        <p key={d} className="flex gap-2 text-sm text-[#404941]">
                          <span className="text-emerald-600">✓</span> {d}
                        </p>
                      ))}
                      {phase.dietAvoid.map((d) => (
                        <p key={d} className="flex gap-2 text-sm text-[#404941]">
                          <span className="text-red-500">✗</span> {d}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
