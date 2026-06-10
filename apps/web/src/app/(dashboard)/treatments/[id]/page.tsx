'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const MOCK_TREATMENT = {
  id: '1',
  patientName: 'Ravi Kumar', patientCode: 'ATL-1042', patientAvatar: 'RK',
  planName: 'Nasya Course – Phase 2', diagnosis: 'Chronic Sinusitis', status: 'ACTIVE',
  startDate: '2024-05-01', endDate: '2024-07-15', totalPhases: 3, completedPhases: 1, currentPhase: 2,
  progress: 65,
  specialInstructions: 'Avoid cold water, cold food. Sleep before 10 PM. Morning warm water with ginger.',
  phases: [
    {
      id: 'p1', number: 1, name: 'Purvakarma – Preparation', status: 'COMPLETED',
      goal: 'Prepare the body for main Panchakarma therapies through oil massage and steam.',
      procedures: ['Abhyanga (full body oil massage)', 'Svedana (steam therapy)', 'Dietary adjustments'],
      medicines: [{ name: 'Triphala Churna', dosage: '5g', frequency: 'Twice daily', timing: 'After food' }],
      diet: { consume: ['Warm water', 'Ghee', 'Light khichdi'], avoid: ['Cold drinks', 'Heavy meals', 'Dairy'] },
    },
    {
      id: 'p2', number: 2, name: 'Nasya Therapy', status: 'IN_PROGRESS',
      goal: 'Administer medicated oil through nasal passages to cleanse and rejuvenate.',
      procedures: ['Pratimarsha Nasya (daily oil drops)', 'Shiro Abhyanga (head massage)', 'Nasya with Anu Thailam'],
      medicines: [
        { name: 'Anu Thailam', dosage: '2 drops each nostril', frequency: 'Morning', timing: 'Empty stomach' },
        { name: 'Kanchanara Guggulu', dosage: '2 tablets', frequency: 'Twice daily', timing: 'After food' },
      ],
      diet: { consume: ['Warm herbal tea', 'Steam-cooked vegetables', 'Sesame seeds'], avoid: ['Cold water', 'Curd', 'Banana'] },
    },
    {
      id: 'p3', number: 3, name: 'Paschatkarma – Rejuvenation', status: 'SCHEDULED',
      goal: 'Strengthen and rejuvenate the body after the main treatment.',
      procedures: ['Rasayana therapy', 'Yoga & Pranayama sessions', 'Dietary re-introduction'],
      medicines: [{ name: 'Chyawanprash', dosage: '10g', frequency: 'Morning', timing: 'With warm milk' }],
      diet: { consume: ['Fresh fruits', 'Milk with turmeric', 'Light grains'], avoid: ['Processed food', 'Alcohol', 'Spicy food'] },
    },
  ],
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  COMPLETED: { bg: '#F5F5F5', color: '#707971' },
  IN_PROGRESS: { bg: '#EAF4EC', color: '#1A5C38' },
  SCHEDULED: { bg: '#FFF8E7', color: '#856400' },
};

