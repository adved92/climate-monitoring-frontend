import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataExport from '../DataExport';
import { climateAPI } from '../../services/api';

// Mock the API
jest.mock('../../services/api', () => ({
  climateAPI: {
    getHourly7DayForecast: jest.fn()
  }
}));

// Mock URL.createObjectURL and related functions
global.URL.createObjectURL = jest.fn(() => 'mock-url');
global.URL.revokeObjectURL = jest.fn();

// Mock document.createElement and related DOM methods
const mockLink = {
  href: '',
  download: '',
  click: jest.fn(),
};

global.document.createElement = jest.fn((tagName) => {
  if (tagName === 'a') {
    return mockLink;
  }
  return {};
});

global.document.body.appendChild = jest.fn();
global.document.body.removeChild = jest.fn();

describe('DataExport Component', () => {
  const mockData = {
    temperature: 20,
    feels_like: 22,
    humidity: 65,
    pressure: 1013,
    wind_speed: 5.2,
    conditions: 'Partly Cloudy'
  };

  const mockCoordinates = {
    lat: 40.7128,
    lon: -74.0060
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders data export component', () => {
    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    expect(screen.getByText('📥 Export Data')).toBeInTheDocument();
    expect(screen.getByText('📊 Hourly Forecast Data')).toBeInTheDocument();
    expect(screen.getByText('📈 Download 168 Hours CSV')).toBeInTheDocument();
  });

  test('downloads current weather data as CSV', () => {
    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const downloadButton = screen.getByText('📥 Download');
    fireEvent.click(downloadButton);

    expect(mockLink.click).toHaveBeenCalled();
    expect(mockLink.download).toContain('weather-New York-');
    expect(mockLink.download).toContain('.csv');
  });

  test('downloads hourly forecast data', async () => {
    const mockHourlyData = {
      hourly: Array.from({ length: 168 }, (_, i) => ({
        datetime: `2024-12-23T${String(i % 24).padStart(2, '0')}:00:00`,
        temperature: 20 + Math.sin(i * 0.1) * 5,
        humidity: 60 + Math.cos(i * 0.1) * 20,
        pressure: 1013 + Math.sin(i * 0.05) * 10,
        wind_speed: 5 + Math.random() * 5,
        conditions: 'Partly Cloudy'
      }))
    };

    climateAPI.getHourly7DayForecast.mockResolvedValue(mockHourlyData);

    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const hourlyDownloadButton = screen.getByText('📈 Download 168 Hours CSV');
    fireEvent.click(hourlyDownloadButton);

    await waitFor(() => {
      expect(climateAPI.getHourly7DayForecast).toHaveBeenCalledWith(
        mockCoordinates.lat, 
        mockCoordinates.lon
      );
    });

    await waitFor(() => {
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toContain('hourly-weather-168h-New York-');
    });
  });

  test('shows warning when coordinates are missing', () => {
    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={null}
      />
    );

    expect(screen.getByText('⚠️ Location coordinates required for hourly data export')).toBeInTheDocument();
    
    const hourlyDownloadButton = screen.getByText('📈 Download 168 Hours CSV');
    expect(hourlyDownloadButton).toBeDisabled();
  });

  test('handles API error gracefully', async () => {
    climateAPI.getHourly7DayForecast.mockRejectedValue(new Error('API Error'));
    
    // Mock alert
    global.alert = jest.fn();

    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const hourlyDownloadButton = screen.getByText('📈 Download 168 Hours CSV');
    fireEvent.click(hourlyDownloadButton);

    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Failed to download hourly data. Please try again.');
    });
  });

  test('downloads weather report as PDF', async () => {
    const mockForecastData = {
      daily: Array.from({ length: 7 }, (_, i) => ({
        temp_max: 25 + i,
        temp_min: 15 + i,
        conditions: 'Sunny',
        precipitation: 10 + i * 5
      }))
    };

    climateAPI.get7DayForecast = jest.fn().mockResolvedValue(mockForecastData);

    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const pdfDownloadButton = screen.getByText('📄 Download Weather Report PDF');
    fireEvent.click(pdfDownloadButton);

    await waitFor(() => {
      expect(climateAPI.get7DayForecast).toHaveBeenCalledWith(
        mockCoordinates.lat, 
        mockCoordinates.lon
      );
    });

    await waitFor(() => {
      expect(mockLink.click).toHaveBeenCalled();
      expect(mockLink.download).toContain('weather-report-New York-');
    });
  });

  test('shows PDF download icon in header', () => {
    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const pdfIcon = screen.getByTitle('Download comprehensive weather report as PDF');
    expect(pdfIcon).toBeInTheDocument();
    expect(pdfIcon).toHaveTextContent('📥');
  });

  test('PDF download icon shows loading state', async () => {
    const mockForecastData = { daily: [] };
    climateAPI.get7DayForecast = jest.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockForecastData), 100))
    );

    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const pdfIcon = screen.getByTitle('Download comprehensive weather report as PDF');
    fireEvent.click(pdfIcon);

    expect(pdfIcon).toHaveTextContent('⏳');
    expect(pdfIcon).toBeDisabled();

    await waitFor(() => {
      expect(pdfIcon).toHaveTextContent('📥');
      expect(pdfIcon).not.toBeDisabled();
    });
  });

  test('shows loading state during download', async () => {
    // Mock a delayed API response
    climateAPI.getHourly7DayForecast.mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({ hourly: [] }), 100))
    );

    render(
      <DataExport 
        data={mockData} 
        locationName="New York" 
        coordinates={mockCoordinates}
      />
    );

    const hourlyDownloadButton = screen.getByText('📈 Download 168 Hours CSV');
    fireEvent.click(hourlyDownloadButton);

    expect(screen.getByText('⏳ Downloading...')).toBeInTheDocument();
    expect(hourlyDownloadButton).toBeDisabled();

    await waitFor(() => {
      expect(screen.getByText('📈 Download 168 Hours CSV')).toBeInTheDocument();
    });
  });
});