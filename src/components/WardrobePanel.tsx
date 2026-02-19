import React from 'react';

export interface WardrobeItem {
    id: string;
    type: 'top' | 'bottom';
    textureUrl: string;
    thumbnail: string;
    label: string;
}

// Mock Data
const WARDROBE_ITEMS: WardrobeItem[] = [
    {
        id: 't1',
        type: 'top',
        label: 'ACID WASH TEE',
        textureUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=150&q=80',
    },
    {
        id: 't2',
        type: 'top',
        label: 'VINTAGE HOODIE',
        textureUrl: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=150&q=80',
    },
    {
        id: 't3',
        type: 'top',
        label: 'UTILITY BOMBER',
        textureUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&q=80',
    },
    {
        id: 't4',
        type: 'top',
        label: 'FLANNEL OVERSHIRT',
        textureUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&q=80',
        thumbnail: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&q=80',
    },
];

interface WardrobePanelProps {
    onSelect: (item: WardrobeItem) => void;
    selectedTopId: string | null;
}

const WardrobePanel: React.FC<WardrobePanelProps> = ({ onSelect, selectedTopId }) => {
    return (
        <div className="h-full w-full md:w-80 bg-ink/80 backdrop-blur-md border-l border-ash/10 flex flex-col p-6 overflow-y-auto">
            <h3 className="font-syne font-bold text-ash text-xl mb-6 uppercase">
                Wardrobe <span className="text-acid">// V1</span>
            </h3>

            <div className="space-y-8">
                {/* Channel: TOPS */}
                <div>
                    <p className="font-mono text-[10px] text-silver/40 tracking-widest uppercase mb-4">
                        [01] TOPS & JACKETS
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {WARDROBE_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelect(item)}
                                className={`group relative aspect-square border transition-all duration-300 ${selectedTopId === item.id
                                        ? 'border-acid bg-acid/5'
                                        : 'border-ash/20 hover:border-ash/50'
                                    }`}
                            >
                                <img
                                    src={item.thumbnail}
                                    alt={item.label}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                <div className={`absolute inset-0 flex items-center justify-center bg-black/60 transition-opacity ${selectedTopId === item.id ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                                    }`}>
                                    <span className="font-mono text-[9px] text-acid uppercase tracking-widest">
                                        EQUIP
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 w-full bg-black/80 p-1">
                                    <p className="font-mono text-[8px] text-silver text-center truncate">
                                        {item.label}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Placeholder for BOTTOMS */}
                <div>
                    <p className="font-mono text-[10px] text-silver/40 tracking-widest uppercase mb-4">
                        [02] BOTTOMS (LOCKED)
                    </p>
                    <div className="h-24 border border-ash/10 border-dashed flex items-center justify-center">
                        <span className="font-mono text-[9px] text-ash/30 uppercase">
                            Coming Soon
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-auto pt-8">
                <p className="font-mono text-[9px] text-silver/30 leading-relaxed text-justify">
                    // DRAG-AND-DROP SYSTEM OFFLINE. <br />
                    // CLICK TO EQUIP TEXTURES. <br />
                    // RENDER ENGINE: R3F-GEO-V1.
                </p>
            </div>
        </div>
    );
};

export default WardrobePanel;
