'use client';
import { useState } from 'react';
import Link from 'next/link';

const FILTER_TABS = ['All', 'Active', 'In Treatment', 'Completed'];

export default function PatientsPage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary-dark">Patients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your patient records</p>
        </div>
        <Link href="/patients/new" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          + Add Patient
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-outline-variant rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, phone, or patient ID..."
              className="w-full pl-9 pr-4 py-2.5 border border-outline rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {FILTER_TABS.map(tab => (
            <button
              key={tab} onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-primary text-white'
                  : 'bg-surface text-gray-600 hover:bg-green-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Table */}
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-outline-variant">
              <tr>
                {['Patient', 'Age / Gender', 'Active Treatment', 'Last Visit', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center text-gray-400">
                    <span className="text-5xl mb-3">👤</span>
                    <p className="font-medium text-gray-600">No patients found</p>
                    <p className="text-sm mt-1">Add your first patient to get started</p>
                    <Link href="/patients/new" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
                      + Add Patient
                    </Link>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
