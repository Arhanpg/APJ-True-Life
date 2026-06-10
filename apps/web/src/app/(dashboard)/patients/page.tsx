'use client';
import { useState } from 'react';
import Link from 'next/link';

const TABS = ['All', 'Active', 'In Treatment', 'Completed'];

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showNew, setShowNew] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Patients</h1>
        <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Patient</button>
      </div>

      {/* Filters */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, padding: 20 }}>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          {/* Search */}
          <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#707971' }}>🔍</span>
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, or ID..."
              style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, background: '#EDFDF3', borderRadius: 8, padding: 4 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                padding: '6px 14px', borderRadius: 6, border: 'none', fontSize: 12, fontWeight: 600, cursor: 'pointer',
                background: activeTab === t ? '#1A5C38' : 'transparent',
                color: activeTab === t ? '#fff' : '#404941',
              }}>{t}</button>
            ))}
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#EDFDF3' }}>
              {['Patient', 'Age / Gender', 'Active Treatment', 'Last Visit', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '10px 16px', fontSize: 11, fontWeight: 600, color: '#707971', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', padding: '60px 0', color: '#707971' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
                <p style={{ fontWeight: 500, color: '#404941', marginBottom: 8 }}>No patients yet</p>
                <p style={{ fontSize: 13, marginBottom: 16 }}>Add your first patient to get started</p>
                <button onClick={() => setShowNew(true)} style={{ background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>+ Add Patient</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* New Patient Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: 32, width: 540, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#004324', fontFamily: '"Playfair Display", serif' }}>New Patient Profile</h2>
              <button onClick={() => setShowNew(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#707971', fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[['Full Name *', 'text', 'Enter full name'], ['Date of Birth *', 'date', ''], ['Phone *', 'tel', '+91 XXXXX XXXXX'], ['Email', 'email', 'optional'], ['Address', 'text', 'Residential address'], ['Emergency Contact', 'tel', 'Phone number']].map(([label, type, ph]) => (
                <div key={label as string} style={{ gridColumn: label === 'Address' || label === 'Full Name *' ? 'span 2' : undefined }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>{label as string}</label>
                  <input type={type as string} placeholder={ph as string} style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box', outline: 'none' }} />
                </div>
              ))}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Gender *</label>
                <select style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }}>
                  <option value="">Select gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#404941', marginBottom: 6 }}>Prakriti</label>
                <select style={{ width: '100%', padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }}>
                  <option value="">Select prakriti</option>
                  <option>Vata</option><option>Pitta</option><option>Kapha</option>
                  <option>Vata-Pitta</option><option>Pitta-Kapha</option><option>Vata-Kapha</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button onClick={() => setShowNew(false)} style={{ flex: 1, background: '#EDFDF3', color: '#1A5C38', border: '1.5px solid #1A5C38', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button style={{ flex: 1, background: '#1A5C38', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', fontSize: 14, cursor: 'pointer', fontWeight: 600 }}>Create Patient</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
