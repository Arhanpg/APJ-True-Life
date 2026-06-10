'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewTreatmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    planName: '', diagnosis: '', startDate: '', endDate: '',
    totalPhases: '1', clinicalNotes: '', doshaAssessment: '',
    specialInstructions: '',
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
      // TODO: POST to /api/v1/treatments
      await new Promise(r => setTimeout(r, 800));
      router.push('/treatments');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/treatments" className="text-gray-400 hover:text-gray-600">← Treatments</Link>
        <h1 className="text-2xl font-display font-bold text-primary-dark">Create Treatment Plan</h1>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-outline-variant rounded-xl p-6 space-y-5">
          <h2 className="font-semibold text-gray-700 pb-2 border-b border-outline-variant">Plan Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name <span className="text-red-500">*</span></label>
              <input required value={form.planName} onChange={e => update('planName', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Nasal Polyp — Nasya Course" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis <span className="text-red-500">*</span></label>
              <input required value={form.diagnosis} onChange={e => update('diagnosis', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Clinical diagnosis" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
              <input required type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated End Date</label>
              <input type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Phases <span className="text-red-500">*</span></label>
              <input required type="number" min="1" max="20" value={form.totalPhases}
                onChange={e => update('totalPhases', e.target.value)}
                className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-700 pb-2 border-b border-outline-variant">Clinical Notes <span className="text-xs text-gray-400 font-normal">(Internal — not visible to patient)</span></h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosha Assessment</label>
            <textarea value={form.doshaAssessment} onChange={e => update('doshaAssessment', e.target.value)} rows={3}
              className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Describe the dosha imbalance and assessment..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clinical Notes</label>
            <textarea value={form.clinicalNotes} onChange={e => update('clinicalNotes', e.target.value)} rows={4}
              className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Detailed clinical notes for this treatment plan..." />
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-6">
          <h2 className="font-semibold text-gray-700 pb-2 mb-4 border-b border-outline-variant">Patient Instructions <span className="text-xs text-gray-400 font-normal">(Visible to patient in app)</span></h2>
          <textarea value={form.specialInstructions} onChange={e => update('specialInstructions', e.target.value)} rows={3}
            className="w-full border border-outline rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Special instructions visible to the patient in the mobile app..." />
        </div>

        <div className="flex gap-3">
          <button type="submit" disabled={loading}
            className="bg-primary text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-60">
            {loading ? 'Creating...' : 'Create & Publish to Patient'}
          </button>
          <Link href="/treatments" className="border border-outline px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-surface transition-colors">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
