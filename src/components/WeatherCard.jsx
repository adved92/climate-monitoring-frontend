import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ data }) => {
  if (!data || !data.data) return null;

  const weather = data.data;
  
  // Get weather icon based on conditions
  const getWeatherIcon = (condition, iconCode) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Haze': '🌫️',
      'Fog': '🌫️',
      'Smoke': '💨',
      'Dust': '🌪️',
      'Sand': '🌪️',
      'Ash': '🌋',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    
    return iconMap[condition] || '🌤️';
  };

  // Get temperature color based on value
  const getTempColor = (temp) => {
    if (temp < 0) return '#4FC3F7';      // Light Blue
    if (temp < 10) return '#81C784';     // Light Green
    if (temp < 20) return '#FFB74D';     // Orange
    if (temp < 30) return '#FF8A65';     // Light Red
    return '#F44336';                    // Red
  };

  // Format wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const weatherIcon = getWeatherIcon(weather.weather_main, weather.weather_icon);
  const tempColor = getTempColor(weather.temperature);

  return (
    <div className="weather-card">
      <div className="weather-main">
        <div className="weather-icon-large">
          {weatherIcon}
        </div>
        <div className="weather-temp">
          <span className="temp-value" style={{ color: tempColor }}>
            {Math.round(weather.temperature)}°C
          </span>
          <span className="temp-feels-like">
            Feels like {Math.round(weather.feels_like)}°C
          </span>
        </div>
        <div className="weather-condition">
          <h3>{weather.conditions}</h3>
          <p>{weather.location?.name}, {weather.location?.country}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🌡️</span>
            <div className="detail-info">
              <span className="detail-label">Min/Max</span>
              <span className="detail-value">{Math.round(weather.temp_min)}° / {Math.round(weather.temp_max)}°</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">💧</span>
            <div className="detail-info">
              <span className="detail-label">Humidity</span>
              <span className="detail-value">{weather.humidity}%</span>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">🌬️</span>
            <div className="detail-info">
              <span className="detail-label">Wind</span>
              <span className="detail-value">{weather.wind_speed} m/s {getWindDirection(weather.wind_direction)}</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">📊</span>
            <div className="detail-info">
              <span className="detail-label">Pressure</span>
              <span className="detail-value">{weather.pressure} hPa</span>
            </div>
          </div>
        </div>

        <div className="detail-row">
          <div className="detail-item">
            <span className="detail-icon">☁️</span>
            <div className="detail-info">
              <span className="detail-label">Clouds</span>
              <span className="detail-value">{weather.clouds}%</span>
            </div>
          </div>
          
          <div className="detail-item">
            <span className="detail-icon">👁️</span>
            <div className="detail-info">
              <span className="detail-label">Visibility</span>
              <span className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>

        {weather.precipitation > 0 && (
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-icon">🌧️</span>
              <div className="detail-info">
                <span className="detail-label">Precipitation</span>
                <span className="detail-value">{weather.precipitation} mm</span>
              </div>
            </div>
          </div>
        )}
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

export default WeatherCard;