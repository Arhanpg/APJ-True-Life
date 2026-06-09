"use client";

import { useState } from "react";

export function TreatmentForm() {
  const [phases, setPhases] = useState(3);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { label: "Plan Name", placeholder: "e.g. Nasal Polyp - Nasya Course" },
          { label: "Diagnosis", placeholder: "e.g. Chronic rhinitis with polyp formation" },
          { label: "Start Date", placeholder: "" },
          { label: "Estimated End Date", placeholder: "" },
        ].map((field) => (
          <label key={field.label} className="block space-y-2 text-sm font-medium text-primary-dark">
            <span>{field.label} <span className="text-error">*</span></span>
            <input
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
              placeholder={field.placeholder || `Select ${field.label.toLowerCase()}`}
            />
          </label>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
        <label className="block space-y-2 text-sm font-medium text-primary-dark">
          <span>Clinical Notes <span className="text-xs font-normal text-muted">(internal — not visible to patient)</span></span>
          <div className="min-h-[180px] rounded-2xl border border-outlinevariant bg-surface-low p-4 text-sm text-muted">
            <p className="italic">TipTap rich text editor — wire up with @tiptap/react in production.</p>
            <p className="mt-3">Use this field for dosha assessment, clinical observations, and internal treatment rationale.</p>
          </div>
        </label>
        <div className="space-y-4">
          <label className="block space-y-2 text-sm font-medium text-primary-dark">
            <span>Total Phases</span>
            <input
              type="number"
              value={phases}
              min={1}
              max={12}
              onChange={(e) => setPhases(Number(e.target.value))}
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <div className="rounded-2xl bg-surface-tint p-4 text-sm">
            <p className="font-semibold text-primary-dark">Plan Preview</p>
            <p className="mt-2 text-muted">
              {phases} phases · Starts on selected date · Published to patient on save.
            </p>
          </div>
        </div>
      </div>

      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Special Patient Instructions <span className="text-xs font-normal text-muted">(visible in patient app)</span></span>
        <textarea
          rows={3}
          className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. Avoid cold water throughout therapy. Sleep by 10 PM daily."
        />
      </label>
    </div>
  );
}
