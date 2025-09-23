
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const coursesData = [
    {
        tag: 'ICSE',
        title: 'Class 9 & 10 - ICSE',
        description: 'Comprehensive coaching for the ICSE board curriculum, focusing on building a strong conceptual foundation.',
    },
    {
        tag: 'CBSE',
        title: 'Class 9 & 10 - CBSE',
        description: 'Tailored coaching for the CBSE syllabus, with an emphasis on NCERT solutions and exam patterns.',
    },
    {
        tag: 'State',
        title: 'Class 9 & 10 - State Board',
        description: 'Specialized coaching for the state board syllabus, ensuring students excel in their school examinations.',
    },
    {
        tag: 'JEE',
        title: 'JEE Preparation',
        description: 'Intensive preparation program for aspiring engineers, covering all aspects of the JEE Main and Advanced exams.',
    },
    {
        tag: 'NEET',
        title: 'NEET Preparation',
        description: 'Dedicated coaching for medical aspirants, focusing on the NEET syllabus with in-depth concept building and extensive testing.',
    },
    {
        tag: 'KCET',
        title: 'KCET Preparation',
        description: 'Focused coaching for the Karnataka Common Entrance Test, preparing students for top professional courses in the state.',
    },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const CourseCard = ({ course }: { course: typeof coursesData[0] }) => {
  return (
    <motion.div variants={item} className="h-full">
        <Card className="shadow-lg h-full flex flex-col bg-card border-0 transition-shadow duration-300 w-full hover:shadow-2xl">
            <div className="flex h-32 w-full items-center justify-center bg-primary/10 p-4 rounded-t-lg">
                <span className="font-extrabold text-4xl text-primary opacity-75">{course.tag}</span>
            </div>
            <CardHeader>
                <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-gray-600">{course.description}</p>
            </CardContent>
        </Card>
    </motion.div>
  );
};


export function Courses() {
  return (
    <section id="courses" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">Our Courses</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            We offer a range of courses designed to cater to the diverse needs of our students.
          </p>
        </motion.div>
        
        <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
        >
            {coursesData.map((course) => (
                <CourseCard course={course} key={course.tag} />
            ))}
        </motion.div>

      </div>
    </section>
  );
}
