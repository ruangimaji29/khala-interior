import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, MapPin, Phone, ArrowRight, ArrowUpCircle } from 'lucide-react';
import { CONTACT_DETAILS } from '../constants';
import { supabase } from '../lib/supabase';
import type { ViewState } from '../types';

interface FooterProps {
    onNavigate: (view: ViewState) => void;
}

interface FooterLink {
    label: string;
    view: ViewState;
    sectionId?: string;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const [footerLinks, setFooterLinks] = useState<FooterLink[]>([
        { label: 'Home', view: 'home' as ViewState },
        { label: 'Portfolio', view: 'portfolio' as ViewState },
        { label: 'Catalog', view: 'catalog' as ViewState },
        { label: 'About Us', sectionId: 'about', view: 'home' as ViewState },
    ]);

    // Fetch footer links from Supabase
    useEffect(() => {
        const fetchFooterLinks = async () => {
            try {
                const { data, error } = await supabase
                    .from('footer_links')
                    .select('*')
                    .order('sort_order', { ascending: true });

                if (error) throw error;

                const mappedLinks: FooterLink[] = data.map((link: any) => ({
                    label: link.label,
                    view: link.view_name as ViewState,
                    sectionId: link.section_id || undefined
                }));

                setFooterLinks(mappedLinks);
            } catch (err: any) {
                console.error('Error fetching footer links:', err);
                // Keep default footer links on error
            }
        };

        fetchFooterLinks();
    }, []);

    const handleLinkClick = (item: FooterLink) => {
        onNavigate(item.view);
        if (item.view === 'home' && item.sectionId) {
            setTimeout(() => {
                const element = document.getElementById(item.sectionId!);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer id="footer" className="bg-stone-dark pt-20 pb-10 border-t border-charcoal/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <img
                                src="/IMG_3886.PNG"
                                alt="Khala Interior Logo"
                                className="h-16 w-auto object-contain"
                            />
                            <div className="flex flex-col">
                                <span className="font-serif text-xl leading-none tracking-widest text-charcoal">KHALA</span>
                                <span className="text-xs uppercase tracking-[0.2em] text-brown">Interior</span>
                            </div>
                        </div>
                        <p className="text-warmGrey text-sm leading-relaxed mb-6">
                            Architecture & Interior Design dedicated to creating spaces that reflect your lifestyle and personality.
                        </p>

                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/khalainterior?igsh=YmdsNnR4b2dxeDkw&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-stone flex items-center justify-center text-brown hover:bg-gold hover:text-charcoal transition-all"
                            >
                                <Instagram size={18} />
                            </a>
                            <a
                                href="https://www.instagram.com/khalainterior?igsh=YmdsNnR4b2dxeDkw&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-stone flex items-center justify-center text-brown hover:bg-gold hover:text-charcoal transition-all"
                            >
                                {/* Custom TikTok SVG Icon as Lucide doesn't have one */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-music-2"
                                >
                                    <path d="M9 18V5l12-2v13"></path>
                                    <circle cx="6" cy="18" r="3"></circle>
                                    <circle cx="18" cy="16" r="3"></circle>
                                </svg>
                            </a>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="text-charcoal font-serif text-lg mb-6">Explore</h4>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <button
                                        onClick={() => handleLinkClick(link)}
                                        className="flex items-center gap-2 text-brown hover:text-charcoal transition-colors text-sm group"
                                    >
                                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all duration-300" />
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h4 className="text-charcoal font-serif text-lg mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-brown">
                                <Phone size={18} className="mt-1 flex-shrink-0" />
                                <div>
                                    <span className="text-xs uppercase tracking-wider block text-warmGrey mb-1">WhatsApp</span>
                                    <a
                                        href={`https://wa.me/${CONTACT_DETAILS.whatsapp.replace(/\D/g, '')}?text=Hello%20Khala%20Interior,%20I'm%20interested%20in%20your%20services.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-charcoal hover:text-gold transition-colors block"
                                    >
                                        {CONTACT_DETAILS.whatsapp}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-brown">
                                <Instagram size={18} className="mt-1 flex-shrink-0" />
                                <div>
                                    <span className="text-xs uppercase tracking-wider block text-warmGrey mb-1">Instagram</span>
                                    <a
                                        href="https://www.instagram.com/khalainterior/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-charcoal hover:text-gold transition-colors block"
                                    >
                                        {CONTACT_DETAILS.instagram}
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Address */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h4 className="text-charcoal font-serif text-lg mb-6">Location</h4>
                        <div className="flex gap-3 text-brown">
                            <MapPin size={18} className="mt-1 flex-shrink-0" />
                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_DETAILS.address)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm leading-relaxed text-charcoal hover:text-gold transition-colors"
                            >
                                {CONTACT_DETAILS.address}
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-warmGrey text-xs">
                        © {new Date().getFullYear()} Khala Interior. All rights reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <button
                            onClick={() => onNavigate('home')}
                            className="text-warmGrey hover:text-charcoal text-xs transition-colors"
                        >
                            Privacy Policy
                        </button>
                        <button
                            onClick={() => onNavigate('home')}
                            className="text-warmGrey hover:text-charcoal text-xs transition-colors"
                        >
                            Terms of Service
                        </button>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-warmGrey hover:text-black transition-colors ml-4"
                            aria-label="Scroll to top"
                        >
                            <ArrowUpCircle size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;