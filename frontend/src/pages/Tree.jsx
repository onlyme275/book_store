import React from "react";

export default function Tree({ position }) {
    return (
        <group position={position}>
            {/* Trunk (Textured look with multiple cylinders) */}
            <mesh position={[0, 1.2, 0]} castShadow>
                <cylinderGeometry args={[0.2, 0.35, 2.5, 8]} />
                <meshStandardMaterial color="#3d2b1f" roughness={1} />
            </mesh>

            {/* Foliage (Layered and organic) */}
            <group position={[0, 2.5, 0]}>
                {/* Pyramid layers for a pine/cedar look */}
                <mesh position={[0, 0, 0]} castShadow>
                    <coneGeometry args={[1.8, 2.2, 8]} />
                    <meshStandardMaterial color="#064e3b" roughness={0.8} />
                </mesh>
                <mesh position={[0, 1.2, 0]} castShadow>
                    <coneGeometry args={[1.4, 1.8, 8]} />
                    <meshStandardMaterial color="#065f46" roughness={0.8} />
                </mesh>
                <mesh position={[0, 2.2, 0]} castShadow>
                    <coneGeometry args={[0.9, 1.4, 8]} />
                    <meshStandardMaterial color="#047857" roughness={0.8} />
                </mesh>
            </group>

            {/* Small branches or roots detail */}
            <mesh position={[0.2, 0.3, 0.2]}>
                <boxGeometry args={[0.1, 0.6, 0.1]} />
                <meshStandardMaterial color="#3d2b1f" />
            </mesh>
        </group>
    );
}
