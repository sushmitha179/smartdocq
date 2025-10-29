

// client/src/context/SettingsContext.jsx
import React, { createContext, useState, useEffect } from "react";

// ✅ Create context
export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  // Dark mode with system preference fallback
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) ?? prefersDark ?? false
  );

  // Language preference
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

  // Font size for accessibility
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem("fontSize")) || 16
  );

  // Primary color theme
  const [primaryColor, setPrimaryColor] = useState(
    localStorage.getItem("primaryColor") || "#007bff"
  );

  // Apply theme globally
  useEffect(() => {
    document.body.style.background = darkMode ? "#121212" : "#f5f6fa";
    document.body.style.color = darkMode ? "#f5f5f5" : "#2c3e50";
    document.body.style.fontSize = fontSize + "px";

    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("primaryColor", primaryColor);
  }, [darkMode, fontSize, primaryColor]);

  // Save language globally
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Reset all settings to default
  const resetSettings = () => {
    setDarkMode(prefersDark ?? false);
    setLanguage("English");
    setFontSize(16);
    setPrimaryColor("#007bff");
    localStorage.clear();
  };

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        primaryColor,
        setPrimaryColor,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
