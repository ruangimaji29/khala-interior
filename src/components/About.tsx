import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ABOUT_IMAGE } from '../constants';
import { ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';



import type { ViewState } from '../types';

interface AboutProps {
  onNavigate: (view: ViewState) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([ABOUT_IMAGE]); // Fallback initial image

  // Fetch images from exclusive_collections
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from('exclusive_collections')
          .select('image_url')
          .limit(10) // Limit to 10 latest images for the slideshow
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const fetchedImages = data.map((item: any) => item.image_url);
          // Combine fetched images, unique values
          setImages(fetchedImages);
        }
      } catch (err) {
        console.error('Error fetching about images:', err);
      }
    };

    fetchImages();
  }, []);

  // Auto slideshow
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [images]);

  return (
    <section id="about" className="py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-20 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative"
          >
            <div className="relative z-10 rounded-sm overflow-hidden border border-white/10 shadow-2xl h-[400px] md:h-[500px]">
              <AnimatePresence mode="popLayout">
                <motion.img
                  key={currentImageIndex}
                  src={images[currentImageIndex]}
                  alt="Elegant Interior Design"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Overlay Content on Image */}
              <div className="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/80 to-transparent w-full z-20 pointer-events-none">
                <span className="text-gold font-serif text-2xl italic">Luxury Living</span>
              </div>
            </div>

            {/* Decorative Frame Behind */}
            <div className="absolute top-6 -left-6 w-full h-full border border-gold/30 rounded-sm -z-0 hidden md:block" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-gold"></div>
              <span className="text-gold tracking-[0.2em] text-sm font-semibold uppercase">Who We Are</span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl text-charcoal font-bold mb-8 leading-tight">
              ABOUT <span className="text-warmGrey">US</span>
            </h2>

            <p className="text-charcoal-light text-lg leading-relaxed font-light mb-8">
              We are an <span className="text-charcoal font-medium">Architecture & Interior Design company</span> dedicated to helping you create your dream. We believe that every space should feel personal, comfortable, and truly yours.
            </p>

            <p className="text-warmGrey text-base leading-relaxed mb-10 border-l-2 border-gold/50 pl-6">
              Our firm specializes in Architecture, Interior Design, Renovation, and Construction. We are deeply passionate about what we do, delivering high-quality workmanship and making sure every project feels truly yours.
            </p>

            <button
              onClick={() => onNavigate('gallery')}
              className="group flex items-center gap-2 text-charcoal border-b border-charcoal/30 pb-1 hover:border-gold hover:text-white transition-all duration-300 uppercase tracking-widest text-xs font-bold"
            >
              Our Story
              <ArrowUpRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;