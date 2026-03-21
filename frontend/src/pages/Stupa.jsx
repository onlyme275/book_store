import React, { useMemo } from "react";
import * as THREE from "three";
import { Float } from "@react-three/drei";

export default function Stupa({ position = [0, 0, 0] }) {
    // Common materials
    const whiteMat = <meshStandardMaterial color="#eeeeee" roughness={0.1} metalness={0.1} />;
    const goldMat = <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />;
    const redMat = <meshStandardMaterial color="#b91c1c" />;

    return (
        <group position={position}>
            {/* ── GROUND PLATFORM ── */}
            <mesh position={[0, 0.25, 0]}>
                <cylinderGeometry args={[4.5, 4.8, 0.5, 32]} />
                <meshStandardMaterial color="#94a3b8" roughness={0.8} />
            </mesh>

            {/* ── LOWER TIERS (Plinth) ── */}
            <mesh position={[0, 0.7, 0]}>
                <cylinderGeometry args={[3.8, 4, 0.4, 32]} />
                {whiteMat}
            </mesh>
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[3.2, 3.4, 0.4, 32]} />
                {whiteMat}
            </mesh>

            {/* ── THE DOME (Anda) ── */}
            <mesh position={[0, 2.8, 0]}>
                <sphereGeometry args={[2.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
                {whiteMat}
            </mesh>

            {/* ── THE SQUARE BOX (Harmika) ── */}
            <mesh position={[0, 4.8, 0]}>
                <boxGeometry args={[1.2, 0.8, 1.2]} />
                {goldMat}
                {/* Decorative eyes of Buddha on 4 sides (simplified) */}
                <pointLight position={[0, 0, 0.7]} color="white" intensity={0.5} distance={1} />
            </mesh>

            {/* ── THE SPIRE (Spire of Wisdom) ── */}
            <group position={[0, 6.2, 0]}>
                {/* 13 rings representing levels of enlightenment */}
                {[...Array(9)].map((_, i) => (
                    <mesh key={i} position={[0, i * 0.22, 0]}>
                        <cylinderGeometry args={[0.5 - i * 0.05, 0.6 - i * 0.05, 0.15, 16]} />
                        {goldMat}
                    </mesh>
                ))}
                {/* Topmost parasol/jewel */}
                <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
                    <mesh position={[0, 2.2, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#fff" emissive="#ffd700" emissiveIntensity={2} />
                    </mesh>
                </Float>
            </group>

            {/* ── PRAYER FLAGS (Visual Flair) ── */}
            <group position={[0, 4.5, 0]}>
                {[0, 1, 2, 3].map((i) => (
                    <mesh key={i} rotation={[0.4, (i * Math.PI) / 2, 0]} position={[0, 0, 0]}>
                        <cylinderGeometry args={[0.01, 0.01, 6, 8]} />
                        <meshStandardMaterial color="#444" />
                        {/* Tiny flag planes along the rope */}
                        {[1, 2, 3].map((f) => (
                            <mesh key={f} position={[0, f * 0.8, 0]} rotation={[0, 0, -0.2]}>
                                <planeGeometry args={[0.3, 0.2]} />
                                <meshStandardMaterial
                                    color={["#3b82f6", "#ef4444", "#eab308"][f % 3]}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        ))}
                    </mesh>
                ))}
            </group>

            {/* ── BASE LIGHTS ── */}
            <pointLight position={[0, 1, 4]} intensity={2} color="#fcd34d" distance={10} />
            <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffd700" distance={8} />
        </group>
    );
}
