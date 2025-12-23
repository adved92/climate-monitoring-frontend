import React, { useState, useEffect } from 'react';
import './AdvancedIoTDashboard.css';

const AdvancedIoTDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/iot/dashboard/comprehensive');
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      const result = await response.json();
      setDashboardData(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyAutomationScene = async (sceneName = null) => {
    try {
      const response = await fetch('/api/iot/automation/apply-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scene_name: sceneName })
      });
      if (!response.ok) throw new Error('Failed to apply scene');
      fetchDashboardData(); // Refresh data
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="advanced-iot-dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading Advanced IoT Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="advanced-iot-dashboard error">
        <h2>⚠️ Dashboard Error</h2>
        <p>{error}</p>
        <button onClick={fetchDashboardData}>Retry</button>
      </div>
    );
  }

  return (
    <div className="advanced-iot-dashboard">
      <header className="dashboard-header">
        <h1>🏢 Advanced IoT Management Dashboard</h1>
        <div className="system-status">
          <span className={`status-indicator ${dashboardData?.overview?.system_health?.toLowerCase()}`}>
            {dashboardData?.overview?.system_health}
          </span>
          <span className="last-updated">
            Last updated: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={activeTab === 'predictive' ? 'active' : ''}
          onClick={() => setActiveTab('predictive')}
        >
          🔮 Predictive Analytics
        </button>
        <button 
          className={activeTab === 'automation' ? 'active' : ''}
          onClick={() => setActiveTab('automation')}
        >
          🤖 Smart Automation
        </button>
        <button 
          className={activeTab === 'optimization' ? 'active' : ''}
          onClick={() => setActiveTab('optimization')}
        >
          ⚡ Energy Optimization
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'overview' && (
          <OverviewTab data={dashboardData} onApplyScene={applyAutomationScene} />
        )}
        {activeTab === 'predictive' && (
          <PredictiveTab data={dashboardData} />
        )}
        {activeTab === 'automation' && (
          <AutomationTab data={dashboardData} onApplyScene={applyAutomationScene} />
        )}
        {activeTab === 'optimization' && (
          <OptimizationTab data={dashboardData} />
        )}
      </main>
    </div>
  );
};

const OverviewTab = ({ data, onApplyScene }) => (
  <div className="overview-tab">
    <div className="overview-cards">
      <div className="overview-card devices">
        <h3>📱 Device Status</h3>
        <div className="device-stats">
          <div className="stat">
            <span className="number">{data?.overview?.total_devices}</span>
            <span className="label">Total Devices</span>
          </div>
          <div className="stat">
            <span className="number active">{data?.overview?.active_devices}</span>
            <span className="label">Active</span>
          </div>
          <div className="stat">
            <span className="number faulty">{data?.overview?.faulty_devices}</span>
            <span className="label">Faulty</span>
          </div>
        </div>
      </div>

      <div className="overview-card energy">
        <h3>⚡ Energy Insights</h3>
        <div className="energy-stats">
          <div className="stat">
            <span className="number">{data?.energy_optimization?.current_consumption?.toFixed(1)}W</span>
            <span className="label">Current Usage</span>
          </div>
          <div className="stat">
            <span className="number savings">{data?.energy_optimization?.potential_savings?.toFixed(1)}W</span>
            <span className="label">Potential Savings</span>
          </div>
          <div className="stat">
            <span className="number percentage">{data?.energy_optimization?.savings_percentage}%</span>
            <span className="label">Savings Potential</span>
          </div>
        </div>
      </div>

      <div className="overview-card automation">
        <h3>🤖 Automation Status</h3>
        <div className="automation-info">
          <p><strong>Current Scene:</strong> {data?.automation_status?.scene_name}</p>
          <p><strong>Next Change:</strong> {new Date(data?.automation_status?.next_scene_change).toLocaleString()}</p>
          <button 
            className="apply-scene-btn"
            onClick={() => onApplyScene()}
          >
            Apply Current Scene
          </button>
        </div>
      </div>

      <div className="overview-card alerts">
        <h3>🚨 System Alerts</h3>
        <div className="alert-stats">
          <div className="alert-item">
            <span className="alert-count critical">{data?.predictive_analytics?.critical_anomalies}</span>
            <span className="alert-label">Critical Anomalies</span>
          </div>
          <div className="alert-item">
            <span className="alert-count warning">{data?.predictive_analytics?.anomalies_detected}</span>
            <span className="alert-label">Total Anomalies</span>
          </div>
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <h3>🚀 Quick Actions</h3>
      <div className="action-buttons">
        <button className="action-btn optimize" onClick={() => onApplyScene('work_hours')}>
          Apply Work Hours Scene
        </button>
        <button className="action-btn emergency" onClick={() => onApplyScene('emergency')}>
          Emergency Mode
        </button>
        <button className="action-btn weekend" onClick={() => onApplyScene('weekend')}>
          Weekend Mode
        </button>
      </div>
    </div>
  </div>
);

