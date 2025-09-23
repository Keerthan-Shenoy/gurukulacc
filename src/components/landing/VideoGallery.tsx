
'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import React, { useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const video = {
    src: '/adda/Gurukula coaching center.MP4',
    type: 'video/mp4',
    title: 'Welcome to Gurukula Coaching Centre',
    description: 'A glimpse into our dynamic and engaging learning environment.',
};

export function VideoGallery() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = React.useState(true);

    const toggleMute = () => {
        if (videoRef.current) {
            const newMutedState = !videoRef.current.muted;
            videoRef.current.muted = newMutedState;
            setIsMuted(newMutedState);
        }
    };
  return (
    <section id="videos" className="py-20 bg-background animated-rainbow-bg">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-slate-800 font-poppins">From the Classroom</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            A sneak peek into our dynamic and engaging learning environment.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
             <motion.div
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
                }}
                className="w-full max-w-4xl"
             >
                <Card className="overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <CardContent className="p-0 relative">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-cover cursor-pointer"
                            autoPlay
                            loop
                            muted
                            playsInline
                            onClick={toggleMute}
                        >
                            <source src={video.src} type={video.type} />
                            Your browser does not support the video tag.
                        </video>
                         <div
                            onClick={toggleMute}
                            className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </div>
                    </CardContent>
                    <div className="p-4">
                        <h3 className="font-bold text-lg">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
