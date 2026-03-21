import { Canvas } from "@react-three/fiber";
import { Stars, Text, Float, Sparkles, Environment } from "@react-three/drei";
import { useEffect, useState } from "react";
import Door from "../pagests/Door";

export default function EntryScene({ onEnter }) {
  const [openGate, setOpenGate] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleEnter = () => {
    if (pulse) return;
    setOpenGate(true);
    setPulse(true);
    setTimeout(() => onEnter && onEnter(), 1500);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pulse]);

  return (
    <div
      style={{ width: "100vw", height: "100vh", background: "#000008", position: "relative" }}
      onClick={handleEnter}
    >
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
        onCreated={({ gl }) => gl.domElement.setAttribute("tabIndex", "-1")}
      >
        <color attach="background" args={["#000008"]} />
        <Environment preset="night" />
        <ambientLight intensity={0.1} />
        <directionalLight color="#7c3aed" intensity={1} position={[5, 10, 5]} />

        {/* Deep Space Background */}
        <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={1.5} />
        <Sparkles count={150} scale={20} size={2} speed={0.3} color="#a78bfa" />

        {/* The Big Gate */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <Door position={[0, -0.5, 0]} scale={1.4} isOpen={openGate} />
        </Float>

        {/* 3D Prompt Text */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, -2.5, 2]}
            fontSize={0.4}
            color="#c4b5fd"
            anchorX="center"
            anchorY="middle"
            maxWidth={10}
            textAlign="center"
          >
            ENTER THE NEXUS
          </Text>
        </Float>

        {/* Distant planet or moon for depth */}
        <mesh position={[-15, 10, -30]}>
          <sphereGeometry args={[5, 32, 32]} />
          <meshStandardMaterial color="#1e1b4b" emissive="#312e81" emissiveIntensity={0.5} />
        </mesh>
      </Canvas>

      {/* ── BEAUTIFUL HTML OVERLAY ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          pointerEvents: "none", zIndex: 10,
        }}
      >
        {/* Dynamic Title */}
        <div style={{ transform: "translateY(-140px)" }}>
          <h1 style={{
            color: "#fff", fontFamily: "'Cinzel Decorative', cursive, serif",
            fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 700,
            letterSpacing: "0.4em", textShadow: "0 0 50px #7c3aed, 0 0 100px #4c1d95",
            margin: 0, transition: "all 0.5s",
            opacity: openGate ? 0 : 1,
          }}>
            BOOKSTORE
          </h1>
          <p style={{
            color: "#a78bfa", textAlign: "center", letterSpacing: "1em",
            fontSize: "0.7rem", marginTop: 8, opacity: openGate ? 0 : 0.6,
          }}>
            VIRTUAL DOMAIN
          </p>
        </div>

        {/* Interactive Button */}
        {!openGate && (
          <button
            onClick={(e) => { e.stopPropagation(); handleEnter(); }}
            style={{
              pointerEvents: "all",
              transform: "translateY(160px)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "16px 60px",
              borderRadius: 4,
              cursor: "pointer",
              backdropFilter: "blur(20px)",
              fontSize: "1.1rem",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
              boxShadow: "0 0 40px rgba(124,58,237,0.3)",
              transition: "all 0.4s",
              animation: "pulseBtn 2s infinite",
            }}
          >
            BEGIN
          </button>
        )}
      </div>

      {/* Flash transition overlay */}
      {pulse && (
        <div style={{
          position: "fixed", inset: 0,
          background: "#000",
          zIndex: 999,
          animation: "flashOut 1.5s ease-in-out forwards",
          pointerEvents: "none",
        }} />
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&display=swap');
        @keyframes pulseBtn {
          0%, 100% { background: rgba(255,255,255,0.05); box-shadow: 0 0 40px rgba(124,58,237,0.3); }
          50% { background: rgba(124,58,237,0.2); box-shadow: 0 0 70px rgba(124,58,237,0.6); }
        }
        @keyframes flashOut {
          0% { opacity:0; }
          40% { opacity:1; }
          100% { opacity:1; }
        }
      `}</style>
    </div>
  );
}
