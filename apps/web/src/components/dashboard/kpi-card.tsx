import type { KpiCard } from "@/types";
import { cn } from "@/lib/utils";

const toneMap: Record<string, string> = {
  success: "bg-emerald-50 text-emerald-700",
  primary: "bg-[#E1F2E8] text-[#1A5C38]",
  gold: "bg-amber-50 text-amber-700",
  warning: "bg-orange-50 text-orange-700",
};

export function KpiCard({ item }: { item: KpiCard }) {
  return (
    <div className="rounded-2xl border border-[#C0C9BF] bg-white p-5 shadow-sm">
      <p className="text-sm text-[#404941]">{item.title}</p>
      <p className="mt-3 text-4xl font-bold text-[#004324]">{item.value}</p>
      <span
        className={cn(
          "mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium",
          toneMap[item.tone]
        )}
      >
        {item.trend}
      </span>
    </div>
  );
}
