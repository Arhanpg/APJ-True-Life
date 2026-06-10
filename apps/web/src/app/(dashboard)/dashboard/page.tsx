'use client';
import Link from 'next/link';

const KPI = [
  { label: 'Active Patients', value: '—', trend: '', icon: '👤', color: '#EAF4EC', text: '#1A5C38' },
  { label: "Today's Appointments", value: '—', trend: '', icon: '📅', color: '#E8F4FF', text: '#006494' },
  { label: 'Unread Messages', value: '—', trend: '', icon: '💬', color: '#FFF8E1', text: '#C9A84C' },
  { label: 'Completed This Week', value: '—', trend: '', icon: '✅', color: '#F3F0EC', text: '#404941' },
];

const TODAY_SCHEDULE = [
  { time: '09:00 AM', patient: 'Patient A', purpose: 'General Consultation', status: 'Confirmed' },
  { time: '11:00 AM', patient: 'Patient B', purpose: 'Panchakarma Follow-up', status: 'Confirmed' },
  { time: '02:00 PM', patient: 'Patient C', purpose: 'Nasya Therapy', status: 'Pending' },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Good morning, Doctor 👋</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>{today}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment</Link>
        </div>
      </div>

      {/* Award Badge */}
      <div style={{ background: 'linear-gradient(135deg, #1A5C38 0%, #2E7D52 100%)', borderRadius: 12, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 40, height: 40, background: '#C9A84C', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>🏆</div>
        <div>
          <p style={{ color: '#C9A84C', fontWeight: 700, fontSize: 13 }}>AYUSH TV National Health Award 2024</p>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 }}>APJ TRUE LIFE Ayurvedic Medical Centre — Recognized for Clinical Excellence</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {KPI.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</span>
              <div style={{ width: 32, height: 32, background: k.color, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{k.icon}</div>
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: k.text }}>{k.value}</p>
          </div>
        ))}
      </div>

      {/* Bottom grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Today's Schedule */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Today's Schedule</h2>
            <Link href="/appointments" style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>View All →</Link>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EDFDF3' }}>
                {['Time', 'Patient', 'Purpose', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 20px', fontSize: 11, fontWeight: 600, color: '#707971', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TODAY_SCHEDULE.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #E1F2E8' }}>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#404941', fontFamily: 'monospace' }}>{row.time}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#111E18' }}>{row.patient}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: '#404941' }}>{row.purpose}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: row.status === 'Confirmed' ? '#EAF4EC' : '#FFF8E1', color: row.status === 'Confirmed' ? '#1A5C38' : '#C9A84C' }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {TODAY_SCHEDULE.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
              <p>No appointments today</p>
            </div>
          )}
        </div>

        {/* Active Treatments mini */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>Active Treatments</h3>
              <Link href="/treatments" style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>View All</Link>
            </div>
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#707971' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
              <p style={{ fontSize: 13 }}>No active treatments</p>
              <Link href="/treatments/new" style={{ display: 'inline-block', marginTop: 12, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '7px 14px', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>+ Create Treatment</Link>
            </div>
          </div>

          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '✍️ Write Prescription', href: '/treatments' },
                { label: '📅 New Appointment', href: '/appointments' },
                { label: '💬 Open Chat', href: '/chat' },
              ].map(a => (
                <Link key={a.label} href={a.href} style={{ display: 'block', padding: '9px 14px', borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: 'none', background: '#EDFDF3', color: '#1A5C38', border: '1px solid #E1F2E8' }}>{a.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
