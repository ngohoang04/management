import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiTruck, 
  FiPackage, 
  FiArchive,      // CORRECTED: Replaced FiWarehouse with FiArchive
  FiAlertTriangle,
  FiTrendingUp,
  FiActivity,
  FiUsers,
  FiCheckCircle
} from 'react-icons/fi';

const Dashboard = ({ currentUser, addToast }) => {
  const [stats, setStats] = useState({
    totalContainers: 0,
    inboundToday: 0,
    outboundToday: 0,
    qualityPending: 0,
    warehouseCapacity: 0,
    activeTransports: 0,
    totalCustomers: 0,
    qualityPassed: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [containersByStatus, setContainersByStatus] = useState([]);

  useEffect(() => {
    // Simulate API calls
    setStats({
      totalContainers: 1250,
      inboundToday: 45,
      outboundToday: 38,
      qualityPending: 12,
      warehouseCapacity: 85,
      activeTransports: 23,
      totalCustomers: 156,
      qualityPassed: 95
    });

    setRecentActivities([
      {
        id: 1,
        type: 'inbound',
        message: 'Container MSKU-123456 đã nhập kho',
        time: '10 phút trước',
        status: 'success'
      },
      {
        id: 2,
        type: 'quality',
        message: 'Hoàn thành kiểm tra chất lượng lô BATCH-789',
        time: '25 phút trước',
        status: 'info'
      },
      {
        id: 3,
        type: 'outbound',
        message: 'Xuất kho 15 container cho khách hàng ABC Corp',
        time: '1 giờ trước',
        status: 'success'
      },
      {
        id: 4,
        type: 'transport',
        message: 'Xe tải VN-001 đã khởi hành giao hàng',
        time: '2 giờ trước',
        status: 'warning'
      }
    ]);

    setContainersByStatus([
      { status: 'Trong kho', count: 850, color: '#22c55e' },
      { status: 'Đang vận chuyển', count: 200, color: '#3b82f6' },
      { status: 'Chờ kiểm tra', count: 120, color: '#f59e0b' },
      { status: 'Có vấn đề', count: 80, color: '#ef4444' }
    ]);
  }, []);

  // Defensive check for currentUser (to prevent 'name' property errors)
  if (!currentUser) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu người dùng...</div>;
  }

  const statCards = [
    {
      title: 'Tổng Container',
      value: stats.totalContainers.toLocaleString(),
      icon: FiPackage,
      color: 'blue',
      change: '+12% so với tháng trước'
    },
    {
      title: 'Nhập hôm nay',
      value: stats.inboundToday,
      icon: FiTruck,
      color: 'green',
      change: '+5 so với hôm qua'
    },
    {
      title: 'Xuất hôm nay',
      value: stats.outboundToday,
      icon: FiArchive, // CORRECTED USAGE
      color: 'purple',
      change: '+8 so với hôm qua'
    },
    {
      title: 'Chờ kiểm tra',
      value: stats.qualityPending,
      icon: FiAlertTriangle,
      color: 'orange',
      change: '-3 so với hôm qua'
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'inbound': return <FiTruck />;
      case 'outbound': return <FiPackage />;
      case 'quality': return <FiCheckCircle />;
      case 'transport': return <FiActivity />;
      default: return <FiActivity />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success': return '#22c55e';
      case 'warning': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#3b82f6';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard Tổng quan</h2>
        <p>Chào mừng trở lại, {currentUser.name}</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`stat-card stat-card--${stat.color}`}>
              <div className="stat-card-header">
                <div className="stat-card-icon">
                  <Icon />
                </div>
                <div className="stat-card-value">{stat.value}</div>
              </div>
              <div className="stat-card-title">{stat.title}</div>
              <div className="stat-card-change">{stat.change}</div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <div className="section-header">
            <h3>Tình trạng kho</h3>
            {/* CORRECTED LINKING */}
            <Link to="/admin/warehouse" className="section-action">
              Xem chi tiết
            </Link>
          </div>
          
          <div className="warehouse-status">
            <div className="capacity-indicator">
              <div className="capacity-label">
                <span>Công suất kho</span>
                <span className="capacity-value">{stats.warehouseCapacity}%</span>
              </div>
              <div className="capacity-bar">
                <div 
                  className="capacity-progress"
                  style={{ width: `${stats.warehouseCapacity}%` }}
                ></div>
              </div>
            </div>
            
            <div className="status-breakdown">
              {containersByStatus.map((item, index) => (
                <div key={index} className="status-item">
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="status-info">
                    <span className="status-label">{item.status}</span>
                    <span className="status-count">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <div className="section-header">
            <h3>Hoạt động gần đây</h3>
            {/* CORRECTED LINKING */}
            <Link to="/admin/reports" className="section-action">
              Xem tất cả
            </Link>
          </div>
          
          <div className="recent-activities">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div 
                  className="activity-icon"
                  style={{ color: getActivityColor(activity.status) }}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div className="activity-content">
                  <div className="activity-message">{activity.message}</div>
                  <div className="activity-time">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <h3>Biểu đồ hoạt động</h3>
        </div>
        <div className="activity-chart">
          <div className="chart-placeholder">
            <FiTrendingUp size={48} />
            <p>Biểu đồ thống kê nhập-xuất container theo thời gian</p>
            <small>Dữ liệu cập nhật theo thời gian thực</small>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h3>Thao tác nhanh</h3>
        <div className="action-grid">
          {/* CORRECTED LINKING */}
          <Link to="/admin/inbound" className="action-card">
            <FiTruck className="action-icon" />
            <span>Nhập Container</span>
          </Link>
          {/* CORRECTED LINKING */}
          <Link to="/admin/quality-control" className="action-card">
            <FiCheckCircle className="action-icon" />
            <span>Kiểm tra chất lượng</span>
          </Link>
          {/* CORRECTED LINKING */}
          <Link to="/admin/outbound" className="action-card">
            <FiPackage className="action-icon" />
            <span>Xuất kho</span>
          </Link>
          {/* CORRECTED LINKING */}
          <Link to="/admin/reports" className="action-card">
            <FiTrendingUp className="action-icon" />
            <span>Xem báo cáo</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;