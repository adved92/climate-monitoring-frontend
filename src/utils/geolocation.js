/**
 * Geolocation utility
 * Handles browser geolocation API with error handling
 */

export const geolocation = {
  /**
   * Check if geolocation is supported
   */
  isSupported() {
    return 'geolocation' in navigator;
  },

  /**
   * Get current position
   * @returns {Promise<{latitude: number, longitude: number}>}
   */
  async getCurrentPosition() {
    return new Promise((resolve, reject) => {
      if (!this.isSupported()) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let message = 'Unable to retrieve your location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              message = 'Location permission denied. Please enable location access in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              message = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              message = 'Location request timed out.';
              break;
          }
          
          reject(new Error(message));
        },
        options
      );
    });
  },

  /**
   * Request permission for geolocation
   */
  async requestPermission() {
    try {
      const position = await this.getCurrentPosition();
      return { granted: true, position };
    } catch (error) {
      return { granted: false, error: error.message };
    }
  },

  /**
   * Get location name from coordinates using reverse geocoding
   */
  async getLocationName(latitude, longitude) {
    try {
      // Using OpenStreetMap Nominatim for reverse geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to get location name');
      }
      
      const data = await response.json();
      
      return {
        name: data.display_name,
        city: data.address.city || data.address.town || data.address.village,
        country: data.address.country,
        country_code: data.address.country_code
      };
    } catch (error) {
      console.error('Error getting location name:', error);
      return {
        name: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`,
        city: null,
        country: null,
        country_code: null
      };
    }
  }
};
