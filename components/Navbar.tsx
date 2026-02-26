'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
    { href: '/', label: 'HOME' },
    { href: '/shop', label: 'SHOP' },
    { href: '/about', label: 'ABOUT' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const { openCart, itemCount } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            const current = window.scrollY;
            setHidden(current > 80 && current > lastScroll);
            setLastScroll(current);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        if (!mobileMenuRef.current) return;
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
            gsap.fromTo(mobileMenuRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.3, ease: 'power3.out' }
            );
            const links = mobileMenuRef.current.querySelectorAll('.mobile-link');
            gsap.fromTo(links,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out', delay: 0.1 }
            );
        } else {
            document.body.style.overflow = '';
        }
    }, [mobileOpen]);

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-[100] transition-transform duration-300 ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
        >
            <div className="bg-ink/90 backdrop-blur-md border-b border-ash/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
                    <Link href="/" className="font-syne font-extrabold text-ash text-lg uppercase tracking-tighter hover:opacity-80 transition-opacity">
                        MISFITS<span className="text-ash/30">.</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {NAV_LINKS.map(link => {
                            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-200 cursor-pointer ${isActive ? 'text-ash' : 'text-ash/25 hover:text-ash/60'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={openCart}
                            className="relative text-ash/40 hover:text-ash transition-colors cursor-pointer p-1"
                            aria-label="Open cart"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-electric text-ink text-[8px] font-mono font-bold flex items-center justify-center rounded-full">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden font-mono text-[10px] text-ash/40 uppercase tracking-widest hover:text-ash transition-colors cursor-pointer"
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? 'CLOSE' : 'MENU'}
                        </button>
                    </div>
                </div>
            </div>

            {mobileOpen && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden fixed inset-0 top-16 bg-ink/98 backdrop-blur-lg z-[99] flex flex-col items-center justify-center gap-8"
                >
                    {NAV_LINKS.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`mobile-link font-syne font-extrabold text-3xl uppercase tracking-tight transition-colors cursor-pointer ${isActive ? 'text-ash' : 'text-ash/20 hover:text-ash/60'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            )}
        </nav>
    );
}
