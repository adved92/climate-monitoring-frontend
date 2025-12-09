import React, { useState, useEffect } from 'react';
import './ProviderStatus.css';

const ProviderStatus = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [healthSummary, setHealthSummary] = useState(null);

  useEffect(() => {
    fetchProviderStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchProviderStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchProviderStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/providers/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch provider stats');
      }
      
      const data = await response.json();
      setProviders(data);
      
      // Fetch health summary
      const healthResponse = await fetch('/api/providers/health');
      const healthData = await healthResponse.json();
      setHealthSummary(healthData);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching provider stats:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return '#10b981'; // green
      case 'degraded':
        return '#f59e0b'; // orange
      case 'failed':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return '✓';
      case 'degraded':
        return '⚠';
      case 'failed':
        return '✗';
      default:
        return '?';
    }
  };

  const formatResponseTime = (time) => {
    if (time < 1) {
      return `${(time * 1000).toFixed(0)}ms`;
    }
    return `${time.toFixed(2)}s`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading && providers.length === 0) {
    return (
      <div className="provider-status">
        <div className="loading">Loading provider status...</div>
      </div>
    );
  }

  if (error && providers.length === 0) {
    return (
      <div className="provider-status">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="provider-status">
      <div className="provider-header">
        <h2>Weather API Providers</h2>
        <button onClick={fetchProviderStats} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      {healthSummary && (
        <div className="health-summary">
          <div className="health-stat">
            <span className="health-label">Total Providers:</span>
            <span className="health-value">{healthSummary.total_providers}</span>
          </div>
          <div className="health-stat healthy">
            <span className="health-label">Healthy:</span>
            <span className="health-value">{healthSummary.healthy}</span>
          </div>
          <div className="health-stat degraded">
            <span className="health-label">Degraded:</span>
            <span className="health-value">{healthSummary.degraded}</span>
          </div>
          <div className="health-stat failed">
            <span className="health-label">Failed:</span>
            <span className="health-value">{healthSummary.failed}</span>
          </div>
        </div>
      )}

      <div className="providers-grid">
        {providers.map((provider) => (
          <div key={provider.name} className="provider-card">
            <div className="provider-card-header">
              <div className="provider-name-section">
                <span
                  className="status-indicator"
                  style={{ backgroundColor: getStatusColor(provider.status) }}
                  title={provider.status}
                >
                  {getStatusIcon(provider.status)}
                </span>
                <h3>{provider.name}</h3>
              </div>
              <span className="provider-priority">Priority {provider.priority}</span>
            </div>

            <div className="provider-stats">
              <div className="stat-row">
                <span className="stat-label">Status:</span>
                <span
                  className="stat-value"
                  style={{ color: getStatusColor(provider.status) }}
                >
                  {provider.status.toUpperCase()}
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Success Rate:</span>
                <span className="stat-value">
                  {provider.success_rate.toFixed(1)}%
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Avg Response:</span>
                <span className="stat-value">
                  {formatResponseTime(provider.avg_response_time)}
                </span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Total Requests:</span>
                <span className="stat-value">{provider.total_requests}</span>
              </div>

              <div className="stat-row">
                <span className="stat-label">Failures:</span>
                <span className="stat-value failure-count">
                  {provider.failure_count}
                </span>
              </div>

              {provider.last_failure && (
                <div className="stat-row">
                  <span className="stat-label">Last Failure:</span>
                  <span className="stat-value last-failure">
                    {formatDate(provider.last_failure)}
                  </span>
                </div>
              )}
            </div>

            <div className="provider-progress">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${provider.success_rate}%`,
                    backgroundColor: getStatusColor(provider.status)
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="provider-info">
        <p>
          <strong>Multi-Provider System:</strong> The system automatically switches to backup
          providers if the primary provider fails, ensuring continuous weather data availability.
        </p>
        <p>
          <strong>Aggregation:</strong> Data from multiple providers can be aggregated for
          improved accuracy.
        </p>
      </div>
    </div>
  );
};

export default ProviderStatus;
