import React, { useContext, useEffect } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { FaMoon, FaSun, FaRedo, FaSignOutAlt, FaGlobe } from "react-icons/fa";
import "./Settings.css";

export default function Settings() {
  const { darkMode, setDarkMode, language, setLanguage } =
    useContext(SettingsContext);

  // Persist settings
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translations = {
    English: {
      title: "⚙ Settings",
      desc: "Customize your SmartDocQ experience",
      darkMode: "Dark Mode",
      language: "Language",
      logout: "Logout",
      reset: "Reset to Default",
    },
    తెలుగు: {
      title: "⚙ సెట్టింగ్స్",
      desc: "మీ SmartDocQ అనుభవాన్ని అనుకూలంగా మార్చుకోండి",
      darkMode: "డార్క్ మోడ్",
      language: "భాష",
      logout: "లాగ్ అవుట్",
      reset: "డిఫాల్ట్‌కు రీసెట్ చేయండి",
    },
    हिंदी: {
      title: "⚙ सेटिंग्स",
      desc: "अपने SmartDocQ अनुभव को अनुकूलित करें",
      darkMode: "डार्क मोड",
      language: "भाषा",
      logout: "लॉगआउट",
      reset: "डिफ़ॉल्ट पर रीसेट करें",
    },
    தமிழ்: {
      title: "⚙ அமைப்புகள்",
      desc: "உங்கள் SmartDocQ அனுபவத்தை விருப்பப்படுத்தவும்",
      darkMode: "டார்க் மோட்",
      language: "மொழி",
      logout: "வெளியேறு",
      reset: "இயல்பில் திரும்பவும்",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleReset = () => {
    if (window.confirm("Reset settings to default?")) {
      setDarkMode(false);
      setLanguage("English");
    }
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-card">
        <h2>{translations[language].title}</h2>
        <p>{translations[language].desc}</p>

        {/* Dark Mode Toggle */}
        <div className="settings-row">
          <span>
            <FaMoon style={{ marginRight: "6px", color: "#8a7ff5" }} />
            {translations[language].darkMode}
          </span>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Language Selector */}
        <div className="settings-row">
          <span>
            <FaGlobe style={{ marginRight: "6px", color: "#8a7ff5" }} />
            {translations[language].language}
          </span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="language-select"
          >
            {Object.keys(translations).map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button className="btn reset-btn" onClick={handleReset}>
            <FaRedo style={{ marginRight: "8px" }} />
            {translations[language].reset}
          </button>
          <button className="btn logout-btn" onClick={handleLogout}>
            <FaSignOutAlt style={{ marginRight: "8px" }} />
            {translations[language].logout}
          </button>
        </div>
      </div>
    </div>
  );
}
