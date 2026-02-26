'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PaymentBadges from './ui/PaymentBadges';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const footer = footerRef.current;
        if (!footer) return;

        gsap.fromTo(footer.querySelectorAll('.ft-reveal'),
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: footer, start: 'top 90%', once: true },
            }
        );
    }, { scope: footerRef });

    return (
        <footer ref={footerRef} className="relative w-full bg-ink border-t border-ash/5 py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                    <div>
                        <h3 className="ft-reveal font-syne font-extrabold text-ash text-2xl uppercase tracking-tighter mb-4">
                            MISFITS<span className="text-ash/30">.</span>
                        </h3>
                        <p className="ft-reveal font-mono text-ash/20 text-xs leading-relaxed">
                            ONE-OF-ONE STREETWEAR THRIFT.<br />
                            HAND-PICKED FROM THE UNDERGROUND.<br />
                            IF IT FITS THE MISFIT, IT FITS THE BIN.
                        </p>
                    </div>

                    <div>
                        <p className="ft-reveal font-mono text-[9px] text-ash/30 tracking-[0.4em] uppercase mb-4">NAVIGATE</p>
                        <nav className="space-y-2">
                            {[
                                { href: '/', label: 'HOME' },
                                { href: '/shop', label: 'SHOP THE BIN' },
                                { href: '/about', label: 'ABOUT' },
                            ].map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="ft-reveal block font-mono text-xs text-ash/30 uppercase tracking-widest hover:text-ash transition-colors duration-200 cursor-pointer"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="ft-reveal font-mono text-[9px] text-ash/30 tracking-[0.4em] uppercase mb-4">INFO</p>
                        <div className="space-y-2">
                            <p className="ft-reveal font-mono text-xs text-ash/20 uppercase tracking-widest">FREE SHIPPING ABOVE ₹2,999</p>
                            <p className="ft-reveal font-mono text-xs text-ash/20 uppercase tracking-widest">NO RETURNS. NO REFUNDS.</p>
                            <a
                                href="mailto:hello@misfits.street"
                                className="ft-reveal block font-mono text-xs text-ash/30 uppercase tracking-widest hover:text-ash transition-colors cursor-pointer"
                            >
                                HELLO@MISFITS.STREET
                            </a>
                        </div>
                    </div>
                </div>

                <div className="ft-reveal mt-12 w-full flex justify-center md:justify-start">
                    <PaymentBadges />
                </div>

                <div className="ft-reveal mt-12 pt-6 border-t border-ash/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-mono text-[8px] text-ash/10 uppercase tracking-widest">© 2026 MISFITS STREET. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6">
                        <a href="https://instagram.com" target="_blank" rel="noopener" className="font-mono text-[9px] text-ash/10 uppercase tracking-widest hover:text-ash transition-colors cursor-pointer">IG</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener" className="font-mono text-[9px] text-ash/10 uppercase tracking-widest hover:text-ash transition-colors cursor-pointer">X</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
