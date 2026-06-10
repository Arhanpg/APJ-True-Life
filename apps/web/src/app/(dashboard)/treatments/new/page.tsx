'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const [form, setForm] = useState({ planName: '', diagnosis: '', startDate: '', endDate: '', totalPhases: '3', clinicalNotes: '', doshaAssessment: '', specialInstructions: '' });
  const upd = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));
  const [step, setStep] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none', fontSize: 14 }}>← Treatments</Link>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Create Treatment Plan</h1>
      </div>

      {/* Step indicator */}
      <div style={{ display: 'flex', gap: 0 }}>
        {['Plan Details', 'Phases Setup', 'Review & Publish'].map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? '#1A5C38' : step === i + 1 ? '#1A5C38' : '#E1F2E8', color: step >= i + 1 ? '#fff' : '#707971', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{step > i + 1 ? '✓' : i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? '#1A5C38' : '#707971' }}>{s}</span>
            </div>
            {i < 2 && <div style={{ width: 40, height: 2, background: step > i + 1 ? '#1A5C38' : '#E1F2E8', margin: '0 8px' }} />}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {step === 1 && (
            <>
              <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>Plan Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Plan Name *</label>
                    <input value={form.planName} onChange={e => upd('planName', e.target.value)} placeholder="e.g. Nasal Polyp - Nasya Course" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Diagnosis *</label>
                    <input value={form.diagnosis} onChange={e => upd('diagnosis', e.target.value)} placeholder="Clinical diagnosis" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', color: '#111E18' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Start Date *</label>
                      <input type="date" value={form.startDate} onChange={e => upd('startDate', e.target.value)} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>End Date</label>
                      <input type="date" value={form.endDate} onChange={e => upd('endDate', e.target.value)} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Total Phases</label>
                      <select value={form.totalPhases} onChange={e => upd('totalPhases', e.target.value)} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', background: '#fff' }}>
                        {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid #E1F2E8' }}>Clinical Notes</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Dosha Assessment</label>
                    <textarea value={form.doshaAssessment} onChange={e => upd('doshaAssessment', e.target.value)} placeholder="Dosha imbalance analysis..." rows={3} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Internal Doctor Notes <span style={{ color: '#707971', fontWeight: 400 }}>(not visible to patient)</span></label>
                    <textarea value={form.clinicalNotes} onChange={e => upd('clinicalNotes', e.target.value)} placeholder="Private clinical observations..." rows={3} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Special Patient Instructions <span style={{ color: '#707971', fontWeight: 400 }}>(visible to patient)</span></label>
                    <textarea value={form.specialInstructions} onChange={e => upd('specialInstructions', e.target.value)} placeholder="Instructions the patient should follow..." rows={3} style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
              <p style={{ color: '#404941', fontWeight: 500, marginBottom: 8 }}>Phase setup</p>
              <p style={{ fontSize: 13, color: '#707971' }}>Save the plan first, then add phases from the treatment detail page.</p>
            </div>
          )}
          {step === 3 && (
            <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
              <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16 }}>Review & Publish</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[['Plan Name', form.planName || '—'], ['Diagnosis', form.diagnosis || '—'], ['Start Date', form.startDate || '—'], ['Total Phases', form.totalPhases]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0' }}>
                    <span style={{ fontSize: 13, color: '#707971' }}>{l}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111E18' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            {step > 1 && <button onClick={() => setStep(s => s - 1)} style={{ flex: 1, padding: '11px', background: '#fff', border: '1.5px solid #1A5C38', borderRadius: 10, color: '#1A5C38', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>← Back</button>}
            {step < 3
              ? <button onClick={() => setStep(s => s + 1)} style={{ flex: 2, padding: '11px', background: '#1A5C38', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Continue →</button>
              : <button style={{ flex: 2, padding: '11px', background: '#1A5C38', border: 'none', borderRadius: 10, color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Save & Publish to Patient</button>}
          </div>
        </div>

        {/* Patient sidebar */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20, height: 'fit-content' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#111E18', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #E1F2E8' }}>Patient</h3>
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#707971' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>👤</div>
            <p style={{ fontSize: 13 }}>Select a patient first</p>
            <Link href="/patients" style={{ display: 'inline-block', marginTop: 12, fontSize: 12, color: '#1A5C38', fontWeight: 600, textDecoration: 'none' }}>Browse patients →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
