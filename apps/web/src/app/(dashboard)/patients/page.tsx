'use client';
import { useState } from 'react';
import Link from 'next/link';

const FILTER_TABS = ['All', 'Active', 'In Treatment', 'Completed'];

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Patients</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 2 }}>Manage and view all patient records</p>
        </div>
        <Link href="/patients/new" style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>+ Add Patient</Link>
      </div>

      {/* Search + Filters */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#707971" strokeWidth="2" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search patients by name, phone, or ID…" style={{ width: '100%', border: '1.5px solid #C0C9BF', borderRadius: 8, padding: '9px 12px 9px 36px', fontSize: 13, outline: 'none', color: '#111E18', background: '#FAFAFA' }} />
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {FILTER_TABS.map(t => (
              <button key={t} onClick={() => setActiveFilter(t)} style={{ padding: '7px 14px', borderRadius: 8, border: activeFilter === t ? '1.5px solid #1A5C38' : '1.5px solid #C0C9BF', background: activeFilter === t ? '#EAF4EC' : '#fff', color: activeFilter === t ? '#1A5C38' : '#707971', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EDFDF3' }}>
              {['Patient', 'Age / Gender', 'Prakriti', 'Active Treatment', 'Last Visit', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '60px 20px', color: '#707971' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
                <p style={{ fontWeight: 500, color: '#404941', marginBottom: 6 }}>No patients found</p>
                <p style={{ fontSize: 13, marginBottom: 20 }}>Add your first patient to get started</p>
                <Link href="/patients/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '10px 22px', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>+ Add Patient</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
