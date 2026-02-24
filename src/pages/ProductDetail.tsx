import { useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCart } from '../context/CartContext';
import { getProductBySlug, formatPrice, PRODUCTS } from '../store';

export default function ProductDetail() {
    const { id } = useParams<{ id: string }>();
    const product = getProductBySlug(id || '');
    const { addItem } = useCart();
    const containerRef = useRef<HTMLDivElement>(null);
    const [imgLoaded, setImgLoaded] = useState(false);

    useGSAP(() => {
        if (!containerRef.current) return;
        gsap.fromTo(
            containerRef.current.querySelectorAll('.reveal-up'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }, { scope: containerRef });

    if (!product) {
        return <Navigate to="/shop" replace />;
    }

    const handleAddToCart = () => {
        if (product.soldOut) {
            toast.error('THIS ONE\'S GONE. YOU WERE TOO SLOW.');
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

    // Get related products (same category, different item)
    const related = PRODUCTS
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <>
            <Helmet>
                <title>{product.title} // MISFITS STREET</title>
                <meta name="description" content={product.description || `${product.title} — One-of-one streetwear from Misfits Street.`} />
            </Helmet>

            <div ref={containerRef} className="w-full pt-24 pb-20 bg-ink min-h-screen">
                <div className="max-w-6xl mx-auto px-4 md:px-8">

                    {/* Breadcrumb */}
                    <nav className="reveal-up font-mono text-[10px] text-silver/40 uppercase tracking-widest mb-8">
                        <Link to="/" className="hover:text-acid transition-colors">HOME</Link>
                        <span className="mx-2">/</span>
                        <Link to="/shop" className="hover:text-acid transition-colors">SHOP</Link>
                        <span className="mx-2">/</span>
                        <span className="text-acid">{product.title}</span>
                    </nav>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        {/* Image */}
                        <div className="reveal-up relative aspect-[3/4] overflow-hidden bg-charcoal border border-ash/10">
                            {!imgLoaded && (
                                <div className="absolute inset-0 bg-charcoal animate-pulse" />
                            )}
                            <img
                                src={product.image}
                                alt={product.title}
                                loading="eager"
                                onLoad={() => setImgLoaded(true)}
                                className={`w-full h-full object-cover ${product.soldOut ? 'grayscale' : 'grayscale-[50%] hover:grayscale-0'} contrast-110 transition-all duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                            />

                            {product.soldOut && (
                                <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                                    <span className="font-syne font-extrabold text-rust text-3xl uppercase tracking-widest rotate-[-12deg]">
                                        SOLD OUT
                                    </span>
                                </div>
                            )}

                            {product.isNew && !product.soldOut && (
                                <span className="absolute top-3 left-3 font-mono text-[10px] text-ink bg-acid px-3 py-1 uppercase tracking-widest">
                                    NEW DROP
                                </span>
                            )}
                        </div>

                        {/* Details */}
                        <div className="space-y-6">
                            <div className="reveal-up">
                                <p className="font-mono text-[10px] text-acid tracking-[0.4em] uppercase mb-2">
                                    ◈ {product.category} / {product.condition}
                                </p>
                                <h1
                                    className="font-syne font-extrabold text-ash uppercase leading-[0.9]"
                                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
                                >
                                    {product.title}
                                </h1>
                            </div>

                            <div className="reveal-up">
                                <span className="font-syne font-extrabold text-acid text-4xl">
                                    {formatPrice(product.price)}
                                </span>
                                <p className="font-mono text-silver/30 text-[9px] uppercase tracking-widest mt-1">
                                    INCLUSIVE OF ALL TAXES
                                </p>
                            </div>

                            {product.description && (
                                <p className="reveal-up font-mono text-silver/60 text-sm leading-relaxed">
                                    {product.description}
                                </p>
                            )}

                            {/* Specs */}
                            <div className="reveal-up border border-ash/10 divide-y divide-ash/10">
                                {[
                                    ['SIZE', product.size],
                                    ['CONDITION', product.condition],
                                    ['QUANTITY', '1'],
                                    ['TYPE', 'ONE-OF-ONE'],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex justify-between px-4 py-3">
                                        <span className="font-mono text-[10px] text-silver/40 uppercase tracking-widest">{label}</span>
                                        <span className="font-mono text-[10px] text-ash uppercase tracking-widest">{value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <div className="reveal-up space-y-3">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.soldOut}
                                    className={`w-full py-4 font-syne font-bold text-lg uppercase tracking-widest transition-colors duration-200 cursor-pointer ${product.soldOut
                                        ? 'bg-charcoal text-silver/30 cursor-not-allowed'
                                        : 'bg-acid text-ink hover:bg-rust hover:text-ash'
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

                            {/* Shipping info */}
                            <div className="reveal-up border-t border-ash/10 pt-4 space-y-2">
                                <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest">
                                    ✦ FREE SHIPPING ON ORDERS ABOVE ₹2,999
                                </p>
                                <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest">
                                    ✦ DELIVERED IN 5-7 BUSINESS DAYS
                                </p>
                                <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest">
                                    ✦ NO RETURNS. NO REFUNDS. EVER.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-20 border-t border-ash/10 pt-12">
                            <h2 className="font-syne font-extrabold text-ash uppercase text-xl mb-8 tracking-tight">
                                MORE {product.category}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {related.map(p => (
                                    <Link key={p.id} to={`/product/${p.slug}`} className="group block">
                                        <div className="relative aspect-[3/4] overflow-hidden bg-charcoal border border-ash/10 hover:border-acid/30 transition-colors">
                                            <img
                                                src={p.image}
                                                alt={p.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            {p.soldOut && (
                                                <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
                                                    <span className="font-syne font-bold text-rust text-sm uppercase rotate-[-12deg]">SOLD</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <p className="font-syne font-bold text-ash text-xs uppercase truncate">{p.title}</p>
                                            <p className="font-mono text-acid text-xs">{formatPrice(p.price)}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
