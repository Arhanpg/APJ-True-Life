/**
 * API client for the APJ TRUE LIFE web dashboard (Doctor/Admin).
 *
 * Auth strategy (per Build Guide Section 3.2):
 *  - Doctors POST /api/auth/login with email+password
 *  - auth-service issues RS256 JWT (15min) + refresh token (7 days)
 *  - Both stored in httpOnly Secure SameSite=Strict cookies by Next.js API route
 *  - NOT Firebase Auth — that is only for patients
 *
 * Token refresh:
 *  - On 401, auto-retry once with POST /api/auth/refresh
 *  - If refresh fails, redirect to /login
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const res = await fetch(url, {
      ...options,
      credentials: 'include', // send httpOnly cookies with every request
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });

    if (res.status === 401 && retry) {
      // Attempt silent token refresh
      const refreshed = await this.refresh();
      if (refreshed) {
        return this.request<T>(path, options, false); // retry once
      } else {
        // Redirect to login — can't refresh
        if (typeof window !== 'undefined') window.location.href = '/login';
        throw new Error('Session expired — please log in again');
      }
    }

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || body?.error || `HTTP ${res.status}`);
    }

    return res.json();
  }

  private async refresh(): Promise<boolean> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }

  async post<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const api = new ApiClient(API_BASE_URL);

// Typed API helpers
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ success: boolean; doctor: { id: string; name: string; role: string } }>(
      '/auth/login',
      { email, password }
    ),
  logout: () => api.post<void>('/auth/logout'),
  refresh: () => api.post<void>('/auth/refresh'),
  me: () => api.get<{ id: string; name: string; email: string; role: string }>('/auth/me'),
};

export const patientsApi = {
  list: (page = 0, size = 20) => api.get<PaginatedResponse<Patient>>(`/patients?page=${page}&size=${size}`),
  get: (id: string) => api.get<Patient>(`/patients/${id}`),
  search: (q: string) => api.get<Patient[]>(`/patients/search?q=${q}`),
};

export const appointmentsApi = {
  list: (params?: { doctorId?: string; patientId?: string; date?: string }) =>
    api.get<PaginatedResponse<Appointment>>(
      `/appointments?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v).map(([k, v]) => [k, String(v)])).toString()}`
    ),
  getByDoctor: (doctorId: string, date?: string) =>
    api.get<Appointment[]>(`/appointments/doctor/${doctorId}${date ? `?date=${date}` : ''}`),
  create: (data: Partial<Appointment>) => api.post<Appointment>('/appointments', data),
  updateStatus: (id: string, status: string, notes?: string) =>
    api.patch<Appointment>(`/appointments/${id}/status`, { status, doctorNotes: notes }),
};

export const treatmentsApi = {
  list: (params?: { doctorId?: string; patientId?: string; status?: string }) =>
    api.get<PaginatedResponse<TreatmentPlan>>(
      `/treatments?${new URLSearchParams(Object.entries(params || {}).filter(([, v]) => v).map(([k, v]) => [k, String(v)])).toString()}`
    ),
  get: (id: string) => api.get<{ plan: TreatmentPlan; phases: TreatmentPhase[] }>(`/treatments/${id}`),
  create: (data: Partial<TreatmentPlan>) => api.post<TreatmentPlan>('/treatments', data),
  updateStatus: (id: string, status: string) => api.patch<TreatmentPlan>(`/treatments/${id}/status`, { status }),
  addPhase: (planId: string, phase: Partial<TreatmentPhase>) => api.post<TreatmentPhase>(`/treatments/${planId}/phases`, phase),
  updatePhaseStatus: (phaseId: string, status: string) =>
    api.patch<TreatmentPhase>(`/treatments/phases/${phaseId}/status`, { status }),
};

// Types
export interface PaginatedResponse<T> {
  success: boolean;
  data: {
    [key: string]: T[] | number;
    totalElements: number;
    totalPages: number;
  };
}

export interface Patient {
  id: string;
  firebaseUid: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  consentGiven: boolean;
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
  reason: string;
  doctorNotes: string;
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
  endDate: string;
  clinicalNotes: string;
  doshaAssessment: string;
  createdAt: string;
}

export interface TreatmentPhase {
  id: string;
  treatmentPlanId: string;
  phaseNumber: number;
  name: string;
  description: string;
  phaseGoal: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED';
  startDate: string;
  endDate: string;
}
