import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resultAction = await dispatch(loginUser(form));
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/dashboard");
      } else {
        setError(resultAction.payload?.error || "Invalid email or password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: "absolute", width: 400, height: 400,
        background: "radial-gradient(circle, #7c3aed33, transparent)",
        borderRadius: "50%", top: "-10%", left: "-10%",
        animation: "float1 8s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 300, height: 300,
        background: "radial-gradient(circle, #3b82f633, transparent)",
        borderRadius: "50%", bottom: "-5%", right: "-5%",
        animation: "float2 10s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", width: 200, height: 200,
        background: "radial-gradient(circle, #06b6d433, transparent)",
        borderRadius: "50%", top: "50%", right: "20%",
        animation: "float1 12s ease-in-out infinite reverse",
      }} />

      {/* Glass card */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: "48px 40px",
        width: "100%", maxWidth: 420,
        boxShadow: "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        position: "relative", zIndex: 10,
      }}>
        {/* Logo / Icon */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 0 30px #7c3aed66",
          }}>
            <span style={{ fontSize: 32 }}>🏫</span>
          </div>
          <h1 style={{
            color: "#fff", fontSize: "1.8rem", fontWeight: 700,
            margin: 0, letterSpacing: "-0.02em",
          }}>
            Welcome Back
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: 6 }}>
            Sign in to your bookstore account
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div style={{
            background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 10, padding: "10px 14px", marginBottom: 20,
            color: "#fca5a5", fontSize: "0.875rem",
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <div style={{ marginBottom: 18 }}>
            <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: 6, fontWeight: 500 }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                fontSize: "1rem", color: "#64748b",
              }}>✉️</span>
              <input
                type="email"
                placeholder="admin@school.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                style={{
                  width: "100%", padding: "13px 14px 13px 42px",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, color: "#fff", fontSize: "0.95rem",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7c3aed";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginBottom: 26 }}>
            <label style={{ display: "block", color: "#94a3b8", fontSize: "0.8rem", marginBottom: 6, fontWeight: 500 }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                fontSize: "1rem", color: "#64748b",
              }}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                style={{
                  width: "100%", padding: "13px 44px 13px 42px",
                  background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12, color: "#fff", fontSize: "0.95rem",
                  outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#7c3aed";
                  e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#64748b", fontSize: "1rem", padding: 4,
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "14px",
              background: loading
                ? "rgba(124,58,237,0.5)"
                : "linear-gradient(135deg, #7c3aed, #3b82f6)",
              border: "none", borderRadius: 12,
              color: "#fff", fontWeight: 700, fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 4px 20px rgba(124,58,237,0.4)",
              transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: 18, height: 18, border: "2px solid #fff",
                  borderTop: "2px solid transparent", borderRadius: "50%",
                  display: "inline-block", animation: "spin 0.8s linear infinite",
                }} />
                Signing in...
              </>
            ) : "Sign In →"}
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24, color: "#475569", fontSize: "0.8rem" }}>
          Bookstore Management System
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        input::placeholder { color: #475569; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, 15px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
