import { useState } from 'react';
import './App.css';
import ZoneSelector from './components/ZoneSelector';
import CountrySelector from './components/CountrySelector';
import StateSelector from './components/StateSelector';
import CitySelector from './components/CitySelector';
import Breadcrumb from './components/Breadcrumb';
import ClimateCard from './components/ClimateCard';
import ForecastDisplay from './components/ForecastDisplay';
import HourlyForecast from './components/HourlyForecast';
import AirQualityCard from './components/AirQualityCard';
import UVIndexCard from './components/UVIndexCard';
import EarthquakeTracker from './components/EarthquakeTracker';
import ThemeToggle from './components/ThemeToggle';
import LanguageSelector from './components/LanguageSelector';
import WeatherRecommendations from './components/WeatherRecommendations';
import { climateAPI } from './services/api';

function App() {
  
  // Navigation state
  const [step, setStep] = useState('zone'); // zone, country, state, city, dashboard
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  
  // Weather data state
  const [climateData, setClimateData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Navigation handlers
  const handleSelectZone = (zone) => {
    setSelectedZone(zone);
    setStep('country');
  };

  const handleLocationDetected = async (location) => {
    console.log('Location detected:', location);
    
    // Create a city object from detected location
    const detectedCity = {
      name: location.name,
      lat: location.latitude,
      lon: location.longitude,
      country: location.country
    };
    
    // Set all navigation states to show the detected location
    setSelectedZone({ name: 'Auto-detected', id: 'auto' });
    setSelectedCountry(location.country);
    setSelectedState('Auto-detected');
    setSelectedCity(detectedCity);
    setStep('dashboard');
    
    // Fetch weather data for detected location
    await fetchWeatherData(detectedCity);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setStep('state');
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setStep('city');
  };

  const handleSelectCity = async (city) => {
    console.log('City selected:', city);
    setSelectedCity(city);
    setStep('dashboard');
    
    // Ensure we have valid city data
    if (!city || !city.name) {
      setError('Invalid city data');
      return;
    }
    
    await fetchWeatherData(city);
  };

  const handleBack = () => {
    const steps = ['zone', 'country', 'state', 'city', 'dashboard'];
    const currentIndex = steps.indexOf(step);
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1]);
    }
  };

  const handleBreadcrumbNavigate = (index) => {
    const steps = ['zone', 'country', 'state', 'city', 'dashboard'];
    setStep(steps[index]);
  };

  const fetchWeatherData = async (city) => {
    console.log('=== Starting fetchWeatherData ===');
    console.log('City object:', city);
    
    setLoading(true);
    setError(null);
    setClimateData(null);
    setForecastData(null);
    
    try {
      if (!city || !city.name) {
        throw new Error('Invalid city data provided');
      }

      console.log('Fetching weather data for:', city.name);
      
      // Add timeout to the API call
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await climateAPI.getByCity(city.name);
      clearTimeout(timeoutId);
      
      console.log('API Response:', response);
      
      // Handle the response structure {success: true, data: {...}}
      if (response && response.success && response.data) {
        console.log('Setting climate data:', response.data);
        setClimateData(response.data);
      } else {
        console.error('Invalid response format:', response);
        throw new Error('No weather data available for this city');
      }
      
      // Fetch forecast if coordinates are available
      if (city.lat && city.lon) {
        try {
          console.log('Fetching forecast for coordinates:', city.lat, city.lon);
          const forecastResponse = await climateAPI.getForecast(city.lat, city.lon);
          console.log('Forecast Response:', forecastResponse);
          
          if (forecastResponse && forecastResponse.success && forecastResponse.data) {
            console.log('Setting forecast data:', forecastResponse.data);
            setForecastData(forecastResponse.data);
          } else {
            console.warn('No forecast data available');
          }
        } catch (forecastErr) {
          console.warn('Forecast fetch failed:', forecastErr);
          // Don't fail the entire operation if forecast fails
        }
      } else {
        console.warn('No coordinates available for forecast');
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      if (err.name === 'AbortError') {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message || 'Failed to fetch weather data');
      }
    } finally {
      setLoading(false);
      console.log('=== Finished fetchWeatherData ===');
    }
  };

  // Build breadcrumb path
  const getBreadcrumbPath = () => {
    const path = [];
    if (selectedZone) path.push(selectedZone.name);
    if (selectedCountry) path.push(selectedCountry);
    if (selectedState) path.push(selectedState);
    if (selectedCity) path.push(selectedCity.name);
    return path;
  };

  // Render based on current step
  const renderContent = () => {
    switch (step) {
      case 'zone':
        return <ZoneSelector onSelectZone={handleSelectZone} onLocationDetected={handleLocationDetected} />;
      
      case 'country':
        return (
          <CountrySelector 
            zone={selectedZone} 
            onSelectCountry={handleSelectCountry}
            onBack={handleBack}
          />
        );
      
      case 'state':
        return (
          <StateSelector 
            country={selectedCountry} 
            onSelectState={handleSelectState}
            onBack={handleBack}
          />
        );
      
      case 'city':
        return (
          <CitySelector 
            state={selectedState} 
            onSelectCity={handleSelectCity}
            onBack={handleBack}
          />
        );
      
      case 'dashboard':
        console.log('=== Rendering Dashboard ===');
        console.log('Loading:', loading);
        console.log('Error:', error);
        console.log('Climate Data:', climateData);
        console.log('Selected City:', selectedCity);
        
        return (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <Breadcrumb 
                path={getBreadcrumbPath()} 
                onNavigate={handleBreadcrumbNavigate}
              />
              <div className="header-controls">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>

            {loading && (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading weather data for {selectedCity?.name}...</p>
              </div>
            )}

            {error && !loading && (
              <div className="error-container">
                <h3>⚠️ Error Loading Weather Data</h3>
                <p>{error}</p>
                <div className="error-actions">
                  <button 
                    onClick={() => selectedCity && fetchWeatherData(selectedCity)} 
                    className="retry-button"
                    disabled={!selectedCity}
                  >
                    🔄 Retry
                  </button>
                  <button onClick={handleBack} className="back-button">
                    ← Go Back
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && climateData && (
              <div className="dashboard-content">
                <div className="dashboard-grid">
                  <ClimateCard data={climateData} />
                  {forecastData && <ForecastDisplay forecast={forecastData} />}
                  <HourlyForecast location={selectedCity?.name} />
                  <AirQualityCard location={selectedCity?.name} />
                  <UVIndexCard location={selectedCity?.name} />
                  <EarthquakeTracker 
                    latitude={selectedCity?.lat} 
                    longitude={selectedCity?.lon} 
                  />
                  <WeatherRecommendations weatherData={climateData} />
                </div>
              </div>
            )}

            {!loading && !error && !climateData && (
              <div className="no-data-container">
                <h3>📍 No Weather Data Available</h3>
                <p>Unable to load weather data for {selectedCity?.name}</p>
                <div className="no-data-actions">
                  <button 
                    onClick={() => selectedCity && fetchWeatherData(selectedCity)} 
                    className="retry-button"
                    disabled={!selectedCity}
                  >
                    🔄 Try Again
                  </button>
                  <button onClick={handleBack} className="back-button">
                    ← Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return <ZoneSelector onSelectZone={handleSelectZone} />;
    }
  };

  console.log('=== App Render ===');
  console.log('Current step:', step);
  console.log('Selected city:', selectedCity);
  console.log('Climate data:', climateData);

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;
