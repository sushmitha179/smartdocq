import React, { useState } from "react";
import { useSettings } from "../context/SettingsContext";

export default function SettingsDrawer() {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* ⚙️ Floating Settings Button */}
      <button
        onClick={() => setOpen(true)}
        className="icon-btn"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
          borderRadius: "50%",
          fontSize: 22,
          zIndex: 1100, // keep above everything
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        ⚙️
      </button>

      {/* ✅ Drawer Overlay (only clickable when open) */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: open ? "rgba(0,0,0,0.4)" : "transparent",
          transition: "background 0.3s ease",
          zIndex: 1000,
          pointerEvents: open ? "auto" : "none", // 🔑 important fix
        }}
      />

      {/* Drawer Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed",
          top: 0,
          right: open ? 0 : "-360px",
          width: "360px",
          height: "100%",
          background: "var(--panel)",
          color: "var(--text)",
          boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
          transition: "right 0.3s ease",
          padding: "24px",
          zIndex: 1001,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>⚙️ Settings</h2>

        {/* Theme */}
        <div style={section}>
          <label className="label"><b>Theme</b></label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select"
          >
            <option value="light">🌞 Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Language */}
        <div style={section}>
          <label className="label"><b>Language</b></label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="select"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="te">తెలుగు</option>
          </select>
        </div>

        {/* Logout */}
        <div style={{ marginTop: "auto" }}>
          <button onClick={handleLogout} className="btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

const section = {
  marginTop: "20px",
  marginBottom: "10px",
};
