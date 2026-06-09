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
}

export interface Doctor {
  id: string;
  userId: string;
  fullName: string;
  professionalTitle?: string;
  bio?: string;
  profileImageUrl?: string;
  specializations: string[];
  createdAt: string;
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

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type Prakriti = 'VATA' | 'PITTA' | 'KAPHA' | 'VATA_PITTA' | 'PITTA_KAPHA' | 'VATA_KAPHA' | 'TRIDOSHA';

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
  prakriti?: Prakriti;
  allergies: string[];
  patientCode: string;
  createdByDoctorId?: string;
  createdAt: string;
  updatedAt: string;
  phoneNumber?: string;
  email?: string;
}

export type TreatmentStatus = 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

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

export type PhaseStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';

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
  procedures?: Phaseprocedure[];
  medicines?: PhaseMedicine[];
  dietGuidelines?: PhaseDietGuideline[];
  documents?: PhaseDocument[];
  clinicalNotes?: ClinicalNote[];
}

export interface PhaseDocument {
  id: string;
  phaseId: string;
  documentName: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  documentType: 'PRESCRIPTION' | 'DIET_CHART' | 'ASSESSMENT_IMAGE' | 'OTHER';
  fileSizeBytes?: number;
  mimeType?: string;
  uploadedByUserId: string;
  createdAt: string;
}

export interface Phaserocedure {
  id: string;
  phaseId: string;
  stepNumber: number;
  description: string;
  displayOrder: number;
}

export interface PhaseDocument {
  id: string;
  phaseId: string;
  documentName: string;
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  documentType: 'PRESCRIPTION' | 'DIET_CHART' | 'ASSESSMENT_IMAGE' | 'OTHER';
  fileSizeBytes?: number;
  mimeType?: string;
  createdAt: string;
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

export interface ClinicalNote {
  id: string;
  phaseId: string;
  content: string;
  createdAt: string;
}

export interface Phaserocedure {
  id: string;
  phaseId: string;
  stepNumber: number;
  description: string;
  displayOrder: number;
}

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
export type AppointmentType = 'IN_CLINIC' | 'ONLINE';
export type CreatedBy = 'PATIENT' | 'DOCTOR';

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
  createdBy: CreatedBy;
  cancelledReason?: string;
  createdAt: string;
  updatedAt: string;
  patient?: Patient;
  service?: ClinicService;
}

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

export interface DashboardStats {
  activePatients: number;
  activePatientsChange: number;
  todayAppointments: number;
  unreadMessages: number;
  completedTreatmentsThisWeek: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
