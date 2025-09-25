import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleLogoutAndNavigate = () => {
    onLogout(); // Chạy logic đăng xuất tùy chỉnh (xóa token, session)
    navigate('/'); // Điều hướng về trang chủ
  };

  if (!currentUser) {
    return (
      <header className="header header--loading">
        <div className="header-left">
          <h1 className="header-title">Container WMS</h1>
        </div>
        <div className="header-right">
          <FiUser size={20} style={{ marginRight: '10px' }} />
          <span>Loading User...</span>
        </div>
      </header>
    );
  }

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
              src={avatar}
              alt={name}
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
            <button 
              className="user-action-btn logout-btn" 
              onClick={handleLogoutAndNavigate}
            >
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