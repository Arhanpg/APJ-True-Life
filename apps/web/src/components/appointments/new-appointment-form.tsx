"use client";
import { patients } from "@/lib/mock-data";

export function NewAppointmentForm() {
  return (
    <div className="space-y-5">
      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Patient</span>
        <select className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary">
          <option value="">Select patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>{p.name} — {p.id}</option>
          ))}
        </select>
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-primary-dark">
          <span>Date</span>
          <input type="date" className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="space-y-2 text-sm font-medium text-primary-dark">
          <span>Time</span>
          <input type="time" className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary" />
        </label>
        <label className="space-y-2 text-sm font-medium text-primary-dark">
          <span>Type</span>
          <select className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary">
            <option>In-Clinic</option>
            <option>Online</option>
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-primary-dark">
          <span>Consultation Type</span>
          <select className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary">
            <option>General</option>
            <option>Panchakarma</option>
            <option>Follow-up</option>
          </select>
        </label>
      </div>
      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Purpose / Notes</span>
        <textarea
          rows={3}
          placeholder="Reason for appointment…"
          className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
    </div>
  );
}
