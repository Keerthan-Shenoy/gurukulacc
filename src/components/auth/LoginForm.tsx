'use client';

import { useActionState, useEffect, useState } from 'react';
import { loginAction } from './actions';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, { error: null });
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get('verified') === 'false') {
      toast({
        title: "Registration Successful!",
        description: "We've sent a verification link to your email. Please verify your account before logging in.",
        duration: 8000,
      });
    }
  }, [searchParams, toast]);

  return (
    <div className="e-card playing">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />

      <div className="relative z-10 flex flex-col gap-4 p-6 h-full text-foreground">
        <h1 className="text-3xl font-bold tracking-tighter title">Login</h1>
        <p className="message">Welcome back! Sign in to continue.</p>

        <form action={formAction} className="flex flex-col gap-4">
          <label>
            <input name="email" type="email" required className="input" placeholder=" " />
            <span>Email</span>
          </label>
          <label className="relative">
            <input name="password" type={showPassword ? 'text' : 'password'} required className="input pr-10" placeholder=" " />
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
          
          {state?.error && <p className="text-destructive text-sm text-center">{state.error}</p>}
          
          <button type="submit" className="submit">Submit</button>
        </form>

        <div className="text-center">
            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
        </div>
        
        <p className="signin mt-auto text-center">
          Don't have an account? <Link href="/register" className="font-semibold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
