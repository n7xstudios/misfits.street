'use client';

import { Droppable, Draggable } from '@hello-pangea/dnd';
import OrderCard from './OrderCard';
import type { OrderStatus } from '@/app/admin/actions';

interface KanbanColumnProps {
    status: OrderStatus;
    title: string;
    orders: any[];
    colorClass: string;
}

const COLUMN_ICONS: Record<OrderStatus, string> = {
    paid: '₹',
    packing: '◫',
    shipped: '→',
    delivered: '✓',
};

export default function KanbanColumn({ status, title, orders, colorClass }: KanbanColumnProps) {
    return (
        <div className="flex flex-col min-w-[280px] md:min-w-0 bg-ink/50 border border-ash/10">
            {/* Column Header */}
            <div className={`p-4 border-b border-ash/10 flex justify-between items-center ${colorClass}`}>
                <div className="flex items-center gap-2">
                    <span className="font-mono text-lg opacity-60">{COLUMN_ICONS[status]}</span>
                    <h3 className="font-syne font-bold text-sm uppercase tracking-tight text-white">
                        {title}
                    </h3>
                </div>
                <span className="font-mono text-[10px] text-ash/40 bg-ink/50 px-2 py-0.5 border border-ash/10">
                    {orders.length}
                </span>
            </div>

            {/* Droppable Area */}
            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex-1 p-3 space-y-3 min-h-[200px] transition-colors ${snapshot.isDraggingOver ? 'bg-electric/5' : ''}`}
                    >
                        {orders.length === 0 && !snapshot.isDraggingOver && (
                            <div className="flex items-center justify-center h-full min-h-[150px]">
                                <span className="font-mono text-[10px] text-ash/15 uppercase tracking-widest">
                                    EMPTY
                                </span>
                            </div>
                        )}

                        {orders.map((order, index) => (
                            <Draggable
                                key={String(order.id)}
                                draggableId={String(order.id)}
                                index={index}
                            >
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className={`transition-shadow ${snapshot.isDragging ? 'shadow-[0_0_30px_rgba(57,255,20,0.2)] rotate-1' : ''}`}
                                    >
                                        <OrderCard order={order} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}
