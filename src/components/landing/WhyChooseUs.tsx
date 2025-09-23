'use client';
import { GraduationCap, Users, BookCheck, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <GraduationCap className="h-10 w-10 text-primary" />,
    title: 'Expert Faculty',
    description: 'Our team of experienced educators is dedicated to providing top-notch guidance and mentorship.',
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Personalized Attention',
    description: 'We believe in small batch sizes to ensure every student gets the individual focus they deserve.',
  },
  {
    icon: <BookCheck className="h-10 w-10 text-primary" />,
    title: 'Comprehensive Curriculum',
    description: 'Our curriculum is meticulously designed to cover all aspects of the syllabus, ensuring complete preparation.',
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Remedial Activities',
    description: 'Assessing, marking, classification of present knowledge status depending on the level of pupil facilitation to overcome the gap with frequent evaluation, probable loopholes can be removed applying innovative methods.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">Why Choose GCC?</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We are committed to nurturing future leaders through a blend of traditional values and modern teaching methodologies.
          </p>
        </motion.div>
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature) => (
             <motion.div key={feature.title} variants={item} className="h-full">
              <div className="relative drop-shadow-xl w-full h-full overflow-hidden rounded-xl bg-background/50 group">
                <div className="absolute w-64 h-56 bg-primary/20 blur-[70px] -left-1/4 -top-1/4 transition-all duration-500 group-hover:bg-accent/20" />
                <div className="relative z-[1] p-8 text-center flex flex-col items-center justify-center h-full">
                  <div className="flex items-center justify-center h-20 w-20 rounded-full bg-background/70 backdrop-blur-sm mx-auto mb-6 transition-colors duration-300 group-hover:bg-background">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
