'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const [form, setForm] = useState({ planName: '', diagnosis: '', startDate: '', endDate: '', totalPhases: '1', clinicalNotes: '', doshaAssessment: '', specialInstructions: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(p => ({ ...p, [k]: e.target.value }));
  const inputStyle = { width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 14, outline: 'none', color: '#111E18', background: '#fff' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 4 };

  return (
    <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Treatments</Link>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Create Treatment Plan</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Plan Details */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Plan Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Treatment Plan Name *</label>
                <input value={form.planName} onChange={set('planName')} placeholder="e.g. Nasya Course for Nasal Polyp" style={inputStyle} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Diagnosis *</label>
                <input value={form.diagnosis} onChange={set('diagnosis')} placeholder="Clinical diagnosis" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Start Date *</label>
                <input type="date" value={form.startDate} onChange={set('startDate')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Estimated End Date</label>
                <input type="date" value={form.endDate} onChange={set('endDate')} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Total Phases</label>
                <select value={form.totalPhases} onChange={set('totalPhases')} style={inputStyle}>
                  {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 4 }}>Clinical Notes</h2>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 14 }}>Internal — not visible to patient</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={labelStyle}>Dosha Assessment</label>
                <textarea value={form.doshaAssessment} onChange={set('doshaAssessment')} rows={3} placeholder="Dosha imbalance analysis..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div>
                <label style={labelStyle}>Clinical Notes (Internal)</label>
                <textarea value={form.clinicalNotes} onChange={set('clinicalNotes')} rows={4} placeholder="Doctor notes (not shown to patient)..." style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div>
                <label style={{ ...labelStyle, color: '#1A5C38' }}>Special Instructions for Patient</label>
                <textarea value={form.specialInstructions} onChange={set('specialInstructions')} rows={3} placeholder="Instructions visible to patient in app..." style={{ ...inputStyle, borderColor: '#1A5C38' }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/treatments" style={{ flex: 1, textAlign: 'center', border: '1.5px solid #1A5C38', color: '#1A5C38', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
            <button style={{ flex: 2, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save &amp; Publish to Patient</button>
          </div>
        </div>

        {/* Preview */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20, height: 'fit-content', position: 'sticky', top: 88 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Plan Preview</h3>
          <div style={{ background: '#EDFDF3', borderRadius: 10, padding: 16 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: '#004324' }}>{form.planName || 'Treatment Plan Name'}</p>
            <p style={{ fontSize: 12, color: '#404941', marginTop: 4 }}>{form.diagnosis || 'Diagnosis'}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <span style={{ background: '#1A5C38', color: '#fff', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>Active</span>
              <span style={{ background: '#C9A84C', color: '#fff', borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 600 }}>{form.totalPhases} Phase{parseInt(form.totalPhases) > 1 ? 's' : ''}</span>
            </div>
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {Array.from({ length: parseInt(form.totalPhases) }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', border: '2px solid #C0C9BF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: '#707971' }}>{i + 1}</span>
                  </div>
                  <span style={{ fontSize: 12, color: '#707971' }}>Phase {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
