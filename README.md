# Climate Monitoring Frontend 🌍

A modern, responsive React application for monitoring climate data worldwide. Built with React 18, Vite, and comprehensive weather APIs.

![Climate Monitoring Dashboard](https://img.shields.io/badge/React-18.2.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.0.8-green) ![Tests](https://img.shields.io/badge/Tests-Passing-brightgreen)

## ✨ Features

- **🌤️ Real-time Weather Data**: Current conditions for any location worldwide
- **📅 7-Day Forecast**: Detailed weather predictions with icons and conditions
- **🌬️ Air Quality Monitoring**: AQI data with health recommendations
- **⏰ Hourly Forecasts**: 48-hour detailed predictions with interactive charts
- **🔍 Global Search**: Search by city name or GPS coordinates
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **⚡ Fast & Modern**: Built with Vite for lightning-fast development
- **🧪 Fully Tested**: Comprehensive test suite with 90%+ coverage

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on `http://localhost:8000`

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd climate-monitoring-frontend

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:8000/api
```

## 🏗️ Architecture

### Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── AirQualityCard.jsx    # Air quality display
│   ├── ClimateCard.jsx       # Current weather
│   ├── ForecastDisplay.jsx   # 7-day forecast
│   ├── HourlyForecast.jsx    # Hourly predictions
│   ├── LocationSearch.jsx    # Search interface
│   └── ErrorBoundary.jsx     # Error handling
├── services/           # API integration
│   └── api.js               # Centralized API calls
├── utils/              # Helper functions
│   └── testHelpers.js       # Testing utilities
├── App.jsx             # Main application
└── main.jsx            # Entry point
```

### Key Technologies

- **React 18**: Modern React with hooks and concurrent features
- **Vite**: Fast build tool and development server
- **Axios**: HTTP client for API calls
- **Recharts**: Interactive charts and data visualization
- **Vitest**: Fast unit testing framework
- **Testing Library**: React component testing utilities

## 🧪 Testing

The application includes comprehensive testing:

```bash
# Run all tests
npm test

# Run specific test files
npm test App.t