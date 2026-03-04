'use client';

import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { getDashboardStats } from './actions';

export default function AdminOverviewPage() {
    const [stats, setStats] = useState({ totalRevenue: 0, pendingOrders: 0, activeInventory: 0 });
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats({
                totalRevenue: data.totalRevenue,
                pendingOrders: data.pendingOrders,
                activeInventory: data.activeInventory,
            });

            // Build chart data from orders (group by day)
            if (data.orders && data.orders.length > 0) {
                const dayMap = new Map<string, number>();
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                data.orders.forEach((o: any) => {
                    const day = days[new Date(o.created_at).getDay()];
                    dayMap.set(day, (dayMap.get(day) || 0) + (o.total || 0));
                });
                const chart = days.map(day => ({ name: day, revenue: dayMap.get(day) || 0 }));
                setChartData(chart);
            } else {
                // Fallback placeholder data
                setChartData([
                    { name: 'Mon', revenue: 0 },
                    { name: 'Tue', revenue: 0 },
                    { name: 'Wed', revenue: 0 },
                    { name: 'Thu', revenue: 0 },
                    { name: 'Fri', revenue: 0 },
                    { name: 'Sat', revenue: 0 },
                    { name: 'Sun', revenue: 0 },
                ]);
            }
        } catch {
            // Fallback to zeros if Supabase isn't connected
            setChartData([
                { name: 'Mon', revenue: 0 },
                { name: 'Tue', revenue: 0 },
                { name: 'Wed', revenue: 0 },
                { name: 'Thu', revenue: 0 },
                { name: 'Fri', revenue: 0 },
                { name: 'Sat', revenue: 0 },
                { name: 'Sun', revenue: 0 },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                DASHBOARD / <span className="text-ash/30">OVERVIEW</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Total Revenue</h3>
                    <p className="font-syne text-4xl font-bold text-electric">
                        {loading ? (
                            <span className="animate-pulse text-ash/30">...</span>
                        ) : (
                            `₹${stats.totalRevenue.toLocaleString('en-IN')}`
                        )}
                    </p>
                </div>
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Orders Pending</h3>
                    <p className="font-syne text-4xl font-bold text-rust">
                        {loading ? <span className="animate-pulse text-ash/30">...</span> : stats.pendingOrders}
                    </p>
                </div>
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Active Inventory</h3>
                    <p className="font-syne text-4xl font-bold text-white">
                        {loading ? <span className="animate-pulse text-ash/30">...</span> : stats.activeInventory}
                    </p>
                </div>
            </div>

            <div className="border border-ash/10 bg-charcoal/30 p-6 mt-8 h-[400px]">
                <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-6 border-b border-ash/10 pb-2">
                    REVENUE TRAJECTORY (7 DAYS)
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="#555"
                            tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#555"
                            tick={{ fill: '#888', fontSize: 10, fontFamily: 'monospace' }}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `₹${value}`}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                            itemStyle={{ color: '#39FF14' }}
                            labelStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#888', textTransform: 'uppercase' as const }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#39FF14" strokeWidth={2} dot={{ r: 4, fill: '#111', stroke: '#39FF14' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
