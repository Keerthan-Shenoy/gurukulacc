'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FunHeading } from './FunHeading';

const fadeIn = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export function About() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12 flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <FunHeading />
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.div variants={fadeIn}>
            <Image
              src="https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxpbm5vdmF0aW9ufGVufDB8fHx8MTc1MjkzNzg4NHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="GCC Classroom"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              data-ai-hint="innovation lightbulb"
            />
          </motion.div>
          <motion.div variants={fadeIn}>
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-poppins">Welcome to GCC</h2>
            <p className="text-gray-600 mb-6 text-lg">
              We bring the <span className="text-primary font-bold">BEST</span> out of you.
              <br/> <br/>
              Join as a bud today and blossom into a beautiful flower tomorrow- embark on a journey where passion meets excellence and it's time to ignite your potential.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <i className="fas fa-bullseye"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-700">Our Mission</h3>
                  <p className="text-gray-500">
                    To provide a dynamic and supportive learning environment that encourages curiosity, critical thinking, and a passion for learning.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <i className="fas fa-eye"></i>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-slate-700">Our Vision</h3>
                  <p className="text-gray-500">
                    To be a leading educational institution recognized for our commitment to excellence and our contribution to students' success.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
