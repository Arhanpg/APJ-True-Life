// ─── Auth & User ───────────────────────────────────────────────────────────
export type UserRole = 'PATIENT' | 'DOCTOR' | 'ADMIN';

export interface User {
  id: string;
  firebaseUid: string;
  role: UserRole;
  phoneNumber?: string;
  email?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Doctor & Clinic ───────────────────────────────────────────────────────
export interface Doctor {
  id: string;
  userId: string;
  fullName: string;
  professionalTitle?: string;
  bio?: string;
  profileImageUrl?: string;
  specializations: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Clinic {
  id: string;
  doctorId: string;
  name: string;
  tagline?: string;
  address?: string;
  phone?: string;
  email?: string;
  websiteUrl?: string;
  logoUrl?: string;
}

export interface ClinicService {
  id: string;
  clinicId: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  isActive: boolean;
  displayOrder: number;
}

// ─── Patient ───────────────────────────────────────────────────────────────
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
  createdByDoctorId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Treatment ─────────────────────────────────────────────────────────────
export type TreatmentStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PhaseStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
export type DocumentType = 'PRESCRIPTION' | 'DIET_CHART' | 'ASSESSMENT_IMAGE' | 'OTHER';

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
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  phases?: TreatmentPhase[];
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
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
  medicines?: PhaseMedicine[];
  dietGuidelines?: PhaseDietGuideline[];
  documents?: PhaseDocument[];
  procedures?: string[];
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

export interface PhaseDietGuideline {
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
  cloudinaryPublicId: string;
  documentType: DocumentType;
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedByUserId: string;
  createdAt: string;
}

// ─── Appointment ───────────────────────────────────────────────────────────
export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type AppointmentType = 'IN_CLINIC' | 'ONLINE';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  treatmentPlanId?: string;
  serviceId?: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason?: string;
  doctorNotes?: string;
  room?: string;
  createdBy: 'PATIENT' | 'DOCTOR';
  cancelledReason?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  service?: ClinicService;
}

// ─── Chat ──────────────────────────────────────────────────────────────────
export type MessageType = 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';

export interface ChatSession {
  id: string;
  treatmentPlanId: string;
  patientId: string;
  doctorId: string;
  isActive: boolean;
  createdAt: string;
  closedAt?: string;
  patient?: Patient;
  treatmentPlan?: TreatmentPlan;
  lastMessage?: ChatMessage;
  unreadCount?: number;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  messageType: MessageType;
  content?: string;
  mediaUrl?: string;
  mediaPublicId?: string;
  mediaFilename?: string;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

// ─── Notification ─────────────────────────────────────────────────────────
export type NotificationType = 'APPOINTMENT' | 'MESSAGE' | 'TREATMENT' | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  type: NotificationType;
  referenceId?: string;
  isRead: boolean;
  createdAt: string;
}

// ─── API Response ──────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
  };
  message: string;
  timestamp: string;
}

// ─── Dashboard Stats ───────────────────────────────────────────────────────
export interface DashboardStats {
  activePatients: number;
  activePatientsGrowth: number;
  todayAppointments: number;
  unreadMessages: number;
  completedTreatmentsThisWeek: number;
}
