import { todaySchedule } from "@/lib/mock-data";
import { StatusBadge } from "@/components/shared/status-badge";

export function TodaySchedule() {
  return (
    <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-[#004324]">Today's Schedule</h3>
        <p className="mt-1 text-sm text-[#404941]">All appointments and clinical sessions for today.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-[#E1F2E8] text-[#404941]">
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Purpose</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E1F2E8]">
            {todaySchedule.map((slot) => (
              <tr key={`${slot.time}-${slot.patient}`}>
                <td className="py-3.5 font-mono text-xs text-[#404941]">{slot.time}</td>
                <td className="py-3.5 font-medium text-[#111E18]">{slot.patient}</td>
                <td className="py-3.5 text-[#404941]">{slot.purpose}</td>
                <td className="py-3.5">
                  <StatusBadge label={slot.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
