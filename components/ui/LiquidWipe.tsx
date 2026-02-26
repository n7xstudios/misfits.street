'use client';

import { useRef, useImperativeHandle, forwardRef } from 'react';
import gsap from 'gsap';

export interface LiquidWipeHandle {
    trigger: (onMidpoint?: () => void) => void;
}

const LiquidWipe = forwardRef<LiquidWipeHandle>((_, ref) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
        trigger(onMidpoint?: () => void) {
            const el = overlayRef.current;
            if (!el) return;

            const tl = gsap.timeline();

            // Wave rises from bottom
            tl.set(el, { display: 'block', clipPath: 'ellipse(120% 0% at 50% 100%)' })
                .to(el, {
                    clipPath: 'ellipse(120% 150% at 50% 100%)',
                    duration: 0.6,
                    ease: 'power3.in',
                    onComplete: onMidpoint,
                })
                // Wave recedes upward
                .to(el, {
                    clipPath: 'ellipse(120% 0% at 50% 0%)',
                    duration: 0.5,
                    ease: 'power3.out',
                    delay: 0.1,
                })
                .set(el, { display: 'none' });
        },
    }));

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[200] bg-ink pointer-events-none"
            style={{ display: 'none', clipPath: 'ellipse(120% 0% at 50% 100%)' }}
            aria-hidden="true"
        />
    );
});

LiquidWipe.displayName = 'LiquidWipe';
export default LiquidWipe;
