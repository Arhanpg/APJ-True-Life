'use client';
import { useState } from 'react';
import Link from 'next/link';

const PRESCRIPTIONS = [
  {
    id: 'p1', patientName: 'Ravi Kumar', patientCode: 'ATL-1042', patientAvatar: 'RK',
    treatmentName: 'Nasya Course – Phase 2', phase: 'Phase 2 – Nasya Therapy',
    date: '2024-06-08', medicines: [
      { name: 'Anu Thailam', dosage: '2 drops each nostril', frequency: 'Morning', timing: 'Empty stomach' },
      { name: 'Kanchanara Guggulu', dosage: '2 tablets', frequency: 'Twice daily', timing: 'After food' },
    ],
  },
  {
    id: 'p2', patientName: 'Priya Menon', patientCode: 'ATL-1087', patientAvatar: 'PM',
    treatmentName: 'Panchakarma Detox', phase: 'Phase 1 – Purvakarma',
    date: '2024-06-05', medicines: [
      { name: 'Triphala Churna', dosage: '5g', frequency: 'Twice daily', timing: 'After food' },
      { name: 'Dashamoola Kashayam', dosage: '15ml + warm water', frequency: 'Morning', timing: 'Empty stomach' },
    ],
  },
  {
    id: 'p3', patientName: 'Ravi Kumar', patientCode: 'ATL-1042', patientAvatar: 'RK',
    treatmentName: 'Nasya Course – Phase 1', phase: 'Phase 1 – Purvakarma',
    date: '2024-05-01', medicines: [
      { name: 'Triphala Churna', dosage: '5g', frequency: 'Twice daily', timing: 'After food' },
    ],
  },
];

export default function PrescriptionsPage() {
  const [search, setSearch] = useState('');
  const [filterPatient, setFilterPatient] = useState('All');

  const patients = ['All', ...Array.from(new Set(PRESCRIPTIONS.map(p => p.patientName)))];
  const filtered = PRESCRIPTIONS.filter(p => {
    const matchSearch = p.patientName.toLowerCase().includes(search.toLowerCase()) ||
      p.treatmentName.toLowerCase().includes(search.toLowerCase());
    const matchPatient = filterPatient === 'All' || p.patientName === filterPatient;
    return matchSearch && matchPatient;
  });

  const inputStyle: React.CSSProperties = {
    padding: '9px 12px', border: '1.5px solid #C0C9BF', borderRadius: 8,
    fontSize: 13, outline: 'none', color: '#111E18', background: '#fff',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#004324' }}>Prescriptions</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>All prescribed medicines across active treatment plans.</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <svg style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#707971' }}
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by patient or treatment…"
            style={{ ...inputStyle, paddingLeft: 32, width: '100%' }}
          />
        </div>
        <select value={filterPatient} onChange={e => setFilterPatient(e.target.value)}
          style={{ ...inputStyle, minWidth: 160 }}>
          {patients.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Prescriptions list */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: 40 }}>💊</p>
          <p style={{ fontFamily: 'Playfair Display, serif', fontSize: 18, color: '#004324', marginTop: 8 }}>No prescriptions found</p>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>Try changing your search or filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(rx => (
            <div key={rx.id} style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #E1F2E8', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1A5C38', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>{rx.patientAvatar}</span>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: 15, fontWeight: 700, color: '#004324' }}>{rx.patientName}</span>
                      <span style={{ fontSize: 11, color: '#707971' }}>{rx.patientCode}</span>
                    </div>
                    <p style={{ fontSize: 12, color: '#707971', marginTop: 1 }}>{rx.treatmentName} · {rx.phase}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 12, color: '#707971' }}>{new Date(rx.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                  <button style={{ background: '#EDFDF3', color: '#1A5C38', border: 'none', borderRadius: 7, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    PDF
                  </button>
                </div>
              </div>

              {/* Medicines table */}
              <div style={{ padding: '12px 20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #F0F7F2' }}>
                      {['Medicine', 'Dosage', 'Frequency', 'Timing'].map(h => (
                        <th key={h} style={{ padding: '6px 8px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rx.medicines.map((m, i) => (
                      <tr key={i} style={{ borderBottom: i < rx.medicines.length - 1 ? '1px solid #F8FDF9' : 'none' }}>
                        <td style={{ padding: '9px 8px', fontWeight: 600, color: '#004324' }}>{m.name}</td>
                        <td style={{ padding: '9px 8px', color: '#404941' }}>{m.dosage}</td>
                        <td style={{ padding: '9px 8px', color: '#404941' }}>{m.frequency}</td>
                        <td style={{ padding: '9px 8px', color: '#404941' }}>{m.timing}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
