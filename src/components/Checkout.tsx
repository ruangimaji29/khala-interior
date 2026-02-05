import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, CheckCircle } from 'lucide-react';
import type { ProductItem } from '../types';

interface CheckoutProps {
    product: ProductItem | null;
    onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ product, onBack }) => {
    const [step, setStep] = useState(1);

    if (!product) return null;

    const handlePay = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2); // Show success
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-6 relative">
            {/* Background subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-stone/20 to-cream opacity-50 pointer-events-none" />

            <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl overflow-hidden shadow-soft-lg border border-stone">

                {/* Order Summary (Left) */}
                <div className="p-8 md:p-12 bg-stone relative">
                    <button onClick={onBack} className="text-brown hover:text-gold flex items-center gap-2 mb-8 text-sm uppercase tracking-widest">
                        <ArrowLeft size={16} />
                        Back
                    </button>
                    <h2 className="font-serif text-3xl text-charcoal mb-6">Order Summary</h2>

                    <div className="flex gap-6 mb-8">
                        <img src={product.image} alt={product.title} className="w-32 h-32 object-cover rounded-lg shadow-lg" />
                        <div>
                            <h3 className="text-xl text-charcoal font-serif">{product.title}</h3>
                            <span className="text-gold text-xs uppercase tracking-wider">{product.category}</span>
                            <p className="text-warmGrey text-sm mb-4">{product.description}</p>
                            <div className="text-2xl text-charcoal font-bold">{product.displayPrice}</div>
                        </div>
                    </div>

                    <div className="p-6 bg-stone rounded-lg space-y-4">
                        <div className="flex justify-between text-warmGrey">
                            <span>Subtotal</span>
                            <span>{product.displayPrice}</span>
                        </div>
                        <div className="flex justify-between text-warmGrey">
                            <span>Tax (11%)</span>
                            <span>${Math.round(product.price * 0.11).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-charcoal font-bold text-lg pt-2 border-t border-charcoal/10 mt-2">
                            <span>Total</span>
                            <span>${Math.round(product.price * 1.11).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Right: Payment Form */}
                <div className="p-8 md:p-12 bg-cream">
                    {step === 1 ? (
                        <form onSubmit={handlePay}>
                            <h2 className="font-serif text-2xl mb-6 flex items-center gap-3">
                                <CreditCard className="text-gold" /> Payment Details
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 bg-white border border-stone rounded-lg focus:outline-none focus:border-gold transition-colors text-charcoal" placeholder="you@example.com" required />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">Card Number</label>
                                    <input type="text" className="w-full px-4 py-3 bg-white border border-stone rounded-lg focus:outline-none focus:border-gold transition-colors text-charcoal" placeholder="1234 5678 9012 3456" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">Expiry Date</label>
                                        <input type="text" className="w-full px-4 py-3 bg-white border border-stone rounded-lg focus:outline-none focus:border-gold transition-colors text-charcoal" placeholder="MM/YY" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">CVC</label>
                                        <input type="text" className="w-full px-4 py-3 bg-white border border-stone rounded-lg focus:outline-none focus:border-gold transition-colors text-charcoal" placeholder="123" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-warmGrey mb-1">Cardholder Name</label>
                                    <input type="text" className="w-full px-4 py-3 bg-white border border-stone rounded-lg focus:outline-none focus:border-gold transition-colors text-charcoal" placeholder="John Doe" required />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-gold hover:bg-gold-dark text-white mt-8 py-4 rounded-lg font-bold transition-all duration-300 shadow-soft">
                                Complete Purchase
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-4 text-warmGrey text-xs">
                                <Lock size={12} /> Secure 256-bit SSL encrypted payment
                            </div>
                        </form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="h-full flex flex-col items-center justify-center text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="font-serif text-3xl mb-2">Payment Successful!</h3>
                            <p className="text-warmGrey mb-8">Thank you for your purchase. A confirmation email has been sent.</p>
                            <button onClick={onBack} className="text-charcoal border-b border-charcoal pb-1 uppercase text-sm font-bold tracking-widest hover:text-gold hover:border-gold transition-colors">
                                Continue Shopping
                            </button>
                        </motion.div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Checkout;