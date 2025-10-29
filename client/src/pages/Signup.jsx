
import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await signup(form);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>✨ Create Account</h2>

        {/* Circular Profile Image */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1rem 0" }}>
          <img
            src="src/assets/robo1.webp" // put your signup image in public/assets
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
          Join <strong>SmartDocQ</strong> today!
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ marginBottom: "6px" }}>Name</label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
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
              placeholder="Enter a strong password"
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "1.5rem", textAlign: "center", color: "#ccc" }}>
          Already have an account? <Link to="/login" style={{ color: "#c7b2f0" }}>Log In</Link>
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
        input::placeholder {
          color: #777;
        }
      `}</style>
    </div>
  );
}
