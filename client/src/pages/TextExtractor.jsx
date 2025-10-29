import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function TextExtractor() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (!file) return;
    const fetchText = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/upload/extract-text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: file }),
        });
        const data = await res.json();
        if (res.ok) setText(data.text);
        else alert("❌ Failed to extract text: " + data.error);
      } catch (err) {
        console.error(err);
        alert("❌ Error extracting text");
      } finally {
        setLoading(false);
      }
    };
    fetchText();
  }, [file]);

  if (!file)
    return <p style={{ textAlign: "center", marginTop: "2rem", color: "#333" }}>No file provided!</p>;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    alert("✅ Text copied to clipboard!");
  };

  const handleReadAloud = () => {
    if (!text) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBack = () => navigate("/upload");

  return (
    <div className="text-extractor-container">
      <h2>📄 Text Extractor</h2>

      {loading ? (
        <p className="loading">⏳ Extracting text...</p>
      ) : (
        <>
          <textarea value={text} readOnly className="text-area" />
          <div className="button-group">
            <button onClick={handleCopy} className="btn green">📋 Copy</button>
            <button onClick={handleDownload} className="btn blue">⬇ Download</button>
            <button onClick={handleReadAloud} className="btn purple">
              {speaking ? "⏹ Stop Reading" : "🎧 Read Aloud"}
            </button>
            <button onClick={handleBack} className="btn gray">🔙 Back</button>
          </div>
        </>
      )}

      <style>{`
        .text-extractor-container {
          max-width: 850px;
          margin: 50px auto;
          padding: 2.5rem 3rem;
          background: #1b1b1b;
          border-radius: 24px;
          color: #f0f0ff;
          box-shadow: 0 10px 20px rgba(170, 150, 230, 0.25);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          transition: box-shadow 0.3s ease;
        }
        .text-extractor-container:hover {
          box-shadow: 0 14px 30px rgba(170, 150, 230, 0.4);
        }
        h2 {
          text-align: center;
          font-size: 2.4rem;
          margin-bottom: 2rem;
          color: #bfa5f5;
          text-shadow: 0 0 6px #9575cd77;
          font-weight: 700;
        }
        .loading {
          text-align: center;
          font-size: 1.4rem;
          color: #d1c4e9;
        }
        .text-area {
          width: 100%;
          height: 400px;
          padding: 18px 20px;
          border-radius: 18px;
          border: 1px solid #5a4db3;
          background: #f8f7fc;
          color: #3a2d5c;
          font-size: 16px;
          line-height: 1.8;
          resize: none;
          box-shadow: inset 0 0 14px #dcd4f7;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          font-family: 'Consolas', monospace;
        }
        .text-area:focus {
          outline: none;
          border-color: #9575cd;
          box-shadow: 0 0 18px #9575cdcc;
          background: #f9f8fe;
        }
        .button-group {
          margin-top: 30px;
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        .btn {
          padding: 15px 32px;
          border: none;
          border-radius: 20px;
          font-weight: 700;
          cursor: pointer;
          color: white;
          min-width: 170px;
          font-size: 16px;
          box-shadow: 0 8px 20px rgba(126, 87, 194, 0.3);
          transition: all 0.4s cubic-bezier(0.65, 0, 0.35, 1);
          position: relative;
          overflow: hidden;
        }
        .btn::after {
          content: "";
          position: absolute;
          top: 0; left: -110%;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,0.17);
          transform: skewX(-22deg);
          transition: left 0.6s ease;
          z-index: 1;
        }
        .btn:hover::after {
          left: 210%;
        }
        .btn:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 40px rgba(126, 87, 194, 0.45);
        }
        .btn.green { background: linear-gradient(135deg, #8bc34a, #4caf50); }
        .btn.blue { background: linear-gradient(135deg, #42a5f5, #1e88e5); }
        .btn.purple { background: linear-gradient(135deg, #7e57c2, #673ab7); }
        .btn.gray { background: linear-gradient(135deg, #9e9e9e, #757575); }
        .btn.green:hover { box-shadow: 0 14px 40px rgba(139, 195, 74, 0.6); }
        .btn.blue:hover { box-shadow: 0 14px 40px rgba(33, 150, 243, 0.6); }
        .btn.purple:hover { box-shadow: 0 14px 40px rgba(126, 87, 194, 0.7); }
        .btn.gray:hover { box-shadow: 0 14px 40px rgba(121, 121, 121, 0.7); }
        @media (max-width: 768px) {
          .text-area { height: 300px; }
          .button-group { flex-direction: column; }
          .btn { width: 100%; min-width: unset; }
        }
      `}</style>
    </div>
  );
}
