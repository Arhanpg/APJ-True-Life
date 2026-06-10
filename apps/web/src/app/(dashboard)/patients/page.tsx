'use client';
import { useState } from 'react';
import { PatientTable } from '@/components/patients/PatientTable';
import { NewPatientModal } from '@/components/patients/NewPatientModal';

const TABS = ['All', 'Active', 'In Treatment', 'Completed'];

export default function PatientsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>Patients</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage all patient records</p>
        </div>
        <button onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium"
          style={{ background: 'var(--primary)' }}>
          <span>+</span> Add Patient
        </button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, or patient ID..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm outline-none"
            style={{ borderColor: '#C0C9BF', background: 'var(--surface)' }} />
        </div>
        <div className="flex gap-1 p-1 rounded-lg" style={{ background: 'var(--surface-tint)' }}>
          {TABS.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-all"
              style={activeTab === t ? { background: 'var(--primary)', color: 'white' } : { color: 'var(--text-muted)' }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <PatientTable search={search} filter={activeTab} />
      {showModal && <NewPatientModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
