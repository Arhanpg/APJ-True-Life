'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRAKRITI_OPTIONS = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridosha'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function NewPatientPage() {
  const [form, setForm] = useState({ fullName: '', dob: '', gender: '', bloodGroup: '', prakriti: '', address: '', emergencyContact: '', email: '' });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 800 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Patients</Link>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>New Patient Profile</h1>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>Personal Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
          {[{ label: 'Full Name *', key: 'fullName', type: 'text', placeholder: 'Enter patient full name' },
            { label: 'Date of Birth *', key: 'dob', type: 'date', placeholder: '' },
            { label: 'Email Address', key: 'email', type: 'email', placeholder: 'patient@email.com' },
            { label: 'Emergency Contact', key: 'emergencyContact', type: 'tel', placeholder: '+91 XXXXX XXXXX' }]
            .map(f => (
              <div key={f.key}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{f.label}</label>
                <input type={f.type} value={form[f.key as keyof typeof form]} onChange={e => upd(f.key, e.target.value)} placeholder={f.placeholder}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18' }} />
              </div>
            ))}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Gender *</label>
            <select value={form.gender} onChange={e => upd('gender', e.target.value)} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18', background: '#fff' }}>
              <option value="">Select gender</option>
              {['MALE', 'FEMALE', 'OTHER'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Blood Group</label>
            <select value={form.bloodGroup} onChange={e => upd('bloodGroup', e.target.value)} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18', background: '#fff' }}>
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 18 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Address</label>
          <textarea value={form.address} onChange={e => upd('address', e.target.value)} placeholder="Patient's residential address" rows={3} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18', resize: 'vertical' }} />
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 20, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>Ayurvedic Profile</h2>
        <div>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 8 }}>Prakriti (Body Type)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {PRAKRITI_OPTIONS.map(p => (
              <button key={p} onClick={() => upd('prakriti', p)} type="button" style={{ padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500, border: form.prakriti === p ? '2px solid #1A5C38' : '1.5px solid #C0C9BF', background: form.prakriti === p ? '#EAF4EC' : '#fff', color: form.prakriti === p ? '#1A5C38' : '#404941', cursor: 'pointer' }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#EDFDF3', border: '1px solid #D4E8D8', borderRadius: 10, padding: '14px 18px', fontSize: 13, color: '#2E7D52' }}>
        📱 An SMS with the app download link and login OTP will be sent to the patient's mobile number after profile creation.
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <Link href="/patients" style={{ flex: 1, textAlign: 'center', padding: '11px', background: '#fff', border: '1.5px solid #1A5C38', borderRadius: 10, color: '#1A5C38', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
        <button style={{ flex: 2, padding: '11px', background: '#1A5C38', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Create Patient Profile</button>
      </div>
    </div>
  );
}
