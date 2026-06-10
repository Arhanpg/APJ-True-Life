'use client';

export default function ArchivePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-primary-dark">Completed Treatments</h1>
        <p className="text-gray-500 text-sm mt-1">Archive of all completed treatment plans</p>
      </div>
      <div className="bg-white border border-outline-variant rounded-xl">
        <div className="p-10 flex flex-col items-center text-gray-400">
          <span className="text-5xl mb-3">🗂️</span>
          <p className="font-medium text-gray-600">No completed treatments yet</p>
          <p className="text-sm mt-1">Completed treatment plans will appear here</p>
          <div className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
            ℹ️ Chat messages are deleted when a treatment is marked as completed.
          </div>
        </div>
      </div>
    </div>
  );
}
