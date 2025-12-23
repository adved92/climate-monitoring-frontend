import React, { useState, useEffect } from 'react';
import './ReportsNotificationDashboard.css';

const ReportsNotificationDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [reports, setReports] = useState({
    iotTools: null,
    buildingConsolidation: null,
    notifications: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchAllReports();
    
    if (autoRefresh) {
      const interval = setInterval(fetchAllReports, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const fetchAllReports = async () => {
    try {
      setLoading(true);
      
      // Fetch all reports in parallel
      const [iotToolsResponse, buildingResponse, notificationsResponse] = await Promise.all([
        fetch('/api/iot-tools/reports/comprehensive').catch(() => ({ ok: false })),
        fetch('/api/building-consolidation/reports/all').catch(() => ({ ok: false })),
        fetch('/api/notifications/recent').catch(() => ({ ok: false }))
      ]);

      const iotToolsData = iotToolsResponse.ok ? await iotToolsResponse.json() : null;
      const buildingData = buildingResponse.ok ? await buildingResponse.json() : null;
      const notificationsData = notificationsResponse.ok ? await notificationsResponse.json() : { data: [] };

      setReports({
        iotTools: iotToolsData?.data,
        buildingConsolidation: buildingData?.data,
        notifications: notificationsData?.data || []
      });
      
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType) => {
    try {
      const endpoint = reportType === 'iot-tools' 
        ? '/api/iot-tools/reports/generate'
        : '/api/building-consolidation/reports/generate';
      
      const response = await fetch(endpoint, { method: 'POST' });
      if (!response.ok) throw new Error(`Failed to generate ${reportType} report`);
      
      // Refresh data after generation
      await fetchAllReports();
      
      // Show success notification
      addNotification(`${reportType} report generated successfully`, 'success');
    } catch (err) {
      addNotification(`Failed to generate ${reportType} report: ${err.message}`, 'error');
    }
  };

  const sendReportEmail = async (reportType, reportData) => {
    try {
      const endpoint = reportType === 'iot-tools'
        ? '/api/iot-tools/reports/email'
        : '/api/building-consolidation/reports/email';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ report_data: reportData })
      });
      
      if (!response.ok) throw new Error(`Failed to send ${reportType} report email`);
      
      addNotification(`${reportType} report sent via email successfully`, 'success');
    } catch (err) {
      addNotification(`Failed to send ${reportType} report email: ${err.message}`, 'error');
    }
  };

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    
    setReports(prev => ({
      ...prev,
      notifications: [notification, ...prev.notifications.slice(0, 49)] // Keep last 50
    }));
  };

  if (loading && !reports.iotTools && !reports.buildingConsolidation) {
    return (
      <div className="reports-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading Reports Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="reports-notification-dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📊 Reports & Notifications Dashboard</h1>
          <div className="header-controls">
            <button 
              className={`refresh-btn ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'}
            </button>
            <button className="manual-refresh-btn" onClick={fetchAllReports}>
              🔄 Refresh Now
            </button>
          </div>
        </div>
        
        {error && (
          <div className="error-banner">
            ⚠️ {error}
          </div>
        )}
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📈 Overview
        </button>
        <button 
          className={activeTab === 'iot-tools' ? 'active' : ''}
          onClick={() => setActiveTab('iot-tools')}
        >
          🔧 IoT Tools Reports
        </button>
        <button 
          className={activeTab === 'building-consolidation' ? 'active' : ''}
          onClick={() => setActiveTab('building-consolidation')}
        >
          🏢 Building Consolidation
        </button>
        <button 
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          🔔 Notifications ({reports.notifications.length})
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <OverviewTab 
            reports={reports} 
            onGenerateReport={generateReport}
            onSendEmail={sendReportEmail}
          />
        )}
        {activeTab === 'iot-tools' && (
          <IoTToolsReportsTab 
            data={reports.iotTools} 
            onGenerateReport={() => generateReport('iot-tools')}
            onSendEmail={(data) => sendReportEmail('iot-tools', data)}
          />
        )}
        {activeTab === 'building-consolidation' && (
          <BuildingConsolidationTab 
            data={reports.buildingConsolidation} 
            onGenerateReport={() => generateReport('building-consolidation')}
            onSendEmail={(data) => sendReportEmail('building-consolidation', data)}
          />
        )}
        {activeTab === 'notifications' && (
          <NotificationsTab notifications={reports.notifications} />
        )}
      </main>
    </div>
  );
};

const OverviewTab = ({ reports, onGenerateReport, onSendEmail }) => {
  const iotSummary = reports.iotTools?.summary || {};
  const buildingSummary = reports.buildingConsolidation?.[0] || {};
  
  return (
    <div className="overview-tab">
      <div className="overview-cards">
        <div className="overview-card iot-tools">
          <h3>🔧 IoT Tools Status</h3>
          <div className="card-stats">
            <div className="stat">
              <span className="number">{iotSummary.total_tools || 0}</span>
              <span className="label">Total Tools</span>
            </div>
            <div className="stat">
              <span className="number active">{iotSummary.active_deployments || 0}</span>
              <span className="label">Active Deployments</span>
            </div>
            <div className="stat">
              <span className="number">{iotSummary.categories_count || 0}</span>
              <span className="label">Categories</span>
            </div>
          </div>
          <div className="card-actions">
            <button onClick={() => onGenerateReport('iot-tools')}>
              📊 Generate Report
            </button>
            <button onClick={() => onSendEmail('iot-tools', iotSummary)}>
              📧 Email Report
            </button>
          </div>
        </div>

        <div className="overview-card building">
          <h3>🏢 Building Status</h3>
          <div className="card-stats">
            <div className="stat">
              <span className="number">{buildingSummary.total_devices || 0}</span>
              <span className="label">Total Devices</span>
            </div>
            <div className="stat">
              <span className="number active">{buildingSummary.active_devices || 0}</span>
              <span className="label">Active Devices</span>
            </div>
            <div className="stat">
              <span className="number">{buildingSummary.zones_count || 0}</span>
              <span className="label">Zones</span>
            </div>
          </div>
          <div className="card-actions">
            <button onClick={() => onGenerateReport('building-consolidation')}>
              📊 Generate Report
            </button>
            <button onClick={() => onSendEmail('building-consolidation', buildingSummary)}>
              📧 Email Report
            </button>
          </div>
        </div>

        <div className="overview-card energy">
          <h3>⚡ Energy Overview</h3>
          <div className="card-stats">
            <div className="stat">
              <span className="number">{buildingSummary.total_power_consumption?.toFixed(0) || 0}W</span>
              <span className="label">Total Power</span>
            </div>
            <div className="stat">
              <span className="number efficiency">{buildingSummary.energy_efficiency_score?.toFixed(0) || 0}</span>
              <span className="label">Efficiency Score</span>
            </div>
            <div className="stat">
              <span className={`status ${buildingSummary.operational_status}`}>
                {buildingSummary.operational_status || 'Unknown'}
              </span>
              <span className="label">Status</span>
            </div>
          </div>
        </div>

        <div className="overview-card alerts">
          <h3>🚨 Alerts Summary</h3>
          <div className="card-stats">
            <div className="stat">
              <span className="number critical">{buildingSummary.critical_alerts || 0}</span>
              <span className="label">Critical</span>
            </div>
            <div className="stat">
              <span className="number warning">{buildingSummary.total_alerts || 0}</span>
              <span className="label">Total Alerts</span>
            </div>
            <div className="stat">
              <span className="number">{reports.notifications.length}</span>
              <span className="label">Notifications</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h3>📋 Recent Activity</h3>
        <div className="activity-list">
          {reports.notifications.slice(0, 5).map((notification, index) => (
            <div key={notification.id || index} className={`activity-item ${notification.type}`}>
              <span className="activity-time">
                {new Date(notification.timestamp).toLocaleTimeString()}
              </span>
              <span className="activity-message">{notification.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="quick-actions">
        <h3>🚀 Quick Actions</h3>
        <div className="action-buttons">
          <button className="action-btn primary" onClick={() => onGenerateReport('iot-tools')}>
            🔧 Generate IoT Tools Report
          </button>
          <button className="action-btn primary" onClick={() => onGenerateReport('building-consolidation')}>
            🏢 Generate Building Report
          </button>
          <button className="action-btn secondary" onClick={() => window.location.reload()}>
            🔄 Refresh All Data
          </button>
        </div>
      </div>
    </div>
  );
};

const IoTToolsReportsTab = ({ data, onGenerateReport, onSendEmail }) => {
  if (!data) {
    return (
      <div className="iot-tools-tab">
        <div className="no-data">
          <h3>🔧 IoT Tools Reports</h3>
          <p>No IoT tools data available. Generate a report to see detailed information.</p>
          <button className="generate-btn" onClick={onGenerateReport}>
            📊 Generate IoT Tools Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="iot-tools-tab">
      <div className="tab-header">
        <h2>🔧 IoT Tools Comprehensive Report</h2>
        <div className="tab-actions">
          <button className="action-btn" onClick={onGenerateReport}>
            🔄 Refresh Report
          </button>
          <button className="action-btn primary" onClick={() => onSendEmail(data)}>
            📧 Email Report
          </button>
        </div>
      </div>

      <div className="tools-summary">
        <div className="summary-cards">
          <div className="summary-card">
            <h4>Total Tools</h4>
            <span className="big-number">{data.summary?.total_tools || 0}</span>
          </div>
          <div className="summary-card">
            <h4>Categories</h4>
            <span className="big-number">{data.summary?.categories_count || 0}</span>
          </div>
          <div className="summary-card">
            <h4>Active Deployments</h4>
            <span className="big-number">{data.summary?.active_deployments || 0}</span>
          </div>
          <div className="summary-card">
            <h4>Total Inventory Value</h4>
            <span className="big-number">${data.summary?.total_inventory_value?.toFixed(0) || 0}</span>
          </div>
        </div>
      </div>

      {data.categories && (
        <div className="categories-section">
          <h3>📂 Tool Categories</h3>
          <div className="categories-grid">
            {data.categories.map((category, index) => (
              <div key={category.id || index} className="category-card">
                <h4>{category.category_name}</h4>
                <p>{category.category_description}</p>
                <div className="category-stats">
                  <span>Tools: {category.tool_count || 0}</span>
                  <span className={`priority priority-${category.priority}`}>
                    Priority: {category.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.deployments && (
        <div className="deployments-section">
          <h3>🚀 Active Deployments</h3>
          <div className="deployments-table">
            <table>
              <thead>
                <tr>
                  <th>Deployment Name</th>
                  <th>Tool</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Performance</th>
                  <th>Power</th>
                </tr>
              </thead>
              <tbody>
                {data.deployments.slice(0, 10).map((deployment, index) => (
                  <tr key={deployment.id || index}>
                    <td>{deployment.deployment_name}</td>
                    <td>{deployment.tool_name}</td>
                    <td>{deployment.location}</td>
                    <td>
                      <span className={`status ${deployment.deployment_status}`}>
                        {deployment.deployment_status}
                      </span>
                    </td>
                    <td>{deployment.performance_rating}/5</td>
                    <td>{deployment.power_consumption_kwh?.toFixed(1) || 0} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.inventory && (
        <div className="inventory-section">
          <h3>📦 Inventory Status</h3>
          <div className="inventory-summary">
            <div className="inventory-stat">
              <span className="stat-label">Total Items:</span>
              <span className="stat-value">{data.inventory.total_items}</span>
            </div>
            <div className="inventory-stat">
              <span className="stat-label">Available:</span>
              <span className="stat-value available">{data.inventory.available_items}</span>
            </div>
            <div className="inventory-stat">
              <span className="stat-label">Out of Stock:</span>
              <span className="stat-value out-of-stock">{data.inventory.out_of_stock_items}</span>
            </div>
            <div className="inventory-stat">
              <span className="stat-label">Reorder Needed:</span>
              <span className="stat-value reorder">{data.inventory.reorder_needed}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BuildingConsolidationTab = ({ data, onGenerateReport, onSendEmail }) => {
  if (!data || data.length === 0) {
    return (
      <div className="building-consolidation-tab">
        <div className="no-data">
          <h3>🏢 Building Consolidation Reports</h3>
          <p>No building consolidation data available. Generate a report to see detailed information.</p>
          <button className="generate-btn" onClick={onGenerateReport}>
            📊 Generate Building Report
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="building-consolidation-tab">
      <div className="tab-header">
        <h2>🏢 Building Consolidation Reports</h2>
        <div className="tab-actions">
          <button className="action-btn" onClick={onGenerateReport}>
            🔄 Refresh Reports
          </button>
          <button className="action-btn primary" onClick={() => onSendEmail(data)}>
            📧 Email Reports
          </button>
        </div>
      </div>

      <div className="buildings-grid">
        {data.map((building, index) => (
          <div key={building.id || index} className="building-card">
            <div className="building-header">
              <h3>{building.building_name}</h3>
              <span className={`status-badge ${building.operational_status}`}>
                {building.operational_status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            
            <div className="building-location">
              📍 {building.building_location}
            </div>

            <div className="building-stats">
              <div className="stat-row">
                <div className="stat">
                  <span className="stat-label">Total Devices</span>
                  <span className="stat-value">{building.total_devices}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Active</span>
                  <span className="stat-value active">{building.active_devices}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Offline</span>
                  <span className="stat-value offline">{building.offline_devices}</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat">
                  <span className="stat-label">Power</span>
                  <span className="stat-value">{building.total_power_consumption?.toFixed(0)}W</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Efficiency</span>
                  <span className="stat-value efficiency">{building.energy_efficiency_score?.toFixed(0)}/100</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Zones</span>
                  <span className="stat-value">{building.zones_count}</span>
                </div>
              </div>

              <div className="stat-row">
                <div className="stat">
                  <span className="stat-label">Total Alerts</span>
                  <span className="stat-value warning">{building.total_alerts}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Critical</span>
                  <span className="stat-value critical">{building.critical_alerts}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Avg Temp</span>
                  <span className="stat-value">
                    {building.average_temperature ? `${building.average_temperature.toFixed(1)}°C` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {building.zones_summary && (
              <div className="zones-summary">
                <h4>🏗️ Zones Overview</h4>
                <div className="zones-list">
                  {Object.entries(building.zones_summary).slice(0, 3).map(([zoneName, zoneData]) => (
                    <div key={zoneName} className="zone-item">
                      <span className="zone-name">{zoneName}</span>
                      <span className="zone-devices">{zoneData.device_count} devices</span>
                      <span className="zone-power">{zoneData.total_power?.toFixed(0)}W</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="building-actions">
              <button 
                className="action-btn small"
                onClick={() => onSendEmail([building])}
              >
                📧 Email This Report
              </button>
            </div>

            <div className="report-timestamp">
              📅 Generated: {new Date(building.report_timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const NotificationsTab = ({ notifications }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    return notification.type === filter;
  });

  const notificationTypes = ['all', 'success', 'error', 'warning', 'info'];

  return (
    <div className="notifications-tab">
      <div className="tab-header">
        <h2>🔔 System Notifications</h2>
        <div className="notification-filters">
          {notificationTypes.map(type => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? 'active' : ''}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="notifications-list">
        {filteredNotifications.length === 0 ? (
          <div className="no-notifications">
            <p>No notifications to display</p>
          </div>
        ) : (
          filteredNotifications.map((notification, index) => (
            <div key={notification.id || index} className={`notification-item ${notification.type}`}>
              <div className="notification-icon">
                {notification.type === 'success' && '✅'}
                {notification.type === 'error' && '❌'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'info' && 'ℹ️'}
              </div>
              <div className="notification-content">
                <div className="notification-message">{notification.message}</div>
                <div className="notification-timestamp">
                  {new Date(notification.timestamp).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReportsNotificationDashboard;