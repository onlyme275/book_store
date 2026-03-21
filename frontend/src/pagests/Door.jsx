import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Door({ position = [0, 0, 0] }) {
    const glowRef = useRef();
    const portalRef = useRef();
    const t = useRef(0);

    useFrame((_, delta) => {
        t.current += delta;
        // Pulse glow intensity
        if (glowRef.current) {
            glowRef.current.intensity = 1.5 + Math.sin(t.current * 2) * 0.8;
        }
        // Animate portal colour
        if (portalRef.current) {
            const hue = (t.current * 0.05) % 1;
            portalRef.current.color.setHSL(hue, 0.9, 0.5);
        }
    });

    const [x, y, z] = position;

    return (
        <group position={[x, y, z]}>
            {/* Door Frame */}
            {/* Left pillar */}
            <mesh position={[-1.2, 2, 0]}>
                <boxGeometry args={[0.3, 4, 0.3]} />
                <meshStandardMaterial color="#c8a96e" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Right pillar */}
            <mesh position={[1.2, 2, 0]}>
                <boxGeometry args={[0.3, 4, 0.3]} />
                <meshStandardMaterial color="#c8a96e" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Top bar */}
            <mesh position={[0, 4.1, 0]}>
                <boxGeometry args={[2.7, 0.3, 0.3]} />
                <meshStandardMaterial color="#c8a96e" metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Arch detail */}
            <mesh position={[0, 4.4, 0]}>
                <torusGeometry args={[1.1, 0.15, 12, 24, Math.PI]} />
                <meshStandardMaterial color="#e2c07a" metalness={0.7} roughness={0.2} />
            </mesh>

            {/* Portal inner glow */}
            <mesh position={[0, 2, 0.01]}>
                <planeGeometry args={[2, 3.8]} />
                <meshBasicMaterial ref={portalRef} color="#6a00ff" transparent opacity={0.7} side={THREE.DoubleSide} />
            </mesh>

            {/* Particle rings */}
            {[0, 0.6, 1.2].map((offset, i) => (
                <mesh key={i} position={[0, 2, -0.05 - i * 0.1]} rotation={[0, 0, t.current * 0.3 + offset]}>
                    <torusGeometry args={[0.8 - i * 0.1, 0.02, 8, 32]} />
                    <meshBasicMaterial color={["#a855f7", "#818cf8", "#38bdf8"][i]} />
                </mesh>
            ))}

            {/* Point light for glow */}
            <pointLight ref={glowRef} color="#7c3aed" intensity={2} distance={8} decay={2} />
        </group>
    );
}
