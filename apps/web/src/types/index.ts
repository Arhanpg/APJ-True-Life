export type PatientStatus = "Active" | "In Treatment" | "Completed";
export type AppointmentStatus = "Confirmed" | "Pending" | "Cancelled" | "In Progress";
export type PhaseStatus = "Completed" | "Current" | "Upcoming";

export interface KpiData {
  title: string;
  value: string;
  trend: string;
  tone: "success" | "primary" | "gold" | "warning";
}

export interface ScheduleItem {
  time: string;
  patient: string;
  purpose: string;
  status: AppointmentStatus;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  status: PatientStatus;
  activeTreatment: string;
  lastVisit: string;
  prakriti: string;
}

export interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
}

export interface TreatmentPhase {
  id: string;
  title: string;
  status: PhaseStatus;
  goal: string;
  procedures: string[];
  medicines: Medicine[];
  dietConsume: string[];
  dietAvoid: string[];
}

export interface Conversation {
  id: string;
  patientName: string;
  treatmentName: string;
  preview: string;
  timestamp: string;
  unread: number;
}

export interface CompletedTreatment {
  id: string;
  patientName: string;
  treatmentName: string;
  completedDate: string;
  totalPhases: number;
}
