import React from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import { HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Modern Luxury Interior"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/20 to-charcoal/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pb-32 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 md:w-12 bg-gold"></div>
            <span className="text-gold tracking-[0.2em] text-xs md:text-sm font-semibold">EST. 2024</span>
          </div>
          <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl text-white font-bold leading-tight mb-6 mt-2">
            Architecture  <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              & Interior Design
            </span>
          </h1>

          {/* Decorative Search Button (Visual only as per design) - Hidden on Mobile to save space */}
          <div className="hidden md:flex w-full max-w-[16rem] md:w-64 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-sm items-center px-4 justify-between group cursor-pointer hover:bg-white/20 transition-all">
            <span className="text-white/80 font-light">Search Design</span>
            <ArrowRight className="text-gold group-hover:translate-x-1 transition-transform" size={18} />
          </div>
        </motion.div>
      </div>

      {/* Floating Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute bottom-4 left-0 right-0 z-20 px-4 md:px-0 flex justify-center w-full"
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-soft-lg border border-stone p-3 md:p-4 flex flex-col md:flex-row items-stretch gap-2 md:gap-0 divide-y divide-purple-50/50 md:divide-stone md:divide-y-0 md:divide-x md:divide-stone w-full max-w-[340px] md:max-w-5xl mx-auto scale-90 md:scale-100 origin-bottom">

          {/* Filter 1 */}
          <div className="flex-1 px-2 md:px-6 py-2 md:py-3 w-full md:w-64 cursor-pointer hover:bg-cream transition-colors rounded-xl group">
            <div className="flex items-center justify-between text-warmGrey text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 md:mb-2">
              <span className="flex items-center gap-2"><MapPin size={12} className="text-gold" /> City Street</span>
              <ChevronDown size={14} className="group-hover:text-gold transition-colors" />
            </div>
            <div className="text-charcoal font-serif font-bold text-base md:text-xl border-l-2 border- transparent group-hover:border-gold md:pl-2 md:-ml-2 transition-all">
              234 STREET
            </div>
          </div>

          {/* Filter 2 */}
          <div className="flex-1 px-2 md:px-6 py-2 md:py-3 w-full md:w-64 cursor-pointer hover:bg-cream transition-colors rounded-xl group">
            <div className="flex items-center justify-between text-warmGrey text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 md:mb-2">
              <span>Typology Of Rent</span>
              <ChevronDown size={14} className="group-hover:text-gold transition-colors" />
            </div>
            <div className="text-charcoal font-serif font-bold text-sm md:text-lg">
              Home & Apart
            </div>
          </div>

          {/* Filter 3 */}
          <div className="flex-1 px-2 md:px-6 py-2 md:py-3 w-full md:w-48 cursor-pointer hover:bg-cream transition-colors rounded-xl group">
            <div className="flex items-center justify-between text-warmGrey text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-1 md:mb-2">
              <span>Price</span>
              <ChevronDown size={14} className="group-hover:text-gold transition-colors" />
            </div>
            <div className="text-charcoal font-serif font-bold text-sm md:text-lg">
              $100 - $5k
            </div>
          </div>

          {/* Search Button */}
          <div className="px-1 py-1 w-full md:w-auto flex items-center mt-1 md:mt-0">
            <button className="bg-gold hover:bg-gold-dark text-white w-full md:w-auto h-10 md:h-14 px-6 md:px-8 rounded-lg md:rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-semibold shadow-soft hover:shadow-soft-lg">
              <Search size={18} />
              <span className="text-sm md:text-base">Search</span>
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default Hero;