'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { Mail } from "lucide-react";
import Link from "next/link";

export default function RequestPasswordReset() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRequest = async () => {
    if (!email) {
      toast({ title: "Enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/auth/request-password-reset", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.success) {
        toast({ title: "OTP sent!", description: `Check ${email} for the reset code.` });
        router.push(`/auth/change-password?email=${encodeURIComponent(email)}`);
      } else {
        toast({ title: "Failed", description: res.message, variant: "destructive" });
      }
    } catch (err: any) {
      toast({ title: "Request failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
        <Mail className="mx-auto mb-4 h-12 w-12 text-indigo-600" />
        <h2 className="text-xl font-semibold mb-2">Reset Password</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email to receive a password reset OTP.
        </p>

        <div className="mb-4 text-left">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <Button
          onClick={handleRequest}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </Button>
          <div className="mt-6 text-sm text-gray-600">
          Remembered your password?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
