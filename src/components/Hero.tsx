import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useTextScramble } from '../hooks/useTextScramble';
import { useMagneticButton } from '../hooks/useMagneticButton';
import MarqueeBand from './ui/MarqueeBand';

// Parallax collage elements
const COLLAGE_ELEMENTS = [
  { emoji: '📌', x: '6%', y: '22%', speed: 0.2, size: '2rem', rotate: -15 },
  { emoji: '🏷️', x: '88%', y: '18%', speed: 0.35, size: '2.5rem', rotate: 12 },
  { emoji: '✂️', x: '78%', y: '62%', speed: 0.15, size: '2rem', rotate: -30 },
  { emoji: '📎', x: '10%', y: '72%', speed: 0.4, size: '1.8rem', rotate: 20 },
  { emoji: '⭐', x: '52%', y: '8%', speed: 0.25, size: '1.5rem', rotate: 5 },
  { emoji: '🔖', x: '92%', y: '48%', speed: 0.3, size: '2rem', rotate: -8 },
];

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const collageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef = useMagneticButton<HTMLButtonElement>();

  const { ref: subRef } = useTextScramble<HTMLParagraphElement>('PREMIUM THRIFT // EST. 2026');

  useGSAP(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });

    // Parallax collage
    collageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: () => -window.innerHeight * COLLAGE_ELEMENTS[i].speed,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Hero content parallax
    gsap.to('.hero-content', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-ink flex flex-col"
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-35 contrast-150 scale-105"
        style={{ filter: 'grayscale(1) brightness(0.6)' }}
        autoPlay loop muted playsInline
      >
        <source src="https://videos.pexels.com/video-files/5503028/5503028-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      {/* ── "MISFITS" text video mask ── */}
      {/* The giant text acts as a window into the video via mix-blend-mode */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <h1
          className="font-syne font-extrabold text-ash uppercase leading-none"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '1px rgba(245,245,240,0.15)',
            color: 'transparent',
            backgroundImage: 'url(https://videos.pexels.com/video-files/5503028/5503028-uhd_2560_1440_25fps.mp4)',
            WebkitBackgroundClip: 'text',
            // Fallback: solid text with blend mode
            mixBlendMode: 'overlay',
          }}
          aria-hidden="true"
        >
          MISFITS
        </h1>
      </div>

      {/* ── Solid text overlay (readable) ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <h1
          className="font-syne font-extrabold text-ash uppercase leading-none opacity-90"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '2px rgba(200,255,0,0.4)',
            color: 'rgba(245,245,240,0.08)',
          }}
        >
          MISFITS
        </h1>
      </div>

      {/* ── Dark gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/95 pointer-events-none z-5" />

      {/* ── Parallax collage ── */}
      {COLLAGE_ELEMENTS.map((el, i) => (
        <div
          key={i}
          ref={node => { collageRefs.current[i] = node; }}
          className="absolute pointer-events-none select-none z-10"
          style={{
            left: el.x, top: el.y,
            fontSize: el.size,
            transform: `rotate(${el.rotate}deg)`,
            filter: 'grayscale(1) contrast(2)',
            opacity: 0.5,
          }}
          aria-hidden="true"
        >
          {el.emoji}
        </div>
      ))}

      {/* ── Main content ── */}
      <div className="hero-content relative z-20 flex flex-col items-center justify-center flex-1 px-4 text-center pt-16">
        <p className="font-mono text-[10px] tracking-[0.5em] text-acid uppercase mb-4 opacity-80">
          ◈ DIGITAL MOSHPIT ◈
        </p>

        {/* Visible scramble headline */}
        <div
          className="font-syne font-extrabold text-ash uppercase leading-[0.85] tracking-tighter"
          style={{ fontSize: 'clamp(3.5rem, 16vw, 14rem)' }}
        >
          MISFITS<br />
          <span className="text-acid">STREET</span>
        </div>

        <p
          ref={subRef}
          className="font-mono text-silver text-sm md:text-base tracking-[0.3em] mt-6 uppercase"
        >
          PREMIUM THRIFT // EST. 2026
        </p>

        <p className="font-marker text-acid text-xl md:text-2xl mt-4 -rotate-2 opacity-90">
          "one-of-one or nothing."
        </p>

        <button
          ref={ctaRef}
          className="magnetic-btn mt-10 px-10 py-4 bg-acid text-ink font-syne font-bold text-lg uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200"
          onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
        >
          ENTER THE BIN →
        </button>

        <div className="mt-14 flex flex-col items-center gap-2 opacity-30">
          <div className="w-px h-10 bg-ash animate-pulse" />
          <span className="font-mono text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        </div>
      </div>

      {/* ── Marquee at bottom ── */}
      <div className="relative z-20 mt-auto">
        <MarqueeBand />
      </div>
    </section>
  );
};

export default Hero;
