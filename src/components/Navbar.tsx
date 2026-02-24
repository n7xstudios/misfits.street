import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

// Icons
const ShopIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);
const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
);
const BinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);
const UserIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

// Terminal search overlay (Restored)
const TerminalSearch: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(overlayRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: 'power2.out' }
        );
        setTimeout(() => inputRef.current?.focus(), 100);

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[500] bg-ink/95 backdrop-blur-sm flex flex-col items-center justify-center px-8"
            onClick={e => { if (e.target === overlayRef.current) onClose(); }}
        >
            <div className="w-full max-w-3xl">
                <p className="font-mono text-[10px] text-acid uppercase tracking-[0.4em] mb-6">
                    ◈ TERMINAL SEARCH // TYPE TO FIND
                </p>
                <div className="flex items-center gap-4 border-b-2 border-acid pb-4">
                    <span className="font-mono text-acid text-2xl">{'>'}</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="SEARCH_QUERY_"
                        className="flex-1 bg-transparent font-mono text-ash text-2xl md:text-4xl uppercase tracking-wider outline-none placeholder:text-ash/20 caret-acid"
                    />
                    <span className="font-mono text-acid text-2xl animate-pulse">█</span>
                </div>
                <div className="mt-6 flex gap-4 flex-wrap">
                    {['JACKETS', 'TEES', 'PANTS', 'RARE', 'DEADSTOCK'].map(tag => (
                        <button
                            key={tag}
                            onClick={() => setQuery(tag)}
                            className="font-mono text-[10px] text-silver/40 hover:text-acid border border-ash/10 hover:border-acid/50 px-3 py-1.5 uppercase tracking-widest transition-colors"
                        >
                            {tag}
                        </button>
                    ))}
                </div>
                <p className="font-mono text-[9px] text-silver/20 mt-8 uppercase tracking-widest">
                    ESC to close // ENTER to search
                </p>
            </div>
        </div>
    );
};

const Navbar: React.FC = () => {
    const { items, toggleCart } = useCart();
    const [searchOpen, setSearchOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Phantom Entrance (Bottom Dock Only)
        const showAnim = gsap.fromTo(navRef.current,
            { yPercent: 150 },
            { yPercent: 0, paused: true, duration: 0.4, ease: "power3.inOut" }
        );

        // Initially show
        showAnim.play();

        ScrollTrigger.create({
            start: "top top",
            end: "max",
            onUpdate: (self) => {
                // Scroll Down -> Hide
                if (self.direction === 1 && self.scroll() > 50) {
                    gsap.to(navRef.current, { yPercent: 150, duration: 0.4, ease: "power3.inOut" });
                } else if (self.direction === -1) {
                    // Scroll Up -> Show
                    gsap.to(navRef.current, { yPercent: 0, duration: 0.4, ease: "power3.inOut" });
                }
            }
        });
    }, { scope: navRef });

    return (
        <>
            {/* ── Top logo strip (Restored) ── */}
            <div className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-6 py-4 pointer-events-none">
                <span className="font-syne font-extrabold text-ash text-xl uppercase tracking-tighter pointer-events-auto mix-blend-difference">
                    MISFITS ST.
                </span>
                <span className="font-mono text-[9px] text-silver/30 uppercase tracking-widest pointer-events-none mix-blend-difference">
                    EST. 2026 // DIGITAL BRUTALISM
                </span>
            </div>

            {/* ── Bottom Phantom Dock ── */}
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[9999] flex justify-center pb-6">
                <nav
                    ref={navRef}
                    className="pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 px-8 py-3 flex gap-10 rounded-2xl shadow-2xl"
                    style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
                >
                    {/* SHOP */}
                    <button
                        onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex flex-col items-center gap-1.5 text-white/60 hover:text-acid transition-colors group"
                    >
                        <ShopIcon />
                        <span className="text-[10px] font-mono tracking-widest group-hover:text-acid/80 transition-colors">SHOP</span>
                    </button>

                    {/* SEARCH */}
                    <button
                        onClick={() => setSearchOpen(true)}
                        className="flex flex-col items-center gap-1.5 text-white/60 hover:text-acid transition-colors group"
                    >
                        <SearchIcon />
                        <span className="text-[10px] font-mono tracking-widest group-hover:text-acid/80 transition-colors">SEARCH</span>
                    </button>

                    {/* THE BIN */}
                    <button
                        onClick={toggleCart}
                        className="relative flex flex-col items-center gap-1.5 text-white/60 hover:text-acid transition-colors group"
                    >
                        <BinIcon />
                        <span className="text-[10px] font-mono tracking-widest group-hover:text-acid/80 transition-colors">THE BIN</span>
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-rust text-ash text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                {items.length}
                            </span>
                        )}
                    </button>

                    {/* PROFILE */}
                    <button className="flex flex-col items-center gap-1.5 text-white/60 hover:text-acid transition-colors group"
                    >
                        <UserIcon />
                        <span className="text-[10px] font-mono tracking-widest group-hover:text-acid/80 transition-colors">PROFILE</span>
                    </button>
                </nav>
            </div>

            {/* ── Terminal Search (Restored) ── */}
            {searchOpen && <TerminalSearch onClose={() => setSearchOpen(false)} />}
        </>
    );
};

export default Navbar;
