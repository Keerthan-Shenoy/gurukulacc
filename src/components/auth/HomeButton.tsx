'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';

export function HomeButton() {
  return (
    <Link
      href="/"
      className="group absolute top-4 left-4 z-30 flex h-12 w-32 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-none active:opacity-80"
    >
      <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
      <span>Home</span>
    </Link>
  );
}