export default function TreatmentDetailPage() {
  const params = useParams();
  const t = MOCK_TREATMENT;
  const [activeTab, setActiveTab] = useState<number>(t.currentPhase - 1);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [completionConsent, setCompletionConsent] = useState(false);
  const [addNote, setAddNote] = useState('');
  const phase = t.phases[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#707971' }}>
        <Link href="/treatments" style={{ color: '#707971', textDecoration: 'none' }}>Treatments</Link>
        <span>/</span>
        <Link href={`/patients/1`} style={{ color: '#707971', textDecoration: 'none' }}>{t.patientName}</Link>
        <span>/</span>
        <span style={{ color: '#111E18', fontWeight: 600 }}>{t.planName}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20, alignItems: 'start' }}>
        {/* Main */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Header */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#004324' }}>{t.planName}</h1>
                  <span style={{ background: '#EAF4EC', color: '#1A5C38', borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>ACTIVE · Phase {t.currentPhase} of {t.totalPhases}</span>
                </div>
                <p style={{ fontSize: 13, color: '#707971' }}>Diagnosis: {t.diagnosis}</p>
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#707971' }}>Overall Progress</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1A5C38' }}>{t.progress}%</span>
                  </div>
                  <div style={{ background: '#E1F2E8', borderRadius: 999, height: 8 }}>
                    <div style={{ background: '#1A5C38', borderRadius: 999, height: '100%', width: `${t.progress}%`, transition: 'width 0.3s' }} />
                  </div>
                </div>
              </div>
              <button onClick={() => setShowCompleteModal(true)}
                style={{ background: 'rgba(186,26,26,0.08)', color: '#BA1A1A', border: '1px solid rgba(186,26,26,0.2)', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                ✅ Complete Treatment
              </button>
            </div>

            {/* Special Instructions */}
            {t.specialInstructions && (
              <div style={{ marginTop: 14, background: '#EDFDF3', borderRadius: 8, padding: '10px 14px', fontSize: 12, color: '#1A5C38', borderLeft: '3px solid #1A5C38' }}>
                <span style={{ fontWeight: 600 }}>Patient Instructions: </span>{t.specialInstructions}
              </div>
            )}
          </div>

          {/* Phase Tabs */}
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', overflowX: 'auto' }}>
              {t.phases.map((p, i) => (
                <button key={p.id} onClick={() => setActiveTab(i)}
                  style={{ padding: '12px 20px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', background: activeTab === i ? '#EDFDF3' : 'transparent', color: activeTab === i ? '#1A5C38' : '#707971', borderBottom: activeTab === i ? '2px solid #1A5C38' : '2px solid transparent', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: STATUS_COLORS[p.status].bg, color: STATUS_COLORS[p.status].color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flexShrink: 0 }}>{p.number}</span>
                  {p.name}
                  {p.status === 'COMPLETED' && <span style={{ fontSize: 12 }}>✓</span>}
                </button>
              ))}
              <button style={{ marginLeft: 'auto', padding: '12px 16px', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'transparent', color: '#1A5C38', whiteSpace: 'nowrap' }}>+ Add Phase</button>
            </div>

            <div style={{ padding: 24 }}>
              {/* Phase Status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ background: STATUS_COLORS[phase.status].bg, color: STATUS_COLORS[phase.status].color, borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700 }}>
                  {phase.status === 'IN_PROGRESS' ? '🔄 IN PROGRESS' : phase.status === 'COMPLETED' ? '✅ COMPLETED' : '⏳ SCHEDULED'}
                </span>
                <p style={{ fontSize: 13, color: '#707971', fontStyle: 'italic' }}>{phase.goal}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {/* Procedures */}
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 10 }}>Step-by-Step Procedures</h3>
                  {phase.procedures.map((proc, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#1A5C38', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                      <p style={{ fontSize: 13, color: '#404941', lineHeight: 1.5 }}>{proc}</p>
                    </div>
                  ))}
                </div>

                {/* Medicines */}
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 10 }}>Prescribed Medicines</h3>
                  {phase.medicines.map((m, i) => (
                    <div key={i} style={{ background: '#F8FDF9', borderRadius: 8, padding: '10px 14px', marginBottom: 8, border: '1px solid #E1F2E8' }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: '#004324' }}>{m.name}</p>
                      <p style={{ fontSize: 12, color: '#707971', marginTop: 2 }}>{m.dosage} · {m.frequency} · {m.timing}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Diet */}
              <div style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Diet Guidelines</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#1A5C38', marginBottom: 8 }}>✅ To Consume</p>
                    {phase.diet.consume.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                        <span style={{ color: '#1A5C38', fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 13, color: '#404941' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: 12, fontWeight: 700, color: '#BA1A1A', marginBottom: 8 }}>❌ To Avoid</p>
                    {phase.diet.avoid.map(item => (
                      <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
                        <span style={{ color: '#BA1A1A', fontSize: 14 }}>✗</span>
                        <span style={{ fontSize: 13, color: '#404941' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clinical Note */}
              <div style={{ marginTop: 20, borderTop: '1px solid #E1F2E8', paddingTop: 16 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 10 }}>Add Clinical Note</h3>
                <textarea value={addNote} onChange={e => setAddNote(e.target.value)} rows={3} placeholder="Document observations, patient response, adjustments…" style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none', resize: 'vertical' } as React.CSSProperties} />
                <button style={{ marginTop: 8, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Save Note</button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontSize: 13, fontWeight: 700 }}>{t.patientAvatar}</span>
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>{t.patientName}</p>
                <p style={{ fontSize: 11, color: '#707971' }}>{t.patientCode}</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Phases Completed', `${t.completedPhases} / ${t.totalPhases}`], ['Start Date', new Date(t.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })], ['End Date', new Date(t.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ color: '#707971' }}>{k}</span>
                  <span style={{ fontWeight: 600, color: '#111E18' }}>{v}</span>
                </div>
              ))}
            </div>
            <Link href={`/patients/1`} style={{ display: 'block', marginTop: 14, border: '1.5px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 8, padding: '7px', fontSize: 12, fontWeight: 600, textDecoration: 'none', textAlign: 'center' }}>View Patient Profile →</Link>
          </div>
          <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: '#111E18', marginBottom: 12 }}>Phase Timeline</h3>
            {t.phases.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', gap: 12, marginBottom: i < t.phases.length - 1 ? 16 : 0, alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', background: STATUS_COLORS[p.status].bg, border: `2px solid ${STATUS_COLORS[p.status].color}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: STATUS_COLORS[p.status].color }}>{p.status === 'COMPLETED' ? '✓' : p.number}</span>
                  </div>
                  {i < t.phases.length - 1 && <div style={{ width: 2, height: 20, background: '#E1F2E8', marginTop: 2 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: p.status === 'IN_PROGRESS' ? 700 : 500, color: p.status === 'IN_PROGRESS' ? '#1A5C38' : '#404941' }}>{p.name}</p>
                  <p style={{ fontSize: 10, color: '#707971', marginTop: 1 }}>{p.status.replace('_', ' ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Treatment Modal */}
      {showCompleteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 520, maxWidth: '90vw', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#111E18', marginBottom: 6 }}>Complete Treatment?</h2>
            <p style={{ fontSize: 13, color: '#707971', marginBottom: 20 }}>Patient: <strong>{t.patientName}</strong> · Plan: <strong>{t.planName}</strong></p>

            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#1A5C38', marginBottom: 8 }}>✅ Will be preserved:</p>
              {['Treatment Plan Details', 'Assessment Images', 'Prescription History', 'Clinical Notes'].map(item => (
                <p key={item} style={{ fontSize: 13, color: '#404941', marginBottom: 4 }}>✓ {item}</p>
              ))}
            </div>

            <div style={{ background: '#FFF5F5', border: '1px solid #FFCDD2', borderRadius: 8, padding: '12px 16px', marginBottom: 20 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#BA1A1A', marginBottom: 6 }}>🗑️ Will be permanently deleted:</p>
              {['Doctor-Patient Chat Messages', 'All Chat Attachments & Media'].map(item => (
                <p key={item} style={{ fontSize: 13, color: '#BA1A1A', marginBottom: 4 }}>■ {item}</p>
              ))}
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 24 }}>
              <input type="checkbox" checked={completionConsent} onChange={e => setCompletionConsent(e.target.checked)} style={{ width: 16, height: 16, marginTop: 2, accentColor: '#1A5C38', flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: '#404941', lineHeight: 1.5 }}>I understand that chat messages and attachments cannot be recovered after completion.</span>
            </label>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => { setShowCompleteModal(false); setCompletionConsent(false); }}
                style={{ flex: 1, border: '1.5px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button disabled={!completionConsent}
                style={{ flex: 2, background: completionConsent ? '#BA1A1A' : '#C0C9BF', color: '#fff', border: 'none', borderRadius: 8, padding: '11px', fontSize: 14, fontWeight: 700, cursor: completionConsent ? 'pointer' : 'not-allowed', transition: 'background 0.2s' }}>
                Yes, Complete Treatment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
