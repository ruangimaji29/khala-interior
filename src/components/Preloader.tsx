import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading time (or wait for assets)
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Allow exit animation to finish before unmounting
        }, 2500); // 2.5 seconds display time

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center p-6"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        {/* Logo Image */}
                        <motion.img
                            src="/IMG_3886.PNG"
                            alt="Khala Interior Logo"
                            className="w-32 md:w-48 object-contain mb-6 drop-shadow-xl"
                            initial={{ rotate: -5 }}
                            animate={{ rotate: 0 }}
                            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                        />

                        {/* Tagline */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-center"
                        >
                            <h1 className="font-serif text-charcoal text-lg md:text-2xl tracking-widest relative pb-2 mb-2">
                                KHALA INTERIOR
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "100%" }}
                                    transition={{ delay: 1, duration: 1 }}
                                    className="absolute bottom-0 left-0 h-[2px] bg-gold mx-auto right-0"
                                />
                            </h1>
                            <p className="text-gold text-[10px] md:text-sm uppercase tracking-[0.15em] md:tracking-[0.3em] font-light whitespace-nowrap">
                                ~ Architecture & Interior Design ~
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
