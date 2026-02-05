import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowDown, Plus } from 'lucide-react';
import type { PortfolioItem } from '../types';

import LogoLoader from './LogoLoader';

interface SupabasePortfolioItem {
  id: string;
  title: string;
  location: string;
  year: string;
  image_url: string;
}

const Portfolio: React.FC = () => {
  const [itemsToShow, setItemsToShow] = useState(3);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch portfolio items from Supabase
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mappedItems: PortfolioItem[] = data.map((p: SupabasePortfolioItem) => ({
          id: parseInt(p.id.slice(0, 8), 16), // Convert UUID to number for display
          title: p.title,
          location: p.location,
          year: p.year,
          image: p.image_url
        }));

        setPortfolioItems(mappedItems);
      } catch (err: any) {
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const totalItems = portfolioItems.length;

  const handleSeeMore = () => {
    setItemsToShow((prev) => Math.min(prev + 2, totalItems));
  };

  if (loading) {
    return <LogoLoader fullScreen />;
  }

  return (
    <div className="bg-white min-h-screen pt-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-6 py-12 text-center"
      >
        <h1 className="font-serif text-5xl md:text-7xl text-charcoal mb-4">Our Portfolio</h1>
        <p className="text-warmGrey max-w-xl mx-auto">Discover our masterpiece collection of architecture and interior design projects.</p>
      </motion.div>

      <div className="flex flex-col">
        {portfolioItems.slice(0, itemsToShow).map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-[90vh] md:h-screen group overflow-hidden border-b border-white/10"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />

            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 bg-gradient-to-t from-black/90 to-transparent">
              <div className="container mx-auto flex flex-col md:flex-row justify-between items-end">
                <div>
                  <span className="text-gold tracking-widest text-sm uppercase mb-2 block">{item.year} | {item.location}</span>
                  <h2 className="text-4xl md:text-6xl font-serif text-white">{item.title}</h2>
                </div>
                <div className="mt-6 md:mt-0">
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black bg-white/10 backdrop-blur-sm border border-white/30 px-6 py-3 rounded-sm hover:bg-gold hover:text-charcoal hover:border-gold transition-all duration-300"
                  >
                    <Plus size={18} />
                    <span>View Project</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {itemsToShow < totalItems && (
        <div className="py-20 text-center bg-white">
          <button
            onClick={handleSeeMore}
            className="inline-flex flex-col items-center gap-2 text-brown hover:text-black transition-colors"
          >
            <span className="uppercase tracking-[0.2em] text-sm">See More Projects</span>
            <ArrowDown className="animate-bounce" size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;