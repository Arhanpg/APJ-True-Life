'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PRAKRITI_OPTIONS = ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridoshic'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function NewPatientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: '', dateOfBirth: '', gender: '', bloodGroup: '',
    phoneNumber: '', email: '', address: '', emergencyContact: '', prakriti: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // TODO: POST to /api/v1/patients
      await new Promise(r => setTimeout(r, 800));
      router.push('/patients');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/patients" className="text-gray-400 hover:text-gray-600">← Patients</Link>
        <h1 className="text-2xl font-display font-bold text-primary-dark">Add New Patient</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white border border-outline-variant rounded-xl p-6 space-y-6">
        <div>
          <h2 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-outline-variant">Personal Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
              <input required value={form.fullName} onChange={e => update('fullName', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Patient's full name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
              <input required type="date" value={form.dateOfBirth} onChange={e => update('dateOfBirth', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
              <select required value={form.gender} onChange={e => update('gender', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
              <select value={form.bloodGroup} onChange={e => update('bloodGroup', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select blood group</option>
                {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
              <div className="flex">
                <span className="border border-r-0 border-outline rounded-l-lg px-3 py-2.5 text-sm bg-surface text-gray-500">+91</span>
                <input required value={form.phoneNumber} onChange={e => update('phoneNumber', e.target.value)}
                  className="flex-1 border border-outline rounded-r-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="10-digit number" maxLength={10} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Optional" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-outline-variant">Ayurvedic Profile</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prakriti (Body Type)</label>
            <select value={form.prakriti} onChange={e => update('prakriti', e.target.value)}
              className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select prakriti</option>
              {PRAKRITI_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-gray-700 mb-4 pb-2 border-b border-outline-variant">Contact Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea value={form.address} onChange={e => update('address', e.target.value)} rows={2}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Patient's address" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input value={form.emergencyContact} onChange={e => update('emergencyContact', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Emergency phone number" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Patient'}
          </button>
          <Link href="/patients" className="border border-outline px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-surface transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
