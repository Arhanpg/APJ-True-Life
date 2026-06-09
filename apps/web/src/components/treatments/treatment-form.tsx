"use client";

import { useState } from "react";

export function TreatmentForm() {
  const [phases, setPhases] = useState(3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {["Plan Name", "Diagnosis", "Start Date", "Estimated End Date"].map((label) => (
          <label key={label} className="block space-y-1.5 text-sm font-medium text-[#111E18]">
            {label}
            <input
              type={label.includes("Date") ? "date" : "text"}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
            />
          </label>
        ))}
      </div>

      <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
        Clinical Notes{" "}
        <span className="font-normal text-[#707971]">(internal — not visible to patient)</span>
        <div className="mt-1 min-h-[160px] rounded-xl border border-[#C0C9BF] bg-[#F5FBF7] px-4 py-3 text-sm text-[#404941]">
          Rich text editor (TipTap) — Describe dosha imbalances, clinical observations, treatment rationale and internal doctor notes here.
        </div>
      </label>

      <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
        Special Patient Instructions{" "}
        <span className="font-normal text-[#707971]">(visible in patient app)</span>
        <textarea
          rows={4}
          placeholder="Lifestyle adjustments, home remedies, and instructions the patient should follow throughout the treatment..."
          className="mt-1 block w-full resize-none rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
        />
      </label>

      <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
        Total Phases
        <input
          type="number"
          min={1}
          max={12}
          value={phases}
          onChange={(e) => setPhases(Number(e.target.value))}
          className="mt-1 block w-32 rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
        />
      </label>
    </div>
  );
}
