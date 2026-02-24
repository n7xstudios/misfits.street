import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Basic setup
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Use quickTo for high-performance mouse following
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3.out" });

        const moveCursor = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 z-[100000] pointer-events-none flex items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        >
            {/* Constant White Crosshair */}
            <div className="relative w-5 h-5">
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white transform -translate-y-1/2 shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                <div className="absolute top-0 left-1/2 h-full w-[2px] bg-white transform -translate-x-1/2 shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
            </div>
        </div>
    );
};

export default CustomCursor;
