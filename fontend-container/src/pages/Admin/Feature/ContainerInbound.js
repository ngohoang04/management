import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiTruck,
  FiPackage,
  FiCalendar,
  FiMapPin,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi';
import Modal from './Modal';

const ContainerInbound = ({ currentUser, addToast }) => {
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [formData, setFormData] = useState({
    containerNumber: '',
    batchNumber: '',
    supplierName: '',
    supplierContact: '',
    origin: '',
    arrivalDate: '',
    arrivalTime: '',
    containerType: '20ft',
    quantity: 1,
    weight: '',
    description: '',
    driverName: '',
    vehicleNumber: '',
    notes: ''
  });

  useEffect(() => {
    // Mock data
    const mockContainers = [
      {
        id: 1,
        containerNumber: 'MSKU-123456',
        batchNumber: 'BATCH-001',
        supplierName: 'Công ty TNHH ABC',
        origin: 'Hải Phòng',
        arrivalDate: '2024-01-15',
        arrivalTime: '08:30',
        containerType: '20ft',
        quantity: 1,
        weight: '15.5 tấn',
        status: 'received',
        driverName: 'Nguyễn Văn A',
        vehicleNumber: '29A-12345'
      },
      {
        id: 2,
        containerNumber: 'TCLU-789012',
        batchNumber: 'BATCH-002',
        supplierName: 'Công ty XYZ',
        origin: 'TP.HCM',
        arrivalDate: '2024-01-15',
        arrivalTime: '10:15',
        containerType: '40ft',
        quantity: 1,
        weight: '22.3 tấn',
        status: 'pending',
        driverName: 'Trần Văn B',
        vehicleNumber: '51B-67890'
      }
    ];
    
    setContainers(mockContainers);
    setFilteredContainers(mockContainers);
  }, []);

  useEffect(() => {
    let filtered = containers;

    if (searchTerm) {
      filtered = filtered.filter(container =>
        container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        container.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        container.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(container => container.status === statusFilter);
    }

    setFilteredContainers(filtered);
  }, [containers, searchTerm, statusFilter]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      containerNumber: '',
      batchNumber: '',
      supplierName: '',
      supplierContact: '',
      origin: '',
      arrivalDate: '',
      arrivalTime: '',
      containerType: '20ft',
      quantity: 1,
      weight: '',
      description: '',
      driverName: '',
      vehicleNumber: '',
      notes: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newContainer = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      setContainers(prev => [newContainer, ...prev]);
      addToast('Container đã được tiếp nhận thành công', 'success');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      addToast(`Lỗi khi tiếp nhận container: ${error.message}`, 'error');
    }
  };

  const handleViewDetail = (container) => {
    setSelectedContainer(container);
    setShowDetailModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return '#22c55e';
      case 'pending': return '#f59e0b';
      case 'rejected': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'received': return 'Đã tiếp nhận';
      case 'pending': return 'Chờ xử lý';
      case 'rejected': return 'Từ chối';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="container-inbound">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý nhập Container</h2>
          <span className="page-subtitle">{filteredContainers.length} container</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus />
          Tiếp nhận Container
        </button>
      </div>

      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm container..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-bar">
          <FiFilter className="filter-icon" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="received">Đã tiếp nhận</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>
      </div>

      <div className="containers-table">
        <table>
          <thead>
            <tr>
              <th>Số Container</th>
              <th>Số lô</th>
              <th>Nhà cung cấp</th>
              <th>Xuất xứ</th>
              <th>Ngày nhập</th>
              <th>Loại</th>
              <th>Trọng lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredContainers.map(container => (
              <tr key={container.id}>
                <td className="container-number">{container.containerNumber}</td>
                <td>{container.batchNumber}</td>
                <td>{container.supplierName}</td>
                <td>{container.origin}</td>
                <td>{container.arrivalDate} {container.arrivalTime}</td>
                <td>{container.containerType}</td>
                <td>{container.weight}</td>
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
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleViewDetail(container)}
                      title="Xem chi tiết"
                    >
                      <FiEye />
                    </button>
                    <button
                      className="action-btn action-btn--secondary"
                      title="Chỉnh sửa"
                    >
                      <FiEdit />
                    </button>
                    <button
                      className="action-btn action-btn--danger"
                      title="Xóa"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredContainers.length === 0 && (
          <div className="empty-state">
            <FiTruck size={48} />
            <h3>Không tìm thấy container</h3>
            <p>
              {searchTerm || statusFilter !== 'all' 
                ? 'Thử điều chỉnh từ khóa tìm kiếm hoặc bộ lọc'
                : 'Bắt đầu bằng cách tiếp nhận container đầu tiên'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Container Modal */}
      <Modal 
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Tiếp nhận Container mới"
        size="large"
      >
        <form onSubmit={handleSubmit} className="container-form">
          <div className="form-section">
            <h4>Thông tin Container</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="containerNumber">Số Container *</label>
                <input
                  type="text"
                  id="containerNumber"
                  name="containerNumber"
                  value={formData.containerNumber}
                  onChange={handleInputChange}
                  placeholder="MSKU-123456"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="batchNumber">Số lô hàng *</label>
                <input
                  type="text"
                  id="batchNumber"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  placeholder="BATCH-001"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="containerType">Loại Container</label>
                <select
                  id="containerType"
                  name="containerType"
                  value={formData.containerType}
                  onChange={handleInputChange}
                >
                  <option value="20ft">20ft</option>
                  <option value="40ft">40ft</option>
                  <option value="40ft-hc">40ft High Cube</option>
                  <option value="45ft">45ft</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="weight">Trọng lượng</label>
                <input
                  type="text"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="15.5 tấn"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin Nhà cung cấp</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="supplierName">Tên nhà cung cấp *</label>
                <input
                  type="text"
                  id="supplierName"
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleInputChange}
                  placeholder="Công ty TNHH ABC"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplierContact">Liên hệ</label>
                <input
                  type="text"
                  id="supplierContact"
                  name="supplierContact"
                  value={formData.supplierContact}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="origin">Xuất xứ *</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleInputChange}
                placeholder="Hải Phòng"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin vận chuyển</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="arrivalDate">Ngày đến *</label>
                <input
                  type="date"
                  id="arrivalDate"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="arrivalTime">Giờ đến</label>
                <input
                  type="time"
                  id="arrivalTime"
                  name="arrivalTime"
                  value={formData.arrivalTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="driverName">Tên tài xế</label>
                <input
                  type="text"
                  id="driverName"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleNumber">Biển số xe</label>
                <input
                  type="text"
                  id="vehicleNumber"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleInputChange}
                  placeholder="29A-12345"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="description">Mô tả hàng hóa</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Mô tả chi tiết về hàng hóa trong container..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="2"
                placeholder="Ghi chú thêm..."
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
              Tiếp nhận Container
            </button>
          </div>
        </form>
      </Modal>

      {/* Detail Modal */}
      <Modal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Chi tiết Container"
        size="large"
      >
        {selectedContainer && (
          <div className="container-detail">
            <div className="detail-grid">
              <div className="detail-section">
                <h4>Thông tin cơ bản</h4>
                <div className="detail-item">
                  <label>Số Container:</label>
                  <span>{selectedContainer.containerNumber}</span>
                </div>
                <div className="detail-item">
                  <label>Số lô:</label>
                  <span>{selectedContainer.batchNumber}</span>
                </div>
                <div className="detail-item">
                  <label>Loại:</label>
                  <span>{selectedContainer.containerType}</span>
                </div>
                <div className="detail-item">
                  <label>Trọng lượng:</label>
                  <span>{selectedContainer.weight}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Nhà cung cấp</h4>
                <div className="detail-item">
                  <label>Tên:</label>
                  <span>{selectedContainer.supplierName}</span>
                </div>
                <div className="detail-item">
                  <label>Xuất xứ:</label>
                  <span>{selectedContainer.origin}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Vận chuyển</h4>
                <div className="detail-item">
                  <label>Tài xế:</label>
                  <span>{selectedContainer.driverName}</span>
                </div>
                <div className="detail-item">
                  <label>Biển số:</label>
                  <span>{selectedContainer.vehicleNumber}</span>
                </div>
                <div className="detail-item">
                  <label>Thời gian đến:</label>
                  <span>{selectedContainer.arrivalDate} {selectedContainer.arrivalTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ContainerInbound;