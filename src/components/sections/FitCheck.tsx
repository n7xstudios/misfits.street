import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Draggable);

const FIT_ITEMS = [
    { id: 'hat', label: 'HAT', emoji: '🧢', color: '#c8ff00' },
    { id: 'shirt', label: 'SHIRT', emoji: '👕', color: '#f5f5f0' },
    { id: 'pants', label: 'PANTS', emoji: '👖', color: '#c0c0c0' },
    { id: 'shoes', label: 'SHOES', emoji: '👟', color: '#ff3d00' },
];

const FitCheck: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [droppedItems, setDroppedItems] = useState<Record<string, boolean>>({});

    useGSAP(() => {
        FIT_ITEMS.forEach(item => {
            Draggable.create(`#drag-${item.id}`, {
                type: 'x,y',
                onDragStart: function () {
                    gsap.to(this.target, { scale: 1.15, duration: 0.2, ease: 'back.out' });
                },
                onDragEnd: function () {
                    const dropZone = document.getElementById('mannequin-zone');
                    if (!dropZone) return;
                    const dRect = this.target.getBoundingClientRect();
                    const zRect = dropZone.getBoundingClientRect();

                    const overlaps =
                        dRect.left < zRect.right &&
                        dRect.right > zRect.left &&
                        dRect.top < zRect.bottom &&
                        dRect.bottom > zRect.top;

                    if (overlaps) {
                        gsap.to(this.target, { scale: 0, opacity: 0, duration: 0.3, ease: 'power2.in' });
                        setDroppedItems(prev => ({ ...prev, [item.id]: true }));
                    } else {
                        gsap.to(this.target, { x: 0, y: 0, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
                    }
                },
            });
        });
    }, { scope: containerRef });

    const resetFit = useCallback(() => {
        setDroppedItems({});
        FIT_ITEMS.forEach(item => {
            const el = document.getElementById(`drag-${item.id}`);
            if (el) gsap.to(el, { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.4, ease: 'back.out' });
        });
    }, []);

    const droppedCount = Object.keys(droppedItems).length;

    return (
        <section className="relative w-full py-20 px-4 md:px-8 bg-ink border-t border-ash/10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <p className="font-mono text-[10px] text-acid tracking-[0.4em] uppercase mb-2">◈ FIT CHECK</p>
                    <h2 className="font-syne font-extrabold text-ash uppercase" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
                        BUILD YOUR FIT
                    </h2>
                    <p className="font-mono text-silver/40 text-xs mt-2 uppercase tracking-widest">
                        Drag items onto the mannequin to layer your look.
                    </p>
                </div>

                <div ref={containerRef} className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Draggable items palette */}
                    <div className="space-y-4">
                        <p className="font-mono text-[10px] text-silver/40 uppercase tracking-widest mb-6">
              // DRAG ITEMS TO MANNEQUIN
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {FIT_ITEMS.map(item => (
                                <div
                                    key={item.id}
                                    id={`drag-${item.id}`}
                                    className={`border border-ash/20 p-6 flex flex-col items-center gap-3 cursor-grab active:cursor-grabbing hover:border-acid/50 transition-colors ${droppedItems[item.id] ? 'opacity-30 pointer-events-none' : ''
                                        }`}
                                    style={{ userSelect: 'none' }}
                                >
                                    <span className="text-4xl">{item.emoji}</span>
                                    <span
                                        className="font-mono text-[10px] uppercase tracking-widest font-bold"
                                        style={{ color: item.color }}
                                    >
                                        {item.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {droppedCount > 0 && (
                            <button
                                onClick={resetFit}
                                className="font-mono text-[10px] text-silver/40 hover:text-rust uppercase tracking-widest transition-colors mt-4"
                            >
                                ✕ RESET FIT
                            </button>
                        )}
                    </div>

                    {/* Mannequin drop zone */}
                    <div>
                        <div
                            id="mannequin-zone"
                            className="fitcheck-drop-zone relative aspect-[3/5] flex flex-col items-center justify-center gap-4 p-8"
                        >
                            {/* Mannequin silhouette */}
                            <svg viewBox="0 0 120 280" className="w-32 opacity-20 absolute" fill="currentColor" color="#f5f5f0">
                                <ellipse cx="60" cy="30" rx="22" ry="28" />
                                <rect x="30" y="55" width="60" height="90" rx="8" />
                                <rect x="5" y="58" width="22" height="70" rx="6" />
                                <rect x="93" y="58" width="22" height="70" rx="6" />
                                <rect x="35" y="142" width="22" height="100" rx="6" />
                                <rect x="63" y="142" width="22" height="100" rx="6" />
                            </svg>

                            {/* Dropped items display */}
                            <div className="relative z-10 flex flex-col items-center gap-2">
                                {FIT_ITEMS.map(item => (
                                    droppedItems[item.id] && (
                                        <div key={item.id} className="flex items-center gap-2 font-mono text-xs text-acid animate-pulse">
                                            <span>{item.emoji}</span>
                                            <span className="uppercase tracking-widest">{item.label} — ADDED</span>
                                        </div>
                                    )
                                ))}
                            </div>

                            {droppedCount === 0 && (
                                <p className="font-mono text-[10px] text-silver/30 uppercase tracking-widest text-center relative z-10">
                                    DROP ITEMS HERE<br />TO BUILD YOUR FIT
                                </p>
                            )}

                            {droppedCount === FIT_ITEMS.length && (
                                <div className="absolute inset-0 flex items-end justify-center pb-6 z-20">
                                    <div className="font-marker text-acid text-xl -rotate-3 animate-bounce">
                                        "fire fit 🔥"
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="font-mono text-[9px] text-silver/20 uppercase tracking-widest mt-3 text-center">
                            {droppedCount}/{FIT_ITEMS.length} ITEMS PLACED
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FitCheck;
