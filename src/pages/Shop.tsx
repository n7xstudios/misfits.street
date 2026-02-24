import { useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { PRODUCTS, CATEGORIES, type Category, type Product, formatPrice } from '../store';

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
                ? 'bg-acid text-ink shadow-[2px_2px_0_rgba(0,0,0,0.5)]'
                : 'bg-ash/5 text-silver/50 border border-ash/15 hover:border-acid/40 hover:text-acid'
                }`}
            style={{ transform: active ? 'rotate(-1deg)' : 'none' }}
        >
            {active && <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1.5 bg-acid/40" />}
            {label}
        </button>
    );
}

function ShopProductCard({ product }: { product: Product }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    return (
        <Link to={`/product/${product.slug}`} className="block group">
            <div ref={cardRef} className="product-card-item relative overflow-hidden bg-charcoal border border-ash/10 hover:border-acid/30 transition-colors duration-200 cursor-pointer">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                    {!imgLoaded && (
                        <div className="absolute inset-0 bg-charcoal animate-pulse" />
                    )}
                    <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        decoding="async"
                        onLoad={() => setImgLoaded(true)}
                        className={`w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />

                    {/* Badges */}
                    {product.isNew && (
                        <span className="absolute top-2 left-2 font-mono text-[9px] text-ink bg-acid px-2 py-0.5 uppercase tracking-widest">
                            NEW
                        </span>
                    )}
                    {product.soldOut && (
                        <div className="absolute inset-0 bg-ink/70 flex items-center justify-center">
                            <span className="font-syne font-bold text-rust text-lg uppercase tracking-widest rotate-[-12deg]">
                                SOLD OUT
                            </span>
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="p-3">
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                            <h3 className="font-syne font-bold text-ash text-xs uppercase leading-tight truncate">
                                {product.title}
                            </h3>
                            <p className="font-mono text-silver/40 text-[9px] uppercase tracking-wider mt-0.5">
                                {product.category} / {product.size} / {product.condition}
                            </p>
                        </div>
                        <span className="font-mono text-acid text-sm font-bold whitespace-nowrap">
                            {formatPrice(product.price)}
                        </span>
                    </div>
                </div>

                {/* ONE-OF-ONE strip */}
                <div className="px-3 pb-2">
                    <div className="w-full h-px bg-acid/20" />
                    <p className="font-mono text-[8px] text-silver/20 uppercase tracking-[0.3em] mt-1 text-center">
                        ONE-OF-ONE
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default function Shop() {
    const gridRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<Category>('ALL');
    const [displayedProducts, setDisplayedProducts] = useState<Product[]>(PRODUCTS);

    useGSAP(() => {
        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;
        gsap.fromTo(cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.5,
                stagger: 0.06,
                ease: 'power2.out',
                delay: 0.1,
            }
        );
    }, { scope: gridRef, dependencies: [displayedProducts] });

    const handleFilter = useCallback((category: Category) => {
        if (category === activeCategory) return;

        const cards = gridRef.current?.querySelectorAll('.product-card-item');
        if (!cards) return;

        gsap.to(cards, {
            opacity: 0,
            y: -10,
            duration: 0.2,
            stagger: { amount: 0.08, from: 'random' },
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
        <>
            <Helmet>
                <title>SHOP THE BIN // MISFITS STREET</title>
                <meta name="description" content="Browse one-of-one streetwear. Tees, hoodies, jackets, pants, hats — all thrifted, all unique." />
            </Helmet>

            <section className="w-full pt-28 pb-20 bg-ink min-h-screen">
                <div className="max-w-7xl mx-auto px-4 md:px-8">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-ash/10 pb-8 mb-10">
                        <div>
                            <p className="font-mono text-[10px] text-acid tracking-[0.4em] uppercase mb-2">◈ THE ARCHIVE</p>
                            <h1 className="font-syne font-extrabold text-ash uppercase leading-none" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}>
                                SHOP THE BIN
                            </h1>
                        </div>
                        <p className="font-mono text-silver/40 text-xs uppercase tracking-widest">
                            {total} ITEMS // {soldOut} SOLD OUT
                        </p>
                    </div>

                    <div className="flex gap-8">
                        {/* Filter sidebar */}
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

                        <div className="flex-1">
                            {/* Mobile pills */}
                            <div className="flex md:hidden gap-2 flex-wrap mb-6">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleFilter(cat)}
                                        className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-colors cursor-pointer ${activeCategory === cat ? 'bg-acid text-ink border-acid' : 'text-silver/50 border-ash/15 hover:border-acid/40'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div
                                ref={gridRef}
                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                            >
                                {displayedProducts.map(product => (
                                    <ShopProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
