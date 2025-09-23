
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";
import { Suspense } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import('./ThreeCanvas').then(m => m.ThreeCanvas), {
  ssr: false,
});

const faqs = [
    {
        question: "Which is the better time to start the preparation to competitive professional entrance examinations such as jee need and so on?",
        answer: "6th standard is time to so early preparation. 9th standard is a really better time to prepare. 10th standard is already late to prepare. 11th standard, it is too late. 12th standard, can prepare but result depends on your fate."
    },
    {
        question: "Is maths a difficult subject to study?",
        answer: "Not difficult but distinct, needs different strategy to study."
    },
    {
        question: "Being a student, daily how many hours I should study?",
        answer: "Don't consider hours, in one hour how much qualitatively and quantitatively student Learns is important."
    },
    {
        question: "Whatever I do, forget all the learnt things after some period are in the required time. what I have to do?",
        answer: "Learn to learn unforgettably. To acquire effective learning skills, an assessment, diagnosis, training, and practice process should take place."
    },
    {
        question: "Being student how many hours I have to relax I mean sleep?",
        answer: "The number of hours required by your body and mind to refresh. The time duration depends on the individual and their lifestyle."
    },
    {
        question: "How to overcome from distractions during study?",
        answer: "Distract the distractions by firm determination and regular practice, repeatedly concentrating on study."
    },
    {
        question: "First PUC is important to science stream students, WHY?",
        answer: "• To upgrade the basic concepts.\n• To get control over the required essentials such as units, dimensions and knowledge on which the second PUC advances.\n• Every subject has its own uniqueness; to understand that and to learn it effectively.\n• To understand the correlation between different subjects and the dependency of one on another.\n• One year the student has to spend to get complete knowledge and acquire it to implement it in the near future.\n• Otherwise your 2nd PUC studies will become vague.\n• Most of the time, neglecting the first PUC means the student will further be like walking in the dark, which will not work.\n• Without a key, you can't unlock a lock; in the same way, not learning the basics means you can't understand the advanced concepts.\n• Adopt yourself to the new environment in the first PUC and prepare yourself effectively for the next task.\n• Remember, competitive professional entrance examinations papers also consist of questions based on 1st PUC syllabus as per their quota."
    }
]

export function Faq() {
  const isMobile = useIsMobile();
  return (
    <section id="faq" className="relative py-20 bg-background overflow-hidden">
       {!isMobile && (
        <>
          <div className="absolute inset-0 z-0 opacity-10">
            <Suspense fallback={<div className="bg-background w-full h-full" />} >
              <ThreeCanvas />
            </Suspense>
          </div>
          <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm"></div>
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
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </motion.div>
        
        <motion.div 
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 sm:p-8 rounded-2xl shadow-xl border border-border/20">
            {faqs.map((faq, index) => (
                 <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="text-lg text-left text-card-foreground">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground whitespace-pre-line">
                      {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
