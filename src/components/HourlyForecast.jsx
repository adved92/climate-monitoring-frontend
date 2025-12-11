import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './HourlyForecast.css';
import { climateAPI } from '../services/api';

const HourlyForecast = ({ latitude, longitude }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'chart'

  const fetchHourlyForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await climateAPI.getHourlyForecast(latitude, longitude);
      
      if (result && result.success && result.data) {
        setHourlyData(result.data);
      } else if (result && Array.isArray(result)) {
        // Handle case where data is returned directly as array
        setHourlyData(result);
      } else if (result && result.data && Array.isArray(result.data)) {
        setHourlyData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching hourly forecast:', err);
      setError(err.message || 'Failed to fetch hourly forecast');
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchHourlyForecast();
    }
  }, [latitude, longitude, fetchHourlyForecast]);

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <div className="hourly-forecast">
        <div className="loading">Loading hourly forecast...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hourly-forecast">
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  if (!hourlyData || hourlyData.length === 0) {
    return null;
  }

  return (
    <div className="hourly-forecast">
      <div className="hourly-header">
        <h2>48-Hour Forecast</h2>
        <div className="view-toggle">
          <button 
            className={viewMode === 'timeline' ? 'active' : ''}
            onClick={() => setViewMode('timeline')}
          >
            Timeline
          </button>
          <button 
            className={viewMode === 'chart' ? 'active' : ''}
            onClick={() => setViewMode('chart')}
          >
            Charts
          </button>
        </div>
      </div>

      {viewMode === 'timeline' ? (
        <div className="hourly-timeline">
          {hourlyData.map((hour, index) => (
            <div key={index} className="hour-card">
              <div className="hour-time">
                <div className="time">{formatTime(hour.timestamp)}</div>
                <div className="date">{formatDate(hour.timestamp)}</div>
              </div>
              
              <div className="hour-icon">
                <img 
                  src={`https://openweathermap.org/img/wn/${hour.weather_icon}@2x.png`}
                  alt={hour.conditions}
                  title={hour.conditions}
                />
              </div>

              <div className="hour-temp">
                <div className="temp-value">{Math.round(hour.temperature)}°</div>
                <div className="feels-like">Feels {Math.round(hour.feels_like)}°</div>
              </div>

              <div className="hour-details">
                <div className="detail-item">
                  <span className="icon">💧</span>
                  <span>{hour.precipitation_prob}%</span>
                </div>
                <div className="detail-item">
                  <span className="icon">💨</span>
                  <span>{Math.round(hour.wind_speed)} m/s {getWindDirection(hour.wind_direction)}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">💦</span>
                  <span>{hour.humidity}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="hourly-charts">
          <div className="chart-container">
            <h3>Temperature Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatTime}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  labelFormatter={formatTime}
                  formatter={(value) => [`${Math.round(value)}°C`, '']}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#ff6b6b" 
                  strokeWidth={2}
                  name="Temperature"
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="feels_like" 
                  stroke="#4ecdc4" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Feels Like"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Precipitation Probability</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatTime}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  label={{ value: 'Probability (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  labelFormatter={formatTime}
                  formatter={(value) => [`${Math.round(value)}%`, 'Precipitation']}
                />
                <Bar 
                  dataKey="precipitation_prob" 
                  fill="#4a90e2"
                  name="Precipitation Probability"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-container">
            <h3>Wind Speed</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatTime}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  label={{ value: 'Wind Speed (m/s)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  labelFormatter={formatTime}
                  formatter={(value) => [`${Math.round(value)} m/s`, 'Wind Speed']}
                />
                <Line 
                  type="monotone" 
                  dataKey="wind_speed" 
                  stroke="#95e1d3" 
                  strokeWidth={2}
                  name="Wind Speed"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourlyForecast;
