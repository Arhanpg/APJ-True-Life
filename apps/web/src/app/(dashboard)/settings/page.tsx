'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [clinicForm, setClinicForm] = useState({ name: 'APJ TRUE LIFE', address: '', phone: '', email: '', website: '' });
  const [doctorForm, setDoctorForm] = useState({ fullName: '', title: 'Chief Vaidya', bio: '' });
  const setClinic = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setClinicForm(p => ({ ...p, [k]: e.target.value }));
  const setDoctor = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDoctorForm(p => ({ ...p, [k]: e.target.value }));
  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 4 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Clinic Settings</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Clinic Info */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Clinic Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Clinic Name</label><input value={clinicForm.name} onChange={setClinic('name')} style={inputStyle} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Address</label><textarea value={clinicForm.address} onChange={setClinic('address')} rows={2} style={{ ...inputStyle, resize: 'vertical' }} /></div>
              <div><label style={labelStyle}>Phone</label><input value={clinicForm.phone} onChange={setClinic('phone')} placeholder="+91 XXXXXXXXXX" style={inputStyle} /></div>
              <div><label style={labelStyle}>Email</label><input type="email" value={clinicForm.email} onChange={setClinic('email')} style={inputStyle} /></div>
              <div style={{ gridColumn: '1 / -1' }}><label style={labelStyle}>Website</label><input value={clinicForm.website} onChange={setClinic('website')} placeholder="https://" style={inputStyle} /></div>
            </div>
            <button style={{ marginTop: 16, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Clinic Info</button>
          </div>

          {/* Doctor Profile */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Doctor Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#fff', fontSize: 24, fontWeight: 700 }}>Dr</span>
                </div>
                <button style={{ border: '1.5px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Upload Photo</button>
              </div>
              <div><label style={labelStyle}>Full Name</label><input value={doctorForm.fullName} onChange={setDoctor('fullName')} placeholder="Dr. Full Name" style={inputStyle} /></div>
              <div><label style={labelStyle}>Professional Title</label><input value={doctorForm.title} onChange={setDoctor('title')} style={inputStyle} /></div>
              <div><label style={labelStyle}>Bio (visible to patients)</label><textarea value={doctorForm.bio} onChange={setDoctor('bio')} rows={3} placeholder="Brief professional bio..." style={{ ...inputStyle, resize: 'vertical' }} /></div>
            </div>
            <button style={{ marginTop: 16, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save Profile</button>
          </div>

          {/* Services */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Available Services</h2>
              <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>+ Add Service</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 100px', padding: '10px 20px', fontSize: 11, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8', background: '#F8FDF9' }}>
              {['Service Name', 'Duration', 'Price (INR)', 'Active', 'Actions'].map(h => <span key={h}>{h}</span>)}
            </div>
            {[['General Consultation', '30 min', '₹500', true], ['Panchakarma Therapy', '60 min', '₹2,000', true], ['Nasya Treatment', '45 min', '₹1,500', true], ['Abhyanga Massage', '60 min', '₹1,800', false]].map(([name, dur, price, active]) => (
              <div key={String(name)} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 80px 100px', padding: '12px 20px', borderBottom: '1px solid #F0F7F2', alignItems: 'center', fontSize: 13, color: '#111E18' }}>
                <span style={{ fontWeight: 500 }}>{name}</span>
                <span style={{ color: '#404941' }}>{dur}</span>
                <span style={{ fontWeight: 600 }}>{price}</span>
                <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: active ? '#EAF4EC' : '#F5F5F5', color: active ? '#1A5C38' : '#707971' }}>{active ? 'Active' : 'Off'}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button style={{ border: '1px solid #C0C9BF', background: 'transparent', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', color: '#404941' }}>Edit</button>
                  <button style={{ border: '1px solid #FFCDD2', background: 'transparent', borderRadius: 6, padding: '4px 10px', fontSize: 11, cursor: 'pointer', color: '#BA1A1A' }}>Del</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div style={{ position: 'sticky', top: 88, height: 'fit-content' }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ background: '#1A5C38', padding: '20px 16px' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Dr</span>
              </div>
              <p style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16 }}>{doctorForm.fullName || 'Dr. Full Name'}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 }}>{doctorForm.title}</p>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 10 }}>{clinicForm.name}</p>
              <p style={{ fontSize: 12, color: '#707971' }}>{clinicForm.address || 'Clinic address'}</p>
              <p style={{ fontSize: 11, color: '#C9A84C', fontWeight: 600, marginTop: 8 }}>🏆 AYUSH TV National Health Award 2024</p>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#707971', textAlign: 'center', marginTop: 8 }}>Patient app preview</p>
        </div>
      </div>
    </div>
  );
}
