import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText(/Climate Monitoring System/i)).toBeInTheDocument()
  })

  it('renders location search by default', () => {
    render(<App />)
    expect(screen.getByText(/Search Worldwide/i)).toBeInTheDocument()
  })
})
