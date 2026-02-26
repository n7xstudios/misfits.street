import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NO RETURN POLICY',
    description: 'We do not process returns or refunds. Every piece is a one-of-one.',
};

export default function NoReturnPolicyPage() {
    return (
        <div className="min-h-screen pt-32 pb-16 px-4 md:px-8 relative z-10 max-w-4xl mx-auto">
            <h1 className="font-syne font-extrabold text-5xl md:text-7xl uppercase tracking-tighter mb-4 text-ash">
                THE BIN
                <br />
                <span className="text-ash/30">DOES NOT FORGIVE.</span>
            </h1>

            <div className="h-px w-full bg-ash/10 my-12" />

            <div className="space-y-12 font-mono text-sm uppercase leading-relaxed text-ash/70 tracking-wide max-w-2xl">
                <section>
                    <h2 className="text-rust font-bold tracking-widest mb-4">1.0 ALL SALES ARE FINAL</h2>
                    <p>
                        WE OPERATE A STRICT ZERO-RETURN, ZERO-EXCHANGE, ZERO-REFUND POLICY. EVERY PIECE
                        IN THIS CATALOG IS SOURCED INDIVIDUALLY AND IS A ONE-OF-ONE DRIFT. ONCE YOU
                        CHECK OUT, THAT PIECE IS YOURS FOREVER.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-widest mb-4">2.0 CONDITION DISCLOSURE</h2>
                    <p>
                        THESE ARE VINTAGE, THRIFTED, OR DEADSTOCK ITEMS. THEY CARRY THE WEAR AND
                        TEAR OF THEIR FORMER LIVES. ANY CRITICAL DAMAGE OR UNIQUE DISTRESSING WILL BE
                        NOTED IN THE PRODUCT DESCRIPTION AND GRADING. BY PURCHASING, YOU ACCEPT THE
                        ITEM IN ITS CURRENT STATE.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-widest mb-4">3.0 SIZING LIABILITY</h2>
                    <p>
                        VINTAGE SIZING IS INCONSISTENT. WE PROVIDE MODERN ESTIMATED SIZES, BUT THE
                        FINAL LIABILITY RESTS WITH THE BUYER. WE DO NOT ACCEPT RETURNS FOR PIECES THAT
                        DO NOT FIT.
                    </p>
                </section>

                <section>
                    <h2 className="text-white font-bold tracking-widest mb-4">4.0 LOST OR DAMAGED FREIGHT</h2>
                    <p>
                        ONCE A PACKAGE IS HANDED OVER TO THE CARRIER, OUR DOMAIN ENDS. WE ARE NOT
                        RESPONSIBLE FOR LOST, STOLEN, OR DAMAGED SHIPMENTS.
                    </p>
                </section>

                <div className="pt-8 border-t border-ash/10 border-dashed">
                    <p className="font-syne font-bold text-xl text-ash">
                        IF YOU CANNOT ACCEPT THESE TERMS, DO NOT ENGAGE.
                    </p>
                </div>
            </div>
        </div>
    );
}
