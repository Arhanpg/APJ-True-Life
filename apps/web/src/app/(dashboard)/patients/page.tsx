'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { patientsApi, type Patient } from '@/lib/api';

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  async function fetchPatients() {
    setLoading(true);
    try {
      if (search.trim()) {
        const results = await patientsApi.search(search);
        setPatients(results);
        setTotalPages(1);
      } else {
        const res = await patientsApi.list(page, 20);
        const data = res.data as any;
        setPatients(data.patients || []);
        setTotalPages(data.totalPages || 0);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchPatients(); }, [page, search]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 700, color: '#004324' }}>Patients</h1>
          <p style={{ fontSize: 13, color: '#707971', marginTop: 4 }}>All registered patients</p>
        </div>
        <Link href="/patients/new" style={{ background: '#1A5C38', color: '#fff', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          + Add Patient
        </Link>
      </div>

      {/* Search */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 10, padding: '12px 16px' }}>
        <input
          type="text"
          placeholder="Search by name, phone, or email…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
          style={{ width: '100%', border: 'none', outline: 'none', fontSize: 14, color: '#111E18' }}
        />
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #E1F2E8', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F4FAF6', borderBottom: '1px solid #E1F2E8' }}>
              {['Name', 'Phone', 'Email', 'Blood Group', 'Consent', 'Registered', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#707971', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#707971' }}>Loading…</td></tr>
            ) : error ? (
              <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#BA1A1A' }}>{error}</td></tr>
            ) : patients.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#707971' }}>
                  <div style={{ fontSize: 40, marginBottom: 8 }}>👤</div>
                  <p>No patients found</p>
                </td>
              </tr>
            ) : (
              patients.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #F0F7F2' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, background: '#EAF4EC', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#1A5C38' }}>
                        {(p.name || '?')[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: '#111E18' }}>{p.name || '—'}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>{p.phone || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>{p.email || '—'}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#404941' }}>{p.bloodGroup || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: p.consentGiven ? '#E8F5E9' : '#FFEBEE', color: p.consentGiven ? '#1A5C38' : '#BA1A1A', borderRadius: 6, padding: '3px 8px', fontSize: 12, fontWeight: 600 }}>
                      {p.consentGiven ? 'Given' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#707971' }}>
                    {p.createdAt ? new Date(p.createdAt).toLocaleDateString('en-IN') : '—'}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Link href={`/patients/${p.id}`} style={{ fontSize: 12, color: '#1A5C38', textDecoration: 'none', fontWeight: 600 }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div style={{ padding: '12px 16px', display: 'flex', gap: 8, justifyContent: 'flex-end', borderTop: '1px solid #E1F2E8' }}>
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E1F2E8', cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.5 : 1 }}>← Prev</button>
            <span style={{ padding: '6px 12px', fontSize: 13, color: '#707971' }}>Page {page + 1} of {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #E1F2E8', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page >= totalPages - 1 ? 0.5 : 1 }}>Next →</button>
          </div>
        )}
      </div>
    </div>
  );
}
