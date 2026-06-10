'use client';
import { useState } from 'react';
import Link from 'next/link';

const TABS = ['All', 'Active', 'In Treatment', 'Completed'];

const MOCK_PATIENTS = [
  { id: '1', fullName: 'Ravi Kumar', email: 'ravi@example.com', phone: '+91 98765 43210', age: 38, gender: 'Male', avatar: 'RK', activeTreatment: 'Nasya Course – Phase 2', lastVisit: '2024-06-05', status: 'Active', patientCode: 'ATL-1042' },
  { id: '2', fullName: 'Priya Sharma', email: 'priya@example.com', phone: '+91 87654 32109', age: 29, gender: 'Female', avatar: 'PS', activeTreatment: 'Panchakarma Detox', lastVisit: '2024-06-03', status: 'Active', patientCode: 'ATL-1089' },
  { id: '3', fullName: 'Mohan Das', email: 'mohan@example.com', phone: '+91 76543 21098', age: 55, gender: 'Male', avatar: 'MD', activeTreatment: '—', lastVisit: '2024-04-12', status: 'Completed', patientCode: 'ATL-0923' },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  Active: { bg: '#EAF4EC', color: '#1A5C38' },
  Completed: { bg: '#F5F5F5', color: '#707971' },
  Inactive: { bg: '#FFF8E7', color: '#856400' },
};

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('All');
  const [sort, setSort] = useState('Last Visit');

  const filtered = MOCK_PATIENTS
    .filter(p => tab === 'All' || p.status === tab.replace('In Treatment', 'Active'))
    .filter(p => !search || p.fullName.toLowerCase().includes(search.toLowerCase()) || p.phone.includes(search) || p.patientCode.includes(search));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Patients</h1>
        <Link href="/patients/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Add Patient</Link>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#707971' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, phone, or patient ID…" style={{ width: '100%', paddingLeft: 38, paddingRight: 12, paddingTop: 9, paddingBottom: 9, border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none', color: '#111E18', background: '#EDFDF3' }} />
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '9px 14px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, color: '#111E18', background: '#EDFDF3', outline: 'none' }}>
            <option>Sort: Last Visit</option>
            <option>Sort: Name</option>
            <option>Sort: Age</option>
          </select>
        </div>

        <div style={{ display: 'flex', borderBottom: '1px solid #E1F2E8', paddingLeft: 20 }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer', background: 'transparent', color: tab === t ? '#1A5C38' : '#707971', borderBottom: tab === t ? '2px solid #1A5C38' : '2px solid transparent' }}>{t}</button>
          ))}
        </div>

        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 1fr 140px', padding: '10px 16px', fontSize: 11, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1px solid #E1F2E8', background: '#F8FDF9', gap: 8 }}>
          {['Patient', 'Age / Gender', 'Active Treatment', 'Last Visit', 'Status', 'Actions'].map(h => <span key={h}>{h}</span>)}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#707971' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>👥</div>
            <p style={{ fontWeight: 600, color: '#404941', marginBottom: 6 }}>No patients found</p>
            <Link href="/patients/new" style={{ display: 'inline-block', background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 20px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>+ Add Patient</Link>
          </div>
        ) : (
          <div>
            {filtered.map(p => (
              <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1fr 1fr 140px', padding: '14px 16px', borderBottom: '1px solid #F0F7F2', alignItems: 'center', fontSize: 13, color: '#111E18', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{p.avatar}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#111E18' }}>{p.fullName}</p>
                    <p style={{ fontSize: 11, color: '#707971' }}>{p.patientCode} · {p.email}</p>
                  </div>
                </div>
                <span style={{ color: '#404941' }}>{p.age}y · {p.gender}</span>
                <span style={{ color: '#404941', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.activeTreatment}</span>
                <span style={{ color: '#707971', fontSize: 12 }}>{new Date(p.lastVisit).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: STATUS_STYLE[p.status].bg, color: STATUS_STYLE[p.status].color, width: 'fit-content' }}>{p.status}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Link href={`/patients/${p.id}`} style={{ border: '1px solid #1A5C38', color: '#1A5C38', background: 'transparent', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>View</Link>
                  <Link href={`/treatments/new?patient=${p.id}`} style={{ border: '1px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>+ Plan</Link>
                  <Link href="/chat" style={{ border: '1px solid #C0C9BF', color: '#404941', background: 'transparent', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, textDecoration: 'none' }}>Chat</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
