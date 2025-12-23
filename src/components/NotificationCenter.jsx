import React, { useState, useEffect } from 'react';
import './NotificationCenter.css';

const NotificationCenter = ({ onClose, embedded = false }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' or 'unread'

  useEffect(() => {
    fetchAlerts();
  }, [filter]);

  const fetchAlerts = async () => {
    try {
      const unreadParam = filter === 'unread' ? '?unread_only=true&include_iot=true' : '?include_iot=true';
      const response = await fetch(`http://localhost:8000/api/notifications/alerts${unreadParam}`);

      if (!response.ok) {
        throw new Error('Failed to fetch alerts');
      }

      const result = await response.json();
      if (result.success) {
        setAlerts(result.data);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/notifications/alerts/${alertId}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark as read');
      }

      await fetchAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/notifications/alerts/read-all', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to mark all as read');
      }

      await fetchAlerts();
    } catch (err) {
      setError(err.message);
    }
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      critical: '🚨'
    };
    return icons[severity] || 'ℹ️';
  };

  const getIoTIcon = (type) => {
    const icons = {
      iot_device: '🔌',
      iot_power: '⚡',
      iot_maintenance: '🔧'
    };
    return icons[type] || '🤖';
  };

  const getSeverityClass = (severity) => {
    return `alert-item severity-${severity}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const unreadCount = alerts.filter(a => !a.is_read).length;

  return (
    <div className={embedded ? "notification-center-embedded" : "notification-overlay"} onClick={embedded ? undefined : onClose}>
      <div className={embedded ? "notification-center embedded" : "notification-center"} onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h2>🔔 Notifications</h2>
          {!embedded && <button className="close-btn" onClick={onClose}>×</button>}
        </div>

        <div className="notification-controls">
          <div className="filter-tabs">
            <button
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
            >
              All ({alerts.length})
            </button>
            <button
              className={filter === 'unread' ? 'active' : ''}
              onClick={() => setFilter('unread')}
            >
              Unread ({unreadCount})
            </button>
          </div>
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading">Loading notifications...</div>
        ) : error ? (
          <div className="error">Error: {error}</div>
        ) : alerts.length === 0 ? (
          <div className="empty-state">
            <p>No notifications</p>
          </div>
        ) : (
          <div className="alerts-list">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`${getSeverityClass(alert.severity)} ${alert.source === 'iot_sqlite' ? 'iot-alert' : ''}`}
                onClick={() => !alert.is_read && markAsRead(alert.id)}
              >
                <div className="alert-header">
                  <span className="severity-icon">
                    {alert.source === 'iot_sqlite' ? getIoTIcon(alert.type) : getSeverityIcon(alert.severity)}
                  </span>
                  <span className="alert-title">{alert.title}</span>
                  {alert.source === 'iot_sqlite' && <span className="iot-badge">IoT</span>}
                  {!alert.is_read && <span className="unread-badge">●</span>}
                </div>
                <div className="alert-message">{alert.message}</div>
                
                {/* IoT-specific information */}
                {alert.source === 'iot_sqlite' && (
                  <div className="iot-details">
                    {alert.device_id && <div className="device-info">🔌 Device: {alert.device_id}</div>}
                    {alert.zone && <div className="zone-info">🏢 Zone: {alert.zone}</div>}
                    {alert.power_watts && <div className="power-info">⚡ Power: {alert.power_watts}W</div>}
                    {alert.days_until && <div className="maintenance-info">🔧 Due in: {alert.days_until} days</div>}
                  </div>
                )}
                
                {alert.location && alert.location.name && (
                  <div className="alert-location">📍 {alert.location.name}</div>
                )}
                <div className="alert-time">{formatTime(alert.created_at || alert.timestamp)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;
