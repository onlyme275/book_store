import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryScene from "../scenes/EntryScene";
import WorldScene from "../scenes/WorldScene";

const PHASE = {
  ENTRY: "entry",
  WORLD: "world",
  TRANSITION: "transition",
};

export default function Game() {
  const [phase, setPhase] = useState(PHASE.ENTRY);
  const [transitionText, setTransitionText] = useState("Entering...");
  const navigate = useNavigate();
  const entered = useRef(false);

  // 🚪 Door → World
  const handleEnterWorld = useCallback(() => {
    setTransitionText("Entering world...");
    setPhase(PHASE.TRANSITION);

    setTimeout(() => {
      setPhase(PHASE.WORLD);
    }, 1000);
  }, []);

  // 🏠 House → Login
  const handleEnterHouse = useCallback(() => {
    if (entered.current) return;

    entered.current = true;
    setTransitionText("Entering house...");
    setPhase(PHASE.TRANSITION);

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }, [navigate]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {/* 🎮 Scene Layer */}
      <div
        style={{
          width: "100%",
          height: "100%",
          transform:
            phase === PHASE.TRANSITION ? "scale(1.05)" : "scale(1)",
          transition: "transform 1s ease",
          filter:
            phase === PHASE.TRANSITION ? "blur(6px)" : "blur(0px)",
        }}
      >
        {phase === PHASE.ENTRY && (
          <EntryScene onEnter={handleEnterWorld} />
        )}

        {phase === PHASE.WORLD && (
          <WorldScene onEnterHouse={handleEnterHouse} />
        )}
      </div>

      {/* 🌌 Transition Overlay */}
      {phase === PHASE.TRANSITION && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "radial-gradient(circle at center, #1e1b4b 0%, #000 80%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            animation: "fadeInOut 1s ease-in-out",
          }}
        >
          <div style={{ textAlign: "center" }}>
            {/* Loader */}
            <div
              style={{
                width: 70,
                height: 70,
                border: "4px solid #7c3aed",
                borderTop: "4px solid transparent",
                borderRadius: "50%",
                animation: "spin 0.8s linear infinite",
                margin: "0 auto 20px",
                boxShadow: "0 0 20px #7c3aed88",
              }}
            />

            {/* Text */}
            <p
              style={{
                color: "#c4b5fd",
                fontFamily: "sans-serif",
                fontSize: "1.1rem",
                letterSpacing: "0.1em",
              }}
            >
              {transitionText}
            </p>
          </div>

          {/* Animations */}
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            @keyframes fadeInOut {
              0% { opacity: 0; }
              30% { opacity: 1; }
              80% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
