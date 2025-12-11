import React, { useState } from 'react';
import './CountrySelector.css'; // Reuse same styles

// Comprehensive cities database with coordinates
const citiesByState = {
  // India
  'Delhi': [
    { name: 'New Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Old Delhi', lat: 28.6562, lon: 77.2410 },
    { name: 'Dwarka', lat: 28.5921, lon: 77.0460 },
    { name: 'Gurgaon', lat: 28.4595, lon: 77.0266 },
    { name: 'Noida', lat: 28.5355, lon: 77.3910 }
  ],
  'Maharashtra': [
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Pune', lat: 18.5204, lon: 73.8567 },
    { name: 'Nagpur', lat: 21.1458, lon: 79.0882 },
    { name: 'Nashik', lat: 19.9975, lon: 73.7898 },
    { name: 'Aurangabad', lat: 19.8762, lon: 75.3433 }
  ],
  'Karnataka': [
    { name: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { name: 'Mysore', lat: 12.2958, lon: 76.6394 },
    { name: 'Hubli', lat: 15.3647, lon: 75.1240 },
    { name: 'Mangalore', lat: 12.9141, lon: 74.8560 }
  ],
  'Tamil Nadu': [
    { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { name: 'Coimbatore', lat: 11.0168, lon: 76.9558 },
    { name: 'Madurai', lat: 9.9252, lon: 78.1198 },
    { name: 'Salem', lat: 11.6643, lon: 78.1460 }
  ],
  'West Bengal': [
    { name: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { name: 'Howrah', lat: 22.5958, lon: 88.2636 },
    { name: 'Durgapur', lat: 23.5204, lon: 87.3119 }
  ],
  'Gujarat': [
    { name: 'Ahmedabad', lat: 23.0225, lon: 72.5714 },
    { name: 'Surat', lat: 21.1702, lon: 72.8311 },
    { name: 'Vadodara', lat: 22.3072, lon: 73.1812 },
    { name: 'Rajkot', lat: 22.3039, lon: 70.8022 }
  ],
  'Rajasthan': [
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    { name: 'Jodhpur', lat: 26.2389, lon: 73.0243 },
    { name: 'Udaipur', lat: 24.5854, lon: 73.7125 },
    { name: 'Kota', lat: 25.2138, lon: 75.8648 }
  ],
  'Punjab': [
    { name: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
    { name: 'Ludhiana', lat: 30.9010, lon: 75.8573 },
    { name: 'Amritsar', lat: 31.6340, lon: 74.8723 }
  ],
  'Uttar Pradesh': [
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
    { name: 'Kanpur', lat: 26.4499, lon: 80.3319 },
    { name: 'Agra', lat: 27.1767, lon: 78.0081 },
    { name: 'Varanasi', lat: 25.3176, lon: 82.9739 },
    { name: 'Allahabad', lat: 25.4358, lon: 81.8463 }
  ],
  'Haryana': [
    { name: 'Gurgaon', lat: 28.4595, lon: 77.0266 },
    { name: 'Faridabad', lat: 28.4089, lon: 77.3178 },
    { name: 'Panipat', lat: 29.3909, lon: 76.9635 }
  ],
  'Kerala': [
    { name: 'Kochi', lat: 9.9312, lon: 76.2673 },
    { name: 'Thiruvananthapuram', lat: 8.5241, lon: 76.9366 },
    { name: 'Kozhikode', lat: 11.2588, lon: 75.7804 }
  ],
  'Andhra Pradesh': [
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Visakhapatnam', lat: 17.6868, lon: 83.2185 },
    { name: 'Vijayawada', lat: 16.5062, lon: 80.6480 }
  ],
  'Telangana': [
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Warangal', lat: 17.9689, lon: 79.5941 },
    { name: 'Nizamabad', lat: 18.6725, lon: 78.0941 }
  ],

  // USA
  'California': [
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 },
    { name: 'San Francisco', lat: 37.7749, lon: -122.4194 },
    { name: 'San Diego', lat: 32.7157, lon: -117.1611 },
    { name: 'Sacramento', lat: 38.5816, lon: -121.4944 },
    { name: 'San Jose', lat: 37.3382, lon: -121.8863 },
    { name: 'Fresno', lat: 36.7378, lon: -119.7871 },
    { name: 'Oakland', lat: 37.8044, lon: -122.2712 }
  ],
  'New York': [
    { name: 'New York City', lat: 40.7128, lon: -74.0060 },
    { name: 'Buffalo', lat: 42.8864, lon: -78.6784 },
    { name: 'Rochester', lat: 43.1566, lon: -77.6088 },
    { name: 'Syracuse', lat: 43.0481, lon: -76.1474 },
    { name: 'Albany', lat: 42.6526, lon: -73.7562 }
  ],
  'Texas': [
    { name: 'Houston', lat: 29.7604, lon: -95.3698 },
    { name: 'Dallas', lat: 32.7767, lon: -96.7970 },
    { name: 'Austin', lat: 30.2672, lon: -97.7431 },
    { name: 'San Antonio', lat: 29.4241, lon: -98.4936 },
    { name: 'Fort Worth', lat: 32.7555, lon: -97.3308 },
    { name: 'El Paso', lat: 31.7619, lon: -106.4850 }
  ],
  'Florida': [
    { name: 'Miami', lat: 25.7617, lon: -80.1918 },
    { name: 'Orlando', lat: 28.5383, lon: -81.3792 },
    { name: 'Tampa', lat: 27.9506, lon: -82.4572 },
    { name: 'Jacksonville', lat: 30.3322, lon: -81.6557 },
    { name: 'Tallahassee', lat: 30.4518, lon: -84.2807 }
  ],
  'Illinois': [
    { name: 'Chicago', lat: 41.8781, lon: -87.6298 },
    { name: 'Springfield', lat: 39.7817, lon: -89.6501 },
    { name: 'Rockford', lat: 42.2711, lon: -89.0940 },
    { name: 'Peoria', lat: 40.6936, lon: -89.5890 }
  ],
  'Pennsylvania': [
    { name: 'Philadelphia', lat: 39.9526, lon: -75.1652 },
    { name: 'Pittsburgh', lat: 40.4406, lon: -79.9959 },
    { name: 'Harrisburg', lat: 40.2732, lon: -76.8839 }
  ],
  'Ohio': [
    { name: 'Columbus', lat: 39.9612, lon: -82.9988 },
    { name: 'Cleveland', lat: 41.4993, lon: -81.6944 },
    { name: 'Cincinnati', lat: 39.1031, lon: -84.5120 }
  ],
  'Georgia': [
    { name: 'Atlanta', lat: 33.7490, lon: -84.3880 },
    { name: 'Savannah', lat: 32.0835, lon: -81.0998 },
    { name: 'Augusta', lat: 33.4735, lon: -82.0105 }
  ],
  'North Carolina': [
    { name: 'Charlotte', lat: 35.2271, lon: -80.8431 },
    { name: 'Raleigh', lat: 35.7796, lon: -78.6382 },
    { name: 'Greensboro', lat: 36.0726, lon: -79.7920 }
  ],
  'Michigan': [
    { name: 'Detroit', lat: 42.3314, lon: -83.0458 },
    { name: 'Grand Rapids', lat: 42.9634, lon: -85.6681 },
    { name: 'Lansing', lat: 42.3314, lon: -84.5467 }
  ],
  'Washington': [
    { name: 'Seattle', lat: 47.6062, lon: -122.3321 },
    { name: 'Spokane', lat: 47.6588, lon: -117.4260 },
    { name: 'Tacoma', lat: 47.2529, lon: -122.4443 }
  ],

  // UK
  'England': [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Manchester', lat: 53.4808, lon: -2.2426 },
    { name: 'Birmingham', lat: 52.4862, lon: -1.8904 },
    { name: 'Liverpool', lat: 53.4084, lon: -2.9916 },
    { name: 'Leeds', lat: 53.8008, lon: -1.5491 },
    { name: 'Sheffield', lat: 53.3811, lon: -1.4701 },
    { name: 'Bristol', lat: 51.4545, lon: -2.5879 },
    { name: 'Newcastle', lat: 54.9783, lon: -1.6178 }
  ],
  'Scotland': [
    { name: 'Edinburgh', lat: 55.9533, lon: -3.1883 },
    { name: 'Glasgow', lat: 55.8642, lon: -4.2518 },
    { name: 'Aberdeen', lat: 57.1497, lon: -2.0943 },
    { name: 'Dundee', lat: 56.4620, lon: -2.9707 }
  ],
  'Wales': [
    { name: 'Cardiff', lat: 51.4816, lon: -3.1791 },
    { name: 'Swansea', lat: 51.6214, lon: -3.9436 },
    { name: 'Newport', lat: 51.5842, lon: -2.9977 }
  ],
  'Northern Ireland': [
    { name: 'Belfast', lat: 54.5973, lon: -5.9301 },
    { name: 'Derry', lat: 54.9966, lon: -7.3086 }
  ],

  // Japan
  'Tokyo': [
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Shibuya', lat: 35.6595, lon: 139.7004 },
    { name: 'Shinjuku', lat: 35.6938, lon: 139.7034 },
    { name: 'Harajuku', lat: 35.6702, lon: 139.7026 }
  ],
  'Osaka': [
    { name: 'Osaka', lat: 34.6937, lon: 135.5023 },
    { name: 'Kyoto', lat: 35.0116, lon: 135.7681 },
    { name: 'Kobe', lat: 34.6901, lon: 135.1956 }
  ],
  'Kanagawa': [
    { name: 'Yokohama', lat: 35.4437, lon: 139.6380 },
    { name: 'Kawasaki', lat: 35.5308, lon: 139.7029 }
  ],

  // Germany
  'Bavaria': [
    { name: 'Munich', lat: 48.1351, lon: 11.5820 },
    { name: 'Nuremberg', lat: 49.4521, lon: 11.0767 },
    { name: 'Augsburg', lat: 48.3705, lon: 10.8978 }
  ],
  'North Rhine-Westphalia': [
    { name: 'Cologne', lat: 50.9375, lon: 6.9603 },
    { name: 'Düsseldorf', lat: 51.2277, lon: 6.7735 },
    { name: 'Dortmund', lat: 51.5136, lon: 7.4653 }
  ],
  'Berlin': [
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 }
  ],
  'Hamburg': [
    { name: 'Hamburg', lat: 53.5511, lon: 9.9937 }
  ],

  // France
  'Île-de-France': [
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Versailles', lat: 48.8014, lon: 2.1301 }
  ],
  'Provence-Alpes-Côte d\'Azur': [
    { name: 'Marseille', lat: 43.2965, lon: 5.3698 },
    { name: 'Nice', lat: 43.7102, lon: 7.2620 },
    { name: 'Cannes', lat: 43.5528, lon: 7.0174 }
  ],
  'Auvergne-Rhône-Alpes': [
    { name: 'Lyon', lat: 45.7640, lon: 4.8357 },
    { name: 'Grenoble', lat: 45.1885, lon: 5.7245 }
  ],

  // Canada
  'Ontario': [
    { name: 'Toronto', lat: 43.6532, lon: -79.3832 },
    { name: 'Ottawa', lat: 45.4215, lon: -75.6972 },
    { name: 'Hamilton', lat: 43.2557, lon: -79.8711 }
  ],
  'Quebec': [
    { name: 'Montreal', lat: 45.5017, lon: -73.5673 },
    { name: 'Quebec City', lat: 46.8139, lon: -71.2080 }
  ],
  'British Columbia': [
    { name: 'Vancouver', lat: 49.2827, lon: -123.1207 },
    { name: 'Victoria', lat: 48.4284, lon: -123.3656 }
  ],
  'Alberta': [
    { name: 'Calgary', lat: 51.0447, lon: -114.0719 },
    { name: 'Edmonton', lat: 53.5461, lon: -113.4938 }
  ],

  // Australia
  'New South Wales': [
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Newcastle', lat: -32.9283, lon: 151.7817 },
    { name: 'Wollongong', lat: -34.4278, lon: 150.8931 }
  ],
  'Victoria': [
    { name: 'Melbourne', lat: -37.8136, lon: 144.9631 },
    { name: 'Geelong', lat: -38.1499, lon: 144.3617 }
  ],
  'Queensland': [
    { name: 'Brisbane', lat: -27.4698, lon: 153.0251 },
    { name: 'Gold Coast', lat: -28.0167, lon: 153.4000 },
    { name: 'Cairns', lat: -16.9186, lon: 145.7781 }
  ],
  'Western Australia': [
    { name: 'Perth', lat: -31.9505, lon: 115.8605 },
    { name: 'Fremantle', lat: -32.0569, lon: 115.7439 }
  ],
  'South Australia': [
    { name: 'Adelaide', lat: -34.9285, lon: 138.6007 }
  ],

  // China
  'Beijing': [
    { name: 'Beijing', lat: 39.9042, lon: 116.4074 }
  ],
  'Shanghai': [
    { name: 'Shanghai', lat: 31.2304, lon: 121.4737 }
  ],
  'Guangdong': [
    { name: 'Guangzhou', lat: 23.1291, lon: 113.2644 },
    { name: 'Shenzhen', lat: 22.5431, lon: 114.0579 }
  ],

  // Brazil
  'São Paulo': [
    { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
    { name: 'Campinas', lat: -22.9099, lon: -47.0626 }
  ],
  'Rio de Janeiro': [
    { name: 'Rio de Janeiro', lat: -22.9068, lon: -43.1729 },
    { name: 'Niterói', lat: -22.8833, lon: -43.1036 }
  ],

  // Default cities for states without specific data
  'default': [
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Paris', lat: 48.8566, lon: 2.3522 },
    { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Berlin', lat: 52.5200, lon: 13.4050 },
    { name: 'Toronto', lat: 43.6532, lon: -79.3832 }
  ]
};

function CitySelector({ state, onSelectCity, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');
  const cities = citiesByState[state] || citiesByState['default'];

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-selector">
      <div className="selector-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h2>Select City in {state}</h2>
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="country-grid">
        {filteredCities.map(city => (
          <div
            key={city.name}
            className="country-card"
            onClick={() => onSelectCity(city)}
          >
            <h3>{city.name}</h3>
            <p style={{ margin: '0.5rem 0 0', color: '#666', fontSize: '0.9rem' }}>
              {city.lat.toFixed(4)}°, {city.lon.toFixed(4)}°
            </p>
          </div>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="no-results">
          <p>No cities found matching "{searchTerm}"</p>
          <p>Try searching for a different city name.</p>
        </div>
      )}
    </div>
  );
}

export default CitySelector;