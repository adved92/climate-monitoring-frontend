import React, { useState, useEffect } from 'react';
import './IoTToolsCatalog.css';

const IoTToolsCatalog = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deploymentModal, setDeploymentModal] = useState(false);
  const [deploymentData, setDeploymentData] = useState({
    deployment_name: '',
    location: '',
    zone: '',
    floor: '',
    installer_name: '',
    installation_notes: '',
    climate_zone: 'temperate',
    building_type: 'office',
    usage_scenario: 'business_hours'
  });

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/iot-tools/catalog');
      if (!response.ok) throw new Error('Failed to fetch catalog');
      const data = await response.json();
      setCatalog(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const initializeDatabase = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/iot-tools/initialize-database', {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to initialize database');
      const result = await response.json();
      alert(`Database initialized: ${result.tools_created} tools created`);
      fetchCatalog();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deployTool = async () => {
    try {
      const response = await fetch('/api/iot-tools/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tool_id: selectedTool.id,
          ...deploymentData
        })
      });
      
      if (!response.ok) throw new Error('Failed to deploy tool');
      const result = await response.json();
      
      alert(`Tool deployed successfully! Deployment ID: ${result.deployment_id}`);
      setDeploymentModal(false);
      setSelectedTool(null);
      
    } catch (err) {
      alert(`Deployment failed: ${err.message}`);
    }
  };

  const exportDatabase = async () => {
    try {
      const response = await fetch('/api/iot-tools/export');
      if (!response.ok) throw new Error('Failed to export database');
      const data = await response.json();
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iot-tools-catalog-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      alert(`Export failed: ${err.message}`);
    }
  };

  const filteredTools = catalog?.categories
    ?.find(cat => cat.id === selectedCategory)
    ?.tools?.filter(tool => 
      tool.tool_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  if (loading) {
    return (
      <div className="iot-catalog-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading IoT Tools Catalog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="iot-catalog-container">
        <div className="error-message">
          <h3>Error Loading Catalog</h3>
          <p>{error}</p>
          <button onClick={initializeDatabase} className="btn-primary">
            Initialize Database
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="iot-catalog-container">
      <header className="catalog-header">
        <h1>IoT Tools Catalog</h1>
        <p>Real-time IoT devices and tools for smart building implementation</p>
        
        <div className="header-actions">
          <button onClick={exportDatabase} className="btn-secondary">
            Export Catalog
          </button>
          <button onClick={initializeDatabase} className="btn-primary">
            Refresh Database
          </button>
        </div>
      </header>

      {catalog && (
        <>
          <div className="catalog-stats">
            <div className="stat-card">
              <h3>{catalog.statistics.total_tools}</h3>
              <p>Total Tools</p>
            </div>
            <div className="stat-card">
              <h3>{catalog.statistics.total_categories}</h3>
              <p>Categories</p>
            </div>
            <div className="stat-card">
              <h3>{catalog.statistics.active_deployments}</h3>
              <p>Active Deployments</p>
            </div>
            <div className="stat-card">
              <h3>{catalog.statistics.average_rating}</h3>
              <p>Avg Rating</p>
            </div>
          </div>

          <div className="catalog-content">
            <aside className="categories-sidebar">
              <h3>Categories</h3>
              <div className="category-list">
                {catalog.categories.map(category => (
                  <div
                    key={category.id}
                    className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category.id)}
                    style={{ borderLeft: `4px solid ${category.color_code}` }}
                  >
                    <div className="category-info">
                      <h4>{category.category_name}</h4>
                      <p>{category.tool_count} tools</p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <main className="tools-main">
              {!selectedCategory ? (
                <div className="welcome-section">
                  <h2>Featured Tools</h2>
                  <div className="featured-tools">
                    {catalog.featured_tools.map(tool => (
                      <div key={tool.id} className="featured-tool-card">
                        <h4>{tool.tool_name}</h4>
                        <p className="manufacturer">{tool.manufacturer}</p>
                        <p className="description">{tool.tool_description}</p>
                        <div className="tool-stats">
                          <span className="rating">★ {tool.compatibility_rating}</span>
                          <span className="popularity">Popular: {tool.popularity_score}%</span>
                        </div>
                        <button 
                          onClick={() => setSelectedTool(tool)}
                          className="btn-primary"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>

                  <h2>Recent Deployments</h2>
                  <div className="recent-deployments">
                    {catalog.recent_deployments.map(deployment => (
                      <div key={deployment.deployment_id} className="deployment-card">
                        <h4>{deployment.deployment_name}</h4>
                        <p><strong>Tool:</strong> {deployment.tool_name}</p>
                        <p><strong>Location:</strong> {deployment.location}</p>
                        <p><strong>Installed:</strong> {new Date(deployment.installation_date).toLocaleDateString()}</p>
                        <div className="performance-rating">
                          Rating: {deployment.performance_rating}/5
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="tools-section">
                  <div className="tools-header">
                    <h2>{catalog.categories.find(c => c.id === selectedCategory)?.category_name}</h2>
                    <div className="search-bar">
                      <input
                        type="text"
                        placeholder="Search tools..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="tools-grid">
                    {filteredTools.map(tool => (
                      <div key={tool.id} className="tool-card">
                        <div className="tool-header">
                          <h4>{tool.tool_name}</h4>
                          <span className="manufacturer">{tool.manufacturer}</span>
                        </div>
                        
                        <div className="tool-specs">
                          <p><strong>Power:</strong> {tool.power_rating_watts}W</p>
                          <p><strong>Protocol:</strong> {tool.communication_protocol}</p>
                          <p><strong>Complexity:</strong> {tool.installation_complexity}</p>
                          <p><strong>Cost:</strong> ${tool.total_cost}</p>
                        </div>

                        <div className="tool-features">
                          {tool.features?.slice(0, 3).map((feature, idx) => (
                            <span key={idx} className="feature-tag">{feature}</span>
                          ))}
                        </div>

                        <div className="tool-actions">
                          <button 
                            onClick={() => setSelectedTool(tool)}
                            className="btn-secondary"
                          >
                            Details
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedTool(tool);
                              setDeploymentModal(true);
                            }}
                            className="btn-primary"
                          >
                            Deploy
                          </button>
                        </div>

                        {tool.is_recommended && (
                          <div className="recommended-badge">Recommended</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
        </>
      )}

      {/* Tool Details Modal */}
      {selectedTool && !deploymentModal && (
        <div className="modal-overlay" onClick={() => setSelectedTool(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedTool.tool_name}</h3>
              <button onClick={() => setSelectedTool(null)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="tool-details">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <p><strong>Manufacturer:</strong> {selectedTool.manufacturer}</p>
                  <p><strong>Model:</strong> {selectedTool.model_number}</p>
                  <p><strong>Description:</strong> {selectedTool.tool_description}</p>
                </div>

                <div className="detail-section">
                  <h4>Technical Specifications</h4>
                  <p><strong>Power Rating:</strong> {selectedTool.power_rating_watts}W</p>
                  <p><strong>Dimensions:</strong> {selectedTool.dimensions}</p>
                  <p><strong>Communication:</strong> {selectedTool.communication_protocol}</p>
                  <p><strong>Installation:</strong> {selectedTool.installation_complexity}</p>
                </div>

                <div className="detail-section">
                  <h4>Features & Capabilities</h4>
                  <div className="features-list">
                    {selectedTool.features?.map((feature, idx) => (
                      <span key={idx} className="feature-item">{feature}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-section">
                  <h4>Cost Information</h4>
                  <p><strong>Purchase Cost:</strong> ${selectedTool.purchase_cost}</p>
                  <p><strong>Installation Cost:</strong> ${selectedTool.installation_cost}</p>
                  <p><strong>Total Cost:</strong> ${selectedTool.total_cost}</p>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setSelectedTool(null)} className="btn-secondary">
                Close
              </button>
              <button 
                onClick={() => setDeploymentModal(true)}
                className="btn-primary"
              >
                Deploy This Tool
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Deployment Modal */}
      {deploymentModal && selectedTool && (
        <div className="modal-overlay" onClick={() => setDeploymentModal(false)}>
          <div className="modal-content deployment-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Deploy {selectedTool.tool_name}</h3>
              <button onClick={() => setDeploymentModal(false)} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <form className="deployment-form">
                <div className="form-group">
                  <label>Deployment Name *</label>
                  <input
                    type="text"
                    value={deploymentData.deployment_name}
                    onChange={(e) => setDeploymentData({...deploymentData, deployment_name: e.target.value})}
                    placeholder="e.g., Main Office HVAC Control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <input
                    type="text"
                    value={deploymentData.location}
                    onChange={(e) => setDeploymentData({...deploymentData, location: e.target.value})}
                    placeholder="e.g., Building A, Floor 2, Room 201"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Zone</label>
                    <input
                      type="text"
                      value={deploymentData.zone}
                      onChange={(e) => setDeploymentData({...deploymentData, zone: e.target.value})}
                      placeholder="e.g., North Wing"
                    />
                  </div>

                  <div className="form-group">
                    <label>Floor</label>
                    <input
                      type="number"
                      value={deploymentData.floor}
                      onChange={(e) => setDeploymentData({...deploymentData, floor: e.target.value})}
                      placeholder="Floor number"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Installer Name</label>
                  <input
                    type="text"
                    value={deploymentData.installer_name}
                    onChange={(e) => setDeploymentData({...deploymentData, installer_name: e.target.value})}
                    placeholder="Name of person installing"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Climate Zone</label>
                    <select
                      value={deploymentData.climate_zone}
                      onChange={(e) => setDeploymentData({...deploymentData, climate_zone: e.target.value})}
                    >
                      <option value="tropical">Tropical</option>
                      <option value="temperate">Temperate</option>
                      <option value="continental">Continental</option>
                      <option value="polar">Polar</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Building Type</label>
                    <select
                      value={deploymentData.building_type}
                      onChange={(e) => setDeploymentData({...deploymentData, building_type: e.target.value})}
                    >
                      <option value="office">Office</option>
                      <option value="residential">Residential</option>
                      <option value="industrial">Industrial</option>
                      <option value="retail">Retail</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="educational">Educational</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Usage Scenario</label>
                  <select
                    value={deploymentData.usage_scenario}
                    onChange={(e) => setDeploymentData({...deploymentData, usage_scenario: e.target.value})}
                  >
                    <option value="24/7">24/7 Operation</option>
                    <option value="business_hours">Business Hours</option>
                    <option value="seasonal">Seasonal Use</option>
                    <option value="on_demand">On Demand</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Installation Notes</label>
                  <textarea
                    value={deploymentData.installation_notes}
                    onChange={(e) => setDeploymentData({...deploymentData, installation_notes: e.target.value})}
                    placeholder="Any special installation requirements or notes..."
                    rows="3"
                  />
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button onClick={() => setDeploymentModal(false)} className="btn-secondary">
                Cancel
              </button>
              <button onClick={deployTool} className="btn-primary">
                Deploy Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IoTToolsCatalog;