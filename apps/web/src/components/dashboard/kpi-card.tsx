import type { KpiCard } from "@/types";
import { cn } from "@/lib/utils";

const toneStyles = {
  success: "bg-emerald-50 text-emerald-700",
  primary: "bg-green-50 text-primary",
  gold: "bg-amber-50 text-amber-700",
  warning: "bg-orange-50 text-orange-700",
};

export function KpiCard({ item }: { item: KpiCard }) {
  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-5 shadow-soft">
      <p className="text-sm text-muted">{item.title}</p>
      <h3 className="mt-3 text-4xl font-bold text-primary-dark">{item.value}</h3>
      <span
        className={cn(
          "mt-3 inline-flex rounded-full px-3 py-1 text-xs font-medium",
          toneStyles[item.tone]
        )}
      >
        {item.trend}
      </span>
    </div>
  );
}
