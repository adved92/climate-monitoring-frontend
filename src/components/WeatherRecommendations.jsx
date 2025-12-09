import { useMemo } from 'react';
import './WeatherRecommendations.css';

const WeatherRecommendations = ({ weatherData, airQuality, uvIndex }) => {
  const recommendations = useMemo(() => {
    if (!weatherData) return [];

    const recs = [];
    const temp = weatherData.temperature;
    const conditions = weatherData.conditions?.toLowerCase() || '';
    const humidity = weatherData.humidity;
    const windSpeed = weatherData.wind_speed;

    // Temperature-based recommendations
    if (temp < 0) {
      recs.push({
        icon: '🥶',
        category: 'Cold Weather',
        title: 'Freezing Conditions',
        advice: 'Wear multiple layers, insulated jacket, gloves, and hat. Limit outdoor exposure.',
        priority: 'high'
      });
    } else if (temp < 10) {
      recs.push({
        icon: '🧥',
        category: 'Cold Weather',
        title: 'Cold Temperature',
        advice: 'Wear a warm jacket and layers. Perfect for brisk walks.',
        priority: 'medium'
      });
    } else if (temp > 30) {
      recs.push({
        icon: '🌡️',
        category: 'Hot Weather',
        title: 'High Temperature',
        advice: 'Stay hydrated, wear light clothing, use sunscreen. Avoid midday sun.',
        priority: 'high'
      });
    } else if (temp > 25) {
      recs.push({
        icon: '☀️',
        category: 'Warm Weather',
        title: 'Warm and Pleasant',
        advice: 'Great weather for outdoor activities. Stay hydrated.',
        priority: 'low'
      });
    } else {
      recs.push({
        icon: '😊',
        category: 'Comfortable',
        title: 'Ideal Temperature',
        advice: 'Perfect weather for any outdoor activity!',
        priority: 'low'
      });
    }

    // Precipitation recommendations
    if (conditions.includes('rain') || conditions.includes('drizzle')) {
      recs.push({
        icon: '☔',
        category: 'Precipitation',
        title: 'Rainy Conditions',
        advice: 'Bring an umbrella and wear waterproof clothing. Drive carefully.',
        priority: 'high'
      });
    } else if (conditions.includes('snow')) {
      recs.push({
        icon: '❄️',
        category: 'Precipitation',
        title: 'Snowy Conditions',
        advice: 'Wear warm, waterproof boots. Roads may be slippery.',
        priority: 'high'
      });
    } else if (conditions.includes('storm') || conditions.includes('thunder')) {
      recs.push({
        icon: '⛈️',
        category: 'Severe Weather',
        title: 'Stormy Weather',
        advice: 'Stay indoors. Avoid outdoor activities and tall objects.',
        priority: 'critical'
      });
    }

    // Humidity recommendations
    if (humidity > 80) {
      recs.push({
        icon: '💧',
        category: 'Humidity',
        title: 'High Humidity',
        advice: 'Feels muggy. Stay in air-conditioned spaces when possible.',
        priority: 'medium'
      });
    } else if (humidity < 30) {
      recs.push({
        icon: '🏜️',
        category: 'Humidity',
        title: 'Low Humidity',
        advice: 'Dry air. Use moisturizer and stay hydrated.',
        priority: 'low'
      });
    }

    // Wind recommendations
    if (windSpeed > 15) {
      recs.push({
        icon: '💨',
        category: 'Wind',
        title: 'Strong Winds',
        advice: 'Secure loose objects. Be cautious when driving.',
        priority: 'high'
      });
    }

    // Air quality recommendations
    if (airQuality) {
      const aqi = airQuality.aqi || 0;
      if (aqi > 150) {
        recs.push({
          icon: '😷',
          category: 'Air Quality',
          title: 'Unhealthy Air Quality',
          advice: 'Limit outdoor activities. Wear a mask if going outside.',
          priority: 'critical'
        });
      } else if (aqi > 100) {
        recs.push({
          icon: '🌫️',
          category: 'Air Quality',
          title: 'Moderate Air Quality',
          advice: 'Sensitive groups should limit prolonged outdoor activities.',
          priority: 'medium'
        });
      }
    }

    // UV Index recommendations
    if (uvIndex) {
      const uv = uvIndex.value || 0;
      if (uv > 7) {
        recs.push({
          icon: '🧴',
          category: 'UV Protection',
          title: 'High UV Index',
          advice: 'Use SPF 30+ sunscreen. Wear sunglasses and hat. Seek shade.',
          priority: 'high'
        });
      } else if (uv > 5) {
        recs.push({
          icon: '🕶️',
          category: 'UV Protection',
          title: 'Moderate UV Index',
          advice: 'Use sunscreen and wear sunglasses during peak hours.',
          priority: 'medium'
        });
      }
    }

    // Activity recommendations
    if (temp >= 15 && temp <= 25 && !conditions.includes('rain') && windSpeed < 10) {
      recs.push({
        icon: '🚴',
        category: 'Activities',
        title: 'Perfect for Outdoor Exercise',
        advice: 'Great conditions for running, cycling, or sports!',
        priority: 'low'
      });
    }

    return recs;
  }, [weatherData, airQuality, uvIndex]);

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      default: return 'priority-low';
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="weather-recommendations">
      <h2>💡 Weather Recommendations</h2>
      <p className="subtitle">Personalized advice based on current conditions</p>

      <div className="recommendations-grid">
        {recommendations.map((rec, index) => (
          <div key={index} className={`recommendation-card ${getPriorityClass(rec.priority)}`}>
            <div className="rec-icon">{rec.icon}</div>
            <div className="rec-content">
              <div className="rec-category">{rec.category}</div>
              <h3 className="rec-title">{rec.title}</h3>
              <p className="rec-advice">{rec.advice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherRecommendations;
