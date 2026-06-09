import { patients } from "@/lib/mock-data";
import Link from "next/link";

export default function ArchivePage() {
  const completed = patients.filter((p) => p.status === "Completed");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark">Completed Treatments Archive</h1>
        <p className="mt-1 text-sm text-muted">
          Read-only archive of all completed care journeys. Chat messages were deleted upon completion.
        </p>
      </div>

      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <div className="space-y-4">
          {completed.length === 0 && (
            <p className="text-center text-sm text-muted">No completed treatments yet.</p>
          )}
          {completed.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-xl border border-outlinevariant p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-medium text-onsurface">{p.name}</p>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    Completed
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{p.activeTreatment}</p>
                <p className="mt-1 text-xs text-muted">Last visit: {p.lastVisit}</p>
              </div>
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-32 overflow-hidden rounded-full bg-surface-tint">
                    <div className="h-2 w-full rounded-full bg-secondary" />
                  </div>
                  <span className="font-mono text-xs text-muted">100%</span>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/treatments/archived-${p.id}`}
                    className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs transition hover:bg-surface-low"
                  >
                    View Full Treatment
                  </Link>
                </div>
                <p className="text-xs text-amber-600">
                  ⚠ Chat deleted upon completion
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
