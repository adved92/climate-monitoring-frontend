import React, { useState, useEffect } from 'react';
import './StormTracker.css';

const StormTracker = ({ latitude, longitude }) => {
  const [storms, setStorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStorm, setSelectedStorm] = useState(null);
  const [viewMode, setViewMode] = useState('nearby'); // 'nearby' or 'all'

  useEffect(() => {
    fetchStorms();
  }, [latitude, longitude, viewMode]);

  const fetchStorms = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      let url;

      if (viewMode === 'nearby' && latitude && longitude) {
        url = `${apiUrl}/api/storms/nearby?latitude=${latitude}&longitude=${longitude}&radius=1000`;
      } else {
        url = `${apiUrl}/api/storms/active`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch storm data');
      }

      const data = await response.json();
      setStorms(data.storms || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStormCategoryColor = (classification) => {
    const classLower = (classification || '').toLowerCase();
    if (classLower.includes('category 5') || classLower.includes('cat 5')) return '#8b0000';
    if (classLower.includes('category 4') || classLower.includes('cat 4')) return '#ff0000';
    if (classLower.includes('category 3') || classLower.includes('cat 3')) return '#ff6600';
    if (classLower.includes('category 2') || classLower.includes('cat 2')) return '#ffa500';
    if (classLower.includes('category 1') || classLower.includes('cat 1')) return '#ffff00';
    if (classLower.includes('tropical storm')) return '#00ff00';
    if (classLower.includes('tropical depression')) return '#00ffff';
    return '#808080';
  };

  const getStormIntensityLabel = (classification) => {
    const classLower = (classification || '').toLowerCase();
    if (classLower.includes('category')) return classification;
    if (classLower.includes('tropical storm')) return 'Tropical Storm';
    if (classLower.includes('tropical depression')) return 'Tropical Depression';
    if (classLower.includes('hurricane')) return 'Hurricane';
    return classification || 'Unknown';
  };

  const formatWindSpeed = (speed) => {
    if (!speed) return 'N/A';
    return `${speed} mph`;
  };

  const formatPressure = (pressure) => {
    if (!pressure) return 'N/A';
    return `${pressure} mb`;
  };

  const formatDistance = (distance) => {
    if (!distance) return '';
    return `${distance} km away`;
  };

  if (loading) {
    return (
      <div className="storm-tracker">
        <div className="storm-tracker-header">
          <h2>🌀 Hurricane & Storm Tracker</h2>
        </div>
        <div className="storm-loading">Loading storm data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="storm-tracker">
        <div className="storm-tracker-header">
          <h2>🌀 Hurricane & Storm Tracker</h2>
        </div>
        <div className="storm-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchStorms} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="storm-tracker">
      <div className="storm-tracker-header">
        <h2>🌀 Hurricane & Storm Tracker</h2>
        <div className="view-mode-toggle">
          <button
            className={viewMode === 'nearby' ? 'active' : ''}
            onClick={() => setViewMode('nearby')}
            disabled={!latitude || !longitude}
          >
            Nearby Storms
          </button>
          <button
            className={viewMode === 'all' ? 'active' : ''}
            onClick={() => setViewMode('all')}
          >
            All Active Storms
          </button>
        </div>
      </div>

      {storms.length === 0 ? (
        <div className="no-storms">
          <p>✅ No active storms detected</p>
          {viewMode === 'nearby' && (
            <p className="no-storms-subtitle">
              No storms within 1000 km of your location
            </p>
          )}
        </div>
      ) : (
        <div className="storms-container">
          <div className="storms-list">
            {storms.map((storm, index) => (
              <div
                key={storm.id || index}
                className={`storm-card ${selectedStorm?.id === storm.id ? 'selected' : ''}`}
                onClick={() => setSelectedStorm(storm)}
              >
                <div className="storm-card-header">
                  <div
                    className="storm-indicator"
                    style={{ backgroundColor: getStormCategoryColor(storm.classification) }}
                  />
                  <div className="storm-name-section">
                    <h3>{storm.name}</h3>
                    <span className="storm-classification">
                      {getStormIntensityLabel(storm.classification)}
                    </span>
                  </div>
                </div>

                <div className="storm-card-details">
                  <div className="storm-detail-row">
                    <span className="detail-label">Wind Speed:</span>
                    <span className="detail-value">{formatWindSpeed(storm.wind_speed)}</span>
                  </div>
                  <div className="storm-detail-row">
                    <span className="detail-label">Pressure:</span>
                    <span className="detail-value">{formatPressure(storm.pressure)}</span>
                  </div>
                  {storm.movement_speed && (
                    <div className="storm-detail-row">
                      <span className="detail-label">Movement:</span>
                      <span className="detail-value">
                        {storm.movement_direction} at {storm.movement_speed} mph
                      </span>
                    </div>
                  )}
                  {storm.distance_km && (
                    <div className="storm-detail-row">
                      <span className="detail-label">Distance:</span>
                      <span className="detail-value distance">
                        {formatDistance(storm.distance_km)}
                      </span>
                    </div>
                  )}
                </div>

                {storm.warnings && storm.warnings.length > 0 && (
                  <div className="storm-warnings">
                    <span className="warning-badge">⚠️ {storm.warnings.length} Warning(s)</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {selectedStorm && (
            <div className="storm-details-panel">
              <div className="storm-details-header">
                <h3>{selectedStorm.name}</h3>
                <button
                  className="close-details"
                  onClick={() => setSelectedStorm(null)}
                >
                  ✕
                </button>
              </div>

              <div className="storm-details-content">
                <div className="detail-section">
                  <h4>Current Status</h4>
                  <p><strong>Classification:</strong> {selectedStorm.classification}</p>
                  <p><strong>Intensity:</strong> {selectedStorm.intensity || 'N/A'}</p>
                  <p><strong>Wind Speed:</strong> {formatWindSpeed(selectedStorm.wind_speed)}</p>
                  <p><strong>Pressure:</strong> {formatPressure(selectedStorm.pressure)}</p>
                </div>

                {selectedStorm.current_position && (
                  <div className="detail-section">
                    <h4>Current Position</h4>
                    <p>
                      <strong>Latitude:</strong> {selectedStorm.current_position.latitude}°
                    </p>
                    <p>
                      <strong>Longitude:</strong> {selectedStorm.current_position.longitude}°
                    </p>
                  </div>
                )}

                {selectedStorm.forecast_track && selectedStorm.forecast_track.length > 0 && (
                  <div className="detail-section">
                    <h4>Forecast Track</h4>
                    <p className="forecast-info">
                      {selectedStorm.forecast_track.length} forecast points available
                    </p>
                  </div>
                )}

                {selectedStorm.warnings && selectedStorm.warnings.length > 0 && (
                  <div className="detail-section warnings-section">
                    <h4>Active Warnings</h4>
                    <ul className="warnings-list">
                      {selectedStorm.warnings.map((warning, idx) => (
                        <li key={idx}>{warning}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedStorm.last_update && (
                  <div className="detail-section">
                    <p className="last-update">
                      <strong>Last Update:</strong> {new Date(selectedStorm.last_update).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedStorm.url && (
                  <div className="detail-section">
                    <a
                      href={selectedStorm.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="advisory-link"
                    >
                      View Official Advisory →
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="storm-legend">
        <h4>Storm Categories</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8b0000' }} />
            <span>Category 5</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff0000' }} />
            <span>Category 4</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff6600' }} />
            <span>Category 3</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffa500' }} />
            <span>Category 2</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffff00' }} />
            <span>Category 1</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#00ff00' }} />
            <span>Tropical Storm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StormTracker;
