'use client';

import type { OrderStatus } from '@/app/admin/actions';

interface OrderCardProps {
    order: any;
    onStatusChange?: (orderId: number, newStatus: OrderStatus) => void;
}

const STATUS_STYLES: Record<OrderStatus, { bg: string; text: string; border: string }> = {
    paid: { bg: 'bg-electric/10', text: 'text-electric', border: 'border-electric/30' },
    packing: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
    shipped: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    delivered: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
};

export default function OrderCard({ order }: OrderCardProps) {
    const style = STATUS_STYLES[order.status as OrderStatus] || STATUS_STYLES.paid;
    const date = new Date(order.created_at);
    const timeAgo = getTimeAgo(date);

    return (
        <div className="bg-charcoal/50 border border-ash/10 p-4 hover:border-ash/20 transition-all cursor-grab active:cursor-grabbing group">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
                <div>
                    <span className="font-mono text-[10px] text-ash/40 tracking-widest">
                        ORDER #{order.id}
                    </span>
                    <p className="font-syne font-bold text-white text-sm uppercase tracking-tight mt-0.5">
                        {order.user_email || 'UNKNOWN_USER'}
                    </p>
                </div>
                <span className={`px-2 py-0.5 text-[8px] uppercase tracking-widest ${style.bg} ${style.text} border ${style.border}`}>
                    {order.status}
                </span>
            </div>

            {/* Items Preview */}
            {order.items && Array.isArray(order.items) && order.items.length > 0 && (
                <div className="flex gap-2 mb-3">
                    {order.items.slice(0, 3).map((item: any, i: number) => (
                        <div key={i} className="w-8 h-8 bg-ink border border-ash/10 overflow-hidden relative shrink-0">
                            {item.image_url && (
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            )}
                        </div>
                    ))}
                    {order.items.length > 3 && (
                        <div className="w-8 h-8 bg-ink border border-ash/10 flex items-center justify-center">
                            <span className="font-mono text-[8px] text-ash/40">+{order.items.length - 3}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-center border-t border-ash/5 pt-2 mt-2">
                <span className="font-mono text-[10px] text-ash/30">{timeAgo}</span>
                <span className="font-syne font-bold text-electric text-sm">
                    ₹{(order.total || 0).toLocaleString('en-IN')}
                </span>
            </div>

            {/* Tracking */}
            {order.tracking_number && (
                <div className="mt-2 pt-2 border-t border-ash/5">
                    <span className="font-mono text-[9px] text-ash/30 uppercase tracking-widest">
                        TRACK: {order.tracking_number}
                    </span>
                </div>
            )}
        </div>
    );
}

function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
}
