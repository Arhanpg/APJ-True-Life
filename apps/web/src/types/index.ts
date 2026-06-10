export type Role = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export type TreatmentStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PhaseStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface Patient {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  profileImageUrl?: string;
  prakriti?: string;
  allergies: string[];
  patientCode: string;
  createdAt: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  doctorId: string;
  planName: string;
  diagnosis: string;
  status: TreatmentStatus;
  totalPhases: number;
  startDate: string;
  endDate?: string;
  completedAt?: string;
  clinicalNotes?: string;
  doshaAssessment?: string;
  specialInstructions?: string;
  phases?: TreatmentPhase[];
  createdAt: string;
}

export interface TreatmentPhase {
  id: string;
  treatmentPlanId: string;
  phaseNumber: number;
  name: string;
  description?: string;
  phaseGoal?: string;
  status: PhaseStatus;
  startDate?: string;
  endDate?: string;
  medicines?: PhaseMedicine[];
  dietGuidelines?: DietGuideline[];
  documents?: PhaseDocument[];
}

export interface PhaseMedicine {
  id: string;
  phaseId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing?: string;
  route?: string;
  instructions?: string;
  displayOrder: number;
}

export interface DietGuideline {
  id: string;
  phaseId: string;
  type: 'CONSUME' | 'AVOID';
  item: string;
  notes?: string;
  displayOrder: number;
}

export interface PhaseDocument {
  id: string;
  phaseId: string;
  documentName: string;
  cloudinaryUrl: string;
  documentType: 'PRESCRIPTION' | 'DIET_CHART' | 'ASSESSMENT_IMAGE' | 'OTHER';
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  treatmentPlanId?: string;
  serviceId?: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  type: 'IN_CLINIC' | 'ONLINE';
  status: AppointmentStatus;
  reason?: string;
  doctorNotes?: string;
  createdBy: 'PATIENT' | 'DOCTOR';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  content?: string;
  mediaUrl?: string;
  mediaFilename?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: 'APPOINTMENT' | 'MESSAGE' | 'TREATMENT' | 'SYSTEM';
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}
