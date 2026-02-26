'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCTS, CATEGORIES, type Category, formatPrice } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

export default function ShopClient() {
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [filtered, setFiltered] = useState(PRODUCTS);
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const { addItem, openCart } = useCart();

    useGSAP(() => {
        gsap.fromTo('.shop-header',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
        );

        gsap.fromTo('.shop-filter',
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out', delay: 0.3 }
        );

        if (sectionRef.current && gridRef.current) {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const skew = self.getVelocity() / -400; // Tweak divisor to loosen/tighten wave
                    gsap.to(gridRef.current, {
                        skewY: gsap.utils.clamp(-4, 4, skew),
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                },
            });
        }
    }, { scope: sectionRef });

    useEffect(() => {
        if (!gridRef.current) return;
        const cards = gridRef.current.querySelectorAll('.shop-card');
        gsap.fromTo(cards,
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power3.out' }
        );
    }, [filtered]);

    const handleFilter = useCallback((cat: Category) => {
        if (cat === activeCategory) return;
        const cards = gridRef.current?.querySelectorAll('.shop-card');
        if (!cards) return;
        gsap.to(cards, {
            opacity: 0, y: -15, duration: 0.2,
            stagger: { amount: 0.08, from: 'random' },
            ease: 'power2.in',
            onComplete: () => {
                setActiveCategory(cat);
                setFiltered(cat === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat));
            },
        });
    }, [activeCategory]);

    const handleAdd = (product: typeof PRODUCTS[0], e: React.MouseEvent) => {
        e.preventDefault();
        if (product.soldOut) return;
        addItem({
            id: product.id,
            title: product.title,
            price: formatPrice(product.price),
            image: product.image,
        });
        toast.success(`${product.title} ADDED`);
        openCart();
    };

    return (
        <section ref={sectionRef} className="w-full pt-24 pb-20 bg-ink min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="shop-header border-b border-ash/5 pb-8 mb-10">
                    <p className="font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-2">◈ ALL ITEMS</p>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h1 className="font-syne font-extrabold text-ash uppercase leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}>
                            THE BIN
                        </h1>
                        <p className="font-mono text-ash/20 text-xs uppercase tracking-widest">
                            {filtered.length} ITEMS / {filtered.filter(p => p.soldOut).length} SOLD
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 flex-wrap mb-10">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleFilter(cat)}
                            className={`shop-filter font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all duration-150 cursor-pointer ${activeCategory === cat
                                ? 'bg-electric text-ink'
                                : 'text-ash/25 border border-ash/5 hover:border-ash/20 hover:text-ash/50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filtered.map(product => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="shop-card group block cursor-pointer"
                        >
                            <div className="relative overflow-hidden bg-charcoal border border-ash/5 hover:border-ash/20 transition-all duration-300">
                                <div className="relative aspect-[3/4]">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-2 left-2 font-mono text-[9px] text-ink bg-electric px-2 py-0.5 uppercase tracking-widest">NEW</span>
                                    )}
                                    {product.soldOut && (
                                        <div className="absolute inset-0 bg-ink/80 flex items-center justify-center">
                                            <span className="font-syne font-bold text-rust text-lg uppercase tracking-widest rotate-[-12deg]">SOLD OUT</span>
                                        </div>
                                    )}
                                    {!product.soldOut && (
                                        <button
                                            onClick={e => handleAdd(product, e)}
                                            className="absolute bottom-0 left-0 right-0 py-2.5 bg-electric text-ink font-mono text-[10px] uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                        >
                                            + ADD TO BIN
                                        </button>
                                    )}
                                </div>
                                <div className="p-3 border-t border-ash/5">
                                    <h3 className="font-syne font-bold text-ash text-xs uppercase truncate">{product.title}</h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="font-mono text-ash/15 text-[9px] uppercase">{product.size}</span>
                                        <span className="font-mono text-ash text-sm font-bold">{formatPrice(product.price)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
