'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useImageCurtain } from '@/hooks/useImageCurtain';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/store';

interface ProductCardProps {
    product: Product;
    cartZoneRef: React.RefObject<HTMLDivElement | null>;
}

// Simulate "1/1 in someone's cart"
function useOneOfOne() {
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (Math.random() > 0.65) {
            const t = setTimeout(() => setActive(true), Math.random() * 4000 + 1500);
            return () => clearTimeout(t);
        }
    }, []);
    return active;
}

// Spacebar magnifier hook
function useSpacebarMagnifier(imgRef: React.RefObject<HTMLImageElement | null>) {
    const lensRef = useRef<HTMLDivElement | null>(null);
    const posRef = useRef({ x: 0, y: 0 });
    const activeRef = useRef(false);

    useEffect(() => {
        const img = imgRef.current;
        if (!img) return;

        const lens = document.createElement('div');
        lens.style.cssText = `
      position:absolute; width:120px; height:120px; border-radius:50%;
      border:2px solid #c8ff00; overflow:hidden; pointer-events:none;
      z-index:30; display:none; box-shadow:0 0 0 1px rgba(200,255,0,0.3);
    `;
        img.parentElement?.appendChild(lens);
        lensRef.current = lens;

        const onMouseMove = (e: MouseEvent) => {
            const rect = img.getBoundingClientRect();
            posRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            if (activeRef.current) updateLens();
        };

        const updateLens = () => {
            const lens = lensRef.current;
            const img = imgRef.current;
            if (!lens || !img) return;
            const { x, y } = posRef.current;
            lens.style.left = `${x - 60}px`;
            lens.style.top = `${y - 60}px`;
            lens.style.backgroundImage = `url(${img.src})`;
            lens.style.backgroundSize = `${img.offsetWidth * 2.5}px ${img.offsetHeight * 2.5}px`;
            lens.style.backgroundPosition = `-${x * 2.5 - 60}px -${y * 2.5 - 60}px`;
            lens.style.backgroundRepeat = 'no-repeat';
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && img.matches(':hover')) {
                e.preventDefault();
                activeRef.current = true;
                if (lensRef.current) lensRef.current.style.display = 'block';
                updateLens();
            }
        };
        const onKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                activeRef.current = false;
                if (lensRef.current) lensRef.current.style.display = 'none';
            }
        };

        img.addEventListener('mousemove', onMouseMove);
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);

        return () => {
            img.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            lens.remove();
        };
    }, [imgRef]);
}

