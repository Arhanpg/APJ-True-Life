const SCHEDULE = [
  { time: '09:00', patient: 'Ramesh Kumar', purpose: 'Nasya Treatment', status: 'CONFIRMED' },
  { time: '10:00', patient: 'Priya Sharma', purpose: 'Panchakarma Consultation', status: 'PENDING' },
  { time: '11:30', patient: 'Anjali Mehta', purpose: 'Follow-up Review', status: 'CONFIRMED' },
  { time: '14:00', patient: 'Mohan Das', purpose: 'General Consultation', status: 'CONFIRMED' },
  { time: '15:30', patient: 'Sunita Rao', purpose: 'Shirodhara Session', status: 'CONFIRMED' },
];

const STATUS_STYLE: Record<string, string> = {
  CONFIRMED: 'chip-active', PENDING: 'chip-pending',
};

export function TodaySchedule() {
  return (
    <div className="rounded-xl border" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: '#E8F5E9' }}>
        <h2 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Today’s Schedule</h2>
        <span className="text-xs px-2 py-1 rounded-full" style={{ background: 'var(--surface-tint)', color: 'var(--primary)' }}>{SCHEDULE.length} appointments</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--surface-tint)' }}>
              {['Time','Patient','Purpose','Status'].map(h => (
                <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((s, i) => (
              <tr key={i} className="border-t" style={{ borderColor: '#E8F5E9' }}>
                <td className="px-4 py-3 text-sm font-medium" style={{ color: 'var(--primary)' }}>{s.time}</td>
                <td className="px-4 py-3 text-sm">{s.patient}</td>
                <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{s.purpose}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_STYLE[s.status]}`}>{s.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
