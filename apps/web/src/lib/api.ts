import axios, { AxiosError, AxiosInstance } from 'axios';
import { auth } from './firebase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Version': '1.0.0',
  },
  timeout: 30000,
});

// Request interceptor — attach Firebase JWT
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(false);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 (token expired)
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      const user = auth.currentUser;
      if (user) {
        // Force token refresh
        const freshToken = await user.getIdToken(true);
        if (error.config) {
          error.config.headers.Authorization = `Bearer ${freshToken}`;
          return apiClient.request(error.config);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// ─── API helpers ───────────────────────────────────────────────────────────
export const authApi = {
  verify: (idToken: string) =>
    apiClient.post('/auth/verify', { idToken }),
  me: () => apiClient.get('/auth/me'),
};

export const patientsApi = {
  list: (params?: { search?: string; page?: number; size?: number }) =>
    apiClient.get('/patients', { params }),
  getById: (id: string) => apiClient.get(`/patients/${id}`),
  create: (data: unknown) => apiClient.post('/patients', data),
  update: (id: string, data: unknown) => apiClient.put(`/patients/${id}`, data),
  getMedicalHistory: (id: string) => apiClient.get(`/patients/${id}/medical-history`),
};

export const doctorApi = {
  getProfile: (id: string) => apiClient.get(`/doctors/${id}`),
  updateProfile: (id: string, data: unknown) => apiClient.put(`/doctors/${id}`, data),
  getClinic: (id: string) => apiClient.get(`/clinics/${id}`),
  updateClinic: (id: string, data: unknown) => apiClient.put(`/clinics/${id}`, data),
  getServices: (clinicId: string) => apiClient.get(`/clinics/${clinicId}/services`),
  createService: (clinicId: string, data: unknown) =>
    apiClient.post(`/clinics/${clinicId}/services`, data),
  updateService: (clinicId: string, serviceId: string, data: unknown) =>
    apiClient.put(`/clinics/${clinicId}/services/${serviceId}`, data),
  deleteService: (clinicId: string, serviceId: string) =>
    apiClient.delete(`/clinics/${clinicId}/services/${serviceId}`),
};

export const treatmentsApi = {
  list: (params?: unknown) => apiClient.get('/treatments', { params }),
  getById: (id: string) => apiClient.get(`/treatments/${id}`),
  create: (data: unknown) => apiClient.post('/treatments', data),
  update: (id: string, data: unknown) => apiClient.put(`/treatments/${id}`, data),
  complete: (id: string) => apiClient.put(`/treatments/${id}/complete`),
  addPhase: (treatmentId: string, data: unknown) =>
    apiClient.post(`/treatments/${treatmentId}/phases`, data),
  updatePhase: (phaseId: string, data: unknown) =>
    apiClient.put(`/phases/${phaseId}`, data),
  addMedicine: (phaseId: string, data: unknown) =>
    apiClient.post(`/phases/${phaseId}/medicines`, data),
  addDiet: (phaseId: string, data: unknown) =>
    apiClient.post(`/phases/${phaseId}/diet`, data),
  addDocument: (phaseId: string, data: unknown) =>
    apiClient.post(`/phases/${phaseId}/documents`, data),
  addNote: (phaseId: string, data: unknown) =>
    apiClient.post(`/phases/${phaseId}/notes`, data),
};

export const appointmentsApi = {
  list: (params?: unknown) => apiClient.get('/appointments', { params }),
  create: (data: unknown) => apiClient.post('/appointments', data),
  getCalendar: (params: { start: string; end: string }) =>
    apiClient.get('/appointments/calendar', { params }),
  getSlots: (date: string) =>
    apiClient.get('/appointments/slots', { params: { date } }),
  confirm: (id: string) => apiClient.patch(`/appointments/${id}/confirm`),
  cancel: (id: string, reason?: string) =>
    apiClient.patch(`/appointments/${id}/cancel`, { reason }),
};

export const chatApi = {
  getSessions: () => apiClient.get('/chat/sessions'),
  getMessages: (sessionId: string, params?: unknown) =>
    apiClient.get(`/chat/sessions/${sessionId}/messages`, { params }),
  sendMessage: (sessionId: string, data: unknown) =>
    apiClient.post(`/chat/sessions/${sessionId}/messages`, data),
};

export const notificationsApi = {
  list: () => apiClient.get('/notifications'),
  markRead: (id: string) => apiClient.patch(`/notifications/${id}/read`),
};

export const mediaApi = {
  upload: (formData: FormData) =>
    apiClient.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  delete: (publicId: string) => apiClient.delete(`/media/${publicId}`),
};
