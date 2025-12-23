import React, { useState, useEffect } from 'react';
import './App.css';
import EnhancedLocationSelector from './components/EnhancedLocationSelector';
import CityDashboard from './components/CityDashboard';
import IoTDashboard from './components/IoTDashboard';
import GlobalWeatherSearch from './components/GlobalWeatherSearch';
import WeatherDatabaseViewer from './components/WeatherDatabaseViewer';
import IoTReportsNotificationDashboard from './components/IoTReportsNotificationDashboard';
import UINotificationCenter from './components/UINotificationCenter';
import IoTToolsCatalog from './components/IoTToolsCatalog';
import IoTReportsDashboard from './components/IoTReportsDashboard';


function App() {
  // Check URL hash for initial view
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '').split('?')[0];
    return hash || 'home';
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const [currentView, setCurrentView] = useState(getInitialView()); // 'home', 'climate', 'global', 'iot', 'database', 'reports', 'notifications', 'iot-reports'
  const [navigationPath, setNavigationPath] = useState([]); // For hierarchical navigation

  // Listen for hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const newView = getInitialView();
      setCurrentView(newView);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  const handleCitySelect = (locationData) => {
    setSelectedCity(locationData);
    setCurrentView('city');
  };

  const handleBackToSelector = () => {
    setSelectedCity(null);
    setCurrentView('location');
  };

  const handleViewChange = (view) => {
    window.location.hash = view === 'home' ? '' : `#${view}`;
    setCurrentView(view);
    setSelectedCity(null);
    setNavigationPath([]);
  };

  const handleBackToHome = () => {
    window.location.hash = '';
    setCurrentView('home');
    setSelectedCity(null);
    setNavigationPath([]);
  };

  return (
    <div className="app">
      {/* Navigation Header */}
      <div className="app-header">
        <div className="app-title">
          <h1>🌍 Climate Monitoring & IoT Management System</h1>
        </div>
        <div className="app-navigation">
          {currentView !== 'home' && (
            <button 
              className="nav-btn back-btn"
              onClick={handleBackToHome}
            >
              ← Back to Home
            </button>
          )}

        </div>
      </div>



      {/* Main Content */}
      <div className="app-content">
        {currentView === 'home' && (
          <div className="home-container">
            <div className="home-header">
              <p>Choose a module to get started</p>
            </div>
            <div className="main-modules">
              <div className="module-card" onClick={() => handleViewChange('climate')}>
                <div className="module-icon">🌡️</div>
                <h2>Climate Monitoring</h2>
                <p>Zone → Country → State → City weather monitoring</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('global')}>
                <div className="module-icon">🌍</div>
                <h2>Global Weather Search</h2>
                <p>Search any city worldwide for complete weather features</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('iot')}>
                <div className="module-icon">🏢</div>
                <h2>IoT Smart Building</h2>
                <p>Smart building and IoT device management</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('database')}>
                <div className="module-icon">🗄️</div>
                <h2>Weather Database</h2>
                <p>View weather data collected every 60 minutes with 14-day retention</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('reports')}>
                <div className="module-icon">📊</div>
                <h2>Reports & Notifications</h2>
                <p>IoT Tools reports, Building Consolidation reports with notifications</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('iot-reports')}>
                <div className="module-icon">📈</div>
                <h2>IoT Reports Dashboard</h2>
                <p>Interactive reports with charts, diagrams, and visual analytics</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('notifications')}>
                <div className="module-icon">🔔</div>
                <h2>Live Notification Center</h2>
                <p>Real-time IoT alerts, instant reports, and system notifications</p>
              </div>
              <div className="module-card" onClick={() => handleViewChange('iot-tools')}>
                <div className="module-icon">🔧</div>
                <h2>IoT Tools Catalog</h2>
                <p>Browse, deploy, and manage real-world IoT devices and tools</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'climate' && (
          <EnhancedLocationSelector onCitySelect={handleCitySelect} />
        )}

        {currentView === 'global' && (
          <GlobalWeatherSearch />
        )}

        {currentView === 'iot' && (
          <IoTDashboard />
        )}

        {currentView === 'database' && (
          <WeatherDatabaseViewer />
        )}

        {currentView === 'reports' && (
          <IoTReportsNotificationDashboard />
        )}

        {currentView === 'notifications' && (
          <UINotificationCenter />
        )}

        {currentView === 'iot-tools' && (
          <IoTToolsCatalog />
        )}

        {currentView === 'iot-reports' && (
          <IoTReportsDashboard />
        )}

        {selectedCity && (
          <CityDashboard 
            cityData={selectedCity} 
            onBack={handleBackToSelector} 
          />
        )}
      </div>
    </div>
  );
}

export default App;