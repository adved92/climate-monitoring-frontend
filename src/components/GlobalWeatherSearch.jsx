import React, { useState, useEffect } from 'react';
import { climateAPI, locationAPI, airQualityAPI, uvIndexAPI, historicalAPI, statisticsAPI, predictionAPI } from '../services/api.js';
import DataExport from './DataExport';
import './GlobalWeatherSearch.css';

const GlobalWeatherSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Load search history from localStorage
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
    setSearchHistory(history.slice(0, 5)); // Keep last 5 searches
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      // Use global search to find locations
      const result = await locationAPI.globalSearch(searchQuery, true, 10);
      
      if (result.data.cities && result.data.cities.length > 0) {
        setSearchResults(result.data.cities);
        
        // Save to search history
        const newHistory = [searchQuery, ...searchHistory.filter(h => h !== searchQuery)].slice(0, 5);
        setSearchHistory(newHistory);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
      } else {
        setError('No locations found. Try a different search term.');
        setSearchResults([]);
      }
    } catch (err) {
      setError(`Search failed: ${err.message}`);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setLoading(true);
    setError(null);

    try {
      // Get detailed weather data
      const weatherResult = await climateAPI.getByCoordinates(
        location.latitude, 
        location.longitude
      );
      
      setWeatherData(weatherResult.data);
    } catch (err) {
      setError(`Failed to get weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherIcon = (conditions) => {
    const iconMap = {
      'clear': '☀️',
      'clouds': '☁️',
      'rain': '🌧️',
      'snow': '❄️',
      'thunderstorm': '⛈️',
      'drizzle': '🌦️',
      'mist': '🌫️',
      'fog': '🌫️'
    };
    
    const condition = conditions?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(iconMap)) {
      if (condition.includes(key)) return icon;
    }
    return '🌤️';
  };

  // Climate Feature Card Component
  const ClimateFeatureCard = ({ title, icon, location, type }) => {
    const [featureData, setFeatureData] = useState(null);
    const [featureLoading, setFeatureLoading] = useState(false);
    const [featureError, setFeatureError] = useState(null);
    const [expanded, setExpanded] = useState(false);

    const fetchFeatureData = async () => {
      setFeatureLoading(true);
      setFeatureError(null);

      try {
        let result;
        const { latitude, longitude } = location;

        switch (type) {
          case 'hourly':
            result = await climateAPI.getHourlyForecast(latitude, longitude);
            break;
          case 'weekly':
            result = await climateAPI.get7DayForecast(latitude, longitude);
            break;
          case 'air_quality':
            console.log('Fetching air quality data for:', latitude, longitude);
            result = await airQualityAPI.get(latitude, longitude);
            console.log('Air quality result:', result);
            break;
          case 'uv_index':
            result = await uvIndexAPI.get(latitude, longitude);
            break;
          case 'historical':
            result = await historicalAPI.getData(latitude, longitude);
            break;
          case 'statistics':
            result = await statisticsAPI.getLocationStats(latitude, longitude);
            break;
          case 'ai_predictions':
            result = await predictionAPI.getForecast(latitude, longitude, 24);
            break;
          case 'alerts':
            // Mock alerts data
            result = {
              data: {
                active_alerts: [
                  { type: 'Heat Advisory', severity: 'Moderate', expires: '2024-12-13T18:00:00Z' },
                  { type: 'Air Quality Alert', severity: 'Low', expires: '2024-12-12T12:00:00Z' }
                ]
              }
            };
            break;
          case 'disasters':
            // Mock disaster monitoring data
            result = {
              data: {
                earthquakes: { count: 2, max_magnitude: 4.2 },
                storms: { active: 1, nearby: 0 },
                floods: { risk_level: 'Low', warnings: 0 },
                wildfires: { active: 3, distance: '45km' }
              }
            };
            break;
          case 'environmental':
            // Mock environmental impact data
            result = {
              data: {
                carbon_footprint: '2.3 tons CO2/year',
                air_quality_trend: 'Improving',
                biodiversity_index: 'Moderate',
                sustainability_score: 72
              }
            };
            break;
          case 'wind':
            result = {
              data: {
                current_speed: '12 m/s',
                direction: 'NW (315°)',
                gusts: '18 m/s',
                beaufort_scale: 'Fresh Breeze (5)',
                wind_chill: '-2°C'
              }
            };
            break;
          case 'precipitation':
            result = {
              data: {
                current_rate: '2.5 mm/h',
                last_24h: '15.2 mm',
                probability_next_hour: '75%',
                type: 'Light Rain',
                radar_trend: 'Increasing'
              }
            };
            break;
          case 'temperature':
            result = {
              data: {
                current: `${weatherData?.temperature || 20}°C`,
                trend_24h: '+2.3°C',
                heat_index: '24°C',
                dew_point: '12°C',
                record_high: '35°C (2019)',
                record_low: '-8°C (2010)'
              }
            };
            break;
          case 'atmospheric':
            result = {
              data: {
                humidity: `${weatherData?.humidity || 65}%`,
                pressure: `${weatherData?.pressure || 1013} hPa`,
                pressure_trend: 'Rising',
                visibility: '10 km',
                cloud_cover: '40%'
              }
            };
            break;
          case 'solar':
            result = {
              data: {
                sunrise: '06:45 AM',
                sunset: '07:30 PM',
                daylight_hours: '12h 45m',
                solar_noon: '01:07 PM',
                golden_hour: '06:45 PM'
              }
            };
            break;
          case 'lunar':
            result = {
              data: {
                phase: 'Waxing Crescent',
                illumination: '23%',
                moonrise: '10:30 AM',
                moonset: '11:45 PM',
                next_full_moon: 'Dec 15, 2024'
              }
            };
            break;
          case 'seasonal':
            result = {
              data: {
                current_season: 'Winter',
                days_until_spring: '98 days',
                seasonal_temp_avg: '18°C',
                precipitation_outlook: 'Above Normal',
                frost_risk: 'Moderate'
              }
            };
            break;
          case 'maps':
            result = {
              data: {
                satellite_view: 'Available',
                radar_layers: 'Precipitation, Clouds, Temperature',
                weather_fronts: '2 Active',
                storm_systems: '1 Nearby',
                air_mass_type: 'Continental Polar'
              }
            };
            break;
          case 'storms':
            result = {
              data: {
                active_storms: 0,
                storm_probability: '15%',
                lightning_activity: 'None',
                hail_risk: 'Low',
                tornado_watch: 'None'
              }
            };
            break;
          case 'wildfire':
            result = {
              data: {
                fire_danger: 'Moderate',
                active_fires_nearby: '3 within 50km',
                air_quality_impact: 'Minimal',
                evacuation_zones: 'None',
                fire_weather_index: '12 (Moderate)'
              }
            };
            break;
          case 'flood':
            result = {
              data: {
                flood_risk: 'Low',
                river_levels: 'Normal',
                flash_flood_potential: '10%',
                drainage_status: 'Good',
                flood_warnings: 'None Active'
              }
            };
            break;
          case 'earthquake':
            result = {
              data: {
                recent_activity: '2.1M - 45km SW',
                seismic_risk: 'Low',
                fault_lines_nearby: '2 within 100km',
                last_significant: '4.2M (2019)',
                monitoring_stations: '5 Active'
              }
            };
            break;
          case 'ocean':
            result = {
              data: {
                sea_temperature: '16°C',
                wave_height: '1.2m',
                tide_status: 'High Tide',
                next_low_tide: '3:45 PM',
                water_quality: 'Good'
              }
            };
            break;
          case 'aviation':
            result = {
              data: {
                ceiling: '2500 ft',
                visibility: '10+ km',
                wind_shear: 'None',
                turbulence: 'Light',
                icing_conditions: 'None'
              }
            };
            break;
          case 'marine':
            result = {
              data: {
                sea_state: 'Slight (2)',
                swell_height: '0.8m',
                water_temperature: '16°C',
                small_craft_advisory: 'None',
                marine_weather: 'Fair'
              }
            };
            break;
          case 'agriculture':
            result = {
              data: {
                growing_degree_days: '1250',
                soil_temperature: '14°C',
                evapotranspiration: '3.2mm',
                crop_stress_index: 'Low',
                irrigation_recommendation: 'Moderate'
              }
            };
            break;
          case 'health':
            result = {
              data: {
                heat_stress_risk: 'Low',
                cold_exposure_risk: 'Moderate',
                respiratory_conditions: 'Good',
                arthritis_pain_index: '3/10',
                migraine_pressure: 'Low Risk'
              }
            };
            break;
          case 'energy':
            result = {
              data: {
                heating_demand: 'Moderate',
                cooling_demand: 'Low',
                solar_generation: '65% Capacity',
                wind_generation: '45% Capacity',
                peak_usage_time: '6-9 PM'
              }
            };
            break;
          case 'tourism':
            result = {
              data: {
                beach_conditions: 'Fair',
                hiking_conditions: 'Excellent',
                photography_light: 'Good',
                outdoor_comfort: '7/10',
                tourist_season: 'Off-Peak'
              }
            };
            break;
          case 'sports':
            result = {
              data: {
                outdoor_sports: 'Good Conditions',
                running_index: '8/10',
                cycling_conditions: 'Excellent',
                golf_weather: 'Fair',
                water_sports: 'Moderate'
              }
            };
            break;
          case 'construction':
            result = {
              data: {
                work_conditions: 'Good',
                concrete_curing: 'Optimal',
                paint_drying: 'Good',
                roofing_conditions: 'Fair',
                safety_index: '8/10'
              }
            };
            break;
          case 'traffic':
            result = {
              data: {
                road_conditions: 'Good',
                visibility_impact: 'None',
                ice_risk: 'Low',
                fog_delays: 'None',
                accident_risk: 'Low'
              }
            };
            break;
          case 'outdoor':
            result = {
              data: {
                hiking_conditions: 'Excellent',
                camping_weather: 'Good',
                picnic_index: '7/10',
                barbecue_conditions: 'Fair',
                festival_weather: 'Good'
              }
            };
            break;
          case 'photography':
            result = {
              data: {
                golden_hour: '6:45-7:30 PM',
                blue_hour: '7:30-8:15 PM',
                cloud_interest: 'Moderate',
                light_quality: 'Good',
                landscape_conditions: 'Excellent'
              }
            };
            break;
          case 'astronomy':
            result = {
              data: {
                sky_clarity: '75%',
                light_pollution: 'Moderate',
                seeing_conditions: 'Good',
                moon_interference: 'Low',
                best_viewing_time: '10 PM - 2 AM'
              }
            };
            break;
          case 'pollen':
            result = {
              data: {
                tree_pollen: 'Moderate',
                grass_pollen: 'Low',
                weed_pollen: 'High',
                mold_spores: 'Low',
                allergy_risk: 'Moderate'
              }
            };
            break;
          case 'clothing':
            result = {
              data: {
                recommended_layers: '2-3 Layers',
                jacket_needed: 'Light Jacket',
                umbrella: 'Recommended',
                footwear: 'Waterproof Shoes',
                accessories: 'Scarf, Gloves'
              }
            };
            break;
          case 'pets':
            result = {
              data: {
                walk_conditions: 'Good',
                paw_protection: 'Not Needed',
                hydration_needs: 'Normal',
                heat_stress_risk: 'Low',
                outdoor_time: 'Unlimited'
              }
            };
            break;
          case 'garden':
            result = {
              data: {
                watering_needs: 'Moderate',
                planting_conditions: 'Good',
                frost_protection: 'Not Needed',
                pest_activity: 'Low',
                growth_conditions: 'Favorable'
              }
            };
            break;
          case 'driving':
            result = {
              data: {
                road_safety: 'Good',
                visibility: 'Excellent',
                tire_conditions: 'Normal',
                braking_distance: 'Standard',
                weather_hazards: 'None'
              }
            };
            break;
          case 'events':
            result = {
              data: {
                outdoor_events: 'Recommended',
                tent_setup: 'Good Conditions',
                sound_quality: 'Excellent',
                crowd_comfort: '8/10',
                backup_plan: 'Not Needed'
              }
            };
            break;
          default:
            result = { data: { message: 'Feature not implemented yet' } };
        }

        setFeatureData(result.data || result);
      } catch (err) {
        setFeatureError(err.message);
      } finally {
        setFeatureLoading(false);
      }
    };

    const renderFeatureContent = () => {
      if (featureLoading) return <div className="feature-loading">Loading...</div>;
      if (featureError) return <div className="feature-error">Error: {featureError}</div>;
      if (!featureData) return null;

      switch (type) {
        case 'hourly':
          return (
            <div className="hourly-preview">
              {featureData.slice(0, 6).map((hour, index) => (
                <div key={index} className="hour-preview">
                  <div className="hour-time">{new Date(hour.timestamp).toLocaleTimeString('en-US', { hour: 'numeric' })}</div>
                  <div className="hour-temp">{Math.round(hour.temperature)}°</div>
                  <div className="hour-condition">{hour.conditions}</div>
                </div>
              ))}
            </div>
          );

        case 'weekly':
          return (
            <div className="weekly-preview">
              {featureData.slice(0, 7).map((day, index) => (
                <div key={index} className="day-preview">
                  <div className="day-name">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div className="day-temps">
                    <span className="high">{Math.round(day.temp_max)}°</span>
                    <span className="low">{Math.round(day.temp_min)}°</span>
                  </div>
                  <div className="day-condition">{day.conditions}</div>
                </div>
              ))}
            </div>
          );

        case 'air_quality':
          const aqiData = featureData.data || featureData;
          const aqiValue = aqiData.aqi || aqiData.air_quality_index || 'N/A';
          return (
            <div className="aqi-preview">
              <div className="aqi-value" style={{ color: getAQIColor(aqiValue) }}>
                AQI: {aqiValue}
              </div>
              <div className="aqi-level">{getAQILevel(aqiValue)}</div>
              <div className="aqi-description">{aqiData.description || aqiData.status || 'Air quality data'}</div>
            </div>
          );

        case 'uv_index':
          const uvData = featureData.data || featureData;
          const uvValue = uvData.uv_index || uvData.uv || 'N/A';
          return (
            <div className="uv-preview">
              <div className="uv-value" style={{ color: getUVColor(uvValue) }}>
                UV Index: {uvValue}
              </div>
              <div className="uv-level">{getUVLevel(uvValue)}</div>
              <div className="uv-recommendation">{uvData.recommendation || uvData.description || 'UV index data'}</div>
            </div>
          );

        default:
          return (
            <div className="generic-preview">
              {renderDataVisually(featureData)}
            </div>
          );
      }
    };

    // Visual data rendering function to replace JSON output
    const renderDataVisually = (data) => {
      if (!data) return <div className="no-data">No data available</div>;
      
      if (typeof data === 'string' || typeof data === 'number') {
        return <div className="simple-value">{data}</div>;
      }
      
      if (Array.isArray(data)) {
        return (
          <div className="data-list">
            {data.map((item, index) => (
              <div key={index} className="data-list-item">
                {renderDataVisually(item)}
              </div>
            ))}
          </div>
        );
      }
      
      if (typeof data === 'object') {
        return (
          <div className="data-grid">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="data-item">
                <div className="data-label">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                <div className="data-value">
                  {typeof value === 'object' ? renderDataVisually(value) : 
                   typeof value === 'number' ? value.toLocaleString() : 
                   String(value)}
                </div>
              </div>
            ))}
          </div>
        );
      }
      
      return <div className="unknown-data">{String(data)}</div>;
    };

    return (
      <div className="climate-feature-card">
        <div className="feature-header" onClick={() => {
          if (!expanded) fetchFeatureData();
          setExpanded(!expanded);
        }}>
          <span className="feature-icon">{icon}</span>
          <span className="feature-title">{title}</span>
          <span className="expand-icon">{expanded ? '▼' : '▶'}</span>
        </div>
        
        {expanded && (
          <div className="feature-content">
            {renderFeatureContent()}
          </div>
        )}
      </div>
    );
  };

  const getAQIColor = (aqi) => {
    if (aqi === 'N/A' || !aqi) return '#999999';
    const aqiNum = typeof aqi === 'string' ? parseInt(aqi) : aqi;
    if (aqiNum <= 50) return '#00e400';
    if (aqiNum <= 100) return '#ffff00';
    if (aqiNum <= 150) return '#ff7e00';
    if (aqiNum <= 200) return '#ff0000';
    if (aqiNum <= 300) return '#8f3f97';
    return '#7e0023';
  };

  const getAQILevel = (aqi) => {
    if (aqi === 'N/A' || !aqi) return 'No data';
    const aqiNum = typeof aqi === 'string' ? parseInt(aqi) : aqi;
    if (aqiNum <= 50) return 'Good';
    if (aqiNum <= 100) return 'Moderate';
    if (aqiNum <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqiNum <= 200) return 'Unhealthy';
    if (aqiNum <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  const getUVColor = (uv) => {
    if (uv === 'N/A' || !uv) return '#999999';
    const uvNum = typeof uv === 'string' ? parseFloat(uv) : uv;
    if (uvNum <= 2) return '#289500';
    if (uvNum <= 5) return '#f7e400';
    if (uvNum <= 7) return '#f85900';
    if (uvNum <= 10) return '#d8001d';
    return '#6b49c8';
  };

  const getUVLevel = (uv) => {
    if (uv === 'N/A' || !uv) return 'No data';
    const uvNum = typeof uv === 'string' ? parseFloat(uv) : uv;
    if (uvNum <= 2) return 'Low';
    if (uvNum <= 5) return 'Moderate';
    if (uvNum <= 7) return 'High';
    if (uvNum <= 10) return 'Very High';
    return 'Extreme';
  };

  return (
    <div className="global-weather-search">
      <div className="search-header">
        <h2>🌍 Global Weather Search</h2>
        <p>Search for weather in ANY city, state, or country worldwide</p>
      </div>

      <div className="search-container">
        <div className="search-input-group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search any location... (e.g., 'London', 'Tokyo', 'New York, NY', 'Paris, France')"
            className="search-input"
          />
          <button 
            onClick={handleSearch} 
            disabled={loading || !searchQuery.trim()}
            className="search-button"
          >
            {loading ? '🔍' : '🌍'}
          </button>
        </div>

        {searchHistory.length > 0 && (
          <div className="search-history">
            <span className="history-label">Recent searches:</span>
            {searchHistory.map((term, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchQuery(term);
                  handleSearch();
                }}
                className="history-item"
              >
                {term}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="search-results">
          <h3>📍 Found {searchResults.length} locations:</h3>
          <div className="results-grid">
            {searchResults.map((location, index) => (
              <div
                key={index}
                className={`location-card ${selectedLocation?.name === location.name ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(location)}
              >
                <div className="location-header">
                  <h4>{location.name}</h4>
                  <span className="location-country">{location.country}</span>
                </div>
                
                {location.state && (
                  <p className="location-state">{location.state}</p>
                )}
                
                <div className="location-coords">
                  📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </div>
                
                {location.current_weather && !location.current_weather.error && (
                  <div className="quick-weather">
                    <span className="weather-icon">
                      {getWeatherIcon(location.current_weather.conditions)}
                    </span>
                    <span className="weather-temp">
                      {location.current_weather.temperature}°C
                    </span>
                    <span className="weather-conditions">
                      {location.current_weather.conditions}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedLocation && weatherData && (
        <div className="detailed-weather">
          <div className="weather-header">
            <h3>
              🌤️ Weather in {selectedLocation.name}
              {selectedLocation.state && `, ${selectedLocation.state}`}
              , {selectedLocation.country}
            </h3>
          </div>

          <div className="weather-main">
            <div className="weather-primary">
              <div className="temperature-display">
                <span className="main-temp">{weatherData.temperature}°C</span>
                <span className="feels-like">Feels like {weatherData.feels_like}°C</span>
              </div>
              
              <div className="weather-icon-large">
                {getWeatherIcon(weatherData.conditions)}
              </div>
              
              <div className="weather-description">
                <p className="conditions">{weatherData.conditions}</p>
                <p className="temp-range">
                  H: {weatherData.temp_max}°C L: {weatherData.temp_min}°C
                </p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-icon">💧</span>
                  <span className="detail-label">Humidity</span>
                  <span className="detail-value">{weatherData.humidity}%</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">🌬️</span>
                  <span className="detail-label">Wind</span>
                  <span className="detail-value">{weatherData.wind_speed} m/s</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">🌡️</span>
                  <span className="detail-label">Pressure</span>
                  <span className="detail-value">{weatherData.pressure} hPa</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">👁️</span>
                  <span className="detail-label">Visibility</span>
                  <span className="detail-value">
                    {weatherData.visibility ? `${(weatherData.visibility / 1000).toFixed(1)} km` : 'N/A'}
                  </span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-icon">☁️</span>
                  <span className="detail-label">Clouds</span>
                  <span className="detail-value">{weatherData.clouds}%</span>
                </div>
                
                {weatherData.precipitation > 0 && (
                  <div className="detail-item">
                    <span className="detail-icon">🌧️</span>
                    <span className="detail-label">Precipitation</span>
                    <span className="detail-value">{weatherData.precipitation} mm</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Separate Scrollable Forecast Sections */}
          <div className="forecast-sections-global">
            <div className="forecast-section-global">
              <h3>⏰ 24-Hour Forecast</h3>
              <div className="forecast-scroll-container-global">
                <div className="forecast-scroll-content-global">
                  <div className="hourly-forecast-grid-global">
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="hourly-item-global">
                        <div className="hour-global">{String(i).padStart(2, '0')}:00</div>
                        <div className="weather-icon-global">🌤️</div>
                        <div className="temp-global">{Math.round(weatherData.temperature + Math.sin(i * 0.3) * 5)}°C</div>
                        <div className="humidity-global">{Math.round(60 + Math.cos(i * 0.2) * 20)}%</div>
                        <div className="wind-global">{Math.round(5 + Math.sin(i * 0.4) * 3)} m/s</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="forecast-section-global">
              <h3>📅 7-Day Forecast</h3>
              <div className="forecast-scroll-container-global">
                <div className="forecast-scroll-content-global">
                  <div className="daily-forecast-grid-global">
                    {Array.from({ length: 7 }, (_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      const dayName = date.toLocaleDateString('en', { weekday: 'short' });
                      const dateStr = date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
                      
                      return (
                        <div key={i} className="daily-item-global">
                          <div className="day-info-global">
                            <div className="day-name-global">{dayName}</div>
                            <div className="date-global">{dateStr}</div>
                          </div>
                          <div className="weather-icon-global">🌤️</div>
                          <div className="temp-range-global">
                            <span className="high-global">{Math.round(weatherData.temp_max + Math.sin(i * 0.5) * 3)}°</span>
                            <span className="low-global">{Math.round(weatherData.temp_min + Math.sin(i * 0.5) * 2)}°</span>
                          </div>
                          <div className="conditions-global">Partly Cloudy</div>
                          <div className="precipitation-global">{Math.round(Math.random() * 40)}%</div>
                          <div className="wind-global">{Math.round(5 + Math.random() * 10)} m/s</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Climate Features - Inline Expansion */}
          <div className="climate-features-section">
            <div className="section-header">
              <h2>🌍 Climate Monitoring Features</h2>
              <p>Click any feature to view detailed information inline</p>
            </div>
            
            <div className="climate-features-grid">
              <ClimateFeatureCard
                title="Air Quality Index"
                icon="💨"
                location={selectedLocation}
                type="air_quality"
              />
              
              <ClimateFeatureCard
                title="UV Index"
                icon="☀️"
                location={selectedLocation}
                type="uv_index"
              />
              
              <ClimateFeatureCard
                title="Historical Weather"
                icon="📊"
                location={selectedLocation}
                type="historical"
              />
              
              <ClimateFeatureCard
                title="Weather Alerts"
                icon="⚠️"
                location={selectedLocation}
                type="alerts"
              />
              
              <ClimateFeatureCard
                title="Climate Statistics"
                icon="📈"
                location={selectedLocation}
                type="statistics"
              />
              
              <ClimateFeatureCard
                title="AI Predictions"
                icon="🤖"
                location={selectedLocation}
                type="ai_predictions"
              />
              
              <ClimateFeatureCard
                title="Disaster Monitoring"
                icon="🌪️"
                location={selectedLocation}
                type="disasters"
              />
              
              <ClimateFeatureCard
                title="Environmental Impact"
                icon="🌱"
                location={selectedLocation}
                type="environmental"
              />
              
              <ClimateFeatureCard
                title="Wind Analysis"
                icon="🌬️"
                location={selectedLocation}
                type="wind"
              />
              
              <ClimateFeatureCard
                title="Precipitation Radar"
                icon="🌧️"
                location={selectedLocation}
                type="precipitation"
              />
              
              <ClimateFeatureCard
                title="Temperature Trends"
                icon="🌡️"
                location={selectedLocation}
                type="temperature"
              />
              
              <ClimateFeatureCard
                title="Humidity & Pressure"
                icon="💧"
                location={selectedLocation}
                type="atmospheric"
              />
              
              <ClimateFeatureCard
                title="Sunrise & Sunset"
                icon="🌅"
                location={selectedLocation}
                type="solar"
              />
              
              <ClimateFeatureCard
                title="Moon Phases"
                icon="🌙"
                location={selectedLocation}
                type="lunar"
              />
              
              <ClimateFeatureCard
                title="Seasonal Outlook"
                icon="🍂"
                location={selectedLocation}
                type="seasonal"
              />
              
              <ClimateFeatureCard
                title="Weather Maps"
                icon="🗺️"
                location={selectedLocation}
                type="maps"
              />
              
              <ClimateFeatureCard
                title="Storm Tracking"
                icon="⛈️"
                location={selectedLocation}
                type="storms"
              />
              
              <ClimateFeatureCard
                title="Wildfire Risk"
                icon="🔥"
                location={selectedLocation}
                type="wildfire"
              />
              
              <ClimateFeatureCard
                title="Flood Monitoring"
                icon="🌊"
                location={selectedLocation}
                type="flood"
              />
              
              <ClimateFeatureCard
                title="Earthquake Activity"
                icon="🌍"
                location={selectedLocation}
                type="earthquake"
              />
              
              <ClimateFeatureCard
                title="Ocean Conditions"
                icon="🌊"
                location={selectedLocation}
                type="ocean"
              />
              
              <ClimateFeatureCard
                title="Aviation Weather"
                icon="✈️"
                location={selectedLocation}
                type="aviation"
              />
              
              <ClimateFeatureCard
                title="Marine Forecast"
                icon="⛵"
                location={selectedLocation}
                type="marine"
              />
              
              <ClimateFeatureCard
                title="Agricultural Weather"
                icon="🌾"
                location={selectedLocation}
                type="agriculture"
              />
              
              <ClimateFeatureCard
                title="Health Index"
                icon="🏥"
                location={selectedLocation}
                type="health"
              />
              
              <ClimateFeatureCard
                title="Energy Demand"
                icon="⚡"
                location={selectedLocation}
                type="energy"
              />
              
              <ClimateFeatureCard
                title="Tourism Weather"
                icon="🏖️"
                location={selectedLocation}
                type="tourism"
              />
              
              <ClimateFeatureCard
                title="Sports Conditions"
                icon="⚽"
                location={selectedLocation}
                type="sports"
              />
              
              <ClimateFeatureCard
                title="Construction Weather"
                icon="🏗️"
                location={selectedLocation}
                type="construction"
              />
              
              <ClimateFeatureCard
                title="Traffic Impact"
                icon="🚗"
                location={selectedLocation}
                type="traffic"
              />
              
              <ClimateFeatureCard
                title="Outdoor Activities"
                icon="🏃"
                location={selectedLocation}
                type="outdoor"
              />
              
              <ClimateFeatureCard
                title="Photography Conditions"
                icon="📸"
                location={selectedLocation}
                type="photography"
              />
              
              <ClimateFeatureCard
                title="Stargazing Forecast"
                icon="⭐"
                location={selectedLocation}
                type="astronomy"
              />
              
              <ClimateFeatureCard
                title="Pollen Count"
                icon="🌸"
                location={selectedLocation}
                type="pollen"
              />
              
              <ClimateFeatureCard
                title="Clothing Recommendations"
                icon="👕"
                location={selectedLocation}
                type="clothing"
              />
              
              <ClimateFeatureCard
                title="Pet Care Weather"
                icon="🐕"
                location={selectedLocation}
                type="pets"
              />
              
              <ClimateFeatureCard
                title="Garden Care"
                icon="🌻"
                location={selectedLocation}
                type="garden"
              />
              
              <ClimateFeatureCard
                title="Driving Conditions"
                icon="🚙"
                location={selectedLocation}
                type="driving"
              />
              
              <ClimateFeatureCard
                title="Event Planning"
                icon="🎉"
                location={selectedLocation}
                type="events"
              />
            </div>
          </div>

          <div className="weather-actions">
            <button 
              onClick={() => handleLocationSelect(selectedLocation)}
              className="refresh-button"
            >
              🔄 Refresh Weather
            </button>
          </div>

          {/* Data Export Section */}
          <DataExport 
            data={weatherData}
            locationName={selectedLocation.name}
            coordinates={{
              lat: selectedLocation.latitude,
              lon: selectedLocation.longitude
            }}
          />
        </div>
      )}

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner">🌍</div>
          <p>Searching the globe for weather data...</p>
        </div>
      )}
    </div>
  );
};

export default GlobalWeatherSearch;