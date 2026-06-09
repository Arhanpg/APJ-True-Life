import { PhaseTimeline } from "@/components/treatments/phase-timeline";
import { ProgressBar } from "@/components/shared/progress-bar";

export default function TreatmentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-muted">Patients / Rahul Nair / Treatments</p>
            <h1 className="mt-2 text-2xl font-semibold text-primary-dark">
              Nasal Polyp — Nasya Course
            </h1>
            <p className="mt-1 text-sm text-muted">
              Active &middot; Phase 2 of 3 &middot; Started 20 May 2026
            </p>
            <div className="mt-4 max-w-xs">
              <ProgressBar value={62} />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-outlinevariant px-4 py-3 text-sm transition hover:bg-surface-low">
              Add New Phase
            </button>
            <button className="rounded-xl bg-error px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
              Complete Treatment
            </button>
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-primary-dark">Phase Timeline</h2>
        <PhaseTimeline />
      </div>
    </div>
  );
}
