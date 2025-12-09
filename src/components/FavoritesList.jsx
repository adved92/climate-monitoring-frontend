import React, { useState, useEffect } from 'react';
import './FavoritesList.css';

const FavoritesList = ({ onSelectLocation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }

      const result = await response.json();
      if (result.success) {
        setFavorites(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (favoriteId) => {
    if (!window.confirm('Are you sure you want to remove this favorite?')) {
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }

      await fetchFavorites();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNickname = async (favoriteId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/favorites/${favoriteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nickname })
      });

      if (!response.ok) {
        throw new Error('Failed to update favorite');
      }

      await fetchFavorites();
      setEditingId(null);
      setNickname('');
    } catch (err) {
      setError(err.message);
    }
  };

  const startEdit = (favorite) => {
    setEditingId(favorite.id);
    setNickname(favorite.nickname || '');
  };

  if (loading) {
    return <div className="favorites-list loading">Loading favorites...</div>;
  }

  if (error) {
    return <div className="favorites-list error">Error: {error}</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-list empty">
        <div className="empty-state">
          <h3>⭐ No Favorite Locations Yet</h3>
          <p>Search for a location and add it to your favorites for quick access!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-list">
      <h2>⭐ Favorite Locations</h2>
      
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="favorite-card">
            <div className="favorite-header">
              {editingId === favorite.id ? (
                <div className="edit-nickname">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter nickname"
                    autoFocus
                  />
                  <button onClick={() => handleUpdateNickname(favorite.id)}>✓</button>
                  <button onClick={() => setEditingId(null)}>✗</button>
                </div>
              ) : (
                <>
                  <h3 onClick={() => onSelectLocation(favorite.location)}>
                    {favorite.nickname || favorite.location.name}
                  </h3>
                  <div className="favorite-actions">
                    <button
                      className="edit-btn"
                      onClick={() => startEdit(favorite)}
                      title="Edit nickname"
                    >
                      ✏️
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(favorite.id)}
                      title="Remove favorite"
                    >
                      🗑️
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="favorite-location">
              <span className="location-name">{favorite.location.name}</span>
              <span className="location-country">{favorite.location.country}</span>
            </div>
            
            <div className="favorite-coords">
              📍 {favorite.location.latitude.toFixed(2)}, {favorite.location.longitude.toFixed(2)}
            </div>
            
            <button
              className="view-btn"
              onClick={() => onSelectLocation(favorite.location)}
            >
              View Weather
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
