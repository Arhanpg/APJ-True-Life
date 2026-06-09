import { phases } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";
import { ProgressBar } from "@/components/shared/progress-bar";

export function PhaseTimeline() {
  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <div
          key={phase.id}
          className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-soft"
        >
          {/* Phase header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted">
                Phase {index + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-primary-dark">{phase.title}</h3>
              <p className="mt-1 text-sm text-muted">{phase.goal}</p>
            </div>
            <StatusBadge label={phase.status} />
          </div>

          {phase.status === "Current" && (
            <div className="mt-4">
              <ProgressBar value={55} />
            </div>
          )}

          {/* Phase details grid */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {/* Procedures */}
            <div>
              <p className="mb-2 text-sm font-semibold text-primary-dark">Procedures</p>
              <ul className="space-y-2">
                {phase.procedures.map((p) => (
                  <li key={p} className="flex gap-2 text-sm text-muted">
                    <span className="mt-0.5 text-primary">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Medicines */}
            <div>
              <p className="mb-2 text-sm font-semibold text-primary-dark">Medicines</p>
              <ul className="space-y-2">
                {phase.medicines.map((m) => (
                  <li key={m.name} className="rounded-xl bg-surface-low px-3 py-2 text-sm text-muted">
                    <span className="font-medium text-onsurface">{m.name}</span>
                    {" — "}{m.dosage}, {m.frequency}, {m.timing}
                  </li>
                ))}
              </ul>
            </div>

            {/* Diet Consume */}
            <div>
              <p className="mb-2 text-sm font-semibold text-success">✓ To Consume</p>
              <ul className="space-y-1">
                {phase.dietConsume.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-muted">
                    <span className="text-success">✓</span>{d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Diet Avoid */}
            <div>
              <p className="mb-2 text-sm font-semibold text-error">✗ To Avoid</p>
              <ul className="space-y-1">
                {phase.dietAvoid.map((d) => (
                  <li key={d} className="flex gap-2 text-sm text-muted">
                    <span className="text-error">✗</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          {phase.status !== "Completed" && (
            <div className="mt-5 flex flex-wrap gap-3 border-t border-outlinevariant pt-4">
              <button className="rounded-xl border border-outlinevariant px-4 py-2 text-sm hover:bg-surface-low">Edit Phase</button>
              {phase.status === "Current" && (
                <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark">
                  Mark Phase Complete
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
