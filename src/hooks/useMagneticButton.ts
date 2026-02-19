import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MAGNETIC_RADIUS = 80; // px — how close cursor must be to activate

/**
 * Magnetic button effect: element is attracted to cursor within MAGNETIC_RADIUS.
 * Returns a ref to attach to the element.
 */
export function useMagneticButton<T extends HTMLElement>() {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });

        const onMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MAGNETIC_RADIUS) {
                const strength = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
                xTo(dx * strength * 0.5);
                yTo(dy * strength * 0.5);
            }
        };

        const onLeave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
        };

        window.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            window.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return ref;
}
