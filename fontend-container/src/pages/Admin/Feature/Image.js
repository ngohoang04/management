import React, { useState, useEffect } from 'react';
import { 
  FiDownload, 
  FiTrash2, 
  FiSearch, 
  FiRefreshCw,
  FiTag,
  FiHardDrive,
  FiCalendar
} from 'react-icons/fi';

const Images = ({ currentUser, addToast }) => {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    // Simulate API call
    const mockImages = [
      {
        id: 1,
        repository: 'nginx',
        tag: 'latest',
        imageId: 'sha256:abc123',
        size: '133MB',
        created: '2024-01-15T10:30:00Z',
        inUse: true
      },
      {
        id: 2,
        repository: 'postgres',
        tag: '13',
        imageId: 'sha256:def456',
        size: '314MB',
        created: '2024-01-14T16:20:00Z',
        inUse: true
      },
      {
        id: 3,
        repository: 'node',
        tag: '18-alpine',
        imageId: 'sha256:ghi789',
        size: '117MB',
        created: '2024-01-13T11:45:00Z',
        inUse: false
      },
      {
        id: 4,
        repository: 'redis',
        tag: '6-alpine',
        imageId: 'sha256:jkl012',
        size: '31MB',
        created: '2024-01-12T09:15:00Z',
        inUse: true
      }
    ];
    
    setImages(mockImages);
    setFilteredImages(mockImages);
  }, []);

  useEffect(() => {
    const filtered = images.filter(image =>
      image.repository.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [images, searchTerm]);

  const handlePullImage = async (imageName) => {
    try {
      addToast(`Pulling image ${imageName}...`, 'info');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      addToast(`Successfully pulled ${imageName}`, 'success');
      
      // Add new image to list
      const newImage = {
        id: Date.now(),
        repository: imageName.split(':')[0],
        tag: imageName.split(':')[1] || 'latest',
        imageId: `sha256:${Math.random().toString(36).substr(2, 9)}`,
        size: '150MB',
        created: new Date().toISOString(),
        inUse: false
      };
      
      setImages(prev => [newImage, ...prev]);
    } catch (error) {
      addToast(`Failed to pull image: ${error.message}`, 'error');
    }
  };

  const handleDeleteImage = async (image) => {
    if (image.inUse) {
      addToast('Cannot delete image that is in use by containers', 'error');
      return;
    }

    try {
      setImages(prev => prev.filter(img => img.id !== image.id));
      addToast(`Image ${image.repository}:${image.tag} deleted successfully`, 'success');
    } catch (error) {
      addToast(`Failed to delete image: ${error.message}`, 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const PullImageForm = () => {
    const [imageName, setImageName] = useState('');
    
    const handleSubmit = (e) => {
      e.preventDefault();
      if (imageName.trim()) {
        handlePullImage(imageName.trim());
        setImageName('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="pull-image-form">
        <input
          type="text"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          placeholder="Enter image name (e.g., nginx:latest)"
          className="pull-input"
        />
        <button type="submit" className="btn btn-primary">
          <FiDownload />
          Pull Image
        </button>
      </form>
    );
  };

  return (
    <div className="images-page">
      <div className="page-header">
        <div className="page-title">
          <h2>Images</h2>
          <span className="page-subtitle">{filteredImages.length} images</span>
        </div>
        <button className="btn btn-secondary">
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      <div className="page-controls">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <PullImageForm />
      </div>

      <div className="images-grid">
        {filteredImages.map(image => (
          <div key={image.id} className="image-card">
            <div className="image-header">
              <div className="image-info">
                <h3 className="image-name">
                  {image.repository}
                  <span className="image-tag">
                    <FiTag />
                    {image.tag}
                  </span>
                </h3>
                <span className="image-id">{image.imageId.substring(0, 12)}</span>
              </div>
              
              {image.inUse && (
                <span className="in-use-badge">In Use</span>
              )}
            </div>

            <div className="image-details">
              <div className="detail-item">
                <FiHardDrive className="detail-icon" />
                <span>{image.size}</span>
              </div>
              
              <div className="detail-item">
                <FiCalendar className="detail-icon" />
                <span>{formatDate(image.created)}</span>
              </div>
            </div>

            <div className="image-actions">
              <button
                className={`btn ${image.inUse ? 'btn-disabled' : 'btn-danger'}`}
                onClick={() => handleDeleteImage(image)}
                disabled={image.inUse}
                title={image.inUse ? 'Cannot delete image in use' : 'Delete image'}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="empty-state">
          <FiTag size={48} />
          <h3>No images found</h3>
          <p>
            {searchTerm 
              ? 'Try adjusting your search term'
              : 'Pull your first image to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Images;