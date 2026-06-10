'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const PLAN = {
  id: '1', patientName: 'Ramesh Kumar', patientCode: 'ATL-0001',
  planName: 'Nasal Polyp — Nasya Course', diagnosis: 'Nasal polyp with chronic sinusitis. Vata-Kapha imbalance.',
  status: 'ACTIVE', totalPhases: 4, startDate: '2026-05-01', endDate: '2026-07-31',
  specialInstructions: 'Avoid cold beverages and dairy products throughout the treatment.',
  phases: [
    { number: 1, name: 'Purvakarma — Preparation', status: 'COMPLETED', goal: 'Prepare the body for main Panchakarma procedures.', medicines: [{ name: 'Triphala Churna', dosage: '5g', frequency: 'Once daily', timing: 'Bedtime with warm water' }], diet: [{ type: 'CONSUME', item: 'Warm soups, ginger tea, light khichdi' }, { type: 'AVOID', item: 'Dairy, cold drinks, fried food' }] },
    { number: 2, name: 'Nasya Therapy', status: 'IN_PROGRESS', goal: 'Clear nasal passages and reduce polyp inflammation using medicated oils.', medicines: [{ name: 'Anu Thailam', dosage: '2 drops each nostril', frequency: 'Twice daily', timing: 'Morning and evening on empty stomach' }, { name: 'Kanchanara Guggulu', dosage: '2 tablets', frequency: 'Twice daily', timing: 'After food' }], diet: [{ type: 'CONSUME', item: 'Warm water, tulsi tea, pomegranate juice' }, { type: 'AVOID', item: 'Cold water, ice cream, bananas, curd' }] },
    { number: 3, name: 'Rasayana — Rejuvenation', status: 'SCHEDULED', goal: 'Strengthen immune system and prevent recurrence.', medicines: [], diet: [] },
    { number: 4, name: 'Maintenance', status: 'SCHEDULED', goal: 'Long-term maintenance with lifestyle guidance.', medicines: [], diet: [] },
  ]
};

export default function TreatmentDetailPage() {
  const [activePhase, setActivePhase] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'medicines' | 'diet'>('details');
  const phase = PLAN.phases[activePhase];

  const STATUS_STYLE: Record<string, string> = { COMPLETED: 'chip-completed', IN_PROGRESS: 'chip-progress', SCHEDULED: 'chip-pending' };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/patients" style={{ color: 'var(--primary)' }}>Patients</Link>
        <span>/</span>
        <Link href={`/patients/ATL-0001`} style={{ color: 'var(--primary)' }}>{PLAN.patientName}</Link>
        <span>/</span>
        <span>{PLAN.planName}</span>
      </div>

      {/* Header */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="font-display text-xl font-bold" style={{ color: 'var(--primary-dark)' }}>{PLAN.planName}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full chip-active font-medium">{PLAN.status}</span>
            </div>
            <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{PLAN.diagnosis}</p>
            <p className="text-xs" style={{ color: 'var(--outline)' }}>{PLAN.startDate} → {PLAN.endDate} · {PLAN.totalPhases} phases</p>
            {PLAN.specialInstructions && (
              <div className="mt-3 p-3 rounded-lg text-xs" style={{ background: '#FFF3E0', color: '#E65100' }}>
                ⚠️ {PLAN.specialInstructions}
              </div>
            )}
          </div>
          <button className="px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ background: 'var(--error)' }}>Complete Treatment</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Phase list */}
        <div className="space-y-2">
          {PLAN.phases.map((p, i) => (
            <button key={i} onClick={() => setActivePhase(i)}
              className="w-full text-left px-4 py-3 rounded-xl border transition-all"
              style={activePhase === i ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' } : { background: 'var(--surface)', borderColor: '#D4E8D8', color: 'var(--text)' }}>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold">Phase {p.number}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${activePhase !== i ? STATUS_STYLE[p.status] : 'bg-white/20 text-white'}`}>{p.status.replace('_', ' ')}</span>
              </div>
              <p className={`text-xs ${activePhase === i ? 'text-green-100' : ''}`} style={activePhase !== i ? { color: 'var(--text-muted)' } : {}}>{p.name}</p>
            </button>
          ))}
          <button className="w-full px-4 py-3 rounded-xl border border-dashed text-sm text-center transition-all" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>+ Add Phase</button>
        </div>

        {/* Phase detail */}
        <div className="md:col-span-3 rounded-xl border" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
          <div className="px-5 py-4 border-b" style={{ borderColor: '#E8F5E9' }}>
            <h2 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Phase {phase.number}: {phase.name}</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{phase.goal}</p>
          </div>

          {/* Tab bar */}
          <div className="flex border-b" style={{ borderColor: '#E8F5E9' }}>
            {(['details','medicines','diet'] as const).map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                className="px-5 py-3 text-sm font-medium border-b-2 transition-all capitalize"
                style={activeTab === t ? { borderColor: 'var(--primary)', color: 'var(--primary)' } : { borderColor: 'transparent', color: 'var(--text-muted)' }}>
                {t}
              </button>
            ))}
          </div>

          <div className="p-5">
            {activeTab === 'details' && (
              <div>
                <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Phase goal and clinical notes.</p>
                <div className="p-4 rounded-lg text-sm" style={{ background: 'var(--surface-tint)', color: 'var(--text)' }}>{phase.goal || 'No details added.'}</div>
              </div>
            )}

            {activeTab === 'medicines' && (
              <div className="space-y-3">
                {phase.medicines.length === 0 ? (
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No medicines added for this phase.</p>
                ) : phase.medicines.map((m, i) => (
                  <div key={i} className="p-4 rounded-lg border" style={{ borderColor: '#D4E8D8' }}>
                    <p className="font-medium text-sm" style={{ color: 'var(--primary-dark)' }}>{m.name}</p>
                    <div className="mt-2 grid grid-cols-3 gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span>Dosage: <strong>{m.dosage}</strong></span>
                      <span>Frequency: <strong>{m.frequency}</strong></span>
                      <span>Timing: <strong>{m.timing}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'diet' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--secondary)' }}>✓ To Consume</h3>
                  {phase.diet.filter(d => d.type === 'CONSUME').map((d, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-sm" style={{ color: 'var(--text)' }}>{d.item}</span>
                    </div>
                  ))}
                  {phase.diet.filter(d => d.type === 'CONSUME').length === 0 && <p className="text-xs" style={{ color: 'var(--outline)' }}>None added.</p>}
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-2" style={{ color: 'var(--error)' }}>✗ To Avoid</h3>
                  {phase.diet.filter(d => d.type === 'AVOID').map((d, i) => (
                    <div key={i} className="flex items-start gap-2 py-1.5">
                      <span className="text-red-500 mt-0.5">✗</span>
                      <span className="text-sm" style={{ color: 'var(--text)' }}>{d.item}</span>
                    </div>
                  ))}
                  {phase.diet.filter(d => d.type === 'AVOID').length === 0 && <p className="text-xs" style={{ color: 'var(--outline)' }}>None added.</p>}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
