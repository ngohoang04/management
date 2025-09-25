import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiTruck, 
  FiMapPin,
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiEye,
  FiEdit,
  FiPackage // CORRECTED: Added FiPackage icon
} from 'react-icons/fi';
import Modal from './Modal';

const Transport = ({ currentUser, addToast }) => {
  // CORRECTED: State variables and setter functions are now correctly destructured
  const [transports, setTransports] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [transportData, setTransportData] = useState({
    orderNumber: '',
    driverName: '',
    driverPhone: '',
    vehicleNumber: '',
    vehicleType: 'truck',
    departureDate: '',
    estimatedArrival: '',
    route: '',
    containers: [],
    notes: ''
  });

  useEffect(() => {
    // Mock transport data
    const mockTransports = [
      {
        id: 1,
        transportNumber: 'TRP-001',
        orderNumber: 'OUT-001',
        driverName: 'Nguyễn Văn A',
        driverPhone: '0123456789',
        vehicleNumber: '29A-12345',
        vehicleType: 'truck',
        departureDate: '2024-01-15',
        estimatedArrival: '2024-01-16',
        actualArrival: null,
        route: 'Hà Nội → TP.HCM',
        status: 'in_transit',
        containers: ['MSKU-123456', 'TCLU-789012'],
        currentLocation: 'Nghệ An',
        progress: 45
      },
      {
        id: 2,
        transportNumber: 'TRP-002',
        orderNumber: 'OUT-002',
        driverName: 'Trần Văn B',
        driverPhone: '0987654321',
        vehicleNumber: '51B-67890',
        vehicleType: 'truck',
        departureDate: '2024-01-14',
        estimatedArrival: '2024-01-15',
        actualArrival: '2024-01-15',
        route: 'Hà Nội → Đà Nẵng',
        status: 'delivered',
        containers: ['HLBU-345678'],
        currentLocation: 'Đà Nẵng',
        progress: 100
      }
    ];
    
    setTransports(mockTransports);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransportData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setTransportData({
      orderNumber: '',
      driverName: '',
      driverPhone: '',
      vehicleNumber: '',
      vehicleType: 'truck',
      departureDate: '',
      estimatedArrival: '',
      route: '',
      containers: [],
      notes: ''
    });
  };

  const handleCreateTransport = async (e) => {
    e.preventDefault();
    
    try {
      const newTransport = {
        id: Date.now(),
        transportNumber: `TRP-${String(transports.length + 1).padStart(3, '0')}`,
        ...transportData,
        status: 'scheduled',
        progress: 0,
        currentLocation: 'Kho xuất phát',
        createdDate: new Date().toISOString()
      };
      
      setTransports(prev => [newTransport, ...prev]);
      addToast('Kế hoạch vận chuyển đã được tạo thành công', 'success');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      addToast(`Lỗi khi tạo kế hoạch vận chuyển: ${error.message}`, 'error');
    }
  };

  const handleViewTracking = (transport) => {
    setSelectedTransport(transport);
    setShowTrackingModal(true);
  };

  const updateTransportStatus = (transportId, newStatus) => {
    setTransports(prev => prev.map(transport => 
      transport.id === transportId 
        ? { 
            ...transport, 
            status: newStatus,
            actualArrival: newStatus === 'delivered' ? new Date().toISOString().split('T')[0] : null
          }
        : transport
    ));
    
    const statusText = getStatusText(newStatus);
    addToast(`Trạng thái vận chuyển đã cập nhật: ${statusText}`, 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return '#f59e0b';
      case 'in_transit': return '#3b82f6';
      case 'delivered': return '#22c55e';
      case 'delayed': return '#ef4444';
      case 'cancelled': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'scheduled': return 'Đã lên lịch';
      case 'in_transit': return 'Đang vận chuyển';
      case 'delivered': return 'Đã giao hàng';
      case 'delayed': return 'Bị trễ';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="transport">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý vận chuyển</h2>
          <span className="page-subtitle">{transports.length} chuyến vận chuyển</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus />
          Tạo kế hoạch vận chuyển
        </button>
      </div>

      <div className="transport-stats">
        <div className="stat-card stat-card--yellow">
          <div className="stat-value">{transports.filter(t => t.status === 'scheduled').length}</div>
          <div className="stat-label">Đã lên lịch</div>
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-value">{transports.filter(t => t.status === 'in_transit').length}</div>
          <div className="stat-label">Đang vận chuyển</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-value">{transports.filter(t => t.status === 'delivered').length}</div>
          <div className="stat-label">Đã giao hàng</div>
        </div>
        <div className="stat-card stat-card--red">
          <div className="stat-value">{transports.filter(t => t.status === 'delayed').length}</div>
          <div className="stat-label">Bị trễ</div>
        </div>
      </div>

      <div className="transports-table">
        <table>
          <thead>
            <tr>
              <th>Mã vận chuyển</th>
              <th>Đơn hàng</th>
              <th>Tài xế</th>
              <th>Xe</th>
              <th>Tuyến đường</th>
              <th>Ngày khởi hành</th>
              <th>Dự kiến đến</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {transports.map(transport => (
              <tr key={transport.id}>
                <td className="transport-number">{transport.transportNumber}</td>
                <td>{transport.orderNumber}</td>
                <td>
                  <div>
                    <div>{transport.driverName}</div>
                    <small>{transport.driverPhone}</small>
                  </div>
                </td>
                <td>{transport.vehicleNumber}</td>
                <td>{transport.route}</td>
                <td>{transport.departureDate}</td>
                <td>{transport.estimatedArrival}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(transport.status)}20`,
                      color: getStatusColor(transport.status)
                    }}
                  >
                    {getStatusText(transport.status)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleViewTracking(transport)}
                      title="Theo dõi"
                    >
                      <FiMapPin />
                    </button>
                    {transport.status === 'scheduled' && (
                      <button
                        className="action-btn action-btn--success"
                        onClick={() => updateTransportStatus(transport.id, 'in_transit')}
                        title="Bắt đầu vận chuyển"
                      >
                        <FiTruck />
                      </button>
                    )}
                    {transport.status === 'in_transit' && (
                      <button
                        className="action-btn action-btn--success"
                        onClick={() => updateTransportStatus(transport.id, 'delivered')}
                        title="Xác nhận giao hàng"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      className="action-btn action-btn--secondary"
                      title="Chỉnh sửa"
                    >
                      <FiEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Transport Modal */}
      <Modal 
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Tạo kế hoạch vận chuyển"
        size="large"
      >
        <form onSubmit={handleCreateTransport} className="transport-form">
          <div className="form-section">
            <h4>Thông tin đơn hàng</h4>
            <div className="form-group">
              <label htmlFor="orderNumber">Số đơn hàng *</label>
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={transportData.orderNumber}
                onChange={handleInputChange}
                placeholder="OUT-001"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin tài xế & xe</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="driverName">Tên tài xế *</label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={transportData.driverName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="driverPhone">Số điện thoại</label>
                <input
                  type="text"
                  id="driverPhone"
                  name="driverPhone"
                  value={transportData.driverPhone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vehicleNumber">Biển số xe *</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={transportData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="29A-12345"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleType">Loại xe</label>
                <select
                  id="vehicleType"
                  name="vehicleType"
                  value={transportData.vehicleType}
                  onChange={handleInputChange}
                >
                  <option value="truck">Xe tải</option>
                  <option value="trailer">Xe đầu kéo</option>
                  <option value="container_truck">Xe container</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin vận chuyển</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="departureDate">Ngày khởi hành *</label>
                <input
                  type="date"
                  id="departureDate"
                  name="departureDate"
                  value={transportData.departureDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="estimatedArrival">Dự kiến đến</label>
                <input
                  type="date"
                  id="estimatedArrival"
                  name="estimatedArrival"
                  value={transportData.estimatedArrival}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="route">Tuyến đường *</label>
              <input
                type="text"
                id="route"
                name="route"
                value={transportData.route}
                onChange={handleInputChange}
                placeholder="Hà Nội → TP.HCM"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={transportData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ghi chú về vận chuyển..."
              />
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCreateModal(false);
                resetForm();
              }}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Tạo kế hoạch
            </button>
          </div>
        </form>
      </Modal>

      {/* Tracking Modal */}
      <Modal 
        isOpen={showTrackingModal}
        onClose={() => setShowTrackingModal(false)}
        title={`Theo dõi vận chuyển - ${selectedTransport?.transportNumber}`}
        size="large"
      >
        {selectedTransport && (
          <div className="tracking-info">
            <div className="tracking-header">
              <div className="transport-info">
                <h4>{selectedTransport.transportNumber}</h4>
                <p>Tuyến: {selectedTransport.route}</p>
                <p>Tài xế: {selectedTransport.driverName} - {selectedTransport.driverPhone}</p>
                <p>Xe: {selectedTransport.vehicleNumber}</p>
              </div>
              <div className="transport-status">
                <span 
                  className="status-badge status-badge--large"
                  style={{ 
                    backgroundColor: `${getStatusColor(selectedTransport.status)}20`,
                    color: getStatusColor(selectedTransport.status)
                  }}
                >
                  {getStatusText(selectedTransport.status)}
                </span>
              </div>
            </div>

            <div className="progress-section">
              <h4>Tiến độ vận chuyển</h4>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${selectedTransport.progress}%` }}
                ></div>
              </div>
              <div className="progress-info">
                <span>Vị trí hiện tại: {selectedTransport.currentLocation}</span>
                <span>{selectedTransport.progress}%</span>
              </div>
            </div>

            <div className="containers-section">
              <h4>Container vận chuyển</h4>
              <div className="container-list">
                {selectedTransport.containers.map((containerNumber, index) => (
                  <div key={index} className="container-item">
                    <FiPackage />
                    <span>{containerNumber}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="timeline-section">
              <h4>Lịch sử vận chuyển</h4>
              <div className="timeline">
                <div className="timeline-item completed">
                  <div className="timeline-icon">
                    <FiCheck />
                  </div>
                  <div className="timeline-content">
                    <h5>Khởi hành</h5>
                    <p>{selectedTransport.departureDate}</p>
                  </div>
                </div>
                
                {selectedTransport.status === 'in_transit' && (
                  <div className="timeline-item active">
                    <div className="timeline-icon">
                      <FiTruck />
                    </div>
                    <div className="timeline-content">
                      <h5>Đang vận chuyển</h5>
                      <p>Vị trí: {selectedTransport.currentLocation}</p>
                    </div>
                  </div>
                )}
                
                <div className={`timeline-item ${selectedTransport.status === 'delivered' ? 'completed' : ''}`}>
                  <div className="timeline-icon">
                    <FiMapPin />
                  </div>
                  <div className="timeline-content">
                    <h5>Giao hàng</h5>
                    <p>
                      {selectedTransport.actualArrival 
                        ? selectedTransport.actualArrival 
                        : `Dự kiến: ${selectedTransport.estimatedArrival}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Transport;