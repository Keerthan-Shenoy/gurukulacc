"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

interface User {
  id: string;
  name: string;
  email?: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  login: (email: string, password: string) => Promise<{ otpSessionId?: string; error?: string }>;
  verifyOtp: (otp: string, otpSessionId: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Refresh user from localStorage
  const refreshUser = async () => {
    setLoading(true);
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    else setUser(null);
    setLoading(false);
  };

  // Login function: returns otpSessionId if success
  const login = async (email: string, password: string) => {
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.data?.otpSessionId) {
        return { otpSessionId: res.data.otpSessionId };
      }

      return { error: res.message || "Login failed" };
    } catch (err: any) {
      return { error: err.message || "Login failed" };
    }
  };

  // Verify OTP and set user
  const verifyOtp = async (otp: string, otpSessionId: string) => {
    try {
      const res = await apiFetch("/auth/verify-login-otp", {
        method: "POST",
        body: JSON.stringify({ code: otp, otpSessionId }),
      });

      if (res.success && res.data?.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("csrfToken", res.data.csrfToken || "");
        setUser(res.data.user);
        return { success: true };
      }

      return { success: false, error: res.message || "Invalid OTP" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("user");
    localStorage.removeItem("csrfToken");
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, login, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
