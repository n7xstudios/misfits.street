import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Layout (always loaded)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import CustomCursor from './components/ui/CustomCursor';
import ScrollSpoolProgress from './components/ui/ScrollSpoolProgress';

// Cart
import TheBin from './components/cart/TheBin';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));

// Lenis smooth scroll
import { useLenis } from './hooks/useLenis';

function PageLoader() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="text-center">
        <div className="font-syne font-extrabold text-acid text-2xl uppercase tracking-widest animate-pulse">
          LOADING
        </div>
        <div className="font-mono text-silver/30 text-[10px] uppercase tracking-[0.4em] mt-2">
          // PLEASE WAIT
        </div>
      </div>
    </div>
  );
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useLenis();

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
    setShowContent(true);
    document.body.style.overflow = 'auto';
    gsap.delayedCall(0.5, () => ScrollTrigger.refresh());
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
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

  useGSAP(() => {
    if (!showContent) return;
    gsap.fromTo('#main-content',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
  }, { dependencies: [showContent] });

  return (
    <>
      <CustomCursor />
      <ScrollSpoolProgress />

      {!preloaderDone && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}

      {showContent && (
        <>
          <TheBin />
          <Navbar />

          <main id="main-content" className="relative z-[1] bg-ink min-h-screen">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}

export default App;
