import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { climateAPI } from './services/api';
import { mockWeatherData, mockForecastData } from './utils/testHelpers';

// Mock the API
vi.mock('./services/api', () => ({
  climateAPI: {
    getByCoordinates: vi.fn(),
    getByCity: vi.fn(),
    get7DayForecast: vi.fn(),
    getHourlyForecast: vi.fn()
  }
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup default successful API responses
    climateAPI.getByCoordinates.mockResolvedValue(mockWeatherData);
    climateAPI.get7DayForecast.mockResolvedValue(mockForecastData);
  });

  it('renders the main heading', () => {
    render(<App />);
    expect(screen.getByText('🌍 Climate Monitoring System')).toBeInTheDocument();
  });

  it('renders the location search component', () => {
    render(<App />);
    expect(screen.getByText('🌍 Search Worldwide')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    render(<App />);
  });

  it('loads default location on startup', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(climateAPI.getByCoordinates).toHaveBeenCalledWith(40.7128, -74.0060);
    });
  });

  it('displays current location when data is loaded', async () => {
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('📍 New York')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    climateAPI.getByCoordinates.mockRejectedValue(new Error('Network error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });

  it('shows retry button on error', async () => {
    climateAPI.getByCoordinates.mockRejectedValue(new Error('API Error'));
    
    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
  });

  it('retries API call when retry button is clicked', async () => {
    const user = userEvent.setup();
    
    // First call fails
    climateAPI.getByCoordinates.mockRejectedValueOnce(new Error('API Error'));
    // Second call succeeds
    climateAPI.getByCoordinates.mockResolvedValueOnce(mockWeatherData);
    
    render(<App />);
    
    // Wait for error to appear
    await waitFor(() => {
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });
    
    // Click retry
    await user.click(screen.getByText('Retry'));
    
    // Verify API was called again
    expect(climateAPI.getByCoordinates).toHaveBeenCalledTimes(2);
  });
});