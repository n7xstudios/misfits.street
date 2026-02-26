import React from 'react';

const NoiseOverlay: React.FC = () => (
    <>
        {/* Hidden SVG filter defs for holographic glitch */}
        <svg className="svg-filters" aria-hidden="true">
            <defs>
                <filter id="redChannel">
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                </filter>
                <filter id="greenChannel">
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" />
                </filter>
                <filter id="blueChannel">
                    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" />
                </filter>
            </defs>
        </svg>
        {/* Animated noise grain overlay */}
        <div className="noise-overlay" aria-hidden="true" />
    </>
);

export default NoiseOverlay;
