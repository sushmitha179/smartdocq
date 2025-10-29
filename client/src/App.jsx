import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Header from "./components/Header";
import UploadPage from "./pages/UploadPage";
import FeedbackPage from "./pages/FeedbackPage";
import HistoryPage from "./pages/HistoryPage";
import ReviewsPage from "./pages/ReviewsPage";
import RecentQA from "./pages/RecentQA";
import ChatbotPage from "./pages/ChatbotPage";


// New pages
import TextExtractor from "./pages/TextExtractor";
import QA from "./pages/QA";

export default function App() {
  const [user, setUser] = useState(null);

  // Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Header user={user} setUser={setUser} />

      {/* Routes must only contain Route elements */}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/feedback" element={<FeedbackPage user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/settings" element={<Settings user={user} />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/text-extractor" element={<TextExtractor />} />
        <Route path="/history" element={<HistoryPage />} /> {/* 👈 NEW ROUTE */}
        <Route path="/qa/recent" element={<RecentQA />} />
        <Route path="/qa" element={<QA />} />
      </Routes>

     
    </Router>
  );
}