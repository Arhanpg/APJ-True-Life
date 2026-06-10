'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PatientDetailPage() {
  const { id } = useParams();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Patients</Link>
        <h1 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#004324' }}>Patient Profile</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20 }}>
        {/* Left: main info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Profile card */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>P</span>
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111E18' }}>—</h2>
                <p style={{ fontSize: 13, color: '#404941', marginTop: 2 }}>Patient ID: #{id?.toString().slice(0,8).toUpperCase()}</p>
                <span style={{ display: 'inline-block', marginTop: 6, padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: '#EAF4EC', color: '#1A5C38' }}>Active</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['Date of Birth', '—'], ['Gender', '—'], ['Blood Group', '—'], ['Prakriti', '—'], ['Phone', '—'], ['Email', '—']].map(([label, val]) => (
                <div key={label}>
                  <p style={{ fontSize: 11, color: '#707971', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
                  <p style={{ fontSize: 14, color: '#111E18', marginTop: 2 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Treatment summary */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111E18' }}>Treatment History</h3>
              <Link href={`/treatments/new`} style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '6px 14px', fontSize: 12, textDecoration: 'none', fontWeight: 600 }}>+ New Treatment</Link>
            </div>
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#707971' }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📋</div>
              <p style={{ fontWeight: 500, color: '#404941' }}>No treatments yet</p>
            </div>
          </div>
        </div>

        {/* Right: quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111E18', marginBottom: 12 }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: '+ New Treatment', href: '/treatments/new', primary: true },
                { label: '📅 Book Appointment', href: '/appointments', primary: false },
                { label: '💬 Send Message', href: '/chat', primary: false },
              ].map(a => (
                <Link key={a.label} href={a.href} style={{
                  display: 'block', textAlign: 'center', padding: '9px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  background: a.primary ? '#1A5C38' : 'transparent',
                  color: a.primary ? '#fff' : '#1A5C38',
                  border: a.primary ? 'none' : '1.5px solid #1A5C38',
                }}>{a.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
