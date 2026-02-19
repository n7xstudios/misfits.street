import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const ScrollSpoolProgress: React.FC = () => {
    const circleRef = useRef<SVGCircleElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const circle = circleRef.current;
        if (!circle) return;

        gsap.set(circle, { strokeDasharray: CIRCUMFERENCE, strokeDashoffset: CIRCUMFERENCE });

        const st = ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
            onUpdate: (self) => {
                const offset = CIRCUMFERENCE * (1 - self.progress);
                gsap.set(circle, { strokeDashoffset: offset });
            },
        });

        return () => st.kill();
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed bottom-6 right-6 z-50 pointer-events-none"
            title="Scroll progress"
        >
            <svg width="56" height="56" viewBox="0 0 56 56" className="spool-svg -rotate-90">
                {/* Track */}
                <circle
                    cx="28" cy="28" r={RADIUS}
                    fill="none"
                    stroke="rgba(245,245,240,0.1)"
                    strokeWidth="3"
                />
                {/* Progress */}
                <circle
                    ref={circleRef}
                    cx="28" cy="28" r={RADIUS}
                    fill="none"
                    stroke="#c8ff00"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            {/* Spool center dot */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-acid" />
            </div>
        </div>
    );
};

export default ScrollSpoolProgress;
