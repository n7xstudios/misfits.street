import Link from 'next/link';
import MarqueeBand from './MarqueeBand';

export default function NoReturnBanner() {
    return (
        <div className="w-full bg-rust border-b border-ink pointer-events-auto relative z-[60]">
            <Link href="/policies/no-return" className="block w-full cursor-pointer hover:opacity-90 transition-opacity">
                <div className="w-full overflow-hidden whitespace-nowrap py-1 relative flex items-center">
                    {/* We can use the existing MarqueeBand or a custom faster one */}
                    <div className="animate-marquee inline-block font-mono text-[8px] sm:text-[10px] uppercase font-bold text-ink tracking-widest">
                        {[...Array(10)].map((_, i) => (
                            <span key={i} className="px-4">
                                ⚠️ ALL SALES FINAL. ONE-OF-ONE ITEMS. NO RETURNS OR REFUNDS OVER THIS LINE.
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </div>
    );
}
