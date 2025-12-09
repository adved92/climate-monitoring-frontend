import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './WeatherMap.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map events
function MapEventHandler({ onLocationClick }) {
  useMapEvents({
    click: (e) => {
      if (onLocationClick) {
        onLocationClick(e.latlng);
      }
    },
  });
  return null;
}

// Component to update map center
function MapUpdater({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

const WeatherMap = ({ 
  latitude = 40.7128, 
  longitude = -74.0060, 
  zoom = 10,
  onLocationSelect,
  showWeatherLayers = true
}) => {
  const [center, setCenter] = useState([latitude, longitude]);
  const [currentZoom, setCurrentZoom] = useState(zoom);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeLayer, setActiveLayer] = useState('temperature');
  const [weatherData, setWeatherData] = useState(null);

  // OpenWeatherMap API key (should be in env variables)
  const OWM_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'demo';

  // Weather layer URLs from OpenWeatherMap
  const weatherLayers = {
    temperature: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`,
    precipitation: `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`,
    wind: `https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`,
    clouds: `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`,
    pressure: `https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${OWM_API_KEY}`,
  };

  useEffect(() => {
    setCenter([latitude, longitude]);
  }, [latitude, longitude]);

  const handleLocationClick = async (latlng) => {
    setSelectedLocation(latlng);
    
    // Fetch weather data for clicked location
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(
        `${apiUrl}/api/climate/weather?latitude=${latlng.lat}&longitude=${latlng.lng}`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
    }

    // Notify parent component
    if (onLocationSelect) {
      onLocationSelect(latlng.lat, latlng.lng);
    }
  };

  const handleLayerChange = (layer) => {
    setActiveLayer(layer);
  };

  return (
    <div className="weather-map-container">
      <div className="map-controls">
        <h3>🗺️ Interactive Weather Map</h3>
        
        {showWeatherLayers && (
          <div className="layer-controls">
            <span className="layer-label">Weather Layer:</span>
            <div className="layer-buttons">
              <button
                className={`layer-btn ${activeLayer === 'temperature' ? 'active' : ''}`}
                onClick={() => handleLayerChange('temperature')}
                title="Temperature"
              >
                🌡️ Temp
              </button>
              <button
                className={`layer-btn ${activeLayer === 'precipitation' ? 'active' : ''}`}
                onClick={() => handleLayerChange('precipitation')}
                title="Precipitation"
              >
                🌧️ Rain
              </button>
              <button
                className={`layer-btn ${activeLayer === 'wind' ? 'active' : ''}`}
                onClick={() => handleLayerChange('wind')}
                title="Wind"
              >
                💨 Wind
              </button>
              <button
                className={`layer-btn ${activeLayer === 'clouds' ? 'active' : ''}`}
                onClick={() => handleLayerChange('clouds')}
                title="Clouds"
              >
                ☁️ Clouds
              </button>
              <button
                className={`layer-btn ${activeLayer === 'pressure' ? 'active' : ''}`}
                onClick={() => handleLayerChange('pressure')}
                title="Pressure"
              >
                📊 Pressure
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={center}
          zoom={currentZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          {/* Base map layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Weather overlay layer */}
          {showWeatherLayers && activeLayer && (
            <TileLayer
              url={weatherLayers[activeLayer]}
              opacity={0.6}
              attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>'
            />
          )}

          {/* Current location marker */}
          <Marker position={center}>
            <Popup>
              <div className="map-popup">
                <strong>Current Location</strong>
                <p>Lat: {center[0].toFixed(4)}</p>
                <p>Lng: {center[1].toFixed(4)}</p>
              </div>
            </Popup>
          </Marker>

          {/* Selected location marker */}
          {selectedLocation && (
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>
                <div className="map-popup">
                  <strong>Selected Location</strong>
                  <p>Lat: {selectedLocation.lat.toFixed(4)}</p>
                  <p>Lng: {selectedLocation.lng.toFixed(4)}</p>
                  {weatherData && (
                    <>
                      <hr />
                      <p><strong>Temperature:</strong> {weatherData.temperature}°C</p>
                      <p><strong>Conditions:</strong> {weatherData.description}</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          )}

          {/* Map event handlers */}
          <MapEventHandler onLocationClick={handleLocationClick} />
          <MapUpdater center={center} zoom={currentZoom} />
        </MapContainer>
      </div>

      <div className="map-info">
        <p className="map-hint">
          💡 Click anywhere on the map to view weather details for that location
        </p>
      </div>
    </div>
  );
};

export default WeatherMap;
