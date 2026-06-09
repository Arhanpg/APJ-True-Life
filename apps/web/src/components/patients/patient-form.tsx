"use client";

const fields = [
  { label: "Full Name", type: "text", placeholder: "e.g. Rahul Nair" },
  { label: "Email Address", type: "email", placeholder: "rahul@example.com" },
  { label: "Phone Number", type: "tel", placeholder: "+91 XXXXXXXXXX" },
  { label: "Date of Birth", type: "date", placeholder: "" },
  { label: "Blood Group", type: "text", placeholder: "e.g. O+" },
  { label: "Address", type: "text", placeholder: "Patient residential address" },
  { label: "Emergency Contact", type: "tel", placeholder: "+91 XXXXXXXXXX" },
];

const selectFields = [
  { label: "Gender", options: ["Male", "Female", "Other"] },
  { label: "Prakriti", options: ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha", "Tridosha"] },
];

export function PatientForm() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((f) => (
          <label key={f.label} className="space-y-2 text-sm font-medium text-primary-dark">
            <span>{f.label}</span>
            <input
              type={f.type}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
        ))}
        {selectFields.map((f) => (
          <label key={f.label} className="space-y-2 text-sm font-medium text-primary-dark">
            <span>{f.label}</span>
            <select className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select {f.label}</option>
              {f.options.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
      </div>
      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Medical Notes &amp; Known Allergies</span>
        <textarea
          rows={5}
          placeholder="Document known allergies, prior medical conditions, and Ayurvedic observations…"
          className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary"
        />
      </label>
      <label className="flex items-center gap-3 text-sm text-muted">
        <input type="checkbox" className="rounded border-outlinevariant" />
        Patient has provided consent for data collection and treatment under DPDP Act 2023.
      </label>
    </div>
  );
}
