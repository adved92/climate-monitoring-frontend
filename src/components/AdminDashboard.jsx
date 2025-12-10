import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar } from 'react-chartjs-2';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({});
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up auto-refresh
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchDashboardData, 30000); // Refresh every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedTimeRange, autoRefresh]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/dashboard?timeRange=${selectedTimeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedTimeRange]);

  const handleExportData = async (format) => {
    try {
      const response = await fetch(`/api/admin/export?format=${format}&timeRange=${selectedTimeRange}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Export failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-report-${new Date().toISOString().split('T')[0]}.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err.message);
    }
  };

  const generateMockData = () => {
    return {
      users: {
        total: 1247,
        change: 12.5,
        active: 892,
        new_today: 23,
        demographics: {
          labels: ['Desktop', 'Mobile', 'Tablet'],
          data: [45, 40, 15]
        },
        registrationTrend: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [12, 19, 15, 25, 22, 18, 20]
        },
        recent: [
          { id: 1, email: 'user1@example.com', createdAt: '2024-01-15', lastActive: '2024-01-20', isActive: true },
          { id: 2, email: 'user2@example.com', createdAt: '2024-01-14', lastActive: '2024-01-19', isActive: true },
          { id: 3, email: 'user3@example.com', createdAt: '2024-01-13', lastActive: '2024-01-18', isActive: false }
        ]
      },
      requests: {
        total: 45678,
        change: 8.3,
        per_minute: 32,
        success_rate: 98.5
      },
      performance: {
        avgResponseTime: 245,
        responseTimeChange: -5.2,
        errorRate: 1.5,
        throughput: 1250,
        cacheHitRate: 87,
        responseTimeHistory: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          data: [180, 220, 280, 320, 290, 245]
        },
        errorRateHistory: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          data: [0.5, 1.2, 2.1, 1.8, 1.3, 1.5]
        },
        throughputHistory: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          data: [800, 950, 1200, 1400, 1350, 1250]
        },
        systemMetrics: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          cpu: [45, 52, 68, 75, 71, 58],
          memory: [62, 65, 72, 78, 74, 69],
          responseTime: [180, 220, 280, 320, 290, 245]
        }
      },
      alerts: {
        active: 3,
        change: -2,
        resolved_today: 8,
        critical: 1
      },
      charts: {
        userActivity: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [450, 520, 480, 600, 580, 420, 380]
        },
        apiUsage: {
          labels: ['Weather', 'Forecast', 'Alerts', 'Historical', 'Maps'],
          data: [15000, 12000, 8000, 5000, 3000]
        }
      },
      system: {
        database: {
          status: 'healthy',
          connections: 45,
          query_time: '12ms'
        },
        redis: {
          status: 'healthy',
          memory: '256MB',
          hit_rate: '87%'
        },
        api: {
          status: 'healthy',
          active: 3,
          total: 3
        },
        logs: [
          { timestamp: '2024-01-20T10:30:00Z', level: 'info', message: 'System health check completed successfully' },
          { timestamp: '2024-01-20T10:25:00Z', level: 'warning', message: 'High memory usage detected on server-2' },
          { timestamp: '2024-01-20T10:20:00Z', level: 'info', message: 'Cache cleared and rebuilt' },
          { timestamp: '2024-01-20T10:15:00Z', level: 'error', message: 'Failed to connect to weather API provider' },
          { timestamp: '2024-01-20T10:10:00Z', level: 'info', message: 'Daily backup completed' }
        ]
      }
    };
  };

  if (loading && !dashboardData) {
    return (
      <div className="admin-dashboard loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error && !dashboardData) {
    return (
      <div className="admin-dashboard error">
        <div className="error-message">
          <h3>Error Loading Dashboard</h3>
          <p>{error}</p>
          <button onClick={fetchDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Use mock data if no real data available
  const data = dashboardData || generateMockData();

  const renderOverviewTab = () => (
    <div className="overview-tab">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{data.users?.total || 0}</h3>
            <p>Total Users</p>
            <span className={`stat-change ${data.users?.change >= 0 ? 'positive' : 'negative'}`}>
              {data.users?.change >= 0 ? '+' : ''}{data.users?.change || 0}%
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🌤️</div>
          <div className="stat-content">
            <h3>{data.requests?.total || 0}</h3>
            <p>API Requests</p>
            <span className={`stat-change ${data.requests?.change >= 0 ? 'positive' : 'negative'}`}>
              {data.requests?.change >= 0 ? '+' : ''}{data.requests?.change || 0}%
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>{data.performance?.avgResponseTime || 0}ms</h3>
            <p>Avg Response Time</p>
            <span className={`stat-change ${data.performance?.responseTimeChange <= 0 ? 'positive' : 'negative'}`}>
              {data.performance?.responseTimeChange <= 0 ? '' : '+'}{data.performance?.responseTimeChange || 0}%
            </span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🚨</div>
          <div className="stat-content">
            <h3>{data.alerts?.active || 0}</h3>
            <p>Active Alerts</p>
            <span className={`stat-change ${data.alerts?.change <= 0 ? 'positive' : 'negative'}`}>
              {data.alerts?.change <= 0 ? '' : '+'}{data.alerts?.change || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>User Activity</h3>
          <Line
            data={{
              labels: data.charts?.userActivity?.labels || [],
              datasets: [{
                label: 'Active Users',
                data: data.charts?.userActivity?.data || [],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'Daily Active Users' }
              }
            }}
          />
        </div>
        
        <div className="chart-container">
          <h3>API Usage</h3>
          <Bar
            data={{
              labels: data.charts?.apiUsage?.labels || [],
              datasets: [{
                label: 'Requests',
                data: data.charts?.apiUsage?.data || [],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
              }]
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'top' },
                title: { display: true, text: 'API Requests by Endpoint' }
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderUsersTab = () => (
    <div className="users-tab">
      <div className="users-stats">
        <div className="chart-container">
          <h3>User Demographics</h3>
          <Pie
            data={{
              labels: data.users?.demographics?.labels || [],
              datasets: [{
                data: data.users?.demographics?.data || [],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'right' } }
            }}
          />
        </div>
        
        <div className="chart-container">
          <h3>User Registration Trend</h3>
          <Line
            data={{
              labels: data.users?.registrationTrend?.labels || [],
              datasets: [{
                label: 'New Registrations',
                data: data.users?.registrationTrend?.data || [],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
              }]
            }}
            options={{
              responsive: true,
              plugins: { legend: { position: 'top' } }
            }}
          />
        </div>
      </div>
      
      <div className="users-table">
        <h3>Recent Users</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Email</th>
                <th>Registration Date</th>
                <th>Last Active</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.users?.recent?.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.lastActive).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn view">View</button>
                    <button className="action-btn edit">Edit</button>
                  </td>
                </tr>
              )) || []}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="performance-tab">
      <div className="performance-metrics">
        <div className="metric-card">
          <h4>Response Time</h4>
          <div className="metric-value">{data.performance?.avgResponseTime || 0}ms</div>
          <div className="metric-chart">
            <Line
              data={{
                labels: data.performance?.responseTimeHistory?.labels || [],
                datasets: [{
                  data: data.performance?.responseTimeHistory?.data || [],
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.1)',
                  tension: 0.1,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
              }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Error Rate</h4>
          <div className="metric-value">{data.performance?.errorRate || 0}%</div>
          <div className="metric-chart">
            <Line
              data={{
                labels: data.performance?.errorRateHistory?.labels || [],
                datasets: [{
                  data: data.performance?.errorRateHistory?.data || [],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.1)',
                  tension: 0.1,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
              }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Throughput</h4>
          <div className="metric-value">{data.performance?.throughput || 0}/min</div>
          <div className="metric-chart">
            <Bar
              data={{
                labels: data.performance?.throughputHistory?.labels || [],
                datasets: [{
                  data: data.performance?.throughputHistory?.data || [],
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1
                }]
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { x: { display: false }, y: { display: false } }
              }}
            />
          </div>
        </div>
        
        <div className="metric-card">
          <h4>Cache Hit Rate</h4>
          <div className="metric-value">{data.performance?.cacheHitRate || 0}%</div>
          <div className="metric-chart">
            <Doughnut
              data={{
                datasets: [{
                  data: [
                    data.performance?.cacheHitRate || 0,
                    100 - (data.performance?.cacheHitRate || 0)
                  ],
                  backgroundColor: ['#4BC0C0', '#E0E0E0'],
                  borderWidth: 0
                }]
              }}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                cutout: '70%'
              }}
            />
          </div>
        </div>
      </div>
      
      <div className="performance-details">
        <div className="chart-container">
          <h3>System Performance Over Time</h3>
          <Line
            data={{
              labels: data.performance?.systemMetrics?.labels || [],
              datasets: [
                {
                  label: 'CPU Usage (%)',
                  data: data.performance?.systemMetrics?.cpu || [],
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.1)',
                  yAxisID: 'y'
                },
                {
                  label: 'Memory Usage (%)',
                  data: data.performance?.systemMetrics?.memory || [],
                  borderColor: 'rgb(54, 162, 235)',
                  backgroundColor: 'rgba(54, 162, 235, 0.1)',
                  yAxisID: 'y'
                },
                {
                  label: 'Response Time (ms)',
                  data: data.performance?.systemMetrics?.responseTime || [],
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(75, 192, 192, 0.1)',
                  yAxisID: 'y1'
                }
              ]
            }}
            options={{
              responsive: true,
              interaction: { mode: 'index', intersect: false },
              scales: {
                x: { display: true, title: { display: true, text: 'Time' } },
                y: {
                  type: 'linear',
                  display: true,
                  position: 'left',
                  title: { display: true, text: 'Percentage (%)' }
                },
                y1: {
                  type: 'linear',
                  display: true,
                  position: 'right',
                  title: { display: true, text: 'Response Time (ms)' },
                  grid: { drawOnChartArea: false }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  const renderSystemTab = () => (
    <div className="system-tab">
      <div className="system-status">
        <h3>System Health</h3>
        <div className="health-indicators">
          <div className={`health-indicator ${data.system?.database?.status || 'unknown'}`}>
            <div className="indicator-icon">🗄️</div>
            <div className="indicator-content">
              <h4>Database</h4>
              <p>Status: {data.system?.database?.status || 'Unknown'}</p>
              <p>Connections: {data.system?.database?.connections || 0}</p>
            </div>
          </div>
          
          <div className={`health-indicator ${data.system?.redis?.status || 'unknown'}`}>
            <div className="indicator-icon">⚡</div>
            <div className="indicator-content">
              <h4>Redis Cache</h4>
              <p>Status: {data.system?.redis?.status || 'Unknown'}</p>
              <p>Memory: {data.system?.redis?.memory || '0MB'}</p>
            </div>
          </div>
          
          <div className={`health-indicator ${data.system?.api?.status || 'unknown'}`}>
            <div className="indicator-icon">🌐</div>
            <div className="indicator-content">
              <h4>Weather APIs</h4>
              <p>Status: {data.system?.api?.status || 'Unknown'}</p>
              <p>Active: {data.system?.api?.active || 0}/{data.system?.api?.total || 0}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="system-logs">
        <h3>Recent System Logs</h3>
        <div className="logs-container">
          {data.system?.logs?.map((log, index) => (
            <div key={index} className={`log-entry ${log.level}`}>
              <span className="log-timestamp">{new Date(log.timestamp).toLocaleString()}</span>
              <span className="log-level">{log.level.toUpperCase()}</span>
              <span className="log-message">{log.message}</span>
            </div>
          )) || []}
        </div>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-controls">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="time-range-select"
          >
            <option value="1d">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          
          <div className="export-buttons">
            <button onClick={() => handleExportData('csv')} className="export-btn">
              Export CSV
            </button>
            <button onClick={() => handleExportData('pdf')} className="export-btn">
              Export PDF
            </button>
          </div>
          
          <label className="auto-refresh-toggle">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            Auto Refresh
          </label>
          
          <button onClick={fetchDashboardData} className="refresh-btn" disabled={loading}>
            {loading ? '🔄' : '🔄'} Refresh
          </button>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
          onClick={() => setActiveTab('performance')}
        >
          Performance
        </button>
        <button
          className={`tab-button ${activeTab === 'system' ? 'active' : ''}`}
          onClick={() => setActiveTab('system')}
        >
          System
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'performance' && renderPerformanceTab()}
        {activeTab === 'system' && renderSystemTab()}
      </div>
      
      {error && (
        <div className="error-toast">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;