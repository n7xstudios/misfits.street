import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, OrbitControls, Environment, PerspectiveCamera, ContactShadows, Decal } from '@react-three/drei';
import * as THREE from 'three';

// ─── Geometric Mannequin with Decal ──────────────────────────────
const Mannequin = ({ type, textureUrl, ...props }: { type: 'male' | 'female'; textureUrl: string | null } & JSX.IntrinsicElements['group']) => {
    const isMale = type === 'male';
    const color = isMale ? '#2a2a2a' : '#333333';
    const shoulderWidth = isMale ? 1 : 0.8;

    // Load texture conditionally
    const decalMap = useTexture(textureUrl || 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&q=80');

    return (
        <group {...props} dispose={null}>
            {/* Head */}
            <mesh position={[0, 1.7, 0]}>
                <sphereGeometry args={[0.15, 32, 32]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Torso (The Canvas for Decal) */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[isMale ? 0.35 : 0.25, isMale ? 0.25 : 0.3, 0.9, 64]} />
                <meshStandardMaterial color={color} roughness={0.4} />

                {/* 
                    Decal Projection 
                    Position: slightly forward in Z, middle of torso Y 
                    Rotation: 0 
                    Scale: Adjust to fit torso
                */}
                {textureUrl && (
                    <Decal
                        position={[0, 0, 0.3]} // Stick to front surface
                        rotation={[0, 0, 0]}
                        scale={[0.6, 0.6, 0.6]}
                        map={decalMap}
                        opacity={0.9}
                    />
                )}
            </mesh>

            {/* Shoulders */}
            <mesh position={[0, 1.45, 0]}>
                <boxGeometry args={[shoulderWidth, 0.1, 0.3]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Arms (Visual balance) */}
            <mesh position={[-shoulderWidth / 2, 1.1, 0]} rotation={[0, 0, 0.1]}>
                <cylinderGeometry args={[0.08, 0.06, 0.7, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            <mesh position={[shoulderWidth / 2, 1.1, 0]} rotation={[0, 0, -0.1]}>
                <cylinderGeometry args={[0.08, 0.06, 0.7, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>

            {/* Legs */}
            <mesh position={[-0.2, 0.3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
            <mesh position={[0.2, 0.3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.8, 16]} />
                <meshStandardMaterial color={color} roughness={0.4} />
            </mesh>
        </group>
    );
};

// ─── Scene Setup ─────────────────────────────────────────────────
const SceneContent = ({ activeModel, textureUrl }: { activeModel: 'male' | 'female'; textureUrl: string | null }) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Smooth idle sway
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
        }
    });

    return (
        <group ref={groupRef} position={[0, -0.8, 0]}>
            <Mannequin type={activeModel} textureUrl={textureUrl} />
            <ContactShadows position={[0, -0.1, 0]} opacity={0.6} scale={10} blur={2.5} far={1.5} color="#000000" />
        </group>
    );
};

interface ExperienceProps {
    activeModel: 'male' | 'female';
    textureUrl: string | null;
}

const Experience: React.FC<ExperienceProps> = ({ activeModel, textureUrl }) => {
    return (
        <Canvas shadows className="w-full h-full bg-[#111]">
            <PerspectiveCamera makeDefault position={[0, 1.5, 3.5]} fov={40} />

            <color attach="background" args={['#0a0a0a']} />
            <fog attach="fog" args={['#0a0a0a', 5, 15]} />

            {/* Lighting Studio */}
            <ambientLight intensity={0.5} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={2}
                color="#ffffff"
                castShadow
            />
            <spotLight
                position={[-5, 5, 5]}
                angle={0.5}
                penumbra={1}
                intensity={1}
                color="#c8ff00"
            />
            <spotLight
                position={[0, 5, -5]}
                intensity={0.5}
                color="#00ffff"
            />

            <Environment preset="city" />

            <Suspense fallback={null}>
                <SceneContent activeModel={activeModel} textureUrl={textureUrl} />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.5}
                maxPolarAngle={Math.PI / 1.8}
                minAzimuthAngle={-Math.PI / 4}
                maxAzimuthAngle={Math.PI / 4}
            />
        </Canvas>
    );
};

export default Experience;
