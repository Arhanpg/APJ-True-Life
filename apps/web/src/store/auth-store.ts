import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  doctorName: string;
  setAuthenticated: (value: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
  doctorName: "Dr. APJ Sharma",
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  logout: () => set({ isAuthenticated: false }),
}));
