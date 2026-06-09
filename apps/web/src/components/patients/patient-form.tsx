"use client";

const fields = [
  { name: "fullName", label: "Full Name", type: "text", required: true },
  { name: "phone", label: "Phone Number (+91)", type: "tel", required: true },
  { name: "email", label: "Email Address", type: "email", required: false },
  { name: "dob", label: "Date of Birth", type: "date", required: true },
  { name: "gender", label: "Gender", type: "select", required: true, options: ["Male", "Female", "Other"] },
  { name: "bloodGroup", label: "Blood Group", type: "select", required: false, options: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] },
  { name: "address", label: "Address", type: "text", required: false },
  { name: "emergencyContact", label: "Emergency Contact", type: "tel", required: false },
  { name: "prakriti", label: "Prakriti", type: "select", required: false, options: ["Vata", "Pitta", "Kapha", "Vata-Pitta", "Pitta-Kapha", "Vata-Kapha"] },
];

export function PatientForm() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="block space-y-2 text-sm font-medium text-primary-dark">
            <span>
              {field.label}
              {field.required && <span className="ml-1 text-error">*</span>}
            </span>
            {field.type === "select" ? (
              <select className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal text-onsurface outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select {field.label}</option>
                {field.options?.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
          </label>
        ))}
      </div>
      <label className="block space-y-2 text-sm font-medium text-primary-dark">
        <span>Medical Notes &amp; Allergies</span>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-outlinevariant px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-primary"
          placeholder="Known allergies, prior Ayurvedic assessments, doctor observations…"
        />
      </label>
    </div>
  );
}
