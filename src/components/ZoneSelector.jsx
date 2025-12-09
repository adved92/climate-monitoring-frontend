import React from 'react';
import './ZoneSelector.css';

const zones = [
  { id: 'asia', name: 'Asia', icon: '🌏' },
  { id: 'europe', name: 'Europe', icon: '🌍' },
  { id: 'africa', name: 'Africa', icon: '🌍' },
  { id: 'north-america', name: 'North America', icon: '🌎' },
  { id: 'south-america', name: 'South America', icon: '🌎' },
  { id: 'oceania', name: 'Oceania', icon: '🌏' },
  { id: 'antarctica', name: 'Antarctica', icon: '🧊' }
];

function ZoneSelector({ onSelectZone }) {
  return (
    <div className="zone-selector">
      <div className="zone-header">
        <h1>🌍 Climate Monitoring Dashboard</h1>
        <p>Select a zone to explore weather and climate data</p>
      </div>
      
      <div className="zone-grid">
        {zones.map(zone => (
          <div 
            key={zone.id}
            className="zone-card"
            onClick={() => onSelectZone(zone)}
          >
            <div className="zone-icon">{zone.icon}</div>
            <h3>{zone.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZoneSelector;
