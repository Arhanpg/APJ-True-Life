import { AppointmentCalendar } from "@/components/appointments/appointment-calendar";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#004324]">Appointments</h1>
          <p className="mt-1 text-sm text-[#404941]">Manage the full appointment calendar and session confirmations.</p>
        </div>
        <button className="rounded-xl bg-[#1A5C38] px-5 py-2.5 text-sm font-medium text-white">
          + New Appointment
        </button>
      </div>
      <AppointmentCalendar />
    </div>
  );
}
