import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-800",
  Pending: "bg-amber-100 text-amber-800",
  Cancelled: "bg-red-100 text-red-700",
  Active: "bg-emerald-100 text-emerald-800",
  "In Treatment": "bg-blue-100 text-blue-800",
  Completed: "bg-slate-100 text-slate-600",
  Current: "bg-emerald-100 text-emerald-800",
  Upcoming: "bg-slate-100 text-slate-500",
};

export function StatusBadge({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        styles[label] ?? "bg-surface-tint text-muted"
      )}
    >
      {label}
    </span>
  );
}
