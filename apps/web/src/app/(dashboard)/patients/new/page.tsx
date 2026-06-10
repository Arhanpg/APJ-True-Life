'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NewPatientPage() {
  const [form, setForm] = useState({ fullName: '', dob: '', gender: '', phone: '', email: '', bloodGroup: '', address: '', emergencyContact: '', prakriti: '', allergies: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 4 };

  return (
    <div style={{ maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Patients</Link>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Add New Patient</h1>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>Personal Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Full Name *</label>
            <input value={form.fullName} onChange={set('fullName')} placeholder="Patient full name" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Date of Birth *</label>
            <input type="date" value={form.dob} onChange={set('dob')} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Gender *</label>
            <select value={form.gender} onChange={set('gender')} style={inputStyle}>
              <option value="">Select gender</option>
              <option>MALE</option>
              <option>FEMALE</option>
              <option>OTHER</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Phone Number *</label>
            <input value={form.phone} onChange={set('phone')} placeholder="+91 XXXXXXXXXX" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="patient@email.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Blood Group</label>
            <select value={form.bloodGroup} onChange={set('bloodGroup')} style={inputStyle}>
              <option value="">Select</option>
              {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Prakriti (Ayurvedic Body Type)</label>
            <select value={form.prakriti} onChange={set('prakriti')} style={inputStyle}>
              <option value="">Select prakriti</option>
              {['Vata','Pitta','Kapha','Vata-Pitta','Pitta-Kapha','Vata-Kapha','Tridosha'].map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Emergency Contact</label>
            <input value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="+91 XXXXXXXXXX" style={inputStyle} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Address</label>
            <textarea value={form.address} onChange={set('address')} placeholder="Patient address" rows={2} style={{ ...inputStyle, resize: 'vertical' }} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={labelStyle}>Known Allergies</label>
            <input value={form.allergies} onChange={set('allergies')} placeholder="e.g., Penicillin, Pollen (comma separated)" style={inputStyle} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Link href="/patients" style={{ flex: 1, textAlign: 'center', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
          <button style={{ flex: 2, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Create Patient &amp; Send SMS Invite</button>
        </div>
      </div>
    </div>
  );
}
