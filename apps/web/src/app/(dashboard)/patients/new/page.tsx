'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF',
  borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 5,
};

export default function NewPatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', phone: '', email: '', dob: '', gender: '',
    bloodGroup: '', address: '', emergencyContact: '',
    prakriti: '', allergies: '',
  });
  const [consent, setConsent] = useState(false);

  const set = (k: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(p => ({ ...p, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    router.push('/patients');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 960 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        <Link href="/patients" style={{ color: '#707971', textDecoration: 'none' }}>← Patients</Link>
        <span style={{ color: '#C0C9BF' }}>/</span>
        <span style={{ color: '#111E18', fontWeight: 600 }}>Add New Patient</span>
      </div>

      <div>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Add New Patient</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Create a patient profile. They will receive an SMS with the app download link.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Personal Information */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Personal Information</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Full Name <span style={{ color: '#BA1A1A' }}>*</span></label>
                <input value={form.fullName} onChange={set('fullName')} required placeholder="Patient's full name" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Mobile Number <span style={{ color: '#BA1A1A' }}>*</span></label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#404941', fontWeight: 600 }}>+91</span>
                    <input value={form.phone} onChange={set('phone')} required placeholder="98765 43210"
                      maxLength={10} pattern="[0-9]{10}"
                      style={{ ...inputStyle, paddingLeft: 42 }} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Email (Optional)</label>
                  <input value={form.email} onChange={set('email')} type="email" placeholder="patient@email.com" style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Date of Birth <span style={{ color: '#BA1A1A' }}>*</span></label>
                  <input value={form.dob} onChange={set('dob')} type="date" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Gender <span style={{ color: '#BA1A1A' }}>*</span></label>
                  <select value={form.gender} onChange={set('gender')} required style={inputStyle}>
                    <option value="">Select…</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Blood Group</label>
                  <select value={form.bloodGroup} onChange={set('bloodGroup')} style={inputStyle}>
                    <option value="">Select…</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Address</label>
                  <input value={form.address} onChange={set('address')} placeholder="Residential address" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Emergency Contact</label>
                  <input value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="+91 XXXXX XXXXX" style={inputStyle} />
                </div>
              </div>
            </div>
          </div>

          {/* Ayurvedic Profile */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 4, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Ayurvedic Profile</h2>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Set the patient's Prakriti (Ayurvedic body type).</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Prakriti</label>
                <select value={form.prakriti} onChange={set('prakriti')} style={inputStyle}>
                  <option value="">Select Prakriti…</option>
                  {['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridosha'].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Known Allergies</label>
                <input value={form.allergies} onChange={set('allergies')} placeholder="e.g. Sesame oil, Dairy" style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Consent */}
          <div style={{ background: '#EDFDF3', border: '1px solid #C0D9CA', borderRadius: 12, padding: 16 }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)}
                style={{ width: 16, height: 16, marginTop: 2, accentColor: '#1A5C38', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#404941', lineHeight: 1.5 }}>
                I confirm that the patient has provided consent to collect and process their health data in accordance with the DPDP Act 2023 and APJ TRUE LIFE privacy policy.
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/patients" style={{ flex: 1, textAlign: 'center', border: '1.5px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
            <button type="submit" disabled={loading || !consent}
              style={{ flex: 2, background: loading || !consent ? '#C0C9BF' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: loading || !consent ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? 'Creating Patient…' : '✓ Create Patient & Send SMS Invite'}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 14 }}>After Creating</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '📱', text: 'Patient receives SMS with app download link and login OTP' },
                { icon: '🌿', text: 'Patient appears in your patient list as Active' },
                { icon: '📋', text: 'You can then create a treatment plan for this patient' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{icon}</span>
                  <p style={{ fontSize: 12, color: '#404941', lineHeight: 1.5 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#FFF8E7', border: '1px solid #F0D980', borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#856400', marginBottom: 6 }}>Privacy Notice</p>
            <p style={{ fontSize: 12, color: '#856400', lineHeight: 1.5 }}>Patient data is protected under DPDP Act 2023. Consent must be obtained before creating their profile.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
