'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollSpoolProgress from '@/components/ui/ScrollSpoolProgress';
import TheBin from '@/components/cart/TheBin';
import PaperGrain from '@/components/ui/PaperGrain';
import { Toaster } from 'react-hot-toast';
import LenisProvider from '@/components/LenisProvider';
import { AuthProvider } from '@/context/AuthContext';
import NoReturnBanner from '@/components/ui/NoReturnBanner';
import MetaPixel from '@/components/analytics/MetaPixel';
import LiveTerminal from '@/components/home/LiveTerminal';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function PageLoader() {
    return (
        <div className="min-h-screen bg-ink flex items-center justify-center">
            <div className="text-center">
                <div className="font-syne font-extrabold text-electric text-2xl uppercase tracking-widest animate-pulse">
                    LOADING
                </div>
                <div className="font-mono text-ash/30 text-[10px] uppercase tracking-[0.4em] mt-2">
          // PLEASE WAIT
                </div>
            </div>
        </div>
    );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [preloaderDone, setPreloaderDone] = useState(false);
    const [showContent, setShowContent] = useState(false);

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
        <AuthProvider>
            <CartProvider>
                <LenisProvider />
                <CustomCursor />
                <ScrollSpoolProgress />
                <PaperGrain />

                {!preloaderDone && (
                    <Preloader onComplete={handlePreloaderComplete} />
                )}

                <MetaPixel />

                {showContent && (
                    <>
                        <NoReturnBanner />
                        <TheBin />
                        <Navbar />
                        <main id="main-content" className="relative z-[1] bg-ink min-h-screen">
                            {children}
                        </main>
                        <Footer />
                    </>
                )}

                <Toaster
                    position="bottom-left"
                    toastOptions={{
                        duration: 2000,
                        style: {
                            background: '#0a0a0a',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0',
                            fontFamily: 'monospace',
                            fontSize: '12px',
                            textTransform: 'uppercase' as const,
                            letterSpacing: '0.1em',
                        },
                        success: {
                            iconTheme: { primary: '#00D1FF', secondary: '#0a0a0a' },
                        },
                        error: {
                            iconTheme: { primary: '#ff3d00', secondary: '#0a0a0a' },
                        },
                    }}
                />
                <LiveTerminal />
            </CartProvider>
        </AuthProvider>
    );
}
