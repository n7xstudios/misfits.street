import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;
        gsap.fromTo(
            containerRef.current.querySelectorAll('.reveal-up'),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
        );
    }, { scope: containerRef });

    return (
        <>
            <Helmet>
                <title>ABOUT // MISFITS STREET</title>
                <meta name="description" content="Misfits Street — Premium streetwear thrift. One-of-one pieces. No restocks. No replicas. EST. 2026." />
            </Helmet>

            <div ref={containerRef} className="w-full pt-28 pb-20 bg-ink min-h-screen">
                <div className="max-w-4xl mx-auto px-4 md:px-8">

                    <p className="reveal-up font-mono text-[10px] text-acid tracking-[0.5em] uppercase mb-6">
                        ◈ THE STORY
                    </p>

                    <h1
                        className="reveal-up font-syne font-extrabold text-ash uppercase leading-[0.85] mb-12"
                        style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}
                    >
                        WE'RE THE KIDS<br />
                        WHO NEVER FIT IN.<br />
                        <span className="text-acid">SO WE BUILT OUR OWN LANE.</span>
                    </h1>

                    <div className="space-y-8 mb-16">
                        <p className="reveal-up font-mono text-silver/60 text-sm leading-relaxed max-w-2xl">
                            MISFITS STREET started as a crate in a bedroom — a collection of
                            thrifted pieces too good to let go. Every jacket had a story. Every
                            tee had lived a life. We just gave them a second one.
                        </p>
                        <p className="reveal-up font-mono text-silver/60 text-sm leading-relaxed max-w-2xl">
                            We don't do restocks. We don't do replicas. Every single piece in
                            The Bin is one-of-one. When it's gone, it's gone. That's not a
                            marketing line — that's just how thrift works.
                        </p>
                        <p className="reveal-up font-mono text-silver/60 text-sm leading-relaxed max-w-2xl">
                            We believe streetwear shouldn't cost your rent. We believe vintage
                            is the most sustainable fashion. We believe the best outfits are
                            the ones nobody else can copy.
                        </p>
                    </div>

                    <div className="reveal-up font-marker text-acid text-2xl md:text-3xl -rotate-1 mb-16">
                        "wear your weird."
                    </div>

                    {/* Values */}
                    <div className="reveal-up grid md:grid-cols-3 gap-8 border-t border-ash/10 pt-12 mb-16">
                        {[
                            { label: 'ONE-OF-ONE', desc: 'Every piece is unique. No two carts are the same. No restocks. Ever.' },
                            { label: 'THRIFT > RETAIL', desc: 'Pre-loved, re-loved. Sustainable fashion that actually looks good.' },
                            { label: 'STREETWEAR FIRST', desc: 'We curate for the culture. If it doesn\'t pass the fit check, it doesn\'t make The Bin.' },
                        ].map(v => (
                            <div key={v.label}>
                                <h3 className="font-syne font-bold text-acid text-sm uppercase tracking-wider mb-3">{v.label}</h3>
                                <p className="font-mono text-silver/40 text-xs leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="reveal-up text-center">
                        <Link
                            to="/shop"
                            className="inline-block px-10 py-4 bg-acid text-ink font-syne font-bold text-lg uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200"
                        >
                            ENTER THE BIN →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
