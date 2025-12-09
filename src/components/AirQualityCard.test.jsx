import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import AirQualityCard from './AirQualityCard'

// Mock fetch
global.fetch = vi.fn()

describe('AirQualityCard', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders loading state initially', () => {
    fetch.mockImplementation(() => 
      new Promise(() => {}) // Never resolves
    )
    
    render(<AirQualityCard latitude={40.7128} longitude={-74.0060} />)
    expect(screen.getByText(/Loading air quality data/i)).toBeInTheDocument()
  })

  it('renders air quality data when fetch succeeds', async () => {
    const mockData = {
      success: true,
      data: {
        aqi: 75,
        aqi_category: 'Moderate',
        aqi_color: '#ffff00',
        aqi_level: 2,
        pollutants: {
          pm2_5: 3.11,
          pm10: 6.76,
          co: 183.33,
          no2: 15.84,
          o3: 61.06,
          so2: 3.16,
          nh3: 1.02
        },
        health_recommendations: [
          'Unusually sensitive people should consider reducing prolonged outdoor exertion'
        ],
        timestamp: '2025-12-09T05:24:26',
        location: {
          latitude: 40.7128,
          longitude: -74.006
        }
      }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    render(<AirQualityCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText('Air Quality Index')).toBeInTheDocument()
      expect(screen.getByText('75')).toBeInTheDocument()
      expect(screen.getByText('Moderate')).toBeInTheDocument()
    })
  })

  it('renders error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<AirQualityCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    })
  })

  it('does not render when no coordinates provided', () => {
    const { container } = render(<AirQualityCard />)
    expect(container.firstChild).toBeNull()
  })

  it('displays pollutant breakdown', async () => {
    const mockData = {
      success: true,
      data: {
        aqi: 50,
        aqi_category: 'Good',
        aqi_color: '#00e400',
        aqi_level: 1,
        pollutants: {
          pm2_5: 2.5,
          pm10: 5.0,
          co: 150.0,
          no2: 10.0,
          o3: 50.0,
          so2: 2.0,
          nh3: 1.0
        },
        health_recommendations: [],
        timestamp: '2025-12-09T05:24:26',
        location: {
          latitude: 40.7128,
          longitude: -74.006
        }
      }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    render(<AirQualityCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText('Pollutant Breakdown')).toBeInTheDocument()
      expect(screen.getByText('PM2.5')).toBeInTheDocument()
      expect(screen.getByText('PM10')).toBeInTheDocument()
    })
  })

  it('displays health recommendations when AQI is unhealthy', async () => {
    const mockData = {
      success: true,
      data: {
        aqi: 175,
        aqi_category: 'Unhealthy',
        aqi_color: '#ff0000',
        aqi_level: 4,
        pollutants: {
          pm2_5: 50.0,
          pm10: 100.0,
          co: 500.0,
          no2: 50.0,
          o3: 150.0,
          so2: 20.0,
          nh3: 10.0
        },
        health_recommendations: [
          'Everyone should avoid prolonged outdoor exertion',
          'People with respiratory disease should avoid outdoor activities'
        ],
        timestamp: '2025-12-09T05:24:26',
        location: {
          latitude: 40.7128,
          longitude: -74.006
        }
      }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    render(<AirQualityCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText('Health Recommendations')).toBeInTheDocument()
      expect(screen.getAllByText(/Everyone should avoid prolonged outdoor exertion/i).length).toBeGreaterThan(0)
    })
  })
})
