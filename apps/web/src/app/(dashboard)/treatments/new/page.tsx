import { TreatmentForm } from "@/components/treatments/treatment-form";
import { patients } from "@/lib/mock-data";
import Link from "next/link";

export default function NewTreatmentPage() {
  const patient = patients[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      {/* Form */}
      <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-3">
          <Link href="/treatments" className="text-sm text-[#1A5C38] hover:underline">← Treatments</Link>
        </div>
        <h1 className="text-2xl font-semibold text-[#004324]">Create New Treatment Plan</h1>
        <p className="mt-1 text-sm text-[#404941]">Draft and publish a multi-phase Ayurvedic treatment plan for the patient.</p>
        <div className="mt-6">
          <TreatmentForm />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Link href="/treatments" className="rounded-xl border border-[#C0C9BF] px-5 py-2.5 text-sm">Cancel</Link>
          <button className="rounded-xl bg-[#1A5C38] px-5 py-2.5 text-sm font-medium text-white">Save &amp; Publish to Patient</button>
        </div>
      </div>

      {/* Patient Sidebar */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Patient Snapshot</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[#F5FBF7] p-4">
              <p className="font-medium text-[#111E18]">{patient.name}</p>
              <p className="text-[#404941]">{patient.prakriti} · {patient.age} years</p>
            </div>
            <div className="rounded-xl bg-[#F5FBF7] p-4">
              <p className="text-xs text-[#707971]">Previous Treatment</p>
              <p className="mt-1 font-medium text-[#111E18]">{patient.activeTreatment}</p>
            </div>
            <div className="rounded-xl bg-[#F5FBF7] p-4">
              <p className="text-xs text-[#707971]">Last Visit</p>
              <p className="mt-1 font-medium text-[#111E18]">{patient.lastVisit}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-800">⚠️ Chat Deletion Note</p>
          <p className="mt-2 text-sm text-amber-700">When this treatment is completed, all chat messages with this patient will be permanently deleted. Prescriptions and treatment records are preserved.</p>
        </div>
      </div>
    </div>
  );
}
