'use client';
import { useState } from 'react';
import Link from 'next/link';

const STATUSES = ['All', 'Active', 'Completed', 'Cancelled'];

const MOCK_TREATMENTS = [
  { id: '1', patientName: 'Ravi Kumar', patientCode: 'ATL-1042', avatar: 'RK', planName: 'Nasya Course – Phase 2', diagnosis: 'Chronic Sinusitis', status: 'ACTIVE', phase: '2 of 3', progress: 65, startDate: '2024-05-01' },
  { id: '2', patientName: 'Priya Sharma', patientCode: 'ATL-1089', avatar: 'PS', planName: 'Panchakarma Detox', diagnosis: 'Digestive Disorders', status: 'ACTIVE', phase: '1 of 4', progress: 20, startDate: '2024-05-20' },
  { id: '3', patientName: 'Mohan Das', patientCode: 'ATL-0923', avatar: 'MD', planName: 'Spine & Joint Care', diagnosis: 'Lumbar Spondylosis', status: 'COMPLETED', phase: '2 of 2', progress: 100, startDate: '2023-11-15' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: '#EAF4EC', color: '#1A5C38' },
  COMPLETED: { bg: '#F5F5F5', color: '#707971' },
  CANCELLED: { bg: '#FFF5F5', color: '#BA1A1A' },
};

export default function TreatmentsPage() {
  const [tab, setTab] = useState('All');
  const filtered = tab === 'All' ? MOCK_TREATMENTS : MOCK_TREATMENTS.filter(t => t.status === tab.toUpperCase());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Treatment Plans</h1>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', paddingLeft: 16 }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setTab(s)} style={{ padding: '12px 18px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'transparent', color: tab === s ? '#1A5C38' : '#707971', borderBottom: tab === s ? '2px solid #1A5C38' : '2px solid transparent' }}>{s}</button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
            <p style={{ fontWeight: 600, color: '#404941', marginBottom: 6 }}>No treatment plans</p>
            <Link href="/treatments/new" style={{ display: 'inline-block', background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map(t => (
              <div key={t.id} style={{ padding: '16px 20px', borderBottom: '1px solid #F0F7F2', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>{t.avatar}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 2 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#111E18' }}>{t.planName}</p>
                    <span style={{ background: STATUS_STYLE[t.status].bg, color: STATUS_STYLE[t.status].color, borderRadius: 999, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{t.status}</span>
                  </div>
                  <p style={{ fontSize: 12, color: '#707971' }}>{t.patientName} · {t.patientCode} · Diagnosis: {t.diagnosis}</p>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ flex: 1, maxWidth: 200 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 10, color: '#707971' }}>Phase {t.phase}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: '#1A5C38' }}>{t.progress}%</span>
                      </div>
                      <div style={{ background: '#E1F2E8', borderRadius: 999, height: 5 }}>
                        <div style={{ background: '#1A5C38', borderRadius: 999, height: '100%', width: `${t.progress}%` }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 12, color: '#707971' }}>Started {new Date(t.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <Link href={`/treatments/${t.id}`} style={{ border: '1px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>View →</Link>
                  <Link href={`/chat`} style={{ border: '1px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 6, padding: '6px 12px', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>Chat</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
