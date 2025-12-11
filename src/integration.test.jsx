import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { climateAPI, airQualityAPI } from './services/api';

// Mock all API services
vi.mock('./services/api', () => ({
  climateAPI: {
    getByCoordinates: vi.fn(),
    getByCity: vi.fn(),
    get7DayForecast: vi.fn(),
    getHourlyForecast: vi.fn()
  },
  airQualityAPI: {
    get: vi.fn()
  }
}));

describe('Integration Tests', () => {
  it('complete weather dashboard integration works', async () => {
    const user = userEvent.setup();
    
    // Mock successful API responses
    climateAPI.getByCoordinates.mockResolvedValue({
      location: { name: 'London', lat: 51.5074, lon: -0.1278 },
      temperature: 18.5,
      humidity: 72,
      precipitation: 0.1,
      conditions: 'Cloudy'
    });
    
    climateAPI.get7DayForecast.mockResolvedValue({
      forecast: [
        {
          date: '2024-01-01',
          temp_max: 20,
          temp_min: 15,
          conditions: 'Rainy',
          weather_icon: '10d',
          precipitation_prob: 80,
          wind_speed: 18
        }
      ]
    });

    airQualityAPI.get.mockResolvedValue({
      success: true,
      data: {
        aqi: 45,
        aqi_level: 1,
        aqi_category: 'Good',
        aqi_color: '#00e400',
        pollutants: { pm2_5: 12.5, pm10: 25.0 }
      }
    });

    climateAPI.getHourlyForecast.mockResolvedValue({
      success: true,
      data: [
        {
          timestamp: new Date().toISOString(),
          temperature: 18,
          feels_like: 20,
          conditions: 'Cloudy',
          weather_icon: '03d',
          precipitation_prob: 30,
          wind_speed: 15,
          wind_direction: 180,
          humidity: 70
        }
      ]
    });

    render(<App />);

    // Verify initial load
    await waitFor(() => {
      expect(screen.getByText('🌍 Climate Monitoring System')).toBeInTheDocument();
    });

    // Test city search
    const cityInput = screen.getByPlaceholderText(/Enter city name/);
    await user.type(cityInput, 'London');
    
    const searchButton = screen.getByText('Search');
    await user.click(searchButton);

    // Verify API calls were made
    await waitFor(() => {
      expect(climateAPI.getByCity).toHaveBeenCalledWith('London');
    });

    // Verify components render with data
    await waitFor(() => {
      expect(screen.getByText('📍 London')).toBeInTheDocument();
    });
  });

  it('handles complete API failure gracefully', async () => {
    // Mock all APIs to fail
    climateAPI.getByCoordinates.mockRejectedValue(new Error('Server down'));
    climateAPI.get7DayForecast.mockRejectedValue(new Error('Server down'));
    airQualityAPI.get.mockRejectedValue(new Error('Server down'));
    climateAPI.getHourlyForecast.mockRejectedValue(new Error('Server down'));

    render(<App />);

    // Should still render the main interface
    expect(screen.getByText('🌍 Climate Monitoring System')).toBeInTheDocument();
    
    // Should show error message
    await waitFor(() => {
      expect(screen.getByText(/Server down/)).toBeInTheDocument();
    });

    // Should show retry button
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('validates data integrity across components', async () => {
    const mockData = {
      location: { name: 'Test City', lat: 0, lon: 0 },
      temperature: 25,
      humidity: 60,
      conditions: 'Sunny'
    };

    climateAPI.getByCoordinates.mockResolvedValue(mockData);
    climateAPI.get7DayForecast.mockResolvedValue({ forecast: [] });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('📍 Test City')).toBeInTheDocument();
    });

    // Verify temperature is displayed correctly
    await waitFor(() => {
      expect(screen.getByText('25.0')).toBeInTheDocument();
    });
  });
});