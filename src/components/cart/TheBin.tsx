import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCart } from '../../context/CartContext';

const TheBin: React.FC = () => {
    const { items, isOpen, removeItem, closeCart } = useCart();
    const panelRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        mainRef.current = document.getElementById('main-content') as HTMLElement;
    }, []);

    useEffect(() => {
        const panel = panelRef.current;
        const main = mainRef.current;
        if (!panel || !main) return;

        if (isOpen) {
            gsap.to(main, { x: '-30%', duration: 0.6, ease: 'power3.inOut' });
            gsap.to(panel, { x: '0%', duration: 0.6, ease: 'power3.inOut' });
        } else {
            gsap.to(main, { x: '0%', duration: 0.5, ease: 'power3.inOut' });
            gsap.to(panel, { x: '100%', duration: 0.5, ease: 'power3.inOut' });
        }
    }, [isOpen]);

    const total = items.reduce((sum, item) => {
        const num = parseFloat(item.price.replace('$', ''));
        return sum + (isNaN(num) ? 0 : num);
    }, 0);

    return (
        <div
            ref={panelRef}
            className="bin-panel fixed top-0 right-0 h-full w-[90vw] md:w-[400px] z-[100] flex flex-col"
            style={{ transform: 'translateX(100%)' }}
        >
            {/* Crate handle */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-acid/20">
                <div className="flex items-center gap-3">
                    {/* Crate handle SVG */}
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
                    className="font-mono text-silver/50 hover:text-rust transition-colors text-sm"
                >
                    ✕ CLOSE
                </button>
            </div>

            {/* Crate grid lines label */}
            <div className="px-5 py-2 border-b border-acid/10">
                <p className="font-mono text-[9px] text-silver/30 uppercase tracking-widest">
                    STORAGE UNIT #042 // MISFITS ST. WAREHOUSE
                </p>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 opacity-40">
                        <div className="text-4xl">🗑️</div>
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
                                className="w-16 h-20 object-cover grayscale contrast-125 flex-shrink-0"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <p className="font-syne font-bold text-ash text-xs uppercase leading-tight">{item.title}</p>
                                    <p className="font-mono text-acid text-sm font-bold mt-1">{item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeItem(item.id)}
                                    className="font-mono text-[9px] text-silver/30 hover:text-rust transition-colors uppercase tracking-wider self-start"
                                >
                                    ✕ REMOVE
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Receipt-style total */}
            {items.length > 0 && (
                <div className="border-t border-acid/20 px-5 py-4 space-y-2">
                    <div className="font-mono text-[10px] text-silver/40 uppercase">
                        {'- '.repeat(20)}
                    </div>
                    <div className="flex justify-between font-mono text-xs text-silver/60 uppercase">
                        <span>SUBTOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-mono text-xs text-silver/60 uppercase">
                        <span>TAX (NONE)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-syne font-bold text-acid text-base uppercase">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <button className="w-full mt-3 py-3 bg-acid text-ink font-syne font-bold uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200">
                        CHECKOUT →
                    </button>
                    <p className="font-mono text-[8px] text-silver/20 text-center uppercase tracking-widest">
                        NO RETURNS. NO REFUNDS. EVER.
                    </p>
                </div>
            )}
        </div>
    );
};

export default TheBin;
