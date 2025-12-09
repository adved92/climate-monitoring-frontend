import React, { useState, useEffect } from 'react';
import './FloodMonitor.css';

const FloodMonitor = ({ latitude, longitude }) => {
  const [floodData, setFloodData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchFloodData();
    }
  }, [latitude, longitude]);

  const fetchFloodData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(
        `${apiUrl}/api/floods/risk?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch flood data');
      }

      const result = await response.json();
      setFloodData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (riskLevel) => {
    const colors = {
      low: '#4caf50',
      moderate: '#ff9800',
      high: '#ff5722',
      severe: '#d32f2f',
      unknown: '#9e9e9e'
    };
    return colors[riskLevel] || colors.unknown;
  };

  const getRiskIcon = (riskLevel) => {
    const icons = {
      low: '✓',
      moderate: '⚠️',
      high: '⚠️',
      severe: '🚨',
      unknown: '?'
    };
    return icons[riskLevel] || icons.unknown;
  };

  const getRiskLabel = (riskLevel) => {
    const labels = {
      low: 'Low Risk',
      moderate: 'Moderate Risk',
      high: 'High Risk',
      severe: 'Severe Risk',
      unknown: 'Unknown'
    };
    return labels[riskLevel] || 'Unknown';
  };

  if (!latitude || !longitude) {
    return (
      <div className="flood-monitor">
        <div className="flood-monitor-header">
          <h2>💧 Flood Risk Monitor</h2>
        </div>
        <div className="flood-no-location">
          <p>Please select a location to view flood risk information</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flood-monitor">
        <div className="flood-monitor-header">
          <h2>💧 Flood Risk Monitor</h2>
        </div>
        <div className="flood-loading">Loading flood data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flood-monitor">
        <div className="flood-monitor-header">
          <h2>💧 Flood Risk Monitor</h2>
        </div>
        <div className="flood-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchFloodData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!floodData) {
    return null;
  }

  const riskLevel = floodData.risk_level || 'unknown';
  const rainfall = floodData.rainfall_data || {};
  const recommendations = floodData.recommendations || [];

  return (
    <div className="flood-monitor">
      <div className="flood-monitor-header">
        <h2>💧 Flood Risk Monitor</h2>
        <button onClick={fetchFloodData} className="refresh-button" title="Refresh">
          🔄
        </button>
      </div>

      <div className="flood-risk-card" style={{ borderColor: getRiskColor(riskLevel) }}>
        <div className="risk-indicator" style={{ backgroundColor: getRiskColor(riskLevel) }}>
          <span className="risk-icon">{getRiskIcon(riskLevel)}</span>
        </div>
        <div className="risk-info">
          <h3>{getRiskLabel(riskLevel)}</h3>
          <p className="risk-description">
            {riskLevel === 'low' && 'Minimal flood risk at this location'}
            {riskLevel === 'moderate' && 'Moderate flood risk - stay alert'}
            {riskLevel === 'high' && 'High flood risk - take precautions'}
            {riskLevel === 'severe' && 'Severe flood risk - immediate action required'}
            {riskLevel === 'unknown' && 'Flood risk data unavailable'}
          </p>
        </div>
      </div>

      <div className="rainfall-section">
        <h3>Rainfall Accumulation</h3>
        <div className="rainfall-grid">
          <div className="rainfall-card">
            <div className="rainfall-period">24 Hours</div>
            <div className="rainfall-amount">
              {rainfall['24_hours'] !== undefined ? rainfall['24_hours'].toFixed(1) : 'N/A'}
              <span className="rainfall-unit">{rainfall.unit || 'mm'}</span>
            </div>
          </div>
          <div className="rainfall-card">
            <div className="rainfall-period">48 Hours</div>
            <div className="rainfall-amount">
              {rainfall['48_hours'] !== undefined ? rainfall['48_hours'].toFixed(1) : 'N/A'}
              <span className="rainfall-unit">{rainfall.unit || 'mm'}</span>
            </div>
          </div>
          <div className="rainfall-card">
            <div className="rainfall-period">7 Days</div>
            <div className="rainfall-amount">
              {rainfall['7_days'] !== undefined ? rainfall['7_days'].toFixed(1) : 'N/A'}
              <span className="rainfall-unit">{rainfall.unit || 'mm'}</span>
            </div>
          </div>
        </div>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-section">
          <h3>Safety Recommendations</h3>
          <ul className="recommendations-list">
            {recommendations.map((rec, index) => (
              <li key={index} className={`recommendation-item ${riskLevel}`}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {floodData.timestamp && (
        <div className="flood-footer">
          <p className="last-update">
            Last updated: {new Date(floodData.timestamp).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default FloodMonitor;
