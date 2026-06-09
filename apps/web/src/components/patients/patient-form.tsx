"use client";

const fields: { label: string; type?: string; col?: string }[] = [
  { label: "Full Name" },
  { label: "Email Address", type: "email" },
  { label: "Phone Number", type: "tel" },
  { label: "Date of Birth", type: "date" },
  { label: "Gender" },
  { label: "Blood Group" },
  { label: "Address", col: "full" },
  { label: "Emergency Contact", type: "tel" },
  { label: "Prakriti (Dosha)" },
];

export function PatientForm() {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        {fields
          .filter((f) => f.col !== "full")
          .map((f) => (
            <label key={f.label} className="block space-y-1.5 text-sm font-medium text-[#111E18]">
              {f.label}
              <input
                type={f.type ?? "text"}
                placeholder={`Enter ${f.label.toLowerCase()}`}
                className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal text-[#111E18] outline-none transition focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
              />
            </label>
          ))}
      </div>
      {fields
        .filter((f) => f.col === "full")
        .map((f) => (
          <label key={f.label} className="block space-y-1.5 text-sm font-medium text-[#111E18]">
            {f.label}
            <input
              type="text"
              placeholder={`Enter ${f.label.toLowerCase()}`}
              className="mt-1 block w-full rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal text-[#111E18] outline-none transition focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
            />
          </label>
        ))}
      <label className="block space-y-1.5 text-sm font-medium text-[#111E18]">
        Medical Notes
        <textarea
          rows={5}
          placeholder="Known allergies, previous conditions, Ayurvedic assessment notes..."
          className="mt-1 block w-full resize-none rounded-xl border border-[#C0C9BF] px-4 py-2.5 font-normal text-[#111E18] outline-none transition focus:border-[#1A5C38] focus:ring-2 focus:ring-[#1A5C38]/20"
        />
      </label>
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <input type="checkbox" id="consent" className="h-4 w-4 accent-[#1A5C38]" />
        <label htmlFor="consent" className="text-sm text-[#404941]">
          I confirm that I have obtained the patient's consent to collect and process their health data as per the DPDP Act 2023.
        </label>
      </div>
    </div>
  );
}
