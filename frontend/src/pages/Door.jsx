import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, MeshDistortMaterial, Sparkles, Stars, Trail } from "@react-three/drei";

export default function Door({ position = [0, 0, 0], scale = 1, isOpen = false }) {
  const leftWing = useRef();
  const rightWing = useRef();
  const portalRef = useRef();
  const energyRef = useRef();

  const openAngle = useRef(0);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // Smooth door animation
    openAngle.current = THREE.MathUtils.lerp(
      openAngle.current,
      isOpen ? 1.9 : 0,
      delta * (isOpen ? 1.5 : 0.8)
    );

    if (leftWing.current) leftWing.current.rotation.y = -openAngle.current;
    if (rightWing.current) rightWing.current.rotation.y = openAngle.current;

    // Pulse effects
    if (portalRef.current) {
      portalRef.current.scale.setScalar(1 + Math.sin(t * 4) * 0.05);
      portalRef.current.material.distort = 0.3 + Math.sin(t * 2) * 0.15;
    }
    if (energyRef.current) {
      energyRef.current.rotation.z = t * 0.2;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* ── STUNNING ARCHWAY ── */}
      {/* Left Column (Rounded) */}
      <mesh position={[-2.4, 2.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Right Column (Rounded) */}
      <mesh position={[2.4, 2.5, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 5, 16]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Ornate Top Arch */}
      <mesh position={[0, 5.1, 0]}>
        <torusGeometry args={[2.4, 0.25, 12, 100, Math.PI]} />
        <meshStandardMaterial color="#ffd700" metalness={1} roughness={0} />
      </mesh>

      {/* ── MAGICAL EFFECTS ── */}
      <Sparkles count={80} scale={6} size={2} speed={0.4} color="#a78bfa" />

      {/* ── THE DOORS ── */}
      <group position={[-2.0, 2.5, 0]} ref={leftWing}>
        <mesh position={[1.0, 0, 0]}>
          <boxGeometry args={[2.0, 5, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
          {/* Rune lights on door */}
          <pointLight position={[0.5, 1.5, 0.1]} color="#7c3aed" intensity={1} distance={2} />
        </mesh>
      </group>

      <group position={[2.0, 2.5, 0]} ref={rightWing}>
        <mesh position={[-1.0, 0, 0]}>
          <boxGeometry args={[2.0, 5, 0.15]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
          <pointLight position={[-0.5, 1.5, 0.1]} color="#7c3aed" intensity={1} distance={2} />
        </mesh>
      </group>

      {/* ── PORTAL ENERGY ── */}
      <mesh position={[0, 2.5, -0.4]} ref={energyRef}>
        <ringGeometry args={[0, 2.5, 32]} />
        <MeshDistortMaterial
          ref={portalRef}
          color="#312e81"
          speed={4}
          distort={0.5}
          emissive="#7c3aed"
          emissiveIntensity={2}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Floor with reflection glow */}
      <mesh position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
      </mesh>

      <pointLight position={[0, 3, 2]} color="#7c3aed" intensity={3} />
    </group>
  );
}
