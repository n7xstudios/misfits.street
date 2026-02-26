'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

const RECEIPT_LINES = [
  { text: '================================', type: 'divider' },
  { text: '   MISFITS STREET // EST. 2026  ', type: 'header' },
  { text: '   PREMIUM THRIFT & STREETWEAR  ', type: 'header' },
  { text: '================================', type: 'divider' },
  { text: 'DATE: 18/02/2026  TIME: 11:46', type: 'meta' },
  { text: 'TERMINAL: DIGITAL-MOSHPIT-01', type: 'meta' },
  { text: '--------------------------------', type: 'divider' },
  { text: 'ITEM                       QTY', type: 'label' },
  { text: 'UTILITY BOMBER_V2 ........ 1', type: 'item' },
  { text: '  $240.00', type: 'price' },
  { text: 'ACID WASH TEE ............ 1', type: 'item' },
  { text: '  $85.00', type: 'price' },
  { text: 'CARGO PANT_MK3 ........... 1', type: 'item' },
  { text: '  $180.00', type: 'price' },
  { text: 'VINTAGE HOODIE ........... 1', type: 'item' },
  { text: '  $120.00', type: 'price' },
  { text: '--------------------------------', type: 'divider' },
  { text: 'SUBTOTAL:            $625.00', type: 'total' },
  { text: 'TAX (0%):              $0.00', type: 'total' },
  { text: 'TOTAL:               $625.00', type: 'total-bold' },
  { text: '================================', type: 'divider' },
  { text: '  THANK YOU FOR BEING A MISFIT  ', type: 'footer' },
  { text: '  NO RETURNS. NO REFUNDS. EVER. ', type: 'footer' },
  { text: '================================', type: 'divider' },
  { text: '  ||||||||||||||||||||||||||||| ', type: 'barcode' },
  { text: '  0 4 2 6 - M S F T - 2 0 2 6  ', type: 'barcode-num' },
];

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    console.log('Preloader: starting animation sequence');
    const tl = gsap.timeline({
      onComplete: () => console.log('Preloader: timeline complete'),
      onInterrupt: () => console.log('Preloader: timeline interrupted'),
    });

    // 1. Reveal lines one by one (receipt printing)
    tl.to(linesRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.04,
      stagger: 0.06,
      ease: 'none',
    });

    // 2. Brief pause at end
    tl.to({}, { duration: 0.4 });

    // 3. Rip animation — top flies up, bottom flies down
    tl.to(topHalfRef.current, {
      y: '-110%',
      rotation: -3,
      duration: 0.45,
      ease: 'power4.in',
    }, '>')
      .to(bottomHalfRef.current, {
        y: '110%',
        rotation: 2,
        duration: 0.45,
        ease: 'power4.in',
      }, '<')
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.15,
        ease: 'none',
        onComplete,
      });

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-ink"
    >
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,245,240,0.5) 2px, rgba(245,245,240,0.5) 4px)',
        }}
      />

      <div ref={paperRef} className="relative w-72 max-h-[80vh] overflow-hidden">
        {/* Top half of receipt */}
        <div ref={topHalfRef} className="receipt-paper px-4 pt-4 pb-0">
          {RECEIPT_LINES.slice(0, Math.ceil(RECEIPT_LINES.length / 2)).map((line, i) => (
            <div
              key={i}
              ref={el => { if (el) linesRef.current[i] = el; }}
              className={`receipt-line whitespace-pre text-[11px] leading-5 ${line.type === 'header' ? 'font-bold text-center' :
                line.type === 'total-bold' ? 'font-bold' :
                  line.type === 'barcode' ? 'tracking-[0.15em] text-center text-lg leading-3' :
                    line.type === 'barcode-num' ? 'tracking-widest text-center text-[9px]' :
                      line.type === 'price' ? 'text-right' :
                        line.type === 'divider' ? 'opacity-50' : ''
                }`}
              style={{ opacity: 0, transform: 'translateY(4px)' }}
            >
              {line.text}
            </div>
          ))}
          {/* Rip edge top */}
          <div className="w-full h-3 mt-0"
            style={{
              background: 'linear-gradient(to bottom, #f5f5f0 0%, transparent 100%)',
              clipPath: 'polygon(0% 0%, 3% 100%, 6% 0%, 9% 100%, 12% 0%, 15% 100%, 18% 0%, 21% 100%, 24% 0%, 27% 100%, 30% 0%, 33% 100%, 36% 0%, 39% 100%, 42% 0%, 45% 100%, 48% 0%, 51% 100%, 54% 0%, 57% 100%, 60% 0%, 63% 100%, 66% 0%, 69% 100%, 72% 0%, 75% 100%, 78% 0%, 81% 100%, 84% 0%, 87% 100%, 90% 0%, 93% 100%, 96% 0%, 100% 100%, 100% 0%)',
            }}
          />
        </div>

        {/* Bottom half of receipt */}
        <div ref={bottomHalfRef} className="receipt-paper px-4 pb-4 pt-0">
          {/* Rip edge bottom */}
          <div className="w-full h-3 mb-0"
            style={{
              background: 'linear-gradient(to top, #f5f5f0 0%, transparent 100%)',
              clipPath: 'polygon(0% 100%, 3% 0%, 6% 100%, 9% 0%, 12% 100%, 15% 0%, 18% 100%, 21% 0%, 24% 100%, 27% 0%, 30% 100%, 33% 0%, 36% 100%, 39% 0%, 42% 100%, 45% 0%, 48% 100%, 51% 0%, 54% 100%, 57% 0%, 60% 100%, 63% 0%, 66% 100%, 69% 0%, 72% 100%, 75% 0%, 78% 100%, 81% 0%, 84% 100%, 87% 0%, 90% 100%, 93% 0%, 96% 100%, 100% 0%, 100% 100%)',
            }}
          />
          {RECEIPT_LINES.slice(Math.ceil(RECEIPT_LINES.length / 2)).map((line, i) => {
            const globalIdx = Math.ceil(RECEIPT_LINES.length / 2) + i;
            return (
              <div
                key={globalIdx}
                ref={el => { if (el) linesRef.current[globalIdx] = el; }}
                className={`receipt-line whitespace-pre text-[11px] leading-5 ${line.type === 'header' ? 'font-bold text-center' :
                  line.type === 'total-bold' ? 'font-bold' :
                    line.type === 'barcode' ? 'tracking-[0.15em] text-center text-lg leading-3' :
                      line.type === 'barcode-num' ? 'tracking-widest text-center text-[9px]' :
                        line.type === 'price' ? 'text-right' :
                          line.type === 'divider' ? 'opacity-50' : ''
                  }`}
                style={{ opacity: 0, transform: 'translateY(4px)' }}
              >
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Preloader;
