import React from 'react';
import { 
  FiMenu, 
  FiSun, 
  FiMoon, 
  FiUser, 
  FiLogOut,
  FiBell,
  FiSettings
} from 'react-icons/fi';

const Header = ({ 
  currentUser, 
  theme, 
  toggleTheme, 
  onLogout, 
  sidebarCollapsed, 
  setSidebarCollapsed 
}) => {

  // FIX: Add early return check for safety.
  if (!currentUser) {
    return (
      <header className="header header--loading">
        <div className="header-left">
          {/* <h1 className="header-title">Container WMS</h1> */}
        </div>
        <div className="header-right">
          <FiUser size={20} style={{ marginRight: '10px' }} />
          <span>Loading User...</span>
        </div>
      </header>
    );
  }

  // Use variables for clarity (already using destructuring)
  const { name, avatar, department } = currentUser;

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <FiMenu />
        </button>
        <div className="header-brand">
          <h1 className="header-title">Container WMS</h1>
          <span className="header-subtitle">Hệ thống quản lý kho container</span>
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn notification-btn">
          <FiBell />
          <span className="notification-badge">5</span>
        </button>

        <button className="header-btn theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>

        <div className="user-menu">
          <div className="user-info">
            <img 
              src={avatar} // Using destructured variable
              alt={name}   // Using destructured variable
              className="user-avatar"
            />
            <div className="user-details">
              <span className="user-name">{name}</span>           
              <span className="user-role">{department}</span>  
            </div>
          </div>
          
          <div className="user-actions">
            <button className="user-action-btn">
              <FiSettings />
              Cài đặt
            </button>
            <button className="user-action-btn logout-btn" onClick={onLogout}>
              <FiLogOut />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;