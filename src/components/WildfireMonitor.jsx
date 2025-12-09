import React, { useState, useEffect } from 'react';
import './WildfireMonitor.css';

const WildfireMonitor = ({ latitude, longitude }) => {
  const [fires, setFires] = useState([]);
  const [aqiImpact, setAqiImpact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWildfireData();
    }
  }, [latitude, longitude]);

  const fetchWildfireData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // Fetch active fires
      const firesResponse = await fetch(
        `${apiUrl}/api/wildfires/active?latitude=${latitude}&longitude=${longitude}&radius=100`
      );
      
      if (!firesResponse.ok) {
        throw new Error('Failed to fetch wildfire data');
      }

      const firesData = await firesResponse.json();
      setFires(firesData.fires || []);

      // Fetch AQI impact
      const aqiResponse = await fetch(
        `${apiUrl}/api/wildfires/aqi-impact?latitude=${latitude}&longitude=${longitude}&radius=200`
      );

      if (aqiResponse.ok) {
        const aqiData = await aqiResponse.json();
        setAqiImpact(aqiData.impact);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getImpactColor = (impactLevel) => {
    const colors = {
      none: '#4caf50',
      low: '#8bc34a',
      moderate: '#ff9800',
      high: '#ff5722',
      severe: '#d32f2f'
    };
    return colors[impactLevel] || colors.none;
  };

  const getImpactIcon = (impactLevel) => {
    const icons = {
      none: '✓',
      low: '⚠️',
      moderate: '⚠️',
      high: '🔥',
      severe: '🚨'
    };
    return icons[impactLevel] || '?';
  };

  if (!latitude || !longitude) {
    return (
      <div className="wildfire-monitor">
        <div className="wildfire-monitor-header">
          <h2>🔥 Wildfire Monitor</h2>
        </div>
        <div className="wildfire-no-location">
          <p>Please select a location to view wildfire information</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wildfire-monitor">
        <div className="wildfire-monitor-header">
          <h2>🔥 Wildfire Monitor</h2>
        </div>
        <div className="wildfire-loading">Loading wildfire data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wildfire-monitor">
        <div className="wildfire-monitor-header">
          <h2>🔥 Wildfire Monitor</h2>
        </div>
        <div className="wildfire-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchWildfireData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="wildfire-monitor">
      <div className="wildfire-monitor-header">
        <h2>🔥 Wildfire Monitor</h2>
        <button onClick={fetchWildfireData} className="refresh-button" title="Refresh">
          🔄
        </button>
      </div>

      {aqiImpact && (
        <div
          className="aqi-impact-card"
          style={{ borderColor: getImpactColor(aqiImpact.impact_level) }}
        >
          <div
            className="impact-indicator"
            style={{ backgroundColor: getImpactColor(aqiImpact.impact_level) }}
          >
            <span className="impact-icon">{getImpactIcon(aqiImpact.impact_level)}</span>
          </div>
          <div className="impact-info">
            <h3>Air Quality Impact</h3>
            <p className="impact-message">{aqiImpact.message}</p>
            {aqiImpact.closest_fire_distance_km && (
              <p className="impact-detail">
                Closest fire: {aqiImpact.closest_fire_distance_km} km away
              </p>
            )}
            {aqiImpact.fire_count > 0 && (
              <p className="impact-detail">
                {aqiImpact.fire_count} active fire{aqiImpact.fire_count !== 1 ? 's' : ''} detected
              </p>
            )}
          </div>
        </div>
      )}

      {fires.length === 0 ? (
        <div className="no-fires">
          <p>✅ No active wildfires detected</p>
          <p className="no-fires-subtitle">
            No wildfires within 100 km of your location
          </p>
        </div>
      ) : (
        <div className="fires-section">
          <h3>Active Wildfires ({fires.length})</h3>
          <div className="fires-grid">
            {fires.map((fire, index) => (
              <div key={fire.id || index} className="fire-card">
                <div className="fire-card-header">
                  <h4>{fire.name || `Fire ${index + 1}`}</h4>
                  <span className={`fire-status ${fire.status}`}>
                    {fire.status || 'Active'}
                  </span>
                </div>

                <div className="fire-card-body">
                  {fire.size_acres !== undefined && (
                    <div className="fire-detail">
                      <span className="detail-label">Size:</span>
                      <span className="detail-value">
                        {fire.size_acres.toLocaleString()} acres
                      </span>
                    </div>
                  )}

                  {fire.containment_percent !== undefined && (
                    <div className="fire-detail">
                      <span className="detail-label">Containment:</span>
                      <span className="detail-value">
                        {fire.containment_percent}%
                      </span>
                    </div>
                  )}

                  {fire.start_date && (
                    <div className="fire-detail">
                      <span className="detail-label">Started:</span>
                      <span className="detail-value">
                        {new Date(fire.start_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {fire.distance_km && (
                    <div className="fire-detail">
                      <span className="detail-label">Distance:</span>
                      <span className="detail-value distance">
                        {fire.distance_km} km away
                      </span>
                    </div>
                  )}
                </div>

                {fire.containment_percent !== undefined && (
                  <div className="containment-bar">
                    <div
                      className="containment-progress"
                      style={{
                        width: `${fire.containment_percent}%`,
                        backgroundColor:
                          fire.containment_percent >= 75
                            ? '#4caf50'
                            : fire.containment_percent >= 50
                            ? '#ff9800'
                            : '#f44336'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="wildfire-info">
        <h4>Safety Information</h4>
        <ul className="safety-tips">
          <li>Stay indoors if smoke is present in your area</li>
          <li>Keep windows and doors closed</li>
          <li>Use air purifiers if available</li>
          <li>Monitor local news for evacuation orders</li>
          <li>Prepare an emergency kit and evacuation plan</li>
        </ul>
      </div>
    </div>
  );
};

export default WildfireMonitor;
