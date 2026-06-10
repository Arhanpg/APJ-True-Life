'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('Clinic Info');
  const SECTIONS = ['Clinic Info', 'Doctor Profile', 'Services', 'Notifications'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Clinic Settings</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Section nav */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 12, height: 'fit-content' }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => setActiveSection(s)} style={{
              width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, marginBottom: 2,
              background: activeSection === s ? '#EAF4EC' : 'transparent',
              color: activeSection === s ? '#1A5C38' : '#404941',
              borderLeft: activeSection === s ? '3px solid #1A5C38' : '3px solid transparent',
            }}>{s}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
          {activeSection === 'Clinic Info' && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111E18', marginBottom: 20 }}>Clinic Information</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {[
                  ['Clinic Name *', 'APJ TRUE LIFE', 'text'],
                  ['Tagline', 'Ayurvedic Excellence', 'text'],
                  ['Phone', '+91 XXXXX XXXXX', 'tel'],
                  ['Email', 'clinic@apjtruelife.com', 'email'],
                  ['Website', 'https://apjtruelife.com', 'url'],
                ].map(([label, placeholder, type]) => (
                  <div key={label as string}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{label as string}</label>
                    <input type={type as string} defaultValue={placeholder as string} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                ))}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Address</label>
                  <textarea defaultValue="" rows={3} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
              <button style={{ marginTop: 24, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Changes</button>
            </div>
          )}
          {activeSection === 'Doctor Profile' && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111E18', marginBottom: 20 }}>Doctor Profile</h2>
              <div style={{ display: 'flex', gap: 20, marginBottom: 24, alignItems: 'flex-start' }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 28, fontWeight: 700 }}>D</span>
                </div>
                <div style={{ flex: 1 }}>
                  <button style={{ background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Change Photo</button>
                  <p style={{ fontSize: 12, color: '#707971', marginTop: 6 }}>JPG, PNG — max 5 MB</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                {[['Full Name *', 'Dr. APJ Sharma', 'text'], ['Professional Title', 'Chief Vaidya', 'text']].map(([l, p, t]) => (
                  <div key={l as string}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{l as string}</label>
                    <input type={t as string} defaultValue={p as string} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                ))}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Bio (visible to patients)</label>
                  <textarea defaultValue="" rows={4} placeholder="Brief professional bio..." style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
                </div>
              </div>
              <button style={{ marginTop: 20, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Profile</button>
            </div>
          )}
          {activeSection === 'Services' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111E18' }}>Available Services</h2>
                <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Service</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#EDFDF3' }}>
                    {['Service Name', 'Duration', 'Price (₹)', 'Status', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#707971', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[['Panchakarma Therapy', '90 min', '₹2,500', true], ['Nasya Therapy', '45 min', '₹1,200', true], ['Abhyanga', '60 min', '₹1,800', true], ['General Consultation', '30 min', '₹500', true], ['Yoga Therapy', '60 min', '₹800', false]].map(([name, dur, price, active]) => (
                    <tr key={name as string} style={{ borderBottom: '1px solid #E1F2E8' }}>
                      <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500, color: '#111E18' }}>{name as string}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>{dur as string}</td>
                      <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941', fontFamily: 'monospace' }}>{price as string}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: active ? '#EAF4EC' : '#F5F5F5', color: active ? '#1A5C38' : '#707971' }}>{active ? 'Active' : 'Inactive'}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <button style={{ background: 'none', border: '1px solid #C0C9BF', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#404941' }}>Edit</button>
                          <button style={{ background: 'none', border: '1px solid #FFCDD2', borderRadius: 6, padding: '4px 10px', fontSize: 12, cursor: 'pointer', color: '#BA1A1A' }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeSection === 'Notifications' && (
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, color: '#111E18', marginBottom: 20 }}>Notification Preferences</h2>
              {[['New appointment request', true], ['Appointment confirmed by patient', true], ['New chat message', true], ['Treatment plan updated', false], ['Patient profile created', true]].map(([label, on]) => (
                <div key={label as string} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #E1F2E8' }}>
                  <span style={{ fontSize: 14, color: '#111E18' }}>{label as string}</span>
                  <div style={{ width: 44, height: 24, borderRadius: 12, background: on ? '#1A5C38' : '#C0C9BF', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: 18, height: 18, background: '#fff', borderRadius: '50%', position: 'absolute', top: 3, left: on ? 23 : 3, transition: 'left 0.2s' }} />
                  </div>
                </div>
              ))}
              <button style={{ marginTop: 24, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Preferences</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
