'use client';
import { useState } from 'react';

const MOCK_APPOINTMENTS = [
  { id: '1', patient: 'Ramesh Kumar', time: '09:00', end: '09:45', type: 'General', status: 'CONFIRMED', date: '2026-06-10' },
  { id: '2', patient: 'Priya Sharma', time: '10:00', end: '11:00', type: 'Panchakarma', status: 'PENDING', date: '2026-06-10' },
  { id: '3', patient: 'Anjali Mehta', time: '11:30', end: '12:00', type: 'Follow-up', status: 'CONFIRMED', date: '2026-06-10' },
  { id: '4', patient: 'Mohan Das', time: '14:00', end: '14:45', type: 'General', status: 'CONFIRMED', date: '2026-06-10' },
  { id: '5', patient: 'Sunita Rao', time: '15:30', end: '16:30', type: 'Panchakarma', status: 'CANCELLED', date: '2026-06-10' },
];

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: 'chip-active', PENDING: 'chip-pending', CANCELLED: 'chip-cancelled', COMPLETED: 'chip-completed',
};

export default function AppointmentsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState('ALL');

  const filtered = MOCK_APPOINTMENTS.filter(a => filter === 'ALL' || a.status === filter);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>Appointments</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your clinic schedule</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: '#C0C9BF' }}>
            {(['list','calendar'] as const).map(v => (
              <button key={v} onClick={() => setView(v)}
                className="px-4 py-2 text-sm font-medium transition-all"
                style={view === v ? { background: 'var(--primary)', color: 'white' } : { background: 'white', color: 'var(--text-muted)' }}>
                {v === 'list' ? '☰ List' : '📅 Calendar'}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: 'var(--primary)' }}>
            + New Appointment
          </button>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex gap-2">
        {['ALL','CONFIRMED','PENDING','CANCELLED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
            style={filter === f ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' } : { borderColor: '#C0C9BF', color: 'var(--text-muted)', background: 'white' }}>
            {f}
          </button>
        ))}
      </div>

      {view === 'list' ? (
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--surface-tint)' }}>
                {['Time','Patient','Type','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => (
                <tr key={a.id} className="border-t" style={{ borderColor: '#E8F5E9' }}>
                  <td className="px-4 py-3 text-sm font-medium">{a.time} – {a.end}</td>
                  <td className="px-4 py-3 text-sm">{a.patient}</td>
                  <td className="px-4 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{a.type}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {a.status === 'PENDING' && (
                        <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: '#EAF4EC', color: 'var(--primary)' }}>Confirm</button>
                      )}
                      <button className="text-xs px-2 py-1 rounded font-medium" style={{ background: '#FFEBEE', color: 'var(--error)' }}>Cancel</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-xl border p-6 text-center" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Calendar view — connect FullCalendar in Phase 5</p>
          <div className="mt-4 grid grid-cols-7 gap-1">
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <div key={d} className="text-xs font-medium py-2 text-center" style={{ color: 'var(--text-muted)' }}>{d}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
