import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter,
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiTrash2,
  FiEye,
  FiMoreVertical,
  FiBox // Đã thêm FiBox
} from 'react-icons/fi';
import Modal from './Modal';

const Containers = ({ currentUser, addToast }) => {
  // KHAI BÁO STATE ĐÃ SỬA CHỮA ĐỂ KHẮC PHỤC LỖI 'is not defined'
  const [containers, setContainers] = useState([]);
  const [filteredContainers, setFilteredContainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContainer, setSelectedContainer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [logs, setLogs] = useState('');

  useEffect(() => {
    // Simulate API call
    const mockContainers = [
      {
        id: 1,
        name: 'web-server-01',
        image: 'nginx:latest',
        status: 'running',
        cpu: '0.5%',
        memory: '128MB',
        ports: '80:8080',
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: 2,
        name: 'database-01',
        image: 'postgres:13',
        status: 'running',
        cpu: '1.2%',
        memory: '512MB',
        ports: '5432:5432',
        createdAt: '2024-01-15T09:15:00Z'
      },
      {
        id: 3,
        name: 'api-server-01',
        image: 'node:18-alpine',
        status: 'stopped',
        cpu: '0%',
        memory: '0MB',
        ports: '3000:3000',
        createdAt: '2024-01-14T16:20:00Z'
      },
      {
        id: 4,
        name: 'redis-cache',
        image: 'redis:6-alpine',
        status: 'running',
        cpu: '0.1%',
        memory: '64MB',
        ports: '6379:6379',
        createdAt: '2024-01-14T14:10:00Z'
      },
      {
        id: 5,
        name: 'monitoring-01',
        image: 'prometheus:latest',
        status: 'error',
        cpu: '0%',
        memory: '0MB',
        ports: '9090:9090',
        createdAt: '2024-01-13T11:45:00Z'
      }
    ];
    
    setContainers(mockContainers);
    setFilteredContainers(mockContainers);
  }, []);

  useEffect(() => {
    let filtered = containers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(container =>
        container.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        container.image.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(container => container.status === statusFilter);
    }

    setFilteredContainers(filtered);
  }, [containers, searchTerm, statusFilter]);

  const handleAction = async (action, container) => {
    try {
      switch (action) {
        case 'start':
          setContainers(prev => prev.map(c => 
            c.id === container.id ? { ...c, status: 'running' } : c
          ));
          addToast(`Container ${container.name} started successfully`, 'success');
          break;
        case 'stop':
          setContainers(prev => prev.map(c => 
            c.id === container.id ? { ...c, status: 'stopped' } : c
          ));
          addToast(`Container ${container.name} stopped successfully`, 'success');
          break;
        case 'restart':
          setContainers(prev => prev.map(c => 
            c.id === container.id ? { ...c, status: 'running' } : c
          ));
          addToast(`Container ${container.name} restarted successfully`, 'success');
          break;
        case 'delete':
          setSelectedContainer(container);
          setShowDeleteModal(true);
          break;
        case 'logs':
          setSelectedContainer(container);
          setLogs(`[${new Date().toISOString()}] Container ${container.name} logs:\n[INFO] Application started\n[INFO] Listening on port 8080\n[DEBUG] Database connected\n[INFO] Ready to accept connections`);
          setShowLogsModal(true);
          break;
        default:
          break;
      }
    } catch (error) {
      addToast(`Failed to ${action} container: ${error.message}`, 'error');
    }
  };

  const confirmDelete = () => {
    setContainers(prev => prev.filter(c => c.id !== selectedContainer.id));
    addToast(`Container ${selectedContainer.name} deleted successfully`, 'success');
    setShowDeleteModal(false);
    setSelectedContainer(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return '#22c55e';
      case 'stopped': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="containers-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Containers</h2>
          <span className="page-subtitle">{filteredContainers.length} containers</span>
        </div>
        <Link to="/containers/new" className="btn btn-primary">
          <FiPlus />
          New Container
        </Link>
      </div>

      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search containers..."
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
            <option value="all">All Status</option>
            <option value="running">Running</option>
            <option value="stopped">Stopped</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="containers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Ports</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContainers.map(container => (
              <tr key={container.id}>
                <td>
                  <Link 
                    to={`/containers/${container.id}`} 
                    className="container-name-link"
                  >
                    {container.name}
                  </Link>
                </td>
                <td className="container-image">{container.image}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(container.status)}20`,
                      color: getStatusColor(container.status)
                    }}
                  >
                    {container.status}
                  </span>
                </td>
                <td>{container.cpu}</td>
                <td>{container.memory}</td>
                <td>{container.ports}</td>
                <td>
                  <div className="action-buttons">
                    {container.status === 'stopped' ? (
                      <button
                        className="action-btn action-btn--success"
                        onClick={() => handleAction('start', container)}
                        title="Start"
                      >
                        <FiPlay />
                      </button>
                    ) : (
                      <button
                        className="action-btn action-btn--warning"
                        onClick={() => handleAction('stop', container)}
                        title="Stop"
                      >
                        <FiPause />
                      </button>
                    )}
                    
                    <button
                      className="action-btn action-btn--info"
                      onClick={() => handleAction('restart', container)}
                      title="Restart"
                    >
                      <FiRotateCcw />
                    </button>
                    
                    <button
                      className="action-btn action-btn--secondary"
                      onClick={() => handleAction('logs', container)}
                      title="View Logs"
                    >
                      <FiEye />
                    </button>
                    
                    <button
                      className="action-btn action-btn--danger"
                      onClick={() => handleAction('delete', container)}
                      title="Delete"
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
            <FiBox size={48} />
            <h3>No containers found</h3>
            <p>
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Get started by creating your first container'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Link to="/containers/new" className="btn btn-primary">
                Create Container
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Container"
      >
        <div className="modal-content">
          <p>Are you sure you want to delete the container <strong>{selectedContainer?.name}</strong>?</p>
          <p className="text-danger">This action cannot be undone.</p>
          
          <div className="modal-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
            <button 
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              Delete Container
            </button>
          </div>
        </div>
      </Modal>

      {/* Logs Modal */}
      <Modal 
        isOpen={showLogsModal}
        onClose={() => setShowLogsModal(false)}
        title={`Logs - ${selectedContainer?.name}`}
        size="large"
      >
        <div className="modal-content">
          <pre className="logs-content">{logs}</pre>
          
          <div className="modal-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => setShowLogsModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Containers;