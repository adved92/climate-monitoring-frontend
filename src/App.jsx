import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import './App.css'
import LocationSearch from './components/LocationSearch'
import ClimateCard from './components/ClimateCard'
import ForecastDisplay from './components/ForecastDisplay'
import HourlyForecast from './components/HourlyForecast'
import AirQualityCard from './components/AirQualityCard'
import UVIndexCard from './components/UVIndexCard'
import EarthquakeTracker from './components/EarthquakeTracker'
import ClimateComparison from './components/ClimateComparison'
import ThemeToggle from './components/ThemeToggle'
import LanguageSelector from './components/LanguageSelector'
import LocationHistory from './components/LocationHistory'
// New Advanced Features
import ProviderStatus from './components/ProviderStatus'
import AIPredictions from './components/AIPredictions'
import WeatherChatbot from './components/WeatherChatbot'
import SmartAlerts from './components/SmartAlerts'
import { climateAPI, airQualityAPI, disasterAPI } from './services/api'

function App() {
  const { t } = useTranslation()
  const [climateData, setClimateData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [forecastLoading, setForecastLoading] = useState(false)
  const [error, setError] = useState(null)
  const [forecastError, setForecastError] = useState(null)
  const [currentLocation, setCurrentLocation] = useState(null)
  const [coordinates, setCoordinates] = useState(null)
  const [showComparison, setShowComparison] = useState(false)

  const handleSearch = async (searchParams) => {
    setLoading(true)
    setError(null)
    setForecastLoading(true)
    setForecastError(null)
    
    try {
      let response
      let lat, lon
      
      if (searchParams.type === 'city') {
        response = await climateAPI.getByCity(searchParams.city)
        setCurrentLocation(searchParams.city)
        lat = response.data?.location?.latitude
        lon = response.data?.location?.longitude
      } else {
        response = await climateAPI.getSummary(searchParams.lat, searchParams.lon)
        setCurrentLocation(searchParams.name || `${searchParams.lat}, ${searchParams.lon}`)
        lat = searchParams.lat
        lon = searchParams.lon
      }
      
      setClimateData(response.data)
      setCoordinates({ lat, lon })
      
      // Fetch 7-day forecast
      if (lat && lon) {
        try {
          const forecastResponse = await climateAPI.get7DayForecast(lat, lon)
          setForecastData(forecastResponse.data)
        } catch (forecastErr) {
          setForecastError(forecastErr.message || 'Failed to fetch forecast')
          console.error('Forecast error:', forecastErr)
        }
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
      setForecastLoading(false)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌍 {t('appTitle')}</h1>
        <p>{t('appSubtitle')}</p>
        <div className="header-controls">
          <ThemeToggle />
          <LanguageSelector />
          <button 
            onClick={() => setShowComparison(!showComparison)}
            className="comparison-toggle-btn"
          >
            {showComparison ? '📊 Hide Comparison' : '🌐 Compare Locations'}
          </button>
        </div>
      </header>
      
      <main className="App-main">
        {showComparison ? (
          <ClimateComparison />
        ) : (
          <>
            <LocationSearch onSearch={handleSearch} />
            <LocationHistory onSelectLocation={handleSearch} />
        
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
        
        {(forecastData || forecastLoading || forecastError) && (
          <ForecastDisplay 
            forecast={forecastData} 
            loading={forecastLoading} 
            error={forecastError} 
          />
        )}
        
        {coordinates && (
          <HourlyForecast 
            latitude={coordinates.lat} 
            longitude={coordinates.lon} 
          />
        )}
        
        {coordinates && (
          <AirQualityCard 
            latitude={coordinates.lat} 
            longitude={coordinates.lon} 
          />
        )}
        
        {coordinates && (
          <UVIndexCard 
            latitude={coordinates.lat} 
            longitude={coordinates.lon} 
          />
        )}
        
        {coordinates && (
          <EarthquakeTracker 
            latitude={coordinates.lat} 
            longitude={coordinates.lon} 
          />
        )}
          </>
        )}
      </main>
      
      <footer className="App-footer">
        <p>{t('poweredBy')}</p>
      </footer>
    </div>
  )
}

export default App
