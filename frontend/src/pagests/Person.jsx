import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Person({ position = [0, 0, 0], moving = false }) {
    const legLRef = useRef();
    const legRRef = useRef();
    const armLRef = useRef();
    const armRRef = useRef();
    const t = useRef(0);

    useFrame((_, delta) => {
        if (moving) {
            t.current += delta * 5;
            const swing = Math.sin(t.current) * 0.5;
            if (legLRef.current) legLRef.current.rotation.x = swing;
            if (legRRef.current) legRRef.current.rotation.x = -swing;
            if (armLRef.current) armLRef.current.rotation.x = -swing * 0.6;
            if (armRRef.current) armRRef.current.rotation.x = swing * 0.6;
        } else {
            // Idle: slight breathing
            t.current += delta;
            if (legLRef.current) legLRef.current.rotation.x = 0;
            if (legRRef.current) legRRef.current.rotation.x = 0;
            if (armLRef.current) armLRef.current.rotation.x = 0;
            if (armRRef.current) armRRef.current.rotation.x = 0;
        }
    });

    const [px, py, pz] = position;

    return (
        <group position={[px, py, pz]}>
            {/* Body */}
            <mesh position={[0, 1.2, 0]}>
                <capsuleGeometry args={[0.3, 0.7, 8, 16]} />
                <meshStandardMaterial color="#3b82f6" roughness={0.5} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 2.1, 0]}>
                <sphereGeometry args={[0.28, 16, 16]} />
                <meshStandardMaterial color="#fde68a" roughness={0.5} />
            </mesh>

            {/* Eyes */}
            <mesh position={[-0.1, 2.15, 0.26]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#1e3a5f" />
            </mesh>
            <mesh position={[0.1, 2.15, 0.26]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial color="#1e3a5f" />
            </mesh>

            {/* Hat */}
            <mesh position={[0, 2.45, 0]}>
                <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
                <meshStandardMaterial color="#1e3a5f" />
            </mesh>
            <mesh position={[0, 2.53, 0]}>
                <cylinderGeometry args={[0.15, 0.17, 0.3, 16]} />
                <meshStandardMaterial color="#1e3a5f" />
            </mesh>

            {/* Left Arm */}
            <group ref={armLRef} position={[-0.42, 1.55, 0]}>
                <mesh position={[0, -0.25, 0]}>
                    <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
            </group>

            {/* Right Arm */}
            <group ref={armRRef} position={[0.42, 1.55, 0]}>
                <mesh position={[0, -0.25, 0]}>
                    <capsuleGeometry args={[0.1, 0.4, 4, 8]} />
                    <meshStandardMaterial color="#3b82f6" />
                </mesh>
            </group>

            {/* Left Leg */}
            <group ref={legLRef} position={[-0.2, 0.6, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
                    <meshStandardMaterial color="#1e3a5f" />
                </mesh>
                {/* Foot */}
                <mesh position={[0, -0.62, 0.08]}>
                    <boxGeometry args={[0.18, 0.1, 0.3]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>

            {/* Right Leg */}
            <group ref={legRRef} position={[0.2, 0.6, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <capsuleGeometry args={[0.12, 0.5, 4, 8]} />
                    <meshStandardMaterial color="#1e3a5f" />
                </mesh>
                {/* Foot */}
                <mesh position={[0, -0.62, 0.08]}>
                    <boxGeometry args={[0.18, 0.1, 0.3]} />
                    <meshStandardMaterial color="#111" />
                </mesh>
            </group>
        </group>
    );
}
