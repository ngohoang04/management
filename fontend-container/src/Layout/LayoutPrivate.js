// src/Layout/LayoutPrivate.js
import React, { useContext } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import "./LayoutDefaut.css";

function LayoutPrivate() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/dashboard" className="logo-text">
            Quản Lý Container
          </Link>
        </div>

        <nav className="navigation">
          <ul>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/client">Khách hàng</NavLink>
            </li>
            <li>
              <NavLink to="/reports">Báo cáo</NavLink>
            </li>
          </ul>
        </nav>

        <div className="user-actions">
          <button onClick={handleLogout} className="logout-button">
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default LayoutPrivate;
