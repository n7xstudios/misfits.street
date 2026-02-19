import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls, Environment, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface FitCheck3DProps {
    textureUrl?: string; // The selected product texture to project
}

// ─── Geometric Mannequin ─────────────────────────────────────────
const Mannequin = ({ type, textureUrl, ...props }: { type: 'male' | 'female'; textureUrl?: string } & JSX.IntrinsicElements['group']) => {
    // Dimensions based on type
    const isMale = type === 'male';
    const color = isMale ? '#2a2a2a' : '#333333';
    const shoulderWidth = isMale ? 1 : 0.8;

    return (
        <group {...props} dispose={null}>
            {/* Head */}
            <mesh position={[0, 1.7, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>

            {/* Torso */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[isMale ? 0.35 : 0.25, isMale ? 0.25 : 0.3, 0.9, 32]} />
                <meshStandardMaterial color={color} roughness={0.5} />
            </mesh>

            {/* Shoulders (Simple Box for structure) */}
            <mesh position={[0, 1.45, 0]}>
                <boxGeometry args={[shoulderWidth, 0.1, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Legs (Simplified) */}
            <mesh position={[-0.2, 0.3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.2, 0.3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Projected Clothing (Billboard) */}
            {textureUrl && (
                <ProjectedClothing textureUrl={textureUrl} />
            )}
        </group>
    );
};

const ProjectedClothing = ({ textureUrl }: { textureUrl: string }) => {
    const texture = useTexture(textureUrl);
    return (
        <mesh position={[0, 1.1, 0.26]} rotation={[0, 0, 0]}>
            <planeGeometry args={[0.5, 0.6]} />
            <meshStandardMaterial
                map={texture}
                transparent
                opacity={0.9}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
};

// ─── Scene Setup ─────────────────────────────────────────────────
const Scene = ({ activeModel, textureUrl }: { activeModel: 'male' | 'female'; textureUrl?: string }) => {
    const groupRef = useRef<THREE.Group>(null);

    // Subtle rotation idle animation
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[0, -1, 0]}>
            <Mannequin type={activeModel} textureUrl={textureUrl} />
            <ContactShadows position={[0, -0.1, 0]} opacity={0.4} scale={10} blur={2} far={1} />
        </group>
    );
};

// ─── Main Component ──────────────────────────────────────────────
const FitCheck3D: React.FC<FitCheck3DProps> = ({ textureUrl }) => {
    const [activeModel, setActiveModel] = useState<'male' | 'female'>('male');

    return (
        <section className="relative w-full h-[80vh] bg-ink overflow-hidden border-t border-ash/10">
            {/* UI Controls */}
            <div className="absolute top-8 left-8 z-10 flex flex-col gap-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveModel('male')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${activeModel === 'male'
                            ? 'bg-acid text-ink border-acid'
                            : 'text-ash border-ash/20 hover:border-acid'
                            }`}
                    >
                        MALE
                    </button>
                    <button
                        onClick={() => setActiveModel('female')}
                        className={`px-4 py-2 font-mono text-xs uppercase tracking-widest border transition-colors ${activeModel === 'female'
                            ? 'bg-acid text-ink border-acid'
                            : 'text-ash border-ash/20 hover:border-acid'
                            }`}
                    >
                        FEMALE
                    </button>
                </div>

                <p className="font-mono text-xs text-silver/50 max-w-[200px]">
                    // PROJECTION MAPPING INITIALIZED <br />
                    // SELECT WARDROBE ITEM TO PREVIEW
                </p>
            </div>

            {/* R3F Canvas */}
            <Canvas shadows className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 1.5, 3]} fov={45} />

                {/* Lighting: Moody & Industrial */}
                <ambientLight intensity={0.5} color="#ffffff" />
                <spotLight
                    position={[5, 5, 5]}
                    angle={0.5}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={1024}
                    color="#c8ff00"
                />
                <spotLight
                    position={[-5, 5, 2]}
                    angle={0.5}
                    penumbra={1}
                    intensity={1}
                    color="#00ffff"
                />

                <Environment preset="city" />

                <Scene activeModel={activeModel} textureUrl={textureUrl} />

                <OrbitControls
                    enableZoom={false}
                    minPolarAngle={Math.PI / 2.5}
                    maxPolarAngle={Math.PI / 1.8}
                />
            </Canvas>

            {/* Overlay Grid */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 invert mix-blend-overlay"></div>
        </section>
    );
};

export default FitCheck3D;
