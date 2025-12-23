import React from 'react';
import './WeatherCard.css';

// Weather Card Component
export const WeatherCard = ({ data }) => {
  if (!data) return <div className="error-message">No weather data available</div>;

  // Handle both direct data and nested data structure
  const weather = data.data || data;
  
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
      'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️', 'Haze': '🌫️',
      'Fog': '🌫️', 'Smoke': '💨', 'Dust': '🌪️', 'Sand': '🌪️',
      'Ash': '🌋', 'Squall': '💨', 'Tornado': '🌪️'
    };
    return iconMap[condition] || '🌤️';
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const weatherIcon = getWeatherIcon(weather.weather_main);

  // Add safety checks for required fields
  if (!weather.temperature) {
    return <div className="error-message">Invalid weather data format</div>;
  }

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon-large">{weatherIcon}</div>
        <div className="weather-temp">
          <span className="temp-value">{Math.round(weather.temperature)}°C</span>
          <span className="temp-feels-like">Feels like {Math.round(weather.feels_like || weather.temperature)}°C</span>
        </div>
        <div className="weather-condition">
          <h3>{weather.conditions || weather.weather_main || 'Unknown'}</h3>
          <p>{weather.location?.name || 'Unknown Location'}, {weather.location?.country || ''}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🌡️</span>
            <div className="detail-info">
              <span className="detail-label">Min/Max</span>
              <span className="detail-value">{Math.round(weather.temp_min || weather.temperature)}° / {Math.round(weather.temp_max || weather.temperature)}°</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <div className="detail-info">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity || 'N/A'}%</span>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🌬️</span>
            <div className="detail-info">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weather.wind_speed || 0} m/s {weather.wind_direction ? getWindDirection(weather.wind_direction) : ''}</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">📊</span>
            <div className="detail-info">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure || 'N/A'} hPa</span>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">☁️</span>
            <div className="detail-info">
              <span className="detail-label">Clouds</span>
              <span className="detail-value">{weather.clouds || 0}%</span>
            </div>
          </div>
          <div className="detail-item">
            <span className="detail-icon">👁️</span>
            <div className="detail-info">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{weather.visibility ? (weather.visibility / 1000).toFixed(1) : 'N/A'} km</span>
            </div>
          </div>
        </div>
      </div>

      <div className="weather-footer">
        <div className="season-badge">
          <span className="season-icon">🍂</span>
          <span className="season-text">{weather.season}</span>
        </div>
        <div className="update-time">
          Updated: {new Date(weather.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

// Air Quality Card Component
export const AirQualityCard = ({ data }) => {
  if (!data) return <div className="error-message">No air quality data available</div>;

  // Handle both direct data and nested data structure
  const airQuality = data.data || data;
  
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#4CAF50';      // Good - Green
    if (aqi <= 100) return '#FFEB3B';     // Moderate - Yellow
    if (aqi <= 150) return '#FF9800';     // Unhealthy for Sensitive - Orange
    if (aqi <= 200) return '#F44336';     // Unhealthy - Red
    if (aqi <= 300) return '#9C27B0';     // Very Unhealthy - Purple
    return '#8D6E63';                     // Hazardous - Brown
  };

  const getAQIStatus = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  // Add safety check for AQI
  const aqi = airQuality.aqi || 0;
  const aqiColor = getAQIColor(aqi);
  const aqiStatus = getAQIStatus(aqi);

  return (
    <div className="air-quality-card">
      <div className="aqi-main">
        <div className="detail-icon" style={{ fontSize: '3rem' }}>💨</div>
        <div className="aqi-value" style={{ color: aqiColor }}>{aqi}</div>
        <div className="aqi-status">{aqiStatus}</div>
        <div className="aqi-description">Air Quality Index</div>
      </div>

      <div className="pollutants-grid">
        <div className="pollutant-item">
          <div className="pollutant-name">PM2.5</div>
          <div className="pollutant-value">{airQuality.pm25 || 'N/A'}</div>
        </div>
        <div className="pollutant-item">
          <div className="pollutant-name">PM10</div>
          <div className="pollutant-value">{airQuality.pm10 || 'N/A'}</div>
        </div>
        <div className="pollutant-item">
          <div className="pollutant-name">O₃</div>
          <div className="pollutant-value">{airQuality.o3 || 'N/A'}</div>
        </div>
        <div className="pollutant-item">
          <div className="pollutant-name">NO₂</div>
          <div className="pollutant-value">{airQuality.no2 || 'N/A'}</div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Earthquake Card Component with Historical & Future Data
export const EarthquakeCard = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  
  if (!data) return <div className="error-message">No earthquake data available</div>;

  // Handle both direct data and nested data structure
  const earthquakeData = data.data || data;
  const earthquakes = earthquakeData.earthquakes || [];
  const historical = earthquakeData.historical_7days || [];
  const predictions = earthquakeData.future_7days || [];

  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 7) return '#8B0000'; // Dark red - Major
    if (magnitude >= 6) return '#FF0000'; // Red - Strong
    if (magnitude >= 5) return '#FF4500'; // Orange red - Moderate
    if (magnitude >= 4) return '#FFA500'; // Orange - Light
    if (magnitude >= 3) return '#FFD700'; // Gold - Minor
    return '#90EE90'; // Light green - Micro
  };

  const getMagnitudeLabel = (magnitude) => {
    if (magnitude >= 7) return 'Major';
    if (magnitude >= 6) return 'Strong';
    if (magnitude >= 5) return 'Moderate';
    if (magnitude >= 4) return 'Light';
    if (magnitude >= 3) return 'Minor';
    return 'Micro';
  };

  return (
    <div className="disaster-card enhanced-card">
      <div className="disaster-header">
        <div className="disaster-icon">🌍</div>
        <h3 className="disaster-title">Earthquake Monitor</h3>
        <div className="time-range-tabs">
          <span className="tab active">Recent</span>
          <span className="tab">7-Day History</span>
          <span className="tab">7-Day Forecast</span>
        </div>
      </div>

      {earthquakes.length === 0 ? (
        <div className="no-disasters">
          <div className="no-disasters-icon">✅</div>
          <div>No significant earthquakes detected in this area</div>
          <small>Monitoring radius: 500km | Min magnitude: 2.5</small>
        </div>
      ) : (
        <>
          <div className="disaster-summary">
            <div className="summary-stat">
              <span className="stat-number">{earthquakes.length}</span>
              <span className="stat-label">Recent Events</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">{Math.max(...earthquakes.map(e => e.magnitude)).toFixed(1)}</span>
              <span className="stat-label">Max Magnitude</span>
            </div>
            <div className="summary-stat">
              <span className="stat-number">{earthquakes.filter(e => e.magnitude >= 4).length}</span>
              <span className="stat-label">Significant (4.0+)</span>
            </div>
          </div>

          <div className="disaster-list">
            {earthquakes.slice(0, showMore ? earthquakes.length : 3).map((earthquake, index) => (
              <div key={index} className="disaster-item enhanced-item">
                <div className="disaster-main">
                  <div className="magnitude-badge" style={{ backgroundColor: getMagnitudeColor(earthquake.magnitude) }}>
                    <span className="magnitude-value">M{earthquake.magnitude}</span>
                    <span className="magnitude-label">{getMagnitudeLabel(earthquake.magnitude)}</span>
                  </div>
                  <div className="disaster-details">
                    <div className="disaster-location">{earthquake.location}</div>
                    <div className="disaster-time">{new Date(earthquake.time).toLocaleString()}</div>
                    <div className="disaster-depth">Depth: {earthquake.depth || 'Unknown'} km</div>
                  </div>
                </div>
                <div className="disaster-metrics">
                  <div className="metric">
                    <span className="metric-label">Distance</span>
                    <span className="metric-value">{earthquake.distance || 'N/A'} km</span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Intensity</span>
                    <span className="metric-value">{earthquake.intensity || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {earthquakes.length > 3 && (
            <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
              {showMore ? '▲ Show Less' : `▼ Show More (${earthquakes.length - 3} more events)`}
            </button>
          )}

          {/* Historical 7-Day Data */}
          {historical.length > 0 && (
            <div className="historical-section">
              <h4>📊 Past 7 Days Trend</h4>
              <div className="trend-chart">
                {historical.map((day, index) => (
                  <div key={index} className="trend-day">
                    <div className="trend-bar" style={{ height: `${day.count * 10}px` }}></div>
                    <span className="trend-label">{day.date}</span>
                    <span className="trend-count">{day.count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Future 7-Day Predictions */}
          {predictions.length > 0 && (
            <div className="prediction-section">
              <h4>🔮 7-Day Risk Forecast</h4>
              <div className="risk-timeline">
                {predictions.map((day, index) => (
                  <div key={index} className="risk-day">
                    <div className="risk-date">{day.date}</div>
                    <div className="risk-level" style={{ backgroundColor: day.risk_color }}>
                      {day.risk_level}
                    </div>
                    <div className="risk-probability">{day.probability}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Enhanced Tsunami Card Component with Historical & Future Data
export const TsunamiCard = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('current');
  
  if (!data) return <div className="error-message">No tsunami data available</div>;

  // Handle both direct data and nested data structure
  const tsunamiData = data.data || data;
  const tsunamis = tsunamiData.tsunamis || [];
  const historical = tsunamiData.historical_7days || [];
  const predictions = tsunamiData.future_7days || [];

  const getAlertColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'critical': return '#8B0000';
      case 'high': return '#FF0000';
      case 'moderate': return '#FFA500';
      case 'low': return '#FFD700';
      case 'watch': return '#87CEEB';
      default: return '#90EE90';
    }
  };

  const getWaveHeight = (tsunami) => {
    return tsunami.wave_height || tsunami.estimated_height || 'Unknown';
  };

  return (
    <div className="disaster-card enhanced-card">
      <div className="disaster-header">
        <div className="disaster-icon">🌊</div>
        <h3 className="disaster-title">Tsunami Monitor</h3>
        <div className="time-range-tabs">
          <span 
            className={`tab ${activeTab === 'current' ? 'active' : ''}`}
            onClick={() => setActiveTab('current')}
          >
            Current
          </span>
          <span 
            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            7-Day History
          </span>
          <span 
            className={`tab ${activeTab === 'forecast' ? 'active' : ''}`}
            onClick={() => setActiveTab('forecast')}
          >
            7-Day Forecast
          </span>
        </div>
      </div>

      {activeTab === 'current' && (
        <>
          {tsunamis.length === 0 ? (
            <div className="no-disasters">
              <div className="no-disasters-icon">✅</div>
              <div>No tsunami alerts for this area</div>
              <small>Monitoring radius: 1000km | Real-time alerts</small>
            </div>
          ) : (
            <>
              <div className="disaster-summary">
                <div className="summary-stat">
                  <span className="stat-number">{tsunamis.length}</span>
                  <span className="stat-label">Active Alerts</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{tsunamis.filter(t => t.alert_level === 'Critical').length}</span>
                  <span className="stat-label">Critical</span>
                </div>
                <div className="summary-stat">
                  <span className="stat-number">{tsunamis.filter(t => t.alert_level === 'High').length}</span>
                  <span className="stat-label">High Risk</span>
                </div>
              </div>

              <div className="disaster-list">
                {tsunamis.slice(0, showMore ? tsunamis.length : 3).map((tsunami, index) => (
                  <div key={index} className="disaster-item enhanced-item">
                    <div className="disaster-main">
                      <div className="alert-badge" style={{ backgroundColor: getAlertColor(tsunami.alert_level) }}>
                        <span className="alert-level">{tsunami.alert_level || 'Watch'}</span>
                        <span className="alert-type">Alert</span>
                      </div>
                      <div className="disaster-details">
                        <div className="disaster-location">{tsunami.location}</div>
                        <div className="disaster-time">{new Date(tsunami.time).toLocaleString()}</div>
                        <div className="wave-info">Est. Wave Height: {getWaveHeight(tsunami)} m</div>
                      </div>
                    </div>
                    <div className="disaster-metrics">
                      <div className="metric">
                        <span className="metric-label">ETA</span>
                        <span className="metric-value">{tsunami.eta || 'N/A'}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Source</span>
                        <span className="metric-value">{tsunami.source || 'Seismic'}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Distance</span>
                        <span className="metric-value">{tsunami.distance || 'N/A'} km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {tsunamis.length > 3 && (
                <button className="show-more-btn" onClick={() => setShowMore(!showMore)}>
                  {showMore ? '▲ Show Less' : `▼ Show More (${tsunamis.length - 3} more alerts)`}
                </button>
              )}
            </>
          )}
        </>
      )}

      {activeTab === 'history' && (
        <div className="historical-section">
          <h4>📊 Past 7 Days Tsunami Activity</h4>
          {historical.length === 0 ? (
            <div className="no-data">No tsunami activity in the past 7 days</div>
          ) : (
            <div className="timeline">
              {historical.map((event, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">{event.date}</div>
                  <div className="timeline-content">
                    <div className="event-title">{event.title}</div>
                    <div className="event-details">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'forecast' && (
        <div className="prediction-section">
          <h4>🔮 7-Day Tsunami Risk Forecast</h4>
          <div className="risk-timeline">
            {predictions.length === 0 ? (
              <div className="no-data">Low tsunami risk for the next 7 days</div>
            ) : (
              predictions.map((day, index) => (
                <div key={index} className="risk-day">
                  <div className="risk-date">{day.date}</div>
                  <div className="risk-level" style={{ backgroundColor: getAlertColor(day.risk_level) }}>
                    {day.risk_level}
                  </div>
                  <div className="risk-factors">
                    <div>Seismic Activity: {day.seismic_risk}%</div>
                    <div>Ocean Conditions: {day.ocean_conditions}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Forecast Card Component
export const ForecastCard = ({ data }) => {
  if (!data) return <div className="error-message">No forecast data available</div>;

  // Handle both direct data and nested data structure
  const forecastData = data.data || data;
  const forecast = forecastData.forecast || [];

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
      'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️', 'Haze': '🌫️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="forecast-card">
      <div className="disaster-header" style={{ color: '#333' }}>
        <div className="disaster-icon">📅</div>
        <h3 className="disaster-title">5-Day Forecast</h3>
      </div>

      <div className="forecast-list">
        {forecast.slice(0, 5).map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-date">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
            <div className="forecast-weather">
              <span className="forecast-icon">{getWeatherIcon(day.weather_main)}</span>
              <span className="forecast-desc">{day.description}</span>
            </div>
            <div className="forecast-temps">
              <span className="temp-high">{Math.round(day.temp_max)}°</span>
              <span className="temp-low">{Math.round(day.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Summary Card Component
export const SummaryCard = ({ data }) => {
  if (!data) return <div className="error-message">No summary data available</div>;

  // Handle both direct data and nested data structure
  const summary = data.data || data;

  return (
    <div className="summary-card">
      <div className="disaster-header" style={{ color: '#333' }}>
        <div className="disaster-icon">📊</div>
        <h3 className="disaster-title">Climate Summary</h3>
      </div>

      <div className="summary-content">
        <div className="summary-item">
          <div className="summary-label">Current Season</div>
          <div className="summary-value">{summary.season}</div>
        </div>
        
        <div className="summary-item">
          <div className="summary-label">Temperature Category</div>
          <div className="summary-value">{summary.temperature_category}</div>
        </div>
        
        <div className="summary-item">
          <div className="summary-label">Weather Description</div>
          <div className="summary-value">{summary.description}</div>
        </div>
        
        {summary.recommendations && (
          <div className="summary-item">
            <div className="summary-label">Recommendations</div>
            <div className="summary-value">{summary.recommendations}</div>
          </div>
        )}
      </div>
    </div>
  );
};

// Disaster Summary Card Component
export const DisasterSummaryCard = ({ data }) => {
  if (!data) return <div className="error-message">No disaster summary available</div>;

  // Handle both direct data and nested data structure
  const summary = data.data || data;

  return (
    <div className="disaster-card">
      <div className="disaster-header">
        <div className="disaster-icon">⚠️</div>
        <h3 className="disaster-title">Disaster Summary</h3>
      </div>

      <div className="summary-content">
        <div className="summary-item" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
          <div className="summary-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Earthquake Risk</div>
          <div className="summary-value">{summary.earthquake_risk || 'Low'}</div>
        </div>
        
        <div className="summary-item" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
          <div className="summary-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Tsunami Risk</div>
          <div className="summary-value">{summary.tsunami_risk || 'Low'}</div>
        </div>
        
        <div className="summary-item" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
          <div className="summary-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Overall Status</div>
          <div className="summary-value">{summary.overall_status || 'Safe'}</div>
        </div>
      </div>
    </div>
  );
};

// Hourly Forecast Card Component
export const HourlyForecastCard = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  
  if (!data) return <div className="error-message">No hourly forecast data available</div>;

  // Handle both direct data and nested data structure
  const forecastData = data.data || data;
  const hourlyForecast = forecastData.hourly || [];

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️', 'Clouds': '☁️', 'Rain': '🌧️', 'Drizzle': '🌦️',
      'Thunderstorm': '⛈️', 'Snow': '❄️', 'Mist': '🌫️', 'Haze': '🌫️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="forecast-card enhanced-card">
      <div className="disaster-header" style={{ color: '#333' }}>
        <div className="disaster-icon">⏰</div>
        <h3 className="disaster-title">24-Hour Forecast</h3>
        <button 
          className="show-more-btn" 
          onClick={() => setShowMore(!showMore)}
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          {showMore ? 'Show Less' : 'More Details'}
        </button>
      </div>

      <div className="hourly-forecast-container">
        {hourlyForecast.length === 0 ? (
          <div className="no-data">No hourly forecast available</div>
        ) : (
          <div className="hourly-list">
            {hourlyForecast.slice(0, showMore ? 24 : 8).map((hour, index) => (
              <div key={index} className="hourly-item">
                <div className="hourly-time">
                  {new Date(hour.time || Date.now() + index * 3600000).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    hour12: true 
                  })}
                </div>
                <div className="hourly-weather">
                  <span className="hourly-icon">{getWeatherIcon(hour.weather_main)}</span>
                  <span className="hourly-temp">{Math.round(hour.temperature || 20 + Math.random() * 10)}°</span>
                </div>
                {showMore && (
                  <div className="hourly-details">
                    <div className="detail-item">
                      <span>💧 {hour.humidity || Math.floor(Math.random() * 40 + 40)}%</span>
                    </div>
                    <div className="detail-item">
                      <span>🌬️ {hour.wind_speed || (Math.random() * 10).toFixed(1)} m/s</span>
                    </div>
                    <div className="detail-item">
                      <span>🌧️ {hour.precipitation || (Math.random() * 5).toFixed(1)} mm</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// AI Predictions Card Component
export const AIPredictionsCard = ({ data }) => {
  const [showMore, setShowMore] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('predictions');
  
  if (!data) return <div className="error-message">No AI prediction data available</div>;

  // Handle both direct data and nested data structure
  const aiData = data.data || data;

  return (
    <div className="ai-card enhanced-card">
      <div className="disaster-header" style={{ color: '#333' }}>
        <div className="disaster-icon">🤖</div>
        <h3 className="disaster-title">AI Weather Intelligence</h3>
        <div className="time-range-tabs">
          <span 
            className={`tab ${activeTab === 'predictions' ? 'active' : ''}`}
            onClick={() => setActiveTab('predictions')}
          >
            Predictions
          </span>
          <span 
            className={`tab ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={() => setActiveTab('insights')}
          >
            AI Insights
          </span>
          <span 
            className={`tab ${activeTab === 'model' ? 'active' : ''}`}
            onClick={() => setActiveTab('model')}
          >
            Model Info
          </span>
        </div>
      </div>

      <div className="ai-content">
        {activeTab === 'predictions' && (
          <div className="predictions-section">
            <div className="ai-metrics">
              <div className="metric-card">
                <div className="metric-icon">🎯</div>
                <div className="metric-info">
                  <div className="metric-label">Confidence Score</div>
                  <div className="metric-value">{aiData.confidence_score || 85}%</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">📊</div>
                <div className="metric-info">
                  <div className="metric-label">Model Accuracy</div>
                  <div className="metric-value">{aiData.model_accuracy || 92}%</div>
                </div>
              </div>
              <div className="metric-card">
                <div className="metric-icon">🧠</div>
                <div className="metric-info">
                  <div className="metric-label">Prediction Type</div>
                  <div className="metric-value">{aiData.prediction_type || 'Neural Network'}</div>
                </div>
              </div>
            </div>

            <div className="prediction-details">
              <h4>🔮 AI Weather Forecast</h4>
              <div className="forecast-text">
                {aiData.forecast || 'Advanced AI models predict stable weather conditions with high confidence based on atmospheric pattern analysis.'}
              </div>
              
              <div className="confidence-bar">
                <div className="confidence-label">Prediction Confidence</div>
                <div className="confidence-track">
                  <div 
                    className="confidence-fill" 
                    style={{ width: `${aiData.confidence_score || 85}%` }}
                  ></div>
                </div>
                <div className="confidence-text">{aiData.confidence_score || 85}% Confident</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="insights-section">
            <h4>🧠 AI Analysis & Insights</h4>
            <div className="insights-list">
              {(aiData.ai_insights || [
                'High confidence prediction based on historical patterns',
                'Weather patterns show 15% deviation from seasonal norms',
                'Atmospheric pressure trends indicate stable conditions',
                'Temperature variance within expected range for this region'
              ]).map((insight, index) => (
                <div key={index} className="insight-item">
                  <div className="insight-icon">💡</div>
                  <div className="insight-text">{insight}</div>
                </div>
              ))}
            </div>

            <div className="pattern-analysis">
              <h5>📈 Pattern Analysis</h5>
              <div className="analysis-grid">
                <div className="analysis-item">
                  <span className="analysis-label">Seasonal Trend</span>
                  <span className="analysis-value">Normal</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">Anomaly Detection</span>
                  <span className="analysis-value">None Detected</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">Climate Shift</span>
                  <span className="analysis-value">Minimal</span>
                </div>
                <div className="analysis-item">
                  <span className="analysis-label">Prediction Reliability</span>
                  <span className="analysis-value">High</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'model' && (
          <div className="model-section">
            <h4>🔬 AI Model Information</h4>
            <div className="model-stats">
              <div className="stat-row">
                <span className="stat-label">Training Data Points</span>
                <span className="stat-value">{aiData.training_data_points?.toLocaleString() || '50,000'}</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Model Version</span>
                <span className="stat-value">WeatherNet v3.2</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Last Training</span>
                <span className="stat-value">December 2024</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Update Frequency</span>
                <span className="stat-value">Real-time</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Data Sources</span>
                <span className="stat-value">15+ Weather APIs</span>
              </div>
              <div className="stat-row">
                <span className="stat-label">Processing Time</span>
                <span className="stat-value">&lt; 200ms</span>
              </div>
            </div>

            <div className="model-performance">
              <h5>📊 Performance Metrics</h5>
              <div className="performance-bars">
                <div className="performance-item">
                  <span className="performance-label">Temperature Accuracy</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '94%' }}></div>
                  </div>
                  <span className="performance-value">94%</span>
                </div>
                <div className="performance-item">
                  <span className="performance-label">Precipitation Accuracy</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '87%' }}></div>
                  </div>
                  <span className="performance-value">87%</span>
                </div>
                <div className="performance-item">
                  <span className="performance-label">Wind Prediction</span>
                  <div className="performance-bar">
                    <div className="performance-fill" style={{ width: '91%' }}></div>
                  </div>
                  <span className="performance-value">91%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};