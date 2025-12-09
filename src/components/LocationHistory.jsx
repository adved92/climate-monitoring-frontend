import React, { useState, useEffect } from 'react';
import { locationHistory } from '../utils/locationHistory';
import './LocationHistory.css';

const LocationHistory = ({ onSelectLocation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const hist = locationHistory.getHistory();
    setHistory(hist);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your search history?')) {
      locationHistory.clearHistory();
      setHistory([]);
    }
  };

  const handleRemoveItem = (latitude, longitude) => {
    const newHistory = locationHistory.removeFromHistory(latitude, longitude);
    setHistory(newHistory);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 7) return date.toLocaleDateString();
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  if (history.length === 0) {
    return (
      <div className="location-history empty">
        <p>No recent searches</p>
      </div>
    );
  }

  return (
    <div className="location-history">
      <div className="history-header">
        <h3>🕐 Recent Searches</h3>
        <button className="clear-btn" onClick={handleClearHistory}>
          Clear All
        </button>
      </div>

      <div className="history-list">
        {history.map((item, index) => (
          <div key={index} className="history-item">
            <div
              className="history-content"
              onClick={() => onSelectLocation(item)}
            >
              <div className="location-name">{item.name}</div>
              <div className="location-details">
                {item.country && <span className="country">{item.country}</span>}
                <span className="time">{formatTime(item.timestamp)}</span>
              </div>
            </div>
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.latitude, item.longitude)}
              title="Remove from history"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationHistory;
