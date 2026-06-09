export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-tint">
        <div
          className="h-2 rounded-full bg-secondary transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="font-mono text-xs text-muted">{value}% complete</p>
    </div>
  );
}
