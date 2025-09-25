import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiUsers,
  FiPhone,
  FiMail,
  FiMapPin,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi';
import Modal from './Modal';

const Customers = ({ currentUser, addToast }) => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerData, setCustomerData] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    taxCode: '',
    customerType: 'regular',
    creditLimit: '',
    notes: ''
  });

  useEffect(() => {
    // Mock customer data
    const mockCustomers = [
      {
        id: 1,
        name: 'Công ty TNHH ABC',
        contactPerson: 'Nguyễn Văn A',
        phone: '0123456789',
        email: 'contact@abc.com',
        address: 'Hà Nội',
        taxCode: '0123456789',
        customerType: 'vip',
        creditLimit: '1,000,000,000',
        totalOrders: 45,
        totalValue: '15,500,000,000',
        lastOrderDate: '2024-01-15',
        status: 'active'
      },
      {
        id: 2,
        name: 'Công ty XYZ',
        contactPerson: 'Trần Thị B',
        phone: '0987654321',
        email: 'info@xyz.com',
        address: 'TP.HCM',
        taxCode: '0987654321',
        customerType: 'regular',
        creditLimit: '500,000,000',
        totalOrders: 23,
        totalValue: '8,200,000,000',
        lastOrderDate: '2024-01-14',
        status: 'active'
      }
    ];
    
    setCustomers(mockCustomers);
    setFilteredCustomers(mockCustomers);
  }, []);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(filtered);
  }, [customers, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setCustomerData({
      name: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      taxCode: '',
      customerType: 'regular',
      creditLimit: '',
      notes: ''
    });
  };

  const handleCreateCustomer = async (e) => {
    e.preventDefault();
    
    try {
      const newCustomer = {
        id: Date.now(),
        ...customerData,
        totalOrders: 0,
        totalValue: '0',
        lastOrderDate: null,
        status: 'active',
        createdDate: new Date().toISOString()
      };
      
      setCustomers(prev => [newCustomer, ...prev]);
      addToast('Khách hàng đã được thêm thành công', 'success');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      addToast(`Lỗi khi thêm khách hàng: ${error.message}`, 'error');
    }
  };

  const handleViewDetail = (customer) => {
    setSelectedCustomer(customer);
    setShowDetailModal(true);
  };

  const getCustomerTypeColor = (type) => {
    switch (type) {
      case 'vip': return '#ef4444';
      case 'regular': return '#3b82f6';
      case 'new': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getCustomerTypeText = (type) => {
    switch (type) {
      case 'vip': return 'VIP';
      case 'regular': return 'Thường';
      case 'new': return 'Mới';
      default: return 'Không xác định';
    }
  };

  return (
    <div className="customers">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý khách hàng</h2>
          <span className="page-subtitle">{filteredCustomers.length} khách hàng</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <FiPlus />
          Thêm khách hàng
        </button>
      </div>

      <div className="customer-stats">
        <div className="stat-card stat-card--blue">
          <div className="stat-value">{customers.length}</div>
          <div className="stat-label">Tổng khách hàng</div>
        </div>
        <div className="stat-card stat-card--red">
          <div className="stat-value">{customers.filter(c => c.customerType === 'vip').length}</div>
          <div className="stat-label">Khách hàng VIP</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-value">{customers.filter(c => c.status === 'active').length}</div>
          <div className="stat-label">Đang hoạt động</div>
        </div>
        <div className="stat-card stat-card--purple">
          <div className="stat-value">
            {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
          </div>
          <div className="stat-label">Tổng đơn hàng</div>
        </div>
      </div>

      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Tên công ty</th>
              <th>Người liên hệ</th>
              <th>Điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Loại KH</th>
              <th>Tổng đơn</th>
              <th>Đơn cuối</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map(customer => (
              <tr key={customer.id}>
                <td className="customer-name">{customer.name}</td>
                <td>{customer.contactPerson}</td>
                <td>{customer.phone}</td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>
                  <span 
                    className="customer-type-badge"
                    style={{ 
                      backgroundColor: `${getCustomerTypeColor(customer.customerType)}20`,
                      color: getCustomerTypeColor(customer.customerType)
                    }}
                  >
                    {getCustomerTypeText(customer.customerType)}
                  </span>
                </td>
                <td>{customer.totalOrders}</td>
                <td>{customer.lastOrderDate || 'Chưa có'}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleViewDetail(customer)}
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

        {filteredCustomers.length === 0 && (
          <div className="empty-state">
            <FiUsers size={48} />
            <h3>Không tìm thấy khách hàng</h3>
            <p>
              {searchTerm 
                ? 'Thử điều chỉnh từ khóa tìm kiếm'
                : 'Bắt đầu bằng cách thêm khách hàng đầu tiên'
              }
            </p>
          </div>
        )}
      </div>

      {/* Create Customer Modal */}
      <Modal 
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          resetForm();
        }}
        title="Thêm khách hàng mới"
        size="large"
      >
        <form onSubmit={handleCreateCustomer} className="customer-form">
          <div className="form-section">
            <h4>Thông tin công ty</h4>
            <div className="form-group">
              <label htmlFor="name">Tên công ty *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerData.name}
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
                  value={customerData.taxCode}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerType">Loại khách hàng</label>
                <select
                  id="customerType"
                  name="customerType"
                  value={customerData.customerType}
                  onChange={handleInputChange}
                >
                  <option value="new">Mới</option>
                  <option value="regular">Thường</option>
                  <option value="vip">VIP</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <textarea
                id="address"
                name="address"
                value={customerData.address}
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
                  value={customerData.contactPerson}
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
                  value={customerData.phone}
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
                value={customerData.email}
                onChange={handleInputChange}
                placeholder="contact@company.com"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="form-group">
              <label htmlFor="creditLimit">Hạn mức tín dụng</label>
              <input
                type="text"
                id="creditLimit"
                name="creditLimit"
                value={customerData.creditLimit}
                onChange={handleInputChange}
                placeholder="1,000,000,000"
              />
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={customerData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ghi chú về khách hàng..."
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
              Thêm khách hàng
            </button>
          </div>
        </form>
      </Modal>

      {/* Customer Detail Modal */}
      <Modal 
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title={`Chi tiết khách hàng - ${selectedCustomer?.name}`}
        size="large"
      >
        {selectedCustomer && (
          <div className="customer-detail">
            <div className="detail-grid">
              <div className="detail-section">
                <h4>Thông tin cơ bản</h4>
                <div className="detail-item">
                  <FiUsers />
                  <div>
                    <label>Tên công ty:</label>
                    <span>{selectedCustomer.name}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiPhone />
                  <div>
                    <label>Người liên hệ:</label>
                    <span>{selectedCustomer.contactPerson}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiPhone />
                  <div>
                    <label>Điện thoại:</label>
                    <span>{selectedCustomer.phone}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiMail />
                  <div>
                    <label>Email:</label>
                    <span>{selectedCustomer.email}</span>
                  </div>
                </div>
                <div className="detail-item">
                  <FiMapPin />
                  <div>
                    <label>Địa chỉ:</label>
                    <span>{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Thông tin kinh doanh</h4>
                <div className="business-stats">
                  <div className="stat-item">
                    <span className="stat-value">{selectedCustomer.totalOrders}</span>
                    <span className="stat-label">Tổng đơn hàng</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedCustomer.totalValue}</span>
                    <span className="stat-label">Tổng giá trị (VNĐ)</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedCustomer.creditLimit}</span>
                    <span className="stat-label">Hạn mức tín dụng</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{selectedCustomer.lastOrderDate || 'Chưa có'}</span>
                    <span className="stat-label">Đơn hàng cuối</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="customer-actions">
              <button className="btn btn-secondary">
                <FiEdit />
                Chỉnh sửa thông tin
              </button>
              <button className="btn btn-primary">
                <FiPlus />
                Tạo đơn hàng mới
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Customers;