import type { ClinicService, Conversation, KpiCard, Patient, ScheduleItem, TreatmentPhase } from "@/types";

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
  { time: "03:00 PM", patient: "Priya Menon", purpose: "Stress Therapy Check-in", status: "Confirmed" },
  { time: "04:30 PM", patient: "Meera Rao", purpose: "Diet Review", status: "Pending" },
];

export const patients: Patient[] = [
  { id: "ATL-1001", name: "Rahul Nair", email: "rahul@example.com", phone: "+91 9876543210", age: 34, gender: "Male", status: "In Treatment", activeTreatment: "Nasal Polyp - Nasya Course", lastVisit: "2026-06-07", prakriti: "Vata-Pitta" },
  { id: "ATL-1002", name: "Sneha Kulkarni", email: "sneha@example.com", phone: "+91 9001122233", age: 29, gender: "Female", status: "Active", activeTreatment: "PCOS Balance Therapy", lastVisit: "2026-06-08", prakriti: "Pitta-Kapha" },
  { id: "ATL-1003", name: "Ajay Sharma", email: "ajay@example.com", phone: "+91 9988776655", age: 42, gender: "Male", status: "Completed", activeTreatment: "Migraine Relief Protocol", lastVisit: "2026-05-31", prakriti: "Vata" },
  { id: "ATL-1004", name: "Meera Rao", email: "meera@example.com", phone: "+91 9123456780", age: 37, gender: "Female", status: "In Treatment", activeTreatment: "Stress & Sleep Restoration", lastVisit: "2026-06-05", prakriti: "Kapha-Pitta" },
  { id: "ATL-1005", name: "Priya Menon", email: "priya@example.com", phone: "+91 9445566778", age: 31, gender: "Female", status: "Active", activeTreatment: "Digestive Restore Protocol", lastVisit: "2026-06-06", prakriti: "Pitta" },
];

export const phases: TreatmentPhase[] = [
  {
    id: "phase-1",
    title: "Purvakarma Preparation",
    status: "Completed",
    goal: "Prepare nasal passages and digestive fire for main therapy.",
    procedures: ["Warm oil facial massage daily", "Steam inhalation 10 min twice daily", "Light digestive decoction before sleep"],
    medicines: [{ name: "Trikatu Churna", dosage: "1 tsp", frequency: "Twice daily", timing: "Before food" }],
    dietConsume: ["Warm water", "Jeera rice", "Moong soup", "Ginger tea"],
    dietAvoid: ["Curd", "Cold drinks", "Deep fried items", "Excess sugar"],
  },
  {
    id: "phase-2",
    title: "Nasya Therapy",
    status: "Current",
    goal: "Reduce inflammation and restore nasal passage function.",
    procedures: ["Daily Nasya with Anu Tailam", "Herbal fomentation 15 min", "Doctor review every 3 days", "Morning steam inhalation"],
    medicines: [
      { name: "Anu Tailam", dosage: "2 drops each nostril", frequency: "Twice daily", timing: "Morning & evening" },
      { name: "Kanchanara Guggulu", dosage: "2 tablets", frequency: "Twice daily", timing: "After food" },
    ],
    dietConsume: ["Warm herbal tea", "Steamed vegetables", "Light khichdi", "Tulsi decoction"],
    dietAvoid: ["Ice cream", "Bakery foods", "Excess dairy", "Cold water"],
  },
  {
    id: "phase-3",
    title: "Rejuvenation & Review",
    status: "Upcoming",
    goal: "Consolidate treatment gains and prevent recurrence.",
    procedures: ["Rasayana support protocol", "Sleep routine coaching", "Final clinical assessment"],
    medicines: [{ name: "Chyawanprash", dosage: "1 tsp", frequency: "Daily", timing: "Morning with warm milk" }],
    dietConsume: ["Seasonal fruits", "Warm turmeric milk", "Sprouted grains"],
    dietAvoid: ["Late night meals", "Processed snacks", "Alcohol"],
  },
];

export const conversations: Conversation[] = [
  { id: "1", patientName: "Rahul Nair", treatmentName: "Nasal Polyp - Nasya Course", preview: "Doctor, the breathing feels much better today.", timestamp: "2 min ago", unread: 2 },
  { id: "2", patientName: "Sneha Kulkarni", treatmentName: "PCOS Balance Therapy", preview: "Uploaded the latest diet chart for your review.", timestamp: "25 min ago", unread: 0 },
  { id: "3", patientName: "Meera Rao", treatmentName: "Stress & Sleep Restoration", preview: "Can we reschedule tomorrow's session?", timestamp: "1 hr ago", unread: 1 },
];

export const clinicServices: ClinicService[] = [
  { id: "svc-1", name: "General Consultation", duration: "30 min", price: "₹500", active: true },
  { id: "svc-2", name: "Panchakarma Therapy", duration: "90 min", price: "₹2500", active: true },
  { id: "svc-3", name: "Nasya Treatment", duration: "45 min", price: "₹1200", active: true },
  { id: "svc-4", name: "Yoga Therapy", duration: "60 min", price: "₹800", active: false },
  { id: "svc-5", name: "Diet Consultation", duration: "30 min", price: "₹600", active: true },
];

export const appointmentEvents = [
  { id: "1", title: "Rahul Nair — Panchakarma", start: new Date().toISOString().split("T")[0] + "T09:00:00", end: new Date().toISOString().split("T")[0] + "T10:30:00", backgroundColor: "#1A5C38" },
  { id: "2", title: "Sneha Kulkarni — Follow-up", start: new Date().toISOString().split("T")[0] + "T11:00:00", end: new Date().toISOString().split("T")[0] + "T11:30:00", backgroundColor: "#2E7D52" },
  { id: "3", title: "Ajay Sharma — Nasya", start: new Date().toISOString().split("T")[0] + "T14:00:00", end: new Date().toISOString().split("T")[0] + "T15:00:00", backgroundColor: "#C9A84C" },
];
