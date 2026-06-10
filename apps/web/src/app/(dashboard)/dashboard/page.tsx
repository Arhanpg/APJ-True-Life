'use client';
import Link from 'next/link';

const KPI_CARDS = [
  { label: 'Active Patients', value: '0', trend: '+0 this week', color: '#1A5C38', bg: '#EAF4EC' },
  { label: "Today's Appointments", value: '0', trend: '0 pending', color: '#C9A84C', bg: '#FFF8E7' },
  { label: 'Unread Messages', value: '0', trend: 'All read', color: '#004324', bg: '#E8F0ED' },
  { label: 'Completed Treatments', value: '0', trend: 'This week', color: '#2E7D52', bg: '#EAF4EC' },
];

export default function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Good morning, Doctor</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <div style={{ background: '#C9A84C', color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>🏆</span> AYUSH TV National Health Award 2024
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {KPI_CARDS.map(k => (
          <div key={k.label} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <p style={{ fontSize: 12, color: '#707971', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{k.label}</p>
            <p style={{ fontSize: 32, fontWeight: 700, color: k.color, margin: '8px 0 4px', fontFamily: 'JetBrains Mono, monospace' }}>{k.value}</p>
            <p style={{ fontSize: 12, color: '#707971' }}>{k.trend}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Today's Schedule */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Today's Schedule</h2>
            <Link href="/appointments" style={{ fontSize: 12, color: '#1A5C38', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ padding: '40px 20px', textAlign: 'center', color: '#707971' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📅</div>
            <p style={{ fontWeight: 500, color: '#404941' }}>No appointments today</p>
            <Link href="/appointments" style={{ display: 'inline-block', marginTop: 16, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Book Appointment</Link>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Quick Actions */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link href="/treatments/new" style={{ display: 'block', background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 14px', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>📋 New Treatment Plan</Link>
              <Link href="/patients/new" style={{ display: 'block', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '9px 14px', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>👤 Add New Patient</Link>
              <Link href="/appointments" style={{ display: 'block', border: '1.5px solid #C9A84C', color: '#C9A84C', borderRadius: 8, padding: '9px 14px', fontSize: 13, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>📅 Schedule Appointment</Link>
            </div>
          </div>
          {/* Recent Messages */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>Recent Messages</h3>
              <Link href="/chat" style={{ fontSize: 12, color: '#1A5C38', textDecoration: 'none' }}>View All</Link>
            </div>
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#707971', fontSize: 13 }}>No messages yet</div>
          </div>
        </div>
      </div>

      {/* Active Treatment Plans */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Active Treatment Plans</h2>
          <Link href="/treatments" style={{ fontSize: 12, color: '#1A5C38', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
        </div>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#707971' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌿</div>
          <p style={{ fontWeight: 500, color: '#404941' }}>No active treatment plans</p>
          <Link href="/treatments/new" style={{ display: 'inline-block', marginTop: 16, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Create Treatment Plan</Link>
        </div>
      </div>
    </div>
  );
}
