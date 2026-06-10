'use client';
import { useState } from 'react';

const SERVICES = [
  { id: '1', name: 'Panchakarma Therapy', duration: 90, price: 2500, active: true },
  { id: '2', name: 'Nasya Treatment', duration: 45, price: 1200, active: true },
  { id: '3', name: 'Abhyanga Massage', duration: 60, price: 1800, active: false },
  { id: '4', name: 'Shirodhara', duration: 75, price: 2000, active: true },
];

export default function SettingsPage() {
  const [tab, setTab] = useState<'clinic' | 'doctor' | 'services'>('clinic');
  const [clinic, setClinic] = useState({ name: 'APJ True Life Ayurvedic Medical Centre', address: 'Bengaluru, Karnataka, India', phone: '+91 98765 43210', email: 'info@apjtruelife.com', tagline: 'Excellence in Ayurvedic Care' });
  const [doctor, setDoctor] = useState({ fullName: 'Dr. APJ Sharma', title: 'Chief Vaidya & Physician', bio: 'Award-winning Ayurvedic practitioner with 15+ years of clinical excellence.' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#004324', fontFamily: 'Playfair Display, serif' }}>Clinic Settings</h1>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 2, background: '#EDFDF3', borderRadius: 10, padding: 4, width: 'fit-content' }}>
        {(['clinic', 'doctor', 'services'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 20px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', background: tab === t ? '#fff' : 'transparent', color: tab === t ? '#1A5C38' : '#707971', boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none' }}>{t === 'services' ? 'Services' : t === 'doctor' ? 'Doctor Profile' : 'Clinic Info'}</button>
        ))}
      </div>

      {tab === 'clinic' && (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111E18', marginBottom: 20 }}>Clinic Information</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {Object.entries(clinic).map(([k, v]) => (
              <div key={k}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6, textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</label>
                <input value={v} onChange={e => setClinic(c => ({ ...c, [k]: e.target.value }))}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
          </div>
        </div>
      )}

      {tab === 'doctor' && (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111E18', marginBottom: 20 }}>Doctor Profile</h2>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>D</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
              <button style={{ background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '7px 16px', fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>Upload Photo</button>
              <p style={{ fontSize: 11, color: '#707971' }}>JPEG, PNG up to 5MB</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[{ label: 'Full Name', key: 'fullName' }, { label: 'Professional Title', key: 'title' }].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>{f.label}</label>
                <input value={(doctor as any)[f.key]} onChange={e => setDoctor(d => ({ ...d, [f.key]: e.target.value }))}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Bio (visible to patients)</label>
              <textarea value={doctor.bio} onChange={e => setDoctor(d => ({ ...d, bio: e.target.value }))} rows={4}
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Profile</button>
          </div>
        </div>
      )}

      {tab === 'services' && (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: '#111E18' }}>Available Services</h2>
            <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Service</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#EDFDF3' }}>
                {['Service Name', 'Duration', 'Price (₹)', 'Active', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#404941', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SERVICES.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #E1F2E8', background: i % 2 === 0 ? '#fff' : '#FAFDFB' }}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500, color: '#111E18' }}>{s.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>{s.duration} min</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>₹{s.price.toLocaleString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ width: 36, height: 20, borderRadius: 999, background: s.active ? '#1A5C38' : '#C0C9BF', display: 'flex', alignItems: 'center', padding: 2, cursor: 'pointer' }}>
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#fff', marginLeft: s.active ? 16 : 0, transition: 'margin 0.15s' }} />
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                    <button style={{ background: '#EDFDF3', color: '#1A5C38', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Edit</button>
                    <button style={{ background: '#FEF2F2', color: '#BA1A1A', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 12, cursor: 'pointer' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
