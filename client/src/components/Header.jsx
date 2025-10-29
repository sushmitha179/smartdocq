
// client/src/components/Header.jsx
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";

export default function Header() {
  const { darkMode, language } = useContext(SettingsContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // Texts for multi-language support (added 'history')
  const texts = {
    English: { dashboard: "Dashboard", chat: "Chat", upload: "Upload", history: "History", feedback: "Feedback", profile: "Profile", settings: "⚙ Settings", logout: "Logout" },
    తెలుగు: { dashboard: "డాష్‌బోర్డ్", chat: "చాట్", upload: "అప్‌లోడ్", history: "ఇతిహాసం", feedback: "ఫీడ్‌బ్యాక్", profile: "ప్రొఫైల్", settings: "⚙ సెట్టింగ్స్", logout: "లాగ్ అవుట్" },
    हिंदी: { dashboard: "डैशबोर्ड", chat: "चैट", upload: "अपलोड", history: "इतिहास", feedback: "प्रतिक्रिया", profile: "प्रोफ़ाइल", settings: "⚙ सेटिंग्स", logout: "लॉग आउट" },
    தமிழ்: { dashboard: "டாஷ்போர்டு", chat: "சாட்", upload: "அப்‌లోடு", history: "வரலாறு", feedback: "பின்னூட்டு", profile: "சுயவிவரம்", settings: "⚙ அமைப்புகள்", logout: "வெளியேறு" },
  };

  const t = texts[language] || texts.English;

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: darkMode ? "#1e1e1e" : "#2c3e50",
        color: "white",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2
        style={{ margin: 0, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        ⚡ SmartDocQ
      </h2>

      <nav style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user ? (
          <>
            {/* Navigation Links */}
            <Link style={navBtn(darkMode)} to="/">
              {t.dashboard}
            </Link>

            <Link style={navBtn(darkMode)} to="/upload">
              {t.upload}
            </Link>

            {/* HISTORY tab added */}
            <Link style={navBtn(darkMode)} to="/history">
              🕘 {t.history}
            </Link>

            <Link style={navBtn(darkMode)} to="/feedback">
              {t.feedback}
            </Link>
            <Link style={navBtn(darkMode)} to="/profile">
              {t.profile}
            </Link>
            <Link style={navBtn(darkMode)} to="/settings">
              {t.settings}
            </Link>

            {/* User Dropdown */}
            <div
              style={{ position: "relative", marginLeft: "12px", cursor: "pointer" }}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <span>👤 {user.name}</span>
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    right: 0,
                    background: darkMode ? "#333" : "#fff",
                    color: darkMode ? "#fff" : "#2c3e50",
                    padding: "12px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "180px",
                    zIndex: 1000,
                  }}
                >
                  <p style={{ margin: "4px 0", fontWeight: "bold" }}>
                    {user.name}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "0.9rem" }}>
                    {user.email}
                  </p>
                  <button
                    onClick={handleLogout}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link style={navBtn(darkMode)} to="/login">
              Log in
            </Link>
            <Link
              style={{ ...navBtn(darkMode), background: "#27ae60" }}
              to="/signup"
            >
              Sign up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

// Dynamic nav button style
const navBtn = (darkMode) => ({
  color: "white",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  background: darkMode ? "#444" : "#34495e",
  transition: "0.2s",
  fontWeight: "500",
});
