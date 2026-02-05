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
        setStep(2);
    };

    return (
        /* Perbaikan: Menambahkan pt-32 (mobile) dan md:pt-40 (desktop) untuk jarak dari header */
        <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-start p-4 sm:p-8 pt-32 md:pt-40 transition-all duration-500">

            {/* Container Utama dengan margin bottom agar tidak mepet ke bawah halaman */}
            <div className="w-full max-w-6xl bg-[#EBE9E1] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-20 relative">

                {/* Bagian Kiri: Order Summary */}
                <div className="w-full md:w-[45%] p-8 sm:p-10 md:p-14 bg-[#EBE9E1]">
                    {/* Perbaikan: Memastikan tombol BACK memiliki margin bawah yang besar (mb-10) */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-[#8C7E6A] hover:text-black transition-colors mb-10 text-sm font-bold tracking-[0.2em] uppercase group"
                    >
                        <ArrowLeft size={18} className="transform group-hover:-translate-x-1 transition-transform" />
                        BACK
                    </button>

                    <h2 className="font-serif text-3xl sm:text-4xl text-[#333] mb-8 leading-tight">Order Summary</h2>

                    <div className="flex flex-col sm:flex-row gap-6 mb-10">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full sm:w-32 h-44 sm:h-32 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex flex-col justify-center">
                            <h3 className="text-xl sm:text-2xl text-[#333] font-serif mb-1">{product.title}</h3>
                            <span className="text-[#C5A367] text-[10px] font-bold uppercase tracking-widest mb-2">{product.category}</span>
                            <div className="text-xl text-[#333] font-bold font-sans tracking-tight">{product.displayPrice}</div>
                        </div>
                    </div>

                    <div className="space-y-4 border-t border-[#D6D3C7] pt-8">
                        <div className="flex justify-between text-[#8C7E6A] text-sm font-medium">
                            <span>Subtotal</span>
                            <span>{product.displayPrice}</span>
                        </div>
                        <div className="flex justify-between text-[#8C7E6A] text-sm font-medium">
                            <span>Tax (11%)</span>
                            <span>${Math.round(product.price * 0.11).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[#333] font-bold text-2xl pt-4 border-t border-[#D6D3C7]/50 mt-2">
                            <span>Total</span>
                            <span>${Math.round(product.price * 1.11).toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Payment Form */}
                <div className="w-full md:w-[55%] p-8 sm:p-10 md:p-14 bg-white flex flex-col justify-center border-t md:border-t-0 md:border-l border-[#D6D3C7]/30">
                    {step === 1 ? (
                        <motion.form
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onSubmit={handlePay}
                            className="max-w-md mx-auto w-full"
                        >
                            <h2 className="font-serif text-2xl sm:text-3xl text-[#333] mb-8 flex items-center gap-3">
                                <span className="p-2 bg-[#F5F5F0] rounded-lg">
                                    <CreditCard size={24} className="text-[#C5A367]" />
                                </span>
                                Payment Details
                            </h2>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7E6A] mb-2">Email Address</label>
                                    <input type="email" className="w-full px-5 py-4 bg-[#F9F9F7] border border-[#EBE9E1] rounded-xl focus:ring-2 focus:ring-[#C5A367] outline-none transition-all text-[#333]" placeholder="you@example.com" required />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7E6A] mb-2">Card Number</label>
                                    <input type="text" className="w-full px-5 py-4 bg-[#F9F9F7] border border-[#EBE9E1] rounded-xl focus:ring-2 focus:ring-[#C5A367] outline-none transition-all text-[#333]" placeholder="1234 5678 9012 3456" required />
                                </div>

                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7E6A] mb-2">Expiry Date</label>
                                        <input type="text" className="w-full px-5 py-4 bg-[#F9F9F7] border border-[#EBE9E1] rounded-xl focus:ring-2 focus:ring-[#C5A367] outline-none transition-all text-[#333]" placeholder="MM/YY" required />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7E6A] mb-2">CVC</label>
                                        <input type="text" className="w-full px-5 py-4 bg-[#F9F9F7] border border-[#EBE9E1] rounded-xl focus:ring-2 focus:ring-[#C5A367] outline-none transition-all text-[#333]" placeholder="123" required />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#8C7E6A] mb-2">Cardholder Name</label>
                                    <input type="text" className="w-full px-5 py-4 bg-[#F9F9F7] border border-[#EBE9E1] rounded-xl focus:ring-2 focus:ring-[#C5A367] outline-none transition-all text-[#333]" placeholder="John Doe" required />
                                </div>
                            </div>

                            <button type="submit" className="w-full bg-[#C5A367] hover:bg-[#B48F56] text-white mt-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-xl shadow-[#C5A367]/20 active:scale-[0.98]">
                                Complete Purchase
                            </button>

                            <div className="flex items-center justify-center gap-2 mt-6 text-[#8C7E6A] text-[11px] font-medium uppercase tracking-wider">
                                <Lock size={14} className="text-[#C5A367]" /> Secure 256-bit SSL encrypted payment
                            </div>
                        </motion.form>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center text-center py-10"
                        >
                            <div className="w-20 h-20 bg-[#F0FDF4] rounded-full flex items-center justify-center text-green-600 mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h3 className="font-serif text-3xl text-[#333] mb-3">Success!</h3>
                            <p className="text-[#8C7E6A] mb-8 max-w-xs text-sm">Your order has been placed. We've sent a receipt to your email.</p>
                            <button
                                onClick={onBack}
                                className="px-10 py-4 border-2 border-[#333] text-[#333] rounded-xl font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#333] hover:text-white transition-all"
                            >
                                Back to Gallery
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Checkout;