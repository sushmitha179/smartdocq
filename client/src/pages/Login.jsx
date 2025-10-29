
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/api";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await login(form);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>👋 Welcome Back</h2>

        {/* Circular Profile Image */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <img
            src="src/assets/robo1.webp" // replace with your image URL
            alt="Profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              border: "3px solid #c7b2f0",
              objectFit: "cover",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          />
        </div>

        <p style={{ marginBottom: "2rem", color: "#ccc", textAlign: "center" }}>
          Log in to continue to <strong>SmartDocQ</strong>
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "1px solid #444",
                outline: "none",
                background: "#1e1e1e",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: 12,
                border: "1px solid #444",
                outline: "none",
                background: "#1e1e1e",
                color: "#fff",
                fontSize: "1rem",
              }}
            />
          </div>

          {error && <p style={{ color: "#E53935", fontWeight: "bold" }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px",
              borderRadius: 12,
              border: "none",
              background: loading ? "#007bff99" : "#007bff",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "0.3s",
            }}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#ccc" }}>
          No account? <Link to="/signup" style={{ color: "#c7b2f0" }}>Sign Up</Link>
        </p>
      </div>

      <style>{`
        body {
          background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc) !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
        }
        .login-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .login-card {
          max-width: 450px;
          width: 100%;
          padding: 3rem;
          background: #121212;
          border-radius: 20px;
          color: #f0f0f0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          text-align: center;
        }
        .login-card h2 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: #fff;
          text-shadow: 0 0 8px #00000099;
        }
        input::placeholder {
          color: #777;
        }
      `}</style>
    </div>
  );
}
