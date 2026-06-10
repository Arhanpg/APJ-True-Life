'use client';
import { useState } from 'react';

const SERVICE_CATEGORIES = ['General Consultation', 'Panchakarma Therapy', 'Nasya', 'Abhyanga', 'Yoga Therapy', 'Dietetics Consultation'];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Clinic Info');
  const TABS = ['Clinic Info', 'Doctor Profile', 'Services', 'Notifications'];
  const [clinic, setClinic] = useState({ name: 'APJ TRUE LIFE', tagline: 'Ayurvedic Excellence', address: '', phone: '', email: '', website: '' });
  const [doctor, setDoctor] = useState({ fullName: '', title: 'Chief Vaidya', bio: '' });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Clinic Settings</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage clinic information and preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div>
          {/* Tab bar */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', background: '#EDFDF3' }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setActiveTab(t)} style={{ flex: 1, padding: '12px 8px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: activeTab === t ? '#fff' : 'transparent', color: activeTab === t ? '#1A5C38' : '#707971', borderBottom: activeTab === t ? '2px solid #1A5C38' : '2px solid transparent' }}>{t}</button>
              ))}
            </div>

            <div style={{ padding: 24 }}>
              {activeTab === 'Clinic Info' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[{ label: 'Clinic Name *', key: 'name', placeholder: 'APJ TRUE LIFE' },
                      { label: 'Tagline', key: 'tagline', placeholder: 'Ayurvedic Excellence' },
                      { label: 'Phone', key: 'phone', placeholder: '+91 XXXXX XXXXX' },
                      { label: 'Email', key: 'email', placeholder: 'clinic@email.com' },
                      { label: 'Website', key: 'website', placeholder: 'https://...' }]
                      .map(f => (
                        <div key={f.key}>
                          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{f.label}</label>
                          <input value={clinic[f.key as keyof typeof clinic]} onChange={e => setClinic(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                        </div>
                      ))}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Address</label>
                    <textarea rows={2} value={clinic.address} onChange={e => setClinic(p => ({ ...p, address: e.target.value }))} placeholder="Full clinic address" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>
                  <button style={{ alignSelf: 'flex-start', background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
                </div>
              )}

              {activeTab === 'Doctor Profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px', background: '#EDFDF3', borderRadius: 10 }}>
                    <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ color: '#fff', fontSize: 22, fontWeight: 700 }}>D</span></div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: '#111E18' }}>Profile Photo</p>
                      <button style={{ marginTop: 6, background: '#fff', border: '1.5px solid #1A5C38', borderRadius: 6, padding: '5px 12px', fontSize: 12, color: '#1A5C38', cursor: 'pointer' }}>Upload Photo</button>
                    </div>
                  </div>
                  {[{ label: 'Full Name *', key: 'fullName', placeholder: 'Dr. APJ Sharma' },
                    { label: 'Professional Title', key: 'title', placeholder: 'Chief Vaidya' }]
                    .map(f => (
                      <div key={f.key}>
                        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{f.label}</label>
                        <input value={doctor[f.key as keyof typeof doctor]} onChange={e => setDoctor(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                      </div>
                    ))}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Bio <span style={{ fontWeight: 400, color: '#707971' }}>(Visible to patients)</span></label>
                    <textarea rows={4} value={doctor.bio} onChange={e => setDoctor(p => ({ ...p, bio: e.target.value }))} placeholder="Your professional background and specializations..." style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>
                  <button style={{ alignSelf: 'flex-start', background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save Profile</button>
                </div>
              )}

              {activeTab === 'Services' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 14, color: '#404941' }}>Manage services offered at your clinic</p>
                    <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Service</button>
                  </div>
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E1F2E8', borderRadius: 8, overflow: 'hidden' }}>
                    <thead>
                      <tr style={{ background: '#EDFDF3' }}>
                        {['Service Name', 'Duration', 'Price (INR)', 'Active', 'Actions'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SERVICE_CATEGORIES.map((svc, i) => (
                        <tr key={svc} style={{ borderBottom: '1px solid #F0F7F2', background: i % 2 === 0 ? '#fff' : '#FAFFFE' }}>
                          <td style={{ padding: '12px 14px', fontSize: 14, color: '#111E18', fontWeight: 500 }}>{svc}</td>
                          <td style={{ padding: '12px 14px', fontSize: 14, color: '#404941' }}>60 min</td>
                          <td style={{ padding: '12px 14px', fontSize: 14, color: '#404941' }}>₹ —</td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ width: 36, height: 20, borderRadius: 999, background: '#1A5C38', position: 'relative', cursor: 'pointer' }}>
                              <div style={{ position: 'absolute', right: 2, top: 2, width: 16, height: 16, borderRadius: '50%', background: '#fff' }} />
                            </div>
                          </td>
                          <td style={{ padding: '12px 14px' }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button style={{ fontSize: 12, color: '#1A5C38', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
                              <button style={{ fontSize: 12, color: '#BA1A1A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'Notifications' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[{ label: 'New appointment booking', desc: 'When a patient requests an appointment' },
                    { label: 'Appointment confirmed', desc: 'When appointment status changes' },
                    { label: 'New chat message', desc: 'When a patient sends you a message' },
                    { label: 'Treatment updates', desc: 'Phase completion and plan changes' }]
                    .map(n => (
                      <div key={n.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #F0F7F2' }}>
                        <div>
                          <p style={{ fontSize: 14, fontWeight: 500, color: '#111E18' }}>{n.label}</p>
                          <p style={{ fontSize: 12, color: '#707971', marginTop: 2 }}>{n.desc}</p>
                        </div>
                        <div style={{ width: 44, height: 24, borderRadius: 999, background: '#1A5C38', position: 'relative', cursor: 'pointer', flexShrink: 0 }}>
                          <div style={{ position: 'absolute', right: 2, top: 2, width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live preview card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: '#1A5C38', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#C9A84C', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>A</span>
              </div>
              <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16 }}>{clinic.name}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{clinic.tagline}</p>
              <span style={{ display: 'inline-block', marginTop: 8, background: '#C9A84C', borderRadius: 4, padding: '2px 8px', fontSize: 11, fontWeight: 600, color: '#fff' }}>🏆 AYUSH TV 2024</span>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 10 }}>Patient App Preview</p>
              {clinic.phone && <p style={{ fontSize: 13, color: '#404941', marginBottom: 6 }}>📞 {clinic.phone}</p>}
              {clinic.email && <p style={{ fontSize: 13, color: '#404941', marginBottom: 6 }}>✉️ {clinic.email}</p>}
              {clinic.address && <p style={{ fontSize: 13, color: '#404941' }}>📍 {clinic.address}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
