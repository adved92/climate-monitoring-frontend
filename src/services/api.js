/**
 * API Service - Clean UI/UX Ready Version
 * - Debug mode enabled only in development
 * - Safe URL builder
 * - Clean error messages
 * - Optional auth
 * - Param serializer added
 */

import axios from "axios";
import qs from "qs";

const DEBUG = import.meta.env.DEV; // only log in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

if (DEBUG) {
  console.log("API Base URL:", API_BASE_URL);
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
  paramsSerializer: (params) =>
    qs.stringify(params, { arrayFormat: "comma", skipNulls: true }),
});

// --- Helper: Build Full URL ---
function buildFullUrl(config) {
  try {
    if (config.url.startsWith("http")) return config.url;
    return new URL(config.url, config.baseURL).toString();
  } catch {
    return config.baseURL + config.url;
  }
}

// --- Helper: Remove null & undefined ---
function cleanParams(params = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v !== null && v !== undefined)
  );
}

// --- Request interceptor ---
api.interceptors.request.use(
  (config) => {
    if (DEBUG) {
      console.log("➡️ API Request:", config.method?.toUpperCase(), config.url);
      console.log("Full URL:", buildFullUrl(config));
    }

    // Optional Bearer token
    // const token = localStorage.getItem("token")
    // if (token) config.headers.Authorization = `Bearer ${token}`

    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor ---
api.interceptors.response.use(
  (response) => {
    if (DEBUG) {
      console.log("✅ API Response:", response.status, response.config.url);
    }

    // Always return response.data but keep fallback
    return response.data ?? response;
  },
  (error) => {
    let message = "Something went wrong";

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (data?.detail) message = data.detail;
      else if (data?.message) message = data.message;
      else if (data?.error) message = data.error;
      else if (typeof data === "string") message = data;
      else message = JSON.stringify(data);

      throw new Error(`Server Error (${status}): ${message}`);
    }

    if (error.request) {
      throw new Error("Network Error: No response from server");
    }

    throw new Error(error.message);
  }
);

// GET wrapper with cleaned params
const wrapGet = (path, params) =>
  api.get(path, { params: cleanParams(params) });

// -----------------------------
//     CLIMATE API - ENHANCED GLOBAL SUPPORT
// -----------------------------
export const climateAPI = {
  // Basic weather data
  getByCoordinates: (lat, lon) => wrapGet("/climate/coordinates", { lat, lon }),
  getByCity: (city, country, state) => wrapGet("/climate/city", { city, country, state }),
  getByZip: (zipCode, country = "US") => wrapGet("/climate/zip", { zip_code: zipCode, country }),
  getSummary: (lat, lon) => wrapGet("/climate/summary", { lat, lon }),
  
  // Forecasts
  getForecast: (lat, lon) => wrapGet("/climate/forecast", { lat, lon }),
  get7DayForecast: (lat, lon) => wrapGet("/climate/forecast/7day", { lat, lon }),
  getHourlyForecast: (lat, lon) => wrapGet("/climate/forecast/hourly", { lat, lon }),
  getHourly7DayForecast: (lat, lon) => wrapGet("/climate/forecast/hourly-7day", { lat, lon }),
  
  // Global search and discovery
  searchCities: (query, limit = 5, includeWeather = true) => 
    wrapGet("/climate/search", { q: query, limit, include_weather: includeWeather }),
  
  globalSearch: (query, includeWeather = true, limit = 10) =>
    wrapGet("/climate/global-search", { query, include_weather: includeWeather, limit }),
  
  // Enhanced global city endpoints
  getWorldCities: (continent, country, limit = 100, includeWeather = false) =>
    wrapGet("/climate/world-cities", { continent, country, limit, include_weather: includeWeather }),
  
  getContinents: () => wrapGet("/climate/continents"),
  
  getCountries: (continent) => wrapGet("/climate/countries", { continent }),
  
  getPopularCities: (limit = 50, includeWeather = true) =>
    wrapGet("/climate/popular-cities", { limit, include_weather: includeWeather }),
  
  advancedCitySearch: (query, continent, country, minPopulation, maxPopulation, includeWeather = true, limit = 20) =>
    wrapGet("/climate/advanced-search", { 
      query, 
      continent, 
      country, 
      min_population: minPopulation, 
      max_population: maxPopulation, 
      include_weather: includeWeather, 
      limit 
    }),
  
  // Bulk operations
  getBulkWeather: (coordinates) => {
    // coordinates should be array of {lat, lon} objects
    const locationString = coordinates
      .map(coord => `${coord.lat},${coord.lon}`)
      .join(';');
    return wrapGet("/climate/bulk-weather", { locations: locationString });
  },
  
  // Convenience methods for different location types
  getWeatherForAnyLocation: async (location) => {
    // Smart location detection and weather fetching
    if (location.lat && location.lon) {
      return climateAPI.getByCoordinates(location.lat, location.lon);
    } else if (location.zipCode) {
      return climateAPI.getByZip(location.zipCode, location.country || "US");
    } else if (location.city) {
      return climateAPI.getByCity(location.city, location.country, location.state);
    } else {
      throw new Error("Invalid location format");
    }
  },
};

// -----------------------------
//      AIR QUALITY API
// -----------------------------
export const airQualityAPI = {
  get: (lat, lon) => wrapGet("/climate/air-quality", { lat, lon }),
  getPollutants: (lat, lon) => wrapGet("/climate/air-quality/pollutants", { lat, lon }),
};

// -----------------------------
//       UV INDEX API
// -----------------------------
export const uvIndexAPI = {
  get: (lat, lon) => wrapGet("/climate/uv-index", { lat, lon }),
};

// -----------------------------
//      DISASTER API
// -----------------------------
export const disasterAPI = {
  getEarthquakes: (lat, lon, radius = 500, minMagnitude = 2.5) =>
    wrapGet("/disasters/earthquakes", {
      lat,
      lon,
      radius,
      min_magnitude: minMagnitude,
    }),

  getTsunamis: (lat, lon, radius = 1000) =>
    wrapGet("/disasters/tsunamis", { lat, lon, radius }),

  getSummary: (lat, lon) => wrapGet("/disasters/summary", { lat, lon }),
};

// -----------------------------
//      HISTORICAL API
// -----------------------------
export const historicalAPI = {
  getData: (lat, lon, startDate, endDate) =>
    wrapGet("/historical/data", { latitude: lat, longitude: lon, start_date: startDate, end_date: endDate }),
  
  getMonthlyAverages: (lat, lon, year) =>
    wrapGet("/historical/monthly-averages", { latitude: lat, longitude: lon, year }),
  
  compareToHistorical: (lat, lon, currentTemp, currentPrecip) =>
    wrapGet("/historical/compare", { 
      latitude: lat, 
      longitude: lon, 
      current_temp: currentTemp, 
      current_precip: currentPrecip 
    }),
};

// -----------------------------
//      STATISTICS API
// -----------------------------
export const statisticsAPI = {
  getLocationStats: (lat, lon) =>
    wrapGet("/statistics/location", { latitude: lat, longitude: lon }),
  
  detectAnomalies: (lat, lon, currentTemp, currentPrecip) =>
    wrapGet("/statistics/anomalies", { 
      latitude: lat, 
      longitude: lon, 
      current_temp: currentTemp, 
      current_precip: currentPrecip 
    }),
};

// -----------------------------
//      PREDICTION API
// -----------------------------
export const predictionAPI = {
  getForecast: (lat, lon, hoursAhead = 24) =>
    api.post("/predictions/forecast", { latitude: lat, longitude: lon, hours_ahead: hoursAhead }),
  
  getConfidence: (lat, lon, hoursAhead = 24) =>
    wrapGet(`/predictions/confidence/${lat}/${lon}`, { hours_ahead: hoursAhead }),
  
  getModelInfo: () => wrapGet("/predictions/model-info"),
};

// -----------------------------
//      WILDFIRE API
// -----------------------------
export const wildfireAPI = {
  getActiveFires: (lat, lon, radius = 100) =>
    wrapGet("/wildfires/active", { latitude: lat, longitude: lon, radius }),
  
  getFireDetails: (fireId) =>
    wrapGet(`/wildfires/${fireId}`),
  
  getAQIImpact: (lat, lon, radius = 200) =>
    wrapGet("/wildfires/aqi-impact", { latitude: lat, longitude: lon, radius }),
};

// -----------------------------
//      FLOOD API
// -----------------------------
export const floodAPI = {
  getRisk: (lat, lon) =>
    wrapGet("/floods/risk", { latitude: lat, longitude: lon }),
  
  getRainfallAccumulation: (lat, lon) =>
    wrapGet("/floods/rainfall", { latitude: lat, longitude: lon }),
  
  getWarnings: (lat, lon, radius = 50) =>
    wrapGet("/floods/warnings", { latitude: lat, longitude: lon, radius }),
};

// -----------------------------
//      STORM API
// -----------------------------
export const stormAPI = {
  getActiveStorms: () => wrapGet("/storms/active"),
  
  getNearbyStorms: (lat, lon, radius = 1000) =>
    wrapGet("/storms/nearby", { latitude: lat, longitude: lon, radius }),
  
  getStormDetails: (stormId) =>
    wrapGet(`/storms/${stormId}`),
};

// -----------------------------
//      CHATBOT API
// -----------------------------
export const chatbotAPI = {
  processQuery: (query, userId, context) =>
    api.post("/chatbot/query", { query, user_id: userId, context }),
  
  getHistory: (userId, limit = 10) =>
    wrapGet(`/chatbot/history/${userId}`, { limit }),
  
  getSuggestions: () => wrapGet("/chatbot/suggestions"),
};

// -----------------------------
//      LOCATION API - ENHANCED GLOBAL SUPPORT
// -----------------------------
export const locationAPI = {
  // Static location data (from frontend data file)
  getZones: () => wrapGet("/locations/zones"),
  getCountriesByZone: (zoneId) => wrapGet(`/locations/countries/${zoneId}`),
  getStatesByCountry: (countryId) => wrapGet(`/locations/states/${countryId}`),
  getCitiesByState: (stateId) => wrapGet(`/locations/cities/${stateId}`),
  getFullHierarchy: () => wrapGet("/locations/full-hierarchy"),
  
  // Dynamic global location search (using external APIs)
  globalSearch: (query, includeWeather = false, limit = 10) =>
    wrapGet("/locations/global-search", { query, include_weather: includeWeather, limit }),
  
  reverseGeocode: (lat, lon, includeWeather = false) =>
    wrapGet("/locations/reverse-geocode", { lat, lon, include_weather: includeWeather }),
  
  validateLocation: (location) => {
    const params = {};
    if (location.city) params.city = location.city;
    if (location.state) params.state = location.state;
    if (location.country) params.country = location.country;
    if (location.zipCode) {
      params.zip_code = location.zipCode;
      params.country = location.country || "US";
    }
    return wrapGet("/locations/validate-location", params);
  },
  
  // Legacy search (for backward compatibility)
  searchLocations: (query, type) => wrapGet("/locations/search", { query, type }),
  getLocationByCoordinates: (lat, lon, radius = 50) =>
    wrapGet(`/locations/coordinates/${lat}/${lon}`, { radius }),
  
  // Convenience methods for comprehensive location handling
  findAnyLocation: async (searchTerm) => {
    // Try global search first (most comprehensive)
    try {
      const result = await locationAPI.globalSearch(searchTerm, true, 10);
      if (result.data.cities && result.data.cities.length > 0) {
        return result;
      }
    } catch (error) {
      console.warn("Global search failed, trying fallback:", error);
    }
    
    // Fallback to local search
    try {
      return await locationAPI.searchLocations(searchTerm, "city");
    } catch (error) {
      throw new Error(`Location search failed: ${error.message}`);
    }
  },
  
  getLocationWithWeather: async (location) => {
    // Get location details with current weather
    if (location.lat && location.lon) {
      return await locationAPI.reverseGeocode(location.lat, location.lon, true);
    } else if (location.query) {
      return await locationAPI.globalSearch(location.query, true, 1);
    } else {
      throw new Error("Invalid location format");
    }
  },
};

// -----------------------------
//      IOT MANAGEMENT API
// -----------------------------
export const iotAPI = {
  getDashboard: () => wrapGet("/iot/"),
  
  initializeDevices: () => api.post("/iot/initialize"),
  
  getAllDevices: () => wrapGet("/iot/devices"),
  
  getDeviceDetails: (deviceId) => wrapGet(`/iot/devices/${deviceId}`),
  
  getPowerSummary: () => wrapGet("/iot/power/summary"),
  
  getPowerHistory: (hours = 24) => wrapGet("/iot/power/history", { hours }),
  
  performHealthCheck: () => api.post("/iot/health-check"),
  
  getZoneAnalysis: () => wrapGet("/iot/zones"),
  
  getAlerts: (limit = 50) => wrapGet("/iot/alerts", { limit }),
  
  updateDeviceStatus: (deviceId, status) => 
    api.put(`/iot/devices/${deviceId}/status`, { status }),
  
  getClimateImpact: () => wrapGet("/iot/climate-impact"),
  
  optimizePower: () => api.post("/iot/optimize"),
  
  startMonitoring: () => api.post("/iot/start-monitoring"),
};

// -----------------------------
//      NOTIFICATION API
// -----------------------------
export const notificationAPI = {
  // Get all alerts (including IoT alerts)
  getAlerts: (unreadOnly = false, includeIot = true) => 
    wrapGet("/notifications/alerts", { unread_only: unreadOnly, include_iot: includeIot }),
  
  // Create a new alert
  createAlert: (alertData) => 
    api.post("/notifications/alerts", alertData),
  
  // Mark alert as read
  markAlertRead: (alertId) => 
    api.post(`/notifications/alerts/${alertId}/read`),
  
  // Mark all alerts as read
  markAllRead: () => 
    api.post("/notifications/alerts/read-all"),
  
  // Get IoT-specific alerts
  getIoTAlerts: () => 
    wrapGet("/notifications/alerts/iot"),
  
  // Get IoT power alerts
  getIoTPowerAlerts: () => 
    wrapGet("/notifications/alerts/iot/power"),
  
  // Get IoT maintenance alerts
  getIoTMaintenanceAlerts: () => 
    wrapGet("/notifications/alerts/iot/maintenance"),
  
  // Get alerts summary with counts
  getAlertsSummary: () => 
    wrapGet("/notifications/alerts/summary"),
};

export default api;
