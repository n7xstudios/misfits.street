import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

// SVG Icons
const ShopIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" />
    </svg>
);

const BinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
);

const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
);

const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const NAV_LINKS = [
    { to: '/', label: 'HOME' },
    { to: '/shop', label: 'SHOP' },
    { to: '/about', label: 'ABOUT' },
];

const Navbar: React.FC = () => {
    const { items, toggleCart } = useCart();
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Show/hide on scroll
    useGSAP(() => {
        if (!navRef.current) return;
        ScrollTrigger.create({
            start: 'top -100',
            end: 99999,
            onUpdate: (self) => {
                if (!navRef.current) return;
                if (self.direction === 1) {
                    gsap.to(navRef.current, { y: -120, duration: 0.4, ease: 'power2.inOut' });
                } else {
                    gsap.to(navRef.current, { y: 0, duration: 0.4, ease: 'power2.inOut' });
                }
            },
        });
    }, { scope: navRef });

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <>
            <nav
                ref={navRef}
                className="fixed top-4 left-4 right-4 z-[80] bg-ink/90 backdrop-blur-md border border-ash/10"
            >
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <span className="font-syne font-extrabold text-ash text-lg uppercase tracking-tighter group-hover:text-acid transition-colors">
                            MISFITS ST.
                        </span>
                    </Link>

                    {/* Desktop links */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 hover:text-acid ${location.pathname === link.to ? 'text-acid' : 'text-silver/60'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link
                            to="/shop"
                            className="text-silver/60 hover:text-acid transition-colors hidden md:block"
                            aria-label="Shop"
                        >
                            <ShopIcon />
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="relative text-silver/60 hover:text-acid transition-colors cursor-pointer"
                            aria-label="Cart"
                        >
                            <BinIcon />
                            {items.length > 0 && (
                                <span className="absolute -top-1 -right-2 font-mono text-[8px] text-ink bg-acid w-4 h-4 flex items-center justify-center">
                                    {items.length}
                                </span>
                            )}
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-silver/60 hover:text-acid transition-colors cursor-pointer"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {mobileOpen && (
                    <div className="md:hidden border-t border-ash/10 px-4 py-4 space-y-3">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`block font-mono text-xs uppercase tracking-[0.3em] py-2 transition-colors ${location.pathname === link.to ? 'text-acid' : 'text-silver/60 hover:text-acid'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
