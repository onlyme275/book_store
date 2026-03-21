export default function Stupa({ position = [0, 0, 0] }) {
    const [x, y, z] = position;
    return (
        <group position={[x, y, z]}>
            {/* Base platform */}
            <mesh position={[0, 0.2, 0]}>
                <boxGeometry args={[5, 0.4, 5]} />
                <meshStandardMaterial color="#e8dcc8" roughness={0.8} />
            </mesh>

            {/* Second platform */}
            <mesh position={[0, 0.7, 0]}>
                <boxGeometry args={[4, 0.6, 4]} />
                <meshStandardMaterial color="#d4c5a0" roughness={0.7} />
            </mesh>

            {/* Third platform */}
            <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[3, 0.5, 3]} />
                <meshStandardMaterial color="#c8b88a" roughness={0.7} />
            </mesh>

            {/* Main dome (stupa body) */}
            <mesh position={[0, 2.5, 0]}>
                <sphereGeometry args={[1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
                <meshStandardMaterial color="#f5f0e0" roughness={0.5} metalness={0.1} />
            </mesh>

            {/* Harmika (boxy platform on dome) */}
            <mesh position={[0, 3.8, 0]}>
                <boxGeometry args={[0.7, 0.5, 0.7]} />
                <meshStandardMaterial color="#c8a44a" metalness={0.5} roughness={0.4} />
            </mesh>

            {/* Spire tiers */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <mesh key={i} position={[0, 4.3 + i * 0.3, 0]}>
                    <cylinderGeometry args={[0.25 - i * 0.03, 0.28 - i * 0.03, 0.28, 12]} />
                    <meshStandardMaterial color="#d4a017" metalness={0.6} roughness={0.3} />
                </mesh>
            ))}

            {/* Pinnacle/Chattra */}
            <mesh position={[0, 6.6, 0]}>
                <coneGeometry args={[0.12, 0.5, 12]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.8} roughness={0.1} />
            </mesh>

            {/* Eyes on dome (Buddha eyes - decorative squares) */}
            {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                <mesh key={i} position={[Math.sin(angle) * 1.4, 3.0, Math.cos(angle) * 1.4]} rotation={[0, angle, 0]}>
                    <planeGeometry args={[0.4, 0.25]} />
                    <meshStandardMaterial color="#c8a44a" metalness={0.4} roughness={0.4} />
                </mesh>
            ))}

            {/* Flag strings (decorative) */}
            {[-0.8, 0, 0.8].map((dx, i) => (
                <mesh key={i} position={[dx, 4.5, 0]} rotation={[0, 0, Math.PI / 12]}>
                    <boxGeometry args={[0.05, 1.2, 0.01]} />
                    <meshStandardMaterial color={["#ef4444", "#3b82f6", "#22c55e"][i]} />
                </mesh>
            ))}
        </group>
    );
}
