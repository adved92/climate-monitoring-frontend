import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import './HourlyForecast.css';
import { climateAPI } from '../services/api';

const HourlyForecast = ({ latitude, longitude }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // 'timeline' or 'chart'
  const [timeRange, setTimeRange] = useState('future24'); // 'past24', 'future24', 'past7days', 'future7days'

  const fetchHourlyForecast = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let result;
      
      // Fetch different data based on time range
      switch (timeRange) {
        case 'past24':
          result = await fetchPast24Hours();
          break;
        case 'future24':
          result = await climateAPI.getHourlyForecast(latitude, longitude);
          break;
        case 'past7days':
          result = await fetchPast7Days();
          break;
        case 'future7days':
          result = await climateAPI.get7DayForecast(latitude, longitude);
          break;
        default:
          result = await climateAPI.getHourlyForecast(latitude, longitude);
      }
      
      if (result && result.success && result.data) {
        setHourlyData(result.data);
      } else if (result && Array.isArray(result)) {
        setHourlyData(result);
      } else if (result && result.data && Array.isArray(result.data)) {
        setHourlyData(result.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setError(err.message || 'Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  }, [latitude, longitude, timeRange]);

  const fetchPast24Hours = async () => {
    // Generate mock historical data for past 24 hours
    const now = new Date();
    const pastData = [];
    
    for (let i = 24; i >= 1; i--) {
      const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
      pastData.push({
        timestamp: timestamp.toISOString(),
        temperature: 20 + Math.sin(i * 0.5) * 8 + Math.random() * 4,
        feels_like: 22 + Math.sin(i * 0.5) * 8 + Math.random() * 3,
        humidity: 60 + Math.random() * 30,
        wind_speed: 5 + Math.random() * 10,
        wind_direction: Math.random() * 360,
        precipitation_prob: Math.random() * 100,
        conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain'][Math.floor(Math.random() * 4)],
        weather_icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)]
      });
    }
    
    return { data: pastData };
  };

  const fetchPast7Days = async () => {
    // Generate mock historical data for past 7 days (daily averages)
    const now = new Date();
    const pastData = [];
    
    for (let i = 7; i >= 1; i--) {
      const timestamp = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      pastData.push({
        timestamp: timestamp.toISOString(),
        temperature: 18 + Math.sin(i * 0.3) * 10 + Math.random() * 6,
        feels_like: 20 + Math.sin(i * 0.3) * 10 + Math.random() * 5,
        humidity: 55 + Math.random() * 35,
        wind_speed: 8 + Math.random() * 12,
        wind_direction: Math.random() * 360,
        precipitation_prob: Math.random() * 100,
        conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Rain', 'Thunderstorm'][Math.floor(Math.random() * 5)],
        weather_icon: ['01d', '02d', '03d', '10d', '11d'][Math.floor(Math.random() * 5)],
        temp_max: 25 + Math.random() * 8,
        temp_min: 12 + Math.random() * 6
      });
    }
    
    return { data: pastData };
  };

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
        <h2>
          {timeRange === 'past24' && '📊 Past 24 Hours'}
          {timeRange === 'future24' && '🔮 Next 24 Hours'}
          {timeRange === 'past7days' && '📈 Past 7 Days'}
          {timeRange === 'future7days' && '📅 7-Day Forecast'}
        </h2>
        
        <div className="forecast-controls">
          <div className="time-range-selector">
            <button 
              className={timeRange === 'past24' ? 'active' : ''}
              onClick={() => setTimeRange('past24')}
            >
              Past 24h
            </button>
            <button 
              className={timeRange === 'future24' ? 'active' : ''}
              onClick={() => setTimeRange('future24')}
            >
              Next 24h
            </button>
            <button 
              className={timeRange === 'past7days' ? 'active' : ''}
              onClick={() => setTimeRange('past7days')}
            >
              Past 7 Days
            </button>
            <button 
              className={timeRange === 'future7days' ? 'active' : ''}
              onClick={() => setTimeRange('future7days')}
            >
              Next 7 Days
            </button>
          </div>
          
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
      </div>

      {viewMode === 'timeline' ? (
        <div className="hourly-timeline">
          {hourlyData.map((hour, index) => (
            <div key={index} className={`hour-card ${timeRange.includes('past') ? 'historical' : 'forecast'}`}>
              <div className="hour-time">
                <div className="time">
                  {timeRange.includes('7days') ? formatDate(hour.timestamp) : formatTime(hour.timestamp)}
                </div>
                {!timeRange.includes('7days') && (
                  <div className="date">{formatDate(hour.timestamp)}</div>
                )}
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
                {timeRange.includes('7days') && hour.temp_max && (
                  <div className="temp-range">
                    H: {Math.round(hour.temp_max)}° L: {Math.round(hour.temp_min)}°
                  </div>
                )}
              </div>

              <div className="hour-details">
                <div className="detail-item">
                  <span className="icon">💧</span>
                  <span>{Math.round(hour.precipitation_prob)}%</span>
                </div>
                <div className="detail-item">
                  <span className="icon">💨</span>
                  <span>{Math.round(hour.wind_speed)} m/s {getWindDirection(hour.wind_direction)}</span>
                </div>
                <div className="detail-item">
                  <span className="icon">💦</span>
                  <span>{Math.round(hour.humidity)}%</span>
                </div>
              </div>
              
              {timeRange.includes('past') && (
                <div className="historical-indicator">
                  <span className="history-badge">Historical</span>
                </div>
              )}
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
