import type { KpiData } from "@/types";
import { cn } from "@/lib/utils";

const toneClasses: Record<KpiData["tone"], string> = {
  success: "bg-emerald-50 text-success",
  primary: "bg-teal-50 text-primary",
  gold: "bg-amber-50 text-warning",
  warning: "bg-orange-50 text-warning",
};

export function KpiCard({ item }: { item: KpiData }) {
  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted">{item.title}</p>
          <h2 className="mt-3 text-4xl font-bold text-primary-dark">{item.value}</h2>
        </div>
        <span
          className={cn(
            "mt-1 rounded-full px-3 py-1 text-xs font-medium",
            toneClasses[item.tone]
          )}
        >
          {item.trend}
        </span>
      </div>
    </div>
  );
}
