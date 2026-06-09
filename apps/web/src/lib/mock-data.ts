import type { CalendarEvent, Conversation, KpiCard, Patient, ScheduleItem, TreatmentPhase } from "@/types";

export const kpis: KpiCard[] = [
  { title: "Active Patients", value: "128", trend: "+12 this month", tone: "success" },
  { title: "Today's Appointments", value: "14", trend: "4 pending confirmation", tone: "primary" },
  { title: "Unread Messages", value: "09", trend: "3 critical follow-ups", tone: "gold" },
  { title: "Completed Treatments", value: "21", trend: "+6 this week", tone: "warning" },
];

export const todaySchedule: ScheduleItem[] = [
  { time: "09:00 AM", patient: "Rahul Nair", purpose: "Panchakarma Review", status: "Confirmed" },
  { time: "10:30 AM", patient: "Sneha Kulkarni", purpose: "Follow-up Consultation", status: "Confirmed" },
  { time: "12:00 PM", patient: "Ajay Sharma", purpose: "Nasya Assessment", status: "Pending" },
  { time: "04:30 PM", patient: "Meera Rao", purpose: "Diet Therapy Check-in", status: "Confirmed" },
];

export const patients: Patient[] = [
  {
    id: "ATL-1001",
    name: "Rahul Nair",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    age: 34,
    gender: "Male",
    status: "In Treatment",
    activeTreatment: "Nasal Polyp - Nasya Course",
    lastVisit: "2026-06-07",
    prakriti: "Vata-Pitta",
  },
  {
    id: "ATL-1002",
    name: "Sneha Kulkarni",
    email: "sneha@example.com",
    phone: "+91 9001122233",
    age: 29,
    gender: "Female",
    status: "Active",
    activeTreatment: "PCOS Balance Therapy",
    lastVisit: "2026-06-08",
    prakriti: "Pitta-Kapha",
  },
  {
    id: "ATL-1003",
    name: "Ajay Sharma",
    email: "ajay@example.com",
    phone: "+91 9988776655",
    age: 42,
    gender: "Male",
    status: "Completed",
    activeTreatment: "Migraine Relief Protocol",
    lastVisit: "2026-05-31",
    prakriti: "Vata",
  },
  {
    id: "ATL-1004",
    name: "Meera Rao",
    email: "meera@example.com",
    phone: "+91 9123456780",
    age: 37,
    gender: "Female",
    status: "In Treatment",
    activeTreatment: "Stress & Sleep Restoration",
    lastVisit: "2026-06-05",
    prakriti: "Kapha-Pitta",
  },
];

export const phases: TreatmentPhase[] = [
  {
    id: "phase-1",
    title: "Purvakarma Preparation",
    status: "Completed",
    goal: "Prepare nasal passages and digestive fire for main therapy.",
    procedures: ["Warm oil facial massage", "Steam inhalation (10 min)", "Light digestive decoction twice daily"],
    medicines: [
      { name: "Trikatu Churna", dosage: "1 tsp", frequency: "Twice daily", timing: "Before food" },
    ],
    dietConsume: ["Warm water", "Jeera rice", "Moong dal soup"],
    dietAvoid: ["Curd", "Cold drinks", "Deep fried items"],
  },
  {
    id: "phase-2",
    title: "Nasya Therapy",
    status: "Current",
    goal: "Reduce polyp inflammation and restore nasal passage function.",
    procedures: [
      "Anu Tailam Nasya — 2 drops each nostril",
      "Herbal steam fomentation 15 min",
      "Doctor review every 3 days",
    ],
    medicines: [
      { name: "Anu Tailam", dosage: "2 drops", frequency: "Twice daily", timing: "Morning & evening" },
      { name: "Kanchanara Guggulu", dosage: "2 tablets", frequency: "Twice daily", timing: "After food" },
    ],
    dietConsume: ["Warm herbal tea", "Steamed vegetables", "Light khichdi"],
    dietAvoid: ["Ice cream", "Bakery foods", "Excess dairy"],
  },
  {
    id: "phase-3",
    title: "Rejuvenation & Review",
    status: "Upcoming",
    goal: "Consolidate benefits and prevent relapse.",
    procedures: ["Rasayana support regimen", "Sleep routine coaching", "Final clinical assessment"],
    medicines: [
      { name: "Chyawanprash", dosage: "1 tsp", frequency: "Daily", timing: "Morning with warm milk" },
    ],
    dietConsume: ["Seasonal fruits", "Warm turmeric milk"],
    dietAvoid: ["Late night meals", "Packaged snacks", "Cold water"],
  },
];

export const conversations: Conversation[] = [
  {
    id: "1",
    patientName: "Rahul Nair",
    treatmentName: "Nasal Polyp - Nasya Course",
    preview: "Doctor, breathing feels much better today!",
    timestamp: "2 min ago",
    unread: 2,
  },
  {
    id: "2",
    patientName: "Sneha Kulkarni",
    treatmentName: "PCOS Balance Therapy",
    preview: "Uploaded the diet chart for review.",
    timestamp: "25 min ago",
    unread: 0,
  },
  {
    id: "3",
    patientName: "Meera Rao",
    treatmentName: "Stress & Sleep Restoration",
    preview: "Can we reschedule tomorrow's session?",
    timestamp: "1 hr ago",
    unread: 1,
  },
];

export const appointmentEvents: CalendarEvent[] = [
  { title: "Rahul Nair — Nasya Review", start: "2026-06-09T09:00:00", end: "2026-06-09T10:00:00", color: "#1A5C38" },
  { title: "Sneha Kulkarni — Follow-up", start: "2026-06-09T10:30:00", end: "2026-06-09T11:30:00", color: "#2E7D52" },
  { title: "Ajay Sharma — Nasya Assessment", start: "2026-06-10T09:00:00", end: "2026-06-10T10:00:00", color: "#1A5C38" },
  { title: "Meera Rao — Diet Check-in", start: "2026-06-10T14:00:00", end: "2026-06-10T15:00:00", color: "#C9A84C" },
  { title: "Rahul Nair — Phase Review", start: "2026-06-11T11:00:00", end: "2026-06-11T12:00:00", color: "#1A5C38" },
];
