/**
 * ForecastDisplay Component - Displays 7-day weather forecast
 */
import React from 'react'
import './ForecastDisplay.css'

const ForecastDisplay = ({ forecast, loading, error }) => {
  if (loading) {
    return <div className="forecast-display loading">Loading forecast...</div>
  }

  if (error) {
    return <div className="forecast-display error">Error: {error}</div>
  }

  if (!forecast || forecast.length === 0) {
    return <div className="forecast-display">No forecast data available</div>
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    
    return {
      dayName: days[date.getDay()],
      date: `${months[date.getMonth()]} ${date.getDate()}`
    }
  }

  const getWeatherIcon = (iconCode) => {
    // Map OpenWeatherMap icon codes to emoji or you can use actual icons
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    }
    return iconMap[iconCode] || '🌤️'
  }

  return (
    <div className="forecast-display">
      <h2>📅 7-Day Forecast</h2>
      
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const { dayName, date } = formatDate(day.date)
          const isToday = index === 0
          
          return (
            <div key={day.date} className={`forecast-card ${isToday ? 'today' : ''}`}>
              <div className="forecast-header">
                <div className="day-name">{isToday ? 'Today' : dayName}</div>
                <div className="date">{date}</div>
              </div>
              
              <div className="weather-icon">
                {getWeatherIcon(day.weather_icon)}
              </div>
              
              <div className="temperature">
                <span className="temp-max">{Math.round(day.temp_max)}°</span>
                <span className="temp-separator">/</span>
                <span className="temp-min">{Math.round(day.temp_min)}°</span>
              </div>
              
              <div className="conditions">{day.conditions}</div>
              
              <div className="forecast-details">
                <div className="detail-row">
                  <span className="label">💧</span>
                  <span className="value">{Math.round(day.precipitation_prob)}%</span>
                </div>
                <div className="detail-row">
                  <span className="label">💨</span>
                  <span className="value">{Math.round(day.wind_speed)} km/h</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ForecastDisplay
