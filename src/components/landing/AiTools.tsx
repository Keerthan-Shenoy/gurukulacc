
'use client';
import { motion } from "framer-motion";
import { Suspense } from "react";
import { QuizCard } from "./QuizCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { Atom, Stethoscope, GraduationCap, BookOpen, Landmark, PenSquare } from "lucide-react";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import('./ThreeCanvas').then(m => m.ThreeCanvas), {
  ssr: false,
});


const quizCourses = [
  {
    tag: 'JEE',
    title: 'JEE Preparation',
    href: '/quiz/jee',
    color: 'hsl(var(--quiz-card-jee))',
    icon: <Atom size={48} />,
  },
  {
    tag: 'NEET',
    title: 'NEET Preparation',
    href: '/quiz/neet',
    color: 'hsl(var(--quiz-card-neet))',
    icon: <Stethoscope size={48} />,
  },
  {
    tag: 'KCET',
    title: 'KCET Preparation',
    href: '/quiz/kcet',
    color: 'hsl(var(--quiz-card-kcet))',
    icon: <GraduationCap size={48} />,
  },
  {
    tag: 'ICSE',
    title: 'Class 10 - ICSE',
    href: '/quiz/icse-10',
    color: 'hsl(var(--quiz-card-icse))',
    icon: <BookOpen size={48} />,
  },
  {
    tag: 'CBSE',
    title: 'Class 10 - CBSE',
    href: '/quiz/cbse-10',
    color: 'hsl(var(--quiz-card-cbse))',
    icon: <PenSquare size={48} />,
  },
  {
    tag: 'State',
    title: 'Class 9 - State Board',
    href: '/quiz/state-9',
    color: 'hsl(var(--quiz-card-state))',
    icon: <Landmark size={48} />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export function AiTools() {
  const isMobile = useIsMobile();
  return (
    <div className="relative overflow-hidden">
    <section id="ai-tools" className="relative py-20 bg-background overflow-hidden animated-rainbow-bg">
      {!isMobile && (
        <>
          <div className="absolute inset-0 z-0 opacity-10">
            <Suspense fallback={<div className="bg-background w-full h-full" />} >
              <ThreeCanvas />
            </Suspense>
          </div>
          <div className="absolute inset-0 z-10 bg-background/80"></div>
        </>
      )}

      <div className="container mx-auto px-6 relative z-20">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">AI-Powered Quizzes</h2>
           <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Ready to test your knowledge? Select a course to start a quiz tailored just for you.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {quizCourses.map((course) => (
            <motion.div key={course.href} variants={item}>
              <QuizCard 
                title={course.title} 
                tag={course.tag} 
                href={course.href} 
                color={course.color}
                icon={course.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    </div>
  );
}
