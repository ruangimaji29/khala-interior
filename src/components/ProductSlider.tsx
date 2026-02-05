import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ExclusiveItem {
  id: string;
  image_url: string;
  title: string; // optional, mainly for alt text
}

import type { ViewState } from '../types';

interface ProductSliderProps {
  onNavigate: (view: ViewState) => void;
}

const ProductSlider: React.FC<ProductSliderProps> = ({ onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState<ExclusiveItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch photos from Supabase exclusive_collections
  useEffect(() => {
    const fetchExclusivePhotos = async () => {
      try {
        const { data, error } = await supabase
          .from('exclusive_collections')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Map if necessary, though schema is simple
        setItems(data as ExclusiveItem[]);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching exclusive collections:', err);
        setLoading(false);
      }
    };

    fetchExclusivePhotos();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const getVisibleItems = () => {
    if (items.length === 0) return [];
    if (items.length === 1) return [items[0]];
    const prev = (currentIndex - 1 + items.length) % items.length;
    const next = (currentIndex + 1) % items.length;
    return [items[prev], items[currentIndex], items[next]];
  };

  const visibleItems = getVisibleItems();

  if (loading) {
    return (
      <section className="py-24 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="h-[500px] flex items-center justify-center">
            <div className="text-warmGrey animate-pulse">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-cream relative overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="popLayout">
          {items[currentIndex] && (
            <motion.div
              key={items[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Blurred Background Image */}
              <img
                src={items[currentIndex].image_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
              />
              {/* Light Overlay to ensure text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-cream/90 via-cream/80 to-cream/95" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-16 border-b border-white/10 pb-6"
        >
          <div className="w-full md:w-auto mb-8 md:mb-0">
            <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase block mb-2 text-center md:text-left">Exclusive Collection</span>
            <h2 className="text-charcoal font-serif text-3xl md:text-5xl font-bold text-center md:text-left">
              Featured Photos
            </h2>
          </div>

        </motion.div>

        {/* Carousel Area */}
        <div className="relative min-h-[500px] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
          {/* Main Slider Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">
            {visibleItems.map((item, index) => {
              const isCenter = index === 1;
              return (
                <motion.div
                  key={`${item.id}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isCenter ? 1 : 0.5,
                    scale: isCenter ? 1 : 0.9, // Less drastic scale difference
                    y: isCenter ? 0 : 20,
                    zIndex: isCenter ? 10 : 1
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                  className={`relative rounded-3xl p-1 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden
                                ${isCenter
                      ? 'bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-[400px] md:h-[450px] w-full max-w-[90vw] md:max-w-none mx-auto'
                      : 'bg-transparent border border-white/5 h-[350px] hidden md:flex'
                    }
                            `}
                >
                  <motion.img
                    src={item.image_url}
                    alt={item.title || "Exclusive Collection"}
                    className={`object-cover w-full h-full rounded-2xl transition-all duration-500 drop-shadow-xl ${isCenter ? '' : 'filter grayscale opacity-60'}`}
                  />
                </motion.div>
              )
            })}
          </div>

          {/* Navigation & See All - Now clearly below the image on mobile (via flex-col) */}
          <div className="md:absolute md:mt-0 flex flex-col items-center gap-6 mt-4 md:mt-12 w-full md:w-auto z-20 md:bottom-[-20px] lg:bottom-[-40px]">
            {/* Mobile-only pagination dots if needed, but buttons are requested */}
            <div className="flex gap-4">
              <button
                onClick={prevSlide}
                className="p-4 border border-charcoal/10 rounded-full text-charcoal bg-white/50 backdrop-blur-sm md:bg-transparent hover:bg-gold hover:border-gold hover:text-white transition-all shadow-soft"
                aria-label="Previous Slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="p-4 border border-charcoal/10 rounded-full text-charcoal bg-white/50 backdrop-blur-sm md:bg-transparent hover:bg-gold hover:border-gold hover:text-white transition-all shadow-soft"
                aria-label="Next Slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="text-brown hover:text-gold transition-colors text-sm uppercase tracking-widest border-b border-brown/30 hover:border-gold pb-1"
            >
              See All Photos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;