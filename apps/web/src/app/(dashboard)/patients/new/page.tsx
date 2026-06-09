import { PatientForm } from "@/components/patients/patient-form";
import Link from "next/link";

export default function NewPatientPage() {
  return (
    <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/patients" className="text-sm text-[#1A5C38] hover:underline">← Patients</Link>
        <span className="text-[#C0C9BF]">/</span>
        <span className="text-sm text-[#404941]">New Patient</span>
      </div>
      <h1 className="text-2xl font-semibold text-[#004324]">Create New Patient Profile</h1>
      <p className="mt-1 text-sm text-[#404941]">Doctor-assisted onboarding. An SMS invite will be sent after profile creation.</p>
      <div className="mt-6">
        <PatientForm />
      </div>
      <div className="mt-6 flex justify-end gap-3">
        <Link href="/patients" className="rounded-xl border border-[#C0C9BF] px-5 py-2.5 text-sm">Cancel</Link>
        <button className="rounded-xl bg-[#1A5C38] px-5 py-2.5 text-sm font-medium text-white">Save Patient</button>
      </div>
    </div>
  );
}
