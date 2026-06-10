'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    planName: '', diagnosis: '', startDate: '', endDate: '',
    totalPhases: '3', clinicalNotes: '', doshaAssessment: '', specialInstructions: '',
  });
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF',
    borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff',
  };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 5 };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    router.push('/treatments');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 1000 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none', fontSize: 13 }}>← Treatments</Link>
        <span style={{ color: '#C0C9BF' }}>/</span>
        <span style={{ fontSize: 13, color: '#111E18', fontWeight: 600 }}>Create New Treatment Plan</span>
      </div>

      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>New Treatment Plan</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Plan Details */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Plan Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Plan Name <span style={{ color: '#BA1A1A' }}>*</span></label>
                <input value={form.planName} onChange={set('planName')} required placeholder="e.g. Nasal Polyp – Nasya Course" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Diagnosis <span style={{ color: '#BA1A1A' }}>*</span></label>
                <input value={form.diagnosis} onChange={set('diagnosis')} required placeholder="Clinical diagnosis" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={labelStyle}>Start Date <span style={{ color: '#BA1A1A' }}>*</span></label>
                  <input type="date" value={form.startDate} onChange={set('startDate')} required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>End Date (est.)</label>
                  <input type="date" value={form.endDate} onChange={set('endDate')} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Total Phases</label>
                  <select value={form.totalPhases} onChange={set('totalPhases')} style={inputStyle}>
                    {['1','2','3','4','5','6'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Dosha Assessment */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 4, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Dosha Assessment & Clinical Notes</h2>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Internal notes — not visible to the patient.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Dosha Assessment</label>
                <textarea value={form.doshaAssessment} onChange={set('doshaAssessment')} rows={3} placeholder="Describe the dosha imbalance assessment…" style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
              </div>
              <div>
                <label style={labelStyle}>Clinical Notes (Internal)</label>
                <textarea value={form.clinicalNotes} onChange={set('clinicalNotes')} rows={4} placeholder="Detailed clinical notes, observations, contraindications…" style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
              </div>
            </div>
          </div>

          {/* Patient Instructions */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 4, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Special Instructions for Patient</h2>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Visible to the patient in their app.</p>
            <textarea value={form.specialInstructions} onChange={set('specialInstructions')} rows={3} placeholder="Lifestyle instructions, precautions, general advice for the patient…" style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/treatments" style={{ flex: 1, textAlign: 'center', border: '1.5px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
            <button type="submit" disabled={loading} style={{ flex: 2, background: loading ? '#707971' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Creating Plan…' : 'Create & Publish Treatment Plan'}
            </button>
          </div>
        </div>

        {/* Patient Sidebar */}
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Select Patient</h3>
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#707971' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input placeholder="Search patients..." style={{ width: '100%', paddingLeft: 32, paddingRight: 10, paddingTop: 8, paddingBottom: 8, border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#EDFDF3', borderRadius: 8, border: '1.5px solid #1A5C38' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>RK</span>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#111E18' }}>Ravi Kumar</p>
                <p style={{ fontSize: 11, color: '#707971' }}>ATL-1042 · Vata-Pitta</p>
              </div>
            </div>
          </div>
          <div style={{ background: '#EDFDF3', border: '1px solid #C0D9CA', borderRadius: 12, padding: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#004324', marginBottom: 6 }}>Next Step</p>
            <p style={{ fontSize: 12, color: '#404941', lineHeight: 1.5 }}>After creating the plan, you will add phases with procedures, medicines, and diet guidelines.</p>
          </div>
        </div>
      </form>
    </div>
  );
}
