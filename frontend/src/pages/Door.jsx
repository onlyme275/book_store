import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Sparkles } from "@react-three/drei";

export default function Door({ position = [0, 0, 0], scale = 1, isOpen = false }) {
  const leftWing = useRef();
  const rightWing = useRef();
  const portalRef = useRef();
  const openAngle = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Smooth door animation
    openAngle.current = THREE.MathUtils.lerp(
      openAngle.current,
      isOpen ? 2.0 : 0,
      delta * (isOpen ? 1.2 : 0.8)
    );

    if (leftWing.current) leftWing.current.rotation.y = -openAngle.current;
    if (rightWing.current) rightWing.current.rotation.y = openAngle.current;

    if (portalRef.current) {
      // Pulse the portal glow
      portalRef.current.material.emissiveIntensity = 2 + Math.sin(t * 5) * 1;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* ── STUNNING ARCHWAY ── */}
      {/* Pillars: Visible marble texture color */}
      <mesh position={[-2.4, 2.5, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 5, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.5} emissive="#111" />
      </mesh>
      <mesh position={[2.4, 2.5, 0]}>
        <cylinderGeometry args={[0.45, 0.55, 5, 16]} />
        <meshStandardMaterial color="#64748b" roughness={0.3} metalness={0.5} emissive="#111" />
      </mesh>

      {/* High-End Golden Arch Top */}
      <mesh position={[0, 5, 0]}>
        <torusGeometry args={[2.4, 0.3, 16, 100, Math.PI]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} emissive="#92400e" emissiveIntensity={0.5} />
      </mesh>

      {/* ── THE DOORS (Wings) ── */}
      <group position={[-2.3, 2.5, 0]} ref={leftWing}>
        <mesh position={[1.15, 0, 0]}>
          <boxGeometry args={[2.3, 5, 0.2]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
          {/* Internal Glow light for when door opens */}
          <pointLight position={[0.5, 0, 0.3]} color="#8b5cf6" intensity={isOpen ? 8 : 1} distance={5} />
        </mesh>
      </group>

      <group position={[2.3, 2.5, 0]} ref={rightWing}>
        <mesh position={[-1.15, 0, 0]}>
          <boxGeometry args={[2.3, 5, 0.2]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
          <pointLight position={[-0.5, 0, 0.3]} color="#8b5cf6" intensity={isOpen ? 8 : 1} distance={5} />
        </mesh>
      </group>

      {/* ── CENTRAL PORTAL CORE ── */}
      <mesh position={[0, 2.5, -0.6]} ref={portalRef}>
        <ringGeometry args={[0, 2.4, 64]} />
        <meshStandardMaterial
          color="#2e1065"
          emissive="#7c3aed"
          emissiveIntensity={3}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Ultra Powerful Backlight for clarity */}
      <spotLight
        position={[0, 5, -12]}
        intensity={isOpen ? 120 : 0}
        distance={50}
        angle={0.6}
        penumbra={1}
        color="#c4b5fd"
        target-position={[0, 2.5, 12]}
      />

      {/* Floor Glow */}
      <mesh position={[0, -0.01, 1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 8]} />
        <meshStandardMaterial color="#000" metalness={0.8} roughness={0.1} transparent opacity={0.4} />
      </mesh>

      <Sparkles count={150} scale={10} size={3} speed={0.6} color="#c4b5fd" />

      {/* Frontal light closer to the gate for clarity */}
      <pointLight position={[0, 3, 5]} color="#fff" intensity={4} distance={15} />
    </group>
  );
}
