'use client';
import { useState } from 'react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const HOURS = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

export default function AppointmentsPage() {
  const [view, setView] = useState<'calendar' | 'list'>('calendar');
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary-dark">Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your appointment calendar</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          + New Appointment
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-outline-variant rounded-xl p-4">
        <div className="flex gap-2">
          {['All', 'Confirmed', 'Pending', 'Cancelled'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary text-white' : 'bg-surface text-gray-600 hover:bg-green-50'
              }`}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 border border-outline-variant rounded-lg overflow-hidden">
          <button onClick={() => setView('calendar')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'calendar' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-surface'}`}>
            📅 Calendar
          </button>
          <button onClick={() => setView('list')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${view === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-surface'}`}>
            📋 List
          </button>
        </div>
      </div>

      {view === 'calendar' ? (
        <div className="bg-white border border-outline-variant rounded-xl overflow-hidden">
          <div className="grid grid-cols-8 border-b border-outline-variant">
            <div className="p-3" />
            {DAYS.map(d => (
              <div key={d} className="p-3 text-center text-sm font-semibold text-gray-600 border-l border-outline-variant">{d}</div>
            ))}
          </div>
          {HOURS.map(h => (
            <div key={h} className="grid grid-cols-8 border-b border-outline-variant last:border-0">
              <div className="p-3 text-xs text-gray-400">{h}</div>
              {DAYS.map(d => (
                <div key={d} className="border-l border-outline-variant min-h-[48px] hover:bg-surface/50 cursor-pointer transition-colors" />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-outline-variant rounded-xl">
          <div className="p-10 flex flex-col items-center text-gray-400">
            <span className="text-5xl mb-3">📅</span>
            <p className="font-medium text-gray-600">No appointments found</p>
            <p className="text-sm mt-1">Create your first appointment</p>
            <button className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
              + New Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
