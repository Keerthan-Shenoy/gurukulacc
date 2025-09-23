'use client';

import { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerAction } from './actions';
import { Eye, EyeOff } from 'lucide-react';

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, { error: null, success: false });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.push('/login?verified=false');
    }
  }, [state.success, router]);

  return (
    <div className="e-card playing">
      <div className="wave" />
      <div className="wave" />
      <div className="wave" />

      <div className="relative z-10 flex flex-col gap-4 p-6 h-full text-foreground">
        <h1 className="text-3xl font-bold tracking-tighter title">Register</h1>
        <p className="message">Enroll now and get full access to our app.</p>
        
        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="w-full">
              <input name="firstName" required className="input" type="text" placeholder=" " />
              <span>Firstname</span>
            </label>
            <label className="w-full">
              <input name="lastName" required className="input" type="text" placeholder=" " />
              <span>Lastname</span>
            </label>
          </div>
          <label>
            <input name="email" type="email" required className="input" placeholder=" "/>
            <span>Email</span>
          </label>
          <label className="relative">
            <input name="password" type={showPassword ? 'text' : 'password'} required className="input pr-10" placeholder=" "/>
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
            <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required className="input pr-10" placeholder=" "/>
            <span>Confirm Password</span>
            <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </label>
          
          {state.error && <p className="text-destructive text-sm text-center">{state.error}</p>}
          
          <button type="submit" className="submit">Submit</button>
        </form>
        
        <p className="signin mt-auto">
          Already have an account? <Link href="/login" className="font-semibold hover:underline">Signin</Link>
        </p>
      </div>
    </div>
  );
}
