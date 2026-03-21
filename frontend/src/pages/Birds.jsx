import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Bird({ startPos, speed, orbitRadius, color }) {
    const meshRef = useRef();

    useFrame((state) => {
        const t = (state.clock.elapsedTime + startPos[0]) * speed;
        const x = startPos[0] + Math.cos(t) * orbitRadius;
        const y = startPos[1] + Math.sin(t * 1.5) * 3;
        const z = startPos[2] + Math.sin(t) * orbitRadius;

        if (meshRef.current) {
            meshRef.current.position.set(x, y, z);

            const lookAtPos = new THREE.Vector3(
                startPos[0] + Math.cos(t + 0.1) * orbitRadius,
                startPos[1] + Math.sin((t + 0.1) * 1.5) * 3,
                startPos[2] + Math.sin(t + 0.1) * orbitRadius
            );
            meshRef.current.lookAt(lookAtPos);

            const wings = meshRef.current.children;
            if (wings[1] && wings[2]) {
                const flap = Math.sin(t * 14) * 1.4;
                wings[1].rotation.z = flap;
                wings[2].rotation.z = -flap;
            }
        }
    });

    return (
        <group ref={meshRef}>
            {/* Body: slightly larger for visibility */}
            <mesh>
                <coneGeometry args={[0.2, 0.6, 8]} rotation={[Math.PI / 2, 0, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
            </mesh>
            {/* Wings */}
            <mesh position={[-0.25, 0, 0]}>
                <boxGeometry args={[0.5, 0.02, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0.25, 0, 0]}>
                <boxGeometry args={[0.5, 0.02, 0.3]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </group>
    );
}

export default function Birds() {
    const birdData = useMemo(() => [
        { pos: [0, 8, -5], speed: 1.2, radius: 12, color: "#ffffff" },
        { pos: [20, 10, 10], speed: 0.9, radius: 15, color: "#fefefe" },
        { pos: [-25, 12, -15], speed: 0.7, radius: 22, color: "#ffffff" },
        { pos: [15, 7, -25], speed: 1.4, radius: 9, color: "#ffffff" },
        { pos: [-15, 11, 15], speed: 1.1, radius: 14, color: "#f8fafc" },
        { pos: [5, 14, -40], speed: 0.8, radius: 30, color: "#ffffff" },
    ], []);

    return (
        <group>
            {birdData.map((b, i) => (
                <Bird key={i} startPos={b.pos} speed={b.speed} orbitRadius={b.radius} color={b.color} />
            ))}
        </group>
    );
}
