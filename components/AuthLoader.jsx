"use client";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";

export default function AuthLoader({ children }) {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;

    if (token) setAuth(user, token);
  }, []);

  return <>{children}</>;
}
