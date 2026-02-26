'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { checkServiceability, type ServiceabilityResult } from '@/services/shipping';

interface PincodeCheckerProps {
    compact?: boolean;
}

export default function PincodeChecker({ compact = false }: PincodeCheckerProps) {
    const [pincode, setPincode] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ServiceabilityResult | null>(null);
    const [error, setError] = useState<string | null>(null);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleCheck = async () => {
        const cleaned = pincode.trim();
        if (!/^\d{6}$/.test(cleaned)) {
            setError('ENTER A VALID 6-DIGIT PINCODE');
            setResult(null);
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await checkServiceability(cleaned);
            setResult(data);
            if (resultRef.current) {
                gsap.fromTo(resultRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
            }
        } catch (err: any) {
            setError(err.message || 'SOMETHING WENT WRONG. TRY AGAIN.');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') handleCheck();
    };

    return (
        <div className={compact ? '' : 'border border-ash/5 p-4'}>
            {/* Label — B&W */}
            <p className="font-mono text-[9px] text-ash/30 uppercase tracking-widest mb-3">✦ CHECK DELIVERY</p>

            <div className="flex gap-0">
                <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={pincode}
                    onChange={e => { setPincode(e.target.value.replace(/\D/g, '')); setResult(null); setError(null); }}
                    onKeyDown={handleKeyDown}
                    placeholder="ENTER PINCODE"
                    className="flex-1 px-3 py-2 bg-charcoal border border-ash/5 text-ash font-mono text-xs uppercase tracking-widest placeholder:text-ash/10 focus:outline-none focus:border-ash/30 transition-colors"
                />
                {/* Button — green */}
                <button
                    onClick={handleCheck}
                    disabled={loading}
                    className="px-4 py-2 bg-electric text-ink font-mono text-[10px] uppercase tracking-widest hover:bg-ash transition-colors duration-200 disabled:opacity-50 cursor-pointer"
                >
                    {loading ? '...' : 'CHECK'}
                </button>
            </div>

            {error && (
                <p className="font-mono text-[9px] text-rust uppercase tracking-widest mt-2">✕ {error}</p>
            )}

            {result && (
                <div ref={resultRef} className="mt-3 space-y-1">
                    {result.serviceable ? (
                        <>
                            {/* Result text — B&W */}
                            <p className="font-mono text-[10px] text-ash uppercase tracking-widest">✓ DELIVERY AVAILABLE</p>
                            {result.estimated_delivery && (
                                <p className="font-mono text-[9px] text-ash/25 uppercase tracking-widest">EST. DELIVERY: {result.estimated_delivery} DAYS</p>
                            )}
                            {result.cheapest_rate !== null && (
                                <p className="font-mono text-[9px] text-ash/25 uppercase tracking-widest">SHIPPING FROM: ₹{Math.round(result.cheapest_rate)}</p>
                            )}
                            {result.cod_available && (
                                <p className="font-mono text-[9px] text-ash/25 uppercase tracking-widest">COD AVAILABLE ✓</p>
                            )}
                            <p className="font-mono text-[8px] text-ash/10 uppercase tracking-widest">VIA {result.cheapest_courier || 'COURIER PARTNER'}</p>
                        </>
                    ) : (
                        <p className="font-mono text-[10px] text-rust uppercase tracking-widest">✕ DELIVERY NOT AVAILABLE TO THIS PINCODE</p>
                    )}
                </div>
            )}
        </div>
    );
}
