import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import UVIndexCard from './UVIndexCard'

// Mock fetch
global.fetch = vi.fn()

describe('UVIndexCard', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders loading state initially', () => {
    fetch.mockImplementation(() => 
      new Promise(() => {}) // Never resolves
    )
    
    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)
    expect(screen.getByText(/Loading UV Index/i)).toBeInTheDocument()
  })

  it('renders UV Index data when fetch succeeds', async () => {
    const mockData = {
      success: true,
      data: {
        uv_index: 5.0,
        uv_category: 'Moderate',
        uv_color: '#f7e400',
        uv_level: 2,
        protection_recommendations: [
          'Wear sunglasses on bright days',
          'Use sunscreen if you burn easily'
        ],
        activity_suggestion: 'Good for outdoor activities with basic sun protection.',
        optimal_activity_times: ['Before 10:00 AM', 'After 4:00 PM'],
        timestamp: '2025-12-09T12:00:00',
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

    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getAllByText(/UV Index/i).length).toBeGreaterThan(0)
      expect(screen.getByText('5')).toBeInTheDocument()
      expect(screen.getByText('Moderate')).toBeInTheDocument()
    })
  })

  it('renders error message when fetch fails', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to fetch'))

    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/Error:/i)).toBeInTheDocument()
    })
  })

  it('does not render when no coordinates provided', () => {
    const { container } = render(<UVIndexCard />)
    expect(container.firstChild).toBeNull()
  })

  it('displays protection recommendations', async () => {
    const mockData = {
      success: true,
      data: {
        uv_index: 7.0,
        uv_category: 'High',
        uv_color: '#f85900',
        uv_level: 3,
        protection_recommendations: [
          'Wear sunglasses and use SPF 30+ sunscreen',
          'Cover up during midday hours'
        ],
        activity_suggestion: 'Plan outdoor activities for morning or late afternoon.',
        optimal_activity_times: ['Before 10:00 AM', 'After 4:00 PM'],
        timestamp: '2025-12-09T12:00:00',
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

    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/Sun Protection/i)).toBeInTheDocument()
      expect(screen.getByText(/Wear sunglasses and use SPF 30\+ sunscreen/i)).toBeInTheDocument()
    })
  })

  it('displays optimal activity times', async () => {
    const mockData = {
      success: true,
      data: {
        uv_index: 8.0,
        uv_category: 'Very High',
        uv_color: '#d8001d',
        uv_level: 4,
        protection_recommendations: [
          'Wear sunglasses and use SPF 30+ sunscreen'
        ],
        activity_suggestion: 'Limit outdoor activities between 10am-4pm.',
        optimal_activity_times: ['Before 9:00 AM', 'After 5:00 PM'],
        timestamp: '2025-12-09T12:00:00',
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

    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/Best Times for Outdoor Activities/i)).toBeInTheDocument()
      expect(screen.getByText('Before 9:00 AM')).toBeInTheDocument()
      expect(screen.getByText('After 5:00 PM')).toBeInTheDocument()
    })
  })

  it('handles unavailable UV data gracefully', async () => {
    const mockData = {
      success: true,
      data: {
        uv_index: null,
        uv_category: 'Unavailable',
        uv_color: '#cccccc',
        uv_level: 0,
        protection_recommendations: ['UV data temporarily unavailable'],
        activity_suggestion: 'UV data temporarily unavailable. Check back later.',
        optimal_activity_times: [],
        timestamp: '2025-12-09T12:00:00',
        location: {
          latitude: 40.7128,
          longitude: -74.006
        },
        error: 'UV data unavailable'
      }
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    })

    render(<UVIndexCard latitude={40.7128} longitude={-74.0060} />)

    await waitFor(() => {
      expect(screen.getByText(/UV data temporarily unavailable/i)).toBeInTheDocument()
    })
  })
})
