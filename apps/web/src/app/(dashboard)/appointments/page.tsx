'use client';
import { useState } from 'react';

const HOURS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function AppointmentsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [showNew, setShowNew] = useState(false);
  const [filter, setFilter] = useState('All');

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Appointments</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          {/* View toggle */}
          <div style={{ display: 'flex', background: '#EDFDF3', borderRadius: 8, padding: 4, gap: 4 }}>
            {(['calendar', 'list'] as const).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '6px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: view === v ? '#1A5C38' : 'transparent', color: view === v ? '#fff' : '#404941', textTransform: 'capitalize' }}>{v}</button>
            ))}
          </div>
          <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 14px', borderRadius: 999, border: '1.5px solid', fontSize: 12, fontWeight: 600, cursor: 'pointer', background: filter === f ? '#1A5C38' : '#fff', color: filter === f ? '#fff' : '#404941', borderColor: filter === f ? '#1A5C38' : '#C0C9BF' }}>{f}</button>
        ))}
      </div>

      {view === 'calendar' ? (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          {/* Week header */}
          <div style={{ display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)', borderBottom: '1px solid #E1F2E8' }}>
            <div style={{ padding: '12px 0', background: '#EDFDF3' }} />
            {DAYS.map((d, i) => {
              const date = new Date(weekStart);
              date.setDate(weekStart.getDate() + i);
              const isToday = date.toDateString() === today.toDateString();
              return (
                <div key={d} style={{ padding: '12px 0', textAlign: 'center', background: '#EDFDF3', borderLeft: '1px solid #E1F2E8' }}>
                  <p style={{ fontSize: 11, color: '#707971', fontWeight: 600 }}>{d}</p>
                  <p style={{ fontSize: 16, fontWeight: 700, color: isToday ? '#1A5C38' : '#111E18', width: 28, height: 28, borderRadius: '50%', background: isToday ? '#EAF4EC' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px auto 0' }}>{date.getDate()}</p>
                </div>
              );
            })}
          </div>
          {/* Time grid */}
          <div style={{ maxHeight: 480, overflowY: 'auto' }}>
            {HOURS.map(h => (
              <div key={h} style={{ display: 'grid', gridTemplateColumns: '64px repeat(7, 1fr)', borderBottom: '1px solid #E1F2E8', minHeight: 56 }}>
                <div style={{ padding: '6px 8px', fontSize: 11, color: '#707971', fontFamily: 'monospace', borderRight: '1px solid #E1F2E8', display: 'flex', alignItems: 'flex-start' }}>{h}</div>
                {DAYS.map(d => (
                  <div key={d} style={{ borderLeft: '1px solid #E1F2E8', padding: 4 }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#404941', marginBottom: 8 }}>No appointments</h3>
          <p style={{ fontSize: 14, color: '#707971', marginBottom: 24 }}>Create your first appointment</p>
          <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      )}

      {/* New Appointment Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 480, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#004324', fontFamily: '"Playfair Display", serif' }}>New Appointment</h2>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[['Patient *', 'text', 'Search patient name...'], ['Date *', 'date', ''], ['Start Time *', 'time', ''], ['Reason', 'text', 'Optional reason']].map(([label, type, ph]) => (
                <div key={label as string}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{label as string}</label>
                  <input type={type as string} placeholder={ph as string} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Consultation Type *</label>
                <select style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }}>
                  <option>General Consultation</option>
                  <option>Panchakarma</option>
                  <option>Follow-up</option>
                  <option>Online Consultation</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button style={{ flex: 1, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Create Appointment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
