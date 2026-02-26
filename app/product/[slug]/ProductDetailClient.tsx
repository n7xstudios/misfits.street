'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCart } from '@/context/CartContext';
import { getProductBySlug, formatPrice, PRODUCTS } from '@/lib/store';
import PincodeChecker from '@/components/PincodeChecker';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailClient({ slug }: { slug: string }) {
    const product = getProductBySlug(slug);
    const { addItem } = useCart();
    const containerRef = useRef<HTMLDivElement>(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useGSAP(() => {
        if (!containerRef.current) return;

        gsap.fromTo('.pd-breadcrumb',
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out', delay: 0.1 }
        );

        gsap.fromTo('.pd-image-curtain',
            { scaleX: 1 },
            { scaleX: 0, duration: 0.8, ease: 'power3.inOut', delay: 0.2, transformOrigin: 'right center' }
        );

        gsap.fromTo(containerRef.current.querySelectorAll('.pd-reveal'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.3 }
        );

        gsap.fromTo('.related-card',
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: '.related-section', start: 'top 85%', once: true },
            }
        );
    }, { scope: containerRef });

    if (!product) return null;

    const handleAddToCart = () => {
        if (product.soldOut) {
            toast.error("THIS ONE'S GONE. YOU WERE TOO SLOW.");
            return;
        }
        addItem({
            id: product.id,
            title: product.title,
            price: formatPrice(product.price),
            image: product.image,
        });
        toast.success(`${product.title} ADDED TO THE BIN`);
    };

    const related = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div ref={containerRef} className="w-full pt-24 pb-20 bg-ink min-h-screen">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <nav className="pd-breadcrumb font-mono text-[10px] text-ash/20 uppercase tracking-widest mb-8">
                    <Link href="/" className="hover:text-ash transition-colors">HOME</Link>
                    <span className="mx-2">/</span>
                    <Link href="/shop" className="hover:text-ash transition-colors">SHOP</Link>
                    <span className="mx-2">/</span>
                    <span className="text-ash">{product.title}</span>
                </nav>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-ash/5">
                        <div className="pd-image-curtain absolute inset-0 bg-ink z-10" />
                        {!imgLoaded && <div className="absolute inset-0 bg-charcoal animate-pulse" />}
                        <img
                            src={product.image}
                            alt={product.title}
                            loading="eager"
                            onLoad={() => setImgLoaded(true)}
                            className={`w-full h-full object-cover ${product.soldOut ? 'grayscale' : 'grayscale-[50%] hover:grayscale-0'} contrast-125 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        {product.soldOut && (
                            <div className="absolute inset-0 bg-ink/70 flex items-center justify-center z-20">
                                <span className="font-syne font-extrabold text-rust text-3xl uppercase tracking-widest rotate-[-12deg]">SOLD OUT</span>
                            </div>
                        )}
                        {product.isNew && !product.soldOut && (
                            <span className="absolute top-3 left-3 z-20 font-mono text-[10px] text-ink bg-electric px-3 py-1 uppercase tracking-widest">NEW DROP</span>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="pd-reveal">
                            <p className="font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-2">
                                ◈ {product.category} / {product.condition}
                            </p>
                            <h1 className="font-syne font-extrabold text-ash uppercase leading-[0.9]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
                                {product.title}
                            </h1>
                        </div>

                        <div className="pd-reveal">
                            <span className="font-syne font-extrabold text-ash text-4xl">{formatPrice(product.price)}</span>
                            <p className="font-mono text-ash/15 text-[9px] uppercase tracking-widest mt-1">INCLUSIVE OF ALL TAXES</p>
                        </div>

                        {product.description && (
                            <p className="pd-reveal font-mono text-ash/40 text-sm leading-relaxed">{product.description}</p>
                        )}

                        <div className="pd-reveal border border-ash/5 divide-y divide-ash/5">
                            {[
                                ['SIZE', product.size],
                                ['CONDITION', product.condition],
                                ['QUANTITY', '1'],
                                ['TYPE', 'ONE-OF-ONE'],
                            ].map(([label, value]) => (
                                <div key={label} className="flex justify-between px-4 py-3">
                                    <span className="font-mono text-[10px] text-ash/20 uppercase tracking-widest">{label}</span>
                                    <span className="font-mono text-[10px] text-ash uppercase tracking-widest">{value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pd-reveal space-y-3">
                            <button
                                onClick={handleAddToCart}
                                disabled={product.soldOut}
                                className={`w-full py-4 font-syne font-bold text-lg uppercase tracking-widest transition-all duration-200 cursor-pointer ${product.soldOut
                                    ? 'bg-charcoal text-ash/15 cursor-not-allowed'
                                    : 'bg-electric text-ink hover:bg-ash glow-green-hover'
                                    }`}
                            >
                                {product.soldOut ? 'SOLD OUT' : 'ADD TO THE BIN →'}
                            </button>
                            {!product.soldOut && (
                                <p className="font-mono text-[9px] text-rust/60 uppercase tracking-widest text-center animate-pulse">
                                    ◉ SOMEONE ELSE IS LOOKING AT THIS
                                </p>
                            )}
                        </div>

                        <div className="pd-reveal">
                            <PincodeChecker />
                        </div>

                        <div className="pd-reveal border-t border-ash/5 pt-4 space-y-2">
                            <p className="font-mono text-[9px] text-ash/15 uppercase tracking-widest">✦ FREE SHIPPING ON ORDERS ABOVE ₹2,999</p>
                            <p className="font-mono text-[9px] text-ash/15 uppercase tracking-widest">✦ DELIVERED IN 5-7 BUSINESS DAYS</p>
                            <p className="font-mono text-[9px] text-ash/15 uppercase tracking-widest">✦ NO RETURNS. NO REFUNDS. EVER.</p>
                        </div>
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="related-section mt-20 border-t border-ash/5 pt-12">
                        <h2 className="font-syne font-extrabold text-ash uppercase text-xl mb-8 tracking-tight">
                            MORE {product.category}
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {related.map(p => (
                                <Link key={p.id} href={`/product/${p.slug}`} className="related-card group block cursor-pointer">
                                    <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-ash/5 hover:border-ash/20 transition-colors">
                                        <img
                                            src={p.image}
                                            alt={p.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                                        />
                                        {p.soldOut && (
                                            <div className="absolute inset-0 bg-ink/70 flex items-center justify-center">
                                                <span className="font-syne font-bold text-rust text-sm uppercase rotate-[-12deg]">SOLD</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        <p className="font-syne font-bold text-ash text-xs uppercase truncate">{p.title}</p>
                                        <p className="font-mono text-ash/50 text-xs">{formatPrice(p.price)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
