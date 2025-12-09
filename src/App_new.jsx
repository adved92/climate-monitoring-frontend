import { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
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

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setStep('state');
  };

  const handleSelectState = (state) => {
    setSelectedState(state);
    setStep('city');
  };

  const handleSelectCity = async (city) => {
    setSelectedCity(city);
    setStep('dashboard');
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
    setLoading(true);
    setError(null);
    
    try {
      const response = await climateAPI.getByCity(city.name);
      setClimateData(response.data);
      
      // Fetch forecast
      if (city.lat && city.lon) {
        const forecastResponse = await climateAPI.getForecast(city.lat, city.lon);
        setForecastData(forecastResponse.data);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
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
        return <ZoneSelector onSelectZone={handleSelectZone} />;
      
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

            {loading && <div className="loading">{t('loading')}</div>}
            {error && <div className="error">{error}</div>}

            {climateData && (
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
          </div>
        );
      
      default:
        return <ZoneSelector onSelectZone={handleSelectZone} />;
    }
  };

  return (
    <div className="app">
      {renderContent()}
    </div>
  );
}

export default App;
