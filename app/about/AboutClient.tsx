'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutClient() {
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const page = pageRef.current;
        if (!page) return;

        gsap.fromTo('.about-line',
            { y: '100%' },
            { y: '0%', duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
        );

        page.querySelectorAll('.about-section').forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 60 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: section, start: 'top 85%', once: true },
                }
            );
        });

        gsap.fromTo('.value-card',
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: '.values-grid', start: 'top 85%', once: true },
            }
        );

        gsap.fromTo('.ig-post',
            { opacity: 0, y: 20 },
            {
                opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
                scrollTrigger: { trigger: '.ig-grid', start: 'top 85%', once: true },
            }
        );
    }, { scope: pageRef });

    const values = [
        { title: 'ONE-OF-ONE', desc: 'Every piece is unique. No mass production. No restocks.' },
        { title: 'ANTI-WASTE', desc: 'Thrift-first. We pull heat from what others throw away.' },
        { title: 'UNDERGROUND', desc: 'Sourced from markets, closets, and chaos across India.' },
        { title: 'NO GATEKEEPING', desc: 'Premium streetwear without premium markup.' },
    ];

    return (
        <div ref={pageRef} className="w-full pt-24 pb-20 bg-ink min-h-screen">
            <div className="max-w-4xl mx-auto px-4 md:px-8">
                <div className="border-b border-ash/5 pb-12 mb-16">
                    <p className="font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-4">◈ ABOUT</p>
                    <div className="space-y-1">
                        <div className="overflow-hidden">
                            <div className="about-line font-syne font-extrabold text-ash uppercase leading-[0.85]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>
                                WE&apos;RE NOT
                            </div>
                        </div>
                        <div className="overflow-hidden">
                            <div className="about-line font-syne font-extrabold text-ash uppercase leading-[0.85]" style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>
                                A BRAND.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section space-y-8 mb-20">
                    <p className="font-mono text-ash/50 text-sm leading-relaxed max-w-xl">
                        MISFITS STREET IS A DIGITAL BIN FOR THE STREETWEAR UNDERGROUND. EVERY PIECE IS THRIFTED,
                        HAND-PICKED, AND ONE-OF-A-KIND. WE DON&apos;T DO FAST FASHION. WE DON&apos;T DO RESTOCKS.
                        WE DON&apos;T DO BORING.
                    </p>
                    <p className="font-mono text-ash/25 text-sm leading-relaxed max-w-xl">
                        LAUNCHED IN 2026 OUT OF PURE FRUSTRATION WITH OVERPRICED BASICS AND COOKIE-CUTTER STREETWEAR,
                        THIS IS WHERE MISFITS COME TO FIND WHAT THE MAINSTREAM WON&apos;T TOUCH.
                    </p>
                </div>

                <div className="about-section mb-20">
                    <p className="font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-8">✦ VALUES</p>
                    <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-4">
                        {values.map((v, i) => (
                            <div key={i} className="value-card border border-ash/5 p-6 hover:border-ash/20 transition-colors duration-300 cursor-default group">
                                <h3 className="font-syne font-extrabold text-ash text-lg uppercase tracking-tight mb-2 group-hover:text-ash/80 transition-colors">
                                    {v.title}
                                </h3>
                                <p className="font-mono text-ash/25 text-xs leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Founder Story */}
                <div className="about-section mb-24 border-l border-electric pl-6 md:pl-10">
                    <p className="font-mono text-[10px] text-electric tracking-[0.4em] uppercase mb-6">✦ CREATOR PROTOCOL</p>
                    <div className="space-y-6">
                        <h2 className="font-syne font-extrabold text-2xl md:text-4xl uppercase text-white tracking-tighter">
                            BUILT BY THE SCENE,<br />FOR THE SCENE.
                        </h2>
                        <p className="font-mono text-ash/50 text-sm leading-relaxed max-w-2xl">
                            We got tired of waiting for drops that sold out to bots in 3 seconds. We got tired of massive markups on vintage tees just because someone ironed them. Misfits Street was born from the trunk of a car outside local gigs. We spent years hunting through export surplus piles so you wouldn&apos;t have to.
                        </p>
                        <p className="font-mono text-ash/30 text-xs uppercase tracking-widest leading-relaxed pt-2">
                            — THE FOUNDERS (N7X STUDIOS)
                        </p>
                    </div>
                </div>

                {/* Instagram Community Feed (Static Placeholder for now) */}
                <div className="about-section mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <p className="font-mono text-[10px] text-ash/30 tracking-[0.4em] uppercase mb-2">✦ COMMUNITY</p>
                            <h3 className="font-syne font-extrabold text-2xl uppercase text-white tracking-tighter">
                                IN THE WILD
                            </h3>
                        </div>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-electric hover:text-white transition-colors uppercase tracking-widest hidden md:block">
                            FOLLOW @MISFITS.STREET ↗
                        </a>
                    </div>

                    <div className="ig-grid grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" key={item} className="ig-post group relative aspect-square bg-charcoal/30 border border-ash/10 overflow-hidden block">
                                <div className="absolute inset-0 bg-ink/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <span className="font-mono text-xs text-electric uppercase tracking-widest">VIEW ON IG</span>
                                </div>
                                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-0">
                                    <p className="font-mono text-[9px] text-white/50 truncate">@misfits_user_{item}</p>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center text-ash/10 font-syne font-extrabold text-4xl group-hover:scale-110 transition-transform duration-500">
                                    #{item}
                                </div>
                            </a>
                        ))}
                    </div>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-electric text-center block mt-6 md:hidden uppercase tracking-widest">
                        FOLLOW @MISFITS.STREET ↗
                    </a>
                </div>

                <div className="about-section text-center py-16 border-t border-ash/5">
                    <p className="font-marker text-ash/50 text-2xl -rotate-2 mb-6">
                        &quot;stop scrolling. start wearing.&quot;
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-10 py-4 bg-electric text-ink font-syne font-bold text-lg uppercase tracking-widest hover:bg-ash transition-colors duration-200 cursor-pointer glow-green-hover"
                    >
                        SHOP THE BIN →
                    </Link>
                </div>
            </div>
        </div>
    );
}
