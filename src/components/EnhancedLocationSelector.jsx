import React, { useState, useEffect } from 'react';
import './EnhancedLocationSelector.css';
import { locationData } from '../data/locationData';

const EnhancedLocationSelector = ({ onCitySelect }) => {
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentStep, setCurrentStep] = useState('zone');
  
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter function for search
  const filterItems = (items, searchTerm) => {
    if (!searchTerm) return items;
    return items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Load countries when zone is selected
  useEffect(() => {
    if (selectedZone) {
      setLoading(true);
      const zoneCountries = locationData.countries[selectedZone.id] || [];
      setCountries(zoneCountries);
      setStates([]);
      setCities([]);
      setSelectedCountry(null);
      setSelectedState(null);
      setCurrentStep('country');
      setLoading(false);
    }
  }, [selectedZone]);

  // Load states when country is selected
  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      const countryStates = locationData.states[selectedCountry.id] || [];
      setStates(countryStates);
      setCities([]);
      setSelectedState(null);
      setCurrentStep('state');
      setLoading(false);
    }
  }, [selectedCountry]);

  // Load cities when state is selected
  useEffect(() => {
    if (selectedState) {
      setLoading(true);
      const stateCities = locationData.cities[selectedState.id] || [];
      setCities(stateCities);
      setCurrentStep('city');
      setLoading(false);
    }
  }, [selectedState]);

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSearchTerm('');
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSearchTerm('');
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setSearchTerm('');
  };

  const handleCitySelect = (city) => {
    const locationInfo = {
      zone: selectedZone,
      country: selectedCountry,
      state: selectedState,
      city: city,
      coordinates: city.coordinates,
      fullPath: `${selectedZone.name} > ${selectedCountry.name} > ${selectedState.name} > ${city.name}`
    };
    onCitySelect(locationInfo);
  };

  const handleBack = () => {
    if (currentStep === 'city') {
      setCurrentStep('state');
      setCities([]);
    } else if (currentStep === 'state') {
      setCurrentStep('country');
      setSelectedState(null);
      setStates([]);
    } else if (currentStep === 'country') {
      setCurrentStep('zone');
      setSelectedCountry(null);
      setCountries([]);
    }
    setSearchTerm('');
  };

  const resetSelection = () => {
    setSelectedZone(null);
    setSelectedCountry(null);
    setSelectedState(null);
    setCountries([]);
    setStates([]);
    setCities([]);
    setCurrentStep('zone');
    setSearchTerm('');
  };

  const renderBreadcrumb = () => {
    const breadcrumbItems = [];
    
    if (selectedZone) {
      breadcrumbItems.push(
        <span key="zone" className="breadcrumb-item">
          {selectedZone.icon} {selectedZone.name}
        </span>
      );
    }
    
    if (selectedCountry) {
      breadcrumbItems.push(
        <span key="arrow1" className="breadcrumb-arrow">→</span>,
        <span key="country" className="breadcrumb-item">
          {selectedCountry.icon} {selectedCountry.name}
        </span>
      );
    }
    
    if (selectedState) {
      breadcrumbItems.push(
        <span key="arrow2" className="breadcrumb-arrow">→</span>,
        <span key="state" className="breadcrumb-item">
          {selectedState.icon} {selectedState.name}
        </span>
      );
    }

    return (
      <div className="breadcrumb">
        {breadcrumbItems.length > 0 ? breadcrumbItems : (
          <span className="breadcrumb-placeholder">Select your location step by step</span>
        )}
      </div>
    );
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'zone', label: 'Zone', icon: '🌍' },
      { id: 'country', label: 'Country', icon: '🏳️' },
      { id: 'state', label: 'State', icon: '🏛️' },
      { id: 'city', label: 'City', icon: '🏙️' }
    ];

    return (
      <div className="step-indicator">
        {steps.map((step, index) => (
          <div key={step.id} className={`step ${currentStep === step.id ? 'active' : ''} ${
            (currentStep === 'country' && step.id === 'zone') ||
            (currentStep === 'state' && ['zone', 'country'].includes(step.id)) ||
            (currentStep === 'city' && ['zone', 'country', 'state'].includes(step.id))
            ? 'completed' : ''
          }`}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-label">{step.label}</div>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </div>
        ))}
      </div>
    );
  };

  const renderZones = () => {
    const filteredZones = filterItems(locationData.zones, searchTerm);
    
    return (
      <div className="selection-container">
        <div className="selection-header">
          <h2>🌍 Select a Zone</h2>
          <p>Choose a geographical region to explore</p>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search zones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="items-grid zones-grid">
          {filteredZones.map((zone) => (
            <div
              key={zone.id}
              className="item-card zone-card"
              onClick={() => handleZoneSelect(zone)}
            >
              <div className="item-icon">{zone.icon}</div>
              <div className="item-content">
                <h3>{zone.name}</h3>
                <p>{zone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCountries = () => {
    const filteredCountries = filterItems(countries, searchTerm);
    
    return (
      <div className="selection-container">
        <div className="selection-header">
          <h2>🏳️ Select a Country in {selectedZone.name}</h2>
          <p>Choose a country from {selectedZone.description}</p>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="items-grid countries-grid">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="item-card country-card"
              onClick={() => handleCountrySelect(country)}
            >
              <div className="item-icon">{country.icon}</div>
              <div className="item-content">
                <h3>{country.name}</h3>
                <p>{country.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderStates = () => {
    const filteredStates = filterItems(states, searchTerm);
    
    return (
      <div className="selection-container">
        <div className="selection-header">
          <h2>🏛️ Select a State in {selectedCountry.name}</h2>
          <p>Choose a state or region from {selectedCountry.description}</p>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search states..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="items-grid states-grid">
          {filteredStates.map((state) => (
            <div
              key={state.id}
              className="item-card state-card"
              onClick={() => handleStateSelect(state)}
            >
              <div className="item-icon">{state.icon}</div>
              <div className="item-content">
                <h3>{state.name}</h3>
                <p>{state.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCities = () => {
    const filteredCities = filterItems(cities, searchTerm);
    
    return (
      <div className="selection-container">
        <div className="selection-header">
          <h2>🏙️ Select a City in {selectedState.name}</h2>
          <p>Choose a city to get detailed weather information</p>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="items-grid cities-grid">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="item-card city-card"
              onClick={() => handleCitySelect(city)}
            >
              <div className="item-icon">{city.icon}</div>
              <div className="item-content">
                <h3>{city.name}</h3>
                <p>{city.description}</p>
                {city.coordinates && (
                  <div className="coordinates">
                    📍 {city.coordinates.lat.toFixed(4)}, {city.coordinates.lon.toFixed(4)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="enhanced-location-selector">
      <div className="selector-header">
        <h1>🌍 Global Location Selector</h1>
        <p>Navigate through zones, countries, states, and cities to find your location</p>
      </div>

      {renderStepIndicator()}
      {renderBreadcrumb()}

      <div className="navigation-controls">
        {currentStep !== 'zone' && (
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
        )}
        
        {(selectedZone || selectedCountry || selectedState) && (
          <button onClick={resetSelection} className="reset-button">
            🔄 Start Over
          </button>
        )}
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner">🌍</div>
          <p>Loading locations...</p>
        </div>
      )}

      {!loading && (
        <div className="content-container">
          {currentStep === 'zone' && renderZones()}
          {currentStep === 'country' && renderCountries()}
          {currentStep === 'state' && renderStates()}
          {currentStep === 'city' && renderCities()}
        </div>
      )}
    </div>
  );
};

export default EnhancedLocationSelector;