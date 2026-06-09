import { patients } from "@/lib/mock-data";
import { ProgressBar } from "@/components/shared/progress-bar";
import { EmptyState } from "@/components/shared/empty-state";
import { ArchiveIcon } from "lucide-react";

export default function ArchivePage() {
  const completed = patients.filter((p) => p.status === "Completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#004324]">Completed Treatments Archive</h1>
        <p className="mt-1 text-sm text-[#404941]">
          Read-only archive of all completed patient care journeys. Chat was deleted upon completion.
        </p>
      </div>

      <div className="rounded-2xl border border-[#C0C9BF] bg-amber-50 p-4 text-sm text-amber-800">
        ⚠️ All treatment plan details, prescription images, and assessment records are preserved. Doctor-patient chat messages were permanently deleted on treatment completion.
      </div>

      {completed.length === 0 ? (
        <EmptyState
          icon={<ArchiveIcon className="h-12 w-12" />}
          title="No completed treatments yet"
          description="Treatments that are marked complete will appear here."
        />
      ) : (
        <div className="space-y-4">
          {completed.map((patient) => (
            <div key={patient.id} className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-semibold text-[#004324]">{patient.activeTreatment}</p>
                  <p className="mt-1 text-sm text-[#404941]">{patient.name} · {patient.id} · Last visit: {patient.lastVisit}</p>
                </div>
                <button className="rounded-xl border border-[#C0C9BF] px-4 py-2 text-sm">View Full Treatment</button>
              </div>
              <div className="mt-4">
                <ProgressBar value={100} label="Treatment complete — 100%" />
              </div>
              <p className="mt-3 text-xs text-[#707971]">💬 Chat was deleted upon treatment completion.</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
