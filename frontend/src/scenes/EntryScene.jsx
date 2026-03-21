import { Canvas } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import { useEffect, useState } from "react";
import Door from "../pagests/Door";

export default function EntryScene({ onEnter }) {
  const [pulse, setPulse] = useState(false);

  const handleEnter = () => {
    if (pulse) return; // prevent double-fire
    setPulse(true);
    setTimeout(() => onEnter && onEnter(), 800);
  };

  // Listen for ENTER or SPACE key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pulse]); // depend on pulse to avoid stale closure

  return (
    <div
      style={{ width: "100vw", height: "100vh", background: "#000008", position: "relative" }}
      onClick={handleEnter} // clicking anywhere also works
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 60 }}
        // Prevent canvas from stealing keyboard focus
        onCreated={({ gl }) => gl.domElement.setAttribute("tabIndex", "-1")}
      >
        {/* Lighting */}
        <ambientLight intensity={0.05} />
        <directionalLight color="#4f46e5" intensity={0.4} position={[5, 10, 5]} />

        {/* Stars */}
        <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Glowing portal door */}
        <Door position={[0, 0, 0]} />

        {/* Floating 3D text */}
        <Text
          position={[0, -1.5, 0.5]}
          fontSize={0.32}
          color="#a78bfa"
          anchorX="center"
          anchorY="middle"
        >
          Press ENTER or Click to Enter
        </Text>

        {/* Ground mist */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshBasicMaterial color="#0a0a1a" transparent opacity={0.85} />
        </mesh>
      </Canvas>

      {/* ── HTML overlay (sits on top of canvas) ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-end",
          paddingBottom: "8%", pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {/* Pulsing title */}
        <h1 style={{
          color: "#fff", fontFamily: "'Cinzel Decorative', cursive, serif",
          fontSize: "clamp(1.4rem, 4vw, 2.4rem)", fontWeight: 700,
          letterSpacing: "0.25em", textShadow: "0 0 30px #7c3aed",
          margin: "0 0 24px",
          animation: "glow 2.5s ease-in-out infinite",
        }}>
          THE BOOKSTORE
        </h1>

        {/* Clickable Enter button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleEnter(); }}
          style={{
            pointerEvents: "all",
            background: "rgba(124,58,237,0.25)",
            border: "2px solid #7c3aed",
            color: "#c4b5fd",
            fontFamily: "sans-serif",
            fontSize: "1rem",
            letterSpacing: "0.2em",
            padding: "14px 44px",
            borderRadius: 50,
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 24px #7c3aed66",
            transition: "all 0.2s",
            animation: "fadeUp 1s ease-out both",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(124,58,237,0.5)";
            e.target.style.boxShadow = "0 0 40px #7c3aed";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(124,58,237,0.25)";
            e.target.style.boxShadow = "0 0 24px #7c3aed66";
          }}
        >
          ▶ ENTER
        </button>

        <p style={{
          marginTop: 16, color: "#6d28d9",
          fontSize: "0.8rem", letterSpacing: "0.15em",
          animation: "pulse 2s ease-in-out infinite",
        }}>
          or press ENTER / SPACE
        </p>
      </div>

      {/* Flash transition overlay */}
      {pulse && (
        <div style={{
          position: "fixed", inset: 0,
          background: "radial-gradient(circle at center, #7c3aed, #000)",
          zIndex: 999,
          animation: "flashIn 0.8s ease-in-out forwards",
          pointerEvents: "none",
        }} />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
        @keyframes glow {
          0%,100% { text-shadow: 0 0 20px #7c3aed; }
          50% { text-shadow: 0 0 50px #a855f7, 0 0 80px #7c3aed; }
        }
        @keyframes pulse { 0%,100%{opacity:0.3} 50%{opacity:0.8} }
        @keyframes fadeUp {
          from { opacity:0; transform: translateY(20px); }
          to { opacity:1; transform: translateY(0); }
        }
        @keyframes flashIn {
          0% { opacity:0; }
          40% { opacity:1; }
          100% { opacity:0; }
        }
      `}</style>
    </div>
  );
}
