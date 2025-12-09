import React, { useState, useEffect } from 'react';
import './EarthquakeTracker.css';

const EarthquakeTracker = ({ latitude, longitude }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [radius, setRadius] = useState(500);
  const [minMagnitude, setMinMagnitude] = useState(2.5);

  useEffect(() => {
    if (latitude && longitude) {
      fetchEarthquakes();
    }
  }, [latitude, longitude, radius, minMagnitude]);

  const fetchEarthquakes = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/climate/earthquakes?lat=${latitude}&lon=${longitude}&radius=${radius}&min_magnitude=${minMagnitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch earthquake data');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setEarthquakes(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching earthquakes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 7) return '#d8001d';
    if (magnitude >= 6) return '#f85900';
    if (magnitude >= 5) return '#f7e400';
    if (magnitude >= 4) return '#289500';
    return '#00b4d8';
  };

  if (loading) {
    return (
      <div className="earthquake-tracker">
        <div className="loading">Loading earthquake data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="earthquake-tracker">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!earthquakes) {
    return null;
  }

  return (
    <div className="earthquake-tracker">
      <div className="earthquake-header">
        <h2>🌍 Recent Earthquakes</h2>
        <div className="earthquake-count">
          {earthquakes.length} event{earthquakes.length !== 1 ? 's' : ''} found
        </div>
      </div>

      <div className="earthquake-filters">
        <div className="filter-group">
          <label>Radius (km)</label>
          <select value={radius} onChange={(e) => setRadius(Number(e.target.value))}>
            <option value={100}>100 km</option>
            <option value={250}>250 km</option>
            <option value={500}>500 km</option>
            <option value={1000}>1000 km</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Min Magnitude</label>
          <select value={minMagnitude} onChange={(e) => setMinMagnitude(Number(e.target.value))}>
            <option value={2.0}>2.0+</option>
            <option value={2.5}>2.5+</option>
            <option value={3.0}>3.0+</option>
            <option value={4.0}>4.0+</option>
            <option value={5.0}>5.0+</option>
          </select>
        </div>
      </div>

      {earthquakes.length === 0 ? (
        <div className="no-earthquakes">
          <p>No earthquakes found in the selected area.</p>
          <p className="hint">Try increasing the search radius or lowering the magnitude threshold.</p>
        </div>
      ) : (
        <div className="earthquake-list">
          {earthquakes.map((eq, index) => (
            <div key={eq.id || index} className="earthquake-item">
              <div 
                className="magnitude-badge"
                style={{ backgroundColor: getMagnitudeColor(eq.magnitude) }}
              >
                <div className="magnitude-value">{eq.magnitude}</div>
                <div className="magnitude-label">M</div>
              </div>
              
              <div className="earthquake-details">
                <div className="earthquake-location">{eq.location.place}</div>
                <div className="earthquake-meta">
                  <span className="meta-item">📍 {eq.distance_km} km away</span>
                  <span className="meta-item">⬇️ {eq.depth_km} km deep</span>
                  <span className="meta-item">🕐 {eq.time_ago}</span>
                </div>
                {eq.tsunami_warning && (
                  <div className="tsunami-warning">⚠️ Tsunami Warning</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EarthquakeTracker;
