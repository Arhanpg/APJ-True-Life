'use client';
import { useState } from 'react';
import Link from 'next/link';

const STATUSES = ['All', 'Active', 'Draft', 'Completed', 'Cancelled'];

export default function TreatmentsPage() {
  const [status, setStatus] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Treatment Plans</h1>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 4, background: '#EDFDF3', borderRadius: 8, padding: 4, width: 'fit-content' }}>
        {STATUSES.map(s => (
          <button key={s} onClick={() => setStatus(s)} style={{
            padding: '6px 16px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: status === s ? '#1A5C38' : 'transparent',
            color: status === s ? '#fff' : '#404941',
          }}>{s}</button>
        ))}
      </div>

      {/* Empty state */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, color: '#404941', marginBottom: 8 }}>No treatment plans yet</h3>
        <p style={{ fontSize: 14, color: '#707971', marginBottom: 24 }}>Create a multi-phase Ayurvedic treatment plan for your patients</p>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '10px 24px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>Create First Treatment Plan</Link>
      </div>
    </div>
  );
}
