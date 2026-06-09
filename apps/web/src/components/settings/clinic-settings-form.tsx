"use client";

const clinicFields = [
  { label: "Clinic Name", placeholder: "APJ TRUE LIFE Ayurvedic Medical Centre" },
  { label: "Phone", placeholder: "+91 XXXXXXXXXX" },
  { label: "Email", placeholder: "info@apjtruelife.com" },
  { label: "Address", placeholder: "Full clinic address" },
  { label: "Website", placeholder: "https://apjtruelife.com" },
];

const doctorFields = [
  { label: "Doctor Name", placeholder: "Dr. APJ Sharma" },
  { label: "Professional Title", placeholder: "Chief Vaidya" },
];

const services = [
  { name: "Panchakarma Therapy", duration: 90, price: "₹2500", active: true },
  { name: "Nasya Therapy", duration: 45, price: "₹800", active: true },
  { name: "Abhyanga Massage", duration: 60, price: "₹1200", active: true },
  { name: "Diet Consultation", duration: 30, price: "₹500", active: false },
];

export function ClinicSettingsForm() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      {/* Left: forms */}
      <div className="space-y-6">
        {/* Clinic info */}
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary-dark">Clinic Information</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {clinicFields.map((f) => (
              <label key={f.label} className="space-y-2 text-sm font-medium text-primary-dark">
                <span>{f.label}</span>
                <input
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Doctor profile */}
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary-dark">Doctor Profile</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {doctorFields.map((f) => (
              <label key={f.label} className="space-y-2 text-sm font-medium text-primary-dark">
                <span>{f.label}</span>
                <input
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
                />
              </label>
            ))}
          </div>
          <label className="mt-4 block space-y-2 text-sm font-medium text-primary-dark">
            <span>Doctor Bio (patient-visible)</span>
            <textarea
              rows={4}
              placeholder="Brief bio visible to patients in the mobile app…"
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        </div>

        {/* Services */}
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary-dark">Available Services</h2>
            <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">+ Add Service</button>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-outlinevariant">
                  {["Service", "Duration", "Price", "Active", ""].map((h) => (
                    <th key={h} className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.name} className="border-b border-outlinevariant/50 last:border-0">
                    <td className="py-4 font-medium text-onsurface">{s.name}</td>
                    <td className="py-4 text-muted">{s.duration} min</td>
                    <td className="py-4 text-muted">{s.price}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        s.active ? "bg-emerald-100 text-success" : "bg-slate-100 text-slate-500"
                      }`}>{s.active ? "Active" : "Hidden"}</span>
                    </td>
                    <td className="py-4">
                      <button className="text-xs text-primary hover:underline">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="rounded-xl bg-primary px-6 py-3 font-medium text-white hover:bg-primary-dark">Save Changes</button>
        </div>
      </div>

      {/* Right: live preview */}
      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <h2 className="text-xl font-semibold text-primary-dark">Patient App Preview</h2>
        <p className="mt-1 text-sm text-muted">This is how patients see your clinic in the mobile app.</p>
        <div className="mt-6 rounded-2xl bg-surface-tint p-5">
          <div className="h-16 w-16 rounded-full bg-primary" />
          <h3 className="mt-4 font-display text-xl font-bold text-primary-dark">APJ TRUE LIFE</h3>
          <p className="mt-1 text-sm text-muted">Chief Vaidya · Ayurvedic Medical Centre</p>
          <p className="mt-3 text-sm text-muted">
            Award-winning Ayurvedic practice focused on holistic recovery and evidence-based traditional medicine.
          </p>
          <div className="mt-4 space-y-2">
            {["Panchakarma Therapy", "Nasya Therapy", "Abhyanga Massage"].map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm text-muted">
                <span className="text-primary">•</span>{s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
