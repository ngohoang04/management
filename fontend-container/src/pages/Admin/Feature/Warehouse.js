import React, { useState, useEffect } from 'react';
import { 
  FiArchive,     // CORRECTED: Replaced FiWarehouse with FiArchive
  FiMapPin, 
  FiPackage,
  FiBarChart2,   // CORRECTED: Replaced FiBarChart3 with FiBarChart2
  FiSearch,
  FiFilter,
  FiEye
} from 'react-icons/fi';
import Modal from './Modal';

const Warehouse = ({ currentUser, addToast }) => {
  const [warehouseData, setWarehouseData] = useState({
    totalCapacity: 1000,
    usedCapacity: 750,
    availableSpaces: 250,
    zones: []
  });
  
  const [containers, setContainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoneFilter, setZoneFilter] = useState('all');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);

  useEffect(() => {
    // Mock warehouse data
    const mockZones = [
      {
        id: 'A',
        name: 'Khu A',
        capacity: 300,
        used: 250,
        available: 50,
        type: '20ft'
      },
      {
        id: 'B',
        name: 'Khu B',
        capacity: 400,
        used: 300,
        available: 100,
        type: '40ft'
      },
      {
        id: 'C',
        name: 'Khu C',
        capacity: 300,
        used: 200,
        available: 100,
        type: 'mixed'
      }
    ];

    const mockContainers = [
      {
        id: 1,
        containerNumber: 'MSKU-123456',
        location: 'A-01-15',
        zone: 'A',
        containerType: '20ft',
        status: 'stored',
        arrivalDate: '2024-01-15',
        qualityGrade: 'A',
        supplierName: 'Công ty ABC',
        weight: '15.5 tấn'
      },
      {
        id: 2,
        containerNumber: 'TCLU-789012',
        location: 'B-02-08',
        zone: 'B',
        containerType: '40ft',
        status: 'stored',
        arrivalDate: '2024-01-14',
        qualityGrade: 'B',
        supplierName: 'Công ty XYZ',
        weight: '22.3 tấn'
      },
      {
        id: 3,
        containerNumber: 'HLBU-345678',
        location: 'C-03-22',
        zone: 'C',
        containerType: '20ft',
        status: 'reserved',
        arrivalDate: '2024-01-13',
        qualityGrade: 'A',
        supplierName: 'Công ty DEF',
        weight: '18.7 tấn'
      }
    ];

    setWarehouseData(prev => ({
      ...prev,
      zones: mockZones
    }));
    
    setContainers(mockContainers);
  }, []);

  const filteredContainers = containers.filter(container => {
    const matchesSearch = container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           container.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           container.supplierName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesZone = zoneFilter === 'all' || container.zone === zoneFilter;
    
    return matchesSearch && matchesZone;
  });

  const handleViewLocation = (container) => {
    setSelectedContainer(container);
    setShowLocationModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stored': return '#22c55e';
      case 'reserved': return '#f59e0b';
      case 'moving': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'stored': return 'Đang lưu kho';
      case 'reserved': return 'Đã đặt chỗ';
      case 'moving': return 'Đang di chuyển';
      default: return 'Không xác định';
    }
  };

  const getCapacityPercentage = (used, total) => {
    return Math.round((used / total) * 100);
  };

  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return '#ef4444';
    if (percentage >= 75) return '#f59e0b';
    return '#22c55e';
  };

  return (
    <div className="warehouse">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý kho bãi</h2>
          <span className="page-subtitle">
            {warehouseData.usedCapacity}/{warehouseData.totalCapacity} vị trí đã sử dụng
          </span>
        </div>
      </div>

      {/* Warehouse Overview */}
      <div className="warehouse-overview">
        <div className="capacity-summary">
          <div className="capacity-card">
            <div className="capacity-header">
              <h3>Tổng quan kho</h3>
              <span className="capacity-percentage">
                {getCapacityPercentage(warehouseData.usedCapacity, warehouseData.totalCapacity)}%
              </span>
            </div>
            <div className="capacity-bar">
              <div 
                className="capacity-fill"
                style={{ 
                  width: `${getCapacityPercentage(warehouseData.usedCapacity, warehouseData.totalCapacity)}%`,
                  backgroundColor: getCapacityColor(getCapacityPercentage(warehouseData.usedCapacity, warehouseData.totalCapacity))
                }}
              ></div>
            </div>
            <div className="capacity-details">
              <div className="capacity-item">
                <span className="label">Đã sử dụng:</span>
                <span className="value">{warehouseData.usedCapacity}</span>
              </div>
              <div className="capacity-item">
                <span className="label">Còn trống:</span>
                <span className="value">{warehouseData.availableSpaces}</span>
              </div>
              <div className="capacity-item">
                <span className="label">Tổng cộng:</span>
                <span className="value">{warehouseData.totalCapacity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Zone Overview */}
        <div className="zones-overview">
          <h3>Tình trạng các khu vực</h3>
          <div className="zones-grid">
            {warehouseData.zones.map(zone => {
              const percentage = getCapacityPercentage(zone.used, zone.capacity);
              return (
                <div key={zone.id} className="zone-card">
                  <div className="zone-header">
                    <h4>{zone.name}</h4>
                    <span className="zone-type">{zone.type}</span>
                  </div>
                  <div className="zone-capacity">
                    <div className="zone-bar">
                      <div 
                        className="zone-fill"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: getCapacityColor(percentage)
                        }}
                      ></div>
                    </div>
                    <div className="zone-stats">
                      <span>{zone.used}/{zone.capacity}</span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Container Search and Filter */}
      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm container, vị trí..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-bar">
          <FiFilter className="filter-icon" />
          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả khu vực</option>
            {warehouseData.zones.map(zone => (
              <option key={zone.id} value={zone.id}>Khu {zone.id}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Container List */}
      <div className="containers-table">
        <table>
          <thead>
            <tr>
              <th>Số Container</th>
              <th>Vị trí</th>
              <th>Khu vực</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Ngày nhập</th>
              <th>Chất lượng</th>
              <th>Nhà cung cấp</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredContainers.map(container => (
              <tr key={container.id}>
                <td className="container-number">{container.containerNumber}</td>
                <td className="location">{container.location}</td>
                <td>Khu {container.zone}</td>
                <td>{container.containerType}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(container.status)}20`,
                      color: getStatusColor(container.status)
                    }}
                  >
                    {getStatusText(container.status)}
                  </span>
                </td>
                <td>{container.arrivalDate}</td>
                <td>
                  <span className="quality-grade">{container.qualityGrade}</span>
                </td>
                <td>{container.supplierName}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleViewLocation(container)}
                      title="Xem vị trí"
                    >
                      <FiMapPin />
                    </button>
                    <button
                      className="action-btn action-btn--secondary"
                      title="Xem chi tiết"
                    >
                      <FiEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContainers.length === 0 && (
          <div className="empty-state">
            <FiArchive size={48} /> {/* CORRECTED USAGE */}
            <h3>Không tìm thấy container</h3>
            <p>Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </div>

      {/* Location Detail Modal */}
      <Modal 
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        title={`Vị trí Container - ${selectedContainer?.containerNumber}`}
        size="medium"
      >
        {selectedContainer && (
          <div className="location-detail">
            <div className="location-map">
              <div className="map-placeholder">
                <FiMapPin size={48} />
                <p>Sơ đồ kho bãi</p>
                <p>Vị trí: <strong>{selectedContainer.location}</strong></p>
              </div>
            </div>
            
            <div className="location-info">
              <h4>Thông tin chi tiết</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Container:</label>
                  <span>{selectedContainer.containerNumber}</span>
                </div>
                <div className="info-item">
                  <label>Vị trí:</label>
                  <span>{selectedContainer.location}</span>
                </div>
                <div className="info-item">
                  <label>Khu vực:</label>
                  <span>Khu {selectedContainer.zone}</span>
                </div>
                <div className="info-item">
                  <label>Loại:</label>
                  <span>{selectedContainer.containerType}</span>
                </div>
                <div className="info-item">
                  <label>Trọng lượng:</label>
                  <span>{selectedContainer.weight}</span>
                </div>
                <div className="info-item">
                  <label>Chất lượng:</label>
                  <span>{selectedContainer.qualityGrade}</span>
                </div>
              </div>
            </div>

            <div className="location-actions">
              <button className="btn btn-secondary">
                <FiMapPin />
                Di chuyển vị trí
              </button>
              <button className="btn btn-primary">
                <FiPackage />
                Chuẩn bị xuất kho
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Warehouse;