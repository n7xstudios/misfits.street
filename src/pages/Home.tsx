import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Hero from '../components/Hero';
import ProductGrid from '../components/shop/ProductGrid';
import ScratchReveal from '../components/sections/ScratchReveal';
import Newsletter from '../components/Newsletter';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const cartZoneRef = useRef<HTMLDivElement>(null);
    const manifestoRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!manifestoRef.current) return;
        const els = manifestoRef.current.querySelectorAll('.reveal-up');
        gsap.fromTo(els,
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: manifestoRef.current,
                    start: 'top 80%',
                    once: true,
                },
            }
        );
    }, { scope: manifestoRef });

    return (
        <>
            <Helmet>
                <title>MISFITS STREET // Premium Streetwear Thrift</title>
                <meta name="description" content="Misfits Street — One-of-one premium streetwear thrift. No restocks. No replicas. EST. 2026." />
            </Helmet>

            <div
                ref={cartZoneRef}
                id="cart-drop-zone"
                className="fixed top-4 right-4 w-16 h-16 z-[90] pointer-events-none"
                aria-hidden="true"
            />

            <Hero />
            <ProductGrid cartZoneRef={cartZoneRef} />
            <ScratchReveal />

            {/* Manifesto */}
            <section
                ref={manifestoRef}
                className="relative w-full py-32 px-4 md:px-8 bg-charcoal overflow-hidden"
            >
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                    aria-hidden="true"
                >
                    <span
                        className="font-syne font-extrabold text-ash/[0.03] uppercase leading-none"
                        style={{ fontSize: 'clamp(6rem, 25vw, 20rem)', letterSpacing: '-0.05em' }}
                    >
                        MISFIT
                    </span>
                </div>

                <div className="max-w-4xl mx-auto relative z-10 text-center">
                    <p className="reveal-up font-mono text-[10px] text-acid tracking-[0.5em] uppercase mb-8">
                        ◈ THE MANIFESTO ◈
                    </p>
                    <h2
                        className="reveal-up font-syne font-extrabold text-ash uppercase leading-[0.85] mb-8"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}
                    >
                        WE DON'T SELL CLOTHES.<br />
                        WE SELL<br />
                        <span className="text-acid">IDENTITIES.</span>
                    </h2>
                    <p className="reveal-up font-marker text-silver text-xl md:text-2xl -rotate-1 mb-12">
                        "thrift is the new luxury."
                    </p>
                    <p className="reveal-up font-mono text-silver/40 text-xs uppercase tracking-widest max-w-lg mx-auto leading-relaxed">
                        Every piece in The Bin is one-of-one. When it's gone, it's gone.
                        No restocks. No replicas. No excuses.
                    </p>
                </div>
            </section>

            <Newsletter />

            <div className="h-[300px] bg-ink" aria-hidden="true" />
        </>
    );
}
