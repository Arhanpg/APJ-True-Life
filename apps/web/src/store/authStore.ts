import { create } from 'zustand';

/** Dashboard user — Doctor or Admin authenticated via Spring Boot auth-service */
interface DashboardUser {
  id: string;
  name: string;
  email: string;
  role: 'DOCTOR' | 'ADMIN';
}

interface AuthState {
  user: DashboardUser | null;
  setUser: (u: DashboardUser | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
