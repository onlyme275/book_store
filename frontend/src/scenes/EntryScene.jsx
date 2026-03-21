import { Canvas } from "@react-three/fiber";
import { Stars, Text, Float, Sparkles } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import Door from "../pages/Door";

export default function EntryScene({ onEnter }) {
  const [openGate, setOpenGate] = useState(false);
  const [pulse, setPulse] = useState(false);

  const handleEnter = () => {
    if (pulse) return;
    setOpenGate(true);
    setPulse(true);
    // Allow more time for a truly cinematic gate opening sequence
    setTimeout(() => onEnter && onEnter(), 2200);
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
      style={{
        width: "100vw", height: "100vh",
        background: "radial-gradient(circle at center, #0a0a2a 0%, #000 100%)",
        position: "relative"
      }}
      onClick={handleEnter}
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        onCreated={({ gl }) => {
          gl.domElement.setAttribute("tabIndex", "-1");
          gl.toneMappingExposure = 1.2;
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#7c3aed" />
          <pointLight position={[-10, 5, 5]} intensity={1.5} color="#1e1b4b" />

          {/* Background Aura */}
          <Stars radius={120} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={80} scale={18} size={2} speed={0.3} color="#a78bfa" />

          {/* The Enhanced Gate */}
          <group position={[0, -1, 0]}>
            <Door scale={1.3} isOpen={openGate} />
          </group>

          {/* Magical Floating Prompt */}
          <Float speed={2.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <Text
              position={[0, -3.8, 1]}
              fontSize={0.35}
              color="#ddd"
              anchorX="center"
              anchorY="middle"
              font={undefined} // Standard for reliability
            >
              CLICK TO ENTER THE REALM
            </Text>
          </Float>

          {/* Background nebula details */}
          <mesh position={[0, 0, -20]} scale={[40, 40, 1]}>
            <planeGeometry />
            <meshBasicMaterial color="#0f172a" transparent opacity={0.3} />
          </mesh>
        </Suspense>
      </Canvas>

      {/* ── PREMIUM UI OVERLAY ── */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        pointerEvents: "none", zIndex: 10,
      }}>
        <div style={{ transform: "translateY(-180px)", transition: "all 1s", opacity: openGate ? 0 : 1 }}>
          <h1 style={{
            color: "#fff", fontFamily: "serif", fontSize: "5rem",
            letterSpacing: "0.2em", fontWeight: 700, margin: 0,
            textShadow: "0 0 40px rgba(124,58,237,0.7)", filter: "drop-shadow(0 4px 10px #000)"
          }}>
            BOOKSTORE
          </h1>
          <div style={{
            width: "30%", height: 2, background: "linear-gradient(90deg, transparent, #7c3aed, transparent)",
            margin: "12px auto"
          }} />
          <p style={{
            color: "#c4b5fd", textAlign: "center", letterSpacing: "1em",
            fontSize: "0.8rem", textTransform: "uppercase", opacity: 0.8
          }}>
            A New Dimension
          </p>
        </div>

        {!openGate && (
          <button
            onClick={handleEnter}
            style={{
              pointerEvents: "all",
              transform: "translateY(220px)",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#fff",
              padding: "20px 80px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 4,
              cursor: "pointer",
              backdropFilter: "blur(20px)",
              fontSize: "1.2rem",
              letterSpacing: "0.8em",
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
              boxShadow: "0 0 40px rgba(124, 58, 237, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.05)",
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              textTransform: "uppercase",
              fontFamily: "serif",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(124, 58, 237, 0.4)";
              e.target.style.letterSpacing = "1.2em";
              e.target.style.boxShadow = "0 0 80px rgba(124, 58, 237, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.05)";
              e.target.style.letterSpacing = "0.8em";
              e.target.style.boxShadow = "0 0 40px rgba(124, 58, 237, 0.3)";
            }}
          >
            BEHOLD
          </button>
        )}
      </div>

      {pulse && (
        <div style={{
          position: "fixed", inset: 0, background: "#000", zIndex: 999,
          animation: "blackHole 2s forwards", pointerEvents: "none",
        }} />
      )}
      <style>{`
        @keyframes blackHole { 
          0% { opacity: 0; clip-path: circle(0% at 50% 50%); } 
          50% { opacity: 1; clip-path: circle(100% at 50% 50%); } 
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
