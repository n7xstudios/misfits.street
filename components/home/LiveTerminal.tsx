'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const FAKE_ITEMS = [
    'WASHED DENIM V2',
    'ACID GRAPHIC TEE',
    'ARCHIVE ZIP HOODIE',
    'BEATERS (SIZE 10)',
    'HEAVYWEIGHT CARGOS',
    'VINTAGE RACING JACKET',
    'DISTRESSED KNIT SWEATER'
];

interface LogEntry {
    id: number;
    text: string;
    type: 'log' | 'success' | 'alert';
}

export default function LiveTerminal() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    let logCount = useRef(0);

    const addLog = (text: string, type: 'log' | 'success' | 'alert' = 'log') => {
        logCount.current += 1;
        setLogs(prev => [...prev.slice(-3), { id: logCount.current, text, type }]);
    };

    useEffect(() => {
        // Initial boot sequence
        setTimeout(() => addLog('SYS.INIT // WEBSOCKET CONNECTED', 'log'), 500);
        setTimeout(() => addLog('AWAITING ARCHIVE TRANSACTIONS...', 'log'), 1500);

        // Randomly generate sales to create FOMO
        const interval = setInterval(() => {
            if (Math.random() > 0.4) {
                const item = FAKE_ITEMS[Math.floor(Math.random() * FAKE_ITEMS.length)];
                const userHex = Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0');

                addLog(`USER_[${userHex}] COPPED: ${item}`, 'alert');

                setTimeout(() => {
                    addLog('STATUS: ITEM REMOVED FROM BIN.', 'success');
                }, 800);
            }
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    // Animate new logs in
    useEffect(() => {
        if (!containerRef.current || logs.length === 0) return;

        const lastLog = containerRef.current.lastElementChild;
        if (lastLog) {
            gsap.fromTo(lastLog,
                { opacity: 0, x: -10, filter: 'blur(2px)' },
                { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' }
            );
        }
    }, [logs]);

    return (
        <div className="fixed bottom-6 right-6 z-50 w-72 md:w-80 bg-ink/90 border border-ash/10 backdrop-blur-md p-4 hidden sm:flex flex-col gap-2 pointer-events-none shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-1 border-b border-ash/20 pb-2">
                <span className="font-mono text-[9px] text-electric uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse blur-[1px]"></span>
                    LIVE FEED
                </span>
                <span className="font-mono text-[8px] text-ash/30 tracking-[0.2em]">v.1.04</span>
            </div>

            <div ref={containerRef} className="flex flex-col gap-1.5 h-20 justify-end overflow-hidden">
                {logs.map((log) => (
                    <div key={log.id} className="font-mono text-[10px] leading-tight flex items-start">
                        <span className="text-ash/40 mr-2 mt-0.5">{'>'}</span>
                        <span className={`
                            ${log.type === 'log' ? 'text-ash/60' : ''}
                            ${log.type === 'success' ? 'text-electric' : ''}
                            ${log.type === 'alert' ? 'text-white font-bold' : ''}
                        `}>
                            {log.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
