import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function House({ position = [0, 0, 0] }) {
    const lightRef = useRef();
    const t = useRef(0);

    useFrame((_, delta) => {
        t.current += delta;
        if (lightRef.current) {
            lightRef.current.intensity = 0.8 + Math.sin(t.current * 1.5) * 0.2;
        }
    });

    const [x, y, z] = position;

    return (
        <group position={[x, y, z]}>
            {/* Main walls */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[4, 3, 4]} />
                <meshStandardMaterial color="#d4a96a" roughness={0.7} />
            </mesh>

            {/* Roof */}
            <mesh position={[0, 3.5, 0]}>
                <coneGeometry args={[3, 2, 4]} />
                <meshStandardMaterial color="#8b3a3a" roughness={0.6} metalness={0.1} />
            </mesh>

            {/* Door */}
            <mesh position={[0, 0.8, 2.01]}>
                <boxGeometry args={[0.9, 1.8, 0.05]} />
                <meshStandardMaterial color="#5c3317" roughness={0.5} />
            </mesh>
            {/* Door arch */}
            <mesh position={[0, 1.75, 2.01]} rotation={[0, 0, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 0.05, 16, 1, false, 0, Math.PI]} />
                <meshStandardMaterial color="#5c3317" roughness={0.5} />
            </mesh>

            {/* Windows - front */}
            <mesh position={[-1.3, 1.6, 2.02]}>
                <boxGeometry args={[0.7, 0.7, 0.05]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} metalness={0.2} />
            </mesh>
            <mesh position={[1.3, 1.6, 2.02]}>
                <boxGeometry args={[0.7, 0.7, 0.05]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} metalness={0.2} />
            </mesh>

            {/* Windows - sides */}
            <mesh position={[2.02, 1.6, 0]}>
                <boxGeometry args={[0.05, 0.7, 0.7]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} metalness={0.2} />
            </mesh>
            <mesh position={[-2.02, 1.6, 0]}>
                <boxGeometry args={[0.05, 0.7, 0.7]} />
                <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} metalness={0.2} />
            </mesh>

            {/* Chimney */}
            <mesh position={[1.3, 4.2, -0.8]}>
                <boxGeometry args={[0.4, 1.2, 0.4]} />
                <meshStandardMaterial color="#996633" roughness={0.8} />
            </mesh>

            {/* Warm interior light */}
            <pointLight ref={lightRef} color="#fbbf24" intensity={0.8} distance={6} decay={2} position={[0, 1.5, 0]} />

            {/* Door glow for proximity cue */}
            <pointLight color="#22c55e" intensity={0.4} distance={3} decay={2} position={[0, 1, 2.5]} />
        </group>
    );
}
