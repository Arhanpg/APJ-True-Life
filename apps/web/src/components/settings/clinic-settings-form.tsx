"use client";

import { useState } from "react";
import { clinicServices } from "@/lib/mock-data";
import type { ClinicService } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

export function ClinicSettingsForm() {
  const [services, setServices] = useState<ClinicService[]>(clinicServices);

  const toggle = (id: string) =>
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      {/* Left: Forms */}
      <div className="space-y-6">
        {/* Clinic Info */}
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#004324]">Clinic Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["Clinic Name", "Phone", "Email", "City / Address"].map((f) => (
              <label key={f} className="block space-y-1.5 text-sm font-medium text-[#111E18]">
                {f}
                <input
                  className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#1A5C38]/30"
                  placeholder={`Enter ${f.toLowerCase()}`}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Doctor Profile */}
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#004324]">Doctor Profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {["Full Name", "Professional Title"].map((f) => (
              <label key={f} className="block space-y-1.5 text-sm font-medium text-[#111E18]">
                {f}
                <input
                  className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#1A5C38]/30"
                  placeholder={`Enter ${f.toLowerCase()}`}
                />
              </label>
            ))}
          </div>
          <label className="mt-4 block space-y-1.5 text-sm font-medium text-[#111E18]">
            Bio{" "}
            <span className="font-normal text-[#707971]">(visible to patients in app)</span>
            <textarea
              rows={4}
              className="mt-1 block w-full resize-none rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal outline-none focus:ring-2 focus:ring-[#1A5C38]/30"
              placeholder="Write a patient-facing bio for the clinic profile..."
            />
          </label>
        </div>

        {/* Services */}
        <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#004324]">Available Services</h2>
            <button className="rounded-xl bg-[#1A5C38] px-4 py-2 text-sm font-medium text-white">
              + Add Service
            </button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#E1F2E8] text-[#404941]">
                  <th className="pb-3 font-medium">Service</th>
                  <th className="pb-3 font-medium">Duration</th>
                  <th className="pb-3 font-medium">Price</th>
                  <th className="pb-3 font-medium">Active</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E1F2E8]">
                {services.map((svc) => (
                  <tr key={svc.id}>
                    <td className="py-3.5 font-medium text-[#111E18]">{svc.name}</td>
                    <td className="py-3.5 text-[#404941]">{svc.duration}</td>
                    <td className="py-3.5 font-mono text-xs text-[#404941]">{svc.price}</td>
                    <td className="py-3.5">
                      <button
                        onClick={() => toggle(svc.id)}
                        className={`relative h-6 w-11 rounded-full transition-colors ${
                          svc.active ? "bg-[#1A5C38]" : "bg-[#C0C9BF]"
                        }`}
                        aria-label={`Toggle ${svc.name}`}
                      >
                        <span
                          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                            svc.active ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </td>
                    <td className="py-3.5">
                      <div className="flex gap-2">
                        <button className="text-[#404941] hover:text-[#1A5C38]" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
                        <button className="text-[#404941] hover:text-[#BA1A1A]" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="rounded-xl bg-[#1A5C38] px-5 py-2.5 text-sm font-medium text-white">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="rounded-2xl border border-[#C0C9BF] bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#004324]">Patient App Preview</h2>
        <p className="mt-1 text-sm text-[#707971]">Live preview of how the clinic profile appears in the patient mobile app.</p>
        <div className="mt-5 rounded-2xl bg-[#EDFDF3] p-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1A5C38] text-2xl font-bold text-white">
            APJ
          </div>
          <h3 className="mt-4 text-lg font-semibold text-[#004324]">APJ TRUE LIFE</h3>
          <p className="text-sm text-[#404941]">Ayurvedic Medical Centre — AYUSH TV National Health Award 2024</p>
          <div className="mt-5 space-y-2">
            {services
              .filter((s) => s.active)
              .map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-xl bg-white p-3 text-sm">
                  <span className="font-medium text-[#111E18]">{s.name}</span>
                  <span className="font-mono text-xs text-[#404941]">{s.price}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
