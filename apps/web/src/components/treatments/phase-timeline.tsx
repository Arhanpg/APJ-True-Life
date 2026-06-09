import { phases } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

export function PhaseTimeline() {
  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <details
          key={phase.id}
          open={phase.status === "Current"}
          className="group rounded-2xl border border-outlinevariant bg-white shadow-soft"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted">Phase {index + 1}</p>
              <h3 className="mt-1 text-lg font-semibold text-primary-dark">{phase.title}</h3>
              <p className="mt-1 text-sm text-muted">{phase.goal}</p>
            </div>
            <StatusBadge label={phase.status} />
          </summary>

          <div className="border-t border-outlinevariant px-5 pb-5 pt-4">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Procedures */}
              <div>
                <p className="mb-3 text-sm font-semibold text-primary-dark">Procedures</p>
                <ul className="space-y-2 text-sm text-muted">
                  {phase.procedures.map((proc) => (
                    <li key={proc} className="flex items-start gap-2">
                      <span className="mt-0.5 text-primary">•</span> {proc}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medicines */}
              <div>
                <p className="mb-3 text-sm font-semibold text-primary-dark">Prescribed Medicines</p>
                <div className="space-y-3">
                  {phase.medicines.map((med) => (
                    <div key={med.name} className="rounded-xl bg-surface-low p-3 text-sm">
                      <p className="font-medium text-onsurface">{med.name}</p>
                      <p className="text-muted">
                        {med.dosage} &middot; {med.frequency} &middot; {med.timing}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diet - Consume */}
              <div>
                <p className="mb-3 text-sm font-semibold text-primary-dark">✓ To Consume</p>
                <ul className="space-y-2 text-sm text-muted">
                  {phase.dietConsume.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-success">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Diet - Avoid */}
              <div>
                <p className="mb-3 text-sm font-semibold text-primary-dark">✗ To Avoid</p>
                <ul className="space-y-2 text-sm text-muted">
                  {phase.dietAvoid.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-error">✗</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
