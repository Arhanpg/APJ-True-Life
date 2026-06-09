export type PatientStatus = "Active" | "In Treatment" | "Completed";
export type AppointmentStatus = "Confirmed" | "Pending" | "Cancelled";
export type TreatmentPhaseStatus = "Completed" | "Current" | "Upcoming";

export interface KpiCard {
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

export interface TreatmentPhase {
  id: string;
  title: string;
  status: TreatmentPhaseStatus;
  goal: string;
  procedures: string[];
  medicines: { name: string; dosage: string; frequency: string; timing: string }[];
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

export interface ClinicService {
  id: string;
  name: string;
  duration: string;
  price: string;
  active: boolean;
}
