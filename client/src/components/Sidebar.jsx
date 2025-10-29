


// client/src/components/Sidebar.jsx

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const links = [
    { name: "Upload", path: "/upload" },
    { name: "Chat", path: "/chat" },
    { name: "Profile", path: "/profile" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside style={{
      width: 220,
      background: "#2c3e50",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "1.5rem"
    }}>
      <h2 style={{ marginBottom: "2rem" }}>SmartDocQ</h2>
      {links.map(link => (
        <Link
          key={link.path}
          to={link.path}
          style={{
            marginBottom: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: 6,
            background: location.pathname === link.path ? "#34495e" : "transparent",
            color: "white",
            textDecoration: "none",
          }}
        >
          {link.name}
        </Link>
      ))}
    </aside>
  );
}
