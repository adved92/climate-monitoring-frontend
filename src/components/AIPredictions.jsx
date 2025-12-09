import React, { useState, useEffect } from 'react';
import './AIPredictions.css';

const AIPredictions = ({ latitude, longitude }) => {
  const [predictions, setPredictions] = useState(null);
  const [comparison, setComparison] = useState(null);
  const [anomalies, setAnomalies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('forecast');

  useEffect(() => {
    if (latitude && longitude) {
      fetchAIPredictions();
    }
  }, [latitude, longitude]);

  const fetchAIPredictions = async () => {
    try {
      setLoading(true);
      
      // Fetch AI forecast
      const forecastResponse = await fetch('/api/predictions/forecast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          hours_ahead: 24
        })
      });
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch AI predictions');
      }
      
      const forecastData = await forecastResponse.json();
      setPredictions(forecastData);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching AI predictions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#10b981'; // green
    if (confidence >= 60) return '#f59e0b'; // orange
    return '#ef4444'; // red
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 80) return 'High';
    if (confidence >= 60) return 'Moderate';
    return 'Low';
  };

  if (loading && !predictions) {
    return (
      <div className="ai-predictions">
        <div className="loading">Loading AI predictions...</div>
      </div>
    );
  }

  if (error && !predictions) {
    return (
      <div className="ai-predictions">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="ai-predictions">
      <div className="ai-header">
        <h2>🤖 AI Weather Predictions</h2>
        <span className="ai-badge">Powered by Machine Learning</span>
      </div>

      <div className="ai-tabs">
        <button
          className={`tab-btn ${activeTab === 'forecast' ? 'active' : ''}`}
          onClick={() => setActiveTab('forecast')}
        >
          AI Forecast
        </button>
        <button
          className={`tab-btn ${activeTab === 'confidence' ? 'active' : ''}`}
          onClick={() => setActiveTab('confidence')}
        >
          Confidence Levels
        </button>
        <button
          className={`tab-btn ${activeTab === 'model' ? 'active' : ''}`}
          onClick={() => setActiveTab('model')}
        >
          Model Info
        </button>
      </div>

      {activeTab === 'forecast' && predictions && predictions.predictions && (
        <div className="forecast-tab">
          <div className="forecast-grid">
            {predictions.predictions.slice(0, 12).map((pred) => (
              <div key={pred.hour} className="forecast-card">
                <div className="forecast-time">
                  +{pred.hour}h
                </div>
                <div className="forecast-temp">
                  {pred.temperature}°C
                </div>
                <div className="forecast-confidence">
                  <div className="confidence-bar">
                    <div
                      className="confidence-fill"
                      style={{
                        width: `${pred.temperature_confidence}%`,
                        backgroundColor: getConfidenceColor(pred.temperature_confidence)
                      }}
                    />
                  </div>
                  <span className="confidence-label">
                    {pred.temperature_confidence.toFixed(0)}% confidence
                  </span>
                </div>
                <div className="forecast-precip">
                  💧 {pred.precipitation_probability.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>

          <div className="forecast-info">
            <p>
              <strong>AI Model:</strong> {predictions.model_info?.temperature_model}
            </p>
            <p>
              <strong>Prediction Horizon:</strong> {predictions.model_info?.prediction_horizon} hours
            </p>
            <p>
              <strong>Model Status:</strong>{' '}
              {predictions.model_info?.is_trained ? (
                <span className="status-trained">✓ Trained</span>
              ) : (
                <span className="status-untrained">⚠ Using Fallback</span>
              )}
            </p>
          </div>
        </div>
      )}

      {activeTab === 'confidence' && predictions && predictions.predictions && (
        <div className="confidence-tab">
          <div className="confidence-chart">
            {predictions.predictions.map((pred) => (
              <div key={pred.hour} className="confidence-bar-item">
                <div className="bar-label">+{pred.hour}h</div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${pred.temperature_confidence}%`,
                      backgroundColor: getConfidenceColor(pred.temperature_confidence)
                    }}
                  />
                </div>
                <div className="bar-value">
                  {pred.temperature_confidence.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>

          <div className="confidence-summary">
            <h3>Confidence Summary</h3>
            <div className="summary-stats">
              <div className="stat">
                <span className="stat-label">Average Confidence:</span>
                <span className="stat-value">
                  {(
                    predictions.predictions.reduce(
                      (sum, p) => sum + p.temperature_confidence,
                      0
                    ) / predictions.predictions.length
                  ).toFixed(1)}
                  %
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">High Confidence Hours:</span>
                <span className="stat-value">
                  {
                    predictions.predictions.filter(
                      (p) => p.temperature_confidence >= 80
                    ).length
                  }
                </span>
              </div>
              <div className="stat">
                <span className="stat-label">Low Confidence Hours:</span>
                <span className="stat-value">
                  {
                    predictions.predictions.filter(
                      (p) => p.temperature_confidence < 60
                    ).length
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'model' && predictions && (
        <div className="model-tab">
          <div className="model-info-card">
            <h3>Temperature Prediction Model</h3>
            <div className="model-details">
              <div className="detail-row">
                <span className="detail-label">Model Type:</span>
                <span className="detail-value">
                  {predictions.model_info?.temperature_model || 'Random Forest'}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Training Status:</span>
                <span className="detail-value">
                  {predictions.model_info?.is_trained ? (
                    <span className="status-trained">✓ Trained</span>
                  ) : (
                    <span className="status-untrained">⚠ Using Fallback Model</span>
                  )}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Prediction Horizon:</span>
                <span className="detail-value">
                  {predictions.model_info?.prediction_horizon} hours
                </span>
              </div>
            </div>
          </div>

          <div className="model-features">
            <h3>Model Features</h3>
            <div className="features-grid">
              <div className="feature-item">📍 Location (lat/lon)</div>
              <div className="feature-item">🕐 Time of day</div>
              <div className="feature-item">📅 Day of year</div>
              <div className="feature-item">🌡️ Temperature history</div>
              <div className="feature-item">🔽 Pressure</div>
              <div className="feature-item">💧 Humidity</div>
              <div className="feature-item">💨 Wind speed</div>
              <div className="feature-item">📈 Trends</div>
            </div>
          </div>

          <div className="model-explanation">
            <h3>How It Works</h3>
            <p>
              Our AI model uses machine learning algorithms trained on historical weather
              data to predict future conditions. The model considers multiple factors
              including location, time, current conditions, and historical patterns to
              generate accurate forecasts with confidence levels.
            </p>
            <p>
              <strong>Confidence levels</strong> indicate how certain the model is about
              its predictions. Higher confidence means the model has seen similar patterns
              in training data and is more certain about the outcome.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPredictions;
