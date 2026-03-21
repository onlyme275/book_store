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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Floating Books + Students */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${20 + Math.random() * 30}px`,
            opacity: 0.15,
            animation: `float ${6 + Math.random() * 10}s ease-in-out infinite`,
          }}
        >
          {Math.random() > 0.5 ? "📚" : "🎓"}
        </div>
      ))}

      {/* Glass Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 24,
          padding: "48px 40px",
          width: "100%",
          maxWidth: 420,
          boxShadow:
            "0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 0 30px #7c3aed66",
            }}
          >
            <span style={{ fontSize: 32 }}>🏫</span>
          </div>

          <h1
            style={{
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: 700,
              margin: 0,
            }}
          >
            Welcome Back
          </h1>

          <p style={{ color: "#94a3b8", fontSize: "0.9rem", marginTop: 6 }}>
            Sign in to your bookstore account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.3)",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 20,
              color: "#fca5a5",
              fontSize: "0.875rem",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                display: "block",
                color: "#94a3b8",
                fontSize: "0.8rem",
                marginBottom: 6,
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@school.com"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
              style={{
                width: "100%",
                padding: "13px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                color: "#fff",
                outline: "none",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 26 }}>
            <label
              style={{
                display: "block",
                color: "#94a3b8",
                fontSize: "0.8rem",
                marginBottom: 6,
              }}
            >
              Password
            </label>

            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                required
                style={{
                  width: "100%",
                  padding: "13px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 12,
                  color: "#fff",
                  outline: "none",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#aaa",
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: "linear-gradient(135deg, #7c3aed, #3b82f6)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            color: "#64748b",
            fontSize: "0.8rem",
          }}
        >
          Bookstore Management System
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-40px) rotate(10deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
