/**
 * ClimateCard Component - Displays weather information
 */
import React from 'react'
import './ClimateCard.css'

const ClimateCard = ({ data, loading, error }) => {
  if (loading) {
    return <div className="climate-card loading">Loading weather data...</div>
  }

  if (error) {
    return <div className="climate-card error">Error: {error}</div>
  }

  if (!data) {
    return <div className="climate-card">No data available</div>
  }

  const { temperature, humidity, precipitation, conditions, season, location } = data

  return (
    <div className="climate-card">
      <h2>🌤️ Weather</h2>
      {location && (
        <div className="location-info">
          <h3>{location.name || 'Unknown Location'}</h3>
          {location.country && <span className="country">{location.country}</span>}
        </div>
      )}
      
      <div className="weather-main">
        <div className="temperature">
          <span className="temp-value">{temperature?.toFixed(1) || 'N/A'}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="conditions">{conditions || 'Unknown'}</div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">💧 Humidity</span>
          <span className="value">{humidity?.toFixed(0) || 'N/A'}%</span>
        </div>
        <div className="detail-item">
          <span className="label">🌧️ Precipitation</span>
          <span className="value">{precipitation?.toFixed(1) || '0'} mm</span>
        </div>
        {season && (
          <div className="detail-item">
            <span className="label">🍂 Season</span>
            <span className="value">{season}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClimateCard
