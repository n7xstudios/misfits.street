'use client';

import { useState, useEffect, useTransition } from 'react';
import ProductRow from '@/components/admin/ProductRow';
import { bulkUpdateProducts, bulkDeleteProducts } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase/client';

export default function AdminProductsPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const [bulkAction, setBulkAction] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const supabase = createClient();
            const { data, error: fetchError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (fetchError) throw fetchError;
            setProducts(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleSelect = (id: number) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const selectAll = () => {
        if (selectedIds.size === products.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(products.map(p => p.id)));
        }
    };

    const handleBulkMarkSold = () => {
        startTransition(async () => {
            const ids = Array.from(selectedIds);
            await bulkUpdateProducts(ids, { is_sold: true });
            setSelectedIds(new Set());
            fetchProducts();
        });
    };

    const handleBulkMarkAvailable = () => {
        startTransition(async () => {
            const ids = Array.from(selectedIds);
            await bulkUpdateProducts(ids, { is_sold: false });
            setSelectedIds(new Set());
            fetchProducts();
        });
    };

    const handleBulkDelete = () => {
        if (!confirm(`PERMANENTLY DELETE ${selectedIds.size} ITEMS? This cannot be undone.`)) return;
        startTransition(async () => {
            const ids = Array.from(selectedIds);
            await bulkDeleteProducts(ids);
            setSelectedIds(new Set());
            fetchProducts();
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-ash/10 pb-4">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                    THE WAREHOUSE / <span className="text-ash/30">INVENTORY</span>
                </h1>
                <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-ash/40 uppercase tracking-widest">
                        {products.length} ITEMS
                    </span>
                    <button className="bg-electric text-ink font-syne font-bold uppercase py-2 px-6 text-sm hover:bg-ash transition-colors cursor-pointer">
                        + ADD DRIFT
                    </button>
                </div>
            </div>

            {/* Bulk Actions Toolbar */}
            {selectedIds.size > 0 && (
                <div className="flex items-center gap-4 bg-electric/10 border border-electric/30 p-4 animate-pulse-once">
                    <span className="font-mono text-[10px] text-electric uppercase tracking-widest">
                        {selectedIds.size} SELECTED
                    </span>
                    <div className="h-4 w-px bg-ash/20" />
                    <button
                        onClick={handleBulkMarkSold}
                        disabled={isPending}
                        className="font-mono text-[10px] text-rust uppercase tracking-widest hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        MARK SOLD
                    </button>
                    <button
                        onClick={handleBulkMarkAvailable}
                        disabled={isPending}
                        className="font-mono text-[10px] text-electric uppercase tracking-widest hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        MARK AVAILABLE
                    </button>
                    <div className="h-4 w-px bg-ash/20" />
                    <button
                        onClick={handleBulkDelete}
                        disabled={isPending}
                        className="font-mono text-[10px] text-rust uppercase tracking-widest hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        DELETE ALL
                    </button>
                </div>
            )}

            {error && (
                <div className="bg-rust/20 border border-rust text-rust p-4 font-mono text-xs uppercase">
                    Error loading database: {error}
                </div>
            )}

            {/* Product Table */}
            <div className="border border-ash/10 bg-charcoal/30 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-ash">
                    <thead className="bg-ink/50 border-b border-ash/10 text-[10px] uppercase tracking-widest text-ash/50">
                        <tr>
                            <th className="p-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.size === products.length && products.length > 0}
                                    onChange={selectAll}
                                    className="w-4 h-4 accent-electric cursor-pointer"
                                />
                            </th>
                            <th className="p-4 font-normal">ID</th>
                            <th className="p-4 font-normal">ITEM</th>
                            <th className="p-4 font-normal">PRICE</th>
                            <th className="p-4 font-normal">CAT / SIZE</th>
                            <th className="p-4 font-normal">STATUS</th>
                            <th className="p-4 font-normal text-right">ACTION</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-ash/5">
                        {loading ? (
                            <tr>
                                <td colSpan={7} className="p-12 text-center">
                                    <span className="font-mono text-ash/50 uppercase tracking-widest text-xs animate-pulse">
                                        LOADING INVENTORY...
                                    </span>
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="p-8 text-center text-ash/30 uppercase tracking-widest">
                                    DATABASE EMPTY. INIT UPLOAD.
                                </td>
                            </tr>
                        ) : products.map((product) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                isSelected={selectedIds.has(product.id)}
                                onToggleSelect={toggleSelect}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Inline Edit Hint */}
            <p className="font-mono text-[9px] text-ash/20 uppercase tracking-widest text-right">
                DOUBLE-CLICK ANY CELL TO EDIT INLINE // ENTER TO SAVE // ESC TO CANCEL
            </p>
        </div>
    );
}
