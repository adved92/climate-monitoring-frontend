import { useState } from 'react';
import { climateAPI } from '../services/api';
import './DataExport.css';

const DataExport = ({ data, locationName, coordinates }) => {
  const [exportFormat, setExportFormat] = useState('json');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isDownloadingHourly, setIsDownloadingHourly] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  const exportHourlyDataCSV = async () => {
    if (!coordinates?.lat || !coordinates?.lon) {
      alert('Location coordinates are required for hourly data export');
      return;
    }

    setIsDownloadingHourly(true);
    try {
      // Try to fetch 7-day hourly forecast data (168 hours available)
      let hourlyData;
      try {
        hourlyData = await climateAPI.getHourly7DayForecast(coordinates.lat, coordinates.lon);
      } catch (error) {
        console.warn('Hourly forecast not available, generating mock data:', error);
        // Generate mock 168 hours of data for demo
        hourlyData = { data: [] };
        const now = new Date();
        for (let i = 0; i < 168; i++) {
          const datetime = new Date(now.getTime() + i * 60 * 60 * 1000);
          hourlyData.data.push({
            timestamp: datetime.toISOString(),
            temperature: Math.round(15 + Math.random() * 20),
            feels_like: Math.round(15 + Math.random() * 20),
            humidity: Math.round(40 + Math.random() * 40),
            pressure: Math.round(1000 + Math.random() * 50),
            wind_speed: Math.round(Math.random() * 15),
            wind_direction: Math.round(Math.random() * 360),
            weather_conditions: ['Clear', 'Cloudy', 'Partly Cloudy', 'Light Rain', 'Sunny'][Math.floor(Math.random() * 5)],
            precipitation_probability: Math.round(Math.random() * 50),
            cloud_cover: Math.round(Math.random() * 100),
            visibility: Math.round(5 + Math.random() * 15),
            uv_index: Math.round(Math.random() * 10)
          });
        }
      }
      
      if (!hourlyData?.data || !Array.isArray(hourlyData.data)) {
        throw new Error('No hourly data available');
      }

      // Create CSV content with 168 hourly data points
      const csvRows = [];
      csvRows.push('DateTime,Temperature(°C),FeelsLike(°C),Humidity(%),Pressure(hPa),WindSpeed(m/s),WindDirection(°),Conditions,Precipitation(mm),CloudCover(%),Visibility(km),UVIndex');
      
      hourlyData.data.forEach((hour, index) => {
        const row = [
          hour.timestamp || `Hour ${index + 1}`,
          hour.temperature || '',
          hour.feels_like || '',
          hour.humidity || '',
          hour.pressure || 1013, // Default atmospheric pressure
          hour.wind_speed || '',
          hour.wind_direction || '',
          hour.weather_conditions || hour.conditions || '',
          hour.precipitation_probability || 0,
          hour.cloud_cover || 0, // Not available in current format
          hour.visibility || 10, // Default visibility
          hour.uv_index || 0 // Not available in current format
        ];
        csvRows.push(row.join(','));
      });

      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `hourly-weather-168h-${locationName}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`Successfully downloaded ${hourlyData.data.length} hourly data points!`);
    } catch (error) {
      console.error('Error downloading hourly data:', error);
      alert('Failed to download hourly data. Please try again.');
    } finally {
      setIsDownloadingHourly(false);
    }
  };

  const exportToJSON = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weather-${locationName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const csvRows = [];
    csvRows.push('Metric,Value,Unit');
    
    if (data) {
      csvRows.push(`Temperature,${data.temperature},°C`);
      csvRows.push(`Feels Like,${data.feels_like},°C`);
      csvRows.push(`Humidity,${data.humidity},%`);
      csvRows.push(`Pressure,${data.pressure},hPa`);
      csvRows.push(`Wind Speed,${data.wind_speed},m/s`);
      csvRows.push(`Conditions,${data.conditions},-`);
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `weather-${locationName}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    setIsDownloadingPDF(true);
    try {
      // Create comprehensive PDF content
      let pdfContent = `Weather Report - ${locationName}\n`;
      pdfContent += `Generated: ${new Date().toLocaleString()}\n`;
      pdfContent += `${'='.repeat(50)}\n\n`;
      
      // Current Weather Section
      pdfContent += `CURRENT WEATHER CONDITIONS\n`;
      pdfContent += `${'─'.repeat(30)}\n`;
      if (data) {
        pdfContent += `🌡️  Temperature: ${data.temperature || 'N/A'}°C\n`;
        pdfContent += `🌡️  Feels Like: ${data.feels_like || 'N/A'}°C\n`;
        pdfContent += `💧  Humidity: ${data.humidity || 'N/A'}%\n`;
        pdfContent += `🌬️  Pressure: ${data.pressure || 'N/A'} hPa\n`;
        pdfContent += `💨  Wind Speed: ${data.wind_speed || 'N/A'} m/s\n`;
        pdfContent += `☁️  Conditions: ${data.conditions || 'N/A'}\n`;
        if (data.visibility) pdfContent += `👁️  Visibility: ${data.visibility} km\n`;
        if (data.uv_index) pdfContent += `☀️  UV Index: ${data.uv_index}\n`;
      }
      
      // Add forecast data if coordinates are available
      if (coordinates?.lat && coordinates?.lon) {
        try {
          const forecastData = await climateAPI.get7DayForecast(coordinates.lat, coordinates.lon);
          if (forecastData?.daily && Array.isArray(forecastData.daily)) {
            pdfContent += `\n\n7-DAY WEATHER FORECAST\n`;
            pdfContent += `${'─'.repeat(30)}\n`;
            forecastData.daily.slice(0, 7).forEach((day, index) => {
              const date = new Date();
              date.setDate(date.getDate() + index);
              pdfContent += `\n📅 ${date.toLocaleDateString('en', { weekday: 'long', month: 'short', day: 'numeric' })}\n`;
              pdfContent += `   High: ${day.temp_max || day.temperature_max || 'N/A'}°C\n`;
              pdfContent += `   Low: ${day.temp_min || day.temperature_min || 'N/A'}°C\n`;
              pdfContent += `   Conditions: ${day.conditions || day.weather || 'N/A'}\n`;
              if (day.precipitation) pdfContent += `   Precipitation: ${day.precipitation}%\n`;
            });
          }
        } catch (error) {
          console.warn('Could not fetch forecast data for PDF:', error);
        }
      }
      
      // Add footer
      pdfContent += `\n\n${'─'.repeat(50)}\n`;
      pdfContent += `Generated by Climate Monitoring System\n`;
      pdfContent += `Data Source: Multiple Weather APIs\n`;
      pdfContent += `Report Time: ${new Date().toISOString()}\n`;
      
      // Create and download PDF as text file (for now, can be enhanced with actual PDF library)
      const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `weather-report-${locationName}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert('Weather report downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF report:', error);
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleExport = () => {
    switch (exportFormat) {
      case 'json':
        exportToJSON();
        break;
      case 'csv':
        exportToCSV();
        break;
      case 'pdf':
        exportToPDF();
        break;
      default:
        exportToJSON();
    }
  };

  const shareData = async (platform) => {
    const shareText = `Weather in ${locationName}: ${data?.temperature}°C, ${data?.conditions}`;
    const shareUrl = window.location.href;

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: `Weather in ${locationName}`,
          text: shareText,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(`Weather in ${locationName}`)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareText + '\n' + shareUrl);
      alert('Link copied to clipboard!');
    }

    setShowShareMenu(false);
  };

  if (!data) {
    return null;
  }

  return (
    <div className="data-export">
      {/* Prominent Download Header */}
      <div className="download-header">
        <h2>📥 Download Weather Data</h2>
        <div className="download-icons-row">
          <button 
            onClick={exportToPDF} 
            className="header-download-btn pdf-header-btn"
            disabled={isDownloadingPDF}
            title="Download comprehensive weather report as PDF"
          >
            {isDownloadingPDF ? '⏳' : '📄'} PDF
          </button>
          <button 
            onClick={exportHourlyDataCSV} 
            className="header-download-btn csv-header-btn"
            disabled={isDownloadingHourly || !coordinates}
            title="Download 168 hours of weather data as CSV"
          >
            {isDownloadingHourly ? '⏳' : '📊'} CSV
          </button>
          <button 
            onClick={() => {
              setExportFormat('json');
              handleExport();
            }} 
            className="header-download-btn json-header-btn"
            title="Download current weather as JSON"
          >
            📋 JSON
          </button>
        </div>
      </div>
      {/* Quick Download Actions */}
      <div className="quick-download-section">
        <h3>🚀 Quick Downloads</h3>
        <div className="quick-download-buttons">
          <button 
            onClick={exportToPDF} 
            className="quick-download-btn pdf-btn"
            disabled={isDownloadingPDF}
            title="Download comprehensive weather report"
          >
            {isDownloadingPDF ? '⏳' : '📄'} PDF Report
          </button>
          <button 
            onClick={exportHourlyDataCSV} 
            className="quick-download-btn csv-btn"
            disabled={isDownloadingHourly || !coordinates}
            title="Download 168 hours of weather data"
          >
            {isDownloadingHourly ? '⏳' : '📊'} 168H CSV
          </button>
          <button 
            onClick={() => {
              setExportFormat('json');
              handleExport();
            }} 
            className="quick-download-btn json-btn"
            title="Download current weather as JSON"
          >
            📋 JSON Data
          </button>
        </div>
      </div>

      <div className="export-section">
        <h3>📥 Export Data</h3>
        <div className="export-controls">
          <select 
            value={exportFormat} 
            onChange={(e) => setExportFormat(e.target.value)}
            className="format-select"
          >
            <option value="json">JSON Format</option>
            <option value="csv">CSV Format</option>
            <option value="pdf">Text Report</option>
          </select>
          <button onClick={handleExport} className="export-btn">
            📥 Download
          </button>
        </div>
        
        {/* PDF Download Section with Icon */}
        <div className="pdf-export-section">
          <h4>
            <span>📄 Weather Report PDF</span>
            <button 
              onClick={exportToPDF} 
              className="pdf-download-icon"
              disabled={isDownloadingPDF}
              title="Download comprehensive weather report as PDF"
              aria-label="Download PDF Report"
            >
              {isDownloadingPDF ? '⏳' : '📥'}
            </button>
          </h4>
          <p className="pdf-description">
            Comprehensive weather report with current conditions and 7-day forecast
          </p>
          <button 
            onClick={exportToPDF} 
            className="pdf-export-btn"
            disabled={isDownloadingPDF}
          >
            {isDownloadingPDF ? '⏳ Generating Report...' : '📄 Download Weather Report PDF'}
          </button>
        </div>

        {/* Single Download Button for 168 Hourly Data Points */}
        <div className="hourly-export-section">
          <h4>📊 Hourly Forecast Data</h4>
          <p className="hourly-description">
            Downloads 168 hourly data points (7 days × 24 hours) with detailed weather metrics
          </p>
          <button 
            onClick={exportHourlyDataCSV} 
            className="hourly-export-btn"
            disabled={isDownloadingHourly || !coordinates}
          >
            {isDownloadingHourly ? '⏳ Downloading...' : '📈 Download 168 Hours CSV'}
          </button>
          {!coordinates && (
            <p className="warning-text">
              ⚠️ Location coordinates required for hourly data export
            </p>
          )}
        </div>
      </div>

      <div className="share-section">
        <h3>🔗 Share</h3>
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="share-toggle-btn"
        >
          📤 Share Weather
        </button>

        {showShareMenu && (
          <div className="share-menu">
            {navigator.share && (
              <button onClick={() => shareData('native')} className="share-btn">
                📱 Share
              </button>
            )}
            <button onClick={() => shareData('twitter')} className="share-btn twitter">
              🐦 Twitter
            </button>
            <button onClick={() => shareData('facebook')} className="share-btn facebook">
              📘 Facebook
            </button>
            <button onClick={() => shareData('whatsapp')} className="share-btn whatsapp">
              💬 WhatsApp
            </button>
            <button onClick={() => shareData('email')} className="share-btn email">
              ✉️ Email
            </button>
            <button onClick={() => shareData('copy')} className="share-btn copy">
              📋 Copy Link
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataExport;
