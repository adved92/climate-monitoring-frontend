import React, { useState } from 'react';
import { geolocation } from '../utils/geolocation';
import './UseMyLocationButton.css';

const UseMyLocationButton = ({ onLocationDetected }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);

    try {
      // Get current position
      const position = await geolocation.getCurrentPosition();
      
      // Get location name
      const locationInfo = await geolocation.getLocationName(
        position.latitude,
        position.longitude
      );

      // Call callback with location data
      onLocationDetected({
        latitude: position.latitude,
        longitude: position.longitude,
        name: locationInfo.city || locationInfo.name,
        country: locationInfo.country,
        country_code: locationInfo.country_code
      });

    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="use-my-location">
      <button
        className="location-btn"
        onClick={handleClick}
        disabled={loading}
        title="Use my current location"
      >
        {loading ? (
          <>
            <span className="spinner">⟳</span>
            Detecting...
          </>
        ) : (
          <>
            <span className="icon">📍</span>
            Use My Location
          </>
        )}
      </button>
      {error && (
        <div className="location-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default UseMyLocationButton;
