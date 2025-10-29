
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function RecentQA() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};
  const [qaList, setQaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (!file) return;

    const fetchQA = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/qa/previous-questions?file=${encodeURIComponent(file)}`
        );
        const data = await res.json();
        if (res.ok) {
          setQaList(data);
        } else {
          alert("❌ Failed to fetch recent questions");
        }
      } catch (err) {
        console.error(err);
        alert("⚠ Error fetching recent questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQA();
  }, [file]);

  const toggleAnswer = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="recentqa-page">
      <div className="recentqa-container">
        <h2>🕘 Recent Questions</h2>

        <button
          onClick={() => navigate("/qa", { state: { file } })}
          className="lav-btn back"
        >
          ⬅ Back
        </button>

        {loading ? (
          <p className="center-text">⏳ Loading...</p>
        ) : qaList.length === 0 ? (
          <p className="center-text">No previous questions found for this file.</p>
        ) : (
          <div className="qa-list">
            {qaList.map((item, idx) => (
              <div key={idx} className="qa-card">
                <strong>❓ Question:</strong>
                <p className="question">{item.question}</p>

                <button
                  onClick={() => toggleAnswer(idx)}
                  className="lav-btn view-btn"
                >
                  {expandedIndex === idx ? "Hide Answer" : "View Answer"}
                </button>

                {expandedIndex === idx && (
                  <div className="answer-box">
                    <strong>💡 Answer:</strong>
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        body {
          background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc) !important;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
        }

        .recentqa-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        /* Black main card */
        .recentqa-container {
          max-width: 800px;
          width: 100%;
          padding: 2rem;
          background: #121212;
          border-radius: 20px;
          color: #f0f0f0;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          text-align: center;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: #ffffff;
          text-shadow: 0 0 8px #00000099;
        }

        .center-text {
          color: #ddd;
          margin-top: 2rem;
        }

        .qa-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Q&A cards */
        .qa-card {
          background: rgba(30, 30, 30, 0.85);
          border-radius: 14px;
          box-shadow: 0 8px 26px rgba(0, 0, 0, 0.3);
          padding: 1.5rem;
          text-align: left;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }
        .qa-card:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }

        .question {
          margin: 0.5rem 0 1rem 0;
          color: #e0e0e0;
          line-height: 1.5;
        }

        .answer-box {
          margin-top: 1rem;
          background: rgba(50, 50, 50, 0.8);
          padding: 1rem;
          border-radius: 10px;
          box-shadow: inset 0 0 12px rgba(159, 122, 234, 0.2);
        }

        .answer-box p {
          margin-top: 0.6rem;
          color: #f1f1f1;
          white-space: pre-wrap;
        }

        /* Lavender Buttons */
        .lav-btn {
          background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
          color: #3a2d5c;
          padding: 12px 20px;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          transition: all 0.25s ease;
          box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
          min-width: 140px;
        }

        .lav-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
        }

        .lav-btn.back {
          background: linear-gradient(135deg, #63b3ed, #3182ce);
          color: white;
          margin-bottom: 1.5rem;
        }

        .lav-btn.view-btn {
          background: linear-gradient(135deg, #b794f4, #9f7aea);
          color: white;
        }

        @media (max-width: 680px) {
          .lav-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
