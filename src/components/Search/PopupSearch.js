import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PopupSearch.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopupSearch = ({ show, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const handleSearch = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3001/search', {
        params: { query: searchTerm },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error during search:', error);
      setResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [show, onClose]);

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setResults([]);
    }
  }, [searchTerm, handleSearch]);

  const tableRouteMap = {
    'nnrpvtltd.studentinfo': '/studentinfo',
    'nnrpvtltd.employee': '/employee',
    'nnrpvtltd.portfolio': '/portfolio',
    'nnrpvtltd.employees': '/employee',
  };

  const handleResultClick = (sourceTable, id) => {
    const baseRoute = tableRouteMap[sourceTable];
    if (baseRoute) {
      navigate(`${baseRoute}?id=${id}`);
      onClose();
    } else {
      toast.error(`No route mapped for: ${sourceTable}`, {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
    }
  };

  if (!show) return null;

  return (
    <>
      <div className="popup-container">
        <div className="popup-content">
          <button className="close-btn popup-close" onClick={onClose}>X</button>
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
                  <li
                    key={index}
                    className="result-item popup-result-item"
                    onClick={() => handleResultClick(result.source_table, result.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="result-info popup-result-info">
                      <div className="result-title popup-result-title">
                        {result.source_table}: {result.id}
                      </div>
                      {Object.entries(result).map(([key, value], i) => (
                        key !== 'source_table' && key !== 'id' && (
                          <div key={i} className="result-meta popup-result-meta">
                            <strong>{key}:</strong> {typeof value === 'string' && value.startsWith('http') ? (
                              <img
                                src={value}
                                alt={key}
                                style={{ maxWidth: '100px', borderRadius: '6px', marginTop: '6px' }}
                              />
                            ) : (
                              <span>{String(value)}</span>
                            )}
                          </div>
                        )
                      ))}
                    </div>
                  </li>
                ))
              ) : (
                <p className="no-results-message">No results found.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PopupSearch;
