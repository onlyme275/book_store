import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import EntryScene from "../scenes/EntryScene";
import WorldScene from "../scenes/WorldScene";

const PHASE = { ENTRY: "entry", WORLD: "world", TRANSITION: "transition" };

export default function Game() {
    const [phase, setPhase] = useState(PHASE.ENTRY);
    const navigate = useNavigate();
    const entered = useRef(false);

    const handleEnterWorld = useCallback(() => {
        setPhase(PHASE.TRANSITION);
        setTimeout(() => setPhase(PHASE.WORLD), 900);
    }, []);

    const handleEnterHouse = useCallback(() => {
        if (entered.current) return;
        entered.current = true;
        setPhase(PHASE.TRANSITION);
        setTimeout(() => navigate("/login"), 900);
    }, [navigate]);

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
            {/* Scene layers */}
            {phase === PHASE.ENTRY && <EntryScene onEnter={handleEnterWorld} />}
            {phase === PHASE.WORLD && <WorldScene onEnterHouse={handleEnterHouse} />}

            {/* Transition overlay */}
            {phase === PHASE.TRANSITION && (
                <div style={{
                    position: "fixed", inset: 0,
                    background: "radial-gradient(circle, #1e1b4b, #000)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                    animation: "fadeInOut 0.9s ease-in-out",
                }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{
                            width: 60, height: 60, border: "3px solid #7c3aed",
                            borderTop: "3px solid transparent", borderRadius: "50%",
                            animation: "spin 0.8s linear infinite",
                            margin: "0 auto 16px",
                        }} />
                        <p style={{ color: "#a78bfa", fontFamily: "sans-serif", fontSize: "1rem", letterSpacing: "0.1em" }}>
                            Loading world...
                        </p>
                    </div>
                    <style>{`
            @keyframes spin { to { transform: rotate(360deg); } }
            @keyframes fadeInOut { 0%{opacity:0} 30%{opacity:1} 80%{opacity:1} 100%{opacity:0} }
          `}</style>
                </div>
            )}
        </div>
    );
}
