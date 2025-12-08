import { useState } from 'react'
import './App.css'
import LocationSearch from './components/LocationSearch'
import ClimateCard from './components/ClimateCard'
import { climateAPI, airQualityAPI, disasterAPI } from './services/api'

function App() {
  const [climateData, setClimateData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)

  const handleSearch = async (searchParams) => {
    setLoading(true)
    setError(null)
    
    try {
      let response
      
      if (searchParams.type === 'city') {
        response = await climateAPI.getByCity(searchParams.city)
        setCurrentLocation(searchParams.city)
      } else {
        response = await climateAPI.getSummary(searchParams.lat, searchParams.lon)
        setCurrentLocation(searchParams.name || `${searchParams.lat}, ${searchParams.lon}`)
      }
      
      setClimateData(response.data)
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 Climate Monitoring System</h1>
        <p>Check weather anywhere in the world</p>
      </header>
      
      <main className="App-main">
        <LocationSearch onSearch={handleSearch} />
        
        {currentLocation && (
          <div className="current-location">
            <span>📍 {currentLocation}</span>
          </div>
        )}
        
        <div className="data-grid">
          <ClimateCard 
            data={climateData} 
            loading={loading} 
            error={error} 
          />
        </div>
      </main>
      
      <footer className="App-footer">
        <p>Powered by OpenWeatherMap, USGS, and NOAA</p>
      </footer>
    </div>
  )
}

export default App
