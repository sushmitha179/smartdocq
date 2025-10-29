import React from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ChatbotPage() {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Info Banner */}
      <div
        style={{
          padding: "1rem 2rem",
          background: "#6b5b95",
          color: "#fff",
          textAlign: "center",
          fontWeight: "600",
          fontSize: "1rem",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        }}
      >
        🤖 This chatbot is for users who want to learn more about our project and get instant guidance.
      </div>

      {/* Chatbot iframe */}
      <div style={{ flex: 1, position: "relative" }}>
        <iframe
          src="https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/10/07/14/20251007140928-Q3F4O097.json"
          title="SmartDocQ Chatbot"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />

        {/* Close Button */}
        <div
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "#ff5e5e",
            width: 40,
            height: 40,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            zIndex: 10,
          }}
        >
          <FiX size={20} />
        </div>
      </div>
    </div>
  );
}
