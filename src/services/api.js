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
  (response) => response.data,
  (error) => {
    console.error('API Error:', error)
    throw error
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
