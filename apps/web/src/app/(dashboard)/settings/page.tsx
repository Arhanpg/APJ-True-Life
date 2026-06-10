'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [clinicForm, setClinicForm] = useState({
    name: 'APJ TRUE LIFE', tagline: 'Ayurvedic Excellence', address: '', phone: '', email: '', website: '',
  });
  const [doctorForm, setDoctorForm] = useState({
    fullName: '', professionalTitle: 'Chief Vaidya', bio: '',
  });
  const [saved, setSaved] = useState(false);

  function updateClinic(f: string, v: string) { setClinicForm(p => ({ ...p, [f]: v })); }
  function updateDoctor(f: string, v: string) { setDoctorForm(p => ({ ...p, [f]: v })); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    await new Promise(r => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-primary-dark">Clinic Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your clinic information and doctor profile</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-4 text-sm">
          ✅ Settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Clinic Info */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 pb-2 border-b border-outline-variant">Clinic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
              <input value={clinicForm.name} onChange={e => updateClinic('name', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input value={clinicForm.tagline} onChange={e => updateClinic('tagline', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input value={clinicForm.phone} onChange={e => updateClinic('phone', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Clinic phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={clinicForm.email} onChange={e => updateClinic('email', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Clinic email" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea value={clinicForm.address} onChange={e => updateClinic('address', e.target.value)} rows={2}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Full clinic address" />
            </div>
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="bg-white border border-outline-variant rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 pb-2 border-b border-outline-variant">Doctor Profile</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input value={doctorForm.fullName} onChange={e => updateDoctor('fullName', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Dr. APJ Sharma" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Professional Title</label>
              <input value={doctorForm.professionalTitle} onChange={e => updateDoctor('professionalTitle', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio <span className="text-xs text-gray-400">(Visible to patients)</span></label>
              <textarea value={doctorForm.bio} onChange={e => updateDoctor('bio', e.target.value)} rows={3}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Brief bio visible to patients in the app..." />
            </div>
          </div>
        </div>

        <button type="submit" className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors">
          Save All Changes
        </button>
      </form>
    </div>
  );
}
