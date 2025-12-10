/**
 * API Service - Handles all backend API calls
 */
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response received:', response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
      throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network error:', error.request);
      throw new Error('Network error: Unable to connect to server');
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
