import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './PopupSearch.css';

const PopupSearch = ({ show, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  // Fetch search results from the server
  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: { query: searchTerm },
      });
      console.log('Search Results:', response.data);
      setResults(response.data);
    } catch (error) {
      console.error('Error during search:', error);
      setResults([]); // Reset results on error
    }
  }, [searchTerm]);

  // Handle "Escape" key to close the popup
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleEsc);
    } else {
      window.removeEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [show, onClose]);

  // Trigger search when searchTerm changes
  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchTerm, handleSearch]);

  // Handle case when popup is not visible
  if (!show) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="popup-content">
        <button className="close-btn popup-close" onClick={onClose}>
          X
        </button>
        <input
          type="text"
          className="search-input popup-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type to search..."
        />
        <div className="results popup-results">
          <h3 className="results-header">Results:</h3>
          <ul className="results-list">
            {results.length > 0 ? (
              results.map((result, index) => (
                <li key={index} className="result-item popup-result-item">
                  <div className="result-info popup-result-info">
                    <div className="result-title popup-result-title">
                      {result.source_table}: {result.id}
                    </div>
                    <div className="result-meta popup-result-meta">{result.name}</div>
                  </div>
                  {result.address && (
                    <img
                      src={
                        result.address.startsWith('http')
                          ? result.address
                          : `http://localhost:3001/${result.address}`
                      }
                      alt={result.name || 'Image'}
                      className="result-image popup-result-image"
                    />
                  )}
                </li>
              ))
            ) : (
              <p className="no-results-message">No results found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PopupSearch;
