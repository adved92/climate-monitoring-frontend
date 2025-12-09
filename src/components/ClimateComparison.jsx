import { useState, useEffect } from 'react';
import './ClimateComparison.css';
import { climateAPI } from '../services/api';

const ClimateComparison = () => {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comparisonData, setComparisonData] = useState([]);

  const addLocation = async () => {
    if (!searchQuery.trim() || locations.length >= 4) return;

    setLoading(true);
    setError(null);

    try {
      const response = await climateAPI.getByCity(searchQuery);
      const newLocation = {
        id: Date.now(),
        name: searchQuery,
        data: response.data
      };

      setLocations([...locations, newLocation]);
      setSearchQuery('');
    } catch (err) {
      setError(err.message || 'Failed to fetch location data');
    } finally {
      setLoading(false);
    }
  };

  const removeLocation = (id) => {
    setLocations(locations.filter(loc => loc.id !== id));
  };

  const clearAll = () => {
    setLocations([]);
    setComparisonData([]);
  };

  // Calculate comparison metrics
  useEffect(() => {
    if (locations.length > 0) {
      const metrics = [
        {
          name: 'Temperature',
          unit: '°C',
          values: locations.map(loc => ({
            location: loc.name,
            value: loc.data?.temperature || 0
          }))
        },
        {
          name: 'Feels Like',
          unit: '°C',
          values: locations.map(loc => ({
            location: loc.name,
            value: loc.data?.feels_like || 0
          }))
        },
        {
          name: 'Humidity',
          unit: '%',
          values: locations.map(loc => ({
            location: loc.name,
            value: loc.data?.humidity || 0
          }))
        },
        {
          name: 'Pressure',
          unit: 'hPa',
          values: locations.map(loc => ({
            location: loc.name,
            value: loc.data?.pressure || 0
          }))
        },
        {
          name: 'Wind Speed',
          unit: 'm/s',
          values: locations.map(loc => ({
            location: loc.name,
            value: loc.data?.wind_speed || 0
          }))
        }
      ];

      setComparisonData(metrics);
    }
  }, [locations]);

  const getHighlightClass = (values, currentValue) => {
    const numValues = values.map(v => v.value);
    const max = Math.max(...numValues);
    const min = Math.min(...numValues);

    if (currentValue === max && max !== min) return 'highest';
    if (currentValue === min && max !== min) return 'lowest';
    return '';
  };

  return (
    <div className="climate-comparison">
      <div className="comparison-header">
        <h2>🌍 Climate Comparison Tool</h2>
        <p>Compare weather conditions across multiple locations</p>
      </div>

      <div className="add-location-section">
        <div className="search-bar">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addLocation()}
            placeholder="Enter city name (e.g., London, Tokyo)"
            disabled={loading || locations.length >= 4}
          />
          <button 
            onClick={addLocation}
            disabled={loading || !searchQuery.trim() || locations.length >= 4}
            className="add-btn"
          >
            {loading ? '⏳' : '➕'} Add Location
          </button>
        </div>
        
        {locations.length >= 4 && (
          <p className="limit-message">Maximum 4 locations reached</p>
        )}
        
        {error && <div className="error-message">❌ {error}</div>}
      </div>

      {locations.length > 0 && (
        <>
          <div className="locations-list">
            <div className="list-header">
              <h3>Selected Locations ({locations.length}/4)</h3>
              <button onClick={clearAll} className="clear-btn">
                🗑️ Clear All
              </button>
            </div>
            
            <div className="location-cards">
              {locations.map(location => (
                <div key={location.id} className="location-card">
                  <button 
                    className="remove-btn"
                    onClick={() => removeLocation(location.id)}
                    title="Remove location"
                  >
                    ✕
                  </button>
                  <h4>{location.name}</h4>
                  <div className="location-summary">
                    <div className="temp-display">
                      {location.data?.temperature?.toFixed(1)}°C
                    </div>
                    <div className="condition">
                      {location.data?.conditions || 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="comparison-table">
            <h3>📊 Detailed Comparison</h3>
            <table>
              <thead>
                <tr>
                  <th>Metric</th>
                  {locations.map(loc => (
                    <th key={loc.id}>{loc.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((metric, idx) => (
                  <tr key={idx}>
                    <td className="metric-name">
                      {metric.name}
                      <span className="unit">({metric.unit})</span>
                    </td>
                    {metric.values.map((val, valIdx) => (
                      <td 
                        key={valIdx}
                        className={`value-cell ${getHighlightClass(metric.values, val.value)}`}
                      >
                        {val.value.toFixed(metric.name === 'Pressure' ? 0 : 1)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="legend">
              <span className="legend-item">
                <span className="legend-color highest"></span> Highest
              </span>
              <span className="legend-item">
                <span className="legend-color lowest"></span> Lowest
              </span>
            </div>
          </div>

          <div className="insights-section">
            <h3>💡 Quick Insights</h3>
            <div className="insights-grid">
              {comparisonData.slice(0, 3).map((metric, idx) => {
                const values = metric.values.map(v => v.value);
                const max = Math.max(...values);
                const min = Math.min(...values);
                const maxLoc = metric.values.find(v => v.value === max)?.location;
                const minLoc = metric.values.find(v => v.value === min)?.location;
                const diff = max - min;

                return (
                  <div key={idx} className="insight-card">
                    <h4>{metric.name}</h4>
                    <p>
                      <strong>{maxLoc}</strong> has the highest ({max.toFixed(1)}{metric.unit})
                    </p>
                    <p>
                      <strong>{minLoc}</strong> has the lowest ({min.toFixed(1)}{metric.unit})
                    </p>
                    <p className="difference">
                      Difference: {diff.toFixed(1)}{metric.unit}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {locations.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🌐</div>
          <h3>No locations added yet</h3>
          <p>Add 2-4 locations to start comparing weather conditions</p>
        </div>
      )}
    </div>
  );
};

export default ClimateComparison;
