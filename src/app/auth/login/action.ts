"use server";

import { apiFetch } from "@/lib/api";

// STEP 1: Login with email/password -> expect otpSessionId
export async function loginAction(_: any, formData: FormData) {
  try {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      return { error: "Email and password are required" };
    }

    console.log(email,password)

    const res = await apiFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.error || !res.otpSessionId) {
      return { error: res.message || "Login failed. Check credentials." };
    }

    return {
      success: true,
      otpSessionId: res.otpSessionId,
      message: res.message || "OTP sent to your email",
    };
  } catch (err: any) {
    return { error: err.message || "Login failed" };
  }
}

// STEP 2: Verify OTP with otpSessionId
export async function verifyLoginOtpAction(_: any, formData: FormData) {
  try {
    const otp = formData.get("otp")?.toString().trim();
    const otpSessionId = formData.get("otpSessionId")?.toString();

    if (!otp || !otpSessionId) {
      return { error: "OTP and session ID are required" };
    }

    const res = await apiFetch("/auth/verify-login-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp, otpSessionId }),
    });

    if (res.error || !res.token) {
      return { error: res.message || "Invalid OTP" };
    }

    return { success: true, token: res.token, user: res.user };
  } catch (err: any) {
    return { error: err.message || "OTP verification failed" };
  }
}
