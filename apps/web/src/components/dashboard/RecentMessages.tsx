const MSGS = [
  { patient: 'Ramesh Kumar', msg: 'Thank you doctor, feeling better now.', time: '10:32 AM', unread: 2 },
  { patient: 'Priya Sharma', msg: 'When should I take the medicine?', time: '09:15 AM', unread: 1 },
  { patient: 'Anjali Mehta', msg: 'Appointment confirmed.', time: 'Yesterday', unread: 0 },
];

export function RecentMessages() {
  return (
    <div className="rounded-xl border h-full" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: '#E8F5E9' }}>
        <h2 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Recent Messages</h2>
      </div>
      <div className="divide-y" style={{ borderColor: '#E8F5E9' }}>
        {MSGS.map((m, i) => (
          <div key={i} className="px-5 py-4 cursor-pointer hover:bg-[#EAF4EC] transition-all">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0" style={{ background: 'var(--secondary)' }}>
                  {m.patient[0]}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{m.patient}</p>
                  <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--text-muted)' }}>{m.msg}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs" style={{ color: 'var(--outline)' }}>{m.time}</span>
                {m.unread > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ background: 'var(--primary)' }}>{m.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 border-t" style={{ borderColor: '#E8F5E9' }}>
        <a href="/chat" className="text-xs font-medium" style={{ color: 'var(--primary)' }}>View all messages →</a>
      </div>
    </div>
  );
}
