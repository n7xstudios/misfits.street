'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTextScramble } from '@/hooks/useTextScramble';
import { useMagneticButton } from '@/hooks/useMagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useMagneticButton<HTMLButtonElement>();
  const router = useRouter();

  const { ref: subRef } = useTextScramble<HTMLParagraphElement>('PREMIUM THRIFT // EST. 2026');

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 0.6 });

    tl.fromTo('.hero-bg-text',
      { scale: 3, opacity: 0, filter: 'blur(20px)' },
      { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
      '-=0.3'
    );

    tl.fromTo('.hero-line-1',
      { y: 120, opacity: 0, rotateX: -60 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    tl.fromTo('.hero-line-2',
      { y: 120, opacity: 0, rotateX: -60 },
      { y: 0, opacity: 1, rotateX: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    tl.fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    tl.fromTo('.hero-tagline',
      { opacity: 0, y: 30, rotate: -6 },
      { opacity: 0.9, y: 0, rotate: -2, duration: 0.6, ease: 'back.out(1.7)' },
      '-=0.2'
    );

    tl.fromTo('.hero-cta',
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(2)' },
      '-=0.2'
    );

    // Scroll parallax — bg text stays visible
    gsap.to('.hero-video', {
      scale: 1.15,
      ease: 'none',
      scrollTrigger: { trigger: container, start: 'top top', end: 'bottom top', scrub: 1 },
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-ink flex flex-col"
    >
      <video
        className="hero-video absolute inset-0 w-full h-full object-cover opacity-30 contrast-150 scale-105"
        style={{ filter: 'grayscale(1) brightness(0.5)' }}
        autoPlay loop muted playsInline
        preload="metadata"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23000' width='1' height='1'/%3E%3C/svg%3E"
      >
        <source src="https://videos.pexels.com/video-files/5503028/5503028-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <h1
          className="hero-bg-text font-syne font-extrabold text-ash uppercase leading-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '2px rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.04)',
          }}
          aria-label="Misfits Street"
        >
          MISFITS
        </h1>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink pointer-events-none z-[5]" />

      <div className="hero-content relative z-20 flex flex-col items-center justify-center flex-1 px-4 text-center pt-16" style={{ perspective: '800px' }}>
        <div className="overflow-hidden">
          <div
            className="hero-line-1 font-syne font-extrabold text-ash uppercase leading-[0.85] tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 16vw, 14rem)' }}
          >
            MISFITS
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="hero-line-2 font-syne font-extrabold text-ash uppercase leading-[0.85] tracking-tighter"
            style={{ fontSize: 'clamp(3.5rem, 16vw, 14rem)' }}
          >
            STREET
          </div>
        </div>

        <p
          ref={subRef}
          className="hero-sub font-mono text-ash/50 text-sm md:text-base tracking-[0.3em] mt-6 uppercase"
        >
          PREMIUM THRIFT // EST. 2026
        </p>

        <p className="hero-tagline font-marker text-ash/60 text-xl md:text-2xl mt-4 -rotate-2">
          &quot;one-of-one or nothing.&quot;
        </p>

        <button
          ref={ctaRef}
          className="hero-cta magnetic-btn mt-10 px-10 py-4 bg-electric text-ink font-syne font-bold text-lg uppercase tracking-widest hover:bg-ash hover:text-ink transition-colors duration-200 cursor-pointer glow-green-hover"
          onClick={() => router.push('/shop')}
        >
          ENTER THE BIN →
        </button>

        {/* ── Option A: No Returns Warning ── */}
        <div className="mt-8 flex items-center justify-center gap-2 font-mono text-[9px] text-white bg-white/5 px-4 py-1.5 uppercase tracking-widest border border-white/10">
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <span className="opacity-80">STRICTLY NO RETURNS. WE DON&apos;T SELL USED GEAR.</span>
        </div>
      </div>

      {/* ── Brutalist Overlays ── */}
      <div className="absolute top-24 right-8 z-30 flex gap-3 items-center pointer-events-none opacity-50 hidden md:flex">
        <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
        <span className="font-mono text-[9px] text-white tracking-[0.4em]">SYS.REC // 1080p60</span>
      </div>

      <div className="absolute bottom-8 left-8 z-30 pointer-events-none opacity-40 mix-blend-difference hidden md:block">
        <div className="flex gap-[2px] h-10 items-end mb-2">
          {[1, 3, 1, 4, 2, 1, 1, 5, 2, 1, 3, 1, 1, 2].map((v, i) => (
            <div key={i} className="bg-white" style={{ width: `${v * 2}px`, height: `${100 - (Math.random() * 40)}%` }} />
          ))}
        </div>
        <span className="font-mono text-[8px] text-white tracking-[0.5em] block">MFTS-77-N-28</span>
        <span className="font-mono text-[8px] text-white tracking-[0.5em] block mt-1">LAT 28.6139 N / LON 77.2090 E</span>
      </div>

      <div className="absolute top-1/2 left-8 -translate-y-1/2 z-30 pointer-events-none opacity-20 -rotate-90 origin-left hidden md:block w-max">
        <span className="font-syne font-black text-6xl text-transparent tracking-tighter" style={{ WebkitTextStroke: '1px white' }}>
          ARCHIVE
        </span>
      </div>

    </section>
  );
};

export default Hero;

