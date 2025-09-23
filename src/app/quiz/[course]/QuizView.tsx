
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, Suspense } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('@/components/landing/ThreeCanvas').then(m => m.ThreeCanvas), {
  ssr: false,
});


// Helper function to format the course name for display
function formatCourseName(course: string) {
  if (!course) return "Quiz";
  return course
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

export function QuizView({ course }: { course: string }) {
  const [courseName, setCourseName] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    setCourseName(formatCourseName(course));
  }, [course]);

  return (
     <div className="relative min-h-screen w-full overflow-hidden bg-background">
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
      <div className="relative z-20 flex flex-col min-h-screen items-center justify-center text-center p-4">
        <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground">
              {courseName} Quiz
            </CardTitle>
            <CardDescription>
              This quiz has not been assigned yet. Please check back later.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6">
              <Button asChild>
                  <Link href="/#ai-tools">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                  </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
