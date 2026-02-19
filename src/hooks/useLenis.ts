import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Singleton to prevent multiple instances
let lenisInstance: Lenis | null = null;

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // If instance exists, just return it (or destroy and recreate if needed, but singleton is safer here)
        if (lenisInstance) {
            lenisRef.current = lenisInstance;
        } else {
            // Lenis v1+ options are simpler
            const lenis = new Lenis({
                // Lenis v1+: use `lerp` (0–1) instead of removed `duration`/`easing`
                lerp: 0.1,
                touchMultiplier: 2,
            });

            lenisInstance = lenis;
            lenisRef.current = lenis;

            // Integrate with GSAP ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);

            // GSAP Ticker integration
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0);
        }

        return () => {
            // Don't destroy global singleton on unmount to preserve scroll state
            // unless we want full reset. For now, keep it alive.
        };
    }, []);

    return lenisRef;
}
