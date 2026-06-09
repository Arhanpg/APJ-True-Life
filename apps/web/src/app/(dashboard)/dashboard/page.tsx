import { KpiCard } from "@/components/dashboard/kpi-card";
import { TodaySchedule } from "@/components/dashboard/today-schedule";
import { ProgressBar } from "@/components/shared/progress-bar";
import { conversations, kpis } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPIs */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-primary-dark">Overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((item) => (
            <KpiCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Schedule + sidebar */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <TodaySchedule />

        <div className="space-y-5">
          {/* Recent messages */}
          <div className="rounded-2xl border border-outlinevariant bg-white p-5 shadow-card">
            <h3 className="mb-4 text-base font-semibold text-primary-dark">Recent Messages</h3>
            <div className="space-y-3">
              {conversations.map((item) => (
                <div key={item.id} className="rounded-xl bg-surface-low p-3">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-onsurface">{item.patientName}</p>
                    {item.unread > 0 && (
                      <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-white">
                        {item.unread}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted">{item.preview}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active treatment snapshot */}
          <div className="rounded-2xl border border-outlinevariant bg-white p-5 shadow-card">
            <h3 className="mb-3 text-base font-semibold text-primary-dark">Active Treatment</h3>
            <p className="text-sm text-muted">Rahul Nair &middot; Nasya Course &middot; Week 2 of 3</p>
            <div className="mt-4">
              <ProgressBar value={62} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
