'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const [form, setForm] = useState({ planName: '', diagnosis: '', startDate: '', endDate: '', totalPhases: 3, clinicalNotes: '', specialInstructions: '', doshaAssessment: '' });
  const [step, setStep] = useState(1);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Treatments</Link>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#004324', fontFamily: 'Playfair Display, serif' }}>New Treatment Plan</h1>
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[1,2].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: step >= s ? '#1A5C38' : '#E1F2E8' }} />
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 28 }}>
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#111E18', marginBottom: 4 }}>Plan Details</h2>
            {[{ label: 'Plan Name', name: 'planName', type: 'text', placeholder: 'e.g. Nasya Therapy Course' },
              { label: 'Diagnosis', name: 'diagnosis', type: 'text', placeholder: 'Clinical diagnosis' }].map(f => (
              <div key={f.name}>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>{f.label} *</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} value={(form as any)[f.name]} onChange={handleChange}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Start Date *</label>
                <input name="startDate" type="date" value={form.startDate} onChange={handleChange}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>End Date</label>
                <input name="endDate" type="date" value={form.endDate} onChange={handleChange}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Total Phases *</label>
                <input name="totalPhases" type="number" min={1} max={10} value={form.totalPhases} onChange={handleChange}
                  style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Dosha Assessment</label>
              <textarea name="doshaAssessment" value={form.doshaAssessment} onChange={handleChange} rows={3} placeholder="Vata-Pitta imbalance…"
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(2)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Next →</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: '#111E18' }}>Clinical Notes</h2>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Clinical Notes <span style={{ color: '#707971', fontWeight: 400 }}>(Internal – not visible to patient)</span></label>
              <textarea name="clinicalNotes" value={form.clinicalNotes} onChange={handleChange} rows={5} placeholder="Internal clinical observations…"
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#404941', display: 'block', marginBottom: 6 }}>Special Instructions <span style={{ color: '#707971', fontWeight: 400 }}>(Visible to patient)</span></label>
              <textarea name="specialInstructions" value={form.specialInstructions} onChange={handleChange} rows={4} placeholder="Instructions for the patient…"
                style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 14px', fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save & Publish</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
