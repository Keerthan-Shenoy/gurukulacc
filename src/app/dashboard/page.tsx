'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Activity, BookOpenCheck, Hourglass } from 'lucide-react';

interface UserType {
  id: string;
  name: string;
  email: string;
  [key: string]: any;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return null; // no need to redirect, middleware handles it

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Logged in as <strong>{user.name}</strong>
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-3">
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Ready to continue your learning journey, {user.name}? Here's a snapshot of your progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/#ai-tools">Take a New Quiz</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Taken</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Studied</CardTitle>
            <Hourglass className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.5</div>
            <p className="text-xs text-muted-foreground">+5.2 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>A log of your recent quizzes and study sessions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            <Activity className="mx-auto h-8 w-8 mb-2" />
            <p>No recent activity to display.</p>
            <p className="text-sm">Complete a quiz to see your activity here.</p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
