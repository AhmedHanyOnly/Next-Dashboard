'use client'
import { create } from "zustand";
export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuth: false,
  setAuth: (user, token) => set({ user, token, isAuth: !!token }),
  clearAuth: () => set({ user: null, token: null, isAuth: false }),
}));
