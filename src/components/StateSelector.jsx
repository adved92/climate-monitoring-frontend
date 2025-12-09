import React, { useState } from 'react';
import './CountrySelector.css'; // Reuse same styles

// Sample states by country (simplified)
const statesByCountry = {
  'India': ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'West Bengal'],
  'United States': ['California', 'Texas', 'Florida', 'New York', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'],
  'China': ['Beijing', 'Shanghai', 'Guangdong', 'Sichuan', 'Jiangsu', 'Zhejiang', 'Henan', 'Hubei'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan'],
  'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná', 'Rio Grande do Sul'],
  'Germany': ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony'],
  'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine'],
  'Japan': ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Hokkaido', 'Fukuoka', 'Kyoto'],
  // Default for countries without specific states
  'default': ['Central Region', 'Northern Region', 'Southern Region', 'Eastern Region', 'Western Region']
};

function StateSelector({ country, onSelectState, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const states = statesByCountry[country] || statesByCountry['default'];

  const filteredStates = states.filter(state =>
    state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-selector">
      <div className="selector-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Select State/Region in {country}</h2>
        <input
          type="text"
          placeholder="Search states..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="country-grid">
        {filteredStates.map(state => (
          <div
            key={state}
            className="country-card"
            onClick={() => onSelectState(state)}
          >
            <h3>{state}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StateSelector;
