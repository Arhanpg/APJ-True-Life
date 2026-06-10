'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '', dateOfBirth: '', gender: '', bloodGroup: '',
    address: '', emergencyContact: '', prakriti: '', allergies: '',
  });
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF',
    borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 5,
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push('/patients');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 900 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none', fontSize: 13 }}>← Patients</Link>
        <span style={{ color: '#C0C9BF' }}>/</span>
        <span style={{ fontSize: 13, color: '#111E18', fontWeight: 600 }}>Add New Patient</span>
      </div>

      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Add New Patient</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Personal Information */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Personal Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Full Name <span style={{ color: '#BA1A1A' }}>*</span></label>
                <input value={form.fullName} onChange={set('fullName')} required placeholder="Patient full name" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Date of Birth <span style={{ color: '#BA1A1A' }}>*</span></label>
                <input type="date" value={form.dateOfBirth} onChange={set('dateOfBirth')} required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Gender <span style={{ color: '#BA1A1A' }}>*</span></label>
                <select value={form.gender} onChange={set('gender')} required style={inputStyle}>
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Blood Group</label>
                <select value={form.bloodGroup} onChange={set('bloodGroup')} style={inputStyle}>
                  <option value="">Select blood group</option>
                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Emergency Contact</label>
                <input value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="+91 XXXXXXXXXX" style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Address</label>
                <textarea value={form.address} onChange={set('address')} rows={2} placeholder="Patient residential address" style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
              </div>
            </div>
          </div>

          {/* Ayurvedic Profile */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 4, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Ayurvedic Profile</h2>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Prakriti assessment determines the personalised treatment approach.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Prakriti (Body Constitution)</label>
                <select value={form.prakriti} onChange={set('prakriti')} style={inputStyle}>
                  <option value="">Select Prakriti</option>
                  {['Vata','Pitta','Kapha','Vata-Pitta','Pitta-Kapha','Vata-Kapha','Tridosha (balanced)'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Known Allergies</label>
                <input value={form.allergies} onChange={set('allergies')} placeholder="e.g. Sesame oil, Dairy" style={inputStyle} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/patients" style={{ flex: 1, textAlign: 'center', border: '1.5px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
            <button type="submit" disabled={loading} style={{ flex: 2, background: loading ? '#707971' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Creating Patient…' : 'Create Patient Profile'}
            </button>
          </div>
        </div>

        {/* Sidebar Note */}
        <div style={{ position: 'sticky', top: 88 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>After Creating</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[{ icon: '📱', text: 'Patient receives SMS with app download link and login OTP' },
                { icon: '🌿', text: 'You can immediately create a treatment plan for this patient' },
                { icon: '📅', text: 'Book their first appointment from the Appointments section' }]
                .map(item => (
                  <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ fontSize: 12, color: '#404941', lineHeight: 1.5 }}>{item.text}</p>
                  </div>
                ))}
            </div>
          </div>
          <div style={{ background: '#EDFDF3', border: '1px solid #C0D9CA', borderRadius: 12, padding: 16, marginTop: 16 }}>
            <p style={{ fontSize: 12, color: '#1A5C38', fontWeight: 600, marginBottom: 4 }}>Privacy Notice</p>
            <p style={{ fontSize: 11, color: '#404941', lineHeight: 1.5 }}>Patient data is collected with consent and protected under DPDP Act 2023 & IT Act 2000.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
