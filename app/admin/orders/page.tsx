'use client';

import { useState, useEffect, useTransition } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import KanbanColumn from '@/components/admin/KanbanColumn';
import { getOrders, updateOrderStatus, type OrderStatus } from '@/app/admin/actions';

const COLUMNS: { status: OrderStatus; title: string; colorClass: string }[] = [
    { status: 'paid', title: 'PAID & PENDING', colorClass: 'bg-electric/5' },
    { status: 'packing', title: 'PACKING', colorClass: 'bg-yellow-500/5' },
    { status: 'shipped', title: 'SHIPPED', colorClass: 'bg-blue-500/5' },
    { status: 'delivered', title: 'DELIVERED', colorClass: 'bg-emerald-500/5' },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const getOrdersByStatus = (status: OrderStatus) => {
        return orders.filter(o => o.status === status);
    };

    const handleDragEnd = (result: DropResult) => {
        const { draggableId, destination } = result;
        if (!destination) return;

        const orderId = Number(draggableId);
        const newStatus = destination.droppableId as OrderStatus;

        // Find the order and check if status actually changed
        const order = orders.find(o => o.id === orderId);
        if (!order || order.status === newStatus) return;

        // Optimistic update
        setOrders(prev =>
            prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o)
        );

        // Persist to DB
        startTransition(async () => {
            try {
                await updateOrderStatus(orderId, newStatus);
            } catch {
                fetchOrders(); // Revert on error
            }
        });
    };

    if (loading) {
        return (
            <div className="space-y-8">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                    DISPATCH CENTER / <span className="text-ash/30">ORDERS</span>
                </h1>
                <div className="flex items-center justify-center h-[400px]">
                    <span className="font-mono text-ash/50 uppercase tracking-widest text-xs animate-pulse">
                        LOADING ACQUISITIONS...
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-ash/10 pb-4">
                <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                    DISPATCH CENTER / <span className="text-ash/30">FULFILLMENT</span>
                </h1>
                <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] text-ash/40 uppercase tracking-widest">
                        {orders.length} TOTAL
                    </span>
                    <button
                        onClick={fetchOrders}
                        disabled={isPending}
                        className="font-mono text-[10px] text-electric uppercase tracking-widest hover:text-white transition-colors cursor-pointer disabled:opacity-50"
                    >
                        REFRESH
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-rust/20 border border-rust text-rust p-4 font-mono text-xs uppercase">
                    Error loading orders: {error}
                </div>
            )}

            {/* Kanban Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {COLUMNS.map(col => (
                        <KanbanColumn
                            key={col.status}
                            status={col.status}
                            title={col.title}
                            orders={getOrdersByStatus(col.status)}
                            colorClass={col.colorClass}
                        />
                    ))}
                </div>
            </DragDropContext>

            {/* How it works hint */}
            <p className="font-mono text-[9px] text-ash/20 uppercase tracking-widest text-right">
                DRAG ORDERS BETWEEN COLUMNS TO UPDATE STATUS // CHANGES SAVE AUTOMATICALLY
            </p>
        </div>
    );
}
