'use client';
import { useState } from 'react';
import Link from 'next/link';

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  CONFIRMED: { bg: '#EAF4EC', color: '#1A5C38' },
  PENDING: { bg: '#FFF8E1', color: '#8A6200' },
  CANCELLED: { bg: '#FFEBEE', color: '#BA1A1A' },
  COMPLETED: { bg: '#E8E8E8', color: '#404941' },
};

export default function AppointmentsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [showModal, setShowModal] = useState(false);
  const HOURS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'];
  const today = new Date();
  const weekDays = Array.from({ length: 7 }, (_, i) => { const d = new Date(today); d.setDate(today.getDate() - today.getDay() + i); return d; });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Appointments</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage your clinic schedule</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ display: 'flex', border: '1.5px solid #C0C9BF', borderRadius: 8, overflow: 'hidden' }}>
            {['calendar', 'list'].map(v => (
              <button key={v} onClick={() => setView(v as any)} style={{ padding: '8px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: view === v ? '#1A5C38' : '#fff', color: view === v ? '#fff' : '#707971', textTransform: 'capitalize' }}>{v}</button>
            ))}
          </div>
          <button onClick={() => setShowModal(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          {/* Week header */}
          <div style={{ display: 'grid', gridTemplateColumns: '60px repeat(7,1fr)', borderBottom: '1px solid #E1F2E8' }}>
            <div style={{ padding: 12, background: '#EDFDF3' }} />
            {weekDays.map(d => (
              <div key={d.toISOString()} style={{ padding: '10px 12px', background: '#EDFDF3', borderLeft: '1px solid #E1F2E8', textAlign: 'center' }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase' }}>{d.toLocaleDateString('en', { weekday: 'short' })}</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: d.toDateString() === today.toDateString() ? '#1A5C38' : '#111E18', marginTop: 2 }}>{d.getDate()}</p>
              </div>
            ))}
          </div>
          {/* Time grid */}
          <div style={{ overflow: 'auto', maxHeight: 480 }}>
            {HOURS.map(hour => (
              <div key={hour} style={{ display: 'grid', gridTemplateColumns: '60px repeat(7,1fr)', borderBottom: '1px solid #F0F7F2', minHeight: 56 }}>
                <div style={{ padding: '8px 10px', fontSize: 11, color: '#707971', fontWeight: 500 }}>{hour}</div>
                {weekDays.map((d, i) => (
                  <div key={i} style={{ borderLeft: '1px solid #F0F7F2', padding: 4, cursor: 'pointer' }} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EDFDF3' }}>
                {['Date & Time', 'Patient', 'Type', 'Purpose', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '60px 20px', color: '#707971' }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📅</div>
                  <p style={{ fontWeight: 500, color: '#404941', marginBottom: 6 }}>No appointments scheduled</p>
                  <button onClick={() => setShowModal(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>+ New Appointment</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* New Appointment Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 520, maxWidth: '90vw' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111E18' }}>New Appointment</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#707971' }}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[{ label: 'Patient', placeholder: 'Search patient name…', type: 'text' }, { label: 'Date *', placeholder: '', type: 'date' }, { label: 'Purpose / Reason', placeholder: 'Consultation reason…', type: 'text' }].map(f => (
                <div key={f.label}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Type</label>
                  <select style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', background: '#fff' }}>
                    <option>IN_CLINIC</option><option>ONLINE</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Start Time</label>
                  <input type="time" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '11px', background: '#fff', border: '1.5px solid #1A5C38', borderRadius: 10, color: '#1A5C38', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                <button style={{ flex: 2, padding: '11px', background: '#1A5C38', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Create Appointment</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
