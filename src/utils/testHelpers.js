/**
 * Test helpers for frontend components
 */

// Mock API responses for testing
export const mockWeatherData = {
  location: {
    name: 'New York',
    country: 'US',
    lat: 40.7128,
    lon: -74.0060
  },
  temperature: 22.5,
  humidity: 65,
  precipitation: 0.2,
  conditions: 'Partly Cloudy',
  season: 'Summer'
};

export const mockForecastData = {
  forecast: [
    {
      date: '2024-01-01',
      temp_max: 25,
      temp_min: 18,
      conditions: 'Sunny',
      weather_icon: '01d',
      precipitation_prob: 10,
      wind_speed: 15
    },
    {
      date: '2024-01-02',
      temp_max: 23,
      temp_min: 16,
      conditions: 'Cloudy',
      weather_icon: '03d',
      precipitation_prob: 30,
      wind_speed: 12
    }
  ]
};

export const mockAirQualityData = {
  success: true,
  data: {
    aqi: 85,
    aqi_level: 2,
    aqi_category: 'Moderate',
    aqi_color: '#ffff00',
    timestamp: new Date().toISOString(),
    pollutants: {
      pm2_5: 25.5,
      pm10: 45.2,
      co: 1200,
      no2: 35.8,
      o3: 120.5,
      so2: 15.2
    },
    health_recommendations: [
      'Air quality is acceptable for most people.',
      'Sensitive individuals should consider limiting prolonged outdoor exertion.'
    ]
  }
};

export const mockHourlyData = {
  success: true,
  data: [
    {
      timestamp: new Date().toISOString(),
      temperature: 22,
      feels_like: 24,
      conditions: 'Clear',
      weather_icon: '01d',
      precipitation_prob: 5,
      wind_speed: 10,
      wind_direction: 180,
      humidity: 60
    },
    {
      timestamp: new Date(Date.now() + 3600000).toISOString(),
      temperature: 23,
      feels_like: 25,
      conditions: 'Partly Cloudy',
      weather_icon: '02d',
      precipitation_prob: 15,
      wind_speed: 12,
      wind_direction: 200,
      humidity: 65
    }
  ]
};

// Test utilities
export const validateWeatherData = (data) => {
  const required = ['temperature', 'humidity', 'conditions'];
  return required.every(field => data && typeof data[field] !== 'undefined');
};

export const validateForecastData = (data) => {
  if (!Array.isArray(data)) return false;
  return data.every(day => 
    day.date && 
    typeof day.temp_max === 'number' && 
    typeof day.temp_min === 'number'
  );
};

export const validateAirQualityData = (data) => {
  return data && 
    typeof data.aqi === 'number' && 
    data.aqi_category && 
    data.pollutants;
};

export const validateHourlyData = (data) => {
  if (!Array.isArray(data)) return false;
  return data.every(hour => 
    hour.timestamp && 
    typeof hour.temperature === 'number'
  );
};