'use client';
import { useState } from 'react';
import Link from 'next/link';

const TABS = ['All', 'Active', 'In Treatment', 'Completed'];

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Patients</h1>
        <Link href="/patients/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Add Patient</Link>
      </div>

      {/* Search + Filter */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#707971' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or ID..." style={{ width: '100%', paddingLeft: 38, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none', color: '#111E18', background: '#EDFDF3' }} />
          </div>
          <select style={{ padding: '9px 14px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, color: '#111E18', background: '#EDFDF3', outline: 'none' }}>
            <option>Sort: Last Visit</option>
            <option>Sort: Name</option>
            <option>Sort: Age</option>
          </select>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', paddingLeft: 20 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'transparent', color: tab === t ? '#1A5C38' : '#707971', borderBottom: tab === t ? '2px solid #1A5C38' : '2px solid transparent' }}>{t}</button>
          ))}
        </div>

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 1fr 120px', gap: 0 }}>
          <div style={{ display: 'contents' }}>
            {['Patient', 'Age / Gender', 'Active Treatment', 'Last Visit', 'Status', 'Actions'].map(h => (
              <div key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8', background: '#F8FDF9' }}>{h}</div>
            ))}
          </div>
        </div>

        {/* Empty state */}
        <div style={{ padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>👥</div>
          <p style={{ fontWeight: 600, color: '#404941', marginBottom: 6 }}>No patients found</p>
          <p style={{ fontSize: 13, marginBottom: 20 }}>Add your first patient to get started</p>
          <Link href="/patients/new" style={{ display: 'inline-block', background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Add Patient</Link>
        </div>
      </div>
    </div>
  );
}
