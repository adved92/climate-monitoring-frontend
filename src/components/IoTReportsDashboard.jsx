import React, { useState, useEffect } from 'react';
import './IoTReportsDashboard.css';

const IoTReportsDashboard = () => {
  // Check URL parameters for initial tab
  const getInitialTab = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1] || '');
    return params.get('tab') || 'iot-tools';
  };

  const [activeReport, setActiveReport] = useState(getInitialTab());
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Auto-refresh every 30 seconds
  useEffect(() => {
    generateReport(activeReport);
    const interval = setInterval(() => {
      generateReport(activeReport);
    }, 30000);
    return () => clearInterval(interval);
  }, [activeReport]);

  const generateReport = async (reportType) => {
    setLoading(true);
    try {
      let data;
      switch (reportType) {
        case 'iot-tools':
          data = await generateIoTToolsReport();
          break;
        case 'notifications':
          data = await generateNotificationsReport();
          break;
        case 'building-consolidation':
          data = await generateBuildingConsolidationReport();
          break;
        case 'comprehensive':
          data = await generateComprehensiveReport();
          break;
        default:
          data = await generateIoTToolsReport();
      }
      setReportData(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateIoTToolsReport = async () => {
    // Simulate IoT Tools Report data
    return {
      title: "IoT Tools Report",
      summary: {
        totalDevices: 45,
        activeDevices: 43,
        offlineDevices: 2,
        powerOptimization: "35%",
        lastHealthCheck: new Date().toLocaleString()
      },
      deviceStatus: [
        { category: "HVAC Systems", total: 12, active: 11, offline: 1, powerSavings: "30%" },
        { category: "Lighting Systems", total: 15, active: 15, offline: 0, powerSavings: "45%" },
        { category: "IT Equipment", total: 10, active: 9, offline: 1, powerSavings: "35%" },
        { category: "Office Equipment", total: 8, active: 8, offline: 0, powerSavings: "40%" }
      ],
      replacementAlerts: [
        { device: "HVAC_CTRL_001", priority: "CRITICAL", issue: "Communication failure", cost: "$850", timeline: "Replace immediately" },
        { device: "TEMP_SENSOR_001", priority: "HIGH", issue: "Battery critically low", cost: "$70", timeline: "Replace in 12h" },
        { device: "PWR_MON_003", priority: "MEDIUM", issue: "Performance degraded", cost: "$120", timeline: "Replace in 5 days" },
        { device: "LIGHT_CTRL_005", priority: "LOW", issue: "End of life approaching", cost: "$180", timeline: "Plan replacement in 90 days" },
        { device: "ACCESS_CTRL_001", priority: "CRITICAL", issue: "Firmware corrupted", cost: "$450", timeline: "Replace now" }
      ],
      powerAnalysis: {
        normalConsumption: 125000,
        optimizedConsumption: 81250,
        savings: 43750,
        savingsPercentage: 35
      }
    };
  };

  const generateNotificationsReport = async () => {
    return {
      title: "Notifications Report",
      summary: {
        totalNotifications: 12,
        criticalAlerts: 2,
        warningAlerts: 5,
        infoAlerts: 5,
        deliveryRate: "100%"
      },
      alertsByType: [
        { type: "Device Offline", count: 2, severity: "Critical" },
        { type: "Battery Low", count: 1, severity: "High" },
        { type: "Predictive Maintenance", count: 1, severity: "Medium" },
        { type: "End of Life", count: 1, severity: "Low" },
        { type: "System Status", count: 7, severity: "Info" }
      ],
      recentAlerts: [
        { time: "2 min ago", message: "HVAC Controller communication failure", severity: "Critical" },
        { time: "15 min ago", message: "Temperature sensor battery low", severity: "High" },
        { time: "1 hour ago", message: "Power monitor performance degraded", severity: "Medium" },
        { time: "2 hours ago", message: "Daily health check completed", severity: "Info" }
      ],
      notificationFrequency: {
        realTime: "Immediate device failures",
        healthChecks: "Every 30 minutes",
        dailySummary: "Available in UI",
        weeklyReport: "Every Monday 9 AM"
      }
    };
  };

  const generateBuildingConsolidationReport = async () => {
    return {
      title: "Building Consolidation Report",
      summary: {
        buildingsMonitored: "All Buildings",
        energyEfficiency: "85%",
        costSavings: "$2,450/month",
        carbonReduction: "15.2 tons CO₂/year"
      },
      buildingMetrics: [
        { building: "Main Office", efficiency: "88%", savings: "$980/month", devices: 25 },
        { building: "Server Room", efficiency: "92%", savings: "$650/month", devices: 8 },
        { building: "Conference Center", efficiency: "78%", savings: "$520/month", devices: 7 },
        { building: "Cafeteria", efficiency: "82%", savings: "$300/month", devices: 5 }
      ],
      consolidationOpportunities: [
        { opportunity: "HVAC System Integration", potential: "$400/month", timeline: "3 months" },
        { opportunity: "Lighting Automation", potential: "$250/month", timeline: "2 months" },
        { opportunity: "Equipment Scheduling", potential: "$180/month", timeline: "1 month" }
      ],
      environmentalImpact: {
        energySaved: "28,500 kWh/year",
        co2Reduced: "15.2 tons/year",
        treesEquivalent: 692,
        carsOffRoad: 3.3
      }
    };
  };

  const generateComprehensiveReport = async () => {
    return {
      title: "Comprehensive System Report",
      summary: {
        systemHealth: "Excellent",
        overallEfficiency: "87%",
        totalSavings: "$3,200/month",
        uptime: "99.8%"
      },
      systemOverview: {
        totalDevices: 45,
        activeMonitoring: "Real-time",
        dataPoints: "1.2M/day",
        alertsProcessed: 156
      },
      performanceMetrics: [
        { metric: "Power Optimization", value: "35%", trend: "↗ +5%" },
        { metric: "Device Uptime", value: "99.8%", trend: "↗ +0.3%" },
        { metric: "Response Time", value: "1.2s", trend: "↘ -0.4s" },
        { metric: "Cost Efficiency", value: "87%", trend: "↗ +8%" }
      ],
      integrationStatus: {
        weatherAPI: "Connected",
        powerGrid: "Integrated",
        buildingManagement: "Synchronized",
        mobileApp: "Active"
      }
    };
  };

  const renderChart = (data, type) => {
    if (type === 'bar') {
      const maxValue = Math.max(...data.map(d => d.value));
      return (
        <div className="chart-container">
          {data.map((item, index) => (
            <div key={index} className="chart-bar-item">
              <div className="chart-label">{item.label}</div>
              <div className="chart-bar">
                <div 
                  className="chart-bar-fill" 
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  {item.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (type === 'pie') {
      const total = data.reduce((sum, item) => sum + item.value, 0);
      let currentAngle = 0;
      
      return (
        <div className="pie-chart-container">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const x1 = 100 + 80 * Math.cos((currentAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((currentAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((currentAngle + angle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((currentAngle + angle - 90) * Math.PI / 180);
              const largeArc = angle > 180 ? 1 : 0;
              
              const pathData = `M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`;
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={`hsl(${index * 60}, 70%, 60%)`}
                  stroke="#fff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          <div className="pie-chart-legend">
            {data.map((item, index) => (
              <div key={index} className="legend-item">
                <div 
                  className="legend-color" 
                  style={{ backgroundColor: `hsl(${index * 60}, 70%, 60%)` }}
                ></div>
                <span>{item.label}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

  const renderIoTToolsReport = () => (
    <div className="report-content">
      <div className="report-header">
        <h2>🔧 IoT Tools Report</h2>
        <p>Device management and analytics overview</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🔌</div>
          <div className="metric-value">{reportData.summary.totalDevices}</div>
          <div className="metric-label">Total Devices</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-value">{reportData.summary.activeDevices}</div>
          <div className="metric-label">Active Devices</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">❌</div>
          <div className="metric-value">{reportData.summary.offlineDevices}</div>
          <div className="metric-label">Offline Devices</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-value">{reportData.summary.powerOptimization}</div>
          <div className="metric-label">Power Savings</div>
        </div>
      </div>

      <div className="report-section">
        <h3>📊 Device Status by Category</h3>
        {renderChart(
          reportData.deviceStatus.map(d => ({ label: d.category, value: d.active })),
          'bar'
        )}
      </div>

      <div className="report-section">
        <h3>🚨 Device Replacement Alerts</h3>
        <div className="alerts-table">
          <div className="table-header">
            <div>Device</div>
            <div>Priority</div>
            <div>Issue</div>
            <div>Cost</div>
            <div>Timeline</div>
          </div>
          {reportData.replacementAlerts.map((alert, index) => (
            <div key={index} className={`table-row priority-${alert.priority.toLowerCase()}`}>
              <div>{alert.device}</div>
              <div className={`priority-badge ${alert.priority.toLowerCase()}`}>
                {alert.priority}
              </div>
              <div>{alert.issue}</div>
              <div>{alert.cost}</div>
              <div>{alert.timeline}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="report-section">
        <h3>⚡ Power Analysis</h3>
        <div className="power-comparison">
          <div className="power-bar">
            <div className="power-label">Normal Consumption</div>
            <div className="power-value">{reportData.powerAnalysis.normalConsumption.toLocaleString()}W</div>
            <div className="power-bar-visual normal" style={{ width: '100%' }}></div>
          </div>
          <div className="power-bar">
            <div className="power-label">Optimized Consumption</div>
            <div className="power-value">{reportData.powerAnalysis.optimizedConsumption.toLocaleString()}W</div>
            <div className="power-bar-visual optimized" style={{ 
              width: `${(reportData.powerAnalysis.optimizedConsumption / reportData.powerAnalysis.normalConsumption) * 100}%` 
            }}></div>
          </div>
          <div className="savings-highlight">
            <span className="savings-amount">{reportData.powerAnalysis.savings.toLocaleString()}W Saved</span>
            <span className="savings-percentage">({reportData.powerAnalysis.savingsPercentage}% reduction)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsReport = () => (
    <div className="report-content">
      <div className="report-header">
        <h2>🔔 Notifications Report</h2>
        <p>Alert management and notification analytics</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📧</div>
          <div className="metric-value">{reportData.summary.totalNotifications}</div>
          <div className="metric-label">Total Notifications</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🚨</div>
          <div className="metric-value">{reportData.summary.criticalAlerts}</div>
          <div className="metric-label">Critical Alerts</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚠️</div>
          <div className="metric-value">{reportData.summary.warningAlerts}</div>
          <div className="metric-label">Warning Alerts</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-value">{reportData.summary.deliveryRate}</div>
          <div className="metric-label">Delivery Rate</div>
        </div>
      </div>

      <div className="report-section">
        <h3>📊 Alerts by Type</h3>
        {renderChart(
          reportData.alertsByType.map(a => ({ label: a.type, value: a.count })),
          'pie'
        )}
      </div>

      <div className="report-section">
        <h3>🕒 Recent Alerts</h3>
        <div className="alerts-timeline">
          {reportData.recentAlerts.map((alert, index) => (
            <div key={index} className={`alert-item severity-${alert.severity.toLowerCase()}`}>
              <div className="alert-time">{alert.time}</div>
              <div className="alert-message">{alert.message}</div>
              <div className={`alert-severity ${alert.severity.toLowerCase()}`}>
                {alert.severity}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBuildingConsolidationReport = () => (
    <div className="report-content">
      <div className="report-header">
        <h2>🏢 Building Consolidation Report</h2>
        <p>Comprehensive building systems analysis</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">🏢</div>
          <div className="metric-value">{reportData.summary.buildingsMonitored}</div>
          <div className="metric-label">Buildings Monitored</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-value">{reportData.summary.energyEfficiency}</div>
          <div className="metric-label">Energy Efficiency</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-value">{reportData.summary.costSavings}</div>
          <div className="metric-label">Monthly Savings</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">🌱</div>
          <div className="metric-value">{reportData.summary.carbonReduction}</div>
          <div className="metric-label">CO₂ Reduction</div>
        </div>
      </div>

      <div className="report-section">
        <h3>🏗️ Building Performance</h3>
        {renderChart(
          reportData.buildingMetrics.map(b => ({ 
            label: b.building, 
            value: parseInt(b.efficiency.replace('%', '')) 
          })),
          'bar'
        )}
      </div>

      <div className="report-section">
        <h3>🌍 Environmental Impact</h3>
        <div className="environmental-grid">
          <div className="env-metric">
            <div className="env-icon">⚡</div>
            <div className="env-value">{reportData.environmentalImpact.energySaved}</div>
            <div className="env-label">Energy Saved</div>
          </div>
          <div className="env-metric">
            <div className="env-icon">🌱</div>
            <div className="env-value">{reportData.environmentalImpact.co2Reduced}</div>
            <div className="env-label">CO₂ Reduced</div>
          </div>
          <div className="env-metric">
            <div className="env-icon">🌳</div>
            <div className="env-value">{reportData.environmentalImpact.treesEquivalent}</div>
            <div className="env-label">Trees Equivalent</div>
          </div>
          <div className="env-metric">
            <div className="env-icon">🚗</div>
            <div className="env-value">{reportData.environmentalImpact.carsOffRoad}</div>
            <div className="env-label">Cars Off Road</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderComprehensiveReport = () => (
    <div className="report-content">
      <div className="report-header">
        <h2>📋 Comprehensive System Report</h2>
        <p>Complete system overview and performance metrics</p>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">💚</div>
          <div className="metric-value">{reportData.summary.systemHealth}</div>
          <div className="metric-label">System Health</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-value">{reportData.summary.overallEfficiency}</div>
          <div className="metric-label">Overall Efficiency</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-value">{reportData.summary.totalSavings}</div>
          <div className="metric-label">Total Savings</div>
        </div>
        <div className="metric-card">
          <div className="metric-icon">⏱️</div>
          <div className="metric-value">{reportData.summary.uptime}</div>
          <div className="metric-label">System Uptime</div>
        </div>
      </div>

      <div className="report-section">
        <h3>📈 Performance Trends</h3>
        <div className="performance-grid">
          {reportData.performanceMetrics.map((metric, index) => (
            <div key={index} className="performance-item">
              <div className="performance-metric">{metric.metric}</div>
              <div className="performance-value">{metric.value}</div>
              <div className={`performance-trend ${metric.trend.includes('↗') ? 'positive' : 'negative'}`}>
                {metric.trend}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="report-section">
        <h3>🔗 Integration Status</h3>
        <div className="integration-grid">
          {Object.entries(reportData.integrationStatus).map(([system, status]) => (
            <div key={system} className="integration-item">
              <div className="integration-system">{system.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
              <div className={`integration-status ${status.toLowerCase()}`}>
                {status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderReport = () => {
    if (!reportData) return null;

    switch (activeReport) {
      case 'iot-tools':
        return renderIoTToolsReport();
      case 'notifications':
        return renderNotificationsReport();
      case 'building-consolidation':
        return renderBuildingConsolidationReport();
      case 'comprehensive':
        return renderComprehensiveReport();
      default:
        return renderIoTToolsReport();
    }
  };

  return (
    <div className="iot-reports-dashboard">
      <div className="dashboard-header">
        <h1>📊 IoT Reports Dashboard</h1>
        <div className="header-info">
          <span className="last-updated">Last Updated: {lastUpdated.toLocaleTimeString()}</span>
          <span className="auto-refresh">🔄 Auto-refresh: 30s</span>
        </div>
      </div>

      <div className="report-tabs">
        <button 
          className={`tab ${activeReport === 'iot-tools' ? 'active' : ''}`}
          onClick={() => setActiveReport('iot-tools')}
        >
          🔧 IoT Tools Report
        </button>
        <button 
          className={`tab ${activeReport === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveReport('notifications')}
        >
          🔔 Notifications Report
        </button>
        <button 
          className={`tab ${activeReport === 'building-consolidation' ? 'active' : ''}`}
          onClick={() => setActiveReport('building-consolidation')}
        >
          🏢 Building Consolidation
        </button>
        <button 
          className={`tab ${activeReport === 'comprehensive' ? 'active' : ''}`}
          onClick={() => setActiveReport('comprehensive')}
        >
          📋 Comprehensive Report
        </button>
      </div>

      <div className="report-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">📊</div>
            <p>Generating report...</p>
          </div>
        ) : (
          renderReport()
        )}
      </div>

      <div className="dashboard-footer">
        <div className="footer-info">
          <span>🤖 IoT Management System</span>
          <span>📍 Sage IT - Smart Building Analysis</span>
          <span>⚡ Real-time monitoring active</span>
        </div>
      </div>
    </div>
  );
};

export default IoTReportsDashboard;