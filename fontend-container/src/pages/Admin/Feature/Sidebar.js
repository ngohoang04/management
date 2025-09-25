import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiTruck, 
  FiCheckSquare,
  FiPackage,
  FiMapPin,
  FiArchive,
  FiUsers,
  FiUserCheck,
  FiBarChart2, 
  FiSettings,
  FiChevronRight
} from 'react-icons/fi';

const Sidebar = ({ currentUser, collapsed, setCollapsed }) => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/admin/dashboard', 
      icon: FiHome,
      label: 'Dashboard',
      roles: ['admin', 'staff', 'viewer']
    },
    {
      path: '/admin/inbound',
      icon: FiTruck,
      label: 'Nhập Container',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/quality-control',
      icon: FiCheckSquare,
      label: 'Kiểm tra chất lượng',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/outbound', 
      icon: FiPackage,
      label: 'Xuất kho',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/transport', // ĐÃ SỬA
      icon: FiMapPin,
      label: 'Vận chuyển',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/warehouse', // ĐÃ SỬA
      icon: FiArchive, 
      label: 'Quản lý kho',
      roles: ['admin', 'staff', 'viewer']
    },
    {
      path: '/admin/customers', // ĐÃ SỬA
      icon: FiUsers,
      label: 'Khách hàng',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/suppliers', // ĐÃ SỬA
      icon: FiUserCheck,
      label: 'Nhà cung cấp',
      roles: ['admin', 'staff']
    },
    {
      path: '/admin/reports', // ĐÃ SỬA
      icon: FiBarChart2, 
      label: 'Báo cáo',
      roles: ['admin', 'staff', 'viewer']
    },
    // {
    //   path: '/admin/settings', // ĐÃ SỬA
    //   icon: FiSettings,
    //   label: 'Cài đặt',
    //   roles: ['admin', 'staff', 'viewer']
    // }
  ];

  // KIỂM TRA PHÒNG NGỪA cho currentUser.role trước khi dùng filter
  const filteredMenuItems = menuItems.filter(item => 
    currentUser?.role && item.roles.includes(currentUser.role)
  );

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        {filteredMenuItems.map(item => {
          const Icon = item.icon;
          
          // Dùng startsWith để highlight đúng cả các route con có params (ví dụ: /admin/containers/123)
          const isActive = location.pathname.startsWith(item.path); 
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="sidebar-icon" />
              {!collapsed && (
                <>
                  <span className="sidebar-label">{item.label}</span>
                  {isActive && <FiChevronRight className="active-indicator" />}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && currentUser && ( 
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <img 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="sidebar-user-avatar"
            />
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{currentUser.name}</span>
              <span className="sidebar-user-role">{currentUser.role}</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;