'use client';
import { useState } from 'react';

const APPOINTMENTS = [
  { id: '1', patientName: 'Ravi Kumar', type: 'IN_CLINIC', date: '2026-06-10', time: '10:00', duration: 60, status: 'CONFIRMED', purpose: 'Follow-up consultation' },
  { id: '2', patientName: 'Priya Sharma', type: 'ONLINE', date: '2026-06-10', time: '11:30', duration: 45, status: 'PENDING', purpose: 'Initial consultation' },
  { id: '3', patientName: 'Mohan Das', type: 'IN_CLINIC', date: '2026-06-11', time: '09:00', duration: 90, status: 'CONFIRMED', purpose: 'Panchakarma session' },
  { id: '4', patientName: 'Anita Rao', type: 'IN_CLINIC', date: '2026-06-12', time: '14:00', duration: 60, status: 'CANCELLED', purpose: 'Nasya treatment' },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  CONFIRMED:   { bg: '#EAF4EC', color: '#1A5C38' },
  PENDING:     { bg: '#FFF8E1', color: '#B7791F' },
  CANCELLED:   { bg: '#FEF2F2', color: '#BA1A1A' },
  IN_PROGRESS: { bg: '#EFF6FF', color: '#1D4ED8' },
  COMPLETED:   { bg: '#f3f4f6', color: '#6b7280' },
};

export default function AppointmentsPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [filter, setFilter] = useState('All');
  const [showNew, setShowNew] = useState(false);

  const filtered = APPOINTMENTS.filter(a => filter === 'All' || a.status === filter.toUpperCase());
  const HOURS = Array.from({ length: 12 }, (_, i) => i + 8);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#004324', fontFamily: 'Playfair Display, serif' }}>Appointments</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage and schedule patient appointments</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ display: 'flex', background: '#EDFDF3', borderRadius: 8, padding: 3, gap: 2 }}>
            <button onClick={() => setView('list')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: view === 'list' ? '#fff' : 'transparent', color: view === 'list' ? '#1A5C38' : '#707971' }}>☰ List</button>
            <button onClick={() => setView('calendar')} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: view === 'calendar' ? '#fff' : 'transparent', color: view === 'calendar' ? '#1A5C38' : '#707971' }}>📅 Calendar</button>
          </div>
          <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f === 'All' ? 'All' : f.toUpperCase())} style={{ padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: (filter === f || filter === f.toUpperCase()) ? '#1A5C38' : '#EDFDF3', color: (filter === f || filter === f.toUpperCase()) ? '#fff' : '#404941' }}>{f}</button>
        ))}
      </div>

      {view === 'list' && (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EDFDF3' }}>
                {['Patient', 'Date & Time', 'Type', 'Purpose', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#404941', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, i) => {
                const s = STATUS_STYLES[a.status] || STATUS_STYLES.PENDING;
                return (
                  <tr key={a.id} style={{ borderBottom: '1px solid #E1F2E8', background: i % 2 === 0 ? '#fff' : '#FAFDFB' }}>
                    <td style={{ padding: '13px 16px', fontSize: 14, fontWeight: 600, color: '#111E18' }}>{a.patientName}</td>
                    <td style={{ padding: '13px 16px' }}>
                      <p style={{ fontSize: 13, color: '#111E18' }}>{a.date}</p>
                      <p style={{ fontSize: 11, color: '#707971' }}>{a.time} · {a.duration}min</p>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 12, color: '#404941' }}>{a.type === 'ONLINE' ? '🌐 Online' : '🏥 In-Clinic'}</td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: '#404941' }}>{a.purpose}</td>
                    <td style={{ padding: '13px 16px' }}><span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{a.status}</span></td>
                    <td style={{ padding: '13px 16px' }}>
                      {a.status === 'PENDING' && <button style={{ background: '#EAF4EC', color: '#1A5C38', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', marginRight: 6 }}>Confirm</button>}
                      {a.status !== 'CANCELLED' && a.status !== 'COMPLETED' && <button style={{ background: '#FEF2F2', color: '#BA1A1A', border: 'none', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer' }}>Cancel</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {view === 'calendar' && (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#1A5C38' }}>←</button>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111E18' }}>Week of June 9–15, 2026</h3>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#1A5C38' }}>→</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', minWidth: 700 }}>
              {/* Day headers */}
              <div style={{ background: '#EDFDF3', borderBottom: '1px solid #E1F2E8' }} />
              {['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13', 'Sat 14', 'Sun 15'].map(d => (
                <div key={d} style={{ background: '#EDFDF3', borderBottom: '1px solid #E1F2E8', borderLeft: '1px solid #E1F2E8', padding: '10px 8px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#404941' }}>{d}</div>
              ))}
              {/* Time slots */}
              {HOURS.map(h => (
                [<div key={`time-${h}`} style={{ padding: '0 8px', height: 56, display: 'flex', alignItems: 'flex-start', paddingTop: 4, borderBottom: '1px solid #E1F2E8', fontSize: 11, color: '#707971' }}>{h}:00</div>,
                  ...Array(7).fill(null).map((_, di) => {
                    const appt = APPOINTMENTS.find(a => a.time === `${String(h).padStart(2,'0')}:00`);
                    return (
                      <div key={`slot-${h}-${di}`} style={{ height: 56, borderBottom: '1px solid #E1F2E8', borderLeft: '1px solid #E1F2E8', position: 'relative', padding: 3 }}>
                        {appt && di === 1 && (
                          <div style={{ position: 'absolute', inset: 3, background: '#EAF4EC', border: '1px solid #1A5C38', borderRadius: 6, padding: '2px 6px', overflow: 'hidden' }}>
                            <p style={{ fontSize: 10, fontWeight: 600, color: '#1A5C38', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{appt.patientName}</p>
                          </div>
                        )}
                      </div>
                    );
                  })]
              )).flat()}
            </div>
          </div>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, maxWidth: '90vw' }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111E18', marginBottom: 20 }}>New Appointment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[{ label: 'Patient', type: 'text', placeholder: 'Search patient name...' }, { label: 'Date', type: 'date', placeholder: '' }, { label: 'Start Time', type: 'time', placeholder: '' }, { label: 'Reason', type: 'text', placeholder: 'Purpose of appointment' }].map(f => (
                <div key={f.label}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Type</label>
                <select style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none' }}>
                  <option>In-Clinic</option>
                  <option>Online</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button style={{ flex: 1, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Book Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
