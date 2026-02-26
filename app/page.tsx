'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/shop/ProductGrid';
import ScratchReveal from '@/components/sections/ScratchReveal';
import Newsletter from '@/components/Newsletter';
import MarqueeBand from '@/components/ui/MarqueeBand';
import HeroMarquees from '@/components/home/HeroMarquees';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
    const cartZoneDummyRef = useRef<HTMLDivElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const sections = pageRef.current?.querySelectorAll('.home-section');
        if (!sections) return;

        sections.forEach(section => {
            gsap.fromTo(section,
                { opacity: 0, y: 80 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });

        // Manifesto parallax
        const manifestoWords = pageRef.current?.querySelectorAll('.manifesto-word');
        manifestoWords?.forEach((word, i) => {
            gsap.to(word, {
                y: (i % 2 === 0 ? -30 : 30),
                ease: 'none',
                scrollTrigger: {
                    trigger: word,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.5,
                },
            });
        });

        // Split line reveals
        const splitLines = pageRef.current?.querySelectorAll('.split-line > span');
        splitLines?.forEach(line => {
            gsap.fromTo(line,
                { y: '100%' },
                {
                    y: '0%',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: line.parentElement,
                        start: 'top 85%',
                        once: true,
                    },
                }
            );
        });
    }, { scope: pageRef });

    return (
        <div ref={pageRef}>
            <Hero />

            {/* ── Massive 3-Band Marquee ── */}
            <div className="home-section -mt-4 mb-24 relative z-20">
                <HeroMarquees />
            </div>

            <div ref={cartZoneDummyRef} />

            <div className="home-section">
                <ProductGrid cartZoneRef={cartZoneDummyRef} />
            </div>

            {/* ── Marquee 2: After Product Grid ── */}
            <MarqueeBand
                text="HAND-PICKED FROM THE UNDERGROUND"
                speed={15}
                direction={1}
                variant="muted"
            />

            <div className="home-section">
                <ScratchReveal />
            </div>

            {/* Manifesto */}
            <section className="home-section relative w-full py-32 bg-ink overflow-hidden">
                <div className="absolute inset-0 flex justify-between px-8 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-px bg-ash/5 h-full" />
                    ))}
                </div>

                <div className="relative max-w-5xl mx-auto px-4 md:px-8 text-center space-y-12">
                    <p className="font-mono text-[10px] text-ash/30 tracking-[0.5em] uppercase">✦ MANIFESTO</p>

                    <div className="space-y-2">
                        <div className="split-line">
                            <span className="font-syne font-extrabold text-ash uppercase" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: '0.9' }}>
                                WE DON&apos;T DO
                            </span>
                        </div>
                        <div className="split-line">
                            <span className="font-syne font-extrabold text-ash uppercase" style={{ fontSize: 'clamp(2rem, 6vw, 5rem)', letterSpacing: '-0.03em', lineHeight: '0.9' }}>
                                FAST FASHION.
                            </span>
                        </div>
                    </div>

                    <div className="max-w-2xl mx-auto space-y-6">
                        <p className="manifesto-word font-mono text-ash/50 text-sm leading-relaxed">
                            EVERY PIECE IN THE BIN IS A ONE-OF-ONE. HAND-PICKED FROM THE UNDERGROUND.
                            NO RESTOCKS. NO REPLICAS. WHEN IT&apos;S GONE — IT&apos;S GONE.
                        </p>
                        <p className="manifesto-word font-mono text-ash/30 text-sm leading-relaxed">
                            THIS ISN&apos;T A STORE. IT&apos;S A DIGITAL MOSHPIT FOR MISFITS WHO WEAR WHAT THE MAINSTREAM WON&apos;T TOUCH.
                        </p>
                    </div>

                    <div className="flex items-center justify-center gap-6 font-mono text-[9px] text-ash/15 uppercase tracking-[0.4em]">
                        <span>ONE OF ONE</span>
                        <span className="w-8 h-px bg-ash/10" />
                        <span>NO RESTOCKS</span>
                        <span className="w-8 h-px bg-ash/10" />
                        <span>EVER</span>
                    </div>
                </div>
            </section>

            {/* ── Marquee 3: After Manifesto ── */}
            <MarqueeBand
                text="NO RETURNS ✦ NO REFUNDS ✦ MISFITS ONLY"
                speed={18}
                direction={-1}
                variant="outline"
            />

            <div className="home-section">
                <Newsletter />
            </div>
        </div>
    );
}
