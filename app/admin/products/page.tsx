import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

// We fetch products server-side
export default async function AdminProductsPage() {
    const supabase = await createClient();
    const { data: products, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center border-b border-ash/10 pb-4">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                    INVENTORY / <span className="text-ash/30">DATABASE</span>
                </h1>
                <button className="bg-electric text-ink font-syne font-bold uppercase py-2 px-6 text-sm hover:bg-ash transition-colors">
                    + ADD DRIFT
                </button>
            </div>

            {error && (
                <div className="bg-rust/20 border border-rust text-rust p-4 font-mono text-xs uppercase">
                    Error loading database: {error.message}
                </div>
            )}

            <div className="border border-ash/10 bg-charcoal/30 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-ash">
                    <thead className="bg-ink/50 border-b border-ash/10 text-[10px] uppercase tracking-widest text-ash/50">
                        <tr>
                            <th className="p-4 font-normal">ID</th>
                            <th className="p-4 font-normal">ITEM</th>
                            <th className="p-4 font-normal">PRICE</th>
                            <th className="p-4 font-normal">CAT / SIZE</th>
                            <th className="p-4 font-normal">STATUS</th>
                            <th className="p-4 font-normal text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ash/5">
                        {products?.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-ash/30 uppercase tracking-widest">
                                    DATABASE EMPTY. INIT UPLOAD.
                                </td>
                            </tr>
                        ) : products?.map((product) => (
                            <tr key={product.id} className="hover:bg-ash/5 transition-colors">
                                <td className="p-4 text-ash/40">#{product.id}</td>
                                <td className="p-4 flex items-center gap-4">
                                    <div className="w-10 h-10 bg-ink relative border border-ash/10 overflow-hidden shrink-0">
                                        <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                                    </div>
                                    <span className="truncate max-w-[200px] text-white font-syne font-bold uppercase tracking-tight">{product.title}</span>
                                </td>
                                <td className="p-4">₹{product.price}</td>
                                <td className="p-4 text-ash/60">{product.category} / {product.size}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-[9px] uppercase tracking-widest ${product.is_sold ? 'bg-rust/20 text-rust border border-rust/30' : 'bg-electric/20 text-electric border border-electric/30'}`}>
                                        {product.is_sold ? 'SOLD OUT' : 'AVAILABLE'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-4">
                                    <button className="text-ash/50 hover:text-white transition-colors uppercase tracking-widest text-[10px]">EDIT</button>
                                    <button className="text-rust/70 hover:text-rust transition-colors uppercase tracking-widest text-[10px]">DEL</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
