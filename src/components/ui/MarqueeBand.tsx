import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MarqueeBandProps {
    texts?: string[];
}

const BANDS = [
    { text: 'FRESH DROPS', speed: 30, dir: 1, bg: 'bg-acid', textColor: 'text-ink', size: 'text-sm' },
    { text: 'VINTAGE', speed: 20, dir: -1, bg: 'bg-ink', textColor: 'text-ash', size: 'text-xs', border: 'border-y border-ash/20' },
    { text: 'RARE FINDS', speed: 14, dir: 1, bg: 'bg-rust', textColor: 'text-ash', size: 'text-sm' },
];

const REPEAT = 8; // how many copies to fill the band

const MarqueeBand: React.FC<MarqueeBandProps> = () => {
    const trackRefs = useRef<(HTMLDivElement | null)[]>([]);
    const tweenRefs = useRef<gsap.core.Tween[]>([]);

    useEffect(() => {
        BANDS.forEach((band, i) => {
            const track = trackRefs.current[i];
            if (!track) return;

            const totalWidth = track.scrollWidth / 2; // half because we duplicate
            const duration = totalWidth / (band.speed * 10);

            const tween = gsap.to(track, {
                x: band.dir === 1 ? `-=${totalWidth}` : `+=${totalWidth}`,
                duration,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x: number) => {
                        if (band.dir === 1) return x % totalWidth;
                        return ((x % totalWidth) + totalWidth) % totalWidth;
                    }),
                },
            });

            tweenRefs.current[i] = tween;

            // Pause on hover
            const parent = track.parentElement;
            if (parent) {
                parent.addEventListener('mouseenter', () => tween.pause());
                parent.addEventListener('mouseleave', () => tween.play());
            }
        });

        return () => {
            tweenRefs.current.forEach(t => t?.kill());
        };
    }, []);

    return (
        <div className="w-full overflow-hidden select-none" aria-hidden="true">
            {BANDS.map((band, i) => (
                <div
                    key={i}
                    className={`${band.bg} ${band.border ?? ''} overflow-hidden py-2`}
                >
                    <div
                        ref={el => { trackRefs.current[i] = el; }}
                        className="marquee-track"
                    >
                        {Array.from({ length: REPEAT }).map((_, j) => (
                            <span
                                key={j}
                                className={`${band.textColor} ${band.size} font-syne font-bold uppercase tracking-[0.3em] px-8 whitespace-nowrap`}
                            >
                                {band.text} ✦
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MarqueeBand;
