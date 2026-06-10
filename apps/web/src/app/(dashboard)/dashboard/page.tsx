'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const kpis = [
  { label: 'Active Patients', value: '—', trend: '+0 this week', color: 'bg-green-50 border-green-200', icon: '👤' },
  { label: "Today's Appointments", value: '—', trend: '0 pending', color: 'bg-blue-50 border-blue-200', icon: '📅' },
  { label: 'Unread Messages', value: '—', trend: '0 new', color: 'bg-amber-50 border-amber-200', icon: '💬' },
  { label: 'Completed Treatments', value: '—', trend: 'this week', color: 'bg-purple-50 border-purple-200', icon: '✅' },
];

export default function DashboardPage() {
  const [time, setTime] = useState('');
  useEffect(() => {
    setTime(new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary-dark">Good Morning, Doctor 👋</h1>
          <p className="text-gray-500 text-sm mt-1">{time}</p>
        </div>
        <div className="flex gap-3">
          <Link href="/treatments/new" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
            + New Treatment
          </Link>
          <Link href="/appointments" className="border border-primary text-primary px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
            View Calendar
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(k => (
          <div key={k.label} className={`border rounded-xl p-5 ${k.color}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{k.icon}</span>
              <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{k.trend}</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">{k.value}</p>
            <p className="text-sm text-gray-500 mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="xl:col-span-2 bg-white border border-outline-variant rounded-xl">
          <div className="p-5 border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Today's Schedule</h2>
            <Link href="/appointments" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="p-5">
            <div className="flex flex-col items-center py-8 text-gray-400">
              <span className="text-4xl mb-3">📅</span>
              <p className="font-medium">No appointments today</p>
              <p className="text-sm mt-1">Book an appointment to get started</p>
              <Link href="/appointments" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
                + Book Appointment
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white border border-outline-variant rounded-xl">
          <div className="p-5 border-b border-outline-variant flex items-center justify-between">
            <h2 className="font-semibold text-gray-800">Recent Messages</h2>
            <Link href="/chat" className="text-sm text-primary hover:underline">View all</Link>
          </div>
          <div className="p-5">
            <div className="flex flex-col items-center py-8 text-gray-400">
              <span className="text-4xl mb-3">💬</span>
              <p className="font-medium">No messages yet</p>
              <p className="text-sm mt-1">Messages appear when patients start a treatment</p>
            </div>
          </div>
        </div>
      </div>

      {/* Active Treatments */}
      <div className="bg-white border border-outline-variant rounded-xl">
        <div className="p-5 border-b border-outline-variant flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Active Treatment Plans</h2>
          <Link href="/treatments" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="p-5">
          <div className="flex flex-col items-center py-8 text-gray-400">
            <span className="text-4xl mb-3">📋</span>
            <p className="font-medium">No active treatments</p>
            <p className="text-sm mt-1">Create a treatment plan for a patient to begin</p>
            <Link href="/treatments/new" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
              + New Treatment Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
