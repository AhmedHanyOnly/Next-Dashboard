'use client'

import { useAuthStore } from "@/store/useAuthStore";
import api from "@/utils/api";

export async function login(payload) {
  const { data } = await api.post("/api/login", payload);
  console.log(data);
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.data));
    useAuthStore.getState().setAuth(data.data, data.token);
    document.cookie = `token=${data.token}; path=/; HttpOnly; SameSite=Lax`;
  }
  return data;
}

export async function logout() {
  const { data } = await api.post("/api/logout");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  useAuthStore.getState().clearAuth();
  return data;
}
