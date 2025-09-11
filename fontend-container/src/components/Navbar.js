import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/inventory">Inventory</Link>
      <Link to="/inbound">Inbound</Link>
      <Link to="/outbound">Outbound</Link>
      <button
        onClick={handleLogout}
        style={{
          marginLeft: "20px",
          color: "white",
          background: "red",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
}
