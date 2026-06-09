"use client";
import { useState } from "react";

export function TreatmentForm() {
  const [phases, setPhases] = useState(3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Plan Name", placeholder: "e.g. Nasal Polyp - Nasya Course" },
          { label: "Diagnosis", placeholder: "Clinical diagnosis summary" },
          { label: "Start Date", placeholder: "", type: "date" },
          { label: "Estimated End Date", placeholder: "", type: "date" },
        ].map((f) => (
          <label key={f.label} className="space-y-2 text-sm font-medium text-primary-dark">
            <span>{f.label}</span>
            <input
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-[1fr_260px]">
        <label className="space-y-2 text-sm font-medium text-primary-dark">
          <span>Clinical Notes (Internal — not visible to patient)</span>
          <div className="min-h-[180px] rounded-2xl border border-outlinevariant bg-surface-low p-4 text-sm text-muted">
            TipTap rich-text editor placeholder. Integrate @tiptap/react here for
            dosha assessment, treatment rationale, and internal clinical observations.
          </div>
        </label>

        <div className="space-y-4">
          <label className="space-y-2 text-sm font-medium text-primary-dark">
            <span>Total Phases</span>
            <input
              type="number"
              value={phases}
              min={1}
              max={12}
              onChange={(e) => setPhases(Number(e.target.value))}
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <div className="rounded-2xl bg-surface-tint p-4 text-sm">
            <p className="font-semibold text-primary-dark">Plan Preview</p>
            <p className="mt-2 text-muted">
              {phases} phase{phases !== 1 ? "s" : ""} planned. Will be published to patient
              upon save.
            </p>
          </div>
        </div>
      </div>

      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Special Patient Instructions (visible in app)</span>
        <textarea
          rows={4}
          placeholder="Instructions the patient will see in their mobile app…"
          className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
    </div>
  );
}
