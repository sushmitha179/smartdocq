

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ user, setUser }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f9fafc" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header user={user} setUser={setUser} />
        <main style={{ flex: 1, padding: "2rem" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
