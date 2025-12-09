import React, { useState, useEffect } from 'react';
import './StatisticsView.css';

const StatisticsView = ({ latitude, longitude }) => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchStatistics();
    }
  }, [latitude, longitude]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(
        `${apiUrl}/api/statistics/location?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const result = await response.json();
      setStatistics(result.statistics);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (direction) => {
    if (direction === 'increasing') return '📈';
    if (direction === 'decreasing') return '📉';
    return '➡️';
  };

  const getTrendColor = (direction) => {
    if (direction === 'increasing') return '#ff5722';
    if (direction === 'decreasing') return '#2196f3';
    return '#666';
  };

  if (!latitude || !longitude) {
    return (
      <div className="statistics-view">
        <div className="statistics-header">
          <h2>📊 Weather Statistics & Trends</h2>
        </div>
        <div className="statistics-no-location">
          <p>Please select a location to view weather statistics</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="statistics-view">
        <div className="statistics-header">
          <h2>📊 Weather Statistics & Trends</h2>
        </div>
        <div className="statistics-loading">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-view">
        <div className="statistics-header">
          <h2>📊 Weather Statistics & Trends</h2>
        </div>
        <div className="statistics-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchStatistics} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!statistics) {
    return null;
  }

  const { records, yearly_summary, climate_trends } = statistics;

  return (
    <div className="statistics-view">
      <div className="statistics-header">
        <h2>📊 Weather Statistics & Trends</h2>
      </div>

      {/* Temperature Records */}
      {records && (
        <div className="records-section">
          <h3>🌡️ Temperature Records</h3>
          <div className="records-grid">
            <div className="record-card high">
              <div className="record-icon">🔥</div>
              <div className="record-info">
                <span className="record-label">All-Time High</span>
                <span className="record-value">{records.all_time_high.temperature}°C</span>
                <span className="record-date">{new Date(records.all_time_high.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="record-card low">
              <div className="record-icon">❄️</div>
              <div className="record-info">
                <span className="record-label">All-Time Low</span>
                <span className="record-value">{records.all_time_low.temperature}°C</span>
                <span className="record-date">{new Date(records.all_time_low.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="monthly-records">
            <h4>Monthly Temperature Records</h4>
            <div className="monthly-records-grid">
              {records.monthly_records.map((month, index) => (
                <div key={index} className="monthly-record-item">
                  <span className="month-name">{month.month}</span>
                  <div className="month-temps">
                    <span className="temp-high">↑ {month.high}°C</span>
                    <span className="temp-low">↓ {month.low}°C</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Yearly Summary */}
      {yearly_summary && (
        <div className="yearly-section">
          <h3>📅 {yearly_summary.year} Summary</h3>
          <div className="yearly-grid">
            <div className="yearly-card">
              <span className="yearly-label">Average Temperature</span>
              <span className="yearly-value">{yearly_summary.avg_temperature}°C</span>
            </div>
            <div className="yearly-card">
              <span className="yearly-label">Total Precipitation</span>
              <span className="yearly-value">{yearly_summary.total_precipitation} mm</span>
            </div>
            <div className="yearly-card">
              <span className="yearly-label">Hottest Day</span>
              <span className="yearly-value">{yearly_summary.hottest_day.temperature}°C</span>
              <span className="yearly-date">{new Date(yearly_summary.hottest_day.date).toLocaleDateString()}</span>
            </div>
            <div className="yearly-card">
              <span className="yearly-label">Coldest Day</span>
              <span className="yearly-value">{yearly_summary.coldest_day.temperature}°C</span>
              <span className="yearly-date">{new Date(yearly_summary.coldest_day.date).toLocaleDateString()}</span>
            </div>
          </div>

          {yearly_summary.comparison_to_previous_year && (
            <div className="year-comparison">
              <h4>Compared to Previous Year</h4>
              <p className="comparison-text">
                <strong>{yearly_summary.comparison_to_previous_year.trend}</strong>
              </p>
              <div className="comparison-details">
                <span>
                  Temperature: {yearly_summary.comparison_to_previous_year.temperature_change > 0 ? '+' : ''}
                  {yearly_summary.comparison_to_previous_year.temperature_change}°C
                </span>
                <span>
                  Precipitation: {yearly_summary.comparison_to_previous_year.precipitation_change > 0 ? '+' : ''}
                  {yearly_summary.comparison_to_previous_year.precipitation_change} mm
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Climate Trends */}
      {climate_trends && (
        <div className="trends-section">
          <h3>🌍 Long-Term Climate Trends</h3>
          
          <div className="trend-cards">
            <div className="trend-card">
              <div className="trend-header">
                <span className="trend-icon">{getTrendIcon(climate_trends.temperature_trend.direction)}</span>
                <h4>Temperature Trend</h4>
              </div>
              <p className="trend-rate" style={{ color: getTrendColor(climate_trends.temperature_trend.direction) }}>
                {climate_trends.temperature_trend.rate_per_decade > 0 ? '+' : ''}
                {climate_trends.temperature_trend.rate_per_decade}°C per decade
              </p>
              <p className="trend-description">{climate_trends.temperature_trend.description}</p>
            </div>

            <div className="trend-card">
              <div className="trend-header">
                <span className="trend-icon">{getTrendIcon(climate_trends.precipitation_trend.direction)}</span>
                <h4>Precipitation Trend</h4>
              </div>
              <p className="trend-rate" style={{ color: getTrendColor(climate_trends.precipitation_trend.direction) }}>
                {climate_trends.precipitation_trend.rate_per_decade > 0 ? '+' : ''}
                {climate_trends.precipitation_trend.rate_per_decade} mm per decade
              </p>
              <p className="trend-description">{climate_trends.precipitation_trend.description}</p>
            </div>
          </div>

          {climate_trends.extreme_events && (
            <div className="extreme-events">
              <h4>Extreme Weather Events</h4>
              <div className="events-grid">
                {Object.entries(climate_trends.extreme_events).map(([key, event]) => (
                  <div key={key} className="event-item">
                    <div className="event-header">
                      <span className="event-icon">{getTrendIcon(event.trend)}</span>
                      <span className="event-name">{key.replace('_', ' ')}</span>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {climate_trends.climate_indicators && (
            <div className="climate-indicators">
              <h4>Climate Risk Indicators</h4>
              <div className="indicators-grid">
                <div className="indicator-item">
                  <span className="indicator-label">Warming Rate:</span>
                  <span className="indicator-value">
                    {climate_trends.climate_indicators.warming_rate.replace('_', ' ')}
                  </span>
                </div>
                <div className="indicator-item">
                  <span className="indicator-label">Drought Risk:</span>
                  <span className="indicator-value">
                    {climate_trends.climate_indicators.drought_risk}
                  </span>
                </div>
                <div className="indicator-item">
                  <span className="indicator-label">Flood Risk:</span>
                  <span className="indicator-value">
                    {climate_trends.climate_indicators.flood_risk.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StatisticsView;
