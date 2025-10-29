
import React, { useEffect, useState } from "react";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQA, setSelectedQA] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false); // Mobile drawer toggle

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    document.body.style.background =
      "linear-gradient(135deg, #f0e6fc, #e6d6f0, #d4c1f4)";
    document.body.style.margin = "0";
    document.body.style.minHeight = "100vh";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    if (!user?.email) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/qa/history/user?email=${user.email}`
        );
        const data = await res.json();
        if (res.ok) setHistory(data);
        else setHistory([]);
      } catch (err) {
        console.error("❌ Failed to fetch history:", err);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.email]);

  const filteredHistory = history.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  const copyAnswer = () => {
    if (!selectedQA) return;
    navigator.clipboard.writeText(selectedQA.answer);
    alert("✅ Answer copied to clipboard!");
  };

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>Loading...</p>;

  if (history.length === 0)
    return <p style={{ textAlign: "center", marginTop: "3rem" }}>No history yet.</p>;

  return (
    <div className="history-page">
      {/* Mobile drawer toggle button */}
      <button
        className="drawer-toggle"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        📋 Questions
      </button>

      <div className={`history-container ${drawerOpen ? "drawer-open" : ""}`}>
        <div className="left-panel">
          <h2>📜 Your Q&A History</h2>
          <input
            type="text"
            placeholder="🔍 Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="history-list">
            {filteredHistory.map((item) => (
              <div
                key={item._id}
                className={`history-item ${
                  selectedQA?._id === item._id ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedQA(item);
                  setDrawerOpen(false); // Close drawer on mobile
                }}
              >
                <p className="question">{item.question}</p>
                <p className="preview">{item.answer}</p>
                <span className="date">
                  {new Date(item.createdAt).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="right-panel">
          {selectedQA ? (
            <>
              <h3>❓ {selectedQA.question}</h3>
              <div className="answer-box">
                <p>💡 {selectedQA.answer}</p>
              </div>

              <div className="btn-group">
                <button onClick={copyAnswer} className="lav-btn copy">
                  📋 Copy Answer
                </button>
              </div>

              <div className="source">
                <span>📂 Source: {selectedQA.source}</span>
              </div>
            </>
          ) : (
            <p className="placeholder">Select a question from the left to view the answer.</p>
          )}
        </div>
      </div>

      <style>{`
        .history-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding: 30px;
          position: relative;
        }

        .drawer-toggle {
          display: none;
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1000;
          padding: 10px 15px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
          color: #3a2d5c;
          font-weight: bold;
          cursor: pointer;
          box-shadow: 0 6px 18px rgba(159, 122, 234, 0.4);
        }

        .history-container {
          display: flex;
          width: 95%;
          max-width: 1100px;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .left-panel {
          width: 35%;
          background: #faf8ff;
          border-right: 1px solid #e0d6f8;
          padding: 20px;
          overflow-y: auto;
        }

        .left-panel h2 {
          text-align: center;
          color: #3a2d5c;
          margin-bottom: 16px;
        }

        .left-panel input {
          width: 100%;
          padding: 10px;
          border-radius: 10px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
          outline: none;
          font-size: 0.95rem;
        }

        .left-panel input:focus {
          border-color: #a57ee9;
          box-shadow: 0 0 8px rgba(159, 122, 234, 0.4);
        }

        .history-list {
          max-height: 70vh;
          overflow-y: auto;
        }

        .history-item {
          padding: 10px 14px;
          margin-bottom: 10px;
          border-radius: 12px;
          background: #fff;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 1px solid transparent;
        }

        .history-item:hover {
          background: #f4ecff;
          border: 1px solid #d5b8ff;
        }

        .history-item.active {
          background: #e9dcff;
          border: 1px solid #a57ee9;
        }

        .history-item .question {
          margin: 0;
          font-weight: 600;
          color: #3a2d5c;
        }

        .history-item .preview {
          font-size: 0.85rem;
          color: #666;
          margin: 4px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .history-item .date {
          font-size: 0.7rem;
          color: #999;
          float: right;
        }

        .right-panel {
          flex: 1;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .answer-box {
          background: #f9f7ff;
          border: 1px solid #ddd;
          border-radius: 14px;
          padding: 1.2rem;
          font-size: 1rem;
          color: #333;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
          margin-bottom: 1rem;
        }

        .placeholder {
          text-align: center;
          color: #555;
          margin-top: 3rem;
        }

        .btn-group {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
        }

        .lav-btn {
          background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
          color: #3a2d5c;
          padding: 12px 20px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(159, 122, 234, 0.4);
          min-width: 140px;
        }

        .lav-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 30px rgba(123, 90, 192, 0.5);
        }

        .lav-btn.copy {
          background: linear-gradient(135deg, #f6ad55, #d69e2e);
          color: white;
        }

        .source {
          margin-top: 8px;
          font-size: 0.9rem;
          color: #666;
        }

        @media (max-width: 900px) {
          .history-container {
            flex-direction: column;
          }

          .left-panel {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid #ddd;
            display: ${drawerOpen ? "block" : "none"};
            position: fixed;
            top: 60px;
            left: 0;
            height: calc(100% - 60px);
            background: #faf8ff;
            z-index: 100;
            padding: 20px;
            box-shadow: 2px 0 12px rgba(0,0,0,0.1);
          }

          .drawer-toggle {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
