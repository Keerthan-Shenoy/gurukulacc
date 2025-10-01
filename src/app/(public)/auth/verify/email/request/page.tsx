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

export default function RequestEmailVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerifyEmail = async () => {
    if (!email) {
      toast({ title: "Enter a valid email", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/auth/request-email-verification", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res.success) {
        toast({
          title: "Verification email sent 🎉",
          description: `Check ${email} for the OTP.`,
        });
        router.push(`/auth/verify/email?email=${encodeURIComponent(email)}`);
      } else {
        toast({
          title: "Failed to send email",
          description: res.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      toast({
        title: "Request failed",
        description: err.message || "An error occurred. Try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center">
        <Mail className="mx-auto mb-4 h-12 w-12 text-indigo-600" />
        <h2 className="text-xl font-semibold mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter your email below to receive a one-time verification code.
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
          onClick={handleVerifyEmail}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center gap-2"
        >
          {loading ? "Sending OTP..." : "Send Verification Email"}
        </Button>
          {/* Back to Login */}
      
      </div>
    </div>
  );
}
