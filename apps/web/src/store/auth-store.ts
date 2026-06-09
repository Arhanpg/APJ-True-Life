import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  doctorName: string;
  doctorTitle: string;
  setAuth: (name: string, title: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  doctorName: "Dr. APJ Sharma",
  doctorTitle: "Chief Vaidya",
  setAuth: (doctorName, doctorTitle) => set({ isAuthenticated: true, doctorName, doctorTitle }),
  logout: () => set({ isAuthenticated: false, doctorName: "", doctorTitle: "" }),
}));
