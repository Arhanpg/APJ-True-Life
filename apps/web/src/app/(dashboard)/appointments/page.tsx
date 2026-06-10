'use client';
import { useState } from 'react';

const HOURS = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AppointmentsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showNew, setShowNew] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Appointments</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 8, display: 'flex', overflow: 'hidden' }}>
            {(['calendar', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: view === v ? '#1A5C38' : 'transparent', color: view === v ? '#fff' : '#707971', textTransform: 'capitalize' }}>{v === 'calendar' ? '📅 Calendar' : '📋 List'}</button>
            ))}
          </div>
          <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      </div>

      {/* Status Filter */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, border: filterStatus === s ? 'none' : '1.5px solid #C0C9BF', cursor: 'pointer', background: filterStatus === s ? '#1A5C38' : 'transparent', color: filterStatus === s ? '#fff' : '#707971' }}>{s}</button>
        ))}
      </div>

      {view === 'calendar' ? (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          {/* Week header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid #E1F2E8' }}>
            <div style={{ padding: '10px 0', fontSize: 11, color: '#707971' }} />
            {DAYS.map(d => (
              <div key={d} style={{ padding: '10px 8px', textAlign: 'center', fontSize: 12, fontWeight: 600, color: '#404941', borderLeft: '1px solid #E1F2E8' }}>{d}</div>
            ))}
          </div>
          {/* Time grid */}
          <div style={{ overflow: 'auto', maxHeight: 500 }}>
            {HOURS.map(h => (
              <div key={h} style={{ display: 'grid', gridTemplateColumns: '60px repeat(7, 1fr)', borderBottom: '1px solid #F0F7F2' }}>
                <div style={{ padding: '10px 8px', fontSize: 11, color: '#707971', textAlign: 'right', flexShrink: 0 }}>{h}</div>
                {DAYS.map(d => (
                  <div key={d} style={{ minHeight: 48, borderLeft: '1px solid #F0F7F2' }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📅</div>
          <p style={{ fontWeight: 600, color: '#404941' }}>No appointments</p>
          <button onClick={() => setShowNew(true)} style={{ marginTop: 16, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 500, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111E18' }}>New Appointment</h2>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#707971' }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[['Patient', 'text', 'Search patient...'], ['Date', 'date', ''], ['Type', 'select', '']].map(([label, type]) => (
                <div key={label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 4 }}>{label} *</label>
                  {type === 'select' ? (
                    <select style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14 }}>
                      <option>In-Clinic</option>
                      <option>Online</option>
                    </select>
                  ) : (
                    <input type={type} placeholder={label} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14 }} />
                  )}
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 4 }}>Consultation Type</label>
                <select style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14 }}>
                  <option>General Consultation</option>
                  <option>Panchakarma</option>
                  <option>Follow-up</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setShowNew(false)} style={{ flex: 1, border: '1.5px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button style={{ flex: 2, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Create Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
