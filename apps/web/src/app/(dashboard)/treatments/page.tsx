'use client';
import Link from 'next/link';
import { useState } from 'react';

const MOCK_TREATMENTS = [
  { id: '1', planName: 'Nasya Therapy – Nasal Polyp', patientName: 'Ravi Kumar', status: 'ACTIVE', totalPhases: 3, startDate: '2026-06-01' },
  { id: '2', planName: 'Panchakarma Detox', patientName: 'Priya Sharma', status: 'COMPLETED', totalPhases: 5, startDate: '2026-04-10' },
  { id: '3', planName: 'Abhyanga Course', patientName: 'Anita Rao', status: 'DRAFT', totalPhases: 2, startDate: '2026-06-15' },
];

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  ACTIVE:    { bg: '#EAF4EC', color: '#1A5C38' },
  COMPLETED: { bg: '#f3f4f6', color: '#6b7280' },
  DRAFT:     { bg: '#FFF8E1', color: '#B7791F' },
  CANCELLED: { bg: '#FEF2F2', color: '#BA1A1A' },
};

export default function TreatmentsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const filtered = MOCK_TREATMENTS.filter(t =>
    (filter === 'All' || t.status === filter.toUpperCase()) &&
    (t.planName.toLowerCase().includes(search.toLowerCase()) || t.patientName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#004324', fontFamily: 'Playfair Display, serif' }}>Treatment Plans</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage all patient treatment plans</p>
        </div>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment</Link>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {['All','Active','Completed','Draft','Cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 16px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none',
            background: filter === f ? '#1A5C38' : '#EDFDF3',
            color: filter === f ? '#fff' : '#404941',
          }}>{f}</button>
        ))}
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search treatments or patients…"
          style={{ marginLeft: 'auto', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '7px 14px', fontSize: 13, outline: 'none', minWidth: 240 }} />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EDFDF3' }}>
              {['Plan Name','Patient','Status','Phases','Start Date','Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#404941', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => {
              const s = STATUS_STYLES[t.status] || STATUS_STYLES.DRAFT;
              return (
                <tr key={t.id} style={{ borderBottom: '1px solid #E1F2E8', background: i % 2 === 0 ? '#fff' : '#FAFDFB' }}>
                  <td style={{ padding: '14px 16px', fontSize: 14, fontWeight: 600, color: '#111E18' }}>{t.planName}</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#404941' }}>{t.patientName}</td>
                  <td style={{ padding: '14px 16px' }}><span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>{t.status}</span></td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#404941' }}>{t.totalPhases} phases</td>
                  <td style={{ padding: '14px 16px', fontSize: 13, color: '#404941' }}>{t.startDate}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <Link href={`/treatments/${t.id}`} style={{ color: '#1A5C38', fontSize: 12, fontWeight: 600, textDecoration: 'none', marginRight: 12 }}>View</Link>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: '60px 16px', textAlign: 'center', color: '#707971' }}>No treatments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
