import React, { useState, useEffect } from 'react';
import './CountrySelector.css';

// Sample countries by zone
const countriesByZone = {
  'asia': ['India', 'China', 'Japan', 'South Korea', 'Thailand', 'Singapore', 'Malaysia', 'Indonesia', 'Vietnam', 'Philippines'],
  'europe': ['United Kingdom', 'France', 'Germany', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden'],
  'africa': ['South Africa', 'Egypt', 'Nigeria', 'Kenya', 'Morocco', 'Ghana', 'Ethiopia', 'Tanzania', 'Uganda', 'Algeria'],
  'north-america': ['United States', 'Canada', 'Mexico', 'Cuba', 'Jamaica', 'Costa Rica', 'Panama', 'Guatemala', 'Honduras', 'Nicaragua'],
  'south-america': ['Brazil', 'Argentina', 'Chile', 'Colombia', 'Peru', 'Venezuela', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay'],
  'oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Samoa', 'Tonga', 'Vanuatu', 'Solomon Islands'],
  'antarctica': ['Antarctica Research Stations']
};

function CountrySelector({ zone, onSelectCountry, onBack }) {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setCountries(countriesByZone[zone.id] || []);
  }, [zone]);

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-selector">
      <div className="selector-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Select Country in {zone.name}</h2>
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="country-grid">
        {filteredCountries.map(country => (
          <div
            key={country}
            className="country-card"
            onClick={() => onSelectCountry(country)}
          >
            <h3>{country}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountrySelector;