const PredictiveTab = ({ data }) => {
  const [predictiveData, setPredictiveData] = useState(null);

  useEffect(() => {
    fetchPredictiveData();
  }, []);

  const fetchPredictiveData = async () => {
    try {
      const response = await fetch('/api/iot/analytics/predictive-maintenance');
      if (!response.ok) throw new Error('Failed to fetch predictive data');
      const result = await response.json();
      setPredictiveData(result.data);
    } catch (err) {
      console.error('Error fetching predictive data:', err);
    }
  };

  return (
    <div className="predictive-tab">
      <div className="predictive-header">
        <h2>🔮 AI-Powered Predictive Analytics</h2>
        <p>Machine learning algorithms predict device failures 7-30 days in advance</p>
      </div>

      {predictiveData && (
        <>
          <div className="prediction-summary">
            <div className="summary-card">
              <h3>📊 Analysis Summary</h3>
              <p><strong>Devices Analyzed:</strong> {predictiveData.failure_predictions?.total_devices_analyzed}</p>
              <p><strong>High Risk Devices:</strong> {predictiveData.failure_predictions?.high_risk_devices}</p>
              <p><strong>Medium Risk Devices:</strong> {predictiveData.failure_predictions?.medium_risk_devices}</p>
              <p><strong>AI Accuracy:</strong> {predictiveData.ai_analysis?.accuracy}</p>
            </div>
          </div>

          <div className="predictions-list">
            <h3>⚠️ Device Failure Predictions</h3>
            {predictiveData.failure_predictions?.predictions?.slice(0, 10).map((prediction, index) => (
              <div key={index} className={`prediction-item ${prediction.criticality.toLowerCase()}`}>
                <div className="prediction-header">
                  <h4>{prediction.device_name}</h4>
                  <span className={`risk-badge ${prediction.criticality.toLowerCase()}`}>
                    {prediction.failure_probability}% Risk
                  </span>
                </div>
                <div className="prediction-details">
                  <p><strong>Zone:</strong> {prediction.zone}</p>
                  <p><strong>Predicted Failure:</strong> {new Date(prediction.predicted_failure_date).toLocaleDateString()}</p>
                  <div className="risk-factors">
                    <strong>Risk Factors:</strong>
                    <ul>
                      {prediction.risk_factors?.map((factor, i) => (
                        <li key={i}>{factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="recommendations">
                    <strong>Recommended Actions:</strong>
                    <ul>
                      {prediction.recommended_actions?.map((action, i) => (
                        <li key={i}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="maintenance-schedule">
            <h3>🔧 Maintenance Schedule</h3>
            <div className="schedule-summary">
              <p><strong>Overdue Maintenance:</strong> {predictiveData.maintenance_schedule?.overdue_maintenance}</p>
              <p><strong>Urgent Maintenance:</strong> {predictiveData.maintenance_schedule?.urgent_maintenance}</p>
              <p><strong>High Priority:</strong> {predictiveData.maintenance_schedule?.high_priority_maintenance}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AutomationTab = ({ data, onApplyScene }) => {
  const [automationData, setAutomationData] = useState(null);

  useEffect(() => {
    fetchAutomationData();
  }, []);

  const fetchAutomationData = async () => {
    try {
      const [scenesResponse, occupancyResponse, loadBalancingResponse] = await Promise.all([
        fetch('/api/iot/automation/scenes'),
        fetch('/api/iot/automation/occupancy-based'),
        fetch('/api/iot/automation/load-balancing')
      ]);

      const [scenes, occupancy, loadBalancing] = await Promise.all([
        scenesResponse.json(),
        occupancyResponse.json(),
        loadBalancingResponse.json()
      ]);

      setAutomationData({
        scenes: scenes.data,
        occupancy: occupancy.data,
        loadBalancing: loadBalancing.data
      });
    } catch (err) {
      console.error('Error fetching automation data:', err);
    }
  };

  return (
    <div className="automation-tab">
      <div className="automation-header">
        <h2>🤖 Smart Building Automation</h2>
        <p>Intelligent control systems that adapt to occupancy, weather, and usage patterns</p>
      </div>

      {automationData && (
        <>
          <div className="current-scene">
            <h3>🎬 Current Scene</h3>
            <div className="scene-info">
              <h4>{automationData.scenes?.current_scene?.scene_name}</h4>
              <p>{automationData.scenes?.current_scene?.description}</p>
              <p><strong>Next Change:</strong> {new Date(automationData.scenes?.current_scene?.next_scene_change).toLocaleString()}</p>
            </div>
          </div>

          <div className="available-scenes">
            <h3>🎭 Available Scenes</h3>
            <div className="scenes-grid">
              {Object.entries(automationData.scenes?.scene_details || {}).map(([key, scene]) => (
                <div key={key} className="scene-card">
                  <h4>{scene.name}</h4>
                  <p>{scene.description}</p>
                  <button 
                    className="apply-scene-btn"
                    onClick={() => onApplyScene(key)}
                  >
                    Apply Scene
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="occupancy-automation">
            <h3>👥 Occupancy-Based Automation</h3>
            <div className="occupancy-zones">
              {Object.entries(automationData.occupancy?.occupancy_analysis || {}).map(([zone, data]) => (
                <div key={zone} className="zone-card">
                  <h4>{zone}</h4>
                  <p><strong>Occupancy:</strong> {data.occupancy_percentage}%</p>
                  <p><strong>Recommended Power:</strong> {data.recommended_power_level}%</p>
                  <p><strong>Devices:</strong> {data.devices_in_zone?.length || 0}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="load-balancing">
            <h3>⚖️ Load Balancing</h3>
            <div className="load-balancing-info">
              <p><strong>Current Peak Load:</strong> {automationData.loadBalancing?.current_peak_load_watts}W</p>
              <p><strong>Total Building Load:</strong> {automationData.loadBalancing?.total_building_load_watts}W</p>
              <p><strong>Optimization Potential:</strong> {automationData.loadBalancing?.load_balancing_potential}</p>
            </div>
            
            <div className="balancing-strategies">
              <h4>Optimization Strategies</h4>
              {automationData.loadBalancing?.load_balancing_strategies?.map((strategy, index) => (
                <div key={index} className="strategy-card">
                  <h5>{strategy.strategy_type}</h5>
                  <p><strong>Target:</strong> {strategy.target}</p>
                  <p><strong>Current Load:</strong> {strategy.current_load_watts}W</p>
                  <p><strong>Potential Reduction:</strong> {strategy.potential_peak_reduction}</p>
                  <div className="recommendations">
                    <strong>Recommendations:</strong>
                    <ul>
                      {strategy.recommendations?.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const OptimizationTab = ({ data }) => {
  const [optimizationData, setOptimizationData] = useState(null);

  useEffect(() => {
    fetchOptimizationData();
  }, []);

  const fetchOptimizationData = async () => {
    try {
      const response = await fetch('/api/iot/analytics/energy-optimization');
      if (!response.ok) throw new Error('Failed to fetch optimization data');
      const result = await response.json();
      setOptimizationData(result.data);
    } catch (err) {
      console.error('Error fetching optimization data:', err);
    }
  };

  return (
    <div className="optimization-tab">
      <div className="optimization-header">
        <h2>⚡ AI-Driven Energy Optimization</h2>
        <p>Continuous analysis and optimization of energy consumption patterns</p>
      </div>

      {optimizationData && (
        <>
          <div className="optimization-summary">
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Current Consumption</h3>
                <span className="big-number">{optimizationData.current_total_power?.toFixed(1)}W</span>
              </div>
              <div className="summary-card savings">
                <h3>Potential Savings</h3>
                <span className="big-number">{optimizationData.potential_savings_watts?.toFixed(1)}W</span>
                <span className="percentage">({optimizationData.potential_savings_percentage}%)</span>
              </div>
              <div className="summary-card annual">
                <h3>Annual Savings</h3>
                <span className="big-number">{optimizationData.annual_energy_savings_kwh?.toFixed(0)} kWh</span>
              </div>
            </div>
          </div>

          <div className="optimization-strategies">
            <h3>🎯 Optimization Strategies</h3>
            {optimizationData.optimizations?.map((opt, index) => (
              <div key={index} className="optimization-card">
                <div className="opt-header">
                  <h4>{opt.strategy}</h4>
                  <span className="savings-badge">
                    {opt.potential_savings_watts?.toFixed(0)}W Savings
                  </span>
                </div>
                <p><strong>Target:</strong> {opt.target}</p>
                <p><strong>Description:</strong> {opt.description}</p>
                <p><strong>Implementation:</strong> {opt.implementation_difficulty} difficulty</p>
                <p><strong>Payback Period:</strong> {opt.payback_period_months} months</p>
                
                <div className="actions-list">
                  <strong>Implementation Actions:</strong>
                  <ul>
                    {opt.actions?.map((action, i) => (
                      <li key={i}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="zone-analysis">
            <h3>🏢 Zone Analysis</h3>
            <div className="zones-grid">
              {Object.entries(optimizationData.zone_analysis || {}).map(([zone, data]) => (
                <div key={zone} className="zone-analysis-card">
                  <h4>{zone}</h4>
                  <p><strong>Power:</strong> {data.power_watts?.toFixed(1)}W</p>
                  <p><strong>Devices:</strong> {data.device_count}</p>
                  <p><strong>Types:</strong> {data.types?.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="device-type-analysis">
            <h3>🔌 Device Type Analysis</h3>
            <div className="device-types-grid">
              {Object.entries(optimizationData.device_type_analysis || {}).map(([type, data]) => (
                <div key={type} className="device-type-card">
                  <h4>{type}</h4>
                  <p><strong>Total Power:</strong> {data.power_watts?.toFixed(1)}W</p>
                  <p><strong>Device Count:</strong> {data.device_count}</p>
                  <p><strong>Avg per Device:</strong> {(data.power_watts / data.device_count)?.toFixed(1)}W</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedIoTDashboard;