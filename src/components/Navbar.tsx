import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { useMagneticButton } from '../hooks/useMagneticButton';

// Icons — inline SVGs to avoid lucide-react import issues during install
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

interface DockItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    badge?: number;
}

// Terminal search overlay
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
    const dockRef = useRef<HTMLDivElement>(null);

    const DOCK_ITEMS: DockItem[] = [
        {
            id: 'shop',
            label: 'SHOP',
            icon: <ShopIcon />,
            onClick: () => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' }),
        },
        {
            id: 'search',
            label: 'SEARCH',
            icon: <SearchIcon />,
            onClick: () => setSearchOpen(true),
        },
        {
            id: 'bin',
            label: 'THE BIN',
            icon: <BinIcon />,
            onClick: toggleCart,
            badge: items.length,
        },
        {
            id: 'profile',
            label: 'PROFILE',
            icon: <UserIcon />,
        },
    ];

    // macOS dock scale effect
    useEffect(() => {
        const items = dockRef.current?.querySelectorAll('.dock-item');
        if (!items) return;

        const onMove = (e: MouseEvent) => {
            items.forEach(item => {
                const rect = item.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const dist = Math.abs(e.clientX - cx);
                const scale = dist < 80 ? 1 + (1 - dist / 80) * 0.5 : 1;
                gsap.to(item, { scale, duration: 0.2, ease: 'power2.out' });
            });
        };

        const onLeave = () => {
            items.forEach(item => gsap.to(item, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }));
        };

        const dock = dockRef.current;
        dock?.addEventListener('mousemove', onMove);
        dock?.addEventListener('mouseleave', onLeave);
        return () => {
            dock?.removeEventListener('mousemove', onMove);
            dock?.removeEventListener('mouseleave', onLeave);
        };
    }, []);

    return (
        <>
            {/* ── Top logo strip ── */}
            <div className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-between px-6 py-4 pointer-events-none">
                <span className="font-syne font-extrabold text-ash text-xl uppercase tracking-tighter pointer-events-auto">
                    MISFITS ST.
                </span>
                <span className="font-mono text-[9px] text-silver/30 uppercase tracking-widest pointer-events-none">
                    EST. 2026 // DIGITAL BRUTALISM
                </span>
            </div>

            {/* ── Bottom dock ── */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80]">
                <div
                    ref={dockRef}
                    className="flex items-end gap-3 px-5 py-3 bg-ink/80 backdrop-blur-md border border-ash/10"
                    style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(245,245,240,0.05)' }}
                >
                    {DOCK_ITEMS.map(item => (
                        <button
                            key={item.id}
                            className="dock-item relative flex flex-col items-center gap-1.5 px-4 py-2 text-silver/60 hover:text-acid transition-colors duration-200 group"
                            onClick={item.onClick}
                            title={item.label}
                        >
                            {item.icon}
                            <span className="font-mono text-[8px] uppercase tracking-widest">{item.label}</span>
                            {/* Badge */}
                            {item.badge !== undefined && item.badge > 0 && (
                                <span className="absolute -top-1 -right-1 bg-rust text-ash text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                                    {item.badge}
                                </span>
                            )}
                            {/* Hover indicator */}
                            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-acid rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Terminal Search ── */}
            {searchOpen && <TerminalSearch onClose={() => setSearchOpen(false)} />}
        </>
    );
};

export default Navbar;
