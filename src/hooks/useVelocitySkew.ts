import { useEffect, useRef } from 'react';
import gsap from 'gsap';


/**
 * Applies a velocity-based skewY to a target element.
 * The faster the user scrolls, the more the element skews.
 */
export function useVelocitySkew(targetRef: React.RefObject<HTMLElement | null>) {
    const velocityRef = useRef(0);
    const skewRef = useRef(0);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const skewSetter = gsap.quickTo(target, 'skewY', { duration: 0.6, ease: 'power3' });
        const clamp = gsap.utils.clamp(-8, 8);

        let lastScrollY = window.scrollY;
        let lastTime = performance.now();
        let rafId: number;

        const onTick = () => {
            const now = performance.now();
            const dt = Math.max(now - lastTime, 1);
            const currentY = window.scrollY;
            const rawVelocity = (currentY - lastScrollY) / dt * 16; // normalize to ~60fps
            velocityRef.current = rawVelocity;
            lastScrollY = currentY;
            lastTime = now;

            const skew = clamp(rawVelocity * 0.5);
            if (Math.abs(skew - skewRef.current) > 0.01) {
                skewSetter(skew);
                skewRef.current = skew;
            }
            rafId = requestAnimationFrame(onTick);
        };

        rafId = requestAnimationFrame(onTick);

        return () => {
            cancelAnimationFrame(rafId);
            gsap.set(target, { skewY: 0 });
        };
    }, [targetRef]);
}
