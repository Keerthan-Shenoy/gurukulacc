import { Suspense } from 'react';
import { RegisterView } from '@/components/auth/RegisterView';

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="bg-background min-h-screen w-full" />}>
            <RegisterView />
        </Suspense>
    );
}
