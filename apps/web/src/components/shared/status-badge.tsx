import { cn } from "@/lib/utils";

const styles: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-success",
  Pending: "bg-amber-100 text-warning",
  Cancelled: "bg-red-100 text-error",
  "In Progress": "bg-blue-100 text-blue-700",
  Active: "bg-emerald-100 text-success",
  "In Treatment": "bg-teal-100 text-teal-700",
  Completed: "bg-slate-100 text-slate-500",
  Current: "bg-emerald-100 text-success",
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
