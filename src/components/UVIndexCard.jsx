import React, { useState, useEffect } from 'react';
import './UVIndexCard.css';

const UVIndexCard = ({ latitude, longitude }) => {
  const [uvData, setUvData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchUVIndex();
    }
  }, [latitude, longitude]);

  const fetchUVIndex = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/climate/uv-index?lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch UV Index data');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setUvData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching UV Index:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="uv-index-card">
        <div className="loading">Loading UV Index...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="uv-index-card">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!uvData) {
    return null;
  }

  // Handle unavailable UV data gracefully
  if (uvData.error) {
    return (
      <div className="uv-index-card unavailable">
        <h2>☀️ UV Index</h2>
        <p className="unavailable-message">{uvData.activity_suggestion}</p>
      </div>
    );
  }

  return (
    <div className="uv-index-card">
      <div className="uv-header">
        <h2>☀️ UV Index</h2>
        <div className="uv-timestamp">
          Updated: {new Date(uvData.timestamp).toLocaleTimeString()}
        </div>
      </div>

      <div className="uv-main">
        <div 
          className="uv-value-container"
          style={{ backgroundColor: uvData.uv_color }}
        >
          <div className="uv-value">{uvData.uv_index}</div>
          <div className="uv-category">{uvData.uv_category}</div>
        </div>

        <div className="uv-description">
          {uvData.activity_suggestion}
        </div>
      </div>

      {uvData.protection_recommendations && uvData.protection_recommendations.length > 0 && (
        <div className="protection-section">
          <h3>☂️ Sun Protection</h3>
          <ul>
            {uvData.protection_recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      {uvData.optimal_activity_times && uvData.optimal_activity_times.length > 0 && (
        <div className="activity-times-section">
          <h3>⏰ Best Times for Outdoor Activities</h3>
          <div className="time-chips">
            {uvData.optimal_activity_times.map((time, index) => (
              <div key={index} className="time-chip">
                {time}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="uv-scale">
        <h4>UV Index Scale</h4>
        <div className="scale-items">
          <div className="scale-item">
            <span className="scale-color" style={{ backgroundColor: '#289500' }}></span>
            <span>Low (0-2)</span>
          </div>
          <div className="scale-item">
            <span className="scale-color" style={{ backgroundColor: '#f7e400' }}></span>
            <span>Moderate (3-5)</span>
          </div>
          <div className="scale-item">
            <span className="scale-color" style={{ backgroundColor: '#f85900' }}></span>
            <span>High (6-7)</span>
          </div>
          <div className="scale-item">
            <span className="scale-color" style={{ backgroundColor: '#d8001d' }}></span>
            <span>Very High (8-10)</span>
          </div>
          <div className="scale-item">
            <span className="scale-color" style={{ backgroundColor: '#6b49c8' }}></span>
            <span>Extreme (11+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UVIndexCard;
