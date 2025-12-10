import React, { useState } from 'react';
import './CountrySelector.css'; // Reuse same styles

// Sample cities with coordinates
const citiesByState = {
  'Delhi': [
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Old Delhi', lat: 28.6562, lon: 77.2410 },
    { name: 'Dwarka', lat: 28.5921, lon: 77.0460 }
  ],
  'California': [
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611 }
  ],
  'Tokyo': [
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Shibuya', lat: 35.6595, lon: 139.7004 },
    { name: 'Shinjuku', lat: 35.6938, lon: 139.7034 }
  ],
  'England': [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Manchester', lat: 53.4808, lon: -2.2426 },
    { name: 'Birmingham', lat: 52.4862, lon: -1.8904 }
  ],
  'Maharashtra': [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882 }
  ],
  'New York': [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Buffalo', lat: 42.8864, lon: -78.8784 },
    { name: 'Rochester', lat: 43.1566, lon: -77.6088 }
  ],
  'Texas': [
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'Austin', lat: 30.2672, lon: -97.7431 }
  ],
  // Default cities for states without specific data
  'default': [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 }
  ]
};

function CitySelector({ state, onSelectCity, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const cities = citiesByState[state] || citiesByState['default'];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-selector">
      <div className="selector-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Select City in {state}</h2>
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="country-grid">
        {filteredCities.map(city => (
          <div
            key={city.name}
            className="country-card"
            onClick={() => onSelectCity(city)}
          >
            <h3>{city.name}</h3>
            <p style={{ margin: '0.5rem 0 0', color: '#666', fontSize: '0.9rem' }}>
              {city.lat.toFixed(4)}°, {city.lon.toFixed(4)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CitySelector;
