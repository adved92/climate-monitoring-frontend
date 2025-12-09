import { useState, useEffect } from 'react';
import './WeatherWidget.css';

const WeatherWidget = ({ city, compact = false, theme = 'light' }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/climate/city?city=${city}`);
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        setWeatherData(data.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
      const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes
      return () => clearInterval(interval);
    }
  }, [city]);

  if (loading) {
    return (
      <div className={`weather-widget ${theme} ${compact ? 'compact' : ''}`}>
        <div className="widget-loading">⏳ Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`weather-widget ${theme} ${compact ? 'compact' : ''}`}>
        <div className="widget-error">❌ {error}</div>
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  if (compact) {
    return (
      <div className={`weather-widget ${theme} compact`}>
        <div className="widget-compact-content">
          <div className="widget-location">{city}</div>
          <div className="widget-temp">{weatherData.temperature?.toFixed(1)}°C</div>
          <div className="widget-condition">{weatherData.conditions}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`weather-widget ${theme}`}>
      <div className="widget-header">
        <h3 className="widget-location">📍 {city}</h3>
        <div className="widget-time">{new Date().toLocaleTimeString()}</div>
      </div>

      <div className="widget-main">
        <div className="widget-temp-display">
          <span className="temp-value">{weatherData.temperature?.toFixed(1)}</span>
          <span className="temp-unit">°C</span>
        </div>
        <div className="widget-condition">{weatherData.conditions}</div>
      </div>

      <div className="widget-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{weatherData.feels_like?.toFixed(1)}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weatherData.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{weatherData.wind_speed} m/s</span>
        </div>
      </div>

      <div className="widget-footer">
        <span>Powered by ECS</span>
      </div>
    </div>
  );
};

// Widget Generator Component
export const WidgetGenerator = () => {
  const [city, setCity] = useState('London');
  const [widgetType, setWidgetType] = useState('full');
  const [widgetTheme, setWidgetTheme] = useState('light');
  const [showCode, setShowCode] = useState(false);

  const generateEmbedCode = () => {
    const compact = widgetType === 'compact';
    return `<!-- Energy Conservation System Weather Widget -->
<div id="ecs-weather-widget"></div>
<script>
  (function() {
    const widget = document.createElement('iframe');
    widget.src = '${window.location.origin}/widget?city=${encodeURIComponent(city)}&compact=${compact}&theme=${widgetTheme}';
    widget.style.width = '${compact ? '200px' : '300px'}';
    widget.style.height = '${compact ? '100px' : '350px'}';
    widget.style.border = 'none';
    widget.style.borderRadius = '12px';
    document.getElementById('ecs-weather-widget').appendChild(widget);
  })();
</script>`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    alert('Widget code copied to clipboard!');
  };

  return (
    <div className="widget-generator">
      <h2>🔧 Weather Widget Generator</h2>
      <p>Create embeddable weather widgets for your website</p>

      <div className="generator-controls">
        <div className="control-group">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
          />
        </div>

        <div className="control-group">
          <label>Widget Type</label>
          <select value={widgetType} onChange={(e) => setWidgetType(e.target.value)}>
            <option value="full">Full Widget</option>
            <option value="compact">Compact Widget</option>
          </select>
        </div>

        <div className="control-group">
          <label>Theme</label>
          <select value={widgetTheme} onChange={(e) => setWidgetTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      <div className="widget-preview">
        <h3>Preview</h3>
        <WeatherWidget city={city} compact={widgetType === 'compact'} theme={widgetTheme} />
      </div>

      <div className="widget-code-section">
        <button onClick={() => setShowCode(!showCode)} className="toggle-code-btn">
          {showCode ? '🔼 Hide Code' : '🔽 Show Embed Code'}
        </button>

        {showCode && (
          <div className="code-container">
            <pre><code>{generateEmbedCode()}</code></pre>
            <button onClick={copyCode} className="copy-code-btn">
              📋 Copy Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
