'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';
import { apiFetch } from '@/lib/api';

export function LoginForm() {
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const [otpSessionId, setOtpSessionId] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  // --- Login submit ---
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.success && res.data?.otpSessionId) {
        setOtpSessionId(res.data.otpSessionId);
        toast({ title: 'OTP Sent', description: 'Enter the OTP sent to your email/phone 📩' });
      } else {
        toast({ title: 'Login failed', description: res.message || 'Unknown error', variant: 'destructive' });
      }
    } catch (err: any) {
      toast({ title: 'Login failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // --- OTP submit ---
const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!otpSessionId) return;

  setOtpLoading(true);
  try {
    const res = await apiFetch('/auth/verify-login-otp', {
      method: 'POST',
      body: JSON.stringify({ code: otp, otpSessionId }),
    });

    if (res.success && res.data?.user) {
      // Save user and csrfToken to localStorage
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('csrfToken', res.data.csrfToken);

      toast({ title: 'Login successful 🎉', description: `Welcome ${res.data.user.name}` });
      window.location.href = '/dashboard';
    } else {
      toast({
        title: 'OTP Verification Failed',
        description: res.message || 'Invalid OTP',
        variant: 'destructive',
      });
    }
  } catch (err: any) {
    toast({ title: 'OTP Verification Failed', description: err.message, variant: 'destructive' });
  } finally {
    setOtpLoading(false);
  }
};


  // --- OTP UI ---
  if (otpSessionId) {
    return (
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4 flex items-center justify-center gap-2">
          <KeyRound size={20} className="text-indigo-600" /> Verify OTP
        </h2>
        <form onSubmit={handleOtpSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={9}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-center tracking-widest text-lg"
            placeholder="••••••"
          />
          <button
            type="submit"
            disabled={otpLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md font-medium flex items-center justify-center gap-2"
          >
            {otpLoading ? <><Loader2 className="animate-spin" size={18} /> Verifying...</> : 'Verify OTP'}
          </button>
        </form>
      </div>
    );
  }

  // --- Login Form UI ---
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-6">Welcome Back 👋</h2>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder=" "
          />
          <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
            Email
          </label>
        </div>

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full px-4 py-3 border rounded-xl pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder=" "
          />
          <label className="absolute left-3 top-2 text-gray-500 text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all">
            Password
          </label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md font-medium gap-2"
        >
          {loading ? <><Loader2 className="animate-spin" size={18} /> Logging in...</> : 'Login'}
        </button>
      </form>
    </div>
  );
}
