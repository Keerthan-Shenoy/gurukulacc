import React from 'react';

export function FunHeading() {
  return (
    <div className="relative h-auto w-fit text-4xl font-bold font-poppins tracking-wider text-slate-800">
      <p className="relative z-10">Learn with fun and curiosity</p>
      <div className="absolute top-0 left-0 h-full w-[3.5rem] aspect-square rounded-2xl bg-background/50 backdrop-invert animate-move-invert-box" />
    </div>
  );
}
