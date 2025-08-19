
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "framer-motion";

const faqs = [
    {
        question: "What courses does GCC offer?",
        answer: "GCC provides comprehensive coaching for Class 9 & 10 (ICSE, CBSE, State Board) and prepares students for competitive exams like JEE, NEET, and KCET."
    },
    {
        question: "What is the batch size for the classes?",
        answer: "We believe in personalized attention and maintain small batch sizes to ensure every student gets the individual focus they deserve from our expert faculty."
    },
    {
        question: "How do you assess student progress?",
        answer: "We conduct regular assessments, including chapter-wise tests, mock exams, and performance analysis to track student progress and identify areas for improvement."
    },
    {
        question: "Are there any remedial classes for students who need extra help?",
        answer: "Yes, we offer remedial activities and doubt-clearing sessions. Our innovative methods help students overcome learning gaps and strengthen their understanding of concepts."
    },
    {
        question: "How can I enroll my child at GCC?",
        answer: "You can start by contacting us via phone or email to schedule a counseling session. You can find all our contact details in the 'Contact Us' section of our website."
    }
]

export function Faq() {
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
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
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                 <AccordionItem value={`item-${index+1}`} key={index}>
                    <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600">
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
