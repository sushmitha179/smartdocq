
// client/src/router.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UploadPage from "./pages/UploadPage";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import DashboardLayout from "./components/DashboardLayout";
import FeedbackPage from "./pages/FeedbackPage";

function GuestRoute({ children, user }) {
  return !user ? children : <Navigate to="/" />;
}

function PrivateRoute({ children, user }) {
  return user ? children : <Navigate to="/login" />;
}

export default function AppRoutes({ user, setUser }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <GuestRoute user={user}>
            <Login setUser={setUser} />
          </GuestRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <GuestRoute user={user}>
            <Signup setUser={setUser} />
          </GuestRoute>
        }
      />

      {/* Dashboard routes */}
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <DashboardLayout user={user} setUser={setUser} />
          </PrivateRoute>
        }
      >
        <Route path="upload" element={<UploadPage />} />
        <Route path="feedback" element={<FeedbackPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route index element={<Navigate to="upload" />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
