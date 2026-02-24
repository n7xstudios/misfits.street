import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useTextScramble } from '../hooks/useTextScramble';
import { useMagneticButton } from '../hooks/useMagneticButton';
import MarqueeBand from './ui/MarqueeBand';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const ctaRef = useMagneticButton<HTMLButtonElement>();
  const navigate = useNavigate();

  const { ref: subRef } = useTextScramble<HTMLParagraphElement>('PREMIUM THRIFT // EST. 2026');

  useGSAP(() => {
    gsap.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' });

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
      {/* Video background — lazy loaded with poster */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-35 contrast-150 scale-105"
        style={{ filter: 'grayscale(1) brightness(0.6)' }}
        autoPlay loop muted playsInline
        preload="metadata"
        poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%230a0a0a' width='1' height='1'/%3E%3C/svg%3E"
      >
        <source src="https://videos.pexels.com/video-files/5503028/5503028-uhd_2560_1440_25fps.mp4" type="video/mp4" />
      </video>

      {/* MISFITS text overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10">
        <h1
          className="font-syne font-extrabold text-ash uppercase leading-none opacity-90"
          style={{
            fontSize: 'clamp(5rem, 22vw, 20rem)',
            letterSpacing: '-0.04em',
            WebkitTextStroke: '2px rgba(200,255,0,0.4)',
            color: 'rgba(245,245,240,0.08)',
          }}
          aria-label="Misfits Street"
        >
          MISFITS
        </h1>
      </div>

      {/* Dark gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/95 pointer-events-none z-[5]" />

      {/* Main content */}
      <div className="hero-content relative z-20 flex flex-col items-center justify-center flex-1 px-4 text-center pt-16">
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
          className="magnetic-btn mt-10 px-10 py-4 bg-acid text-ink font-syne font-bold text-lg uppercase tracking-widest hover:bg-rust hover:text-ash transition-colors duration-200 cursor-pointer"
          onClick={() => navigate('/shop')}
        >
          ENTER THE BIN →
        </button>
      </div>

      {/* Marquee at bottom */}
      <div className="relative z-20 mt-auto">
        <MarqueeBand />
      </div>
    </section>
  );
};

export default Hero;
