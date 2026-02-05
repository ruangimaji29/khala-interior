import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../constants';

const Features: React.FC = () => {
    return (
        <section id="services" className="py-20 bg-cream">
            <div className="container mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="font-serif text-3xl md:text-5xl text-charcoal font-bold mb-4">
                        CATEGORIES & <span className="text-warmGrey">INFORMATION</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {SERVICES.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group flex items-center p-4 rounded-xl bg-stone shadow-soft hover:shadow-soft-lg transition-all duration-300 cursor-pointer border border-stone-dark"
                        >
                            <div className="w-16 h-16 rounded-lg bg-cream flex items-center justify-center text-brown group-hover:text-gold transition-colors shadow-inner mr-6 border border-stone-dark">
                                <service.icon size={28} />
                            </div>
                            <div>
                                <h3 className="text-charcoal font-sans text-sm font-semibold tracking-wider uppercase group-hover:text-gold transition-colors">
                                    {service.title}
                                </h3>
                                <div className="h-[2px] w-0 group-hover:w-full bg-gold mt-2 transition-all duration-300"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;