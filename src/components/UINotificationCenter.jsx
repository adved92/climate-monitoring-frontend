import React, { useState, useEffect } from 'react';
import './UINotificationCenter.css';

const UINotificationCenter = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [notifications, setNotifications] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadNotifications();
    if (autoRefresh) {
      const interval = setInterval(loadNotifications, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      // Generate sample notifications and reports
      const sampleNotifications = generateSampleNotifications();
      const sampleReports = generateSampleReports();
      
      setNotifications(sampleNotifications);
      setReports(sampleReports);
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSampleNotifications = () => {
    const now = new Date();
    return [
      {
        id: 1,
        type: 'critical',
        title: '🚨 Critical Device Alert',
        message: 'Temperature sensor TEMP_SENSOR_456 in Building A - Floor 3 has stopped responding for 25 minutes',
        timestamp: new Date(now - 15 * 60000).toISOString(),
        deviceId: 'TEMP_SENSOR_456',
        location: 'Building A - Floor 3',
        actionRequired: true,
        status: 'active'
      },
      {
        id: 2,
        type: 'warning',
        title: '⚠️ Power Consumption Spike',
        message: 'HVAC system HVAC_789 showing 250% above normal power consumption',
        timestamp: new Date(now - 45 * 60000).toISOString(),
        deviceId: 'HVAC_789',
        location: 'Building B - Zone 5',
        actionRequired: true,
        status: 'active'
      },
      {
        id: 3,
        type: 'success',
        title: '✅ Automatic Device Replacement',
        message: 'Faulty humidity sensor HUM_SENSOR_123 automatically replaced with HUM_SENSOR_1001',
        timestamp: new Date(now - 2 * 3600000).toISOString(),
        oldDevice: 'HUM_SENSOR_123',
        newDevice: 'HUM_SENSOR_1001',
        downtime: '4 minutes',
        status: 'resolved'
      },
      {
        id: 4,
        type: 'info',
        title: '💚 System Health Check Complete',
        message: 'Daily system health check completed. 97% of devices operational. 2 minor issues detected and resolved automatically.',
        timestamp: new Date(now - 4 * 3600000).toISOString(),
        devicesChecked: 48,
        issuesResolved: 2,
        systemUptime: '99.2%',
        status: 'completed'
      },
      {
        id: 5,
        type: 'warning',
        title: '🔧 Maintenance Required',
        message: 'Air quality sensor AQ_SENSOR_567 requires calibration. Last maintenance: 89 days ago.',
        timestamp: new Date(now - 6 * 3600000).toISOString(),
        deviceId: 'AQ_SENSOR_567',
        maintenanceType: 'calibration',
        daysSinceMaintenance: 89,
        priority: 'medium',
        status: 'pending'
      },
      {
        id: 6,
        type: 'info',
        title: '📊 Energy Efficiency Report',
        message: 'Weekly energy efficiency improved by 8%. Total savings: $340 this week.',
        timestamp: new Date(now - 12 * 3600000).toISOString(),
        efficiencyImprovement: '8%',
        costSavings: '$340',
        period: 'weekly',
        status: 'completed'
      }
    ];
  };

  const generateSampleReports = () => {
    const now = new Date();
    return [
      {
        id: 1,
        type: 'daily_iot',
        title: '📈 Daily IoT System Report',
        summary: 'Comprehensive daily analysis of IoT device performance and system health',
        generatedAt: new Date(now - 8 * 3600000).toISOString(),
        data: {
          totalDevices: 48,
          activeDevices: 46,
          offlineDevices: 2,
          criticalAlerts: 1,
          warningAlerts: 3,
          systemUptime: '99.2%',
          energyEfficiency: '87/100',
          powerConsumption: '2,340W',
          topIssues: [
            'Temperature sensor communication failure',
            'HVAC power consumption spike',
            'Maintenance required for air quality sensors'
          ]
        }
      },
      {
        id: 2,
        type: 'building_consolidation',
        title: '🏢 Building Consolidation Report',
        summary: 'Building-level device management and consolidation analysis',
        generatedAt: new Date(now - 16 * 3600000).toISOString(),
        data: {
          buildings: [
            {
              name: 'Building A',
              totalDevices: 18,
              activeDevices: 17,
              zones: 6,
              powerConsumption: '890W',
              efficiency: '92/100',
              status: 'optimal'
            },
            {
              name: 'Building B',
              totalDevices: 20,
              activeDevices: 19,
              zones: 8,
              powerConsumption: '1,120W',
              efficiency: '85/100',
              status: 'warning'
            },
            {
              name: 'Building C',
              totalDevices: 10,
              activeDevices: 10,
              zones: 4,
              powerConsumption: '330W',
              efficiency: '95/100',
              status: 'excellent'
            }
          ],
          totalSavings: '$1,240',
          optimizationOpportunities: 3
        }
      },
      {
        id: 3,
        type: 'comprehensive',
        title: '📋 Comprehensive System Report',
        summary: 'Complete system analysis including weather data, IoT performance, and automation',
        generatedAt: new Date(now - 24 * 3600000).toISOString(),
        data: {
          systemOverview: {
            totalDevices: 48,
            systemHealth: 'Good',
            uptime: '99.2%',
            dataPoints: '15,420',
            automatedActions: 12
          },
          weatherIntegration: {
            dataCollectionStatus: 'Active',
            lastCollection: '15 minutes ago',
            citiesMonitored: 25,
            forecastAccuracy: '94%'
          },
          performanceMetrics: {
            responseTime: '1.2s',
            dataProcessing: '98.5%',
            alertDelivery: '99.8%',
            systemLoad: '23%'
          },
          recommendations: [
            'Schedule maintenance for aging sensors',
            'Optimize HVAC power consumption patterns',
            'Expand monitoring to additional zones',
            'Implement predictive maintenance algorithms'
          ]
        }
      }
    ];
  };

  const sendCriticalAlert = () => {
    const newAlert = {
      id: Date.now(),
      type: 'critical',
      title: '🚨 CRITICAL: Manual Alert Triggered',
      message: `Critical system alert manually triggered at ${new Date().toLocaleTimeString()}. Immediate attention required.`,
      timestamp: new Date().toISOString(),
      actionRequired: true,
      status: 'active',
      manual: true
    };
    setNotifications(prev => [newAlert, ...prev]);
  };

  const generateDailyReport = () => {
    const newReport = {
      id: Date.now(),
      type: 'daily_iot',
      title: '📈 Daily IoT Report (Manual)',
      summary: 'Manually generated daily IoT system report',
      generatedAt: new Date().toISOString(),
      data: {
        totalDevices: 48,
        activeDevices: Math.floor(Math.random() * 3) + 46,
        criticalAlerts: Math.floor(Math.random() * 3),
        systemUptime: `${(98 + Math.random() * 2).toFixed(1)}%`,
        energyEfficiency: `${Math.floor(Math.random() * 15) + 85}/100`
      }
    };
    setReports(prev => [newReport, ...prev]);
  };

  const generateBuildingReport = () => {
    const newReport = {
      id: Date.now(),
      type: 'building_consolidation',
      title: '🏢 Building Report (Manual)',
      summary: 'Manually generated building consolidation report',
      generatedAt: new Date().toISOString(),
      data: {
        buildings: [
          {
            name: 'Building A',
            totalDevices: 18,
            activeDevices: 17 + Math.floor(Math.random() * 2),
            efficiency: `${Math.floor(Math.random() * 10) + 85}/100`,
            status: Math.random() > 0.5 ? 'optimal' : 'good'
          }
        ],
        totalSavings: `$${Math.floor(Math.random() * 500) + 800}`
      }
    };
    setReports(prev => [newReport, ...prev]);
  };

  const startWeatherCollection = () => {
    const weatherAlert = {
      id: Date.now(),
      type: 'info',
      title: '🌤️ Weather Collection Started',
      message: 'Automated weather data collection has been initiated. Collecting data from 25 cities every 15 minutes.',
      timestamp: new Date().toISOString(),
      status: 'active',
      weatherCollection: true
    };
    setNotifications(prev => [weatherAlert, ...prev]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const clearReports = () => {
    setReports([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'critical': return '🚨';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'daily_iot': return '📈';
      case 'building_consolidation': return '🏢';
      case 'comprehensive': return '📋';
      default: return '📊';
    }
  };

  return (
    <div className="ui-notification-center">
      <div className="notification-header">
        <h1>🔔 IoT Notification & Reporting Center</h1>
        <div className="header-controls">
          <button 
            className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'}
          </button>
          <button className="manual-refresh-btn" onClick={loadNotifications}>
            🔄 Refresh Now
          </button>
        </div>
      </div>

      <div className="notification-tabs">
        <button 
          className={`tab ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          🚨 Instant Alerts ({notifications.length})
        </button>
        <button 
          className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
          onClick={() => setActiveTab('reports')}
        >
          📊 Reports ({reports.length})
        </button>
        <button 
          className={`tab ${activeTab === 'actions' ? 'active' : ''}`}
          onClick={() => setActiveTab('actions')}
        >
          🚀 Quick Actions
        </button>
      </div>

      <div className="notification-content">
        {activeTab === 'alerts' && (
          <div className="alerts-section">
            <div className="section-header">
              <h2>🚨 Real-time IoT Alerts & Notifications</h2>
              <button className="clear-btn" onClick={clearNotifications}>
                🗑️ Clear All
              </button>
            </div>
            
            {loading ? (
              <div className="loading">🔄 Loading notifications...</div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">
                <p>✅ No active notifications</p>
                <p>System is running smoothly</p>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map(notification => (
                  <div key={notification.id} className={`notification-card ${notification.type}`}>
                    <div className="notification-icon">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="notification-content">
                      <div className="notification-title">{notification.title}</div>
                      <div className="notification-message">{notification.message}</div>
                      <div className="notification-meta">
                        <span className="timestamp">
                          {new Date(notification.timestamp).toLocaleString()}
                        </span>
                        {notification.deviceId && (
                          <span className="device-id">Device: {notification.deviceId}</span>
                        )}
                        {notification.location && (
                          <span className="location">📍 {notification.location}</span>
                        )}
                      </div>
                      {notification.actionRequired && (
                        <div className="action-required">
                          ⚡ Action Required
                        </div>
                      )}
                    </div>
                    <div className={`status-badge ${notification.status}`}>
                      {notification.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-section">
            <div className="section-header">
              <h2>📊 Generated Reports</h2>
              <button className="clear-btn" onClick={clearReports}>
                🗑️ Clear All
              </button>
            </div>
            
            {reports.length === 0 ? (
              <div className="no-reports">
                <p>📋 No reports generated yet</p>
                <p>Use Quick Actions to generate reports</p>
              </div>
            ) : (
              <div className="reports-list">
                {reports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div className="report-icon">
                        {getReportIcon(report.type)}
                      </div>
                      <div className="report-info">
                        <h3>{report.title}</h3>
                        <p>{report.summary}</p>
                        <span className="generated-time">
                          Generated: {new Date(report.generatedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="report-data">
                      {report.type === 'daily_iot' && (
                        <div className="iot-report-data">
                          <div className="data-grid">
                            <div className="data-item">
                              <span className="label">Total Devices:</span>
                              <span className="value">{report.data.totalDevices}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">Active Devices:</span>
                              <span className="value active">{report.data.activeDevices}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">System Uptime:</span>
                              <span className="value">{report.data.systemUptime}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">Energy Efficiency:</span>
                              <span className="value">{report.data.energyEfficiency}</span>
                            </div>
                          </div>
                          {report.data.topIssues && (
                            <div className="top-issues">
                              <h4>🔍 Top Issues:</h4>
                              <ul>
                                {report.data.topIssues.map((issue, index) => (
                                  <li key={index}>{issue}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {report.type === 'building_consolidation' && (
                        <div className="building-report-data">
                          <div className="buildings-grid">
                            {report.data.buildings.map((building, index) => (
                              <div key={index} className="building-item">
                                <h4>{building.name}</h4>
                                <div className="building-stats">
                                  <span>Devices: {building.activeDevices}/{building.totalDevices}</span>
                                  <span>Efficiency: {building.efficiency}</span>
                                  <span className={`status ${building.status}`}>{building.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="savings-info">
                            💰 Total Savings: {report.data.totalSavings}
                          </div>
                        </div>
                      )}
                      
                      {report.type === 'comprehensive' && (
                        <div className="comprehensive-report-data">
                          <div className="overview-grid">
                            <div className="overview-section">
                              <h4>🏢 System Overview</h4>
                              <p>Health: {report.data.systemOverview.systemHealth}</p>
                              <p>Uptime: {report.data.systemOverview.uptime}</p>
                            </div>
                            <div className="overview-section">
                              <h4>🌤️ Weather Integration</h4>
                              <p>Status: {report.data.weatherIntegration.dataCollectionStatus}</p>
                              <p>Cities: {report.data.weatherIntegration.citiesMonitored}</p>
                            </div>
                          </div>
                          {report.data.recommendations && (
                            <div className="recommendations">
                              <h4>💡 Recommendations:</h4>
                              <ul>
                                {report.data.recommendations.map((rec, index) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="actions-section">
            <h2>🚀 Quick Actions</h2>
            
            <div className="actions-grid">
              <div className="action-category">
                <h3>🚨 Instant Alerts</h3>
                <button className="action-btn critical" onClick={sendCriticalAlert}>
                  🚨 Send Critical Alert
                </button>
                <p>Trigger an immediate critical system alert</p>
              </div>
              
              <div className="action-category">
                <h3>📊 Reports</h3>
                <button className="action-btn primary" onClick={generateDailyReport}>
                  📈 Generate Daily IoT Report
                </button>
                <button className="action-btn primary" onClick={generateBuildingReport}>
                  🏢 Generate Building Report
                </button>
                <p>Create comprehensive system and building reports</p>
              </div>
              
              <div className="action-category">
                <h3>🌍 Weather & Automation</h3>
                <button className="action-btn secondary" onClick={startWeatherCollection}>
                  🌤️ Start Weather Collection
                </button>
                <p>Initiate automated weather data collection</p>
              </div>
              
              <div className="action-category">
                <h3>🔄 System Management</h3>
                <button className="action-btn secondary" onClick={loadNotifications}>
                  🔄 Refresh All Data
                </button>
                <button className="action-btn warning" onClick={() => {clearNotifications(); clearReports();}}>
                  🗑️ Clear All Data
                </button>
                <p>Manage system data and refresh status</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UINotificationCenter;