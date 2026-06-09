import { ClinicSettingsForm } from "@/components/settings/clinic-settings-form";

export default function SettingsPage() {
  return (
    <div className="space-y-2">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#004324]">Clinic Settings</h1>
        <p className="mt-1 text-sm text-[#404941]">Manage clinic information, doctor profile, and available services.</p>
      </div>
      <ClinicSettingsForm />
    </div>
  );
}
