import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = ({ onClose }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    temperature_unit: 'celsius',
    theme: 'auto',
    language: 'en'
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch('http://localhost:8000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        setFormData({
          email: result.data.email,
          temperature_unit: result.data.preferences?.temperature_unit || 'celsius',
          theme: result.data.preferences?.theme || 'auto',
          language: result.data.preferences?.language || 'en'
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          email: formData.email,
          preferences: {
            temperature_unit: formData.temperature_unit,
            theme: formData.theme,
            language: formData.language
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      await fetchProfile();
      setEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="user-profile loading">Loading profile...</div>;
  if (error) return <div className="user-profile error">Error: {error}</div>;
  if (!profile) return null;

  return (
    <div className="user-profile-overlay" onClick={onClose}>
      <div className="user-profile" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <h2>User Profile</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {!editing ? (
          <div className="profile-view">
            <div className="profile-field">
              <label>Email:</label>
              <span>{profile.email}</span>
            </div>
            <div className="profile-field">
              <label>Temperature Unit:</label>
              <span>{profile.preferences?.temperature_unit || 'celsius'}</span>
            </div>
            <div className="profile-field">
              <label>Theme:</label>
              <span>{profile.preferences?.theme || 'auto'}</span>
            </div>
            <div className="profile-field">
              <label>Language:</label>
              <span>{profile.preferences?.language || 'en'}</span>
            </div>
            <div className="profile-field">
              <label>Member Since:</label>
              <span>{new Date(profile.created_at).toLocaleDateString()}</span>
            </div>
            
            <button className="edit-btn" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="profile-edit" onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Temperature Unit:</label>
              <select
                value={formData.temperature_unit}
                onChange={(e) => setFormData({...formData, temperature_unit: e.target.value})}
              >
                <option value="celsius">Celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Theme:</label>
              <select
                value={formData.theme}
                onChange={(e) => setFormData({...formData, theme: e.target.value})}
              >
                <option value="auto">Auto</option>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Language:</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="save-btn">Save Changes</button>
              <button type="button" className="cancel-btn" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
