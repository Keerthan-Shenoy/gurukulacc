'use client';

import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

const galleryImages: { src: string; alt: string; hint: string }[] = [
  { src: '/gallery/physics-01.png', alt: 'Physics Concept 1', hint: 'physics circuit' },
  { src: '/gallery/chemistry-01.png', alt: 'Chemistry Concept 1', hint: 'chemistry beaker' },
  { src: '/gallery/math-01.png', alt: 'Mathematics Concept 1', hint: 'maths formula' },
  { src: '/gallery/physics-02.png', alt: 'Physics Concept 2', hint: 'physics atom' },
  { src: '/gallery/chemistry-02.png', alt: 'Chemistry Concept 2', hint: 'chemistry molecule' },
  { src: '/gallery/math-02.png', alt: 'Mathematics Concept 2', hint: 'maths graph' },
  { src: '/gallery/physics-03.png', alt: 'Physics Concept 3', hint: 'physics light' },
  { src: '/gallery/chemistry-03.png', alt: 'Chemistry Concept 3', hint: 'chemistry lab' },
  { src: '/gallery/math-03.png', alt: 'Mathematics Concept 3', hint: 'maths geometry' },
];

export function ConceptGallery() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">Your Concept Gallery</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            A glimpse into the worlds of Physics, Chemistry, and Mathematics.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {galleryImages.length > 0 ? (
                galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden bg-card">
                        <CardContent className="flex aspect-video items-center justify-center p-0">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover"
                            data-ai-hint={image.hint}
                            priority={index === 0} // first image loads fast
                            loading={index === 0 ? 'eager' : 'lazy'}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                [...Array(6)].map((_, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="overflow-hidden bg-card">
                        <CardContent className="flex aspect-video items-center justify-center p-0 bg-muted">
                          {/* Placeholder for empty items */}
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              )}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
