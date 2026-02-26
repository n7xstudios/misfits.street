import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    // In a real scenario, fetch orders from a database table using the user.id
    const mockOrders: any[] = [];

    return (
        <div className="min-h-screen pt-24 px-4 pb-12 relative z-10 max-w-5xl mx-auto">
            <h1 className="font-syne font-extrabold text-4xl uppercase tracking-tighter mb-4">
                TERMINAL / <span className="text-ash/30">{user.email?.split('@')[0]}</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="col-span-1 border border-ash/10 bg-charcoal/30 p-6 flex flex-col gap-4">
                    <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash/50 border-b border-ash/10 pb-2">
                        IDENTITY STATUS
                    </h2>
                    <div>
                        <p className="font-mono text-xs text-ash/40">ID:</p>
                        <p className="font-mono text-sm text-ash truncate">{user.id}</p>
                    </div>
                    <div>
                        <p className="font-mono text-xs text-ash/40">EMAIL:</p>
                        <p className="font-mono text-sm text-electric truncate">{user.email}</p>
                    </div>
                    <form action="/api/auth/signout" method="POST" className="mt-auto pt-4">
                        <button className="text-[10px] font-mono text-rust hover:text-ash border border-rust hover:border-ash transition-colors px-4 py-2 uppercase tracking-widest pointer-cursor w-full text-center">
                            TERMINATE CONNECTION
                        </button>
                    </form>
                </div>

                <div className="col-span-1 md:col-span-2 border border-ash/10 bg-charcoal/30 p-6">
                    <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-ash/50 border-b border-ash/10 pb-2 mb-6">
                        ACQUISITIONS (ORDER HISTORY)
                    </h2>

                    {mockOrders.length === 0 ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center opacity-50">
                            <p className="font-mono text-sm uppercase tracking-widest text-ash">
                                NO LOGS FOUND.
                            </p>
                            <p className="font-mono text-[10px] mt-2 text-ash/50 uppercase tracking-widest">
                                Your bin is empty. Go hunt.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Map through orders when DB is ready */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
