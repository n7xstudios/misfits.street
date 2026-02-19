import React, { useState, useCallback } from 'react';

const DarkModeToggle: React.FC = () => {
    const [isInverted, setIsInverted] = useState(false);

    const toggle = useCallback(() => {
        setIsInverted(prev => {
            const next = !prev;
            if (next) {
                document.documentElement.classList.add('invert-mode');
            } else {
                document.documentElement.classList.remove('invert-mode');
            }
            return next;
        });
    }, []);

    return (
        <button
            onClick={toggle}
            className="magnetic-btn font-mono text-[10px] uppercase tracking-widest border border-ash/30 px-3 py-1.5 hover:border-acid hover:text-acid transition-colors duration-200"
            title={isInverted ? 'Lights On' : 'Lights Off'}
            aria-pressed={isInverted}
        >
            {isInverted ? '◉ ON' : '◎ OFF'}
        </button>
    );
};

export default DarkModeToggle;
