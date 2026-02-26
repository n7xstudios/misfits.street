'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCTS, CATEGORIES, type Category, type Product, formatPrice } from '@/lib/store';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

interface ProductGridProps {
    cartZoneRef: React.RefObject<HTMLDivElement | null>;
}

function StickerFilter({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleClick = () => {
        const btn = btnRef.current;
        if (!btn) return;
        gsap.to(btn, {
            rotateX: active ? 0 : -12,
            y: active ? 0 : -2,
            duration: 0.2,
            ease: 'power2.out',
            onComplete: onClick,
        });
    };

    return (
        <button
            ref={btnRef}
            onClick={handleClick}
            className={`relative font-mono text-[10px] uppercase tracking-widest px-4 py-2 transition-all duration-150 cursor-pointer ${active
                ? 'bg-electric text-ink shadow-[2px_2px_0_rgba(0,0,0,0.5)]'
                : 'bg-ash/5 text-ash/30 border border-ash/10 hover:border-ash/30 hover:text-ash/60'
                }`}
            style={{ transform: active ? 'rotate(-1deg)' : 'none' }}
        >
            {active && <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-electric/40" />}
            {label}
        </button>
    );
}

function HomeProductCard({ product }: { product: Product }) {
    const [imgLoaded, setImgLoaded] = useState(false);
    const { addItem, openCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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
        <div className="product-card-item break-inside-avoid mb-4">
            <Link href={`/product/${product.slug}`} className="block group">
                <div className="relative overflow-hidden bg-charcoal border border-ash/5 hover:border-ash/20 transition-all duration-300 cursor-pointer">
                    <div className="curtain-wrap">
                        <div className="relative overflow-hidden" style={{ height: `${280 + (product.id % 3) * 60}px` }}>
                            {!imgLoaded && <div className="absolute inset-0 bg-charcoal animate-pulse" />}
                            <img
                                src={product.image}
                                alt={product.title}
                                loading="lazy"
                                decoding="async"
                                onLoad={() => setImgLoaded(true)}
                                className={`w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />

                            {product.isNew && (
                                <span className="absolute top-2 left-2 font-mono text-[9px] text-ink bg-electric px-2 py-0.5 uppercase tracking-widest">
                                    NEW
                                </span>
                            )}

                            {product.soldOut && (
                                <div className="absolute inset-0 bg-ink/80 flex items-center justify-center">
                                    <span className="font-syne font-bold text-rust text-lg uppercase tracking-widest rotate-[-12deg]">SOLD OUT</span>
                                </div>
                            )}

                            {/* Button — green */}
                            {!product.soldOut && (
                                <button
                                    onClick={handleAddToCart}
                                    className="absolute bottom-0 left-0 right-0 py-2.5 bg-electric text-ink font-mono text-[10px] uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300 cursor-pointer"
                                >
                                    + ADD TO BIN
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Info — all B&W text */}
                    <div className="p-3 border-t border-ash/5">
                        <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                                <h3 className="font-syne font-bold text-ash text-xs uppercase leading-tight truncate">{product.title}</h3>
                                <p className="font-mono text-ash/20 text-[9px] uppercase tracking-wider mt-0.5">{product.size} / {product.condition}</p>
                            </div>
                            <span className="font-mono text-ash text-sm font-bold whitespace-nowrap">{formatPrice(product.price)}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

const ProductGrid: React.FC<ProductGridProps> = ({ cartZoneRef: _cartZoneRef }) => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS);

    useGSAP(() => {
        if (headerRef.current) {
            const headerEls = headerRef.current.querySelectorAll('.reveal-up');
            gsap.fromTo(headerEls,
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true }
                }
            );
        }

        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;
        gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
                scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true }
            }
        );

        if (sectionRef.current) {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    if (!gridRef.current) return;
                    const skew = self.getVelocity() / -300;
                    gsap.to(gridRef.current, { skewY: gsap.utils.clamp(-3, 3, skew), duration: 0.3, ease: 'power2.out' });
                },
            });
        }
    }, { scope: sectionRef, dependencies: [displayedProducts] });

    const handleFilter = useCallback((category: Category) => {
        if (category === activeCategory) return;
        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;
        gsap.to(cards, {
            opacity: 0, y: -20, scale: 0.9, duration: 0.25,
            stagger: { amount: 0.1, from: 'random' },
            ease: 'power2.in',
            onComplete: () => {
                setActiveCategory(category);
                setDisplayedProducts(category === 'ALL' ? PRODUCTS : PRODUCTS.filter(p => p.category === category));
            },
        });
    }, [activeCategory]);

    const total = displayedProducts.length;
    const soldOut = displayedProducts.filter(p => p.soldOut).length;

    return (
        <section ref={sectionRef} id="shop" className="relative w-full py-24 bg-ink">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ash/10 pb-8 mb-10">
                    <div>
                        {/* Section label — B&W only */}
                        <p className="reveal-up font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-2">◈ THE ARCHIVE</p>
                        <h2 className="reveal-up font-syne font-extrabold text-ash uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
                            SHOP THE BIN
                        </h2>
                    </div>
                    <div className="reveal-up flex items-center gap-4">
                        <p className="font-mono text-ash/30 text-xs uppercase tracking-widest">{total} ITEMS // {soldOut} SOLD</p>
                        {/* Button — green */}
                        <Link href="/shop" className="font-mono text-[10px] text-ink bg-electric px-3 py-1.5 uppercase tracking-widest hover:bg-ash transition-colors cursor-pointer">
                            VIEW ALL →
                        </Link>
                    </div>
                </div>

                <div className="flex gap-8">
                    <div className="hidden md:flex flex-col gap-3 w-32 shrink-0 pt-2">
                        <p className="font-mono text-[8px] text-ash/20 uppercase tracking-widest mb-2">// FILTER</p>
                        {CATEGORIES.map(cat => (
                            <StickerFilter key={cat} label={cat} active={activeCategory === cat} onClick={() => handleFilter(cat)} />
                        ))}
                    </div>

                    <div className="flex-1">
                        <div className="flex md:hidden gap-2 flex-wrap mb-6">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => handleFilter(cat)}
                                    className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-colors cursor-pointer ${activeCategory === cat ? 'bg-electric text-ink border-electric' : 'text-ash/30 border-ash/10 hover:border-ash/30'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        <div ref={gridRef} className="columns-2 md:columns-3 lg:columns-4 gap-4 skew-scroll">
                            {displayedProducts.map(product => (
                                <HomeProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
