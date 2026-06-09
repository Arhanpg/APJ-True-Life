import { todaySchedule } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

export function TodaySchedule() {
  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-primary-dark">Today’s Schedule</h2>
          <p className="text-sm text-muted">All appointments and clinical reviews for today.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-outlinevariant">
              {["Time", "Patient", "Purpose", "Status"].map((h) => (
                <th key={h} className="pb-3 text-xs font-medium uppercase tracking-wider text-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todaySchedule.map((slot, i) => (
              <tr key={i} className="border-b border-outlinevariant/50 last:border-0">
                <td className="py-4 font-mono text-xs">{slot.time}</td>
                <td className="py-4 font-medium text-onsurface">{slot.patient}</td>
                <td className="py-4 text-muted">{slot.purpose}</td>
                <td className="py-4"><StatusBadge label={slot.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
