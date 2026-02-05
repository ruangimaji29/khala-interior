import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowDown } from 'lucide-react';
import { supabase } from '../lib/supabase';
import LogoLoader from './LogoLoader';

interface GalleryProps {
    onBack: () => void;
}

interface GalleryItem {
    id: string;
    image_url: string;
    title: string;
}

const Gallery: React.FC<GalleryProps> = ({ onBack }) => {
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [visibleCount, setVisibleCount] = useState(9); // Start with 9 items
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const { data, error } = await supabase
                    .from('exclusive_collections')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setItems(data as GalleryItem[]);
            } catch (err) {
                console.error('Error fetching gallery:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    const handleSeeMore = () => {
        setVisibleCount((prev) => prev + 9);
    };

    // Function to determine span classes based on index to create a "random" bento grid look
    const getSpanClass = (index: number) => {
        const pattern = index % 10;
        if (pattern === 0) return 'md:col-span-2 md:row-span-2'; // Large block
        if (pattern === 3) return 'md:col-span-2'; // Wide block
        if (pattern === 6) return 'md:row-span-2'; // Tall block
        return 'col-span-1'; // Standard block
    };

    if (loading) {
        return <LogoLoader fullScreen />;
    }

    return (
        <div className="min-h-screen bg-white pt-24 pb-20">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="mb-12">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-widest text-xs">Back to Home</span>
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center md:text-left"
                    >
                        <span className="text-gold tracking-[0.3em] text-xs font-bold uppercase block mb-3">Our Visual Story</span>
                        <h1 className="font-serif text-4xl md:text-6xl text-charcoal mb-4">Gallery Collection</h1>
                        <p className="text-warmGrey max-w-xl text-lg font-light">
                            A curated selection of our finest moments, architectural details, and interior masterpieces.
                        </p>
                    </motion.div>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
                    {items.slice(0, visibleCount).map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index % 5 * 0.1 }}
                            className={`relative group rounded-xl overflow-hidden cursor-pointer ${getSpanClass(index)}`}
                        >
                            <img
                                src={item.image_url}
                                alt={item.title || "Gallery Image"}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < items.length && (
                    <div className="mt-16 text-center">
                        <button
                            onClick={handleSeeMore}
                            className="inline-flex flex-col items-center gap-2 text-brown hover:text-black transition-colors group"
                        >
                            <span className="uppercase tracking-[0.2em] text-sm font-semibold">See More Photos</span>
                            <ArrowDown className="animate-bounce group-hover:text-gold" size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
