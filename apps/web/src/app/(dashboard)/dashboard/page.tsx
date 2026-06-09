import { KpiCard } from "@/components/dashboard/kpi-card";
import { TodaySchedule } from "@/components/dashboard/today-schedule";
import { ProgressBar } from "@/components/shared/progress-bar";
import { conversations, kpis } from "@/lib/mock-data";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item) => (
          <KpiCard key={item.title} item={item} />
        ))}
      </section>

      {/* Schedule + Sidebar */}
      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <TodaySchedule />

        <div className="space-y-6">
          {/* Recent Messages */}
          <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-[#004324]">Recent Messages</h3>
              <Link href="/chat" className="text-sm text-[#1A5C38] hover:underline">View all</Link>
            </div>
            <div className="space-y-3">
              {conversations.map((item) => (
                <div key={item.id} className="rounded-xl bg-[#F5FBF7] p-4">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-[#111E18]">{item.patientName}</p>
                    {item.unread > 0 && (
                      <span className="rounded-full bg-[#1A5C38] px-2 py-0.5 text-xs font-bold text-white">{item.unread}</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-[#404941]">{item.preview}</p>
                  <p className="mt-1 text-xs text-[#707971]">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Active Treatment */}
          <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-[#004324]">Active Treatment Snapshot</h3>
            <p className="mt-1 text-sm text-[#707971]">Rahul Nair · Week 2 of 3</p>
            <div className="mt-4">
              <ProgressBar value={62} />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-[#F5FBF7] p-3">
                <p className="text-xs text-[#707971]">Current Phase</p>
                <p className="mt-1 font-medium text-[#111E18]">Nasya Therapy</p>
              </div>
              <div className="rounded-xl bg-[#F5FBF7] p-3">
                <p className="text-xs text-[#707971]">Next Appointment</p>
                <p className="mt-1 font-medium text-[#111E18]">12 Jun 2026</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Link href="/treatments/ATL-1001" className="rounded-xl bg-[#1A5C38] px-4 py-2 text-sm font-medium text-white">
                View Treatment
              </Link>
              <Link href="/chat" className="rounded-xl border border-[#C0C9BF] px-4 py-2 text-sm">
                Open Chat
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
