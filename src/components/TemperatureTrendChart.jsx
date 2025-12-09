import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './TemperatureTrendChart.css';

const TemperatureTrendChart = ({ latitude, longitude }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('24h'); // '24h' or 'forecast'

  useEffect(() => {
    if (latitude && longitude) {
      fetchTemperatureData();
    }
  }, [latitude, longitude, timeRange]);

  const fetchTemperatureData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      if (timeRange === '24h') {
        // Fetch historical 24-hour data (simulated for now)
        const data = generateHistoricalData();
        setChartData(data);
      } else {
        // Fetch forecast data
        const response = await fetch(
          `${apiUrl}/api/climate/forecast/hourly?latitude=${latitude}&longitude=${longitude}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const result = await response.json();
        const formattedData = formatForecastData(result.forecast || []);
        setChartData(formattedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateHistoricalData = () => {
    // Generate simulated 24-hour historical data
    const data = [];
    const now = new Date();
    
    for (let i = 24; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60 * 60 * 1000);
      const hour = time.getHours();
      
      // Simulate temperature variation
      const baseTemp = 20;
      const variation = Math.sin((hour - 6) * Math.PI / 12) * 8;
      const temp = baseTemp + variation + (Math.random() - 0.5) * 2;
      
      data.push({
        time: `${hour.toString().padStart(2, '0')}:00`,
        temperature: parseFloat(temp.toFixed(1)),
        timestamp: time.getTime(),
      });
    }
    
    return data;
  };

  const formatForecastData = (forecast) => {
    return forecast.slice(0, 24).map((item) => {
      const date = new Date(item.time);
      return {
        time: `${date.getHours().toString().padStart(2, '0')}:00`,
        temperature: item.temperature,
        feelsLike: item.feels_like,
        timestamp: date.getTime(),
      };
    });
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-time">{payload[0].payload.time}</p>
          <p className="tooltip-temp">
            <span className="temp-label">Temperature:</span>
            <span className="temp-value">{payload[0].value}°C</span>
          </p>
          {payload[1] && (
            <p className="tooltip-feels">
              <span className="feels-label">Feels Like:</span>
              <span className="feels-value">{payload[1].value}°C</span>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  if (!latitude || !longitude) {
    return (
      <div className="temperature-trend-chart">
        <div className="chart-header">
          <h3>📈 Temperature Trend</h3>
        </div>
        <div className="chart-no-location">
          <p>Please select a location to view temperature trends</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="temperature-trend-chart">
        <div className="chart-header">
          <h3>📈 Temperature Trend</h3>
        </div>
        <div className="chart-loading">Loading temperature data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="temperature-trend-chart">
        <div className="chart-header">
          <h3>📈 Temperature Trend</h3>
        </div>
        <div className="chart-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchTemperatureData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="temperature-trend-chart">
      <div className="chart-header">
        <h3>📈 Temperature Trend</h3>
        <div className="time-range-toggle">
          <button
            className={`range-btn ${timeRange === '24h' ? 'active' : ''}`}
            onClick={() => setTimeRange('24h')}
          >
            Past 24 Hours
          </button>
          <button
            className={`range-btn ${timeRange === 'forecast' ? 'active' : ''}`}
            onClick={() => setTimeRange('forecast')}
          >
            Forecast
          </button>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="time"
              stroke="#666"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#666"
              style={{ fontSize: '12px' }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#2196f3"
              strokeWidth={2}
              dot={{ fill: '#2196f3', r: 3 }}
              activeDot={{ r: 5 }}
              name="Temperature"
            />
            {chartData[0]?.feelsLike !== undefined && (
              <Line
                type="monotone"
                dataKey="feelsLike"
                stroke="#ff9800"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#ff9800', r: 3 }}
                name="Feels Like"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-summary">
        {chartData.length > 0 && (
          <>
            <div className="summary-item">
              <span className="summary-label">Current:</span>
              <span className="summary-value">
                {chartData[chartData.length - 1].temperature}°C
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">High:</span>
              <span className="summary-value">
                {Math.max(...chartData.map(d => d.temperature)).toFixed(1)}°C
              </span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Low:</span>
              <span className="summary-value">
                {Math.min(...chartData.map(d => d.temperature)).toFixed(1)}°C
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TemperatureTrendChart;
