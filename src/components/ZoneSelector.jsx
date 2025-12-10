import React from 'react';
import UseMyLocationButton from './UseMyLocationButton';
import './ZoneSelector.css';

const zones = [
  { id: 'asia', name: 'Asia', icon: '🌏', description: 'Explore Asian climate patterns' },
  { id: 'europe', name: 'Europe', icon: '🌍', description: 'Discover European weather data' },
  { id: 'africa', name: 'Africa', icon: '🌍', description: 'Monitor African climate conditions' },
  { id: 'north-america', name: 'North America', icon: '🌎', description: 'Track North American weather' },
  { id: 'south-america', name: 'South America', icon: '🌎', description: 'Analyze South American climate' },
  { id: 'oceania', name: 'Oceania', icon: '🌏', description: 'Oceanic weather monitoring' },
  { id: 'antarctica', name: 'Antarctica', icon: '🧊', description: 'Antarctic research data' }
];

function ZoneSelector({ onSelectZone, onLocationDetected }) {
  return (
    <div className="zone-selector">
      <div className="zone-header">
        <h1>🌍 Smart Weather & Energy Dashboard</h1>
        <p>Select a zone to explore weather and climate data worldwide</p>
        
        {/* Auto Location Detect */}
        <div className="auto-location-section">
          <UseMyLocationButton onLocationDetected={onLocationDetected} />
          <span className="location-divider">or choose a zone below</span>
        </div>
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
            <p className="zone-description">{zone.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZoneSelector;
