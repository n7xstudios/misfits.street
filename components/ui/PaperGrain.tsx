'use client';

/**
 * PaperGrain — CSS-only vintage paper texture overlay.
 * Uses SVG feTurbulence for grain + CSS gradients for crumple shadows.
 * Zero image downloads, GPU-composited via mix-blend-mode.
 */
export default function PaperGrain() {
    return (
        <div
            className="pointer-events-none fixed inset-0 z-[1] opacity-[0.035]"
            aria-hidden="true"
            style={{ mixBlendMode: 'overlay' }}
        >
            {/* SVG grain noise */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="paper-grain">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.75"
                        numOctaves="4"
                        stitchTiles="stitch"
                    />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-grain)" />
            </svg>

            {/* Crumple shadow overlay */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 50%),
                        radial-gradient(ellipse at 75% 60%, rgba(0,0,0,0.12) 0%, transparent 45%),
                        radial-gradient(ellipse at 40% 80%, rgba(255,255,255,0.06) 0%, transparent 40%),
                        radial-gradient(ellipse at 85% 15%, rgba(0,0,0,0.08) 0%, transparent 35%),
                        radial-gradient(ellipse at 10% 70%, rgba(0,0,0,0.06) 0%, transparent 40%)
                    `,
                }}
            />
        </div>
    );
}
