import React from 'react';
import './LayoutDefaut.css';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaRegMoon, FaUserCircle, FaBars } from 'react-icons/fa';

const LayoutDefaut = () => {
  return (
    <div className="layout-container">
      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h4>QUẢN LÝ CONTAINER</h4>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <NavLink to="/" end>
                <FaHome className="nav-icon" />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/login">
                <FaSignInAlt className="nav-icon" />
                <span>Login</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* ===== MAIN AREA ===== */}
      <div className="main-area">
        {/* ===== HEADER ===== */}
        <header className="header">
          <div className="header-left">
            {/* <FaBars className="menu-icon" /> */}
          </div>
          <div className="header-user-info">
            <FaRegMoon className="theme-icon" />
            <div className="user-details">
              <FaUserCircle className="user-avatar" />
              {/* <div className="user-text">
                <span className="user-name">Admin</span>
                <span className="user-role">Quản Lý Kho</span>
              </div> */}
            </div>
          </div>
        </header>

        {/* ===== PAGE CONTENT ===== */}
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutDefaut;