'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useGSAP(() => {
        const section = sectionRef.current;
        if (!section) return;

        gsap.fromTo(section.querySelectorAll('.nl-reveal'),
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
                scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            }
        );

        gsap.fromTo(section.querySelector('.nl-border'),
            { scaleX: 0 },
            {
                scaleX: 1, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: section, start: 'top 85%', once: true },
            }
        );
    }, { scope: sectionRef });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            toast.error('ENTER A VALID EMAIL.');
            return;
        }
        setLoading(true);
        await new Promise(r => setTimeout(r, 800));
        setLoading(false);
        setSubmitted(true);
        toast.success("YOU'RE IN THE LIST.");

        if (sectionRef.current) {
            gsap.to(sectionRef.current.querySelector('.nl-form'), {
                opacity: 0, y: -20, duration: 0.3,
                onComplete: () => {
                    gsap.fromTo(sectionRef.current!.querySelector('.nl-success'),
                        { opacity: 0, y: 20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
                    );
                },
            });
        }
    };

    return (
        <section ref={sectionRef} className="relative w-full py-24 bg-ink overflow-hidden">
            <div className="max-w-2xl mx-auto px-4 md:px-8 text-center">
                <div className="nl-border h-px bg-ash/10 origin-left mb-12" />

                {/* Labels — B&W */}
                <p className="nl-reveal font-mono text-[10px] text-ash/30 tracking-[0.5em] uppercase mb-4">✦ MAILING LIST</p>

                <h2 className="nl-reveal font-syne font-extrabold text-ash uppercase leading-none mb-4" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)', letterSpacing: '-0.03em' }}>
                    DON'T MISS A DROP
                </h2>

                <p className="nl-reveal font-mono text-ash/30 text-xs uppercase tracking-widest mb-10">
                    FIRST ACCESS TO NEW ARRIVALS. NO SPAM. EVER.
                </p>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="nl-form nl-reveal flex gap-0 max-w-md mx-auto">
                        <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="YOUR@EMAIL.COM"
                            className="flex-1 px-4 py-3 bg-charcoal border border-ash/10 text-ash font-mono text-xs uppercase tracking-widest placeholder:text-ash/10 focus:outline-none focus:border-ash/30 transition-colors"
                        />
                        {/* Button — green */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-electric text-ink font-syne font-bold text-sm uppercase tracking-widest hover:bg-ash transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? '...' : 'JOIN'}
                        </button>
                    </form>
                ) : (
                    <div className="nl-success">
                        <p className="font-syne font-extrabold text-ash text-2xl uppercase tracking-widest">
                            YOU'RE IN ✓
                        </p>
                        <p className="font-mono text-ash/30 text-xs uppercase tracking-widest mt-2">
                            WE'LL HIT YOUR INBOX WHEN IT MATTERS
                        </p>
                    </div>
                )}

                <p className="nl-reveal font-mono text-[8px] text-ash/10 uppercase tracking-widest mt-8">
                    BY SUBSCRIBING YOU AGREE TO RECEIVE EMAILS FROM MISFITS STREET
                </p>
            </div>
        </section>
    );
}
