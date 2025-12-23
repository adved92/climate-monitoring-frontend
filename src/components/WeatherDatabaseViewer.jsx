import React, { useState, useEffect } from 'react';
import { climateAPI } from '../services/api';
import './WeatherDatabaseViewer.css';

const WeatherDatabaseViewer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [error, setError] = useState(null);

  // Popular cities for quick access
  const popularCities = [
    { name: 'New York', country: 'United States', coordinates: { lat: 40.7128, lon: -74.0060 } },
    { name: 'London', country: 'United Kingdom', coordinates: { lat: 51.5074, lon: -0.1278 } },
    { name: 'Tokyo', country: 'Japan', coordinates: { lat: 35.6762, lon: 139.6503 } },
    { name: 'Sydney', country: 'Australia', coordinates: { lat: -33.8688, lon: 151.2093 } },
    { name: 'Mumbai', country: 'India', coordinates: { lat: 19.0760, lon: 72.8777 } },
    { name: 'Paris', country: 'France', coordinates: { lat: 48.8566, lon: 2.3522 } },
    { name: 'Berlin', country: 'Germany', coordinates: { lat: 52.5200, lon: 13.4050 } },
    { name: 'Moscow', country: 'Russia', coordinates: { lat: 55.7558, lon: 37.6176 } }
  ];

  // Search for cities
  const searchCities = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await climateAPI.globalSearch(query, false, 10);
      if (response.success && response.data.cities) {
        setSearchResults(response.data.cities);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Error searching cities:', err);
      setError('Failed to search cities. Please try again.');
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Get 7-day forecast for selected city
  const get7DayForecast = async (city) => {
    setForecastLoading(true);
    setError(null);
    
    try {
      const { lat, lon } = city.coordinates;
      const response = await climateAPI.get7DayForecast(lat, lon);
      
      if (response.success && response.data) {
        setForecastData(response.data);
        setSelectedCity(city);
      } else {
        throw new Error('Failed to fetch forecast data');
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError('Failed to fetch 7-day forecast. Please try again.');
      setForecastData([]);
    } finally {
      setForecastLoading(false);
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      searchCities(query);
    }, 300);
  };

  // Select city from search results or popular cities
  const selectCity = (city) => {
    setSearchQuery(city.name);
    setSearchResults([]);
    get7DayForecast(city);
  };

  // Format date for forecast display
  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  // Download 7-day hourly forecast data
  const downloadForecastData = async () => {
    if (!selectedCity) return;
    
    try {
      const response = await climateAPI.getHourly7DayForecast(
        selectedCity.coordinates.lat, 
        selectedCity.coordinates.lon
      );
      
      if (response.success && response.data) {
        const csvData = generateCSV(response.data, selectedCity.name);
        downloadCSV(csvData, `${selectedCity.name}_7day_forecast_${new Date().toISOString().split('T')[0]}.csv`);
      }
    } catch (err) {
      setError('Failed to download forecast data');
    }
  };

  // Generate CSV content
  const generateCSV = (data, cityName) => {
    const headers = [
      'timestamp',
      'temperature',
      'feels_like', 
      'humidity',
      'wind_speed',
      'wind_direction',
      'precipitation_probability',
      'weather_conditions'
    ];
    
    let csv = `# 7-Day Weather Forecast Export\n`;
    csv += `# City: ${cityName}\n`;
    csv += `# Generated: ${new Date().toISOString()}\n`;
    csv += `# Total Data Points: ${data.length}\n\n`;
    csv += headers.join(',') + '\n';
    
    data.forEach(point => {
      const row = headers.map(header => point[header] || '').join(',');
      csv += row + '\n';
    });
    
    return csv;
  };

  // Download CSV file
  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Get wind direction
  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className="weather-database-viewer">
      <div className="viewer-header">
        <h1>🌤️ Weather Database Viewer</h1>
        <p>Search for any city and get 7-day forecast with hourly data (60-minute intervals)</p>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {/* City Search Section */}
      <div className="section">
        <h2>🔍 Search Cities</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for any city worldwide..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="city-search-input"
          />
          {loading && <div className="search-loading">Searching...</div>}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Search Results:</h3>
            <div className="city-grid">
              {searchResults.map((city, index) => (
                <div key={index} className="city-card" onClick={() => selectCity(city)}>
                  <div className="city-name">{city.name}</div>
                  <div className="city-country">{city.country}</div>
                  <div className="city-coords">
                    {city.coordinates.lat.toFixed(2)}, {city.coordinates.lon.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Popular Cities */}
        <div className="popular-cities">
          <h3>Popular Cities:</h3>
          <div className="city-grid">
            {popularCities.map((city, index) => (
              <div key={index} className="city-card" onClick={() => selectCity(city)}>
                <div className="city-name">{city.name}</div>
                <div className="city-country">{city.country}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Section */}
      {selectedCity && (
        <div className="section">
          <div className="forecast-header">
            <h2>📅 7-Day Forecast for {selectedCity.name}</h2>
            {forecastData.length > 0 && (
              <button 
                className="download-btn"
                onClick={downloadForecastData}
                disabled={forecastLoading}
                title="Download 7-Day Weather Data (60-minute intervals)"
              >
                📥 Download CSV
              </button>
            )}
          </div>

          {forecastLoading && (
            <div className="loading">Loading 7-day forecast...</div>
          )}

          {forecastData.length > 0 && (
            <div className="forecast-grid">
              {forecastData.map((day, index) => (
                <div key={index} className="forecast-day-card">
                  <div className="day-header">
                    <div className="day-name">{formatDate(day.timestamp || day.date)}</div>
                    <div className="day-date">
                      {new Date(day.timestamp || day.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="weather-icon-section">
                    <img 
                      src={`https://openweathermap.org/img/wn/${day.weather_icon}@2x.png`}
                      alt={day.conditions}
                      className="weather-icon"
                    />
                    <div className="conditions">{day.conditions}</div>
                  </div>

                  <div className="temperature-section">
                    <div className="temp-range">
                      <span className="temp-high">{Math.round(day.temp_max || day.temperature)}°</span>
                      <span className="temp-separator">/</span>
                      <span className="temp-low">{Math.round(day.temp_min || (day.temperature - 5))}°</span>
                    </div>
                    <div className="avg-temp">Avg: {Math.round(day.temperature)}°C</div>
                  </div>

                  <div className="weather-details">
                    <div className="detail-row">
                      <span className="detail-icon">💧</span>
                      <span className="detail-label">Rain:</span>
                      <span className="detail-value">{Math.round(day.precipitation_prob)}%</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-icon">💨</span>
                      <span className="detail-label">Wind:</span>
                      <span className="detail-value">{Math.round(day.wind_speed)} m/s {getWindDirection(day.wind_direction)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-icon">💦</span>
                      <span className="detail-label">Humidity:</span>
                      <span className="detail-value">{Math.round(day.humidity)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!forecastLoading && forecastData.length === 0 && selectedCity && (
            <div className="no-data">
              <p>No forecast data available for {selectedCity.name}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDatabaseViewer;