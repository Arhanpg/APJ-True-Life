const TREATMENTS = [
  { patient: 'Ramesh Kumar', plan: 'Nasya Course', phase: 2, total: 4, therapies: ['Nasya', 'Purvakarma'] },
  { patient: 'Priya Sharma', plan: 'Panchakarma Detox', phase: 1, total: 3, therapies: ['Abhyanga', 'Swedana'] },
  { patient: 'Vikram Singh', plan: 'Stress Relief Program', phase: 2, total: 2, therapies: ['Shirodhara'] },
];

export function ActiveTreatments() {
  return (
    <div className="rounded-xl border" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: '#E8F5E9' }}>
        <h2 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Active Treatment Plans</h2>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        {TREATMENTS.map((t, i) => (
          <div key={i} className="rounded-lg p-4 border" style={{ background: 'var(--surface-tint)', borderColor: '#D4E8D8' }}>
            <p className="text-sm font-semibold mb-0.5" style={{ color: 'var(--primary-dark)' }}>{t.patient}</p>
            <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>{t.plan}</p>
            <div className="flex items-center justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
              <span>Week {t.phase}/{t.total}</span>
              <span>{Math.round((t.phase/t.total)*100)}%</span>
            </div>
            <div className="h-1.5 rounded-full mb-3" style={{ background: '#C8E6C9' }}>
              <div className="h-1.5 rounded-full" style={{ width: `${(t.phase/t.total)*100}%`, background: 'var(--secondary)' }} />
            </div>
            <div className="flex flex-wrap gap-1">
              {t.therapies.map(th => (
                <span key={th} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'white', color: 'var(--primary)', border: '1px solid #C8E6C9' }}>{th}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
