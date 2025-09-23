
'use client';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Suspense, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import dynamic from 'next/dynamic';

const ThreeCanvas = dynamic(() => import('@/components/landing/ThreeCanvas').then(m => m.ThreeCanvas), {
  ssr: false,
});


const galleryImages = [
    { src: '/adda/1.png', alt: 'GCC students learning', hint: 'students classroom' },
    { src: '/adda/2.png', alt: 'GCC students in class', hint: 'students learning' },
    { src: '/adda/3.png', alt: 'GCC classroom activity', hint: 'classroom activity' },
    { src: '/adda/4.png', alt: 'GCC teacher and student', hint: 'teacher student' },
    { src: '/adda/5.png', alt: 'GCC students studying', hint: 'students studying' },
    { src: '/adda/6.png', alt: 'GCC classroom discussion', hint: 'classroom discussion' },
    { src: '/adda/7.png', alt: 'GCC students working together', hint: 'students collaboration' },
    { src: '/adda/8.png', alt: 'GCC student presentation', hint: 'student presentation' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function AddaGallery() {
    const isMobile = useIsMobile();
    const [selectedImg, setSelectedImg] = useState<string | null>(null);

  return (
    <section className="relative py-20 bg-background text-foreground min-h-screen overflow-hidden">
        {!isMobile && (
        <>
          <div className="absolute inset-0 z-0 opacity-50">
            <Suspense fallback={<div className="bg-background w-full h-full" />} >
              <ThreeCanvas />
            </Suspense>
          </div>
          <div className="absolute inset-0 z-10 bg-background/60 backdrop-blur-sm"></div>
        </>
      )}
      <div className="container mx-auto px-6 relative z-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-foreground font-poppins">Learning Adda Gallery</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            A collection of moments from our learning journey.
          </p>
          <div className="mt-6">
             <p className="text-muted-foreground mb-4">
                Want to see more? Enroll now to get full access.
              </p>
            <Button asChild>
              <Link href="/register">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
            className="columns-2 md:columns-3 lg:columns-4 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
        >
          {galleryImages.map((image, index) => (
            <motion.div 
              key={index} 
              variants={item} 
              className="mb-4 break-inside-avoid group overflow-hidden rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow duration-300"
              onClick={() => setSelectedImg(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                data-ai-hint={image.hint}
                style={{
                  height: 'auto'
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

       <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedImg(null)}
          >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative max-w-[90vw] max-h-[90vh]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
            >
                <Image 
                    src={selectedImg} 
                    alt="Zoomed image"
                    width={1200}
                    height={800}
                    className="object-contain w-auto h-auto max-w-full max-h-full rounded-lg"
                    style={{
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                    }}
                />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
