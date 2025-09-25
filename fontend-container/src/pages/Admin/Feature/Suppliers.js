import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiUserCheck,
  FiPhone,
  FiMail,
  FiMapPin,
  FiEdit,
  FiTrash2,
  FiEye,
  FiStar
} from 'react-icons/fi';
import Modal from './Modal';

const Suppliers = ({ currentUser, addToast }) => {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [supplierData, setSupplierData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    taxCode: '',
    supplierType: 'domestic',
    rating: 5,
    paymentTerms: '30',
    notes: ''
  });

  useEffect(() => {
    // Mock supplier data
    const mockSuppliers = [
      {
        id: 1,
        name: 'Công ty TNHH Vận tải ABC',
        contactPerson: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'contact@abc-transport.com',
        address: 'Hải Phòng',
        taxCode: '0123456789',
        supplierType: 'domestic',
        rating: 4.5,
        paymentTerms: '30',
        totalContracts: 25,
        totalValue: '5,500,000,000',
        lastDelivery: '2024-01-15',
        status: 'active',
        onTimeRate: 95
      },
      {
        id: 2,
        name: 'International Shipping Co.',
        contactPerson: 'John Smith',
        phone: '+1234567890',
        email: 'info@intlshipping.com',
        address: 'Singapore',
        taxCode: 'SG123456789',
        supplierType: 'international',
        rating: 4.8,
        paymentTerms: '45',
        totalContracts: 18,
        totalValue: '8,200,000,000',
        lastDelivery: '2024-01-14',
        status: 'active',
        onTimeRate: 98
      }
    ];
    
    setSuppliers(mockSuppliers);
    setFilteredSuppliers(mockSuppliers);
  }, []);

  useEffect(() => {
    const filtered = suppliers.filter(supplier =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.phone.includes(searchTerm) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  }, [suppliers, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSupplierData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setSupplierData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      taxCode: '',
      supplierType: 'domestic',
      rating: 5,
      paymentTerms: '30',
      notes: ''
    });
  };

  const handleCreateSupplier = async (e) => {
    e.preventDefault();
    
    try {
      const newSupplier = {
        id: Date.now(),
        ...supplierData,
        totalContracts: 0,
        totalValue: '0',
        lastDelivery: null,
        status: 'active',
        onTimeRate: 100,
        createdDate: new Date().toISOString()
      };
      
      setSuppliers(prev => [newSupplier, ...prev]);
      addToast('Nhà cung cấp đã được thêm thành công', 'success');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      addToast(`Lỗi khi thêm nhà cung cấp: ${error.message}`, 'error');
    }
  };

  const handleViewDetail = (supplier) => {
    setSelectedSupplier(supplier);
    setShowDetailModal(true);
  };

  const getSupplierTypeColor = (type) => {
    switch (type) {
      case 'domestic': return '#3b82f6';
      case 'international': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getSupplierTypeText = (type) => {
    switch (type) {
      case 'domestic': return 'Trong nước';
      case 'international': return 'Quốc tế';
      default: return 'Không xác định';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#22c55e';
    if (rating >= 3.5) return '#f59e0b';
    return '#ef4444';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FiStar key={`empty-${i}`} className="star" />);
    }

    return stars;
  };

  return (
    <div className="suppliers">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý nhà cung cấp</h2>
          <span className="page-subtitle">{filteredSuppliers.length} nhà cung cấp</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus />
          Thêm nhà cung cấp
        </button>
      </div>

      <div className="supplier-stats">
        <div className="stat-card stat-card--blue">
          <div className="stat-value">{suppliers.length}</div>
          <div className="stat-label">Tổng NCC</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-value">{suppliers.filter(s => s.status === 'active').length}</div>
          <div className="stat-label">Đang hoạt động</div>
        </div>
        <div className="stat-card stat-card--purple">
          <div className="stat-value">
            {suppliers.reduce((sum, s) => sum + s.totalContracts, 0)}
          </div>
          <div className="stat-label">Tổng hợp đồng</div>
        </div>
        <div className="stat-card stat-card--orange">
          <div className="stat-value">
            {suppliers.length > 0 
              ? Math.round(suppliers.reduce((sum, s) => sum + s.onTimeRate, 0) / suppliers.length)
              : 0}%
          </div>
          <div className="stat-label">Tỷ lệ đúng hạn</div>
        </div>
      </div>

      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm nhà cung cấp..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="suppliers-table">
        <table>
          <thead>
            <tr>
              <th>Tên nhà cung cấp</th>
              <th>Người liên hệ</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Loại</th>
              <th>Đánh giá</th>
              <th>Đúng hạn</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredSuppliers.map(supplier => (
              <tr key={supplier.id}>
                <td className="supplier-name">{supplier.name}</td>
                <td>{supplier.contactPerson}</td>
                <td>{supplier.phone}</td>
                <td>{supplier.email}</td>
                <td>{supplier.address}</td>
                <td>
                  <span 
                    className="supplier-type-badge"
                    style={{ 
                      backgroundColor: `${getSupplierTypeColor(supplier.supplierType)}20`,
                      color: getSupplierTypeColor(supplier.supplierType)
                    }}
                  >
                    {getSupplierTypeText(supplier.supplierType)}
                  </span>
                </td>
                <td>
                  <div className="rating">
                    <div className="stars">
                      {renderStars(supplier.rating)}
                    </div>
                    <span className="rating-value">{supplier.rating}</span>
                  </div>
                </td>
                <td>
                  <span 
                    className="on-time-rate"
                    style={{ color: getRatingColor(supplier.onTimeRate / 20) }}
                  >
                    {supplier.onTimeRate}%
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleViewDetail(supplier)}
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

        {filteredSuppliers.length === 0 && (
          <div className="empty-state">
            <FiUserCheck size={48} />
            <h3>Không tìm thấy nhà cung cấp</h3>
            <p>
              {searchTerm 
                ? 'Thử điều chỉnh từ khóa tìm kiếm'
                : 'Bắt đầu bằng cách thêm nhà cung cấp đầu tiên'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Supplier Modal */}
      <Modal 
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Thêm nhà cung cấp mới"
        size="large"
      >
        <form onSubmit={handleCreateSupplier} className="supplier-form">
          <div className="form-section">
            <h4>Thông tin công ty</h4>
            <div className="form-group">
              <label htmlFor="name">Tên nhà cung cấp *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={supplierData.name}
                onChange={handleInputChange}
                placeholder="Công ty TNHH ABC"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="taxCode">Mã số thuế</label>
                <input
                  type="text"
                  id="taxCode"
                  name="taxCode"
                  value={supplierData.taxCode}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
              <div className="form-group">
                <label htmlFor="supplierType">Loại nhà cung cấp</label>
                <select
                  id="supplierType"
                  name="supplierType"
                  value={supplierData.supplierType}
                  onChange={handleInputChange}
                >
                  <option value="domestic">Trong nước</option>
                  <option value="international">Quốc tế</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <textarea
                id="address"
                name="address"
                value={supplierData.address}
                onChange={handleInputChange}
                rows="2"
                placeholder="Địa chỉ chi tiết..."
              />
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin liên hệ</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contactPerson">Người liên hệ *</label>
                <input
                  type="text"
                  id="contactPerson"
                  name="contactPerson"
                  value={supplierData.contactPerson}
                  onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={supplierData.phone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={supplierData.email}
                onChange={handleInputChange}
                placeholder="contact@company.com"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="rating">Đánh giá ban đầu</label>
                <select
                  id="rating"
                  name="rating"
                  value={supplierData.rating}
                  onChange={handleInputChange}
                >
                  <option value="5">5 sao - Xuất sắc</option>
                  <option value="4">4 sao - Tốt</option>
                  <option value="3">3 sao - Trung bình</option>
                  <option value="2">2 sao - Kém</option>
                  <option value="1">1 sao - Rất kém</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="paymentTerms">Điều kiện thanh toán (ngày)</label>
                <input
                  type="number"
                  id="paymentTerms"
                  name="paymentTerms"
                  value={supplierData.paymentTerms}
                  onChange={handleInputChange}
                  placeholder="30"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={supplierData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ghi chú về nhà cung cấp..."
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
              Thêm nhà cung cấp
            </button>
          </div>
        </form>
      </Modal>

      {/* Supplier Detail Modal */}
      <Modal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Chi tiết nhà cung cấp - ${selectedSupplier?.name}`}
        size="large"
      >
        {selectedSupplier && (
          <div className="supplier-detail">
            <div className="detail-grid">
              <div className="detail-section">
                <h4>Thông tin cơ bản</h4>
                <div className="detail-item">
                  <FiUserCheck />
                  <div>
                    <label>Tên nhà cung cấp:</label>
                    <span>{selectedSupplier.name}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiPhone />
                  <div>
                    <label>Người liên hệ:</label>
                    <span>{selectedSupplier.contactPerson}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiPhone />
                  <div>
                    <label>Điện thoại:</label>
                    <span>{selectedSupplier.phone}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiMail />
                  <div>
                    <label>Email:</label>
                    <span>{selectedSupplier.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiMapPin />
                  <div>
                    <label>Địa chỉ:</label>
                    <span>{selectedSupplier.address}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Hiệu suất làm việc</h4>
                <div className="performance-stats">
                  <div className="stat-item">
                    <span className="stat-value">{selectedSupplier.totalContracts}</span>
                    <span className="stat-label">Tổng hợp đồng</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedSupplier.totalValue}</span>
                    <span className="stat-label">Tổng giá trị (VNĐ)</span>
                  </div>
                  <div className="stat-item">
                    <div className="rating-display">
                      <div className="stars">
                        {renderStars(selectedSupplier.rating)}
                      </div>
                      <span className="rating-value">{selectedSupplier.rating}/5</span>
                    </div>
                    <span className="stat-label">Đánh giá</span>
                  </div>
                  <div className="stat-item">
                    <span 
                      className="stat-value"
                      style={{ color: getRatingColor(selectedSupplier.onTimeRate / 20) }}
                    >
                      {selectedSupplier.onTimeRate}%
                    </span>
                    <span className="stat-label">Tỷ lệ đúng hạn</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="supplier-actions">
              <button className="btn btn-secondary">
                <FiEdit />
                Chỉnh sửa thông tin
              </button>
              <button className="btn btn-primary">
                <FiPlus />
                Tạo hợp đồng mới
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Suppliers;