import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

export default function House({ position = [0, 0, 0] }) {
    const lightRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (lightRef.current) {
            lightRef.current.intensity = 1.2 + Math.sin(t * 2) * 0.4;
        }
    });

    return (
        <group position={position}>
            {/* ── GROUND SLAB ── */}
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[6, 0.2, 6]} />
                <meshStandardMaterial color="#334155" />
            </mesh>

            {/* ── MAIN PALACE BODY ── */}
            <mesh position={[0, 2, 0]} castShadow>
                <boxGeometry args={[5, 4, 5]} />
                <meshStandardMaterial color="#f1f5f9" roughness={0.2} metalness={0.1} />
            </mesh>

            {/* ── ORNATE ROOF (Pagoda/Palace Style) ── */}
            <group position={[0, 4, 0]}>
                {/* Lower Roof Layer */}
                <mesh position={[0, 0.5, 0]}>
                    <boxGeometry args={[6.5, 0.4, 6.5]} />
                    <meshStandardMaterial color="#1e293b" />
                </mesh>
                {/* Mid Roof Layer (Tapered) */}
                <mesh position={[0, 1.2, 0]}>
                    <cylinderGeometry args={[1.5, 3.5, 1.5, 4]} rotation={[0, Math.PI / 4, 0]} />
                    <meshStandardMaterial color="#0f172a" />
                </mesh>
                {/* Top Gold Cap */}
                <mesh position={[0, 2, 0]}>
                    <coneGeometry args={[0.5, 1.2, 4]} rotation={[0, Math.PI / 4, 0]} />
                    <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
                </mesh>
            </group>

            {/* ── ENTRANCE COLUMNS ── */}
            {[-1.8, 1.8].map((xOffset) => (
                <group key={xOffset} position={[xOffset, 1.8, 2.6]}>
                    <mesh>
                        <cylinderGeometry args={[0.15, 0.2, 3.6, 16]} />
                        <meshStandardMaterial color="#cbd5e1" metalness={0.5} />
                    </mesh>
                    {/* Gold Base/Head */}
                    <mesh position={[0, 1.8, 0]}>
                        <boxGeometry args={[0.5, 0.1, 0.5]} />
                        <meshStandardMaterial color="#ffd700" />
                    </mesh>
                    <mesh position={[0, -1.8, 0]}>
                        <boxGeometry args={[0.5, 0.1, 0.5]} />
                        <meshStandardMaterial color="#ffd700" />
                    </mesh>
                </group>
            ))}

            {/* ── THE GRAND DOOR ── */}
            <mesh position={[0, 1.2, 2.52]}>
                <boxGeometry args={[1.2, 2.4, 0.1]} />
                <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
                {/* Door glowing symbol */}
                <rectAreaLight position={[0, 0, 0.1]} width={0.5} height={1} intensity={5} color="#1abc9c" />
            </mesh>

            {/* ── WINDOWS ── */}
            {[[-1.4, 2.5, 2.52], [1.4, 2.5, 2.52]].map((pos, i) => (
                <mesh key={i} position={pos}>
                    <boxGeometry args={[0.8, 1, 0.05]} />
                    <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={0.5} />
                </mesh>
            ))}

            {/* ── ENVIRONMENTAL FX ── */}
            <Sparkles count={40} scale={8} size={2} speed={0.3} color="#fcd34d" />
            <pointLight
                ref={lightRef}
                position={[0, 1.5, 3.5]}
                color="#1abc9c"
                intensity={2}
                distance={6}
            />

            {/* Label light */}
            <pointLight position={[0, 6, 2]} color="#ffd700" intensity={1} distance={5} />
        </group>
    );
}
