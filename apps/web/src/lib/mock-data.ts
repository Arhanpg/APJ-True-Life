import type {
  CompletedTreatment,
  Conversation,
  KpiData,
  Patient,
  ScheduleItem,
  TreatmentPhase,
} from "@/types";

export const kpis: KpiData[] = [
  { title: "Active Patients", value: "128", trend: "+12 this month", tone: "success" },
  { title: "Today's Appointments", value: "14", trend: "4 pending confirmation", tone: "primary" },
  { title: "Unread Messages", value: "09", trend: "3 critical follow-ups", tone: "gold" },
  { title: "Completed Treatments", value: "21", trend: "+6 this week", tone: "warning" },
];

export const todaySchedule: ScheduleItem[] = [
  { time: "09:00 AM", patient: "Rahul Nair", purpose: "Panchakarma Review", status: "Confirmed" },
  { time: "10:30 AM", patient: "Sneha Kulkarni", purpose: "Follow-up Consultation", status: "Confirmed" },
  { time: "12:00 PM", patient: "Ajay Sharma", purpose: "Nasya Assessment", status: "Pending" },
  { time: "02:00 PM", patient: "Lakshmi Iyer", purpose: "Diet Therapy Review", status: "Confirmed" },
  { time: "04:30 PM", patient: "Meera Rao", purpose: "Stress & Sleep Check-in", status: "Pending" },
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
  {
    id: "ATL-1005",
    name: "Lakshmi Iyer",
    email: "lakshmi@example.com",
    phone: "+91 9900887766",
    age: 52,
    gender: "Female",
    status: "Active",
    activeTreatment: "Arthritis Management",
    lastVisit: "2026-06-04",
    prakriti: "Kapha",
  },
];

export const phases: TreatmentPhase[] = [
  {
    id: "phase-1",
    title: "Purvakarma Preparation",
    status: "Completed",
    goal: "Prepare nasal passages and digestive fire for therapy.",
    procedures: [
      "Warm oil facial massage (Abhyanga)",
      "Steam inhalation for 15 minutes",
      "Light digestive decoction (Trikatu Kashayam)",
    ],
    medicines: [
      { name: "Trikatu Churna", dosage: "1 tsp", frequency: "Twice daily", timing: "Before food" },
    ],
    dietConsume: ["Warm water", "Jeera rice", "Moong soup", "Ginger tea"],
    dietAvoid: ["Curd", "Cold drinks", "Deep fried items", "Raw salads"],
  },
  {
    id: "phase-2",
    title: "Nasya Therapy",
    status: "Current",
    goal: "Reduce inflammation and improve nasal passage function.",
    procedures: [
      "Daily Nasya with medicated Anu Tailam oil",
      "Herbal steam fomentation for 20 minutes",
      "Doctor review every 3 days",
    ],
    medicines: [
      { name: "Anu Tailam", dosage: "2 drops", frequency: "Twice daily", timing: "Morning & evening" },
      { name: "Kanchanara Guggulu", dosage: "2 tablets", frequency: "Twice daily", timing: "After food" },
    ],
    dietConsume: ["Warm herbal tea", "Steamed vegetables", "Light khichdi", "Rock salt water"],
    dietAvoid: ["Ice cream", "Bakery foods", "Excess dairy", "Processed foods"],
  },
  {
    id: "phase-3",
    title: "Rejuvenation & Consolidation",
    status: "Upcoming",
    goal: "Consolidate treatment benefits and prevent relapse.",
    procedures: [
      "Rasayana herbal support",
      "Sleep routine coaching session",
      "Final clinical assessment and imaging review",
    ],
    medicines: [
      { name: "Chyawanprash", dosage: "1 tsp", frequency: "Daily", timing: "Morning with warm milk" },
    ],
    dietConsume: ["Seasonal fruits", "Warm milk with turmeric", "Pomegranate juice"],
    dietAvoid: ["Late night meals", "Packaged snacks", "Aerated drinks"],
  },
];

export const conversations: Conversation[] = [
  {
    id: "1",
    patientName: "Rahul Nair",
    treatmentName: "Nasal Polyp - Nasya Course",
    preview: "Doctor, the breathing feels much better today.",
    timestamp: "2 min ago",
    unread: 2,
  },
  {
    id: "2",
    patientName: "Sneha Kulkarni",
    treatmentName: "PCOS Balance Therapy",
    preview: "Uploaded the latest diet chart for your review.",
    timestamp: "25 min ago",
    unread: 0,
  },
  {
    id: "3",
    patientName: "Meera Rao",
    treatmentName: "Stress & Sleep Restoration",
    preview: "Can we reschedule tomorrow's session to 4 PM?",
    timestamp: "1 hr ago",
    unread: 1,
  },
];

export const completedTreatments: CompletedTreatment[] = [
  {
    id: "ATL-T-0021",
    patientName: "Ajay Sharma",
    treatmentName: "Migraine Relief Protocol",
    completedDate: "2026-05-31",
    totalPhases: 4,
  },
  {
    id: "ATL-T-0018",
    patientName: "Ravi Menon",
    treatmentName: "Digestive Wellness Programme",
    completedDate: "2026-05-10",
    totalPhases: 3,
  },
];

export const appointmentEvents = [
  { title: "Rahul Nair - Review", start: "2026-06-09T09:00:00", end: "2026-06-09T10:00:00", backgroundColor: "#1A5C38", borderColor: "#004324" },
  { title: "Sneha Kulkarni - Follow-up", start: "2026-06-09T10:30:00", end: "2026-06-09T11:30:00", backgroundColor: "#2E7D52", borderColor: "#1A5C38" },
  { title: "Ajay Sharma - Assessment", start: "2026-06-10T11:00:00", end: "2026-06-10T12:00:00", backgroundColor: "#C9A84C", borderColor: "#A8882A" },
  { title: "Lakshmi Iyer - Diet Review", start: "2026-06-10T14:00:00", end: "2026-06-10T15:00:00", backgroundColor: "#1A5C38", borderColor: "#004324" },
  { title: "Meera Rao - Consultation", start: "2026-06-11T09:30:00", end: "2026-06-11T10:30:00", backgroundColor: "#2E7D52", borderColor: "#1A5C38" },
];
