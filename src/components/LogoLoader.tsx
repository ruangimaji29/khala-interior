import React from 'react';
import { motion } from 'framer-motion';

const LogoLoader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen = false }) => {
    const containerClasses = fullScreen
        ? "fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
        : "w-full h-full min-h-[50vh] flex flex-col items-center justify-center py-20";

    return (
        <div className={containerClasses}>
            <motion.img
                src="/IMG_3886.PNG"
                alt="Loading..."
                className="w-24 md:w-32 object-contain"
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8],
                    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="mt-4 h-[2px] bg-gold/30 w-24 overflow-hidden relative"
            >
                <motion.div
                    className="absolute inset-0 bg-gold w-full"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </motion.div>
            <span className="text-gold text-xs tracking-[0.3em] font-light mt-4 uppercase">Loading</span>
        </div>
    );
};

export default LogoLoader;
