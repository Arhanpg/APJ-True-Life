import { patients } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { ProgressBar } from "@/components/shared/progress-bar";
import Link from "next/link";

export default function TreatmentsPage() {
  const activePlans = patients.filter((p) => p.status === "In Treatment");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#004324]">Treatment Plans</h1>
          <p className="mt-1 text-sm text-[#404941]">All active and completed treatment plans across patients.</p>
        </div>
        <Link href="/treatments/new" className="rounded-xl bg-[#1A5C38] px-5 py-2.5 text-sm font-medium text-white">
          + Create Treatment Plan
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {activePlans.map((patient) => (
          <div key={patient.id} className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#004324]">{patient.activeTreatment}</p>
                <p className="mt-1 text-sm text-[#404941]">{patient.name} · {patient.prakriti}</p>
              </div>
              <StatusBadge label={patient.status} />
            </div>
            <div className="mt-4">
              <ProgressBar value={62} />
            </div>
            <div className="mt-4 flex gap-3">
              <Link
                href={`/treatments/${patient.id}`}
                className="rounded-xl bg-[#1A5C38] px-4 py-2 text-sm font-medium text-white"
              >
                Manage
              </Link>
              <Link href="/chat" className="rounded-xl border border-[#C0C9BF] px-4 py-2 text-sm">
                Chat
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
