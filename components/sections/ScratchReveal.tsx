'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

const SCRATCH_THRESHOLD = 0.55; // 55% scratched = full reveal

// Product to reveal
const NEW_ARRIVAL = {
    title: 'SHADOW PARKA_UNRELEASED',
    price: '$320',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
};

const ScratchReveal: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const [revealed, setRevealed] = useState(false);
    const [scratchPct, setScratchPct] = useState(0);
    const isDrawing = useRef(false);
    const hasFullyRevealed = useRef(false);

    // Initialize canvas with silver overlay
    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // Silver gradient fill
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#b8b8b8');
        grad.addColorStop(0.5, '#d4d4d4');
        grad.addColorStop(1, '#a0a0a0');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // "SCRATCH TO REVEAL" text
        ctx.fillStyle = '#888';
        ctx.font = 'bold 14px Space Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText('✦ SCRATCH TO REVEAL ✦', canvas.width / 2, canvas.height / 2 - 10);
        ctx.font = '10px Space Mono, monospace';
        ctx.fillText('NEW ARRIVAL — LIMITED', canvas.width / 2, canvas.height / 2 + 12);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) initCanvas(); },
            { threshold: 0.3 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [initCanvas]);

    const scratch = useCallback((x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas || hasFullyRevealed.current) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 28, 0, Math.PI * 2);
        ctx.fill();

        // Check scratch percentage
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let transparent = 0;
        for (let i = 3; i < imageData.data.length; i += 4) {
            if (imageData.data[i] < 128) transparent++;
        }
        const pct = transparent / (canvas.width * canvas.height);
        setScratchPct(Math.round(pct * 100));

        if (pct > SCRATCH_THRESHOLD && !hasFullyRevealed.current) {
            hasFullyRevealed.current = true;
            gsap.to(canvas, { opacity: 0, duration: 0.6, ease: 'power2.out', onComplete: () => setRevealed(true) });
        }
    }, []);

    const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        if ('touches' in e) {
            return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
        }
        return { x: (e as React.MouseEvent).clientX - rect.left, y: (e as React.MouseEvent).clientY - rect.top };
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 px-4 md:px-8 bg-charcoal">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <p className="font-mono text-[10px] text-rust tracking-[0.4em] uppercase mb-2">◈ NEW ARRIVAL</p>
                    <h2 className="font-syne font-extrabold text-ash uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                        SCRATCH TO REVEAL
                    </h2>
                    <p className="font-mono text-silver/40 text-xs mt-2 uppercase tracking-widest">
                        One item. Hidden until you earn it.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Scratch area */}
                    <div className="scratch-container aspect-[4/5] relative rounded-none overflow-hidden border border-ash/10">
                        {/* Underlying product image */}
                        <img
                            ref={imgRef}
                            src={NEW_ARRIVAL.image}
                            alt={NEW_ARRIVAL.title}
                            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
                        />

                        {/* Scratch canvas */}
                        {!revealed && (
                            <canvas
                                ref={canvasRef}
                                className="scratch-canvas"
                                onMouseDown={() => { isDrawing.current = true; }}
                                onMouseUp={() => { isDrawing.current = false; }}
                                onMouseLeave={() => { isDrawing.current = false; }}
                                onMouseMove={e => { if (isDrawing.current) scratch(...Object.values(getPos(e, canvasRef.current!)) as [number, number]); }}
                                onTouchStart={e => { isDrawing.current = true; const pos = getPos(e, canvasRef.current!); scratch(pos.x, pos.y); }}
                                onTouchMove={e => { if (isDrawing.current) { const pos = getPos(e, canvasRef.current!); scratch(pos.x, pos.y); } }}
                                onTouchEnd={() => { isDrawing.current = false; }}
                            />
                        )}

                        {/* Progress indicator */}
                        {!revealed && scratchPct > 5 && (
                            <div className="absolute bottom-3 left-3 z-10 font-mono text-[9px] text-acid bg-ink/80 px-2 py-1 uppercase tracking-widest">
                                {scratchPct}% REVEALED
                            </div>
                        )}
                    </div>

                    {/* Product info — revealed after scratch */}
                    <div className={`transition-all duration-700 ${revealed ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}>
                        <div className="font-marker text-acid text-2xl -rotate-2 mb-4">"just dropped."</div>
                        <h3 className="font-syne font-extrabold text-ash uppercase text-3xl leading-tight mb-4">
                            {NEW_ARRIVAL.title}
                        </h3>
                        <p className="font-mono text-silver/60 text-xs uppercase tracking-widest mb-2">
                            CONDITION: DEADSTOCK // SIZE: M // QTY: 1
                        </p>
                        <p className="font-syne font-bold text-acid text-4xl mb-8">{NEW_ARRIVAL.price}</p>
                        {revealed && (
                            <p className="font-mono text-[10px] text-acid/60 uppercase tracking-widest animate-pulse">
                                ◉ SOMEONE ELSE IS LOOKING AT THIS
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScratchReveal;
