import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  doctorName: string;
  doctorEmail: string;
  login: (name: string, email: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  doctorName: "Dr. APJ Sharma",
  doctorEmail: "doctor@apjtruelife.com",
  login: (name, email) => set({ isAuthenticated: true, doctorName: name, doctorEmail: email }),
  logout: () => set({ isAuthenticated: false }),
}));
