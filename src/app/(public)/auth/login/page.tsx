import { Suspense } from 'react';
import { LoginView } from '@/components/auth/LoginView';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="bg-background min-h-screen w-full" />}>
      <LoginView />
    </Suspense>
  );
}
