import React, { useState, useEffect } from 'react';
import './IoTDashboard.css';
import NotificationCenter from './NotificationCenter';

const IoTDashboard = () => {
  const [iotData, setIotData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchIoTData();
    // Set up auto-refresh every 30 seconds
    const interval = setInterval(fetchIoTData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchIoTData = async () => {
    try {
      const { iotAPI } = await import('../services/api.js');
      const result = await iotAPI.getDashboard();
      setIotData(result.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch IoT data');
    } finally {
      setLoading(false);
    }
  };

  const initializeDevices = async () => {
    try {
      setLoading(true);
      const { iotAPI } = await import('../services/api.js');
      await iotAPI.initializeDevices();
      await fetchIoTData();
    } catch (err) {
      setError(err.message || 'Failed to initialize devices');
    } finally {
      setLoading(false);
    }
  };

  const performHealthCheck = async () => {
    try {
      const { iotAPI } = await import('../services/api.js');
      await iotAPI.performHealthCheck();
      await fetchIoTData();
    } catch (err) {
      setError(err.message || 'Failed to perform health check');
    }
  };

  const optimizePower = async () => {
    try {
      const { iotAPI } = await import('../services/api.js');
      const result = await iotAPI.optimizePower();
      
      // Show detailed optimization results
      const optimizationData = result.data;
      const message = `
🎯 IoT Power Optimization Complete!

⚡ Power Reduction: ${optimizationData.power_consumption.savings_kw} kW (${optimizationData.power_consumption.savings_percentage})
📊 Annual Savings: ${optimizationData.annual_impact.energy_savings_kwh.toLocaleString()} kWh
🌱 CO₂ Reduction: ${optimizationData.annual_impact.co2_reduction_tons} tons/year
🌳 Environmental Impact: Equivalent to planting ${optimizationData.annual_impact.equivalent_trees_planted} trees

Applied ${optimizationData.total_optimizations} IoT optimizations across:
• HVAC Systems (30% reduction)
• Lighting Systems (45% reduction) 
• IT Equipment (35% reduction)
• Office Equipment (40% reduction)
• Environmental Control (25% reduction)

IoT Benefits:
✅ Real-time monitoring and automated control
✅ Predictive maintenance reducing downtime by 30-40%
✅ Weather-responsive system optimization
✅ Occupancy-based power management
✅ AI-powered usage pattern learning
      `;
      
      alert(message);
      await fetchIoTData();
    } catch (err) {
      setError(err.message || 'Failed to optimize power');
    }
  };

  // Navigation functions for reports
  const openReportsPage = () => {
    // Navigate to reports dashboard in same window
    window.location.hash = '#iot-reports';
    window.location.reload();
  };

  const viewIoTToolsReport = () => {
    window.location.hash = '#iot-reports?tab=iot-tools';
    window.location.reload();
  };

  const viewNotificationsReport = () => {
    window.location.hash = '#iot-reports?tab=notifications';
    window.location.reload();
  };

  const viewBuildingReport = () => {
    window.location.hash = '#iot-reports?tab=building-consolidation';
    window.location.reload();
  };

  const viewComprehensiveReport = () => {
    window.location.hash = '#iot-reports?tab=comprehensive';
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="iot-dashboard loading">
        <div className="loading-spinner">🏢</div>
        <h2>Loading Smart Building Data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="iot-dashboard error">
        <div className="error-message">
          <h2>⚠️ Error Loading IoT Data</h2>
          <p>{error}</p>
          <button onClick={fetchIoTData} className="retry-btn">Retry</button>
          <button onClick={initializeDevices} className="init-btn">Initialize Devices</button>
        </div>
      </div>
    );
  }

  if (!iotData) {
    return (
      <div className="iot-dashboard no-data">
        <div className="no-data-message">
          <h2>🏢 Smart Building IoT Management</h2>
          <p>No IoT data available. Loading realistic power analysis...</p>
          <button onClick={fetchIoTData} className="init-btn">Load Power Analysis</button>
        </div>
      </div>
    );
  }

  const { 
    building_info, 
    power_analysis, 
    environmental_impact, 
    category_breakdown, 
    device_breakdown,
    iot_benefits,
    implementation_timeline
  } = iotData;

  return (
    <div className="iot-dashboard">
      <div className="dashboard-header">
        <div className="building-info">
          <h1>🏢 Sage IT - Smart Building Analysis</h1>
          <p>📍 {building_info.location} • {building_info.floors} Floors • {building_info.zones.length} Zones</p>
          <div className="building-subtitle">
            <p>🤖 IoT Management & Analytics Dashboard</p>
          </div>
          <div className="climate-status">
            ⚡ Realistic IoT Power Analysis • {building_info.total_area_sqm}m² • {building_info.occupancy} employees
          </div>
        </div>
        <div className="dashboard-actions">
          <button onClick={performHealthCheck} className="action-btn health">
            🔍 Health Check
          </button>
          <button onClick={optimizePower} className="action-btn optimize">
            ⚡ Optimize Power
          </button>
          <button onClick={fetchIoTData} className="action-btn refresh">
            🔄 Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab ${activeTab === 'devices' ? 'active' : ''}`}
          onClick={() => setActiveTab('devices')}
        >
          🔌 Devices
        </button>
        <button 
          className={`tab ${activeTab === 'power' ? 'active' : ''}`}
          onClick={() => setActiveTab('power')}
        >
          ⚡ Power
        </button>
        <button 
          className={`tab ${activeTab === 'climate' ? 'active' : ''}`}
          onClick={() => setActiveTab('climate')}
        >
          🌡️ Climate Impact
        </button>
        <button 
          className={`tab ${activeTab === 'benefits' ? 'active' : ''}`}
          onClick={() => setActiveTab('benefits')}
        >
          🤖 IoT Benefits
        </button>
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          📧 Email Notifications
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="stats-grid">
              <div className="stat-card power">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <h3>{power_analysis.normal_power_consumption_watts.toLocaleString()}W</h3>
                  <p>Normal Power Consumption</p>
                  <small>Without IoT optimization</small>
                </div>
              </div>

              <div className="stat-card iot-power">
                <div className="stat-icon">🤖</div>
                <div className="stat-info">
                  <h3>{power_analysis.iot_optimized_power_watts.toLocaleString()}W</h3>
                  <p>IoT Optimized Power</p>
                  <small>{power_analysis.overall_savings_percentage}% savings</small>
                </div>
              </div>

              <div className="stat-card devices">
                <div className="stat-icon">🔌</div>
                <div className="stat-info">
                  <h3>{power_analysis.total_devices}</h3>
                  <p>Total IoT Devices</p>
                  <small>Across {building_info.zones.length} zones</small>
                </div>
              </div>

              <div className="stat-card carbon">
                <div className="stat-icon">🌱</div>
                <div className="stat-info">
                  <h3>{environmental_impact.annual_co2_reduction_tons}t</h3>
                  <p>CO₂ Reduction/Year</p>
                  <small>≈ {environmental_impact.equivalent_trees_planted} trees planted</small>
                </div>
              </div>
            </div>

            <div className="power-savings-card">
              <h3>⚡ Power Savings Analysis</h3>
              <div className="savings-info">
                <div className="savings-item">
                  <span className="label">Power Saved:</span>
                  <span className="value">{power_analysis.power_savings_watts.toLocaleString()}W</span>
                </div>
                <div className="savings-item">
                  <span className="label">Annual Energy Savings:</span>
                  <span className="value">{power_analysis.annual_energy_savings_kwh.toLocaleString()} kWh</span>
                </div>
                <div className="savings-item">
                  <span className="label">Overall Efficiency:</span>
                  <span className="value">{power_analysis.overall_savings_percentage}% improvement</span>
                </div>
                <div className="savings-item">
                  <span className="label">Environmental Impact:</span>
                  <span className="value">✅ {environmental_impact.equivalent_cars_off_road} cars off road equivalent</span>
                </div>
              </div>
            </div>

            <div className="iot-benefits-card">
              <h3>🤖 IoT Implementation Benefits</h3>
              <div className="benefits-list">
                <div className="benefit-item">
                  <span className="benefit-icon">⚡</span>
                  <span className="benefit-text">{iot_benefits.energy_efficiency}</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🔧</span>
                  <span className="benefit-text">{iot_benefits.predictive_maintenance}</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">👥</span>
                  <span className="benefit-text">{iot_benefits.occupancy_optimization}</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">📊</span>
                  <span className="benefit-text">{iot_benefits.data_analytics}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'devices' && (
          <div className="devices-section">
            <div className="category-grid">
              {Object.entries(category_breakdown).map(([categoryName, categoryData]) => (
                <div key={categoryName} className="category-card">
                  <h4>🔌 {categoryName.replace('_', ' ')}</h4>
                  <div className="category-stats">
                    <div className="category-stat">
                      <span className="label">Devices:</span>
                      <span className="value">{categoryData.total_devices}</span>
                    </div>
                    <div className="category-stat">
                      <span className="label">Normal Power:</span>
                      <span className="value">{categoryData.total_normal_power.toLocaleString()}W</span>
                    </div>
                    <div className="category-stat">
                      <span className="label">IoT Optimized:</span>
                      <span className="value">{categoryData.total_iot_power.toLocaleString()}W</span>
                    </div>
                    <div className="category-stat">
                      <span className="label">Savings:</span>
                      <span className="value">{categoryData.savings_percentage}%</span>
                    </div>
                  </div>
                  
                  <div className="category-devices">
                    {categoryData.devices.slice(0, 3).map((device, index) => (
                      <div key={index} className="device-item">
                        <div className="device-icon">
                          {getDeviceIcon(device.device_type)}
                        </div>
                        <div className="device-info">
                          <div className="device-name">{device.device_type}</div>
                          <div className="device-power">{device.normal_power_watts}W → {device.iot_optimized_watts}W</div>
                          <div className="device-savings">{device.savings_percentage}% savings</div>
                        </div>
                      </div>
                    ))}
                    {categoryData.devices.length > 3 && (
                      <div className="more-devices">+{categoryData.devices.length - 3} more devices</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'power' && (
          <div className="power-section">
            <div className="power-comparison">
              <h3>⚡ Power Consumption Comparison</h3>
              <div className="comparison-chart">
                <div className="power-bar-container">
                  <div className="power-bar normal">
                    <div className="bar-label">Normal Power</div>
                    <div className="bar-fill" style={{ width: '100%' }}>
                      {power_analysis.normal_power_consumption_watts.toLocaleString()}W
                    </div>
                  </div>
                  <div className="power-bar iot">
                    <div className="bar-label">IoT Optimized</div>
                    <div className="bar-fill" style={{ 
                      width: `${(power_analysis.iot_optimized_power_watts / power_analysis.normal_power_consumption_watts) * 100}%` 
                    }}>
                      {power_analysis.iot_optimized_power_watts.toLocaleString()}W
                    </div>
                  </div>
                </div>
                <div className="savings-highlight">
                  <div className="savings-amount">{power_analysis.power_savings_watts.toLocaleString()}W Saved</div>
                  <div className="savings-percentage">{power_analysis.overall_savings_percentage}% Reduction</div>
                </div>
              </div>
            </div>

            <div className="device-breakdown">
              <h4>🔌 Device Category Breakdown</h4>
              <div className="breakdown-grid">
                {Object.entries(category_breakdown).map(([categoryName, categoryData]) => (
                  <div key={categoryName} className="breakdown-item">
                    <div className="breakdown-header">
                      <span className="category-name">{categoryName.replace('_', ' ')}</span>
                      <span className="category-savings">{categoryData.savings_percentage}% savings</span>
                    </div>
                    <div className="breakdown-bars">
                      <div className="breakdown-bar normal">
                        <span className="bar-label">Normal:</span>
                        <div className="bar-fill">{categoryData.total_normal_power.toLocaleString()}W</div>
                      </div>
                      <div className="breakdown-bar iot">
                        <span className="bar-label">IoT:</span>
                        <div className="bar-fill">{categoryData.total_iot_power.toLocaleString()}W</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="annual-impact">
              <h4>📊 Annual Impact Analysis</h4>
              <div className="impact-grid">
                <div className="impact-item">
                  <span className="impact-label">Energy Savings:</span>
                  <span className="impact-value">{power_analysis.annual_energy_savings_kwh.toLocaleString()} kWh/year</span>
                </div>
                <div className="impact-item">
                  <span className="impact-label">CO₂ Reduction:</span>
                  <span className="impact-value">{environmental_impact.annual_co2_reduction_kg.toLocaleString()} kg/year</span>
                </div>
                <div className="impact-item">
                  <span className="impact-label">Equivalent Trees:</span>
                  <span className="impact-value">{environmental_impact.equivalent_trees_planted} trees planted</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'climate' && (
          <div className="climate-section">
            <div className="environmental-impact-overview">
              <h3>🌱 Environmental Impact Analysis</h3>
              <div className="impact-stats">
                <div className="impact-stat">
                  <div className="stat-icon">🌱</div>
                  <div className="stat-info">
                    <div className="stat-label">Annual CO₂ Reduction</div>
                    <div className="stat-value">{environmental_impact.annual_co2_reduction_tons} tons</div>
                  </div>
                </div>
                <div className="impact-stat">
                  <div className="stat-icon">🌳</div>
                  <div className="stat-info">
                    <div className="stat-label">Equivalent Trees Planted</div>
                    <div className="stat-value">{environmental_impact.equivalent_trees_planted} trees</div>
                  </div>
                </div>
                <div className="impact-stat">
                  <div className="stat-icon">🚗</div>
                  <div className="stat-info">
                    <div className="stat-label">Cars Off Road Equivalent</div>
                    <div className="stat-value">{environmental_impact.equivalent_cars_off_road} cars</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="implementation-timeline">
              <h4>🚀 Implementation Timeline</h4>
              <div className="timeline-phases">
                <div className="phase-item">
                  <div className="phase-number">1</div>
                  <div className="phase-info">
                    <div className="phase-name">{implementation_timeline.phase_1}</div>
                    <div className="phase-duration">2-3 months</div>
                  </div>
                </div>
                <div className="phase-item">
                  <div className="phase-number">2</div>
                  <div className="phase-info">
                    <div className="phase-name">{implementation_timeline.phase_2}</div>
                    <div className="phase-duration">3-4 months</div>
                  </div>
                </div>
                <div className="phase-item">
                  <div className="phase-number">3</div>
                  <div className="phase-info">
                    <div className="phase-name">{implementation_timeline.phase_3}</div>
                    <div className="phase-duration">2-3 months</div>
                  </div>
                </div>
                <div className="phase-item">
                  <div className="phase-number">4</div>
                  <div className="phase-info">
                    <div className="phase-name">{implementation_timeline.phase_4}</div>
                    <div className="phase-duration">1-2 months</div>
                  </div>
                </div>
              </div>
              <div className="total-timeline">
                <strong>Total Implementation: {implementation_timeline.total_timeline}</strong>
              </div>
            </div>

            <div className="iot-benefits-detailed">
              <h4>🤖 Detailed IoT Benefits</h4>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <div className="benefit-info">
                    <div className="benefit-label">Energy Efficiency</div>
                    <div className="benefit-value">{iot_benefits.energy_efficiency}</div>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🔧</div>
                  <div className="benefit-info">
                    <div className="benefit-label">Predictive Maintenance</div>
                    <div className="benefit-value">{iot_benefits.predictive_maintenance}</div>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">👥</div>
                  <div className="benefit-info">
                    <div className="benefit-label">Occupancy Optimization</div>
                    <div className="benefit-value">{iot_benefits.occupancy_optimization}</div>
                  </div>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📊</div>
                  <div className="benefit-info">
                    <div className="benefit-label">Real-time Monitoring</div>
                    <div className="benefit-value">{iot_benefits.real_time_monitoring}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="benefits-section">
            <div className="iot-benefits-overview">
              <h3>🤖 How IoT Implementation Helps Power Consumption</h3>
              <div className="benefits-explanation">
                <div className="benefit-category">
                  <h4>⚡ Smart Power Management</h4>
                  <div className="benefit-details">
                    <div className="benefit-point">
                      <span className="benefit-icon">🎯</span>
                      <div className="benefit-content">
                        <strong>Occupancy Detection:</strong> Motion sensors and smart badges track real-time occupancy, ensuring systems only operate when and where needed. This prevents heating, cooling, and lighting empty spaces.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">🌤️</span>
                      <div className="benefit-content">
                        <strong>Weather Integration:</strong> Outdoor weather sensors automatically adjust indoor climate control, reducing unnecessary heating/cooling when outdoor conditions are favorable.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">🧠</span>
                      <div className="benefit-content">
                        <strong>AI Pattern Learning:</strong> Machine learning algorithms analyze daily/weekly usage patterns and pre-adjust systems for optimal efficiency, learning from occupant behavior.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="benefit-category">
                  <h4>🔧 Automated Optimization</h4>
                  <div className="benefit-details">
                    <div className="benefit-point">
                      <span className="benefit-icon">⚖️</span>
                      <div className="benefit-content">
                        <strong>Load Balancing:</strong> Smart distribution of electrical loads prevents peak demand charges and optimizes grid usage by spreading high-power operations throughout the day.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">🤝</span>
                      <div className="benefit-content">
                        <strong>Equipment Coordination:</strong> Devices communicate to avoid simultaneous high-power operations, coordinating schedules to minimize total power consumption.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">🔍</span>
                      <div className="benefit-content">
                        <strong>Fault Detection:</strong> Immediate detection of inefficient operation (stuck dampers, dirty filters, etc.) prevents energy waste and maintains optimal performance.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="benefit-category">
                  <h4>📊 Data-Driven Insights</h4>
                  <div className="benefit-details">
                    <div className="benefit-point">
                      <span className="benefit-icon">📈</span>
                      <div className="benefit-content">
                        <strong>Real-time Monitoring:</strong> Continuous monitoring of all building systems with instant alerts for anomalies or inefficiencies, enabling immediate corrective action.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">🔮</span>
                      <div className="benefit-content">
                        <strong>Predictive Maintenance:</strong> AI-powered analysis predicts equipment failures before they occur, reducing downtime by 30-40% and preventing energy waste from malfunctioning equipment.
                      </div>
                    </div>
                    <div className="benefit-point">
                      <span className="benefit-icon">📱</span>
                      <div className="benefit-content">
                        <strong>Remote Control:</strong> Complete building management from mobile devices, allowing quick adjustments and monitoring from anywhere, ensuring optimal settings at all times.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="power-savings-breakdown">
              <h4>💡 Power Savings by Category</h4>
              <div className="savings-categories">
                <div className="savings-category">
                  <div className="category-header">
                    <span className="category-icon">❄️</span>
                    <span className="category-name">HVAC Systems</span>
                    <span className="category-savings">30% Savings</span>
                  </div>
                  <div className="category-explanation">
                    IoT sensors detect occupancy and adjust temperature automatically. Smart thermostats learn usage patterns and optimize schedules, preventing heating/cooling of empty rooms.
                  </div>
                </div>

                <div className="savings-category">
                  <div className="category-header">
                    <span className="category-icon">💡</span>
                    <span className="category-name">Lighting Systems</span>
                    <span className="category-savings">45% Savings</span>
                  </div>
                  <div className="category-explanation">
                    Daylight sensors automatically dim lights when natural light is sufficient. Motion sensors turn lights on/off based on presence, eliminating waste in unoccupied areas.
                  </div>
                </div>

                <div className="savings-category">
                  <div className="category-header">
                    <span className="category-icon">💻</span>
                    <span className="category-name">IT Equipment</span>
                    <span className="category-savings">35% Savings</span>
                  </div>
                  <div className="category-explanation">
                    Servers automatically scale power based on workload. Workstations enter sleep mode when idle. Network equipment optimizes port usage to match actual computing needs.
                  </div>
                </div>

                <div className="savings-category">
                  <div className="category-header">
                    <span className="category-icon">🖨️</span>
                    <span className="category-name">Office Equipment</span>
                    <span className="category-savings">40% Savings</span>
                  </div>
                  <div className="category-explanation">
                    Printers, displays, and appliances automatically enter low-power mode when not in use. Smart scheduling based on usage patterns eliminates standby power waste.
                  </div>
                </div>
              </div>
            </div>

            <div className="implementation-benefits">
              <h4>🚀 Implementation Benefits</h4>
              <div className="implementation-grid">
                <div className="implementation-item">
                  <div className="impl-icon">⚡</div>
                  <div className="impl-content">
                    <div className="impl-title">Energy Efficiency</div>
                    <div className="impl-description">25-50% power reduction per device category through intelligent automation and optimization</div>
                  </div>
                </div>
                <div className="implementation-item">
                  <div className="impl-icon">🔧</div>
                  <div className="impl-content">
                    <div className="impl-title">Predictive Maintenance</div>
                    <div className="impl-description">Reduce equipment downtime by 30-40% with AI-powered failure prediction and proactive maintenance</div>
                  </div>
                </div>
                <div className="implementation-item">
                  <div className="impl-icon">👥</div>
                  <div className="impl-content">
                    <div className="impl-title">Occupancy Optimization</div>
                    <div className="impl-description">Adjust systems based on actual usage patterns and real-time occupancy detection</div>
                  </div>
                </div>
                <div className="implementation-item">
                  <div className="impl-icon">📊</div>
                  <div className="impl-content">
                    <div className="impl-title">Data Analytics</div>
                    <div className="impl-description">Usage patterns and optimization insights enable continuous improvement and targeted efficiency gains</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="notifications-section">
            <div className="notifications-header">
              <h3>🔔 IoT Notifications & Alerts</h3>
              <p>View and manage all IoT notifications, alerts, and system messages</p>
            </div>
            
            <div className="notification-center-container">
              <NotificationCenter embedded={true} />
            </div>

            <div className="three-reports-section">
              <h3>📊 IoT Reports Dashboard</h3>
              <p>View comprehensive IoT reports with interactive charts and diagrams</p>
              
              <div className="reports-grid">
                <div className="report-card iot-tools-report">
                  <div className="report-header">
                    <div className="report-icon">🔧</div>
                    <div className="report-title">
                      <h4>IoT Tools Report</h4>
                      <p>Device management and analytics</p>
                    </div>
                  </div>
                  <div className="report-content">
                    <div className="report-stats">
                      <div className="stat-item">
                        <span className="stat-label">Total Devices:</span>
                        <span className="stat-value">45 devices</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Active Monitoring:</span>
                        <span className="stat-value">Real-time</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Power Optimization:</span>
                        <span className="stat-value">35% savings</span>
                      </div>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="report-btn primary"
                        onClick={() => viewIoTToolsReport()}
                      >
                        📈 View IoT Tools Report
                      </button>
                      <button 
                        className="report-btn secondary"
                        onClick={() => alert('This report shows real-time status of all IoT devices, power optimization results, and device replacement recommendations with cost estimates.')}
                      >
                        ℹ️ Report Info
                      </button>
                    </div>
                  </div>
                </div>

                <div className="report-card notifications-report">
                  <div className="report-header">
                    <div className="report-icon">🔔</div>
                    <div className="report-title">
                      <h4>Notifications Report</h4>
                      <p>Alert management and history</p>
                    </div>
                  </div>
                  <div className="report-content">
                    <div className="report-stats">
                      <div className="stat-item">
                        <span className="stat-label">Active Alerts:</span>
                        <span className="stat-value">12 notifications</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Critical Alerts:</span>
                        <span className="stat-value">2 urgent</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">System Status:</span>
                        <span className="stat-value">Healthy</span>
                      </div>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="report-btn primary"
                        onClick={() => viewNotificationsReport()}
                      >
                        🔔 View Notifications Report
                      </button>
                      <button 
                        className="report-btn secondary"
                        onClick={() => alert('This report shows all system notifications, device replacement alerts, and notification history with interactive charts.')}
                      >
                        ℹ️ Report Info
                      </button>
                    </div>
                  </div>
                </div>

                <div className="report-card building-report">
                  <div className="report-header">
                    <div className="report-icon">🏢</div>
                    <div className="report-title">
                      <h4>Building Consolidation Report</h4>
                      <p>Comprehensive building analysis</p>
                    </div>
                  </div>
                  <div className="report-content">
                    <div className="report-stats">
                      <div className="stat-item">
                        <span className="stat-label">Buildings Monitored:</span>
                        <span className="stat-value">All Buildings</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Energy Efficiency:</span>
                        <span className="stat-value">85% optimal</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Cost Savings:</span>
                        <span className="stat-value">$2,450/month</span>
                      </div>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="report-btn primary"
                        onClick={() => viewBuildingReport()}
                      >
                        🏢 View Building Report
                      </button>
                      <button 
                        className="report-btn secondary"
                        onClick={() => alert('Building Consolidation Report: Detailed analysis of all building systems, energy consumption, device performance, and consolidation opportunities with visual charts.')}
                      >
                        👁️ View Details
                      </button>
                    </div>
                  </div>
                </div>

                <div className="report-card comprehensive-report">
                  <div className="report-header">
                    <div className="report-icon">📋</div>
                    <div className="report-title">
                      <h4>Comprehensive Report</h4>
                      <p>Complete system overview</p>
                    </div>
                  </div>
                  <div className="report-content">
                    <div className="report-stats">
                      <div className="stat-item">
                        <span className="stat-label">System Health:</span>
                        <span className="stat-value">Excellent</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Overall Efficiency:</span>
                        <span className="stat-value">87%</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-label">Total Savings:</span>
                        <span className="stat-value">$3,200/month</span>
                      </div>
                    </div>
                    <div className="report-actions">
                      <button 
                        className="report-btn primary"
                        onClick={() => viewComprehensiveReport()}
                      >
                        📋 View Comprehensive Report
                      </button>
                      <button 
                        className="report-btn secondary"
                        onClick={() => alert('Comprehensive Report: Complete system analysis with performance metrics, integration status, and detailed analytics with interactive visualizations.')}
                      >
                        ℹ️ Report Info
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="reports-summary">
                <h4>📋 Reports Dashboard Features</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-icon">📊</span>
                    <div className="summary-content">
                      <div className="summary-title">Interactive Charts</div>
                      <div className="summary-description">Bar charts, pie charts, and visual analytics</div>
                    </div>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">🔄</span>
                    <div className="summary-content">
                      <div className="summary-title">Real-time Updates</div>
                      <div className="summary-description">Auto-refresh every 30 seconds</div>
                    </div>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">📱</span>
                    <div className="summary-content">
                      <div className="summary-title">Responsive Design</div>
                      <div className="summary-description">Works on desktop, tablet, and mobile</div>
                    </div>
                  </div>
                  <div className="summary-item">
                    <span className="summary-icon">🎯</span>
                    <div className="summary-content">
                      <div className="summary-title">Detailed Analytics</div>
                      <div className="summary-description">Comprehensive metrics and insights</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="main-reports-button">
                <button 
                  className="open-reports-dashboard-btn"
                  onClick={() => openReportsPage()}
                >
                  🚀 Open Full Reports Dashboard
                </button>
                <p>Access all reports with interactive charts, diagrams, and detailed analytics</p>
              </div>
            </div>
            
            <div className="reports-system-overview">
              <h3>📊 Reports System</h3>
              <p>Interactive dashboard with visual charts and real-time data</p>
              
              <div className="system-status">
                <h4>📊 System Status</h4>
                <div className="status-info">
                  <div className="status-item">
                    <span className="status-icon">✅</span>
                    <span>Reports System: Active</span>
                  </div>
                  <div className="status-item">
                    <span className="status-icon">📊</span>
                    <span>Charts & Diagrams: Enabled</span>
                  </div>
                  <div className="status-item">
                    <span className="status-icon">🔄</span>
                    <span>Auto Refresh: Every 30 seconds</span>
                  </div>
                  <div className="status-item">
                    <span className="status-icon">📱</span>
                    <span>Mobile Responsive: Yes</span>
                  </div>
                </div>
              </div>

              <div className="reports-log">
                <h4>📝 Recent Report Activity</h4>
                <div className="log-entries">
                  <div className="log-entry">
                    <span className="log-time">Just now</span>
                    <span className="log-message">Reports dashboard ready with interactive charts</span>
                    <span className="log-status success">✅</span>
                  </div>
                  <div className="log-entry">
                    <span className="log-time">5 min ago</span>
                    <span className="log-message">IoT Tools report updated with latest device data</span>
                    <span className="log-status success">✅</span>
                  </div>
                  <div className="log-entry">
                    <span className="log-time">10 min ago</span>
                    <span className="log-message">Building consolidation metrics refreshed</span>
                    <span className="log-status success">✅</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const getDeviceIcon = (deviceType) => {
  const iconMap = {
    // HVAC Systems
    'Central AC Unit (5 Ton)': '❄️',
    'Split AC Unit (2 Ton)': '❄️',
    'Ceiling Fan (Industrial)': '🌀',
    
    // Lighting Systems
    'LED Panel Light (40W)': '💡',
    'Smart LED Bulb (12W)': '💡',
    'Emergency Light (20W)': '🚨',
    
    // IT Equipment
    'Server Rack (Dell PowerEdge)': '🖥️',
    'Network Switch (48-port)': '📶',
    'Workstation PC': '💻',
    
    // Office Equipment
    'Laser Printer (Commercial)': '🖨️',
    'Smart TV Display (55 inch)': '📺',
    
    // Kitchen Appliances
    'Commercial Refrigerator': '🧊',
    'Coffee Machine (Commercial)': '☕',
    
    // Legacy device types
    'AC': '❄️',
    'TV': '📺',
    'Temperature Sensor': '🌡️',
    'Heater': '🔥',
    'Refrigerator': '🧊',
    'Oven': '🔥',
    'Fan': '🌀',
    'Door Sensor': '🚪',
    'Water Heater': '🚿',
    'LED Light': '💡',
    'Security Camera': '📹',
    'WiFi Router': '📶',
    'Server': '🖥️',
    'Printer': '🖨️',
    'Coffee Machine': '☕',
    'Microwave': '📱',
    'Dishwasher': '🍽️',
    'Smoke Detector': '🚨',
    'Motion Sensor': '👁️',
    'Smart Thermostat': '🌡️'
  };
  return iconMap[deviceType] || '🔌';
};

export default IoTDashboard;