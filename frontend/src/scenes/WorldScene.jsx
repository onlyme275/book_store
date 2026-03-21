import { Canvas } from "@react-three/fiber";
import { Sky, Environment, Text } from "@react-three/drei";
import { useState, useEffect } from "react";
import Stupa from "../pagests/Stupa";
import House from "../pagests/House";
import Player from "../pagests/Player";

// Grass ground
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60, 32, 32]} />
      <meshStandardMaterial color="#3d7a40" roughness={0.9} metalness={0} />
    </mesh>
  );
}

// Path from spawn to house
function Path() {
  return (
    <group>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <mesh key={i} position={[i * 1.1 - 0.5, 0.01, i * -1.1 + 5]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.9, 0.9]} />
          <meshStandardMaterial color="#b5a280" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Some trees for atmosphere
function Tree({ position }) {
  return (
    <group position={position}>
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2.4, 8]} />
        <meshStandardMaterial color="#5c3317" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.2, 2.5, 8]} />
        <meshStandardMaterial color="#166534" roughness={0.8} />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <coneGeometry args={[0.9, 2, 8]} />
        <meshStandardMaterial color="#15803d" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function WorldScene({ onEnterHouse }) {
  const [hint, setHint] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // House is at [8, 0, -8], Stupa at [0, 0, -10]
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 8, 14], fov: 60 }}
        style={{ background: "#87ceeb" }}
      >
        {/* Daytime lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          intensity={1.5}
          position={[20, 30, 10]}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={60}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />

        {/* Sky */}
        <Sky sunPosition={[100, 20, 100]} turbidity={8} rayleigh={2} />

        {/* Ground and path */}
        <Ground />
        <Path />

        {/* Trees scattered around */}
        {[[-8, 0, 2], [-12, 0, -3], [10, 0, 4], [14, 0, -5], [-5, 0, -15], [12, 0, -15], [0, 0, -18]].map((p, i) => (
          <Tree key={i} position={p} />
        ))}

        {/* Stupa: centre-far */}
        <Stupa position={[0, 0, -10]} />

        {/* House: to the right of stupa */}
        <House position={[8, 0, -8]} />

        {/* Label above house */}
        <Text position={[8, 6, -8]} fontSize={0.5} color="#22c55e" anchorX="center">
          Walk inside →
        </Text>

        {/* Controllable player */}
        <Player onEnterHouse={onEnterHouse} />

        {/* Axis marker lights */}
        <pointLight color="#3b82f6" intensity={0.4} distance={15} position={[0, 5, -10]} />
        <pointLight color="#f59e0b" intensity={0.5} distance={10} position={[8, 4, -8]} />
      </Canvas>

      {/* HUD */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        background: "rgba(0,0,0,0.55)", color: "#fff", padding: "10px 24px",
        borderRadius: 30, fontFamily: "sans-serif", fontSize: "0.9rem",
        backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)",
        transition: "opacity 0.5s", opacity: hint ? 1 : 0,
        pointerEvents: "none",
      }}>
        🎮 Use <b>WASD</b> or <b>Arrow Keys</b> to move &nbsp;|&nbsp; Walk into the house 🏠
      </div>

      {/* Mini-compass */}
      <div style={{
        position: "fixed", top: 20, right: 20,
        background: "rgba(0,0,0,0.5)", color: "#fff",
        padding: "8px 14px", borderRadius: 12,
        fontFamily: "monospace", fontSize: "0.8rem",
        backdropFilter: "blur(6px)",
      }}>
        🧭 Find the house near the stupa
      </div>
    </div>
  );
}