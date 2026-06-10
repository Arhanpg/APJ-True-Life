'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const [phases, setPhases] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#707971' }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none' }}>Treatments</Link>
        <span>/</span>
        <span style={{ color: '#111E18' }}>New Treatment Plan</span>
      </div>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Create Treatment Plan</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111E18', marginBottom: 20 }}>Plan Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Treatment Plan Name *</label>
                <input placeholder="e.g. Nasal Polyp - Nasya Course" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Diagnosis *</label>
                <input placeholder="Clinical diagnosis" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Start Date *</label>
                <input type="date" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>End Date (Estimated)</label>
                <input type="date" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Total Phases *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button onClick={() => setPhases(p => Math.max(1, p - 1))} style={{ width: 32, height: 32, borderRadius: 8, border: '1.5px solid #C0C9BF', background: '#fff', cursor: 'pointer', fontSize: 16 }}>−</button>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#1A5C38', minWidth: 24, textAlign: 'center' }}>{phases}</span>
                  <button onClick={() => setPhases(p => p + 1)} style={{ width: 32, height: 32, borderRadius: 8, border: '1.5px solid #C0C9BF', background: '#fff', cursor: 'pointer', fontSize: 16 }}>+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Notes */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111E18', marginBottom: 4 }}>Clinical Notes</h3>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Internal notes — not visible to patient</p>
            <textarea placeholder="Dosha assessment, clinical observations, internal notes..." rows={5} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          {/* Patient Instructions */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111E18', marginBottom: 4 }}>Special Patient Instructions</h3>
            <p style={{ fontSize: 12, color: '#707971', marginBottom: 16 }}>Visible to patient on their app</p>
            <textarea placeholder="Special instructions for the patient..." rows={4} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, resize: 'vertical', boxSizing: 'border-box', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/treatments" style={{ flex: 1, textAlign: 'center', background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Cancel</Link>
            <button style={{ flex: 2, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Save & Publish to Patient</button>
          </div>
        </div>

        {/* Patient selector sidebar */}
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20, height: 'fit-content' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#111E18', marginBottom: 16 }}>Select Patient</h3>
          <input placeholder="Search patient..." style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none', marginBottom: 12 }} />
          <div style={{ textAlign: 'center', padding: '24px 0', color: '#707971' }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>👤</div>
            <p style={{ fontSize: 13 }}>Search to select a patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}
