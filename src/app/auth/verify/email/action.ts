"use server";

import { apiFetch } from "@/lib/api";

export async function verifyEmailAction(_: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const code = formData.get("code");

    if (!email || !code) {
      return { error: "Email and code are required" };
    }

    await apiFetch("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });

    return {
      success: true,
      message: "Email verified successfully!",
    };
  } catch (err: any) {
    return { error: err.message || "Verification failed" };
  }
}
