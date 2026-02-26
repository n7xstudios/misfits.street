'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MarqueeRow = ({ text, direction, speed, className, outline = false, separator = '✦' }: { text: string, direction: 1 | -1, speed: number, className: string, outline?: boolean, separator?: string }) => {
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        // Calculate exact width of one identical half
        const distance = track.scrollWidth / 2;
        const duration = distance / speed; // Use pixels/sec for pure linear speed

        const tween = gsap.fromTo(track,
            { x: direction === 1 ? 0 : -distance },
            {
                x: direction === 1 ? -distance : 0,
                duration,
                ease: 'none',
                repeat: -1
            }
        );

        const handleMouseEnter = () => gsap.to(tween, { timeScale: 0.1, duration: 0.5 });
        const handleMouseLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.5 });

        const parent = track.parentElement;
        if (parent) {
            parent.addEventListener('mouseenter', handleMouseEnter);
            parent.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            tween.kill();
            if (parent) {
                parent.removeEventListener('mouseenter', handleMouseEnter);
                parent.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [direction, speed]);

    const strokeStyle = outline ? { WebkitTextStroke: '2px rgba(255,255,255,0.7)', color: 'transparent' } : {};

    const items = Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className="font-syne font-black uppercase pr-10 leading-[0.9] flex items-center" style={{ ...strokeStyle, fontSize: 'clamp(3.5rem, 8vw, 6rem)', letterSpacing: '-0.04em', marginTop: '0.1em' }}>
            {text} <span className="text-electric ml-10 text-4xl font-mono">{separator}</span>
        </span>
    ));

    return (
        <div className={`w-full overflow-hidden select-none flex items-center ${className} border-y border-ash/10 relative`} aria-hidden="true" style={{ padding: '0.75rem 0' }}>
            <div ref={trackRef} className="flex whitespace-nowrap min-w-max items-center h-full relative z-10">
                <div className="flex items-center">{items}</div>
                <div className="flex items-center">{items}</div>
            </div>
            {/* Distressed noise layer */}
            <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay z-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
};

export default function HeroMarquees() {
    return (
        <div className="w-full bg-ink relative z-20 overflow-hidden flex flex-col transform -rotate-2 scale-[1.05] origin-center my-32 shadow-[0_0_100px_rgba(0,0,0,0.9)] border-y border-electric/30">
            {/* Caution tape / hazardous line */}
            <div className="bg-[repeating-linear-gradient(45deg,#00FF66,#00FF66_10px,#0A0A0A_10px,#0A0A0A_20px)] h-2 w-full border-b border-electric" />

            <MarqueeRow
                text="FAST FASHION IS DEAD"
                direction={1}
                speed={200}
                className="bg-charcoal text-ash"
                separator="✖"
            />
            <MarqueeRow
                text="WEAR THE RARE // WEAR THE RARE"
                direction={-1}
                speed={160}
                className="bg-black text-white"
                outline={true}
                separator="///"
            />
            <MarqueeRow
                text="NO RESTOCKS // NO REPLICAS"
                direction={1}
                speed={260}
                className="bg-electric text-black"
                separator="★"
            />
            <div className="bg-[repeating-linear-gradient(-45deg,#00FF66,#00FF66_10px,#0A0A0A_10px,#0A0A0A_20px)] h-2 w-full border-t border-electric" />
        </div>
    );
}
