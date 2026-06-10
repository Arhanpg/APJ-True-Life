'use client';
import Link from 'next/link';
import { useState } from 'react';

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  ACTIVE: { bg: '#EAF4EC', color: '#1A5C38' },
  COMPLETED: { bg: '#E8E8E8', color: '#404941' },
  DRAFT: { bg: '#FFF8E1', color: '#8A6200' },
  CANCELLED: { bg: '#FFEBEE', color: '#BA1A1A' },
};

export default function TreatmentsPage() {
  const [filter, setFilter] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Treatment Plans</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage multi-phase Ayurvedic treatment plans</p>
        </div>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 8 }}>
        {['All', 'Active', 'Completed', 'Draft'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 16px', borderRadius: 8, border: filter === f ? '1.5px solid #1A5C38' : '1.5px solid #C0C9BF', background: filter === f ? '#EAF4EC' : '#fff', color: filter === f ? '#1A5C38' : '#707971', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{f}</button>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EDFDF3' }}>
              {['Plan Name', 'Patient', 'Diagnosis', 'Progress', 'Start Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px', color: '#707971' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🌿</div>
                <p style={{ fontWeight: 500, color: '#404941', marginBottom: 6 }}>No treatment plans yet</p>
                <p style={{ fontSize: 13, marginBottom: 20 }}>Create a treatment plan for a patient to get started</p>
                <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>+ Create Treatment Plan</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
