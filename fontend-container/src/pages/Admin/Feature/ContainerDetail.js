import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiPlay, 
  FiPause, 
  FiRotateCcw, 
  FiTrash2,
  FiEye,
  FiEdit,
  FiCpu,
  FiHardDrive,
  FiActivity,
  FiClock
} from 'react-icons/fi';

const ContainerDetail = ({ currentUser, addToast }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [container, setContainer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockContainer = {
        id: parseInt(id),
        name: 'web-server-01',
        image: 'nginx:latest',
        status: 'running',
        cpu: '0.5%',
        memory: '128MB',
        ports: '80:8080',
        volumes: '/var/www/html:/usr/share/nginx/html',
        environment: {
          NODE_ENV: 'production',
          PORT: '8080',
          DATABASE_URL: 'postgres://localhost:5432/mydb'
        },
        networks: ['bridge'],
        createdAt: '2024-01-15T10:30:00Z',
        startedAt: '2024-01-15T10:30:05Z',
        uptime: '2 days, 14 hours',
        restartCount: 0,
        logs: 'Sample log output would appear here...'
      };
      
      setContainer(mockContainer);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAction = async (action) => {
    try {
      switch (action) {
        case 'start':
          setContainer(prev => ({ ...prev, status: 'running' }));
          addToast(`Container ${container.name} started successfully`, 'success');
          break;
        case 'stop':
          setContainer(prev => ({ ...prev, status: 'stopped' }));
          addToast(`Container ${container.name} stopped successfully`, 'success');
          break;
        case 'restart':
          setContainer(prev => ({ ...prev, status: 'running' }));
          addToast(`Container ${container.name} restarted successfully`, 'success');
          break;
        case 'delete':
          addToast(`Container ${container.name} deleted successfully`, 'success');
          navigate('/containers');
          break;
        default:
          break;
      }
    } catch (error) {
      addToast(`Failed to ${action} container: ${error.message}`, 'error');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return '#22c55e';
      case 'stopped': return '#f59e0b';
      case 'error': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="container-detail">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading container details...</p>
        </div>
      </div>
    );
  }

  if (!container) {
    return (
      <div className="container-detail">
        <div className="error-state">
          <h3>Container not found</h3>
          <p>The container you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={() => navigate('/containers')}>
            Back to Containers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-detail">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/containers')}>
            <FiArrowLeft />
          </button>
          <div>
            <h2>{container.name}</h2>
            <span className="container-image">{container.image}</span>
          </div>
        </div>
        
        <div className="header-actions">
          <span 
            className="status-badge status-badge--large"
            style={{ 
              backgroundColor: `${getStatusColor(container.status)}20`,
              color: getStatusColor(container.status)
            }}
          >
            {container.status}
          </span>
          
          <div className="action-buttons">
            {container.status === 'stopped' ? (
              <button
                className="btn btn-success"
                onClick={() => handleAction('start')}
              >
                <FiPlay />
                Start
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => handleAction('stop')}
              >
                <FiPause />
                Stop
              </button>
            )}
            
            <button
              className="btn btn-info"
              onClick={() => handleAction('restart')}
            >
              <FiRotateCcw />
              Restart
            </button>
            
            <button
              className="btn btn-secondary"
            >
              <FiEdit />
              Edit
            </button>
            
            <button
              className="btn btn-danger"
              onClick={() => handleAction('delete')}
            >
              <FiTrash2 />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div className="container-details-grid">
        <div className="detail-section">
          <h3>Overview</h3>
          <div className="detail-cards">
            <div className="detail-card">
              <FiCpu className="detail-icon" />
              <div>
                <span className="detail-label">CPU Usage</span>
                <span className="detail-value">{container.cpu}</span>
              </div>
            </div>
            
            <div className="detail-card">
              <FiActivity className="detail-icon" />
              <div>
                <span className="detail-label">Memory</span>
                <span className="detail-value">{container.memory}</span>
              </div>
            </div>
            
            <div className="detail-card">
              <FiHardDrive className="detail-icon" />
              <div>
                <span className="detail-label">Disk I/O</span>
                <span className="detail-value">2.3 MB/s</span>
              </div>
            </div>
            
            <div className="detail-card">
              <FiClock className="detail-icon" />
              <div>
                <span className="detail-label">Uptime</span>
                <span className="detail-value">{container.uptime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Configuration</h3>
          <div className="config-grid">
            <div className="config-item">
              <label>Ports</label>
              <span>{container.ports}</span>
            </div>
            
            <div className="config-item">
              <label>Volumes</label>
              <span>{container.volumes}</span>
            </div>
            
            <div className="config-item">
              <label>Networks</label>
              <span>{container.networks.join(', ')}</span>
            </div>
            
            <div className="config-item">
              <label>Restart Count</label>
              <span>{container.restartCount}</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Environment Variables</h3>
          <div className="env-vars">
            {Object.entries(container.environment).map(([key, value]) => (
              <div key={key} className="env-var">
                <span className="env-key">{key}</span>
                <span className="env-value">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section detail-section--full">
          <div className="section-header">
            <h3>Logs</h3>
            <button className="btn btn-secondary">
              <FiEye />
              View Full Logs
            </button>
          </div>
          <div className="logs-preview">
            <pre>{container.logs}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerDetail;