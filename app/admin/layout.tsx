import { requireAdmin } from '@/lib/supabase/admin';
import Link from 'next/link';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // 1. Security Check: Block ALL /admin/* routes from non-admins at the layout level.
    const user = await requireAdmin();

    return (
        <div className="min-h-screen bg-ink text-ash flex flex-col md:flex-row pt-16 relative z-10 w-full overflow-hidden">
            {/* Admin Sidebar */}
            <aside className="w-full md:w-64 bg-charcoal border-r border-ash/10 flex flex-col shrink-0">
                <div className="p-6 border-b border-ash/10">
                    <h2 className="font-syne font-bold text-xl uppercase tracking-tighter text-white">
                        SYS<span className="text-ash/30">.ADMIN</span>
                    </h2>
                    <p className="font-mono text-[9px] text-electric uppercase mt-1 tracking-widest truncate">
                        {user.email}
                    </p>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2 font-mono text-xs uppercase tracking-widest">
                    <Link href="/admin" className="p-3 hover:bg-ash/5 transition-colors text-ash border border-transparent hover:border-ash/10 cursor-pointer">
                        OVERVIEW
                    </Link>
                    <Link href="/admin/products" className="p-3 hover:bg-ash/5 transition-colors text-ash border border-transparent hover:border-ash/10 cursor-pointer">
                        THE WAREHOUSE
                    </Link>
                    <Link href="/admin/orders" className="p-3 hover:bg-ash/5 transition-colors text-ash border border-transparent hover:border-ash/10 cursor-pointer">
                        DISPATCH CENTER
                    </Link>
                    <Link href="/shop" target="_blank" className="p-3 mt-auto text-ash/40 hover:text-white transition-colors flex justify-between items-center cursor-pointer">
                        <span>VIEW SITE</span> ↗
                    </Link>
                </nav>
            </aside>

            {/* Admin Main Content */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
