'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';
import { formatPrice as formatINR } from '@/lib/store';

const FREE_SHIPPING = 2999;

export default function TheBin() {
    const { items, removeItem, isOpen, toggleCart, clearCart, itemCount } = useCart();
    const panelRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    const subtotal = items.reduce((sum, item) => {
        const num = parseFloat(item.price.replace(/[₹,]/g, ''));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    const shippingFree = subtotal >= FREE_SHIPPING;
    const shipping = shippingFree ? 0 : 99;
    const total = subtotal + shipping;

    useEffect(() => {
        if (!panelRef.current || !backdropRef.current) return;

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            gsap.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
            gsap.fromTo(panelRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
            setTimeout(() => {
                const itemEls = panelRef.current?.querySelectorAll('.cart-item');
                if (itemEls) {
                    gsap.fromTo(itemEls, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' });
                }
            }, 200);
        } else {
            document.body.style.overflow = '';
            gsap.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' });
            gsap.to(backdropRef.current, { opacity: 0, duration: 0.3 });
        }
    }, [isOpen]);

    return (
        <>
            <div
                ref={backdropRef}
                className={`fixed inset-0 bg-ink/80 backdrop-blur-sm z-[200] transition-all ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
                style={{ opacity: 0 }}
                onClick={toggleCart}
            />

            <div
                ref={panelRef}
                className="fixed top-0 right-0 h-full w-full max-w-md z-[201] bin-panel flex flex-col"
                style={{ transform: 'translateX(100%)' }}
            >
                {/* Header — B&W */}
                <div className="flex items-center justify-between p-6 border-b border-ash/5">
                    <div>
                        <h2 className="font-syne font-extrabold text-ash text-xl uppercase tracking-tight">THE BIN</h2>
                        <p className="font-mono text-[9px] text-ash/20 uppercase tracking-widest mt-0.5">{itemCount} ITEMS</p>
                    </div>
                    <button onClick={toggleCart} className="font-mono text-ash/30 hover:text-rust transition-colors cursor-pointer p-1" aria-label="Close cart">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* Items — B&W text, prices in white */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                            <p className="font-syne font-bold text-ash/10 text-2xl uppercase tracking-tight mb-2">EMPTY</p>
                            <p className="font-mono text-[9px] text-ash/10 uppercase tracking-widest">NOTHING IN THE BIN YET.</p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="cart-item flex gap-4 border border-ash/5 p-3 hover:border-ash/15 transition-colors">
                                <img src={item.image} alt={item.title} className="w-16 h-20 object-cover grayscale contrast-125 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-syne font-bold text-ash text-xs uppercase truncate">{item.title}</h3>
                                    <p className="font-mono text-ash text-sm font-bold mt-1">{item.price}</p>
                                    <p className="font-mono text-ash/15 text-[9px] uppercase mt-0.5">QTY: 1</p>
                                </div>
                                <button onClick={() => removeItem(item.id)} className="text-ash/15 hover:text-rust transition-colors cursor-pointer self-start" aria-label="Remove item">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer — B&W text, button green */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-ash/5 space-y-4">
                        {!shippingFree && (
                            <div>
                                <p className="font-mono text-[9px] text-ash/20 uppercase tracking-widest mb-2">
                                    ADD {formatINR(FREE_SHIPPING - subtotal)} MORE FOR FREE SHIPPING
                                </p>
                                <div className="w-full h-1 bg-charcoal overflow-hidden">
                                    <div className="h-full bg-electric transition-all duration-500" style={{ width: `${Math.min((subtotal / FREE_SHIPPING) * 100, 100)}%` }} />
                                </div>
                            </div>
                        )}
                        {shippingFree && (
                            <p className="font-mono text-[9px] text-ash uppercase tracking-widest">✓ FREE SHIPPING UNLOCKED</p>
                        )}

                        <div className="space-y-1">
                            <div className="flex justify-between font-mono text-xs text-ash/30 uppercase tracking-widest">
                                <span>SUB</span><span>{formatINR(subtotal)}</span>
                            </div>
                            <div className="flex justify-between font-mono text-xs text-ash/30 uppercase tracking-widest">
                                <span>SHIPPING</span><span>{shippingFree ? 'FREE' : formatINR(shipping)}</span>
                            </div>
                            <div className="flex justify-between font-syne font-bold text-ash text-base uppercase tracking-tight pt-2 border-t border-ash/5">
                                <span>TOTAL</span><span>{formatINR(total)}</span>
                            </div>
                        </div>

                        {/* Button — green */}
                        <button className="w-full py-4 bg-electric text-ink font-syne font-bold text-base uppercase tracking-widest hover:bg-ash transition-colors duration-200 cursor-pointer glow-green-hover">
                            CHECKOUT →
                        </button>

                        <button onClick={clearCart} className="block w-full text-center font-mono text-[9px] text-ash/15 uppercase tracking-widest hover:text-rust transition-colors cursor-pointer">
                            CLEAR BIN
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
