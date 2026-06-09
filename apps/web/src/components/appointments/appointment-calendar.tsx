"use client";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { appointmentEvents } from "@/lib/mock-data";

export function AppointmentCalendar() {
  return (
    <div className="rounded-2xl border border-outlinevariant bg-white p-5 shadow-card">
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={appointmentEvents}
        slotMinTime="08:00:00"
        slotMaxTime="19:30:00"
        height="auto"
        allDaySlot={false}
        nowIndicator={true}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,timeGridDay",
        }}
        eventClassNames="rounded-lg text-xs font-medium"
      />
    </div>
  );
}
