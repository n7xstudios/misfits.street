'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 2000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 2390 },
    { name: 'Sun', revenue: 3490 },
];

export default function AdminOverviewPage() {
    return (
        <div className="space-y-8">
            <h1 className="font-syne font-extrabold text-3xl uppercase tracking-tighter text-white">
                DASHBOARD / <span className="text-ash/30">OVERVIEW</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Total Revenue</h3>
                    <p className="font-syne text-4xl font-bold text-electric">₹124,500</p>
                </div>
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Orders Pending</h3>
                    <p className="font-syne text-4xl font-bold text-rust">14</p>
                </div>
                <div className="border border-ash/10 bg-charcoal/30 p-6">
                    <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-2">Active Inventory</h3>
                    <p className="font-syne text-4xl font-bold text-white">42</p>
                </div>
            </div>

            <div className="border border-ash/10 bg-charcoal/30 p-6 mt-8 h-[400px]">
                <h3 className="font-mono text-[10px] text-ash/50 uppercase tracking-[0.3em] mb-6 border-b border-ash/10 pb-2">
                    REVENUE TRAJECTORY (7 DAYS)
                </h3>
                <ResponsiveContainer width="100%" height="85%">
                    <LineChart data={data}>
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
                            labelStyle={{ fontFamily: 'monospace', fontSize: '10px', color: '#888', textTransform: 'uppercase' }}
                        />
                        <Line type="monotone" dataKey="revenue" stroke="#39FF14" strokeWidth={2} dot={{ r: 4, fill: '#111', stroke: '#39FF14' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
