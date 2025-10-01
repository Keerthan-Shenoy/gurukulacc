"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { verifyEmailAction } from "./action";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();
  const emailFromUrl = params.get("email") || "";

  const [state, formAction] = useActionState(verifyEmailAction, {
    error: null,
    success: false,
  });

  const [resendStatus, setResendStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (state.success) {
    router.push("/auth/login");
  }

  const handleResend = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailFromUrl }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to resend code");
      }

      setResendStatus("Verification code resent successfully.");
    } catch (err: any) {
      setResendStatus(err.message || "Failed to resend code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="e-card max-w-md w-full p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Email</h1>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Enter the OTP code sent to <b>{emailFromUrl}</b>
        </p>

        <form action={formAction} className="flex flex-col gap-3">
          <input type="hidden" name="email" value={emailFromUrl} />

          <input
            type="text"
            name="code"
            placeholder="Enter verification code"
            className="input w-full"
            required
          />

          {state.error && (
            <p className="text-destructive text-sm">{state.error}</p>
          )}

          <button type="submit" className="submit w-full">
            Verify Email
          </button>
        </form>

        {/* Resend OTP Section */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResend}
            disabled={loading}
            className="mt-2 text-primary underline disabled:opacity-50"
          >
            {loading ? "Resending..." : "Resend Code"}
          </button>
          {resendStatus && (
            <p className="mt-2 text-sm text-muted-foreground">{resendStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}
