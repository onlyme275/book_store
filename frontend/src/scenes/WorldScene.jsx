import { Canvas } from "@react-three/fiber";
import { Sky, Environment, Text, Stars, Sparkles } from "@react-three/drei";
import { useState, useEffect } from "react";
import Stupa from "../pagests/Stupa";
import House from "../pagests/House";
import Player from "../pagests/Player";
import Tree from "../pagests/Tree";
import Birds from "../pagests/Birds";
import * as THREE from "three";

// High-quality grass ground
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial
        color="#2d5a27"
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
}

// Stone/Sand Path
function Path() {
  return (
    <group>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <mesh key={i} position={[i * 1.5 - 5, 0.02, i * -1.5 + 8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 1.2]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export default function WorldScene({ onEnterHouse }) {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 8, 15], fov: 50 }}
        style={{ background: "#a3eafb" }}
      >
        {/* Atmospheric lighting */}
        <Environment preset="park" />
        <ambientLight intensity={0.6} />
        <directionalLight
          castShadow
          intensity={1.8}
          position={[30, 40, 20]}
          shadow-mapSize={[2048, 2048]}
        />

        {/* Dynamic Sky */}
        <Sky sunPosition={[100, 10, 100]} turbidity={0.1} rayleigh={0.5} />

        {/* Environmental Elements */}
        <Ground />
        <Path />
        <Birds />

        {/* Forest */}
        {[
          [-12, 0, 5], [-18, 0, -8], [15, 0, 2], [22, 0, -12],
          [-5, 0, -18], [12, 0, -22], [0, 0, -25], [25, 0, 10],
          [-28, 0, 0], [30, 0, -20]
        ].map((p, i) => (
          <Tree key={i} position={p} />
        ))}

        {/* Core Landmarks */}
        <Stupa position={[0, 0, -12]} />
        <House position={[12, 0, -10]} />

        {/* Labels */}
        <Text position={[12, 6.5, -10]} fontSize={0.6} color="#1abc9c" anchorX="center" font={undefined}>
          The Palace Vault
        </Text>
        <Text position={[0, 8, -12]} fontSize={0.4} color="#f1c40f" anchorX="center" font={undefined}>
          Spire of Peace
        </Text>

        {/* Controllable player */}
        <Player onEnterHouse={onEnterHouse} />

        {/* Ambient VFX */}
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={50} scale={20} size={2} speed={0.3} color="#fff" />
        <fog attach="fog" args={["#a3eafb", 20, 70]} />
      </Canvas>

      {/* HUD */}
      <div style={{
        position: "fixed", bottom: 40, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.7)", color: "#fff", padding: "12px 30px",
        borderRadius: 40, fontFamily: "sans-serif", fontSize: "0.95rem",
        backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.2)",
        transition: "opacity 0.8s", opacity: hint ? 1 : 0,
        pointerEvents: "none", boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
      }}>
        ✨ Explore the World · Find the Palace &nbsp;|&nbsp; <b>WASD</b> to walk
      </div>
    </div>
  );
}