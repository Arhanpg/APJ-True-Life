import { AppointmentCalendar } from "@/components/appointments/appointment-calendar";

export default function AppointmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary-dark">Appointments</h1>
          <p className="text-sm text-muted">
            Week calendar with confirmed, pending, and rescheduled consultations.
          </p>
        </div>
        <button className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-dark">
          + New Appointment
        </button>
      </div>
      <AppointmentCalendar />
    </div>
  );
}
