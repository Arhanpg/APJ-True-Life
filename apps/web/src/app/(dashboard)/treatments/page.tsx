'use client';
import { useState } from 'react';
import Link from 'next/link';

const MOCK_TREATMENTS = [
  { id: '1', patientName: 'Ramesh Kumar', planName: 'Nasal Polyp — Nasya Course', phase: 2, totalPhases: 4, status: 'ACTIVE', startDate: '2026-05-01', progress: 50 },
  { id: '2', patientName: 'Priya Sharma', planName: 'Panchakarma Detox Program', phase: 1, totalPhases: 3, status: 'ACTIVE', startDate: '2026-06-01', progress: 33 },
  { id: '3', patientName: 'Anjali Mehta', planName: 'Stress Relief — Shirodhara', phase: 3, totalPhases: 3, status: 'COMPLETED', startDate: '2026-04-01', progress: 100 },
];

export default function TreatmentsPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered = MOCK_TREATMENTS.filter(t => filter === 'ALL' || t.status === filter);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>Treatment Plans</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage all active and completed treatment plans</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['ALL','ACTIVE','COMPLETED','CANCELLED'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
            style={filter === f ? { background: 'var(--primary)', color: 'white', borderColor: 'var(--primary)' } : { borderColor: '#C0C9BF', color: 'var(--text-muted)', background: 'white' }}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(t => (
          <div key={t.id} className="rounded-xl border p-5 flex items-center gap-6" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold" style={{ color: 'var(--primary-dark)' }}>{t.patientName}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium chip-${t.status.toLowerCase()}`}>{t.status}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>{t.planName}</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 max-w-xs">
                  <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
                    <span>Phase {t.phase} of {t.totalPhases}</span>
                    <span>{t.progress}%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'var(--surface-tint)' }}>
                    <div className="h-2 rounded-full transition-all" style={{ width: `${t.progress}%`, background: 'var(--secondary)' }} />
                  </div>
                </div>
                <span className="text-xs" style={{ color: 'var(--outline)' }}>Started {t.startDate}</span>
              </div>
            </div>
            <Link href={`/treatments/${t.id}`}
              className="px-4 py-2 rounded-lg text-sm font-medium border"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
