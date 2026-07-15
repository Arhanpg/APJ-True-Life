'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { treatmentsApi, type TreatmentPlan, type TreatmentPhase } from '@/lib/api';

const PHASE_STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  SCHEDULED:   { bg: '#FFF8E7', color: '#C9A84C' },
  IN_PROGRESS: { bg: '#E3F2FD', color: '#1565C0' },
  COMPLETED:   { bg: '#E8F5E9', color: '#2E7D52' },
};

export default function TreatmentDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [plan, setPlan] = useState<TreatmentPlan | null>(null);
  const [phases, setPhases] = useState<TreatmentPhase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function fetchTreatment() {
    if (!id) return;
    setLoading(true);
    try {
      const res = await treatmentsApi.get(id);
      const data = (res as any).data || res;
      setPlan(data.plan || data);
      setPhases(data.phases || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load treatment');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTreatment(); }, [id]);

  async function updatePhaseStatus(phaseId: string, status: string) {
    setUpdatingId(phaseId);
    try {
      await treatmentsApi.updatePhaseStatus(phaseId, status);
      await fetchTreatment();
    } catch (e: any) {
      alert(`Failed to update phase: ${e.message}`);
    } finally {
      setUpdatingId(null);
    }
  }

  async function updatePlanStatus(status: string) {
    if (!id) return;
    try {
      await treatmentsApi.updateStatus(id, status);
      await fetchTreatment();
    } catch (e: any) {
      alert(`Failed to update plan: ${e.message}`);
    }
  }

  if (loading) return <div style={{ padding: 40, textAlign: 'center', color: '#707971' }}>Loading treatment plan…</div>;
  if (error) return <div style={{ padding: 40, textAlign: 'center', color: '#BA1A1A' }}>{error}</div>;
  if (!plan) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>{plan.planName}</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Started: {plan.startDate ? new Date(plan.startDate).toLocaleDateString('en-IN') : '—'}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {plan.status === 'DRAFT' && (
            <button onClick={() => updatePlanStatus('ACTIVE')}
              style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              ▶ Activate Plan
            </button>
          )}
          {plan.status === 'ACTIVE' && (
            <button onClick={() => updatePlanStatus('COMPLETED')}
              style={{ background: '#2E7D52', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              ✓ Complete Plan
            </button>
          )}
        </div>
      </div>

      {/* Plan details */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 14 }}>Clinical Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: 12, color: '#707971', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Diagnosis</p>
            <p style={{ fontSize: 14, color: '#111E18' }}>{plan.diagnosis}</p>
          </div>
          {plan.doshaAssessment && (
            <div>
              <p style={{ fontSize: 12, color: '#707971', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Dosha Assessment</p>
              <p style={{ fontSize: 14, color: '#111E18' }}>{plan.doshaAssessment}</p>
            </div>
          )}
          {plan.clinicalNotes && (
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ fontSize: 12, color: '#707971', fontWeight: 600, textTransform: 'uppercase', marginBottom: 4 }}>Clinical Notes</p>
              <p style={{ fontSize: 14, color: '#111E18', lineHeight: 1.6 }}>{plan.clinicalNotes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Phases */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18' }}>Treatment Phases ({phases.length}/{plan.totalPhases})</h2>
        </div>
        {phases.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#707971' }}>No phases added yet</div>
        ) : (
          phases.map((phase, idx) => {
            const statusStyle = PHASE_STATUS_COLORS[phase.status] || { bg: '#F5F5F5', color: '#707971' };
            return (
              <div key={phase.id} style={{ padding: 20, borderBottom: idx < phases.length - 1 ? '1px solid #F0F7F2' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ background: '#1A5C38', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                        {phase.phaseNumber}
                      </span>
                      <span style={{ fontWeight: 700, color: '#111E18' }}>{phase.name}</span>
                      <span style={{ background: statusStyle.bg, color: statusStyle.color, borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{phase.status}</span>
                    </div>
                    {phase.description && <p style={{ fontSize: 13, color: '#707971', paddingLeft: 34, marginBottom: 4 }}>{phase.description}</p>}
                    {phase.phaseGoal && <p style={{ fontSize: 13, color: '#404941', paddingLeft: 34 }}><strong>Goal:</strong> {phase.phaseGoal}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {phase.status === 'SCHEDULED' && (
                      <button onClick={() => updatePhaseStatus(phase.id, 'IN_PROGRESS')} disabled={updatingId === phase.id}
                        style={{ background: '#1565C0', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                        ▶ Start
                      </button>
                    )}
                    {phase.status === 'IN_PROGRESS' && (
                      <button onClick={() => updatePhaseStatus(phase.id, 'COMPLETED')} disabled={updatingId === phase.id}
                        style={{ background: '#2E7D52', color: '#fff', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, cursor: 'pointer', fontWeight: 600 }}>
                        ✓ Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
