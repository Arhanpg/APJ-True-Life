interface KPICardProps {
  title: string;
  value: string;
  trend: string;
  icon: string;
  color: string;
}

export function KPICard({ title, value, trend, icon, color }: KPICardProps) {
  return (
    <div className="rounded-xl border p-5" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{title}</p>
          <p className="text-3xl font-bold mt-1 font-display" style={{ color }}>{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-xs" style={{ color: 'var(--outline)' }}>{trend}</p>
    </div>
  );
}
