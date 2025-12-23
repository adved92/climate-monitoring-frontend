import React, { useState, useEffect } from 'react';
import './UINotificationCenter.css';

const IoTReportsNotificationDashboard = () => {
  const [activeTab, setActiveTab] = useState('alerts');
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    loadData();
    if (autoRefresh) {
      const interval = setInterval(loadData, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load existing reports from localStorage or generate initial ones
      const savedReports = localStorage.getItem('iotReports');
      const savedAlerts = localStorage.getItem('iotAlerts');
      
      if (savedReports) {
        setReports(JSON.parse(savedReports));
      } else {
        // Generate initial sample reports
        const initialReports = generateInitialReports();
        setReports(initialReports);
        localStorage.setItem('iotReports', JSON.stringify(initialReports));
      }

      if (savedAlerts) {
        setAlerts(JSON.parse(savedAlerts));
      } else {
        // Generate initial sample alerts
        const initialAlerts = generateInitialAlerts();
        setAlerts(initialAlerts);
        localStorage.setItem('iotAlerts', JSON.stringify(initialAlerts));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateInitialAlerts = () => {
    const now = new Date();
    return [
      {
        id: 1,
        type: 'critical',
        title: 'Temperature sensor communication failure',
        message: 'Sensor TS-001 in Building A has lost communication',
        timestamp: new Date(now - 30 * 60000).toISOString(),
        location: 'Building A - Floor 3',
        status: 'active'
      },
      {
        id: 2,
        type: 'warning',
        title: 'HVAC power consumption spike',
        message: 'Power usage increased by 25% in Building B',
        timestamp: new Date(now - 45 * 60000).toISOString(),
        location: 'Building B - Mechanical Room',
        status: 'active'
      },
      {
        id: 3,
        type: 'info',
        title: 'Maintenance required for air quality sensors',
        message: 'Scheduled maintenance due for 3 air quality sensors',
        timestamp: new Date(now - 60 * 60000).toISOString(),
        location: 'Building C - Multiple Floors',
        status: 'active'
      },
      {
        id: 4,
        type: 'warning',
        title: 'Low battery warning',
        message: 'Wireless sensor WS-205 battery at 15%',
        timestamp: new Date(now - 90 * 60000).toISOString(),
        location: 'Building A - Floor 2',
        status: 'active'
      },
      {
        id: 5,
        type: 'info',
        title: 'Firmware update available',
        message: 'New firmware available for HVAC controllers',
        timestamp: new Date(now - 120 * 60000).toISOString(),
        location: 'All Buildings',
        status: 'active'
      },
      {
        id: 6,
        type: 'critical',
        title: 'Network connectivity issue',
        message: 'IoT gateway offline in Building C',
        timestamp: new Date(now - 150 * 60000).toISOString(),
        location: 'Building C - Network Room',
        status: 'active'
      }
    ];
  };

  const generateInitialReports = () => {
    const now = new Date();
    return [
      {
        id: 1,
        type: 'daily',
        title: '📈 Daily IoT System Report',
        summary: 'Comprehensive daily analysis of IoT device performance and system health',
        generatedAt: new Date(now - 2 * 3600000).toISOString(),
        data: {
          totalDevices: 48,
          activeDevices: 46,
          systemUptime: '99.2%',
          energyEfficiency: '87/100',
          topIssues: [
            'Temperature sensor communication failure',
            'HVAC power consumption spike',
            'Maintenance required for air quality sensors'
          ]
        }
      },
      {
        id: 2,
        type: 'building',
        title: '🏢 Building Consolidation Report',
        summary: 'Building-level device management and consolidation analysis',
        generatedAt: new Date(now - 24 * 3600000).toISOString(),
        data: {
          buildings: [
            {
              name: 'Building A',
              devices: '17/18',
              efficiency: '92/100',
              status: 'optimal'
            },
            {
              name: 'Building B',
              devices: '19/20',
              efficiency: '85/100',
              status: 'warning'
            },
            {
              name: 'Building C',
              devices: '10/10',
              efficiency: '95/100',
              status: 'excellent'
            }
          ],
          totalSavings: '$1,240'
        }
      },
      {
        id: 3,
        type: 'comprehensive',
        title: '📋 Comprehensive System Report',
        summary: 'Complete system analysis including weather data, IoT performance, and automation',
        generatedAt: new Date(now - 36 * 3600000).toISOString(),
        data: {
          systemHealth: 'Good',
          uptime: '99.2%',
          weatherIntegration: 'Active',
          cities: 25,
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

  const generateComprehensiveReport = () => {
    const now = new Date();
    const reportId = Date.now();
    
    const newReport = {
      id: reportId,
      type: 'comprehensive',
      title: '📋 Comprehensive IoT Device Replacement Report',
      summary: 'Complete analysis of faulty IoT devices, replacement timelines, and detailed maintenance actions',
      generatedAt: now.toISOString(),
      data: {
        totalDevices: 156 + Math.floor(Math.random() * 10),
        workingDevices: 136 + Math.floor(Math.random() * 5),
        replacedDevices: 20 + Math.floor(Math.random() * 3),
        maintenanceActions: 18 + Math.floor(Math.random() * 5),
        deviceBreakdown: {
          sensors: { 
            total: 45, 
            working: 39 + Math.floor(Math.random() * 3), 
            replaced: 6 - Math.floor(Math.random() * 2) 
          },
          controllers: { 
            total: 28, 
            working: 25 + Math.floor(Math.random() * 2), 
            replaced: 3 - Math.floor(Math.random() * 1) 
          },
          monitors: { 
            total: 35, 
            working: 32 + Math.floor(Math.random() * 2), 
            replaced: 3 - Math.floor(Math.random() * 1) 
          },
          actuators: { 
            total: 48, 
            working: 40 + Math.floor(Math.random() * 4), 
            replaced: 8 - Math.floor(Math.random() * 2) 
          }
        },
        recentActions: [
          {
            date: new Date(now - 86400000 * 1).toLocaleDateString(),
            device: `Temperature Sensor TS-${Math.floor(Math.random() * 999) + 100}`,
            location: 'Building A - Floor 3',
            action: 'Replaced sensor due to calibration drift',
            cost: `$${Math.floor(Math.random() * 200) + 200}`,
            technician: 'John Smith'
          },
          {
            date: new Date(now - 86400000 * 2).toLocaleDateString(),
            device: `HVAC Controller HC-${Math.floor(Math.random() * 999) + 100}`,
            location: 'Building B - Mechanical Room',
            action: 'Replaced controller, updated firmware',
            cost: `$${Math.floor(Math.random() * 500) + 1000}`,
            technician: 'Sarah Johnson'
          },
          {
            date: new Date(now - 86400000 * 3).toLocaleDateString(),
            device: `Air Quality Monitor AQ-${Math.floor(Math.random() * 999) + 100}`,
            location: 'Building C - Lobby',
            action: 'Full unit replacement and calibration',
            cost: `$${Math.floor(Math.random() * 300) + 700}`,
            technician: 'Mike Davis'
          },
          {
            date: new Date(now - 86400000 * 4).toLocaleDateString(),
            device: `Valve Actuator VA-${Math.floor(Math.random() * 999) + 100}`,
            location: 'Building A - Zone 2',
            action: 'Replaced actuator motor, tested operation',
            cost: `$${Math.floor(Math.random() * 400) + 300}`,
            technician: 'Lisa Chen'
          }
        ],
        energySavings: `${Math.floor(Math.random() * 10) + 20}%`,
        systemUptime: `${(98 + Math.random() * 2).toFixed(1)}%`,
        costSavings: `$${(Math.random() * 20000 + 30000).toFixed(0)}`,
        performanceMetrics: {
          responseTime: '< 2 seconds',
          dataAccuracy: '99.2%',
          alertDelivery: '99.8%',
          maintenanceCost: '-15%'
        }
      }
    };
    
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('iotReports', JSON.stringify(updatedReports));
  };

  const generateDailyReport = () => {
    const now = new Date();
    const reportId = Date.now();
    
    const newReport = {
      id: reportId,
      type: 'daily',
      title: '📈 Daily IoT System Report',
      summary: 'Daily analysis of IoT device performance and system health',
      generatedAt: now.toISOString(),
      data: {
        totalDevices: 156,
        workingDevices: 136 + Math.floor(Math.random() * 5),
        offlineDevices: Math.floor(Math.random() * 3) + 1,
        criticalAlerts: Math.floor(Math.random() * 3),
        warningAlerts: Math.floor(Math.random() * 5) + 2,
        systemUptime: `${(98 + Math.random() * 2).toFixed(1)}%`,
        energyEfficiency: `${Math.floor(Math.random() * 15) + 85}/100`,
        powerConsumption: `${(2000 + Math.random() * 500).toFixed(0)}W`,
        todaysActions: [
          'Calibrated 3 temperature sensors',
          'Updated firmware on 2 controllers',
          'Replaced 1 faulty humidity sensor',
          'Performed routine maintenance on HVAC system'
        ]
      }
    };
    
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('iotReports', JSON.stringify(updatedReports));
  };

  const generateBuildingReport = () => {
    const now = new Date();
    const reportId = Date.now();
    
    const newReport = {
      id: reportId,
      type: 'building',
      title: '🏢 Building Consolidation Report',
      summary: 'Building-level device management and consolidation analysis',
      generatedAt: now.toISOString(),
      data: {
        buildings: [
          {
            name: 'Building A',
            totalDevices: 52,
            workingDevices: 48 + Math.floor(Math.random() * 3),
            zones: 6,
            powerConsumption: `${(800 + Math.random() * 200).toFixed(0)}W`,
            efficiency: `${Math.floor(Math.random() * 10) + 88}/100`,
            status: 'optimal',
            recentActions: [
              'Replaced 2 temperature sensors',
              'Updated HVAC controller firmware',
              'Calibrated air quality monitors'
            ]
          },
          {
            name: 'Building B',
            totalDevices: 64,
            workingDevices: 59 + Math.floor(Math.random() * 4),
            zones: 8,
            powerConsumption: `${(1100 + Math.random() * 300).toFixed(0)}W`,
            efficiency: `${Math.floor(Math.random() * 8) + 82}/100`,
            status: 'good',
            recentActions: [
              'Replaced HVAC controller',
              'Serviced 3 valve actuators',
              'Updated lighting control system'
            ]
          },
          {
            name: 'Building C',
            totalDevices: 40,
            workingDevices: 38 + Math.floor(Math.random() * 2),
            zones: 4,
            powerConsumption: `${(600 + Math.random() * 150).toFixed(0)}W`,
            efficiency: `${Math.floor(Math.random() * 5) + 92}/100`,
            status: 'excellent',
            recentActions: [
              'Routine maintenance completed',
              'All systems operating optimally',
              'Energy efficiency improved by 5%'
            ]
          }
        ],
        totalSavings: `$${(Math.random() * 2000 + 3000).toFixed(0)}`,
        optimizationOpportunities: Math.floor(Math.random() * 5) + 2
      }
    };
    
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    localStorage.setItem('iotReports', JSON.stringify(updatedReports));
  };



  const clearReports = () => {
    setReports([]);
    localStorage.removeItem('iotReports');
  };

  const clearAlerts = () => {
    setAlerts([]);
    localStorage.removeItem('iotAlerts');
  };

  const getReportIcon = (type) => {
    switch (type) {
      case 'comprehensive': return '📋';
      case 'daily': return '📈';
      case 'building': return '🏢';
      default: return '📊';
    }
  };

  return (
    <div className="ui-notification-center">
      <div className="notification-header">
        <h1>🌍 Climate Monitoring & IoT Management System</h1>
        <button className="back-home-btn">← Back to Home</button>
      </div>

      <div className="center-title">
        <h2>🔔 IoT Notification & Reporting Center</h2>
        <div className="header-controls">
          <button 
            className={`auto-refresh-btn ${autoRefresh ? 'active' : ''}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            {autoRefresh ? '🔄 Auto Refresh ON' : '⏸️ Auto Refresh OFF'}
          </button>
          <button className="manual-refresh-btn" onClick={loadData}>
            🔄 Refresh Now
          </button>
        </div>
      </div>

      <div className="notification-tabs">
        <button 
          className={`tab ${activeTab === 'alerts' ? 'active' : ''}`}
          onClick={() => setActiveTab('alerts')}
        >
          🚨 Instant Alerts ({alerts.length})
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
              <h2>� Instant Amlerts</h2>
              <button className="clear-btn" onClick={clearAlerts}>
                🗑️ Clear All
              </button>
            </div>
            
            {loading ? (
              <div className="loading">🔄 Loading alerts...</div>
            ) : alerts.length === 0 ? (
              <div className="no-alerts">
                <p>✅ No active alerts</p>
                <p>All systems are operating normally</p>
              </div>
            ) : (
              <div className="alerts-list">
                {alerts.map(alert => (
                  <div key={alert.id} className={`alert-card ${alert.type}`}>
                    <div className="alert-header">
                      <div className="alert-icon">
                        {alert.type === 'critical' ? '🚨' : alert.type === 'warning' ? '⚠️' : 'ℹ️'}
                      </div>
                      <div className="alert-info">
                        <h3>{alert.title}</h3>
                        <p>{alert.message}</p>
                        <div className="alert-meta">
                          <span className="location">📍 {alert.location}</span>
                          <span className="timestamp">{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="alert-status">
                        <span className={`status ${alert.status}`}>{alert.status}</span>
                      </div>
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
            
            {loading ? (
              <div className="loading">🔄 Loading reports...</div>
            ) : reports.length === 0 ? (
              <div className="no-reports">
                <p>📋 No reports generated yet</p>
                <p>Use "Quick Actions" tab to create comprehensive IoT reports</p>
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
                          Generated: {new Date(report.generatedAt).toLocaleDateString('en-GB')} {new Date(report.generatedAt).toLocaleTimeString('en-GB', { hour12: false })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="report-data">
                      {report.type === 'daily' && (
                        <div className="daily-report-data">
                          <div className="data-grid">
                            <div className="data-item">
                              <span className="label">Total Devices:</span>
                              <span className="value">{report.data.totalDevices}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">Active Devices:</span>
                              <span className="value working">{report.data.activeDevices}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">System Uptime:</span>
                              <span className="value uptime">{report.data.systemUptime}</span>
                            </div>
                            <div className="data-item">
                              <span className="label">Energy Efficiency:</span>
                              <span className="value energy">{report.data.energyEfficiency}</span>
                            </div>
                          </div>
                          <div className="top-issues">
                            <h4>🔍 Top Issues:</h4>
                            <ul>
                              {report.data.topIssues.map((issue, index) => (
                                <li key={index}>{issue}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                      
                      {report.type === 'building' && (
                        <div className="building-report-data">
                          <div className="buildings-grid">
                            {report.data.buildings.map((building, index) => (
                              <div key={index} className="building-item">
                                <h4>{building.name}</h4>
                                <div className="building-stats">
                                  <span>Devices: {building.devices}</span>
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
                          <div className="replacement-summary">
                            <h4>🔧 Device Replacement Summary</h4>
                            <div className="summary-grid">
                              <div className="summary-item">
                                <span className="label">Total Devices:</span>
                                <span className="value">{report.data.totalDevices || 156}</span>
                              </div>
                              <div className="summary-item">
                                <span className="label">Working Devices:</span>
                                <span className="value working">{report.data.workingDevices || 142}</span>
                              </div>
                              <div className="summary-item">
                                <span className="label">Faulty Devices:</span>
                                <span className="value faulty">{report.data.faultyDevices || 14}</span>
                              </div>
                              <div className="summary-item">
                                <span className="label">Replaced Devices:</span>
                                <span className="value replaced">{report.data.replacedDevices || 8}</span>
                              </div>
                              <div className="summary-item">
                                <span className="label">Avg Replacement Time:</span>
                                <span className="value">{report.data.averageReplacementTime || '2.5 hours'}</span>
                              </div>
                              <div className="summary-item">
                                <span className="label">Total Downtime:</span>
                                <span className="value downtime">{report.data.totalDowntime || '18.3 hours'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="replacement-timeline">
                            <h4>⏱️ Recent Replacement Timeline</h4>
                            <div className="timeline-container">
                              <div className="timeline-item completed">
                                <div className="timeline-icon">✅</div>
                                <div className="timeline-content">
                                  <h5>Temperature Sensor TS-001</h5>
                                  <p><strong>Location:</strong> Building A - Floor 3 - Room 301</p>
                                  <p><strong>Fault:</strong> Calibration drift detected - readings 5°C off baseline</p>
                                  <p><strong>Replacement Time:</strong> 2.5 hours</p>
                                  <p><strong>Technician:</strong> John Smith</p>
                                  <p><strong>Cost:</strong> $245</p>
                                  
                                  <div className="actions-taken">
                                    <h6>🔧 Actions Taken:</h6>
                                    <ul>
                                      <li>🔍 Initial fault diagnosis - confirmed sensor drift</li>
                                      <li>📋 Ordered replacement sensor model TS-2024-Pro</li>
                                      <li>🔧 Safely powered down HVAC zone</li>
                                      <li>🗑️ Removed faulty sensor and mounting bracket</li>
                                      <li>🔌 Installed new sensor with updated firmware</li>
                                      <li>⚙️ Calibrated sensor against reference standards</li>
                                      <li>✅ Tested sensor accuracy and communication</li>
                                      <li>📊 Updated system configuration and documentation</li>
                                    </ul>
                                  </div>

                                  <div className="before-after-metrics">
                                    <h6>📊 Performance Improvement:</h6>
                                    <div className="metrics-comparison">
                                      <div className="before">
                                        <strong>Before:</strong>
                                        <span>Accuracy: 60%</span>
                                        <span>Response: 15s</span>
                                        <span>Reliability: Poor</span>
                                      </div>
                                      <div className="arrow">→</div>
                                      <div className="after">
                                        <strong>After:</strong>
                                        <span>Accuracy: 99.8%</span>
                                        <span>Response: 2s</span>
                                        <span>Reliability: Excellent</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="timeline-item completed">
                                <div className="timeline-icon">✅</div>
                                <div className="timeline-content">
                                  <h5>HVAC Controller HC-205</h5>
                                  <p><strong>Location:</strong> Building B - Mechanical Room - Unit 2</p>
                                  <p><strong>Fault:</strong> Communication failure and overheating issues</p>
                                  <p><strong>Replacement Time:</strong> 4 hours</p>
                                  <p><strong>Technician:</strong> Sarah Johnson</p>
                                  <p><strong>Cost:</strong> $1,250</p>
                                  
                                  <div className="actions-taken">
                                    <h6>🔧 Actions Taken:</h6>
                                    <ul>
                                      <li>🚨 Emergency shutdown of HVAC unit due to overheating</li>
                                      <li>🔍 Diagnosed controller board failure and network issues</li>
                                      <li>📦 Expedited delivery of replacement controller</li>
                                      <li>⚡ Safely disconnected power and communication cables</li>
                                      <li>🔧 Removed old controller and cleaned mounting area</li>
                                      <li>🆕 Installed new controller with enhanced cooling</li>
                                      <li>💾 Uploaded latest firmware and configuration</li>
                                      <li>🧪 Performed comprehensive system testing</li>
                                    </ul>
                                  </div>

                                  <div className="before-after-metrics">
                                    <h6>📊 Performance Improvement:</h6>
                                    <div className="metrics-comparison">
                                      <div className="before">
                                        <strong>Before:</strong>
                                        <span>Efficiency: 65%</span>
                                        <span>Uptime: 78%</span>
                                        <span>Temp: 85°C</span>
                                      </div>
                                      <div className="arrow">→</div>
                                      <div className="after">
                                        <strong>After:</strong>
                                        <span>Efficiency: 94%</span>
                                        <span>Uptime: 99.9%</span>
                                        <span>Temp: 45°C</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="timeline-item pending">
                                <div className="timeline-icon">⏳</div>
                                <div className="timeline-content">
                                  <h5>Valve Actuator VA-089</h5>
                                  <p><strong>Location:</strong> Building A - Zone 4 - Water Supply</p>
                                  <p><strong>Fault:</strong> Mechanical binding - valve stuck at 60% open</p>
                                  <p><strong>Estimated Time:</strong> 3 hours</p>
                                  <p><strong>Scheduled:</strong> Tomorrow</p>
                                  <p><strong>Technician:</strong> Lisa Chen</p>
                                  <p><strong>Estimated Cost:</strong> $650</p>
                                  <p><strong>Status:</strong> <span className="status-badge scheduled">Scheduled</span></p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="performance-metrics">
                            <h4>📈 Performance Metrics</h4>
                            <div className="metrics-grid">
                              <div className="metric-item">
                                <span className="metric-label">Average Detection Time:</span>
                                <span className="metric-value">15 minutes</span>
                              </div>
                              <div className="metric-item">
                                <span className="metric-label">Average Response Time:</span>
                                <span className="metric-value">2.5 hours</span>
                              </div>
                              <div className="metric-item">
                                <span className="metric-label">Replacement Success Rate:</span>
                                <span className="metric-value success">100%</span>
                              </div>
                              <div className="metric-item">
                                <span className="metric-label">System Reliability Improvement:</span>
                                <span className="metric-value improvement">+23%</span>
                              </div>
                              <div className="metric-item">
                                <span className="metric-label">Energy Efficiency Gain:</span>
                                <span className="metric-value improvement">+18%</span>
                              </div>
                              <div className="metric-item">
                                <span className="metric-label">Maintenance Cost Reduction:</span>
                                <span className="metric-value savings">-15%</span>
                              </div>
                            </div>
                          </div>
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
                <h3>📋 Comprehensive Reports</h3>
                <button className="action-btn primary" onClick={generateComprehensiveReport}>
                  📋 Generate Comprehensive Report
                </button>
                <p>Complete analysis of all IoT devices, replacements, and maintenance actions with detailed breakdown</p>
              </div>
              
              <div className="action-category">
                <h3>📈 Daily Reports</h3>
                <button className="action-btn secondary" onClick={generateDailyReport}>
                  📈 Generate Daily IoT Report
                </button>
                <p>Daily system health summary with device status and today's maintenance activities</p>
              </div>
              
              <div className="action-category">
                <h3>🏢 Building Reports</h3>
                <button className="action-btn secondary" onClick={generateBuildingReport}>
                  🏢 Generate Building Report
                </button>
                <p>Building-level device management and consolidation analysis with cost savings</p>
              </div>
              
              <div className="action-category">
                <h3>🔄 System Management</h3>
                <button className="action-btn secondary" onClick={loadData}>
                  🔄 Refresh All Data
                </button>
                <button className="action-btn warning" onClick={clearReports}>
                  🗑️ Clear All Reports
                </button>
                <p>Manage stored reports and refresh system data</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IoTReportsNotificationDashboard;