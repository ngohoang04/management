import React, { useState } from 'react';
import { 
  FiUser, 
  FiLock, 
  FiBell,
  FiSave,
  FiCamera,
  FiShield,
  FiGlobe,
  FiSun,
  FiMoon
} from 'react-icons/fi';

const Settings = ({ currentUser, setCurrentUser, theme, toggleTheme, addToast }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    department: currentUser.department,
    avatar: currentUser.avatar
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    containerAlerts: true,
    systemAlerts: false,
    qualityAlerts: true,
    transportAlerts: true
  });

  const tabs = [
    { id: 'profile', label: 'Hồ sơ', icon: FiUser },
    { id: 'security', label: 'Bảo mật', icon: FiShield },
    { id: 'notifications', label: 'Thông báo', icon: FiBell },
    { id: 'preferences', label: 'Tùy chọn', icon: FiGlobe }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      setCurrentUser(prev => ({
        ...prev,
        name: profileForm.name,
        email: profileForm.email,
        department: profileForm.department,
        avatar: profileForm.avatar
      }));
      addToast('Cập nhật hồ sơ thành công', 'success');
    } catch (error) {
      addToast('Lỗi khi cập nhật hồ sơ', 'error');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      addToast('Mật khẩu phải có ít nhất 6 ký tự', 'error');
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addToast('Đổi mật khẩu thành công', 'success');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      addToast('Lỗi khi đổi mật khẩu', 'error');
    }
  };

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const saveNotificationSettings = () => {
    addToast('Cài đặt thông báo đã được lưu', 'success');
  };

  const renderProfileTab = () => (
    <div className="settings-section">
      <h3>Thông tin hồ sơ</h3>
      <form onSubmit={handleProfileSubmit}>
        <div className="profile-avatar">
          <img 
            src={profileForm.avatar} 
            alt="Profile" 
            className="avatar-preview"
          />
          <button type="button" className="avatar-edit-btn">
            <FiCamera />
            Đổi ảnh
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
          <input
            type="text"
            id="name"
            value={profileForm.name}
            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={profileForm.email}
            onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Phòng ban</label>
          <input
            type="text"
            id="department"
            value={profileForm.department}
            onChange={(e) => setProfileForm(prev => ({ ...prev, department: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label>Vai trò</label>
          <input
            type="text"
            value={currentUser.role}
            disabled
            className="form-input--disabled"
          />
          <small>Liên hệ quản trị viên để thay đổi vai trò</small>
        </div>

        <button type="submit" className="btn btn-primary">
          <FiSave />
          Lưu thay đổi
        </button>
      </form>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="settings-section">
      <h3>Đổi mật khẩu</h3>
      <form onSubmit={handlePasswordSubmit}>
        <div className="form-group">
          <label htmlFor="currentPassword">Mật khẩu hiện tại</label>
          <input
            type="password"
            id="currentPassword"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Mật khẩu mới</label>
          <input
            type="password"
            id="newPassword"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            id="confirmPassword"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <FiLock />
          Cập nhật mật khẩu
        </button>
      </form>

      <div className="security-info">
        <h4>Lưu ý bảo mật</h4>
        <ul>
          <li>Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
          <li>Bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt</li>
          <li>Không sử dụng lại mật khẩu từ tài khoản khác</li>
          <li>Thay đổi mật khẩu định kỳ</li>
        </ul>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="settings-section">
      <h3>Cài đặt thông báo</h3>
      
      <div className="notification-settings">
        <div className="notification-item">
          <div className="notification-info">
            <h4>Thông báo Email</h4>
            <p>Nhận thông báo qua email</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={() => handleNotificationChange('emailNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Thông báo Push</h4>
            <p>Nhận thông báo trên trình duyệt</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.pushNotifications}
              onChange={() => handleNotificationChange('pushNotifications')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Cảnh báo Container</h4>
            <p>Thông báo khi có vấn đề với container</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.containerAlerts}
              onChange={() => handleNotificationChange('containerAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Cảnh báo Chất lượng</h4>
            <p>Thông báo khi kiểm tra chất lượng không đạt</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.qualityAlerts}
              onChange={() => handleNotificationChange('qualityAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Cảnh báo Vận chuyển</h4>
            <p>Thông báo về tình trạng vận chuyển</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.transportAlerts}
              onChange={() => handleNotificationChange('transportAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="notification-item">
          <div className="notification-info">
            <h4>Cảnh báo Hệ thống</h4>
            <p>Thông báo bảo trì và cập nhật hệ thống</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={notifications.systemAlerts}
              onChange={() => handleNotificationChange('systemAlerts')}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>

      <button 
        className="btn btn-primary"
        onClick={saveNotificationSettings}
      >
        <FiSave />
        Lưu cài đặt thông báo
      </button>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="settings-section">
      <h3>Tùy chọn</h3>
      
      <div className="preference-item">
        <div className="preference-info">
          <h4>Giao diện</h4>
          <p>Chọn giao diện sáng hoặc tối</p>
        </div>
        <button 
          className="theme-toggle-btn"
          onClick={toggleTheme}
        >
          {theme === 'light' ? <FiMoon /> : <FiSun />}
          {theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
        </button>
      </div>

      <div className="preference-item">
        <div className="preference-info">
          <h4>Ngôn ngữ</h4>
          <p>Chọn ngôn ngữ hiển thị</p>
        </div>
        <select className="preference-select" defaultValue="vi">
          <option value="vi">Tiếng Việt</option>
          <option value="en">English</option>
          <option value="zh">中文</option>
          <option value="ja">日本語</option>
        </select>
      </div>

      <div className="preference-item">
        <div className="preference-info">
          <h4>Múi giờ</h4>
          <p>Thiết lập múi giờ địa phương</p>
        </div>
        <select className="preference-select" defaultValue="Asia/Ho_Chi_Minh">
          <option value="Asia/Ho_Chi_Minh">Việt Nam (UTC+7)</option>
          <option value="Asia/Singapore">Singapore (UTC+8)</option>
          <option value="Asia/Tokyo">Tokyo (UTC+9)</option>
          <option value="UTC">UTC (UTC+0)</option>
        </select>
      </div>

      <div className="preference-item">
        <div className="preference-info">
          <h4>Số dòng mỗi trang</h4>
          <p>Số lượng bản ghi hiển thị trên mỗi trang</p>
        </div>
        <select className="preference-select" defaultValue="25">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <div className="preference-item">
        <div className="preference-info">
          <h4>Định dạng ngày</h4>
          <p>Chọn định dạng hiển thị ngày tháng</p>
        </div>
        <select className="preference-select" defaultValue="dd/mm/yyyy">
          <option value="dd/mm/yyyy">DD/MM/YYYY</option>
          <option value="mm/dd/yyyy">MM/DD/YYYY</option>
          <option value="yyyy-mm-dd">YYYY-MM-DD</option>
        </select>
      </div>

      <button className="btn btn-primary">
        <FiSave />
        Lưu tùy chọn
      </button>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'preferences':
        return renderPreferencesTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Cài đặt</h2>
        <p>Quản lý tài khoản và tùy chọn hệ thống</p>
      </div>

      <div className="settings-layout">
        <div className="settings-sidebar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="settings-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;