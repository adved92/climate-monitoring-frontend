import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import HourlyForecast from './HourlyForecast'

// Mock fetch
global.fetch = vi.fn()

describe('HourlyForecast', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders loading state initially', () => {
    fetch.mockImplementation(() => 
      new Promise(() => {}) // Never resolves
    )
    
    render(<HourlyForecast latitude={40.7128} longitude={-74.0060} />)
    expect(screen.getByText(/Loading hourly forecast/i)).toBeInTheDocument()
  })

  it('renders hourly forecast data when fetch succeeds', async () => {
    const mockData = {
      success: true,
      data: [
        {
          timestamp: '2025-12-09T06:00:00',
          datetime: '2025-12-09 06:00',
          hour: 6,
          temperature: 20,
          feels_like: 18,
          humidity: 60,
          pressure: 1013,
          precipitation: 0,
          precipitation_prob: 10,
          wind_speed: 5,
          wind_direction: 180,
          clouds: 20,
          visibility: 10000,
          conditions: 'Clear Sky',
          weather_main: 'Clear',
          weather_icon: '01d'
        }
      ]
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    render(<HourlyForecast latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText('48-Hour Forecast')).toBeInTheDocument()
    })
  })

  it('renders error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<HourlyForecast latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    })
  })

  it('does not render when no coordinates provided', () => {
    const { container } = render(<HourlyForecast />)
    expect(container.firstChild).toBeNull()
  })
})
