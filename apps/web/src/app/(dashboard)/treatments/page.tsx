'use client';
import Link from 'next/link';

const STATUS_COLORS: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-700',
  DRAFT: 'bg-gray-100 text-gray-600',
  COMPLETED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
};

export default function TreatmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-primary-dark">Treatment Plans</h1>
          <p className="text-gray-500 text-sm mt-1">All patient treatment plans</p>
        </div>
        <Link href="/treatments/new" className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          + New Treatment Plan
        </Link>
      </div>

      <div className="bg-white border border-outline-variant rounded-xl">
        <div className="p-5 border-b border-outline-variant">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {['All', 'Active', 'Draft', 'Completed', 'Cancelled'].map(t => (
              <button key={t} className="px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap bg-primary text-white first:block hidden first:inline-block">
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-10 flex flex-col items-center text-gray-400">
          <span className="text-5xl mb-3">📋</span>
          <p className="font-medium text-gray-600">No treatment plans yet</p>
          <p className="text-sm mt-1">Create a treatment plan for a patient</p>
          <Link href="/treatments/new" className="mt-4 bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-dark transition-colors">
            + Create Treatment Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
