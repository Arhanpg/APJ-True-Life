"use client";
import { useState } from "react";

export function CompleteTreatmentModal({ onClose }: { onClose: () => void }) {
  const [consented, setConsented] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-outlinevariant bg-white p-8 shadow-card">
        <h2 className="text-2xl font-semibold text-primary-dark">Complete Treatment?</h2>
        <p className="mt-2 text-sm text-muted">Rahul Nair · Nasal Polyp - Nasya Course</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Preserved */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="mb-3 text-sm font-semibold text-success">✓ Data Preserved</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>✓ Treatment Plan Details</li>
              <li>✓ Assessment Images</li>
              <li>✓ Prescription History</li>
              <li>✓ Clinical Notes</li>
            </ul>
          </div>
          {/* Deleted */}
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
            <p className="mb-3 text-sm font-semibold text-error">✗ Data Deleted</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>✗ Doctor-Patient Chat Messages</li>
              <li>✗ Chat Attachments &amp; Media</li>
            </ul>
            <p className="mt-3 text-xs text-error">This cannot be undone. DPDP Act 2023 compliance.</p>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
            className="mt-0.5 rounded"
          />
          I understand that all chat messages and attachments will be permanently deleted and cannot be recovered.
        </label>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-outlinevariant py-3 text-sm font-medium hover:bg-surface-low"
          >
            Cancel
          </button>
          <button
            disabled={!consented}
            className="flex-1 rounded-xl bg-error py-3 text-sm font-medium text-white disabled:opacity-40"
          >
            Yes, Complete Treatment
          </button>
        </div>
      </div>
    </div>
  );
}
