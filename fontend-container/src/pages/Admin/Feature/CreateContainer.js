import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';

const CreateContainer = ({ currentUser, addToast }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    tag: 'latest',
    ports: [{ host: '', container: '' }],
    volumes: [{ host: '', container: '' }],
    environment: [{ key: '', value: '' }],
    restartPolicy: 'unless-stopped',
    network: 'bridge',
    cpuLimit: '',
    memoryLimit: '',
    autoStart: true
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (type, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (type) => {
    const newItem = type === 'environment' 
      ? { key: '', value: '' }
      : { host: '', container: '' };
    
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], newItem]
    }));
  };

  const removeArrayItem = (type, index) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!formData.name || !formData.image) {
        addToast('Name and image are required', 'error');
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToast('Container created successfully', 'success');
      navigate('/containers');
    } catch (error) {
      addToast(`Failed to create container: ${error.message}`, 'error');
    }
  };

  return (
    <div className="create-container">
      <div className="page-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate('/containers')}>
            <FiArrowLeft />
          </button>
          <div>
            <h2>Create New Container</h2>
            <p>Configure your container settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container-form">
        <div className="form-grid">
          <div className="form-section">
            <h3>Basic Configuration</h3>
            
            <div className="form-group">
              <label htmlFor="name">Container Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="my-container"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="image">Image *</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="nginx"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  id="tag"
                  name="tag"
                  value={formData.tag}
                  onChange={handleInputChange}
                  placeholder="latest"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="network">Network</label>
                <select
                  id="network"
                  name="network"
                  value={formData.network}
                  onChange={handleInputChange}
                >
                  <option value="bridge">Bridge</option>
                  <option value="host">Host</option>
                  <option value="none">None</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="restartPolicy">Restart Policy</label>
                <select
                  id="restartPolicy"
                  name="restartPolicy"
                  value={formData.restartPolicy}
                  onChange={handleInputChange}
                >
                  <option value="no">No</option>
                  <option value="always">Always</option>
                  <option value="unless-stopped">Unless Stopped</option>
                  <option value="on-failure">On Failure</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="autoStart"
                  checked={formData.autoStart}
                  onChange={handleInputChange}
                />
                Auto-start container
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Resource Limits</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="cpuLimit">CPU Limit</label>
                <input
                  type="text"
                  id="cpuLimit"
                  name="cpuLimit"
                  value={formData.cpuLimit}
                  onChange={handleInputChange}
                  placeholder="0.5"
                />
                <small>CPU cores (e.g., 0.5, 1.0, 2.0)</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="memoryLimit">Memory Limit</label>
                <input
                  type="text"
                  id="memoryLimit"
                  name="memoryLimit"
                  value={formData.memoryLimit}
                  onChange={handleInputChange}
                  placeholder="512m"
                />
                <small>Memory limit (e.g., 512m, 1g, 2g)</small>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Port Mappings</h3>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addArrayItem('ports')}
              >
                <FiPlus />
                Add Port
              </button>
            </div>
            
            {formData.ports.map((port, index) => (
              <div key={index} className="array-item">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      value={port.host}
                      onChange={(e) => handleArrayChange('ports', index, 'host', e.target.value)}
                      placeholder="Host port (8080)"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={port.container}
                      onChange={(e) => handleArrayChange('ports', index, 'container', e.target.value)}
                      placeholder="Container port (80)"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeArrayItem('ports', index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Volume Mounts</h3>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addArrayItem('volumes')}
              >
                <FiPlus />
                Add Volume
              </button>
            </div>
            
            {formData.volumes.map((volume, index) => (
              <div key={index} className="array-item">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      value={volume.host}
                      onChange={(e) => handleArrayChange('volumes', index, 'host', e.target.value)}
                      placeholder="Host path (/var/data)"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={volume.container}
                      onChange={(e) => handleArrayChange('volumes', index, 'container', e.target.value)}
                      placeholder="Container path (/app/data)"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeArrayItem('volumes', index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3>Environment Variables</h3>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => addArrayItem('environment')}
              >
                <FiPlus />
                Add Variable
              </button>
            </div>
            
            {formData.environment.map((env, index) => (
              <div key={index} className="array-item">
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      value={env.key}
                      onChange={(e) => handleArrayChange('environment', index, 'key', e.target.value)}
                      placeholder="Variable name (NODE_ENV)"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      value={env.value}
                      onChange={(e) => handleArrayChange('environment', index, 'value', e.target.value)}
                      placeholder="Variable value (production)"
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeArrayItem('environment', index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/containers')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create Container
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContainer;