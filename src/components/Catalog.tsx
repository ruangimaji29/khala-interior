import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ShoppingBag, Loader2 } from 'lucide-react';
import type { ProductItem } from '../types';
import LogoLoader from './LogoLoader';

interface CatalogProps {
  onBuy: (product: ProductItem) => void;
}

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;

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
    setTimeout(() => {
      onBuy(product);
      setProcessingId(null);
    }, 800);
  };

  if (loading) return <LogoLoader />;

  return (
    <div className="min-h-screen bg-cream py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? 'bg-charcoal text-white shadow-lg'
                : 'bg-white text-warmGrey hover:bg-stone hover:text-charcoal'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-soft-lg transition-all duration-500 border border-stone/30"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-stone-light">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Button (Desktop) */}
                  <div className="hidden md:flex absolute inset-0 bg-black/20 backdrop-blur-[2px] items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <button
                      onClick={() => handleBuyClick(product)}
                      disabled={processingId === product.id}
                      className="bg-white text-charcoal px-6 py-3 rounded-full font-medium uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-colors duration-300 flex items-center gap-2 shadow-lg"
                    >
                      {processingId === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>ADD TO BAG</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-2">
                  <div>
                    <span className="text-[10px] text-gold uppercase tracking-widest font-medium block mb-1">
                      {product.category}
                    </span>
                    <h3 className="text-charcoal font-serif text-lg leading-tight">
                      {product.title}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-stone/30">
                    <span className="text-charcoal font-medium">
                      {product.displayPrice}
                    </span>

                    {/* Mobile Only Quick Buy Button */}
                    <button
                      onClick={() => handleBuyClick(product)}
                      className="md:hidden w-8 h-8 rounded-full bg-stone flex items-center justify-center text-charcoal hover:bg-gold hover:text-white transition-all active:scale-95"
                    >
                      {processingId === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <ShoppingBag className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Catalog;