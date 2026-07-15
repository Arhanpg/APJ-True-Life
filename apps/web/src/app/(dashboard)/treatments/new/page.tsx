'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { treatmentsApi } from '@/lib/api';

export default function NewTreatmentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    planName: '',
    patientId: '',
    doctorId: '',
    diagnosis: '',
    doshaAssessment: '',
    totalPhases: 1,
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    clinicalNotes: '',
    specialInstructions: '',
    status: 'DRAFT',
  });

  function update(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const plan = await treatmentsApi.create(form as any);
      router.push(`/treatments/${(plan as any).data?.id || (plan as any).id}`);
    } catch (e: any) {
      setError(e.message || 'Failed to create treatment plan');
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = { width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '10px 12px', fontSize: 14, outline: 'none', color: '#111E18', boxSizing: 'border-box' as const, background: '#fff' };
  const labelStyle = { display: 'block', fontSize: 13, fontWeight: 600, color: '#404941', marginBottom: 6 };

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>New Treatment Plan</h1>
        <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Create a multi-phase Ayurvedic treatment plan</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16 }}>Basic Information</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={labelStyle}>Plan Name *</label>
              <input style={inputStyle} required value={form.planName} onChange={e => update('planName', e.target.value)} placeholder="e.g., Panchakarma Detox Programme" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>Patient ID *</label>
                <input style={inputStyle} required value={form.patientId} onChange={e => update('patientId', e.target.value)} placeholder="Patient UUID" />
              </div>
              <div>
                <label style={labelStyle}>Doctor ID *</label>
                <input style={inputStyle} required value={form.doctorId} onChange={e => update('doctorId', e.target.value)} placeholder="Doctor UUID" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Diagnosis *</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} required value={form.diagnosis} onChange={e => update('diagnosis', e.target.value)} placeholder="Clinical diagnosis and assessment…" />
            </div>
            <div>
              <label style={labelStyle}>Dosha Assessment</label>
              <input style={inputStyle} value={form.doshaAssessment} onChange={e => update('doshaAssessment', e.target.value)} placeholder="e.g., Vata-Pitta imbalance" />
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16 }}>Schedule</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={labelStyle}>Total Phases *</label>
              <input style={inputStyle} type="number" min={1} max={20} required value={form.totalPhases} onChange={e => update('totalPhases', Number(e.target.value))} />
            </div>
            <div>
              <label style={labelStyle}>Start Date *</label>
              <input style={inputStyle} type="date" required value={form.startDate} onChange={e => update('startDate', e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>Expected End Date</label>
              <input style={inputStyle} type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} />
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#111E18', marginBottom: 16 }}>Clinical Notes</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            <div>
              <label style={labelStyle}>Clinical Notes</label>
              <textarea style={{ ...inputStyle, height: 100, resize: 'vertical' }} value={form.clinicalNotes} onChange={e => update('clinicalNotes', e.target.value)} placeholder="Detailed clinical observations, contraindications…" />
            </div>
            <div>
              <label style={labelStyle}>Special Instructions</label>
              <textarea style={{ ...inputStyle, height: 80, resize: 'vertical' }} value={form.specialInstructions} onChange={e => update('specialInstructions', e.target.value)} placeholder="Diet, lifestyle, and treatment-specific instructions…" />
            </div>
          </div>
        </div>

        {error && <div style={{ background: '#FFEBEE', border: '1px solid #FFCDD2', borderRadius: 8, padding: '10px 14px', fontSize: 13, color: '#BA1A1A' }}>{error}</div>}

        <div style={{ display: 'flex', gap: 12 }}>
          <button type="submit" disabled={loading}
            style={{ background: loading ? '#707971' : '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
            {loading ? 'Creating…' : 'Create Treatment Plan'}
          </button>
          <button type="button" onClick={() => router.back()}
            style={{ background: '#fff', color: '#404941', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '11px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
