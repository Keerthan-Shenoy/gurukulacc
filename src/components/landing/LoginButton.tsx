
'use client';
import Link from 'next/link';

export function LoginButton() {
  return (
    <Link href="/auth/register">
      <div
        aria-label="Enroll Now Button"
        tabIndex={0}
        role="button"
        className="group relative flex h-[44px] w-[120px] cursor-pointer items-center justify-center rounded-xl bg-primary/20 transition-all duration-300 ease-in-out hover:bg-primary/70 hover:shadow-lg hover:shadow-primary/50 focus:bg-primary/70 focus:shadow-lg focus:shadow-primary/50 focus:outline-none"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 z-0 h-full w-full rounded-xl bg-gradient-to-br from-primary via-primary/0 to-primary/0 transition-all duration-300 ease-in-out group-hover:from-primary/50" />

        {/* Inner button content */}
        <div className="relative z-10 flex h-[40px] w-[116px] items-center justify-center gap-3 rounded-[10px] bg-background/80 text-foreground backdrop-blur-sm">
          <span className="font-semibold text-sm">Enroll Now</span>
        </div>
      </div>
    </Link>
  );
}
