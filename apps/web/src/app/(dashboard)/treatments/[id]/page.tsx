import { PhaseTimeline } from "@/components/treatments/phase-timeline";
import { ProgressBar } from "@/components/shared/progress-bar";
import Link from "next/link";

export default function TreatmentDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      {/* Main */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <div className="mb-3 flex items-center gap-3 text-sm">
            <Link href="/treatments" className="text-[#1A5C38] hover:underline">Treatments</Link>
            <span className="text-[#C0C9BF]">/</span>
            <span className="text-[#404941]">Nasal Polyp - Nasya Course</span>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#004324]">Nasal Polyp — Nasya Course</h1>
              <p className="mt-1 text-sm text-[#404941]">Patient: Rahul Nair · Active · Phase 2 of 3</p>
            </div>
            <div className="flex gap-3">
              <button className="rounded-xl border border-[#C0C9BF] px-4 py-2.5 text-sm">+ Add New Phase</button>
              <button className="rounded-xl bg-[#BA1A1A] px-4 py-2.5 text-sm font-medium text-white">Complete Treatment</button>
            </div>
          </div>
          <div className="mt-5">
            <ProgressBar value={62} label="Phase 2 of 3 — 62% complete" />
          </div>
        </div>
        <PhaseTimeline />
      </div>

      {/* Sidebar */}
      <div className="space-y-5">
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Patient Snapshot</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-xl bg-[#F5FBF7] p-4">
              <p className="font-medium text-[#111E18]">Rahul Nair</p>
              <p className="text-[#404941]">Vata-Pitta · 34 years · ATL-1001</p>
            </div>
            <div className="rounded-xl bg-[#F5FBF7] p-4">
              <p className="text-xs text-[#707971]">Next Appointment</p>
              <p className="mt-1 font-medium text-[#111E18]">12 June 2026, 10:30 AM</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-[#004324]">Quick Actions</h2>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/chat" className="rounded-xl bg-[#1A5C38] px-4 py-2.5 text-center text-sm font-medium text-white">
              Open Treatment Chat
            </Link>
            <Link href={`/patients/${params.id}`} className="rounded-xl border border-[#C0C9BF] px-4 py-2.5 text-center text-sm">
              View Patient Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
