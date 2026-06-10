'use client';
import { useState } from 'react';

export default function SettingsPage() {
  const [clinicName, setClinicName] = useState('APJ TRUE LIFE Ayurvedic Medical Centre');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('123, Ayurveda Marg, Bengaluru, Karnataka 560001');
  const [saved, setSaved] = useState(false);

  const services = [
    { name: 'General Consultation', duration: 45, price: 500, active: true },
    { name: 'Panchakarma Therapy', duration: 90, price: 2000, active: true },
    { name: 'Nasya Treatment', duration: 60, price: 1200, active: true },
    { name: 'Shirodhara', duration: 75, price: 1800, active: true },
    { name: 'Abhyanga Massage', duration: 60, price: 1500, active: false },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--primary-dark)' }}>Clinic Settings</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Manage your clinic information and services</p>
      </div>

      {saved && (
        <div className="p-3 rounded-lg text-sm" style={{ background: '#EAF4EC', color: 'var(--primary)' }}>✅ Settings saved successfully.</div>
      )}

      {/* Clinic Info */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
        <h2 className="font-semibold mb-4" style={{ color: 'var(--primary-dark)' }}>Clinic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Clinic Name</label>
            <input value={clinicName} onChange={e => setClinicName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Address</label>
            <textarea value={address} onChange={e => setAddress(e.target.value)} rows={2}
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style={{ borderColor: '#C0C9BF' }} />
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="rounded-xl border p-6" style={{ background: 'var(--surface)', borderColor: '#D4E8D8' }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Available Services</h2>
          <button className="text-sm font-medium px-3 py-1.5 rounded-lg" style={{ background: 'var(--surface-tint)', color: 'var(--primary)' }}>+ Add Service</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ background: 'var(--surface-tint)' }}>
                {['Service Name','Duration','Price (INR)','Status','Actions'].map(h => (
                  <th key={h} className="text-left px-3 py-2 text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {services.map((s, i) => (
                <tr key={i} className="border-t" style={{ borderColor: '#E8F5E9' }}>
                  <td className="px-3 py-3 text-sm font-medium">{s.name}</td>
                  <td className="px-3 py-3 text-sm" style={{ color: 'var(--text-muted)' }}>{s.duration} min</td>
                  <td className="px-3 py-3 text-sm">₹{s.price.toLocaleString('en-IN')}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.active ? 'chip-active' : 'chip-completed'}`}>{s.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs px-2 py-1 rounded" style={{ background: 'var(--surface-tint)', color: 'var(--primary)' }}>Edit</button>
                      <button className="text-xs px-2 py-1 rounded" style={{ background: '#FFEBEE', color: 'var(--error)' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="px-6 py-2.5 rounded-lg text-white text-sm font-medium" style={{ background: 'var(--primary)' }}>Save All Changes</button>
      </div>
    </div>
  );
}
