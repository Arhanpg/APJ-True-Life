import { TreatmentForm } from "@/components/treatments/treatment-form";

export default function NewTreatmentPage() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-primary-dark">Create New Treatment Plan</h1>
          <p className="mt-1 text-sm text-muted">
            Draft a multi-phase Ayurvedic treatment plan and publish it to the patient app.
          </p>
        </div>
        <TreatmentForm />
        <div className="mt-6 flex justify-end gap-3">
          <button className="rounded-xl border border-outlinevariant px-5 py-3 text-sm text-muted transition hover:bg-surface-low">
            Save as Draft
          </button>
          <button className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark">
            Save &amp; Publish to Patient
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-primary-dark">Patient Snapshot</h2>
        <div className="mt-5 space-y-3 text-sm">
          {[
            { label: "Patient", value: "Rahul Nair" },
            { label: "Prakriti", value: "Vata-Pitta" },
            { label: "Age", value: "34 years" },
            { label: "Current Focus", value: "Nasal polyp management and breathing restoration" },
            { label: "Last Appointment", value: "7 June 2026 · In-clinic review" },
          ].map((row) => (
            <div key={row.label} className="rounded-xl bg-surface-low p-3">
              <p className="text-xs text-muted">{row.label}</p>
              <p className="mt-0.5 font-medium text-onsurface">{row.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
