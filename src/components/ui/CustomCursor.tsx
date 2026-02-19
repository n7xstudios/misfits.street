import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    // State to track current visual mode
    const [mode, setMode] = useState<'DEFAULT' | 'TEXT' | 'PRODUCT' | 'ACTIVE'>('DEFAULT');

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Setup quickTo for snappy performance
        const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
        const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

        // Update position
        const onMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        // Handle hover states via event delegation or checking target
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Text interaction (buttons, links, paragraphs)
            if (target.matches('a, button, p, h1, h2, h3, span, input, textarea')) {
                setMode('TEXT');
            }
            // Product interaction (specific class hooks if implementation allows, or loosely check images)
            else if (target.closest('.product-card, .holo-card')) {
                setMode('PRODUCT');
            }
            else {
                setMode('DEFAULT');
            }
        };

        const onMouseDown = () => setMode('ACTIVE');
        const onMouseUp = (e: MouseEvent) => {
            // Re-eval target to switch back to correct hover state
            onMouseOver(e);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, []);

    // Effect to animate cursor shape based on mode
    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const tl = gsap.timeline();

        switch (mode) {
            case 'TEXT':
                // Small Circle
                tl.to(cursor, {
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    rotation: 0,
                    backgroundColor: 'rgba(200, 255, 0, 0.2)',
                    borderColor: '#c8ff00',
                    mixBlendMode: 'normal',
                    scale: 1,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
                // Remove crosshair inner content visually
                gsap.to('.cursor-reticle', { opacity: 0, duration: 0.2 });
                break;

            case 'PRODUCT':
                // Bracket [ ] shape
                tl.to(cursor, {
                    width: 60,
                    height: 60,
                    borderRadius: '0%',
                    rotation: 0,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent', // We'll show brackets via pseudo or inner elements
                    scale: 1,
                    duration: 0.3
                });
                gsap.to('.cursor-reticle', { opacity: 0, duration: 0.2 });
                gsap.to('.cursor-bracket', { opacity: 1, scale: 1, duration: 0.2 });
                break;

            case 'ACTIVE':
                // Rotate 45deg
                tl.to(cursor, {
                    rotation: 45,
                    scale: 0.8,
                    backgroundColor: '#c8ff00',
                    borderColor: '#c8ff00',
                    duration: 0.2
                });
                break;

            case 'DEFAULT':
            default:
                // Crosshair (+)
                tl.to(cursor, {
                    width: 20,
                    height: 20,
                    borderRadius: '0%',
                    rotation: 0,
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                    scale: 1,
                    duration: 0.3
                });
                gsap.to('.cursor-reticle', { opacity: 1, duration: 0.2 });
                gsap.to('.cursor-bracket', { opacity: 0, scale: 0.8, duration: 0.2 });
                break;
        }

    }, [mode]);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 box-border border border-ash/50 transition-colors"
        >
            {/* Reticle: (+) */}
            <div className="cursor-reticle absolute inset-0 flex items-center justify-center">
                <div className="w-[1px] h-full bg-white/80 absolute"></div>
                <div className="w-full h-[1px] bg-white/80 absolute"></div>
            </div>

            {/* Brackets: [ ] */}
            <div className="cursor-bracket absolute inset-0 flex justify-between items-center opacity-0 w-full h-full p-2">
                <div className="w-2 h-full border-l-2 border-t-2 border-b-2 border-acid"></div>
                <div className="w-2 h-full border-r-2 border-t-2 border-b-2 border-acid"></div>
            </div>
        </div>
    );
};

export default CustomCursor;
