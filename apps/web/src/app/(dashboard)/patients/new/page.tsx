import { PatientForm } from "@/components/patients/patient-form";

export default function NewPatientPage() {
  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-primary-dark">Create New Patient Profile</h1>
        <p className="mt-1 text-sm text-muted">
          Doctor-assisted onboarding. Patient will receive an SMS invite after profile is saved.
        </p>
      </div>
      <PatientForm />
      <div className="mt-6 flex justify-end gap-3">
        <button className="rounded-xl border border-outlinevariant px-5 py-3 text-sm text-muted transition hover:bg-surface-low">
          Cancel
        </button>
        <button className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark">
          Save Patient &amp; Send Invite
        </button>
      </div>
    </div>
  );
}
