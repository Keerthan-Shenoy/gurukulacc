
'use client';
import { motion } from 'framer-motion';

export function AdmissionsOpenBanner() {
  const text = "✨ADMISSIONS OPEN 2025/26 - COACHING AVAILABLE FOR CLASS 9,10 & PUC✨";
  return (
    <section className="bg-background py-8">
      <div className="relative rounded-lg mx-auto max-w-7xl animated-gradient-border">
        <div className="relative bg-[#100720] rounded-[calc(var(--radius)-3px)] overflow-hidden">
          <div className="relative flex overflow-x-hidden text-[#ffd277]">
            <motion.div
              className="flex whitespace-nowrap md:animate-marquee py-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8 hidden md:block">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8 hidden md:block">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8 hidden md:block">
                {text}
              </h2>
            </motion.div>
            <div className="absolute top-0 hidden md:flex whitespace-nowrap animate-marquee2 py-4">
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8">
                {text}
              </h2>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-wide px-8">
                {text}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
