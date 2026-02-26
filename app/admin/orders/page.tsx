import { createClient } from '@/lib/supabase/server';

export default async function AdminOrdersPage() {
    const supabase = await createClient();

    // We are mocking this fetch for now, but leaving the signature so it's ready.
    // const { data: orders, error } = await supabase.from('orders').select('*, user:users(email)').order('created_at', { ascending: false });

    const error = null;
    const orders: any[] = []; // Empty state for demo

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-ash/10 pb-4">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                    ACQUISITIONS / <span className="text-ash/30">ORDERS</span>
                </h1>
            </div>

            {error && (
                <div className="bg-rust/20 border border-rust text-rust p-4 font-mono text-xs uppercase">
                    Error loading database: {(error as Error).message}
                </div>
            )}

            <div className="border border-ash/10 bg-charcoal/30 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-ash">
                    <thead className="bg-ink/50 border-b border-ash/10 text-[10px] uppercase tracking-widest text-ash/50">
                        <tr>
                            <th className="p-4 font-normal">ORDER ID</th>
                            <th className="p-4 font-normal">TIMESTAMP</th>
                            <th className="p-4 font-normal">USER</th>
                            <th className="p-4 font-normal">TOTAL</th>
                            <th className="p-4 font-normal">STATUS</th>
                            <th className="p-4 font-normal text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ash/5">
                        {orders?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-12 text-center">
                                    <p className="text-ash whitespace-nowrap overflow-hidden border-r-[3px] border-electric pr-2 animate-pulse font-mono tracking-widest uppercase text-xs inline-block">
                                        No active acquisitions detected in the mainframe.
                                    </p>
                                </td>
                            </tr>
                        ) : null}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
