"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerAction } from "@/app/auth/register/action";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, {
    error: null,
    success: false,
    data: null,
  });

  const router = useRouter();
  const { toast } = useToast();

  // Password toggle states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state.success && state.data?.email) {
      toast({
        title: "Registration successful",
        description: "Check your inbox for the verification OTP",
        duration: 5000,
      });
      router.push(`/auth/verify/email?email=${encodeURIComponent(state.data.email)}`);
    }
  }, [state.success, state.data, router, toast]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="e-card max-w-md w-full p-6 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Register</h1>
        <p className="mb-4 text-center text-sm text-muted-foreground">
          Enroll now and get full access to our app.
        </p>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="w-full">
              <input
                name="firstName"
                required
                className="input"
                type="text"
                placeholder=" "
              />
              <span>Firstname</span>
            </label>
            <label className="w-full">
              <input
                name="lastName"
                required
                className="input"
                type="text"
                placeholder=" "
              />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input
              name="email"
              type="email"
              required
              className="input"
              placeholder=" "
            />
            <span>Email</span>
          </label>
          <label>
            <input
              name="mobile"
              type="tel"
              required
              className="input"
              placeholder="Enter Your Phone number with Country Code"
            />
            <span>Phone Number</span>
          </label>
          <label className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              required
              className="input pr-10"
              placeholder=" "
            />
            <span>Password</span>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
          <label className="relative">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              required
              className="input pr-10"
              placeholder=" "
            />
            <span>Confirm Password</span>
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>

          {state.error && (
            <p className="text-destructive text-sm text-center">{state.error}</p>
          )}

          <button type="submit" className="submit">
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold hover:underline">
            Signin
          </Link>
        </p>
      </div>
    </div>
  );
}
