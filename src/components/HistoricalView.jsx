import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './HistoricalView.css';

const HistoricalView = ({ latitude, longitude }) => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (latitude && longitude) {
      fetchHistoricalData();
    }
  }, [latitude, longitude, selectedYear]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      
      // Fetch monthly averages
      const monthlyResponse = await fetch(
        `${apiUrl}/api/historical/monthly-averages?latitude=${latitude}&longitude=${longitude}&year=${selectedYear}`
      );

      if (!monthlyResponse.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const monthlyResult = await monthlyResponse.json();
      setMonthlyData(monthlyResult.averages || []);

      // Fetch current weather for comparison
      const weatherResponse = await fetch(
        `${apiUrl}/api/climate/weather?latitude=${latitude}&longitude=${longitude}`
      );

      if (weatherResponse.ok) {
        const weatherData = await weatherResponse.json();
        
        // Fetch comparison
        const comparisonResponse = await fetch(
          `${apiUrl}/api/historical/compare?latitude=${latitude}&longitude=${longitude}&current_temp=${weatherData.temperature}&current_precip=${weatherData.precipitation || 0}`
        );

        if (comparisonResponse.ok) {
          const comparisonResult = await comparisonResponse.json();
          setComparison(comparisonResult.comparison);
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="historical-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (!latitude || !longitude) {
    return (
      <div className="historical-view">
        <div className="historical-header">
          <h2>📊 Historical Weather Data</h2>
        </div>
        <div className="historical-no-location">
          <p>Please select a location to view historical weather data</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="historical-view">
        <div className="historical-header">
          <h2>📊 Historical Weather Data</h2>
        </div>
        <div className="historical-loading">Loading historical data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="historical-view">
        <div className="historical-header">
          <h2>📊 Historical Weather Data</h2>
        </div>
        <div className="historical-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchHistoricalData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="historical-view">
      <div className="historical-header">
        <h2>📊 Historical Weather Data</h2>
        <div className="year-selector">
          <label htmlFor="year-select">Year:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-select"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {comparison && (
        <div className={`comparison-card ${comparison.is_unusual ? 'unusual' : ''}`}>
          <h3>Current vs Historical Average</h3>
          <div className="comparison-grid">
            <div className="comparison-item">
              <span className="comparison-label">Current Temperature:</span>
              <span className="comparison-value current">
                {comparison.current.temperature}°C
              </span>
            </div>
            <div className="comparison-item">
              <span className="comparison-label">Historical Average:</span>
              <span className="comparison-value average">
                {comparison.historical_average.temperature}°C
              </span>
            </div>
            <div className="comparison-item">
              <span className="comparison-label">Deviation:</span>
              <span className={`comparison-value ${comparison.deviation.temperature > 0 ? 'warmer' : 'cooler'}`}>
                {comparison.deviation.temperature > 0 ? '+' : ''}{comparison.deviation.temperature}°C
              </span>
            </div>
          </div>
          {comparison.analysis && (
            <p className="comparison-analysis">{comparison.analysis}</p>
          )}
          {comparison.is_unusual && (
            <div className="unusual-badge">
              ⚠️ Unusual weather conditions detected
            </div>
          )}
        </div>
      )}

      <div className="charts-section">
        <div className="chart-card">
          <h3>Monthly Average Temperature</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month_name" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="avg_temperature"
                stroke="#2196f3"
                strokeWidth={2}
                dot={{ fill: '#2196f3', r: 4 }}
                name="Avg Temp (°C)"
              />
              <Line
                type="monotone"
                dataKey="extreme_high"
                stroke="#ff5722"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Record High (°C)"
              />
              <Line
                type="monotone"
                dataKey="extreme_low"
                stroke="#2196f3"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Record Low (°C)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Monthly Average Precipitation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month_name" stroke="#666" style={{ fontSize: '12px' }} />
              <YAxis stroke="#666" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                dataKey="avg_precipitation"
                fill="#2196f3"
                name="Avg Precipitation (mm)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {monthlyData.length > 0 && (
        <div className="statistics-summary">
          <h3>Annual Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Warmest Month:</span>
              <span className="stat-value">
                {monthlyData.reduce((max, month) => 
                  month.avg_temperature > max.avg_temperature ? month : max
                ).month_name}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Coldest Month:</span>
              <span className="stat-value">
                {monthlyData.reduce((min, month) => 
                  month.avg_temperature < min.avg_temperature ? month : min
                ).month_name}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Wettest Month:</span>
              <span className="stat-value">
                {monthlyData.reduce((max, month) => 
                  month.avg_precipitation > max.avg_precipitation ? month : max
                ).month_name}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Driest Month:</span>
              <span className="stat-value">
                {monthlyData.reduce((min, month) => 
                  month.avg_precipitation < min.avg_precipitation ? month : min
                ).month_name}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalView;
