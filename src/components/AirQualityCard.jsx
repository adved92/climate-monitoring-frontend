import React, { useState, useEffect } from 'react';
import './AirQualityCard.css';

const AirQualityCard = ({ latitude, longitude }) => {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchAirQuality();
    }
  }, [latitude, longitude]);

  const fetchAirQuality = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:8000/api/climate/air-quality?lat=${latitude}&lon=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch air quality data');
      }

      const result = await response.json();
      
      if (result.success && result.data) {
        setAqiData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching air quality:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAQIDescription = (level) => {
    const descriptions = {
      1: 'Air quality is good. Enjoy outdoor activities!',
      2: 'Air quality is acceptable for most people.',
      3: 'Sensitive groups should limit prolonged outdoor exertion.',
      4: 'Everyone should avoid prolonged outdoor exertion.',
      5: 'Health alert: everyone may experience health effects.',
      6: 'Health warning: emergency conditions.'
    };
    return descriptions[level] || 'Air quality information unavailable';
  };

  const getPollutantName = (key) => {
    const names = {
      pm2_5: 'PM2.5',
      pm10: 'PM10',
      co: 'CO',
      no2: 'NO₂',
      o3: 'O₃',
      so2: 'SO₂',
      nh3: 'NH₃'
    };
    return names[key] || key.toUpperCase();
  };

  const getPollutantUnit = (key) => {
    if (key === 'co') return 'μg/m³';
    return 'μg/m³';
  };

  if (loading) {
    return (
      <div className="air-quality-card">
        <div className="loading">Loading air quality data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="air-quality-card">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!aqiData) {
    return null;
  }

  return (
    <div className="air-quality-card">
      <div className="aqi-header">
        <h2>Air Quality Index</h2>
        <div className="aqi-timestamp">
          Updated: {new Date(aqiData.timestamp).toLocaleTimeString()}
        </div>
      </div>

      <div className="aqi-main">
        <div 
          className="aqi-value-container"
          style={{ backgroundColor: aqiData.aqi_color }}
        >
          <div className="aqi-value">{aqiData.aqi}</div>
          <div className="aqi-category">{aqiData.aqi_category}</div>
        </div>

        <div className="aqi-description">
          {getAQIDescription(aqiData.aqi_level)}
        </div>
      </div>

      <div className="pollutants-section">
        <h3>Pollutant Breakdown</h3>
        <div className="pollutants-grid">
          {Object.entries(aqiData.pollutants).map(([key, value]) => (
            <div key={key} className="pollutant-item">
              <div className="pollutant-name">{getPollutantName(key)}</div>
              <div className="pollutant-value">
                {value} {getPollutantUnit(key)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {aqiData.health_recommendations && aqiData.health_recommendations.length > 0 && (
        <div className="health-recommendations">
          <h3>Health Recommendations</h3>
          <ul>
            {aqiData.health_recommendations.map((recommendation, index) => (
              <li key={index}>{recommendation}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="aqi-legend">
        <h4>AQI Scale</h4>
        <div className="legend-items">
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#00e400' }}></span>
            <span>Good (0-50)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ffff00' }}></span>
            <span>Moderate (51-100)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff7e00' }}></span>
            <span>Unhealthy for Sensitive (101-150)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#ff0000' }}></span>
            <span>Unhealthy (151-200)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#8f3f97' }}></span>
            <span>Very Unhealthy (201-300)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#7e0023' }}></span>
            <span>Hazardous (301+)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQualityCard;
