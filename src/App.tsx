import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import ProductSlider from './components/ProductSlider';
import Features from './components/Features';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import Checkout from './components/Checkout';
import Portfolio from './components/Portfolio';
import Gallery from './components/Gallery';
import Legal from './components/Legal';
import type { ViewState, ProductItem } from './types';
import { AnimatePresence } from 'framer-motion';

import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'checkout') {
      setSelectedProduct(null); // Reset product selection if leaving flow
    }
    // Reset scroll when changing full views
    if (view !== 'home' && view !== 'privacy' && view !== 'terms') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBuy = (product: ProductItem) => {
    setSelectedProduct(product);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return <Preloader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="font-sans antialiased bg-charcoal text-white min-h-screen selection:bg-gold selection:text-charcoal relative">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />

      <main>
        {currentView === 'home' && (
          <>
            <section id="hero"><Hero /></section>
            <section id="about"><About onNavigate={handleNavigate} /></section>
            <ProductSlider onNavigate={handleNavigate} />
            <section id="services"><Features /></section>
          </>
        )}

        {currentView === 'catalog' && (
          <Catalog onBuy={handleBuy} />
        )}

        {currentView === 'portfolio' && (
          <Portfolio />
        )}

        {currentView === 'checkout' && (
          <Checkout
            product={selectedProduct}
            onBack={() => handleNavigate('catalog')}
          />
        )}

        {currentView === 'gallery' && (
          <Gallery onBack={() => handleNavigate('home')} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <AnimatePresence>
        {(currentView === 'privacy' || currentView === 'terms') && (
          <Legal
            type={currentView as 'privacy' | 'terms'}
            onClose={() => setCurrentView('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;