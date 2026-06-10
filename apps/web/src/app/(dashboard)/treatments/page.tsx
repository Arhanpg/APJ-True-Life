'use client';
import Link from 'next/link';

const STATUSES = ['All', 'Active', 'Completed', 'Cancelled'];
import { useState } from 'react';

export default function TreatmentsPage() {
  const [tab, setTab] = useState('All');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Treatments</h1>
        <Link href="/treatments/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
      </div>
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', paddingLeft: 16 }}>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setTab(s)} style={{ padding: '12px 18px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'transparent', color: tab === s ? '#1A5C38' : '#707971', borderBottom: tab === s ? '2px solid #1A5C38' : '2px solid transparent' }}>{s}</button>
          ))}
        </div>
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>📋</div>
          <p style={{ fontWeight: 600, color: '#404941', marginBottom: 6 }}>No treatment plans yet</p>
          <Link href="/treatments/new" style={{ display: 'inline-block', background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ New Treatment Plan</Link>
        </div>
      </div>
    </div>
  );
}
