import { create } from 'zustand';
import type { Doctor, User } from '@/lib/types';

interface AuthState {
  user: User | null;
  doctor: Doctor | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setDoctor: (doctor: Doctor | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  doctor: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user }),

  setDoctor: (doctor) =>
    set({ doctor }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  logout: () =>
    set({ user: null, doctor: null, isAuthenticated: false }),
}));
