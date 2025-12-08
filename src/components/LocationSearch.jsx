/**
 * LocationSearch Component - Search for locations worldwide
 */
import React, { useState } from 'react'
import './LocationSearch.css'

const POPULAR_CITIES = [
  { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: 'New York', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
  { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
]

const LocationSearch = ({ onSearch }) => {
  const [searchType, setSearchType] = useState('city')
  const [cityName, setCityName] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (searchType === 'city' && cityName) {
      onSearch({ type: 'city', city: cityName })
    } else if (searchType === 'coordinates' && latitude && longitude) {
      onSearch({ 
        type: 'coordinates', 
        lat: parseFloat(latitude), 
        lon: parseFloat(longitude) 
      })
    }
  }

  const handlePopularCity = (city) => {
    onSearch({ type: 'coordinates', lat: city.lat, lon: city.lon, name: city.name })
  }

  return (
    <div className="location-search">
      <h2>🌍 Search Worldwide</h2>
      
      <div className="search-type-toggle">
        <button
          className={searchType === 'city' ? 'active' : ''}
          onClick={() => setSearchType('city')}
        >
          By City
        </button>
        <button
          className={searchType === 'coordinates' ? 'active' : ''}
          onClick={() => setSearchType('coordinates')}
        >
          By Coordinates
        </button>
      </div>

      <form onSubmit={handleSubmit} className="search-form">
        {searchType === 'city' ? (
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter city name (e.g., Tokyo, London, Mumbai)"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="search-input"
            />
          </div>
        ) : (
          <div className="coordinates-group">
            <div className="form-group">
              <label>Latitude</label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 35.6762"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="search-input"
                min="-90"
                max="90"
              />
            </div>
            <div className="form-group">
              <label>Longitude</label>
              <input
                type="number"
                step="any"
                placeholder="e.g., 139.6503"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="search-input"
                min="-180"
                max="180"
              />
            </div>
          </div>
        )}
        
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="popular-cities">
        <h3>Popular Cities</h3>
        <div className="city-buttons">
          {POPULAR_CITIES.map((city) => (
            <button
              key={city.name}
              onClick={() => handlePopularCity(city)}
              className="city-button"
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LocationSearch
