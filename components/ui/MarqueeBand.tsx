'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MarqueeBandProps {
    text?: string;
    speed?: number;
    direction?: 1 | -1;
    variant?: 'default' | 'outline' | 'muted';
}

const REPEAT = 12;

const MarqueeBand: React.FC<MarqueeBandProps> = ({
    text = 'MISFITS STREET',
    speed = 25,
    direction = 1,
    variant = 'default',
}) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const tweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const totalWidth = track.scrollWidth / 2;
        const duration = totalWidth / (speed * 10);

        const tween = gsap.to(track, {
            x: direction === 1 ? `-=${totalWidth}` : `+=${totalWidth}`,
            duration,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x: number) => {
                    if (direction === 1) return x % totalWidth;
                    return ((x % totalWidth) + totalWidth) % totalWidth;
                }),
            },
        });

        tweenRef.current = tween;

        const parent = track.parentElement;
        if (parent) {
            parent.addEventListener('mouseenter', () => tween.timeScale(0.3));
            parent.addEventListener('mouseleave', () => tween.timeScale(1));
        }

        return () => { tween.kill(); };
    }, [speed, direction]);

    const variantStyles = {
        default: {
            bg: 'bg-ink border-y border-ash/10',
            text: 'text-ash/40',
        },
        outline: {
            bg: 'bg-transparent border-y border-ash/5',
            text: 'text-ash/15',
        },
        muted: {
            bg: 'bg-charcoal/50 border-y border-ash/5',
            text: 'text-ash/20',
        },
    };

    const styles = variantStyles[variant];

    return (
        <div
            className={`w-full overflow-hidden select-none ${styles.bg} py-2.5`}
            aria-hidden="true"
        >
            <div ref={trackRef} className="marquee-track">
                {Array.from({ length: REPEAT }).map((_, j) => (
                    <span
                        key={j}
                        className={`${styles.text} text-[11px] font-mono font-bold uppercase tracking-[0.4em] px-8 whitespace-nowrap`}
                    >
                        {text} ✦{' '}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeBand;
