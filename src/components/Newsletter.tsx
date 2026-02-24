import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        if (!sectionRef.current) return;
        gsap.fromTo(
            sectionRef.current.querySelectorAll('.reveal-up'),
            { opacity: 0, y: 30 },
            {
                opacity: 1, y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    once: true,
                },
            }
        );
    }, { scope: sectionRef });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            toast.error('ENTER A VALID EMAIL');
            return;
        }
        // In production, connect to Mailchimp/Buttondown API
        setSubmitted(true);
        toast.success('YOU\'RE IN. WELCOME TO THE MISFITS.');
        setEmail('');
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 px-4 md:px-8 bg-ink border-t border-ash/10">
            <div className="max-w-2xl mx-auto text-center">
                <p className="reveal-up font-mono text-[10px] text-acid tracking-[0.4em] uppercase mb-4">
                    ◈ SUBSCRIBE
                </p>
                <h2
                    className="reveal-up font-syne font-extrabold text-ash uppercase leading-[0.9] mb-4"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
                >
                    GET FIRST DIBS ON<br />
                    <span className="text-acid">NEW DROPS</span>
                </h2>
                <p className="reveal-up font-mono text-silver/40 text-xs uppercase tracking-widest mb-8">
                    No spam. Just drops, restocks (lol), and exclusive finds.
                </p>

                {submitted ? (
                    <div className="reveal-up font-mono text-acid text-sm uppercase tracking-widest">
                        ✦ YOU'RE ON THE LIST ✦
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="reveal-up flex gap-0 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="YOUR@EMAIL.COM"
                            className="flex-1 px-4 py-3 bg-charcoal border border-ash/15 text-ash font-mono text-xs uppercase tracking-widest placeholder:text-silver/20 focus:outline-none focus:border-acid/50 transition-colors"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-acid text-ink font-syne font-bold text-sm uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200 cursor-pointer"
                        >
                            JOIN
                        </button>
                    </form>
                )}
            </div>
        </section>
    );
}
