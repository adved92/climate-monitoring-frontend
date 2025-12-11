/**
 * API Service - Handles all backend API calls
 */
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

console.log('API Base URL:', API_BASE_URL);
console.log('Environment VITE_API_URL:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making API request:', config.method?.toUpperCase(), config.url);
    console.log('Full URL:', config.baseURL + config.url);
    console.log('Request config:', config);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error('API Error Details:', {
      message: error.message,
      response: error.response,
      request: error.request,
      config: error.config
    });
    
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
      const errorMessage = error.response.data?.detail || error.response.data?.message || `HTTP ${error.response.status}`;
      throw new Error(`Server error: ${errorMessage}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error - no response received:', error.request);
      throw new Error('Network error: Unable to connect to server. Please check if the backend is running on http://localhost:8000');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
      throw new Error(`Request error: ${error.message}`);
    }
  }
)

// Climate API
export const climateAPI = {
  getByCoordinates: (lat, lon) => 
    api.get('/climate/coordinates', { params: { lat, lon } }),
  
  getByCity: (city, country = null) => 
    api.get('/climate/city', { params: { city, country } }),
  
  getSummary: (lat, lon) => 
    api.get('/climate/summary', { params: { lat, lon } }),
  
  getForecast: (lat, lon) => 
    api.get('/climate/forecast', { params: { lat, lon } }),
  
  get7DayForecast: (lat, lon) => 
    api.get('/climate/forecast/7day', { params: { lat, lon } }),
  
  getHourlyForecast: (lat, lon) => 
    api.get('/climate/forecast/hourly', { params: { lat, lon } }),
}

// Air Quality API
export const airQualityAPI = {
  get: (lat, lon) => 
    api.get('/air-quality/', { params: { lat, lon } }),
}

// Disaster API
export const disasterAPI = {
  getEarthquakes: (lat, lon, radius = 500, minMagnitude = 2.5) => 
    api.get('/disasters/earthquakes', { 
      params: { lat, lon, radius, min_magnitude: minMagnitude } 
    }),
  
  getTsunamis: (lat, lon, radius = 1000) => 
    api.get('/disasters/tsunamis', { params: { lat, lon, radius } }),
  
  getSummary: (lat, lon) => 
    api.get('/disasters/summary', { params: { lat, lon } }),
}

export default api
