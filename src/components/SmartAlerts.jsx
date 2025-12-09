import React, { useState, useEffect } from 'react';
import './SmartAlerts.css';

const SmartAlerts = ({ latitude, longitude }) => {
  const [alerts, setAlerts] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchSmartAlerts();
      fetchStatistics();
    }
  }, [latitude, longitude]);

  const fetchSmartAlerts = async () => {
    try {
      setLoading(true);
      
      // Mock data for demo
      const mockCurrentWeather = {
        temp: 25,
        aqi: 85,
        humidity: 65
      };
      
      const mockForecast = Array.from({ length: 24 }, (_, i) => ({
        hour: i + 1,
        temp: 25 + Math.random() * 5,
        precipitation_probability: Math.random() * 100
      }));
      
      const response = await fetch('/api/smart-alerts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_weather: mockCurrentWeather,
          forecast: mockForecast,
          location: { latitude, longitude }
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }
      
      const data = await response.json();
      setAlerts(data.alerts || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching alerts:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await fetch('/api/smart-alerts/statistics');
      if (response.ok) {
        const data = await response.json();
        setStatistics(data);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  const handleAlertAction = async (alertId, action) => {
    try {
      await fetch('/api/smart-alerts/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alert_id: alertId,
          action
        })
      });
      
      // Remove alert from list if dismissed
      if (action === 'dismissed') {
        setAlerts(alerts.filter(a => a.id !== alertId));
      }
    } catch (err) {
      console.error('Error recording interaction:', err);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return '#dc2626';
      case 'high':
        return '#ef4444';
      case 'moderate':
        return '#f59e0b';
      case 'low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return '🚨';
      case 'high':
        return '⚠️';
      case 'moderate':
        return '⚡';
      case 'low':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  if (loading && alerts.length === 0) {
    return (
      <div className="smart-alerts">
        <div className="loading">Loading smart alerts...</div>
      </div>
    );
  }

  return (
    <div className="smart-alerts">
      <div className="alerts-header">
        <h2>🧠 Smart Alerts</h2>
        <span className="ai-badge">AI-Powered</span>
      </div>

      {statistics && (
        <div className="alert-statistics">
          <div className="stat-card">
            <span className="stat-label">Total Alerts</span>
            <span className="stat-value">{statistics.total_alerts}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Engagement Rate</span>
            <span className="stat-value">{statistics.engagement_rate.toFixed(0)}%</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Acted On</span>
            <span className="stat-value">{statistics.acted_on_count}</span>
          </div>
        </div>
      )}

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      {alerts.length === 0 && !loading && !error && (
        <div className="no-alerts">
          <span className="no-alerts-icon">✓</span>
          <h3>No Active Alerts</h3>
          <p>You're all set! We'll notify you of any important weather changes.</p>
        </div>
      )}

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="alert-card"
            style={{ borderLeftColor: getSeverityColor(alert.severity) }}
          >
            <div className="alert-header">
              <div className="alert-title-section">
                <span className="alert-icon">{getSeverityIcon(alert.severity)}</span>
                <div>
                  <h3>{alert.title}</h3>
                  <span
                    className="alert-severity"
                    style={{ color: getSeverityColor(alert.severity) }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                className="dismiss-btn"
                onClick={() => handleAlertAction(alert.id || index, 'dismissed')}
                aria-label="Dismiss alert"
              >
                ✕
              </button>
            </div>

            <p className="alert-message">{alert.message}</p>

            {alert.current_value !== undefined && (
              <div className="alert-details">
                <span className="detail-label">Current:</span>
                <span className="detail-value">{alert.current_value}</span>
              </div>
            )}

            {alert.future_value !== undefined && (
              <div className="alert-details">
                <span className="detail-label">Expected:</span>
                <span className="detail-value">{alert.future_value}</span>
              </div>
            )}

            {alert.probability !== undefined && (
              <div className="alert-details">
                <span className="detail-label">Probability:</span>
                <span className="detail-value">{alert.probability}%</span>
              </div>
            )}

            <div className="alert-actions">
              <button
                className="action-btn primary"
                onClick={() => handleAlertAction(alert.id || index, 'acted_on')}
              >
                Got It
              </button>
              <button
                className="action-btn secondary"
                onClick={() => handleAlertAction(alert.id || index, 'dismissed')}
              >
                Dismiss
              </button>
            </div>

            <div className="alert-timestamp">
              {new Date(alert.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      <div className="alerts-info">
        <h3>About Smart Alerts</h3>
        <p>
          Our AI learns from your interactions to provide more relevant alerts over time.
          Alerts are personalized based on your location, preferences, and behavior patterns.
        </p>
        <ul>
          <li>Temperature changes and extreme conditions</li>
          <li>Precipitation forecasts for your commute times</li>
          <li>Air quality warnings</li>
          <li>Consolidated notifications to reduce alert fatigue</li>
        </ul>
      </div>
    </div>
  );
};

export default SmartAlerts;
