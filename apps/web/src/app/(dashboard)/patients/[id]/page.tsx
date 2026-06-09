import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import Link from "next/link";

export default function PatientProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const patient = patients.find((p) => p.id === params.id) ?? patients[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
      {/* Left: Patient Details */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-muted">{patient.id}</p>
              <h1 className="mt-1 text-2xl font-semibold text-primary-dark">{patient.name}</h1>
              <p className="mt-1 text-sm text-muted">
                {patient.email} &middot; {patient.phone}
              </p>
            </div>
            <StatusBadge label={patient.status} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              { label: "Prakriti", value: patient.prakriti },
              { label: "Age / Gender", value: `${patient.age} years / ${patient.gender}` },
              { label: "Active Treatment", value: patient.activeTreatment },
              { label: "Last Visit", value: patient.lastVisit },
              { label: "Blood Group", value: "B+" },
              { label: "Emergency Contact", value: "+91 9012345678" },
            ].map((row) => (
              <div key={row.label} className="rounded-xl bg-surface-low p-4">
                <p className="text-xs text-muted">{row.label}</p>
                <p className="mt-1 text-sm font-medium text-onsurface">{row.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-primary-dark">Medical History</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2"><span className="text-primary">•</span> Chronic sinus inflammation — March 2026</li>
            <li className="flex gap-2"><span className="text-primary">•</span> No known drug allergies</li>
            <li className="flex gap-2"><span className="text-primary">•</span> Sleep quality improved post Phase 1</li>
          </ul>
        </div>
      </div>

      {/* Right: Quick Actions + Document Vault */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-primary-dark">Quick Actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/treatments/new"
              className="rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-dark"
            >
              New Treatment
            </Link>
            <Link
              href="/appointments"
              className="rounded-xl border border-outlinevariant px-4 py-3 text-sm transition hover:bg-surface-low"
            >
              Book Appointment
            </Link>
            <Link
              href="/chat"
              className="rounded-xl border border-outlinevariant px-4 py-3 text-sm transition hover:bg-surface-low"
            >
              Send Message
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-lg font-semibold text-primary-dark">Document Vault</h2>
          <p className="mt-2 text-sm text-muted">All prescriptions, diet charts, and assessment images.</p>
          <div className="mt-4 space-y-3">
            {[
              { name: "Nasya_Phase2_Prescription.pdf", date: "2026-06-05" },
              { name: "Diet_Chart_Phase1.pdf", date: "2026-05-20" },
              { name: "Initial_Assessment.jpg", date: "2026-05-15" },
            ].map((doc) => (
              <div key={doc.name} className="flex items-center justify-between rounded-xl border border-outlinevariant p-3 text-sm">
                <div>
                  <p className="font-medium text-onsurface">{doc.name}</p>
                  <p className="text-xs text-muted">{doc.date}</p>
                </div>
                <button className="text-primary hover:underline">View</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
