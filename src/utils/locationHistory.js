/**
 * Location history utility
 * Manages search history in localStorage for guest users
 * and database for authenticated users
 */

const HISTORY_KEY = 'location_search_history';
const MAX_HISTORY = 20;

export const locationHistory = {
  /**
   * Add location to history
   */
  addToHistory(location) {
    try {
      const history = this.getHistory();
      
      // Remove duplicate if exists
      const filtered = history.filter(
        item => !(item.latitude === location.latitude && item.longitude === location.longitude)
      );
      
      // Add to beginning
      const newHistory = [
        {
          ...location,
          timestamp: new Date().toISOString()
        },
        ...filtered
      ].slice(0, MAX_HISTORY);
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      
      return newHistory;
    } catch (error) {
      console.error('Error adding to history:', error);
      return [];
    }
  },

  /**
   * Get location history
   */
  getHistory() {
    try {
      const history = localStorage.getItem(HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  },

  /**
   * Clear all history
   */
  clearHistory() {
    try {
      localStorage.removeItem(HISTORY_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing history:', error);
      return false;
    }
  },

  /**
   * Remove specific item from history
   */
  removeFromHistory(latitude, longitude) {
    try {
      const history = this.getHistory();
      const filtered = history.filter(
        item => !(item.latitude === latitude && item.longitude === longitude)
      );
      
      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered));
      return filtered;
    } catch (error) {
      console.error('Error removing from history:', error);
      return [];
    }
  }
};
