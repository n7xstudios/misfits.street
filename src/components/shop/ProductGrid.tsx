import React, { useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useVelocitySkew } from '../../hooks/useVelocitySkew';
import ProductCard from './ProductCard';
import { PRODUCTS, CATEGORIES, type Category, type Product } from '../../store';

interface ProductGridProps {
    cartZoneRef: React.RefObject<HTMLDivElement | null>;
}

// Sticker filter button
const StickerFilter: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
}> = ({ label, active, onClick }) => {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        const btn = btnRef.current;
        if (!btn) return;
        // "Peel" animation
        gsap.to(btn, {
            rotateX: active ? 0 : -20,
            y: active ? 0 : -4,
            duration: 0.25,
            ease: 'power2.out',
            onComplete: onClick,
        });
    };

    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            className={`relative font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all duration-150 ${active
                ? 'bg-acid text-ink shadow-[2px_2px_0_rgba(0,0,0,0.5)]'
                : 'bg-ash/5 text-silver/50 border border-ash/15 hover:border-acid/40 hover:text-acid shadow-[1px_1px_0_rgba(0,0,0,0.3)]'
                }`}
            style={{
                transformStyle: 'preserve-3d',
                transform: active ? 'rotate(-1deg)' : 'rotate(0.5deg)',
            }}
        >
            {/* Sticker tape top */}
            {active && (
                <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-acid/40" />
            )}
            {label}
        </button>
    );
};

const ProductGrid: React.FC<ProductGridProps> = ({ cartZoneRef }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS);

    // Velocity skew
    useVelocitySkew(gridRef);

    // Dealer card entry on mount
    useGSAP(() => {
        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;
        gsap.fromTo(cards,
            {
                x: () => (Math.random() - 0.5) * 200,
                y: () => -100 - Math.random() * 200,
                rotation: () => (Math.random() - 0.5) * 30,
                opacity: 0,
                scale: 0.8,
            },
            {
                x: 0, y: 0, rotation: 0, opacity: 1, scale: 1,
                duration: 0.7,
                stagger: { amount: 0.6, from: 'center' },
                ease: 'power3.out',
                delay: 0.2,
            }
        );
    }, { scope: gridRef, dependencies: [displayedProducts] });

    const handleFilter = useCallback((category: Category) => {
        if (category === activeCategory) return;

        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;

        // Glitch scatter out
        gsap.to(cards, {
            x: () => (Math.random() - 0.5) * 40,
            opacity: 0,
            rotation: () => (Math.random() - 0.5) * 10,
            duration: 0.2,
            stagger: { amount: 0.1, from: 'random' },
            ease: 'power2.in',
            onComplete: () => {
                setActiveCategory(category);
                const filtered = category === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.category === category);
                setDisplayedProducts(filtered);
            },
        });
    }, [activeCategory]);

    const total = displayedProducts.length;
    const soldOut = displayedProducts.filter(p => p.soldOut).length;

    return (
        <section id="shop" className="relative w-full py-20 bg-ink">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Section header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ash/10 pb-8 mb-10">
                    <div>
                        <p className="font-mono text-[10px] text-acid tracking-[0.4em] uppercase mb-2">◈ THE ARCHIVE</p>
                        <h2 className="font-syne font-extrabold text-ash uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
                            SHOP THE BIN
                        </h2>
                    </div>
                    <p className="font-mono text-silver/40 text-xs uppercase tracking-widest">
                        {total} ITEMS // {soldOut} SOLD OUT
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* ── Sticker filter sidebar ── */}
                    <div className="hidden md:flex flex-col gap-3 w-32 shrink-0 pt-2">
                        <p className="font-mono text-[8px] text-silver/30 uppercase tracking-widest mb-2">// FILTER</p>
                        {CATEGORIES.map(cat => (
                            <StickerFilter
                                key={cat}
                                label={cat}
                                active={activeCategory === cat}
                                onClick={() => handleFilter(cat)}
                            />
                        ))}
                    </div>

                    {/* ── Masonry product grid ── */}
                    <div className="flex-1">
                        {/* Mobile filter pills */}
                        <div className="flex md:hidden gap-2 flex-wrap mb-6">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleFilter(cat)}
                                    className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-colors ${activeCategory === cat ? 'bg-acid text-ink border-acid' : 'text-silver/50 border-ash/15 hover:border-acid/40'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Grid with velocity skew */}
                        <div
                            ref={gridRef}
                            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
                            style={{ willChange: 'transform' }}
                        >
                            {displayedProducts.map(product => (
                                <div
                                    key={product.id}
                                    className="product-card-item break-inside-avoid mb-4"
                                >
                                    <ProductCard product={product} cartZoneRef={cartZoneRef} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
