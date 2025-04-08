import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import './Gallery.css';

const Gallery = () => {
  const [media, setMedia] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [previewMedia, setPreviewMedia] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState([]); // For multi-selection

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = () => {
    axios
      .get('http://localhost:3001/media')
      .then((response) => {
        setMedia(response.data);
        setFilteredMedia(response.data);
      })
      .catch((error) => {
        console.error('Error fetching media', error);
      });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('media', files[i]);
    }

    axios
      .post('http://localhost:3001/upload', formData)
      .then(() => {
        alert('Files uploaded successfully');
        fetchMedia();
      })
      .catch((error) => {
        console.error('Error uploading files', error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/media/${id}`)
      .then(() => {
        alert('File deleted successfully');
        fetchMedia();
      })
      .catch((error) => {
        console.error('Error deleting file', error);
      });
  };

  const handleBulkDelete = () => {
    if (selectedMedia.length === 0) {
      alert('No media selected for deletion');
      return;
    }

    const deletePromises = selectedMedia.map((id) =>
      axios.delete(`http://localhost:3001/media/${id}`)
    );

    Promise.all(deletePromises)
      .then(() => {
        alert('Selected files deleted successfully');
        setSelectedMedia([]); // Clear the selection
        fetchMedia();
      })
      .catch((error) => {
        console.error('Error deleting files', error);
      });
  };

  const handleSelectMedia = (id) => {
    setSelectedMedia((prev) =>
      prev.includes(id) ? prev.filter((mediaId) => mediaId !== id) : [...prev, id]
    );
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterMedia(query, filterType);
  };

  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);
    let sorted = [...filteredMedia];
    if (criteria === 'name') {
      sorted = sorted.sort((a, b) => a.original_name.localeCompare(b.original_name));
    } else if (criteria === 'date') {
      sorted = sorted.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
    }
    setFilteredMedia(sorted);
  };

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setFilterType(type);
    filterMedia(searchQuery, type);
  };

  const filterMedia = (query, type) => {
    let filtered = media.filter((item) =>
      item.original_name && item.original_name.toLowerCase().includes(query)
    );
    if (type === 'image') {
      filtered = filtered.filter(
        (item) => item.url.endsWith('.jpg') || item.url.endsWith('.png')
      );
    } else if (type === 'video') {
      filtered = filtered.filter(
        (item) =>
          item.url.endsWith('.mp4') || item.url.endsWith('.mov') || item.url.endsWith('.avi')
      );
    }
    setFilteredMedia(filtered);
  };

  const handleMediaClick = (item) => {
    setPreviewMedia(item);
  };

  const closePreview = () => {
    setPreviewMedia(null);
  };

  return (
    <div className="gallery">
      <h1>Media Gallery</h1>
      <div className="upload-container">
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
        <select value={filterType} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
        <button onClick={handleBulkDelete}>Delete Selected</button>
      </div>

      <div className="gallery-items">
        {filteredMedia.map((item, index) => {
          const isVideo =
            item.url &&
            (item.url.endsWith('.mp4') || item.url.endsWith('.mov') || item.url.endsWith('.avi'));
          return (
            <div
              className={`gallery-item ${selectedMedia.includes(item.id) ? 'selected' : ''}`}
              key={index}
            >
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedMedia.includes(item.id)}
                  onChange={() => handleSelectMedia(item.id)}
                />
              </div>
              {isVideo ? (
                <video src={item.url} controls onClick={() => handleMediaClick(item)} />
              ) : (
                <img
                  src={item.url}
                  alt={`Media item ${index}`}
                  onClick={() => handleMediaClick(item)}
                />
              )}
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          );
        })}
      </div>

      {previewMedia && (
        <div className="preview-overlay" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            {previewMedia.url &&
            (previewMedia.url.endsWith('.mp4') ||
              previewMedia.url.endsWith('.mov') ||
              previewMedia.url.endsWith('.avi')) ? (
              <video src={previewMedia.url} controls />
            ) : (
              <img src={previewMedia.url} alt="Preview" />
            )}
            <button className="close-button" onClick={closePreview}>
              Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
