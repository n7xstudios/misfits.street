import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins (useGSAP must also be registered)
gsap.registerPlugin(ScrollTrigger, Draggable, useGSAP);

// Context
import { CartProvider } from './context/CartContext';

// Global UI
import NoiseOverlay from './components/ui/NoiseOverlay';
import CustomCursor from './components/ui/CustomCursor';
import ScrollSpoolProgress from './components/ui/ScrollSpoolProgress';
import LiquidWipe, { type LiquidWipeHandle } from './components/ui/LiquidWipe';

// Layout
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Cart
import TheBin from './components/cart/TheBin';

// Sections
import Hero from './components/Hero';
import ProductGrid from './components/shop/ProductGrid';
import ScratchReveal from './components/sections/ScratchReveal';
import FitCheck from './pages/FitCheck';

// Lenis smooth scroll
import { useLenis } from './hooks/useLenis';

function AppInner() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const liquidWipeRef = useRef<LiquidWipeHandle>(null);
  const cartZoneRef = useRef<HTMLDivElement>(null);

  // Initialize Lenis
  useLenis();

  const handlePreloaderComplete = () => {
    // Set both flags together — no delayed call needed
    setPreloaderDone(true);
    setShowContent(true);
    document.body.style.overflow = 'auto';
    // Refresh ScrollTrigger after content mounts
    gsap.delayedCall(0.5, () => ScrollTrigger.refresh());
  };

  // Lock scroll during preloader
  // Lock scroll during preloader, plus safety timeout
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Safety Force Load after 5s
    const safetyTimer = setTimeout(() => {
      if (!preloaderDone) {
        console.warn('Preloader timed out, forcing content load.');
        setPreloaderDone(true);
        setShowContent(true);
        document.body.style.overflow = 'auto';
        ScrollTrigger.refresh();
      }
    }, 5000);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(safetyTimer);
    };
  }, [preloaderDone]);

  // Main content entrance
  useGSAP(() => {
    if (!showContent) return;
    gsap.fromTo('#main-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }, { dependencies: [showContent] });

  return (
    <>
      {/* ── Persistent overlays (always on top) ── */}
      <NoiseOverlay />
      <CustomCursor />
      <ScrollSpoolProgress />
      <LiquidWipe ref={liquidWipeRef} />

      {/* ── Preloader ── */}
      {!preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {/* ── Main site ── */}
      {showContent && (
        <>
          {/* Cart panel (fixed right, behind main via z-index) */}
          <TheBin />

          {/* Cart drop zone indicator (invisible, for throw physics) */}
          <div
            ref={cartZoneRef}
            id="cart-drop-zone"
            className="fixed top-4 right-4 w-16 h-16 z-[90] pointer-events-none"
            aria-hidden="true"
          />

          {/* Navbar */}
          <Navbar />

          {/* Main content — shifts left when cart opens */}
          <main id="main-content" className="relative z-[1] bg-ink">

            {/* ── Hero ── */}
            <Hero />

            {/* ── Shop / Product Grid ── */}
            <ProductGrid cartZoneRef={cartZoneRef} />

            {/* ── Scratch Reveal ── */}
            <ScratchReveal />

            {/* ── Fit Check Module ── */}
            <FitCheck />

            {/* ── Manifesto section ── */}
            <section className="relative w-full py-32 px-4 md:px-8 bg-charcoal overflow-hidden">
              {/* Big background text */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-syne font-extrabold text-ash/[0.03] uppercase leading-none"
                  style={{ fontSize: 'clamp(6rem, 25vw, 20rem)', letterSpacing: '-0.05em' }}
                >
                  MISFIT
                </span>
              </div>

              <div className="max-w-4xl mx-auto relative z-10 text-center">
                <p className="font-mono text-[10px] text-acid tracking-[0.5em] uppercase mb-8">
                  ◈ THE MANIFESTO ◈
                </p>
                <h2
                  className="font-syne font-extrabold text-ash uppercase leading-[0.85] mb-8"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
                >
                  WE DON'T SELL CLOTHES.<br />
                  WE SELL<br />
                  <span className="text-acid">IDENTITIES.</span>
                </h2>
                <p className="font-marker text-silver text-xl md:text-2xl -rotate-1 mb-12">
                  "thrift is the new luxury."
                </p>
                <p className="font-mono text-silver/40 text-xs uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                  Every piece in The Bin is one-of-one. When it's gone, it's gone.
                  No restocks. No replicas. No excuses.
                </p>
              </div>
            </section>

            {/* ── Footer spacer (for lift-the-rug reveal) ── */}
            <div className="h-[300px] bg-ink" aria-hidden="true" />
          </main>

          {/* ── Footer (fixed behind content) ── */}
          <Footer />
        </>
      )}
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}

export default App;
