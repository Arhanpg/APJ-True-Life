'use client';
import { useState } from 'react';

const PRAKRITI = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridosha'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export function NewPatientModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ fullName: '', dob: '', gender: '', phone: '', email: '', address: '', prakriti: '', bloodGroup: '', emergencyContact: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-xl" style={{ background: 'var(--surface)' }}>
        {/* Header */}
        <div className="px-6 py-5 border-b flex items-center justify-between" style={{ borderColor: '#D4E8D8', background: 'var(--primary)' }}>
          <h2 className="font-display text-lg font-semibold text-white">Add New Patient</h2>
          <button onClick={onClose} className="text-white text-xl leading-none opacity-75 hover:opacity-100">×</button>
        </div>

        {saved ? (
          <div className="px-6 py-12 text-center">
            <div className="text-5xl mb-4">✅</div>
            <p className="font-semibold" style={{ color: 'var(--primary-dark)' }}>Patient profile created!</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>SMS invite will be sent to the patient.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[70vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Full Name *</label>
                <input value={form.fullName} onChange={set('fullName')} required placeholder="Patient full name"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
              </div>
              {/* DOB */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Date of Birth *</label>
                <input type="date" value={form.dob} onChange={set('dob')} required
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
              </div>
              {/* Gender */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Gender *</label>
                <select value={form.gender} onChange={set('gender')} required
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }}>
                  <option value="">Select gender</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              {/* Phone */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Mobile Number *</label>
                <div className="flex">
                  <span className="px-3 py-2.5 rounded-l-lg border border-r-0 text-sm" style={{ background: 'var(--surface-tint)', borderColor: '#C0C9BF' }}>+91</span>
                  <input value={form.phone} onChange={set('phone')} required placeholder="10-digit number"
                    className="flex-1 px-3 py-2.5 rounded-r-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
                </div>
              </div>
              {/* Email */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Email (optional)</label>
                <input type="email" value={form.email} onChange={set('email')} placeholder="patient@email.com"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
              </div>
              {/* Blood Group */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Blood Group</label>
                <select value={form.bloodGroup} onChange={set('bloodGroup')}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }}>
                  <option value="">Select blood group</option>
                  {BLOOD_GROUPS.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              {/* Prakriti */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Prakriti (Ayurvedic Body Type)</label>
                <select value={form.prakriti} onChange={set('prakriti')}
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }}>
                  <option value="">Select Prakriti</option>
                  {PRAKRITI.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              {/* Emergency Contact */}
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Emergency Contact</label>
                <input value={form.emergencyContact} onChange={set('emergencyContact')} placeholder="+91 XXXXXXXXXX"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none" style={{ borderColor: '#C0C9BF' }} />
              </div>
              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Address</label>
                <textarea value={form.address} onChange={set('address')} rows={2} placeholder="Full address"
                  className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none" style={{ borderColor: '#C0C9BF' }} />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t" style={{ borderColor: '#D4E8D8' }}>
              <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-lg border text-sm font-medium" style={{ borderColor: '#C0C9BF', color: 'var(--text-muted)' }}>Cancel</button>
              <button type="submit" disabled={saving} className="flex-1 py-2.5 rounded-lg text-white text-sm font-medium disabled:opacity-60" style={{ background: 'var(--primary)' }}>
                {saving ? 'Creating...' : 'Create Patient Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
