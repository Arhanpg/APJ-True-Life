import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import Link from "next/link";

export default function PatientProfilePage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id) ?? patients[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      {/* Main info */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Link href="/patients" className="text-sm text-[#1A5C38] hover:underline">← Patients</Link>
          </div>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1A5C38] text-xl font-bold text-white">
                {patient.name[0]}
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-[#004324]">{patient.name}</h1>
                <p className="mt-1 text-sm text-[#404941]">{patient.id} · {patient.email} · {patient.phone}</p>
              </div>
            </div>
            <StatusBadge label={patient.status} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Age", value: `${patient.age} years` },
              { label: "Gender", value: patient.gender },
              { label: "Prakriti", value: patient.prakriti },
              { label: "Blood Group", value: "B+" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#F5FBF7] p-4">
                <p className="text-xs text-[#707971]">{item.label}</p>
                <p className="mt-1 font-medium text-[#111E18]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Medical History</h2>
          <ul className="mt-4 space-y-3 text-sm text-[#404941]">
            <li className="flex gap-2"><span className="text-[#1A5C38]">•</span> Chronic sinus inflammation (March 2026)</li>
            <li className="flex gap-2"><span className="text-[#1A5C38]">•</span> No known drug allergies</li>
            <li className="flex gap-2"><span className="text-[#1A5C38]">•</span> Sleep quality improved after Phase 1 treatment</li>
            <li className="flex gap-2"><span className="text-[#1A5C38]">•</span> Mild Vata imbalance noted in initial dosha assessment</li>
          </ul>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Active Treatment</h2>
          <p className="mt-2 text-sm text-[#404941]">{patient.activeTreatment}</p>
          <p className="mt-1 text-sm text-[#707971]">Last visit: {patient.lastVisit}</p>
        </div>

        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/treatments/new" className="rounded-xl bg-[#1A5C38] px-4 py-3 text-center text-sm font-medium text-white">
              + New Treatment
            </Link>
            <Link href="/appointments" className="rounded-xl border border-[#C0C9BF] px-4 py-3 text-center text-sm">
              Book Appointment
            </Link>
            <Link href="/chat" className="rounded-xl border border-[#C0C9BF] px-4 py-3 text-center text-sm">
              Send Message
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Document Vault</h2>
          <p className="mt-2 text-sm text-[#707971]">No documents uploaded yet for this patient.</p>
        </div>
      </div>
    </div>
  );
}
