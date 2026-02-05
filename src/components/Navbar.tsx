import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import type { ViewState, NavItem } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewState) => void;
  currentView: ViewState;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (currentView === 'home') {
        // Active section logic
        const sections = ['hero', 'about', 'services', 'footer'];
        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is within the top half of the viewport
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
              setActiveSection(sectionId);
            }
          }
        }
        // Specific check for top of page
        if (scrollY < 100) setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks: NavItem[] = [
    { label: 'Home', view: 'home', sectionId: 'hero' },
    { label: 'Portfolio', view: 'portfolio' },
    { label: 'Services', view: 'home', sectionId: 'services' },
    { label: 'About Us', view: 'home', sectionId: 'about' },
    { label: 'Contact', view: 'home', sectionId: 'footer' },
  ];

  const handleLinkClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    onNavigate(item.view);

    // If navigating to a section within home
    if (item.view === 'home' && item.sectionId) {
      setTimeout(() => {
        const element = document.getElementById(item.sectionId!);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    }

    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (item: NavItem) => {
    if (currentView !== item.view) return false;
    if (currentView === 'home' && item.sectionId) {
      // For contact link which points to footer, it might match 'footer' section
      if (item.label === 'Contact' && activeSection === 'footer') return true;
      return activeSection === item.sectionId;
    }
    return true; // If view matches and no specific section (like Portfolio page)
  };

  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-cream/95 backdrop-blur-md shadow-soft border-b border-charcoal/10 py-4"
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <img
            src="/IMG_3886.PNG"
            alt="Khala Interior Logo"
            className="h-14 w-auto object-contain brightness-100 group-hover:brightness-110 transition-all"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg leading-none tracking-widest text-charcoal">KHALA</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-brown group-hover:text-gold transition-colors">Interior</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={`#${link.sectionId || ''}`}
              onClick={(e) => handleLinkClick(e, link)}
              className={`text-sm font-medium tracking-wide transition-all duration-300 relative ${isLinkActive(link)
                ? 'text-gold'
                : 'text-charcoal-light hover:text-gold'
                }`}
            >
              {link.label.toUpperCase()}
              {isLinkActive(link) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={() => onNavigate('catalog')}
            className="bg-gold hover:bg-gold-dark text-cream border border-gold px-6 py-2 rounded-sm transition-all duration-300 text-sm font-semibold uppercase tracking-wider shadow-soft hover:shadow-soft-lg"
          >
            Buy Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-charcoal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-cream border-t border-charcoal/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={`#${link.sectionId || ''}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-lg font-serif transition-colors ${isLinkActive(link) ? 'text-gold' : 'text-charcoal hover:text-gold'
                    }`}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  onNavigate('catalog');
                  setIsMobileMenuOpen(false);
                }}
                className="text-gold text-lg font-serif text-left pt-2 border-t border-white/10"
              >
                BUY NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;