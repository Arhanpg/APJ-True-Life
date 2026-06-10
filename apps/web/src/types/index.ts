export interface Patient {
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  bloodGroup?: string;
  address?: string;
  emergencyContact?: string;
  profileImageUrl?: string;
  prakriti?: string;
  allergies?: string[];
  patientCode: string;
  createdAt: string;
}

export interface TreatmentPlan {
  id: string;
  patientId: string;
  doctorId: string;
  planName: string;
  diagnosis: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  totalPhases: number;
  startDate: string;
  endDate?: string;
  completedAt?: string;
  clinicalNotes?: string;
  doshaAssessment?: string;
  specialInstructions?: string;
  phases?: TreatmentPhase[];
}

export interface TreatmentPhase {
  id: string;
  treatmentPlanId: string;
  phaseNumber: number;
  name: string;
  description?: string;
  phaseGoal?: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  startDate?: string;
  endDate?: string;
  medicines?: Medicine[];
  dietGuidelines?: DietGuideline[];
  documents?: PhaseDocument[];
}

export interface Medicine {
  id: string;
  phaseId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing?: string;
  route?: string;
  instructions?: string;
}

export interface DietGuideline {
  id: string;
  phaseId: string;
  type: 'CONSUME' | 'AVOID';
  item: string;
  notes?: string;
}

export interface PhaseDocument {
  id: string;
  phaseId: string;
  documentName: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  documentType: 'PRESCRIPTION' | 'DIET_CHART' | 'ASSESSMENT_IMAGE' | 'OTHER';
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  type: 'IN_CLINIC' | 'ONLINE';
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  reason?: string;
  doctorNotes?: string;
  cancelledReason?: string;
  createdBy: 'PATIENT' | 'DOCTOR';
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
