
'use client';

import { Suspense } from 'react';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { useIsMobile } from '@/hooks/use-mobile';
import { HomeButton } from './HomeButton';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('@/components/landing/ThreeCanvas').then(m => m.ThreeCanvas), {
  ssr: false,
});

export function RegisterView() {
  const isMobile = useIsMobile();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background">
      <HomeButton />
      {!isMobile && (
        <>
          <div className="absolute inset-0 z-0 opacity-50">
            <Suspense fallback={<div className="bg-background w-full h-full" />} >
              <ThreeCanvas />
            </Suspense>
          </div>
          <div className="absolute inset-0 z-10 bg-background/40 backdrop-blur-sm"></div>
        </>
      )}
      <div className="relative z-20 flex items-center justify-center min-h-screen p-4">
        <RegisterForm />
      </div>
    </div>
  );
}
