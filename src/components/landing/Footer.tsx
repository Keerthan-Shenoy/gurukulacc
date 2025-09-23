
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Phone, MessageSquare, Mail, Instagram, MapPin, Copy } from 'lucide-react';
import { motion } from 'framer-motion';


export function Footer() {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard',
      description: `${label} has been copied.`,
    });
  };

  const contactDetails = [
    {
      icon: <Phone />,
      label: 'Phone',
      value: '+91 9108546921',
      href: 'tel:+919108546921',
    },
    {
      icon: <MessageSquare />,
      label: 'WhatsApp',
      value: '+91 6362173189',
      href: 'https://wa.me/916362173189',
    },
    {
      icon: <Mail />,
      label: 'Email',
      value: 'gurukulacoachingcentre@gmail.com',
      href: 'mailto:gurukulacoachingcentre@gmail.com',
    },
    {
      icon: <Instagram />,
      label: 'Instagram',
      value: 'gurukulacc.in',
      href: 'https://instagram.com/gurukulacc.in',
    },
    {
      icon: <MapPin />,
      label: 'Address',
      value: '#983, 3rd Cross, HMT Layout, Nagasandra Post, Bangalore - 560073',
      href: "https://www.google.com/maps/place/13%C2%B002'17.0%22N+77%C2%B030'00.0%22E/@13.0380423,77.4974257,831m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d13.0380423!4d77.5000006?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D"
    },
  ];

  return (
    <motion.footer 
      id="contact" 
      className="bg-background text-slate-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold font-poppins">Contact Us!</h2>
            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="text-primary mt-1">{item.icon}</div>
                  <div className="flex-grow">
                    <p className="font-bold text-lg">{item.label}</p>
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-primary"
                    onClick={() => copyToClipboard(item.value, item.label)}
                    aria-label={`Copy ${item.label}`}
                  >
                    <Copy size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center bg-card p-8 rounded-lg shadow-md mt-10 md:mt-0">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Location</h2>
             <div className="flex justify-center mb-4">
                <Image 
                    src="/qr-code.png"
                    alt="Location QR Code"
                    width={200}
                    height={200}
                    className="rounded-lg"
                />
             </div>
            <p className="text-gray-600 mb-6">Scan to view our location on Google Maps</p>
            <Button asChild>
              <a href="https://www.google.com/maps/place/13%C2%B002'17.0%22N+77%C2%B030'00.0%22E/@13.0380423,77.4974257,831m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d13.0380423!4d77.5000006?entry=ttu&g_ep=EgoyMDI1MDcxNS4xIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-2" /> Open in Maps
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-200 flex justify-center">
            <div className="relative p-1 overflow-hidden rounded-lg animated-gradient-border w-fit">
              <div className="relative z-10 bg-card text-gray-500 text-sm px-4 py-2 rounded-md">
                &copy; {new Date().getFullYear()} GCC. All rights reserved.
              </div>
            </div>
        </div>
      </div>
    </motion.footer>
  );
}