const ProductCard: React.FC<ProductCardProps> = ({ product, cartZoneRef }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const scribbleRef = useRef<SVGPathElement>(null);
    const { wrapRef, curtainRef } = useImageCurtain();
    const addBtnRef = useMagneticButton<HTMLButtonElement>();
    const { addItem, openCart } = useCart();
    const isOneOfOne = useOneOfOne();

    // Spacebar magnifier
    useSpacebarMagnifier(imgRef);

    // Sold-out scribble animation
    useEffect(() => {
        if (!product.soldOut || !scribbleRef.current) return;
        const path = scribbleRef.current;
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.8,
            ease: 'power3.inOut',
            delay: 0.5,
        });
    }, [product.soldOut]);

    // Throw to cart
    const handleThrow = useCallback(() => {
        const card = cardRef.current;
        const zone = cartZoneRef?.current;
        if (!card || !zone) return;
        const cardRect = card.getBoundingClientRect();
        const zoneRect = zone.getBoundingClientRect();
        const tx = zoneRect.left + zoneRect.width / 2 - cardRect.left - cardRect.width / 2;
        const ty = zoneRect.top + zoneRect.height / 2 - cardRect.top - cardRect.height / 2;

        gsap.to(card, {
            x: tx, y: ty, scale: 0.25, opacity: 0,
            duration: 0.5, ease: 'power3.in',
            onComplete: () => {
                gsap.set(card, { x: 0, y: 0, scale: 1, opacity: 1 });
                addItem({ id: product.id, title: product.title, price: `$${product.price}`, image: product.image });
                openCart();
            },
        });
    }, [cartZoneRef, addItem, openCart, product]);

    return (
        <div
            ref={cardRef}
            className={`group relative bg-charcoal border flex flex-col overflow-hidden transition-colors duration-300 ${product.soldOut ? 'border-ash/5 opacity-70' : 'border-ash/10 hover:border-acid/50'
                }`}
        >
            {/* 1/1 Badge */}
            {isOneOfOne && !product.soldOut && (
                <div className="oon-badge absolute top-3 left-3 z-20 bg-rust text-ash text-[9px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                    1/1 — IN CART
                </div>
            )}

            {/* NEW badge */}
            {product.isNew && !product.soldOut && (
                <div className="absolute top-3 right-3 z-20 bg-acid text-ink text-[9px] font-mono font-bold px-2 py-1 uppercase tracking-wider">
                    NEW
                </div>
            )}

            {/* Image with curtain reveal + holographic glitch */}
            <div ref={wrapRef} className="curtain-wrap holo-card relative overflow-hidden" style={{ aspectRatio: `3 / ${4 + (product.id % 3) * 0.3}` }}>
                <div ref={curtainRef} className="curtain" />

                <img
                    ref={imgRef}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
                    draggable={false}
                />

                {/* RGB glitch layers */}
                <div className="glitch-r absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                <div className="glitch-g absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
                <div className="glitch-b absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />

                {/* Sold-out scribble SVG */}
                {product.soldOut && (
                    <svg
                        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <path
                            ref={scribbleRef}
                            d="M5,20 Q20,5 40,25 Q60,45 80,15 Q95,5 98,30 Q100,50 85,70 Q70,90 50,80 Q30,70 15,85 Q5,92 2,75"
                            fill="none"
                            stroke="#ff3d00"
                            strokeWidth="3"
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                        />
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
                            className="font-marker" fill="#ff3d00" fontSize="12" fontFamily="Permanent Marker, cursive"
                            transform="rotate(-15, 50, 50)"
                        >
                            SOLD OUT
                        </text>
                    </svg>
                )}

                {/* Price tag */}
                {!product.soldOut && (
                    <div className="absolute bottom-3 right-3 z-10 bg-acid text-ink px-2 py-0.5 font-syne font-bold text-base -rotate-2">
                        ${product.price}
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-ink/80 to-transparent z-10">
                    {!product.soldOut && (
                        <button
                            ref={addBtnRef}
                            className="magnetic-btn px-6 py-2 bg-acid text-ink font-mono text-[10px] uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors"
                            onClick={() => {
                                addItem({ id: product.id, title: product.title, price: `$${product.price}`, image: product.image });
                                openCart();
                            }}
                        >
                            + ADD TO BIN
                        </button>
                    )}
                </div>
            </div>

            {/* Card footer */}
            <div className="p-3 flex flex-col gap-1.5">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="font-syne font-bold text-ash text-sm uppercase leading-tight">{product.title}</h3>
                    <span className={`font-mono text-[8px] uppercase shrink-0 px-1.5 py-0.5 ${product.condition === 'DEADSTOCK' ? 'bg-acid text-ink' :
                        product.condition === 'DISTRESSED' ? 'bg-rust/20 text-rust border border-rust/30' :
                            'bg-ash/5 text-silver/60 border border-ash/10'
                        }`}>
                        {product.condition}
                    </span>
                </div>

                <div className="flex justify-between items-center font-mono text-[9px] text-silver/40 uppercase">
                    <span>SZ: {product.size}</span>
                    <span>#{product.id.toString().padStart(4, '0')}</span>
                </div>

                {!product.soldOut && (
                    <button
                        className="w-full mt-1 py-1.5 text-silver/30 font-mono text-[9px] uppercase tracking-widest hover:text-rust transition-colors duration-200 text-center"
                        onClick={handleThrow}
                    >
                        ⟿ THROW INTO BIN
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
