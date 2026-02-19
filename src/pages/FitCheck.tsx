import React, { useState } from 'react';
import Experience from '../components/Experience';
import WardrobePanel, { type WardrobeItem } from '../components/WardrobePanel';

const FitCheck: React.FC = () => {
    const [activeModel, setActiveModel] = useState<'male' | 'female'>('male');
    const [selectedTexture, setSelectedTexture] = useState<string | null>(null);
    const [selectedTopId, setSelectedTopId] = useState<string | null>(null);

    const handleSelect = (item: WardrobeItem) => {
        // Toggle if already selected
        if (selectedTopId === item.id) {
            setSelectedTexture(null);
            setSelectedTopId(null);
        } else {
            setSelectedTexture(item.textureUrl);
            setSelectedTopId(item.id);
        }
    };

    return (
        <section className="relative w-full h-screen bg-ink overflow-hidden flex flex-col md:flex-row">
            {/* Left: 3D Experience (Canvas) */}
            <div className="relative flex-grow h-[60vh] md:h-full order-2 md:order-1">
                {/* Model Toggle UI */}
                <div className="absolute top-6 left-6 z-10 flex gap-2">
                    <button
                        onClick={() => setActiveModel('male')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors bg-black/50 backdrop-blur ${activeModel === 'male'
                            ? 'text-acid border-acid'
                            : 'text-ash border-ash/20 hover:border-acid'
                            }`}
                    >
                        MALE
                    </button>
                    <button
                        onClick={() => setActiveModel('female')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors bg-black/50 backdrop-blur ${activeModel === 'female'
                            ? 'text-acid border-acid'
                            : 'text-ash border-ash/20 hover:border-acid'
                            }`}
                    >
                        FEMALE
                    </button>
                </div>

                <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                    <p className="font-mono text-xs text-silver/50">
                        // FIT CHECK PROTOCOL v2.0 <br />
                        // DRAG INTERFACE: OFFLINE <br />
                        // CLICK INTERFACE: ACTIVE
                    </p>
                </div>

                <Experience activeModel={activeModel} textureUrl={selectedTexture} />

                {/* Overlay Grid */}
                <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 number mix-blend-overlay"></div>
            </div>

            {/* Right: Wardrobe Panel */}
            <div className="w-full md:w-96 h-[40vh] md:h-full bg-ink order-1 md:order-2 z-20 shadow-2xl shadow-black relative">
                <WardrobePanel onSelect={handleSelect} selectedTopId={selectedTopId} />
            </div>
        </section>
    );
};

export default FitCheck;
