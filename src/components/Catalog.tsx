import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ShoppingBag, Loader2 } from 'lucide-react';
import type { ProductItem } from '../types';

interface CatalogProps {
  onBuy: (product: ProductItem) => void;
}

import LogoLoader from './LogoLoader';

interface SupabaseProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
}

const Catalog: React.FC<CatalogProps> = ({ onBuy }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Map Supabase data to ProductItem format
        const mappedProducts: ProductItem[] = data.map((p: SupabaseProduct) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          price: p.price,
          displayPrice: `$${p.price.toLocaleString()}`,
          description: p.description,
          image: p.image_url
        }));

        setProducts(mappedProducts);
      } catch (err: any) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handleBuyClick = (product: ProductItem) => {
    setProcessingId(product.id);
    // Simulate processing delay for visual feedback
    setTimeout(() => {
      onBuy(product);
      setProcessingId(null);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6">
      <div className="container mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 pb-6 border-b border-white/10">
          <div>
            <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-2">Collection</h1>
            <p className="text-warmGrey">Curated pieces for the modern home.</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 mt-6 md:mt-0 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                  ? 'bg-gold text-white shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-stone text-brown hover:text-white hover:bg-gold'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex justify-center">
            <LogoLoader />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 mb-4">Failed to load products: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="text-gold hover:text-brown transition-colors underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={product.id}
                  className={`group relative bg-cream-light rounded-xl overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-stone ${processingId === product.id ? 'ring-2 ring-gold' : ''}`}
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay Action */}
                    <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${processingId === product.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleBuyClick(product)}
                        disabled={processingId === product.id}
                        className={`px-6 py-3 rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 transform duration-300 ${processingId === product.id
                          ? 'bg-gold text-white translate-y-0'
                          : 'bg-white text-charcoal hover:bg-gold hover:text-white translate-y-4 group-hover:translate-y-0'
                          }`}
                      >
                        {processingId === product.id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" /> Processing
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} /> Buy Now
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs text-gold uppercase tracking-wider block mb-1">{product.category}</span>
                        <h3 className="text-charcoal font-serif text-lg">{product.title}</h3>
                      </div>
                      <span className="text-charcoal font-bold">{product.displayPrice}</span>
                    </div>
                    <p className="text-warmGrey text-xs line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-warmGrey"
          >
            No products found in this category.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalog;