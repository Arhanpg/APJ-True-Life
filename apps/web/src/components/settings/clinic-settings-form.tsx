"use client";

const clinicFields = [
  { label: "Clinic Name", placeholder: "APJ TRUE LIFE Ayurvedic Medical Centre" },
  { label: "Phone", placeholder: "+91 9876543210" },
  { label: "Email", placeholder: "clinic@apjtruelife.com" },
  { label: "Address", placeholder: "Full clinic address" },
  { label: "Doctor Name", placeholder: "Dr. APJ Sharma" },
  { label: "Professional Title", placeholder: "Chief Vaidya & Clinical Director" },
];

const services = [
  { name: "General Consultation", duration: "30 min", price: "₹500" },
  { name: "Panchakarma Therapy", duration: "90 min", price: "₹2,500" },
  { name: "Nasya Treatment", duration: "45 min", price: "₹1,200" },
  { name: "Abhyanga Massage", duration: "60 min", price: "₹1,800" },
];

export function ClinicSettingsForm() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Clinic Info */}
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary-dark">Clinic Information</h2>
          <p className="mt-1 text-sm text-muted">Details visible to patients on the mobile app.</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {clinicFields.map((field) => (
              <label key={field.label} className="block space-y-2 text-sm font-medium text-primary-dark">
                <span>{field.label}</span>
                <input
                  className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
                  placeholder={field.placeholder}
                />
              </label>
            ))}
          </div>
          <label className="mt-4 block space-y-2 text-sm font-medium text-primary-dark">
            <span>Doctor Bio</span>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
              placeholder="Patient-visible Ayurvedic doctor biography and expertise"
            />
          </label>
          <button className="mt-5 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark">
            Save Changes
          </button>
        </div>

        {/* Live Preview */}
        <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
          <h2 className="text-xl font-semibold text-primary-dark">Live Preview</h2>
          <p className="mt-1 text-sm text-muted">How patients see your clinic in the app.</p>
          <div className="mt-5 rounded-2xl bg-surface-low p-5">
            <div className="h-16 w-16 rounded-full bg-primary" />
            <h3 className="mt-4 text-lg font-semibold text-primary-dark">APJ TRUE LIFE</h3>
            <p className="text-sm text-muted">Ayurvedic Excellence &middot; AYUSH TV Award 2024</p>
            <p className="mt-3 text-sm text-muted">
              Award-winning Ayurvedic medical centre focused on holistic, evidence-based care.
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>• Panchakarma Therapy</p>
              <p>• Nasya Treatment</p>
              <p>• Dietetics &amp; Nutrition</p>
              <p>• Yoga Integration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="rounded-2xl border border-outlinevariant bg-white p-6 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary-dark">Available Services</h2>
          <button className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-dark">
            Add Service
          </button>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-outlinevariant text-xs uppercase tracking-wider text-muted">
                <th className="pb-3 pr-4">Service Name</th>
                <th className="pb-3 pr-4">Duration</th>
                <th className="pb-3 pr-4">Price</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.name} className="border-b border-outlinevariant/50 last:border-0">
                  <td className="py-4 pr-4 font-medium text-onsurface">{service.name}</td>
                  <td className="py-4 pr-4 text-muted">{service.duration}</td>
                  <td className="py-4 pr-4 font-mono text-sm">{service.price}</td>
                  <td className="py-4 pr-4">
                    <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                      Active
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs hover:bg-surface-low">Edit</button>
                      <button className="rounded-lg border border-outlinevariant px-3 py-1.5 text-xs text-error hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
