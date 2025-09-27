import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
  FiSearch, 
  FiPackage,
  FiTruck,
  
  FiCheck,
  FiClock,
  FiEye,
  FiEdit
} from 'react-icons/fi';
import Modal from './Modal';

const Link = ({ currentUser, addToast }) => {
  const [orders, setOrders] = useState([]);
  const [containers, setContainers] = useState([]);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderData, setOrderData] = useState({
    orderNumber: '',
    customerName: '',
    customerContact: '',
    deliveryAddress: '',
    requestedDate: '',
    containerType: '20ft',
    quantity: 1,
    notes: '',
    priority: 'medium'
  });

  useEffect(() => {
    // Mock outbound orders
    const mockOrders = [
      {
        id: 1,
        orderNumber: 'OUT-001',
        customerName: 'Công ty TNHH XYZ',
        customerContact: '0123456789',
        deliveryAddress: 'Hà Nội',
        requestedDate: '2024-01-16',
        containerType: '20ft',
        quantity: 2,
        status: 'pending',
        priority: 'high',
        createdDate: '2024-01-15'
      },
      {
        id: 2,
        orderNumber: 'OUT-002',
        customerName: 'Công ty ABC',
        customerContact: '0987654321',
        deliveryAddress: 'TP.HCM',
        requestedDate: '2024-01-17',
        containerType: '40ft',
        quantity: 1,
        status: 'processing',
        priority: 'medium',
        createdDate: '2024-01-15'
      }
    ];

    // Mock available containers
    const mockContainers = [
      {
        id: 1,
        containerNumber: 'MSKU-123456',
        containerType: '20ft',
        status: 'available',
        qualityGrade: 'A',
        location: 'A-01-15'
      },
      {
        id: 2,
        containerNumber: 'TCLU-789012',
        containerType: '40ft',
        status: 'available',
        qualityGrade: 'B',
        location: 'B-02-08'
      }
    ];
    
    setOrders(mockOrders);
    setContainers(mockContainers);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetOrderForm = () => {
    setOrderData({
      orderNumber: '',
      customerName: '',
      customerContact: '',
      deliveryAddress: '',
      requestedDate: '',
      containerType: '20ft',
      quantity: 1,
      notes: '',
      priority: 'medium'
    });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    try {
      const newOrder = {
        id: Date.now(),
        ...orderData,
        orderNumber: `OUT-${String(orders.length + 1).padStart(3, '0')}`,
        status: 'pending',
        createdDate: new Date().toISOString().split('T')[0]
      };
      
      setOrders(prev => [newOrder, ...prev]);
      addToast('Đơn xuất kho đã được tạo thành công', 'success');
      setShowCreateOrderModal(false);
      resetOrderForm();
    } catch (error) {
      addToast(`Lỗi khi tạo đơn xuất kho: ${error.message}`, 'error');
    }
  };

  const handleProcessOrder = (order) => {
    setSelectedOrder(order);
    setShowProcessModal(true);
  };

  const handleCompleteOutbound = () => {
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: 'completed', completedDate: new Date().toISOString().split('T')[0] }
        : order
    ));
    
    addToast(`Đơn xuất kho ${selectedOrder.orderNumber} đã hoàn thành`, 'success');
    setShowProcessModal(false);
    setSelectedOrder(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'completed': return '#22c55e';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getAvailableContainers = (type) => {
    return containers.filter(c => c.containerType === type && c.status === 'available');
  };

  return (
    <div className="container-outbound">
      <div className="page-header">
        <div className="page-title">
          <h2>Quản lý xuất kho Container</h2>
          <span className="page-subtitle">{orders.length} đơn xuất kho</span>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateOrderModal(true)}
        >
          <FiPlus />
          Tạo đơn xuất kho
        </button>
      </div>

      <div className="outbound-stats">
        <div className="stat-card stat-card--yellow">
          <div className="stat-value">{orders.filter(o => o.status === 'pending').length}</div>
          <div className="stat-label">Chờ xử lý</div>
        </div>
        <div className="stat-card stat-card--blue">
          <div className="stat-value">{orders.filter(o => o.status === 'processing').length}</div>
          <div className="stat-label">Đang xử lý</div>
        </div>
        <div className="stat-card stat-card--green">
          <div className="stat-value">{orders.filter(o => o.status === 'completed').length}</div>
          <div className="stat-label">Hoàn thành</div>
        </div>
        <div className="stat-card stat-card--purple">
          <div className="stat-value">{containers.filter(c => c.status === 'available').length}</div>
          <div className="stat-label">Container sẵn sàng</div>
        </div>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Số đơn</th>
              <th>Khách hàng</th>
              <th>Địa chỉ giao</th>
              <th>Ngày yêu cầu</th>
              <th>Loại/SL</th>
              <th>Ưu tiên</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="order-number">{order.orderNumber}</td>
                <td>{order.customerName}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.requestedDate}</td>
                <td>{order.containerType} x{order.quantity}</td>
                <td>
                  <span 
                    className="priority-badge"
                    style={{ 
                      backgroundColor: `${getPriorityColor(order.priority)}20`,
                      color: getPriorityColor(order.priority)
                    }}
                  >
                    {order.priority === 'high' ? 'Cao' : 
                     order.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                </td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status)
                    }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    {order.status === 'pending' && (
                      <button
                        className="action-btn action-btn--success"
                        onClick={() => handleProcessOrder(order)}
                        title="Xử lý đơn hàng"
                      >
                        <FiCheck />
                      </button>
                    )}
                    <button
                      className="action-btn action-btn--info"
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Order Modal */}
      <Modal 
        isOpen={showCreateOrderModal}
        onClose={() => {
          setShowCreateOrderModal(false);
          resetOrderForm();
        }}
        title="Tạo đơn xuất kho mới"
        size="large"
      >
        <form onSubmit={handleCreateOrder} className="order-form">
          <div className="form-section">
            <h4>Thông tin khách hàng</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Tên khách hàng *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={orderData.customerName}
                  onChange={handleInputChange}
                  placeholder="Công ty TNHH ABC"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="customerContact">Liên hệ</label>
                <input
                  type="text"
                  id="customerContact"
                  name="customerContact"
                  value={orderData.customerContact}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="deliveryAddress">Địa chỉ giao hàng *</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={orderData.deliveryAddress}
                onChange={handleInputChange}
                rows="2"
                placeholder="Địa chỉ chi tiết..."
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h4>Thông tin đơn hàng</h4>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="requestedDate">Ngày yêu cầu giao *</label>
                <input
                  type="date"
                  id="requestedDate"
                  name="requestedDate"
                  value={orderData.requestedDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="priority">Mức độ ưu tiên</label>
                <select
                  id="priority"
                  name="priority"
                  value={orderData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">Thấp</option>
                  <option value="medium">Trung bình</option>
                  <option value="high">Cao</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="containerType">Loại Container</label>
                <select
                  id="containerType"
                  name="containerType"
                  value={orderData.containerType}
                  onChange={handleInputChange}
                >
                  <option value="20ft">20ft</option>
                  <option value="40ft">40ft</option>
                  <option value="40ft-hc">40ft High Cube</option>
                  <option value="45ft">45ft</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Số lượng</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={orderData.quantity}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="notes">Ghi chú</label>
              <textarea
                id="notes"
                name="notes"
                value={orderData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Ghi chú thêm về đơn hàng..."
              />
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowCreateOrderModal(false);
                resetOrderForm();
              }}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Tạo đơn xuất kho
            </button>
          </div>
        </form>
      </Modal>

      {/* Process Order Modal */}
      <Modal 
        isOpen={showProcessModal}
        onClose={() => setShowProcessModal(false)}
        title={`Xử lý đơn xuất kho - ${selectedOrder?.orderNumber}`}
        size="large"
      >
        {selectedOrder && (
          <div className="process-order">
            <div className="order-info">
              <h4>Thông tin đơn hàng</h4>
              <div className="info-grid">
                <div className="info-item">
                  <label>Khách hàng:</label>
                  <span>{selectedOrder.customerName}</span>
                </div>
                <div className="info-item">
                  <label>Địa chỉ giao:</label>
                  <span>{selectedOrder.deliveryAddress}</span>
                </div>
                <div className="info-item">
                  <label>Yêu cầu:</label>
                  <span>{selectedOrder.containerType} x{selectedOrder.quantity}</span>
                </div>
                <div className="info-item">
                  <label>Ngày giao:</label>
                  <span>{selectedOrder.requestedDate}</span>
                </div>
              </div>
            </div>

            <div className="available-containers">
              <h4>Container khả dụng ({selectedOrder.containerType})</h4>
              <div className="container-list">
                {getAvailableContainers(selectedOrder.containerType).map(container => (
                  <div key={container.id} className="container-item">
                    <div className="container-info">
                      <span className="container-number">{container.containerNumber}</span>
                      <span className="container-location">Vị trí: {container.location}</span>
                      <span className="container-grade">Chất lượng: {container.qualityGrade}</span>
                    </div>
                    <button className="btn btn-sm btn-secondary">
                      Chọn
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowProcessModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCompleteOutbound}
              >
                Hoàn thành xuất kho
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Link;