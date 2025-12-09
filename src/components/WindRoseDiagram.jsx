import React, { useState, useEffect } from 'react';
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import './WindRoseDiagram.css';

const WindRoseDiagram = ({ latitude, longitude }) => {
  const [windData, setWindData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentWind, setCurrentWind] = useState(null);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWindData();
    }
  }, [latitude, longitude]);

  const fetchWindData = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(
        `${apiUrl}/api/climate/weather?latitude=${latitude}&longitude=${longitude}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch wind data');
      }

      const result = await response.json();
      
      // Set current wind
      setCurrentWind({
        speed: result.wind_speed || 0,
        direction: result.wind_direction || 0,
        gust: result.wind_gust || null,
      });

      // Generate wind rose data (simulated distribution)
      const roseData = generateWindRoseData(result.wind_direction || 0, result.wind_speed || 0);
      setWindData(roseData);
    } catch (err) {
      setError(err.message);
      // Generate sample data on error
      const sampleData = generateWindRoseData(180, 5);
      setWindData(sampleData);
    } finally {
      setLoading(false);
    }
  };

  const generateWindRoseData = (dominantDirection, dominantSpeed) => {
    // Wind directions (8 cardinal directions)
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    
    // Find closest direction to dominant
    const closestIndex = angles.reduce((prev, curr, idx) => {
      return Math.abs(curr - dominantDirection) < Math.abs(angles[prev] - dominantDirection) ? idx : prev;
    }, 0);

    // Generate data with emphasis on dominant direction
    return directions.map((dir, idx) => {
      let frequency;
      if (idx === closestIndex) {
        frequency = dominantSpeed * 2; // Dominant direction
      } else if (Math.abs(idx - closestIndex) === 1 || Math.abs(idx - closestIndex) === 7) {
        frequency = dominantSpeed * 1.2; // Adjacent directions
      } else {
        frequency = dominantSpeed * 0.5 + Math.random() * dominantSpeed * 0.3; // Other directions
      }

      return {
        direction: dir,
        frequency: parseFloat(frequency.toFixed(1)),
        angle: angles[idx],
      };
    });
  };

  const getWindDirectionArrow = (degrees) => {
    // Convert degrees to compass direction
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  const getWindSpeedCategory = (speed) => {
    if (speed < 1) return { label: 'Calm', color: '#4caf50' };
    if (speed < 5) return { label: 'Light Air', color: '#8bc34a' };
    if (speed < 12) return { label: 'Light Breeze', color: '#cddc39' };
    if (speed < 20) return { label: 'Moderate Breeze', color: '#ffeb3b' };
    if (speed < 29) return { label: 'Fresh Breeze', color: '#ffc107' };
    if (speed < 39) return { label: 'Strong Breeze', color: '#ff9800' };
    if (speed < 50) return { label: 'Near Gale', color: '#ff5722' };
    if (speed < 62) return { label: 'Gale', color: '#f44336' };
    return { label: 'Storm', color: '#d32f2f' };
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="wind-tooltip">
          <p className="tooltip-direction">{payload[0].payload.direction}</p>
          <p className="tooltip-frequency">
            Frequency: {payload[0].value} m/s
          </p>
        </div>
      );
    }
    return null;
  };

  if (!latitude || !longitude) {
    return (
      <div className="wind-rose-diagram">
        <div className="wind-rose-header">
          <h3>🧭 Wind Rose Diagram</h3>
        </div>
        <div className="wind-rose-no-location">
          <p>Please select a location to view wind patterns</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="wind-rose-diagram">
        <div className="wind-rose-header">
          <h3>🧭 Wind Rose Diagram</h3>
        </div>
        <div className="wind-rose-loading">Loading wind data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wind-rose-diagram">
        <div className="wind-rose-header">
          <h3>🧭 Wind Rose Diagram</h3>
        </div>
        <div className="wind-rose-error">
          <p>⚠️ {error}</p>
          <button onClick={fetchWindData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const speedCategory = currentWind ? getWindSpeedCategory(currentWind.speed) : null;

  return (
    <div className="wind-rose-diagram">
      <div className="wind-rose-header">
        <h3>🧭 Wind Rose Diagram</h3>
      </div>

      {currentWind && (
        <div className="current-wind-info">
          <div className="wind-info-item">
            <span className="wind-label">Speed:</span>
            <span className="wind-value">{currentWind.speed} m/s</span>
          </div>
          <div className="wind-info-item">
            <span className="wind-label">Direction:</span>
            <span className="wind-value">
              {getWindDirectionArrow(currentWind.direction)} ({currentWind.direction}°)
            </span>
          </div>
          {currentWind.gust && (
            <div className="wind-info-item">
              <span className="wind-label">Gust:</span>
              <span className="wind-value">{currentWind.gust} m/s</span>
            </div>
          )}
          {speedCategory && (
            <div className="wind-category" style={{ backgroundColor: speedCategory.color }}>
              {speedCategory.label}
            </div>
          )}
        </div>
      )}

      <div className="wind-rose-chart">
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={windData}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis dataKey="direction" stroke="#666" />
            <PolarRadiusAxis angle={90} domain={[0, 'auto']} stroke="#666" />
            <Radar
              name="Wind Frequency"
              dataKey="frequency"
              stroke="#2196f3"
              fill="#2196f3"
              fillOpacity={0.6}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="wind-rose-legend">
        <h4>Wind Speed Scale (Beaufort)</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#4caf50' }} />
            <span>Calm (0-1 m/s)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#8bc34a' }} />
            <span>Light (1-5 m/s)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ffeb3b' }} />
            <span>Moderate (12-20 m/s)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ff9800' }} />
            <span>Strong (29-39 m/s)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f44336' }} />
            <span>Gale (50+ m/s)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindRoseDiagram;
