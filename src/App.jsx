import React, { useState, useEffect } from 'react';
import './App.css';
import ClimateCard from './components/ClimateCard';
import ForecastDisplay from './components/ForecastDisplay';
import LocationSearch from './components/LocationSearch';
import AirQualityCard from './components/AirQualityCard';
import HourlyForecast from './components/HourlyForecast';
import { climateAPI } from './services/api';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  // Default location (New York)
  const defaultLocation = { lat: 40.7128, lon: -74.0060, name: 'New York' };

  useEffect(() => {
    // Load default location on startup
    handleLocationSearch({ type: 'coordinates', ...defaultLocation });
  }, []);

  const handleLocationSearch = async (searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      let weatherData;
      let forecastData;
      let coords = null;
      
      if (searchParams.type === 'city') {
        weatherData = await climateAPI.getByCity(searchParams.city);
        // For forecast, we need coordinates, so we'll use the returned coordinates
        if (weatherData && weatherData.location) {
          coords = { lat: weatherData.location.lat, lon: weatherData.location.lon };
          forecastData = await climateAPI.get7DayForecast(coords.lat, coords.lon);
        }
      } else if (searchParams.type === 'coordinates') {
        coords = { lat: searchParams.lat, lon: searchParams.lon };
        weatherData = await climateAPI.getByCoordinates(coords.lat, coords.lon);
        forecastData = await climateAPI.get7DayForecast(coords.lat, coords.lon);
      }

      setCurrentWeather(weatherData);
      setForecast(forecastData?.forecast || []);
      setCoordinates(coords);
      setCurrentLocation(searchParams.name || weatherData?.location?.name || 'Unknown Location');
      
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message || 'Failed to fetch weather data. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    handleLocationSearch({ type: 'coordinates', ...defaultLocation });
  };

  return (
    <div className="app">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <h1>🌍 Climate Monitoring System</h1>
            {currentLocation && (
              <p className="current-location">📍 {currentLocation}</p>
            )}
          </div>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-grid">
            <LocationSearch onSearch={handleLocationSearch} />
            
            <ClimateCard 
              data={currentWeather} 
              loading={loading} 
              error={error} 
            />
            
            <ForecastDisplay 
              forecast={forecast} 
              loading={loading} 
              error={error} 
            />

            {coordinates && (
              <>
                <AirQualityCard 
                  latitude={coordinates.lat} 
                  longitude={coordinates.lon} 
                />
                
                <HourlyForecast 
                  latitude={coordinates.lat} 
                  longitude={coordinates.lon} 
                />
              </>
            )}
          </div>

          {error && (
            <div className="error-banner">
              <p>⚠️ {error}</p>
              <button onClick={handleRetry} className="retry-button-small">
                Retry
              </button>
            </div>
          )}

          {!loading && !error && !currentWeather && (
            <div className="no-data-container">
              <h3>🌤️ Welcome to Climate Monitoring</h3>
              <p>Search for a location above to get started with weather data.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;