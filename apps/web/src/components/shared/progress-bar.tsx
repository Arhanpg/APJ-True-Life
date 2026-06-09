export function ProgressBar({ value, label }: { value: number; label?: string }) {
  return (
    <div className="space-y-1.5">
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#E1F2E8]">
        <div
          className="h-2 rounded-full bg-[#2E7D52] transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="font-mono text-xs text-[#404941]">
        {label ?? `${value}% complete`}
      </p>
    </div>
  );
}
