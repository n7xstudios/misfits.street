import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';

const TheBin: React.FC = () => {
    const { items, isOpen, removeItem, closeCart } = useCart();
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return;

        if (isOpen) {
            gsap.to(panel, { x: '0%', duration: 0.5, ease: 'power3.inOut' });
        } else {
            gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.inOut' });
        }
    }, [isOpen]);

    const parsePrice = (p: string): number => {
        const num = parseFloat(p.replace(/[₹,]/g, ''));
        return isNaN(num) ? 0 : num;
    };

    const total = items.reduce((sum, item) => sum + parsePrice(item.price), 0);

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-ink/50 z-[99] cursor-pointer"
                    onClick={closeCart}
                    aria-hidden="true"
                />
            )}

            <div
                ref={panelRef}
                className="bin-panel fixed top-0 right-0 h-full w-[90vw] md:w-[400px] z-[100] flex flex-col"
                style={{ transform: 'translateX(100%)' }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-acid/20">
                    <div className="flex items-center gap-3">
                        <svg width="28" height="16" viewBox="0 0 28 16" fill="none" className="text-acid">
                            <rect x="1" y="1" width="26" height="14" rx="7" stroke="currentColor" strokeWidth="2" />
                            <rect x="8" y="5" width="12" height="6" rx="3" fill="currentColor" opacity="0.3" />
                        </svg>
                        <span className="font-syne font-bold text-acid uppercase tracking-widest text-lg">THE BIN</span>
                        <span className="font-mono text-[10px] text-silver/50 bg-ash/5 px-2 py-0.5 border border-ash/10">
                            {items.length} ITEM{items.length !== 1 ? 'S' : ''}
                        </span>
                    </div>
                    <button
                        onClick={closeCart}
                        className="font-mono text-silver/50 hover:text-rust transition-colors text-sm cursor-pointer"
                    >
                        ✕ CLOSE
                    </button>
                </div>

                <div className="px-5 py-2 border-b border-acid/10">
                    <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest">
                        STORAGE UNIT #042 // MISFITS ST. WAREHOUSE
                    </p>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-silver/40">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                            <p className="font-mono text-[11px] text-silver uppercase tracking-widest text-center">
                                BIN IS EMPTY<br />
                                <span className="text-acid/60">Go find some misfits</span>
                            </p>
                        </div>
                    ) : (
                        items.map(item => (
                            <div key={item.id} className="flex gap-3 border border-ash/10 p-3 hover:border-acid/30 transition-colors">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-16 h-20 object-cover grayscale contrast-125 flex-shrink-0"
                                />
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <p className="font-syne font-bold text-ash text-xs uppercase leading-tight">{item.title}</p>
                                        <p className="font-mono text-acid text-sm font-bold mt-1">{item.price}</p>
                                    </div>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="font-mono text-[9px] text-silver/30 hover:text-rust transition-colors uppercase tracking-wider self-start cursor-pointer"
                                    >
                                        ✕ REMOVE
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Total */}
                {items.length > 0 && (
                    <div className="border-t border-acid/20 px-5 py-4 space-y-2">
                        <div className="font-mono text-[10px] text-silver/40 uppercase">
                            {'- '.repeat(20)}
                        </div>
                        <div className="flex justify-between font-mono text-xs text-silver/60 uppercase">
                            <span>SUBTOTAL</span>
                            <span>₹{total.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between font-mono text-xs text-silver/60 uppercase">
                            <span>SHIPPING</span>
                            <span>{total >= 2999 ? 'FREE' : '₹99'}</span>
                        </div>
                        <div className="flex justify-between font-syne font-bold text-acid text-base uppercase">
                            <span>TOTAL</span>
                            <span>₹{(total < 2999 ? total + 99 : total).toLocaleString('en-IN')}</span>
                        </div>
                        <button className="w-full mt-3 py-3 bg-acid text-ink font-syne font-bold uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200 cursor-pointer">
                            CHECKOUT →
                        </button>
                        <p className="font-mono text-[8px] text-silver/20 text-center uppercase tracking-widest">
                            FREE SHIPPING ABOVE ₹2,999 // NO RETURNS. EVER.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default TheBin;
