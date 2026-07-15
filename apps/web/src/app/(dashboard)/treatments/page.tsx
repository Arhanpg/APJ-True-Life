'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { treatmentsApi, type TreatmentPlan } from '@/lib/api';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  DRAFT:     { bg: '#F5F5F5', color: '#707971' },
  ACTIVE:    { bg: '#EAF4EC', color: '#1A5C38' },
  COMPLETED: { bg: '#E8F5E9', color: '#2E7D52' },
  CANCELLED: { bg: '#FFEBEE', color: '#BA1A1A' },
};

export default function TreatmentsPage() {
  const [treatments, setTreatments] = useState<TreatmentPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  async function fetchTreatments() {
    setLoading(true);
    try {
      const params = statusFilter ? { status: statusFilter } : {};
      const res = await treatmentsApi.list(params);
      const data = (res as any).data;
      setTreatments(data?.treatments || []);
    } catch (e: any) {
      setError(e.message || 'Failed to load treatments');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchTreatments(); }, [statusFilter]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Treatment Plans</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Multi-phase Ayurvedic treatment management</p>
        </div>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          + New Plan
        </Link>
      </div>

      {/* Status filter tabs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['', 'ACTIVE', 'DRAFT', 'COMPLETED', 'CANCELLED'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            style={{ padding: '7px 14px', borderRadius: 8, border: '1.5px solid', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              borderColor: statusFilter === s ? '#1A5C38' : '#E1F2E8',
              background: statusFilter === s ? '#1A5C38' : '#fff',
              color: statusFilter === s ? '#fff' : '#707971' }}>
            {s || 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#707971' }}>Loading…</div>
      ) : error ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#BA1A1A' }}>{error}</div>
      ) : treatments.length === 0 ? (
        <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🌿</div>
          <p style={{ color: '#707971', fontWeight: 500 }}>No treatment plans found</p>
          <Link href="/treatments/new" style={{ display: 'inline-block', marginTop: 16, background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '8px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
            Create Treatment Plan
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {treatments.map(t => {
            const statusStyle = STATUS_COLORS[t.status] || { bg: '#F5F5F5', color: '#707971' };
            return (
              <div key={t.id} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20, display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#111E18' }}>{t.planName}</span>
                    <span style={{ background: statusStyle.bg, color: statusStyle.color, borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>{t.status}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#707971', marginBottom: 8 }}>
                    <strong>Diagnosis:</strong> {t.diagnosis}
                  </p>
                  {t.doshaAssessment && (
                    <p style={{ fontSize: 13, color: '#707971', marginBottom: 8 }}>
                      <strong>Dosha:</strong> {t.doshaAssessment}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#707971' }}>
                    <span>📊 {t.totalPhases} phases</span>
                    <span>📅 {t.startDate ? new Date(t.startDate).toLocaleDateString('en-IN') : '—'}</span>
                    {t.endDate && <span>→ {new Date(t.endDate).toLocaleDateString('en-IN')}</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                  <Link href={`/treatments/${t.id}`} style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '7px 14px', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
