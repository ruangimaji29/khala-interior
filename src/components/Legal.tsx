import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpCircle } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

const Legal: React.FC<LegalProps> = ({ type, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'privacy' | 'terms'>(type);

  const handleScrollTop = () => {
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[60] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-charcoal-light border border-white/10 w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-xl shadow-2xl relative flex flex-col">
        {/* Header / Tabs */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('privacy')}
              className={`text-sm md:text-base font-serif transition-all ${activeTab === 'privacy' ? 'text-gold border-b-2 border-gold font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveTab('terms')}
              className={`text-sm md:text-base font-serif transition-all ${activeTab === 'terms' ? 'text-gold border-b-2 border-gold font-bold' : 'text-gray-400 hover:text-white'}`}
            >
              Terms of Service
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8 custom-scrollbar relative">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={handleScrollTop}
              className="text-gold hover:text-white transition-colors"
              title="Back to Home"
            >
              <ArrowUpCircle size={24} />
            </button>
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
            </h2>
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light">
            {activeTab === 'privacy' ? (
              <div className="space-y-6">
                <p className="border-l-2 border-gold pl-4 italic text-gray-400">Effective Date: October 2024</p>
                <p>At Khala Interior ("we," "our," or "us"), we are deeply committed to protecting your privacy and ensuring your personal information is handled with care and transparency. This Privacy Policy details the types of information we collect, how it is used, and the measures we take to safeguard your data.</p>

                <h3 className="text-gold font-serif text-xl mt-8">1. Information Collection</h3>
                <p>We collect information that you provide directly to us when using our services. This includes personal details such as your name, email address, phone number, and billing information provided during purchases or consultations. We may also collect specialized design preferences you share to better tailor our services to your vision.</p>

                <h3 className="text-gold font-serif text-xl mt-8">2. Use of Information</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Service Delivery:</strong> To process transactions, fulfill orders, and provide interior design consultations.</li>
                  <li><strong>Communication:</strong> To send critical updates regarding your projects, order status, or account.</li>
                  <li><strong>Improvement:</strong> To analyze usage trends and enhance our website functionality and user experience.</li>
                  <li><strong>Marketing:</strong> With your explicit consent, to send you our newsletter and exclusive offers (opt-out available anytime).</li>
                </ul>

                <h3 className="text-gold font-serif text-xl mt-8">3. Data Protection</h3>
                <p>We employ industry-standard security practices, including SSL encryption and secure servers, to protect your data from unauthorized access used. We strictly do not sell, trade, or share your personal information with third parties for marketing purposes.</p>

                <hr className="border-white/10 my-8" />
                <p className="text-sm text-gray-400">Contact us at <span className="text-gold hover:underline cursor-pointer">privacy@khalainterior.com</span> for any inquiries regarding this policy.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="border-l-2 border-gold pl-4 italic text-gray-400">Last Updated: October 2024</p>
                <p>Welcome to Khala Interior. By accessing our platform, employing our design services, or purchasing products, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.</p>

                <h3 className="text-gold font-serif text-xl mt-8">1. Agreement to Terms</h3>
                <p>By using our website, you warrant that you are at least 18 years of age and legally capable of entering into binding contracts. If you do not agree to these terms, you must not use our services.</p>

                <h3 className="text-gold font-serif text-xl mt-8">2. Products & Services</h3>
                <p>Khala Interior offers premium interior design consultation and luxury furniture sales. We strive for accuracy in all product descriptions and imagery, but slight variations in color or texture may occur due to digital display limitations. Availability of products is subject to change without prior notice.</p>

                <h3 className="text-gold font-serif text-xl mt-8">3. Payment & Billing</h3>
                <p>All prices are quoted in USD. Full payment is required upon confirmation of order or service booking. We reserve the right to correct pricing errors or update prices at any time. Secure payment processing is handled by authorized third-party providers.</p>

                <h3 className="text-gold font-serif text-xl mt-8">4. Returns Policy</h3>
                <p>Given the bespoke nature of our inventory, returns are generally not accepted unless the item arrives defective or damaged. Claims must be reported within 14 days of receipt with photographic evidence. Approved returns will be processed for exchange or credit.</p>

                <h3 className="text-gold font-serif text-xl mt-8">5. Intellectual Property</h3>
                <p>All content on this site, including designs, text, graphics, and logos, is the exclusive property of Khala Interior and is protected by international copyright laws. Unauthorized reproduction or commercial use is strictly prohibited.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Legal;