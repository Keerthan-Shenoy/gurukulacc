'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function StudyAdda() {
  return (
    <section id="study-adda" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">Learning Adda</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Your personal space for focused learning and collaboration.
          </p>
        </motion.div>
        <div className="flex items-center justify-center">
            <Link href="/adda">
                <button type="button" className="space-btn">
                    <strong>EXPLORE</strong>
                    <div id="container-stars">
                        <div id="stars" />
                    </div>
                    <div id="glow">
                        <div className="circle" />
                        <div className="circle" />
                    </div>
                </button>
            </Link>
        </div>
      </div>
    </section>
  );
}
