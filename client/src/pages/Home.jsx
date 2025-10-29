import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileQuestion,
  MessageSquare,
  Star,
  LogIn,
  UserPlus,
  Info,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";

export default function Home() {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="home-page">
      {/* 🌟 Hero Section */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="title">✨ Welcome to SmartDocQ</h1>
        <p className="subtitle">
          An intelligent platform to upload, ask, and extract insights from your
          documents.
        </p>

        <motion.div
          className="button-group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button className="btn primary" onClick={() => navigate("/chatbot")}>
            🤖 ChatBot
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/feedback")}
          >
            <MessageSquare className="icon" /> Give Feedback
          </button>
        </motion.div>
      </motion.section>

      {/* 🚀 Features Section */}
      <motion.section
        className="features"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>🚀 Explore SmartDocQ Features</h2>
        <div className="feature-grid">
          {[
            {
              icon: <FileQuestion size={40} />,
              title: "Upload & Query",
              desc: "Upload documents and get instant AI-powered answers.",
              route: "/upload",
            },
            {
              icon: <MessageSquare size={40} />,
              title: "Feedback & Reviews",
              desc: "Share your thoughts and see what others think about SmartDocQ.",
              route: "/reviews",
            },
            {
              icon: <UserPlus size={40} />,
              title: "Signup & Personalization",
              desc: "Create an account to store your history and enhance AI interactions.",
              route: "/signup",
            },
            {
              icon: <LogIn size={40} />,
              title: "Secure Login",
              desc: "Access your saved questions and files securely anytime, anywhere.",
              route: "/login",
            },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="feature-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onClick={() =>
                feature.action ? feature.action() : navigate(feature.route)
              }
            >
              <div className="icon-wrap">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ℹ️ About Section */}
      <motion.section
        className="about"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="about-card">
          <h2>
            <Info className="inline-icon" /> About SmartDocQ
          </h2>
          <p>
            SmartDocQ is an AI-driven platform designed to help users query,
            analyze, and extract information from documents like PDFs and Word
            files. With personalized login, feedback management, and cloud
            integration, it offers a complete document intelligence experience.
          </p>
        </div>
      </motion.section>

      {/* ⭐ Reviews Section */}
      <motion.section
        className="reviews"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <h2>
          <Star className="inline-icon" /> What Our Users Say
        </h2>
        <div className="review-grid">
          {[
            {
              name: "Komal",
              feedback:
                "SmartDocQ made file-based queries so easy! Absolutely love it 💜",
              rating: 5,
            },
            {
              name: "Rahul",
              feedback:
                "Intuitive interface and quick responses. Highly recommended!",
              rating: 4,
            },
            {
              name: "Sneha",
              feedback:
                "Perfect tool for students and professionals. Great experience!",
              rating: 5,
            },
          ].map((r, idx) => (
            <motion.div
              key={idx}
              className="review-card"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <p className="feedback">“{r.feedback}”</p>
              <p className="name">— {r.name}</p>
              <div className="stars">{"⭐".repeat(r.rating)}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 📧 Footer Section */}
      <footer className="footer">
        <Mail size={18} /> Contact:{" "}
        <a href="mailto:support@smartdocq.com">support@smartdocq.com</a>
        <p>© {new Date().getFullYear()} SmartDocQ. All Rights Reserved.</p>
      </footer>

      {/* 💬 Chatbot Section */}
      {chatOpen && (
        <div className="chatbot-wrapper">
          <iframe
            src="https://cdn.botpress.cloud/webchat/v3.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/10/07/14/20251007140928-Q3F4O097.json"
            title="SmartDocQ Chatbot"
            className="chatbot-iframe"
          />
          <div className="chat-close" onClick={() => setChatOpen(false)}>
            <FiX size={20} />
          </div>
        </div>
      )}

      {/* 🎨 Styling */}
      <style>{`
        body {
          background: radial-gradient(circle at top left, #1e0033, #0f001a);
          color: #f2f2f2;
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
        }
        .home-page { text-align: center; overflow-x: hidden; }

        /* Hero */
        .hero { padding: 6rem 2rem 4rem; background: linear-gradient(135deg, #3b0066, #150033); color: #fff; }
        .title { font-size: 3rem; margin-bottom: 1rem; text-shadow: 0 0 15px #a970ff; }
        .subtitle { font-size: 1.2rem; max-width: 700px; margin: 0 auto 2rem; color: #d0bdf4; }
        .button-group { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
        .btn { padding: 12px 20px; border: none; border-radius: 14px; cursor: pointer; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.3s ease; }
        .btn.primary { background: linear-gradient(135deg, #8b5cf6, #7e22ce); color: white; box-shadow: 0 6px 18px rgba(139, 92, 246, 0.4); }
        .btn.secondary { background: linear-gradient(135deg, #9333ea, #581c87); color: white; box-shadow: 0 6px 18px rgba(147, 51, 234, 0.4); }
        .btn:hover { transform: scale(1.05); box-shadow: 0 10px 30px rgba(139, 92, 246, 0.6); }

        /* Features */
        .features { padding: 4rem 2rem; background: #0f001a; }
        .features h2 { font-size: 2rem; margin-bottom: 2rem; color: #dcb5ff; }
        .feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; }
        .feature-card { background: #1e0033; padding: 1.5rem; border-radius: 16px; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.3); transition: all 0.3s ease; }
        .feature-card h3 { color: #c084fc; } .feature-card p { color: #ccc; }

        /* About */
        .about { padding: 4rem 2rem; display: flex; justify-content: center; }
        .about-card { background: rgba(30, 0, 51, 0.8); padding: 2rem; border-radius: 16px; max-width: 700px; color: #f0e6ff; text-align: center; box-shadow: 0 10px 25px rgba(100, 50, 200, 0.5); }
        .about-card h2 { color: #d9b8ff; margin-bottom: 1rem; }
        .about-card p { font-size: 1.1rem; line-height: 1.6; }

        /* Reviews */
        .reviews { padding: 4rem 2rem; background: #1a002b; }
        .review-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
        .review-card { background: #2e005a; padding: 1.5rem; border-radius: 16px; box-shadow: 0 8px 25px rgba(0,0,0,0.3); }
        .feedback { font-style: italic; color: #e0c3fc; }
        .name { font-weight: 700; color: #c084fc; }
        .stars { color: #FFD700; margin-top: 0.5rem; }

        /* Footer */
        .footer { padding: 1.5rem; background: #0a0014; color: #b5a0e0; font-size: 0.9rem; }
        .footer a { color: #dcb5ff; text-decoration: none; }

        /* Chatbot */
        .chatbot-wrapper { position: fixed; bottom: 20px; right: 20px; z-index: 1000; }
        .chatbot-iframe { width: 400px; height: 600px; border: none; border-radius: 16px; box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
        .chat-close { position: absolute; top: -12px; right: -12px; background: #ff5e5e; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
      `}</style>
    </div>
  );
}
