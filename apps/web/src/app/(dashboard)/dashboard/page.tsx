'use client';
import Link from 'next/link';

const KPI_CARDS = [
  { label: 'Active Patients', value: '—', sub: 'Total enrolled', icon: '👥', color: '#1A5C38' },
  { label: "Today's Appointments", value: '—', sub: 'Scheduled today', icon: '📅', color: '#2E7D52' },
  { label: 'Unread Messages', value: '—', sub: 'Pending replies', icon: '💬', color: '#C9A84C' },
  { label: 'Completed (This Week)', value: '—', sub: 'Treatments done', icon: '✅', color: '#004324' },
];

const QUICK_ACTIONS = [
  { label: '✏️ Write Prescription', href: '/treatments' },
  { label: '📅 New Appointment', href: '/appointments' },
  { label: '👤 Add Patient', href: '/patients' },
  { label: '⚙️ Clinic Settings', href: '/settings' },
];

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Greeting */}
      <div style={{ background: 'linear-gradient(135deg,#1A5C38,#2E7D52)', borderRadius: 16, padding: '24px 28px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Welcome, Doctor 🌿</h1>
          <p style={{ fontSize: 14, opacity: 0.8 }}>{today}</p>
          <p style={{ fontSize: 12, marginTop: 6, opacity: 0.65, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ background: '#C9A84C', borderRadius: 4, padding: '2px 8px', color: '#fff', fontWeight: 600, fontSize: 11 }}>🏆 AYUSH TV National Health Award 2024</span>
          </p>
        </div>
        <div style={{ textAlign: 'right', opacity: 0.9 }}>
          <p style={{ fontSize: 13 }}>APJ TRUE LIFE</p>
          <p style={{ fontSize: 11, opacity: 0.7 }}>Ayurvedic Medical Centre</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
        {KPI_CARDS.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <span style={{ fontSize: 28 }}>{k.icon}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: k.color, marginTop: 6 }} />
            </div>
            <p style={{ fontSize: 28, fontWeight: 700, color: '#111E18', lineHeight: 1 }}>{k.value}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111E18' }}>{k.label}</p>
            <p style={{ fontSize: 11, color: '#707971' }}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Today's Schedule */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111E18' }}>Today's Schedule</h2>
            <Link href="/appointments" style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <p style={{ fontWeight: 500, color: '#404941', marginBottom: 4 }}>No appointments today</p>
              <p style={{ fontSize: 13 }}>Schedule a new appointment to get started</p>
              <Link href="/appointments" style={{ display: 'inline-block', marginTop: 16, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Appointment</Link>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Actions */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {QUICK_ACTIONS.map(a => (
                <Link key={a.label} href={a.href} style={{ display: 'block', padding: '9px 12px', background: '#EDFDF3', borderRadius: 8, fontSize: 13, fontWeight: 500, color: '#1A5C38', textDecoration: 'none', border: '1px solid #D4E8D8' }}>{a.label}</Link>
              ))}
            </div>
          </div>

          {/* Recent Messages */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>Recent Messages</h3>
              <Link href="/chat" style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>View all</Link>
            </div>
            <div style={{ textAlign: 'center', padding: '24px 0', color: '#707971' }}>
              <div style={{ fontSize: 36, marginBottom: 8 }}>💬</div>
              <p style={{ fontSize: 13 }}>No messages yet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Treatment Plans */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111E18' }}>Active Treatment Plans</h2>
          <Link href="/treatments" style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
            <p style={{ fontWeight: 500, color: '#404941', marginBottom: 4 }}>No active treatments</p>
            <p style={{ fontSize: 13 }}>Create a treatment plan to see it here</p>
            <Link href="/treatments/new" style={{ display: 'inline-block', marginTop: 16, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Create Treatment Plan</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
