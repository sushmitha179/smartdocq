import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RecentTextExtractor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};
  const [recentTexts, setRecentTexts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleIndexes, setVisibleIndexes] = useState([]); // track which texts are visible

  if (!file) return <p>No file provided!</p>;

  useEffect(() => {
    const fetchRecentTexts = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/qa/previous-texts");

        const data = await res.json();
        if (res.ok) {
          setRecentTexts(data); // array of texts
        } else {
          alert("❌ Failed to fetch recent texts: " + data.error);
        }
      } catch (err) {
        console.error("Error fetching recent texts:", err);
        alert("❌ Failed to fetch recent texts");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentTexts();
  }, [file]);

  const toggleText = (index) => {
    setVisibleIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        background: "#1e1e2f",
        borderRadius: "12px",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🕘 Recent Extracted Texts</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>⏳ Loading...</p>
      ) : recentTexts.length === 0 ? (
        <p style={{ textAlign: "center" }}>No recent texts found for this file.</p>
      ) : (
        recentTexts.map((item, idx) => (
          <div
            key={idx}
            style={{
              background: "#2a2a40",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            <strong>Extracted Text #{idx + 1}</strong>
            <div style={{ marginTop: "8px" }}>
              <button
                onClick={() => toggleText(idx)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#607D8B",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {visibleIndexes.includes(idx) ? "Hide Text" : "View Text"}
              </button>
            </div>
            {visibleIndexes.includes(idx) && (
              <textarea
                readOnly
                value={item.text || item.answer || ""}
                style={{
                  width: "100%",
                  height: "200px",
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #444",
                  background: "#222",
                  color: "white",
                  resize: "none",
                }}
              />
            )}
          </div>
        ))
      )}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/text-extractor", { state: { file } })}
          style={{
            padding: "10px 18px",
            background: "#2196F3",
            border: "none",
            borderRadius: "8px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}
