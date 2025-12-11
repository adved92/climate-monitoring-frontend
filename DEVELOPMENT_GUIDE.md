# Climate Monitoring Frontend - Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Backend server running on http://localhost:8000

### Installation & Setup

1. **Install dependencies:**
   ```bash
   cd climate-monitoring-frontend
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env if needed - default points to localhost:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

## Testing the Application

### Manual Testing Checklist

#### ✅ Basic Functionality
- [ ] Application loads without errors
- [ ] Main heading displays: "🌍 Climate Monitoring System"
- [ ] Location search component is visible
- [ ] Default location (New York) loads automatically

#### ✅ Location Search
- [ ] Search by city name works (try "London", "Tokyo", "Mumbai")
- [ ] Search by coordinates works (try lat: 51.5074, lon: -0.1278 for London)
- [ ] Popular city buttons work
- [ ] Location updates in header after search

#### ✅ Weather Display
- [ ] Current weather card shows temperature, humidity, conditions
- [ ] 7-day forecast displays with proper dates
- [ ] Weather icons and descriptions are appropriate
- [ ] Temperature values are reasonable

#### ✅ Advanced Features
- [ ] Air Quality card loads (if backend supports it)
- [ ] Hourly forecast displays timeline view
- [ ] Chart view toggle works in hourly forecast
- [ ] All charts render properly with data

#### ✅ Error Handling
- [ ] Graceful error display when backend is down
- [ ] Retry button appears on errors
- [ ] Retry functionality works
- [ ] Loading states show during API calls

#### ✅ Responsive Design
- [ ] Works on desktop (1920x1080)
- [ ] Works on tablet (768x1024)
- [ ] Works on mobile (375x667)
- [ ] Grid layout adapts properly
- [ ] Text remains readable at all sizes

### Automated Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in UI mode
npm run test:ui

# Run linting
npm run lint

# Format code
npm run format
```

### Common Issues & Solutions

#### 1. **API Connection Errors**
**Problem:** "Network error: Unable to connect to server"
**Solution:** 
- Ensure backend is running on http://localhost:8000
- Check .env file has correct VITE_API_URL
- Verify no firewall blocking localhost:8000

#### 2. **Build Errors**
**Problem:** Build fails with dependency errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

#### 3. **Chart Not Rendering**
**Problem:** Recharts components not displaying
**Solution:**
- Check browser console for errors
- Ensure data format matches expected structure
- Verify recharts dependency is installed

#### 4. **Styling Issues**
**Problem:** Components not styled properly
**Solution:**
- Check CSS imports in components
- Verify CSS files exist
- Check browser dev tools for CSS errors

### Development Workflow

1. **Feature Development:**
   - Create feature branch
   - Write component with tests
   - Test manually and with automated tests
   - Update documentation

2. **Bug Fixes:**
   - Reproduce issue
   - Write failing test
   - Fix issue
   - Verify test passes
   - Test manually

3. **Code Quality:**
   - Run linter before commits
   - Maintain test coverage above 80%
   - Follow React best practices
   - Use TypeScript types where beneficial

### Performance Optimization

- **Lazy Loading:** Consider lazy loading for heavy components
- **Memoization:** Use React.memo for expensive renders
- **API Caching:** Implement caching for repeated API calls
- **Bundle Size:** Monitor and optimize bundle size

### Deployment

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Architecture Overview

```
src/
├── components/          # Reusable UI components
├── services/           # API and external service calls
├── utils/              # Helper functions and utilities
├── styles/             # Global styles and themes
├── test/               # Test setup and utilities
├── App.jsx             # Main application component
└── main.jsx            # Application entry point
```

### Key Components

- **App.jsx:** Main application with state management
- **LocationSearch:** Handles city/coordinate search
- **ClimateCard:** Displays current weather conditions
- **ForecastDisplay:** Shows 7-day weather forecast
- **AirQualityCard:** Air quality index and pollutants
- **HourlyForecast:** Detailed hourly predictions with charts
- **ErrorBoundary:** Catches and displays React errors

### API Integration

All API calls go through the centralized `services/api.js` module:
- Consistent error handling
- Request/response logging
- Timeout management
- Environment-based URL configuration

This ensures maintainable and debuggable API integration across all components.