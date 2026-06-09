import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-20 text-center", className)}>
      {icon && <div className="mb-4 text-[#C0C9BF]">{icon}</div>}
      <h3 className="text-lg font-semibold text-[#111E18]">{title}</h3>
      <p className="mt-2 max-w-xs text-sm text-[#404941]">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
