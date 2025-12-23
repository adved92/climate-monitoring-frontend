// COMPREHENSIVE GLOBAL LOCATION DATA - ALL COUNTRIES, STATES, CITIES
export const locationData = {
  zones: [
    {
      id: 'north-america',
      name: 'North America',
      icon: '🌎',
      description: 'United States, Canada, Mexico'
    },
    {
      id: 'europe',
      name: 'Europe',
      icon: '🇪🇺',
      description: 'European Union and surrounding countries'
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      icon: '🌏',
      description: 'East Asia, Southeast Asia, Oceania'
    },
    {
      id: 'south-america',
      name: 'South America',
      icon: '🌎',
      description: 'Brazil, Argentina, Chile and more'
    },
    {
      id: 'africa',
      name: 'Africa',
      icon: '🌍',
      description: 'Northern, Eastern, Western, Southern Africa'
    },
    {
      id: 'middle-east',
      name: 'Middle East',
      icon: '🕌',
      description: 'Gulf states, Levant, Turkey'
    }
  ],
  countries: {
    'north-america': [
      { id: 'us', name: 'United States', icon: '🇺🇸', description: '50 states and territories' },
      { id: 'ca', name: 'Canada', icon: '🇨🇦', description: '10 provinces and 3 territories' },
      { id: 'mx', name: 'Mexico', icon: '🇲🇽', description: '32 federal entities' },
      { id: 'gt', name: 'Guatemala', icon: '🇬🇹', description: '22 departments' },
      { id: 'bz', name: 'Belize', icon: '🇧🇿', description: '6 districts' },
      { id: 'sv', name: 'El Salvador', icon: '🇸🇻', description: '14 departments' },
      { id: 'hn', name: 'Honduras', icon: '🇭🇳', description: '18 departments' },
      { id: 'ni', name: 'Nicaragua', icon: '🇳🇮', description: '15 departments' },
      { id: 'cr', name: 'Costa Rica', icon: '🇨🇷', description: '7 provinces' },
      { id: 'pa', name: 'Panama', icon: '🇵🇦', description: '10 provinces' },
      { id: 'cu', name: 'Cuba', icon: '🇨🇺', description: '15 provinces' },
      { id: 'jm', name: 'Jamaica', icon: '🇯🇲', description: '14 parishes' },
      { id: 'ht', name: 'Haiti', icon: '🇭🇹', description: '10 departments' },
      { id: 'do', name: 'Dominican Republic', icon: '🇩🇴', description: '31 provinces' },
      { id: 'pr', name: 'Puerto Rico', icon: '🇵🇷', description: '78 municipalities' },
      { id: 'tt', name: 'Trinidad and Tobago', icon: '🇹🇹', description: '14 regions' },
      { id: 'bb', name: 'Barbados', icon: '🇧🇧', description: '11 parishes' },
      { id: 'gd', name: 'Grenada', icon: '🇬🇩', description: '6 parishes' },
      { id: 'vc', name: 'Saint Vincent and the Grenadines', icon: '🇻🇨', description: '6 parishes' },
      { id: 'lc', name: 'Saint Lucia', icon: '🇱🇨', description: '11 quarters' },
      { id: 'dm', name: 'Dominica', icon: '🇩🇲', description: '10 parishes' },
      { id: 'ag', name: 'Antigua and Barbuda', icon: '🇦🇬', description: '6 parishes' },
      { id: 'kn', name: 'Saint Kitts and Nevis', icon: '🇰🇳', description: '14 parishes' },
      { id: 'bs', name: 'Bahamas', icon: '🇧🇸', description: '32 districts' },
      { id: 'gl', name: 'Greenland', icon: '🇬🇱', description: '5 municipalities' }
    ],
    'europe': [
      { id: 'gb', name: 'United Kingdom', icon: '🇬🇧', description: 'England, Scotland, Wales, N. Ireland' },
      { id: 'de', name: 'Germany', icon: '🇩🇪', description: '16 federal states' },
      { id: 'fr', name: 'France', icon: '🇫🇷', description: '18 regions' },
      { id: 'it', name: 'Italy', icon: '🇮🇹', description: '20 regions' },
      { id: 'es', name: 'Spain', icon: '🇪🇸', description: '17 autonomous communities' },
      { id: 'nl', name: 'Netherlands', icon: '🇳🇱', description: '12 provinces' },
      { id: 'be', name: 'Belgium', icon: '🇧🇪', description: '3 regions' },
      { id: 'ch', name: 'Switzerland', icon: '🇨🇭', description: '26 cantons' },
      { id: 'at', name: 'Austria', icon: '🇦🇹', description: '9 federal states' },
      { id: 'se', name: 'Sweden', icon: '🇸🇪', description: '21 counties' },
      { id: 'no', name: 'Norway', icon: '🇳🇴', description: '11 counties' },
      { id: 'dk', name: 'Denmark', icon: '🇩🇰', description: '5 regions' },
      { id: 'fi', name: 'Finland', icon: '🇫🇮', description: '19 regions' },
      { id: 'pl', name: 'Poland', icon: '🇵🇱', description: '16 voivodeships' },
      { id: 'cz', name: 'Czech Republic', icon: '🇨🇿', description: '14 regions' },
      { id: 'hu', name: 'Hungary', icon: '🇭🇺', description: '19 counties' },
      { id: 'ro', name: 'Romania', icon: '🇷🇴', description: '42 counties' },
      { id: 'bg', name: 'Bulgaria', icon: '🇧🇬', description: '28 provinces' },
      { id: 'gr', name: 'Greece', icon: '🇬🇷', description: '13 regions' },
      { id: 'pt', name: 'Portugal', icon: '🇵🇹', description: '18 districts' },
      { id: 'ie', name: 'Ireland', icon: '🇮🇪', description: '26 counties' },
      { id: 'ru', name: 'Russia', icon: '🇷🇺', description: '85 federal subjects' },
      { id: 'ua', name: 'Ukraine', icon: '🇺🇦', description: '24 oblasts' },
      { id: 'by', name: 'Belarus', icon: '🇧🇾', description: '6 regions' },
      { id: 'lt', name: 'Lithuania', icon: '🇱🇹', description: '10 counties' },
      { id: 'lv', name: 'Latvia', icon: '🇱🇻', description: '5 regions' },
      { id: 'ee', name: 'Estonia', icon: '🇪🇪', description: '15 counties' },
      { id: 'sk', name: 'Slovakia', icon: '🇸🇰', description: '8 regions' },
      { id: 'si', name: 'Slovenia', icon: '🇸🇮', description: '12 regions' },
      { id: 'hr', name: 'Croatia', icon: '🇭🇷', description: '21 counties' },
      { id: 'ba', name: 'Bosnia and Herzegovina', icon: '🇧🇦', description: '3 main regions' },
      { id: 'rs', name: 'Serbia', icon: '🇷🇸', description: '29 districts' },
      { id: 'me', name: 'Montenegro', icon: '🇲🇪', description: '23 municipalities' },
      { id: 'mk', name: 'North Macedonia', icon: '🇲🇰', description: '8 regions' },
      { id: 'al', name: 'Albania', icon: '🇦🇱', description: '12 counties' },
      { id: 'xk', name: 'Kosovo', icon: '🇽🇰', description: '7 districts' },
      { id: 'md', name: 'Moldova', icon: '🇲🇩', description: '32 districts' },
      { id: 'is', name: 'Iceland', icon: '🇮🇸', description: '8 regions' },
      { id: 'lu', name: 'Luxembourg', icon: '🇱🇺', description: '3 districts' },
      { id: 'mt', name: 'Malta', icon: '🇲🇹', description: '6 districts' },
      { id: 'cy', name: 'Cyprus', icon: '🇨🇾', description: '6 districts' },
      { id: 'mc', name: 'Monaco', icon: '🇲🇨', description: '4 quarters' },
      { id: 'ad', name: 'Andorra', icon: '🇦🇩', description: '7 parishes' },
      { id: 'sm', name: 'San Marino', icon: '🇸🇲', description: '9 municipalities' },
      { id: 'va', name: 'Vatican City', icon: '🇻🇦', description: 'Papal state' },
      { id: 'li', name: 'Liechtenstein', icon: '🇱🇮', description: '11 municipalities' }
    ],
    'asia-pacific': [
      { id: 'jp', name: 'Japan', icon: '🇯🇵', description: '47 prefectures' },
      { id: 'cn', name: 'China', icon: '🇨🇳', description: '34 provincial divisions' },
      { id: 'au', name: 'Australia', icon: '🇦🇺', description: '8 states and territories' },
      { id: 'in', name: 'India', icon: '🇮🇳', description: '28 states and 8 union territories' },
      { id: 'kr', name: 'South Korea', icon: '🇰🇷', description: '17 provinces and cities' },
      { id: 'kp', name: 'North Korea', icon: '🇰🇵', description: '9 provinces' },
      { id: 'th', name: 'Thailand', icon: '🇹🇭', description: '77 provinces' },
      { id: 'vn', name: 'Vietnam', icon: '🇻🇳', description: '63 provinces' },
      { id: 'my', name: 'Malaysia', icon: '🇲🇾', description: '13 states and 3 territories' },
      { id: 'sg', name: 'Singapore', icon: '🇸🇬', description: '5 districts' },
      { id: 'id', name: 'Indonesia', icon: '🇮🇩', description: '34 provinces' },
      { id: 'ph', name: 'Philippines', icon: '🇵🇭', description: '81 provinces' },
      { id: 'nz', name: 'New Zealand', icon: '🇳🇿', description: '16 regions' },
      { id: 'tw', name: 'Taiwan', icon: '🇹🇼', description: '22 counties and cities' },
      { id: 'hk', name: 'Hong Kong', icon: '🇭🇰', description: '18 districts' },
      { id: 'mo', name: 'Macau', icon: '🇲🇴', description: '2 municipalities' },
      { id: 'pk', name: 'Pakistan', icon: '🇵🇰', description: '4 provinces' },
      { id: 'bd', name: 'Bangladesh', icon: '🇧🇩', description: '8 divisions' },
      { id: 'lk', name: 'Sri Lanka', icon: '🇱🇰', description: '9 provinces' },
      { id: 'np', name: 'Nepal', icon: '🇳🇵', description: '7 provinces' },
      { id: 'bt', name: 'Bhutan', icon: '🇧🇹', description: '20 districts' },
      { id: 'mv', name: 'Maldives', icon: '🇲🇻', description: '26 atolls' },
      { id: 'af', name: 'Afghanistan', icon: '🇦🇫', description: '34 provinces' },
      { id: 'mm', name: 'Myanmar', icon: '🇲🇲', description: '14 states and regions' },
      { id: 'kh', name: 'Cambodia', icon: '🇰🇭', description: '25 provinces' },
      { id: 'la', name: 'Laos', icon: '🇱🇦', description: '18 provinces' },
      { id: 'bn', name: 'Brunei', icon: '🇧🇳', description: '4 districts' },
      { id: 'tl', name: 'East Timor', icon: '🇹🇱', description: '13 municipalities' },
      { id: 'mn', name: 'Mongolia', icon: '🇲🇳', description: '21 provinces' },
      { id: 'kz', name: 'Kazakhstan', icon: '🇰🇿', description: '17 regions' },
      { id: 'kg', name: 'Kyrgyzstan', icon: '🇰🇬', description: '7 regions' },
      { id: 'tj', name: 'Tajikistan', icon: '🇹🇯', description: '4 regions' },
      { id: 'tm', name: 'Turkmenistan', icon: '🇹🇲', description: '5 regions' },
      { id: 'uz', name: 'Uzbekistan', icon: '🇺🇿', description: '12 regions' },
      { id: 'fj', name: 'Fiji', icon: '🇫🇯', description: '4 divisions' },
      { id: 'pg', name: 'Papua New Guinea', icon: '🇵🇬', description: '22 provinces' },
      { id: 'sb', name: 'Solomon Islands', icon: '🇸🇧', description: '9 provinces' },
      { id: 'vu', name: 'Vanuatu', icon: '🇻🇺', description: '6 provinces' },
      { id: 'nc', name: 'New Caledonia', icon: '🇳🇨', description: '3 provinces' },
      { id: 'pf', name: 'French Polynesia', icon: '🇵🇫', description: '5 archipelagos' },
      { id: 'ws', name: 'Samoa', icon: '🇼🇸', description: '11 districts' },
      { id: 'to', name: 'Tonga', icon: '🇹🇴', description: '5 divisions' },
      { id: 'ki', name: 'Kiribati', icon: '🇰🇮', description: '3 groups' },
      { id: 'tv', name: 'Tuvalu', icon: '🇹🇻', description: '8 islands' },
      { id: 'nr', name: 'Nauru', icon: '🇳🇷', description: '14 districts' },
      { id: 'pw', name: 'Palau', icon: '🇵🇼', description: '16 states' },
      { id: 'fm', name: 'Micronesia', icon: '🇫🇲', description: '4 states' },
      { id: 'mh', name: 'Marshall Islands', icon: '🇲🇭', description: '24 municipalities' }
    ],
    'south-america': [
      { id: 'br', name: 'Brazil', icon: '🇧🇷', description: '26 states and 1 federal district' },
      { id: 'ar', name: 'Argentina', icon: '🇦🇷', description: '23 provinces and 1 autonomous city' },
      { id: 'cl', name: 'Chile', icon: '🇨🇱', description: '16 regions' },
      { id: 'co', name: 'Colombia', icon: '🇨🇴', description: '32 departments' },
      { id: 'pe', name: 'Peru', icon: '🇵🇪', description: '25 regions' },
      { id: 've', name: 'Venezuela', icon: '🇻🇪', description: '23 states' },
      { id: 'ec', name: 'Ecuador', icon: '🇪🇨', description: '24 provinces' },
      { id: 'bo', name: 'Bolivia', icon: '🇧🇴', description: '9 departments' },
      { id: 'py', name: 'Paraguay', icon: '🇵🇾', description: '17 departments' },
      { id: 'uy', name: 'Uruguay', icon: '🇺🇾', description: '19 departments' },
      { id: 'gy', name: 'Guyana', icon: '🇬🇾', description: '10 regions' },
      { id: 'sr', name: 'Suriname', icon: '🇸🇷', description: '10 districts' },
      { id: 'gf', name: 'French Guiana', icon: '🇬🇫', description: '2 arrondissements' },
      { id: 'fk', name: 'Falkland Islands', icon: '🇫🇰', description: '2 main islands' }
    ],
    'africa': [
      { id: 'za', name: 'South Africa', icon: '🇿🇦', description: '9 provinces' },
      { id: 'ng', name: 'Nigeria', icon: '🇳🇬', description: '36 states' },
      { id: 'eg', name: 'Egypt', icon: '🇪🇬', description: '27 governorates' },
      { id: 'ke', name: 'Kenya', icon: '🇰🇪', description: '47 counties' },
      { id: 'et', name: 'Ethiopia', icon: '🇪🇹', description: '11 regions' },
      { id: 'gh', name: 'Ghana', icon: '🇬🇭', description: '16 regions' },
      { id: 'tz', name: 'Tanzania', icon: '🇹🇿', description: '31 regions' },
      { id: 'ug', name: 'Uganda', icon: '🇺🇬', description: '134 districts' },
      { id: 'dz', name: 'Algeria', icon: '🇩🇿', description: '58 provinces' },
      { id: 'ma', name: 'Morocco', icon: '🇲🇦', description: '12 regions' },
      { id: 'tn', name: 'Tunisia', icon: '🇹🇳', description: '24 governorates' },
      { id: 'ly', name: 'Libya', icon: '🇱🇾', description: '22 districts' },
      { id: 'sd', name: 'Sudan', icon: '🇸🇩', description: '18 states' },
      { id: 'ss', name: 'South Sudan', icon: '🇸🇸', description: '10 states' },
      { id: 'mz', name: 'Mozambique', icon: '🇲🇿', description: '11 provinces' },
      { id: 'zw', name: 'Zimbabwe', icon: '🇿🇼', description: '10 provinces' },
      { id: 'bw', name: 'Botswana', icon: '🇧🇼', description: '10 districts' },
      { id: 'na', name: 'Namibia', icon: '🇳🇦', description: '14 regions' },
      { id: 'zm', name: 'Zambia', icon: '🇿🇲', description: '10 provinces' },
      { id: 'ao', name: 'Angola', icon: '🇦🇴', description: '18 provinces' },
      { id: 'cd', name: 'Democratic Republic of Congo', icon: '🇨🇩', description: '26 provinces' },
      { id: 'cg', name: 'Republic of Congo', icon: '🇨🇬', description: '12 departments' },
      { id: 'cm', name: 'Cameroon', icon: '🇨🇲', description: '10 regions' },
      { id: 'cf', name: 'Central African Republic', icon: '🇨🇫', description: '14 prefectures' },
      { id: 'td', name: 'Chad', icon: '🇹🇩', description: '23 regions' },
      { id: 'ne', name: 'Niger', icon: '🇳🇪', description: '8 regions' },
      { id: 'ml', name: 'Mali', icon: '🇲🇱', description: '10 regions' },
      { id: 'bf', name: 'Burkina Faso', icon: '🇧🇫', description: '13 regions' },
      { id: 'ci', name: 'Ivory Coast', icon: '🇨🇮', description: '14 districts' },
      { id: 'lr', name: 'Liberia', icon: '🇱🇷', description: '15 counties' },
      { id: 'sl', name: 'Sierra Leone', icon: '🇸🇱', description: '5 regions' },
      { id: 'gn', name: 'Guinea', icon: '🇬🇳', description: '8 regions' },
      { id: 'gw', name: 'Guinea-Bissau', icon: '🇬🇼', description: '9 regions' },
      { id: 'sn', name: 'Senegal', icon: '🇸🇳', description: '14 regions' },
      { id: 'gm', name: 'Gambia', icon: '🇬🇲', description: '6 divisions' },
      { id: 'cv', name: 'Cape Verde', icon: '🇨🇻', description: '22 municipalities' },
      { id: 'mr', name: 'Mauritania', icon: '🇲🇷', description: '15 regions' },
      { id: 'eh', name: 'Western Sahara', icon: '🇪🇭', description: 'Disputed territory' },
      { id: 'er', name: 'Eritrea', icon: '🇪🇷', description: '6 regions' },
      { id: 'dj', name: 'Djibouti', icon: '🇩🇯', description: '6 regions' },
      { id: 'so', name: 'Somalia', icon: '🇸🇴', description: '18 regions' },
      { id: 'rw', name: 'Rwanda', icon: '🇷🇼', description: '5 provinces' },
      { id: 'bi', name: 'Burundi', icon: '🇧🇮', description: '18 provinces' },
      { id: 'mw', name: 'Malawi', icon: '🇲🇼', description: '28 districts' },
      { id: 'mg', name: 'Madagascar', icon: '🇲🇬', description: '22 regions' },
      { id: 'mu', name: 'Mauritius', icon: '🇲🇺', description: '9 districts' },
      { id: 'sc', name: 'Seychelles', icon: '🇸🇨', description: '26 districts' },
      { id: 'km', name: 'Comoros', icon: '🇰🇲', description: '3 islands' },
      { id: 'sz', name: 'Eswatini', icon: '🇸🇿', description: '4 regions' },
      { id: 'ls', name: 'Lesotho', icon: '🇱🇸', description: '10 districts' },
      { id: 'ga', name: 'Gabon', icon: '🇬🇦', description: '9 provinces' },
      { id: 'gq', name: 'Equatorial Guinea', icon: '🇬🇶', description: '8 provinces' },
      { id: 'st', name: 'São Tomé and Príncipe', icon: '🇸🇹', description: '7 districts' },
      { id: 'tg', name: 'Togo', icon: '🇹🇬', description: '5 regions' },
      { id: 'bj', name: 'Benin', icon: '🇧🇯', description: '12 departments' }
    ],
    'middle-east': [
      { id: 'sa', name: 'Saudi Arabia', icon: '🇸🇦', description: '13 provinces' },
      { id: 'ae', name: 'United Arab Emirates', icon: '🇦🇪', description: '7 emirates' },
      { id: 'qa', name: 'Qatar', icon: '🇶🇦', description: '8 municipalities' },
      { id: 'kw', name: 'Kuwait', icon: '🇰🇼', description: '6 governorates' },
      { id: 'bh', name: 'Bahrain', icon: '🇧🇭', description: '4 governorates' },
      { id: 'om', name: 'Oman', icon: '🇴🇲', description: '11 governorates' },
      { id: 'jo', name: 'Jordan', icon: '🇯🇴', description: '12 governorates' },
      { id: 'lb', name: 'Lebanon', icon: '🇱🇧', description: '8 governorates' },
      { id: 'sy', name: 'Syria', icon: '🇸🇾', description: '14 governorates' },
      { id: 'iq', name: 'Iraq', icon: '🇮🇶', description: '19 governorates' },
      { id: 'ir', name: 'Iran', icon: '🇮🇷', description: '31 provinces' },
      { id: 'tr', name: 'Turkey', icon: '🇹🇷', description: '81 provinces' },
      { id: 'il', name: 'Israel', icon: '🇮🇱', description: '6 districts' },
      { id: 'ps', name: 'Palestine', icon: '🇵🇸', description: '16 governorates' },
      { id: 'ye', name: 'Yemen', icon: '🇾🇪', description: '22 governorates' }
    ]
  },
  states: {
    // NORTH AMERICA
    'us': [
      { id: 'ca', name: 'California', icon: '☀️', description: 'Los Angeles, San Francisco, San Diego' },
      { id: 'ny', name: 'New York', icon: '🗽', description: 'New York City, Buffalo, Rochester' },
      { id: 'tx', name: 'Texas', icon: '🤠', description: 'Houston, Dallas, Austin' },
      { id: 'fl', name: 'Florida', icon: '🏖️', description: 'Miami, Orlando, Tampa' },
      { id: 'il', name: 'Illinois', icon: '🏙️', description: 'Chicago, Springfield, Rockford' },
      { id: 'pa', name: 'Pennsylvania', icon: '🔔', description: 'Philadelphia, Pittsburgh, Allentown' },
      { id: 'oh', name: 'Ohio', icon: '🌽', description: 'Columbus, Cleveland, Cincinnati' },
      { id: 'ga', name: 'Georgia', icon: '🍑', description: 'Atlanta, Augusta, Savannah' },
      { id: 'nc', name: 'North Carolina', icon: '🏔️', description: 'Charlotte, Raleigh, Greensboro' },
      { id: 'mi', name: 'Michigan', icon: '🚗', description: 'Detroit, Grand Rapids, Warren' }
    ],
    'ca': [
      { id: 'on', name: 'Ontario', icon: '🍁', description: 'Toronto, Ottawa, Hamilton' },
      { id: 'qc', name: 'Quebec', icon: '⚜️', description: 'Montreal, Quebec City, Laval' },
      { id: 'bc', name: 'British Columbia', icon: '🏔️', description: 'Vancouver, Victoria, Surrey' },
      { id: 'ab', name: 'Alberta', icon: '🛢️', description: 'Calgary, Edmonton, Red Deer' },
      { id: 'mb', name: 'Manitoba', icon: '🌾', description: 'Winnipeg, Brandon, Steinbach' },
      { id: 'sk', name: 'Saskatchewan', icon: '🌾', description: 'Saskatoon, Regina, Prince Albert' },
      { id: 'ns', name: 'Nova Scotia', icon: '🦞', description: 'Halifax, Sydney, Dartmouth' },
      { id: 'nb', name: 'New Brunswick', icon: '🦞', description: 'Saint John, Moncton, Fredericton' }
    ],
    'mx': [
      { id: 'cdmx', name: 'Mexico City', icon: '🏛️', description: 'Federal District' },
      { id: 'jal', name: 'Jalisco', icon: '🌶️', description: 'Guadalajara, Zapopan, Tlaquepaque' },
      { id: 'nl', name: 'Nuevo León', icon: '🏭', description: 'Monterrey, Guadalupe, San Nicolás' },
      { id: 'pue', name: 'Puebla', icon: '🏺', description: 'Puebla, Tehuacán, Atlixco' },
      { id: 'gto', name: 'Guanajuato', icon: '⛏️', description: 'León, Irapuato, Celaya' },
      { id: 'ver', name: 'Veracruz', icon: '🏖️', description: 'Veracruz, Xalapa, Coatzacoalcos' }
    ],

    // EUROPE
    'gb': [
      { id: 'england', name: 'England', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', description: 'London, Manchester, Birmingham' },
      { id: 'scotland', name: 'Scotland', icon: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', description: 'Edinburgh, Glasgow, Aberdeen' },
      { id: 'wales', name: 'Wales', icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', description: 'Cardiff, Swansea, Newport' },
      { id: 'northern-ireland', name: 'Northern Ireland', icon: '🍀', description: 'Belfast, Derry, Lisburn' }
    ],
    'de': [
      { id: 'nw', name: 'North Rhine-Westphalia', icon: '🏭', description: 'Cologne, Düsseldorf, Dortmund' },
      { id: 'by', name: 'Bavaria', icon: '🍺', description: 'Munich, Nuremberg, Augsburg' },
      { id: 'bw', name: 'Baden-Württemberg', icon: '🚗', description: 'Stuttgart, Mannheim, Karlsruhe' },
      { id: 'ni', name: 'Lower Saxony', icon: '🌾', description: 'Hanover, Braunschweig, Oldenburg' },
      { id: 'he', name: 'Hesse', icon: '🏦', description: 'Frankfurt, Wiesbaden, Kassel' },
      { id: 'sn', name: 'Saxony', icon: '🏰', description: 'Dresden, Leipzig, Chemnitz' }
    ],
    'fr': [
      { id: 'idf', name: 'Île-de-France', icon: '🗼', description: 'Paris, Boulogne, Saint-Denis' },
      { id: 'ara', name: 'Auvergne-Rhône-Alpes', icon: '🏔️', description: 'Lyon, Grenoble, Saint-Étienne' },
      { id: 'occ', name: 'Occitanie', icon: '🍷', description: 'Toulouse, Montpellier, Nîmes' },
      { id: 'naq', name: 'Nouvelle-Aquitaine', icon: '🍷', description: 'Bordeaux, Limoges, Poitiers' },
      { id: 'hdf', name: 'Hauts-de-France', icon: '🏭', description: 'Lille, Amiens, Roubaix' },
      { id: 'pac', name: 'Provence-Alpes-Côte d\'Azur', icon: '🌊', description: 'Marseille, Nice, Toulon' }
    ],
    'it': [
      { id: 'lom', name: 'Lombardy', icon: '🏭', description: 'Milan, Bergamo, Brescia' },
      { id: 'laz', name: 'Lazio', icon: '🏛️', description: 'Rome, Latina, Frosinone' },
      { id: 'cam', name: 'Campania', icon: '🌋', description: 'Naples, Salerno, Caserta' },
      { id: 'sic', name: 'Sicily', icon: '🌋', description: 'Palermo, Catania, Messina' },
      { id: 'ven', name: 'Veneto', icon: '🚤', description: 'Venice, Verona, Padua' },
      { id: 'pie', name: 'Piedmont', icon: '🍷', description: 'Turin, Novara, Alessandria' }
    ],
    'es': [
      { id: 'mad', name: 'Madrid', icon: '👑', description: 'Madrid, Móstoles, Alcalá' },
      { id: 'cat', name: 'Catalonia', icon: '🏛️', description: 'Barcelona, Hospitalet, Terrassa' },
      { id: 'and', name: 'Andalusia', icon: '🌞', description: 'Seville, Málaga, Córdoba' },
      { id: 'val', name: 'Valencia', icon: '🍊', description: 'Valencia, Alicante, Castellón' },
      { id: 'gal', name: 'Galicia', icon: '🐚', description: 'Vigo, A Coruña, Ourense' },
      { id: 'bas', name: 'Basque Country', icon: '⛰️', description: 'Bilbao, Vitoria, San Sebastián' }
    ],
    'nl': [
      { id: 'nh', name: 'North Holland', icon: '🌷', description: 'Amsterdam, Haarlem, Zaanstad' },
      { id: 'zh', name: 'South Holland', icon: '🌷', description: 'The Hague, Rotterdam, Leiden' },
      { id: 'nb', name: 'North Brabant', icon: '🏭', description: 'Eindhoven, Tilburg, Breda' },
      { id: 'ge', name: 'Gelderland', icon: '🌳', description: 'Nijmegen, Arnhem, Apeldoorn' }
    ],

    // ASIA PACIFIC
    'in': [
      // 28 STATES
      { id: 'maharashtra', name: 'Maharashtra', icon: '🏛️', description: 'Mumbai, Pune, Nagpur' },
      { id: 'karnataka', name: 'Karnataka', icon: '🌸', description: 'Bangalore, Mysore, Hubli' },
      { id: 'tamil-nadu', name: 'Tamil Nadu', icon: '🏛️', description: 'Chennai, Coimbatore, Madurai' },
      { id: 'gujarat', name: 'Gujarat', icon: '🦁', description: 'Ahmedabad, Surat, Vadodara' },
      { id: 'rajasthan', name: 'Rajasthan', icon: '🏰', description: 'Jaipur, Jodhpur, Udaipur' },
      { id: 'west-bengal', name: 'West Bengal', icon: '🐅', description: 'Kolkata, Howrah, Durgapur' },
      { id: 'uttar-pradesh', name: 'Uttar Pradesh', icon: '🕌', description: 'Lucknow, Kanpur, Agra' },
      { id: 'telangana', name: 'Telangana', icon: '💎', description: 'Hyderabad, Warangal, Nizamabad' },
      { id: 'andhra-pradesh', name: 'Andhra Pradesh', icon: '🌾', description: 'Visakhapatnam, Vijayawada, Guntur' },
      { id: 'kerala', name: 'Kerala', icon: '🥥', description: 'Kochi, Thiruvananthapuram, Kozhikode' },
      { id: 'punjab', name: 'Punjab', icon: '🌾', description: 'Ludhiana, Amritsar, Jalandhar' },
      { id: 'haryana', name: 'Haryana', icon: '🌾', description: 'Faridabad, Gurgaon, Panipat' },
      { id: 'bihar', name: 'Bihar', icon: '🏛️', description: 'Patna, Gaya, Bhagalpur' },
      { id: 'odisha', name: 'Odisha', icon: '🏛️', description: 'Bhubaneswar, Cuttack, Rourkela' },
      { id: 'jharkhand', name: 'Jharkhand', icon: '⛏️', description: 'Ranchi, Jamshedpur, Dhanbad' },
      { id: 'chhattisgarh', name: 'Chhattisgarh', icon: '🌾', description: 'Raipur, Bhilai, Korba' },
      { id: 'madhya-pradesh', name: 'Madhya Pradesh', icon: '🏛️', description: 'Bhopal, Indore, Gwalior' },
      { id: 'assam', name: 'Assam', icon: '🍃', description: 'Guwahati, Dibrugarh, Silchar' },
      { id: 'himachal-pradesh', name: 'Himachal Pradesh', icon: '🏔️', description: 'Shimla, Manali, Dharamshala' },
      { id: 'uttarakhand', name: 'Uttarakhand', icon: '🏔️', description: 'Dehradun, Haridwar, Nainital' },
      { id: 'goa', name: 'Goa', icon: '🏖️', description: 'Panaji, Margao, Vasco' },
      { id: 'manipur', name: 'Manipur', icon: '🏔️', description: 'Imphal, Thoubal' },
      { id: 'meghalaya', name: 'Meghalaya', icon: '🏔️', description: 'Shillong, Tura' },
      { id: 'tripura', name: 'Tripura', icon: '🏛️', description: 'Agartala, Udaipur' },
      { id: 'nagaland', name: 'Nagaland', icon: '🏔️', description: 'Kohima, Dimapur' },
      { id: 'mizoram', name: 'Mizoram', icon: '🏔️', description: 'Aizawl, Lunglei' },
      { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', icon: '🏔️', description: 'Itanagar, Naharlagun' },
      { id: 'sikkim', name: 'Sikkim', icon: '🏔️', description: 'Gangtok, Namchi' },
      // 8 UNION TERRITORIES
      { id: 'delhi', name: 'Delhi', icon: '🏛️', description: 'New Delhi, Delhi, Gurgaon' },
      { id: 'jammu-kashmir', name: 'Jammu & Kashmir', icon: '🏔️', description: 'Srinagar, Jammu, Leh' },
      { id: 'ladakh', name: 'Ladakh', icon: '🏔️', description: 'Leh, Kargil' },
      { id: 'chandigarh', name: 'Chandigarh', icon: '🏛️', description: 'Chandigarh' },
      { id: 'puducherry', name: 'Puducherry', icon: '🏖️', description: 'Puducherry, Karaikal' },
      { id: 'andaman-nicobar', name: 'Andaman & Nicobar Islands', icon: '🏝️', description: 'Port Blair' },
      { id: 'lakshadweep', name: 'Lakshadweep', icon: '🏝️', description: 'Kavaratti' },
      { id: 'dadra-nagar-haveli', name: 'Dadra & Nagar Haveli', icon: '🌳', description: 'Silvassa' }
    ],
    'jp': [
      { id: 'tokyo', name: 'Tokyo', icon: '🗼', description: 'Tokyo, Shibuya, Shinjuku' },
      { id: 'osaka', name: 'Osaka', icon: '🏯', description: 'Osaka, Sakai, Higashiosaka' },
      { id: 'kanagawa', name: 'Kanagawa', icon: '🗻', description: 'Yokohama, Kawasaki, Sagamihara' },
      { id: 'aichi', name: 'Aichi', icon: '🚗', description: 'Nagoya, Toyota, Okazaki' },
      { id: 'saitama', name: 'Saitama', icon: '🌸', description: 'Saitama, Kawaguchi, Kawagoe' },
      { id: 'chiba', name: 'Chiba', icon: '🌊', description: 'Chiba, Funabashi, Matsudo' }
    ],
    'cn': [
      { id: 'beijing', name: 'Beijing', icon: '🏛️', description: 'Beijing Municipality' },
      { id: 'shanghai', name: 'Shanghai', icon: '🏙️', description: 'Shanghai Municipality' },
      { id: 'guangdong', name: 'Guangdong', icon: '🏭', description: 'Guangzhou, Shenzhen, Dongguan' },
      { id: 'jiangsu', name: 'Jiangsu', icon: '🌊', description: 'Nanjing, Suzhou, Wuxi' },
      { id: 'shandong', name: 'Shandong', icon: '⛰️', description: 'Jinan, Qingdao, Yantai' },
      { id: 'zhejiang', name: 'Zhejiang', icon: '🌸', description: 'Hangzhou, Ningbo, Wenzhou' }
    ],
    'au': [
      { id: 'nsw', name: 'New South Wales', icon: '🏙️', description: 'Sydney, Newcastle, Wollongong' },
      { id: 'vic', name: 'Victoria', icon: '☕', description: 'Melbourne, Geelong, Ballarat' },
      { id: 'qld', name: 'Queensland', icon: '🌞', description: 'Brisbane, Gold Coast, Cairns' },
      { id: 'wa', name: 'Western Australia', icon: '⛏️', description: 'Perth, Fremantle, Bunbury' },
      { id: 'sa', name: 'South Australia', icon: '🍷', description: 'Adelaide, Mount Gambier, Whyalla' },
      { id: 'tas', name: 'Tasmania', icon: '🌲', description: 'Hobart, Launceston, Devonport' }
    ],
    'kr': [
      { id: 'seoul', name: 'Seoul', icon: '🏙️', description: 'Seoul Special City' },
      { id: 'busan', name: 'Busan', icon: '🌊', description: 'Busan Metropolitan City' },
      { id: 'incheon', name: 'Incheon', icon: '✈️', description: 'Incheon Metropolitan City' },
      { id: 'daegu', name: 'Daegu', icon: '🏭', description: 'Daegu Metropolitan City' },
      { id: 'daejeon', name: 'Daejeon', icon: '🔬', description: 'Daejeon Metropolitan City' },
      { id: 'gwangju', name: 'Gwangju', icon: '🎨', description: 'Gwangju Metropolitan City' }
    ],

    // SOUTH AMERICA
    'br': [
      { id: 'sp', name: 'São Paulo', icon: '🏙️', description: 'São Paulo, Guarulhos, Campinas' },
      { id: 'rj', name: 'Rio de Janeiro', icon: '🏖️', description: 'Rio de Janeiro, São Gonçalo, Duque de Caxias' },
      { id: 'mg', name: 'Minas Gerais', icon: '⛏️', description: 'Belo Horizonte, Uberlândia, Contagem' },
      { id: 'ba', name: 'Bahia', icon: '🌴', description: 'Salvador, Feira de Santana, Vitória da Conquista' },
      { id: 'pr', name: 'Paraná', icon: '🌾', description: 'Curitiba, Londrina, Maringá' },
      { id: 'rs', name: 'Rio Grande do Sul', icon: '🥩', description: 'Porto Alegre, Caxias do Sul, Pelotas' }
    ],
    'ar': [
      { id: 'caba', name: 'Buenos Aires City', icon: '🏛️', description: 'Autonomous City of Buenos Aires' },
      { id: 'ba', name: 'Buenos Aires Province', icon: '🌾', description: 'La Plata, Mar del Plata, Bahía Blanca' },
      { id: 'co', name: 'Córdoba', icon: '🏔️', description: 'Córdoba, Villa María, Río Cuarto' },
      { id: 'sf', name: 'Santa Fe', icon: '🌾', description: 'Rosario, Santa Fe, Rafaela' },
      { id: 'mn', name: 'Mendoza', icon: '🍷', description: 'Mendoza, San Rafael, Godoy Cruz' }
    ],

    // AFRICA
    'za': [
      { id: 'gp', name: 'Gauteng', icon: '💎', description: 'Johannesburg, Pretoria, Soweto' },
      { id: 'wc', name: 'Western Cape', icon: '🍷', description: 'Cape Town, Stellenbosch, Paarl' },
      { id: 'kzn', name: 'KwaZulu-Natal', icon: '🌊', description: 'Durban, Pietermaritzburg, Richards Bay' },
      { id: 'ec', name: 'Eastern Cape', icon: '🦏', description: 'Port Elizabeth, East London, Uitenhage' }
    ],
    'ng': [
      { id: 'la', name: 'Lagos', icon: '🏙️', description: 'Lagos, Ikeja, Ikorodu' },
      { id: 'ka', name: 'Kano', icon: '🏛️', description: 'Kano, Fagge, Dala' },
      { id: 'ri', name: 'Rivers', icon: '🛢️', description: 'Port Harcourt, Obio-Akpor, Okrika' },
      { id: 'og', name: 'Ogun', icon: '🏭', description: 'Abeokuta, Ijebu Ode, Sagamu' }
    ],

    // MIDDLE EAST
    'sa': [
      { id: 'ri', name: 'Riyadh', icon: '🏛️', description: 'Riyadh, Al Kharj, Ad Diriyah' },
      { id: 'mk', name: 'Makkah', icon: '🕋', description: 'Jeddah, Mecca, Taif' },
      { id: 'ep', name: 'Eastern Province', icon: '🛢️', description: 'Dammam, Al Khobar, Dhahran' },
      { id: 'md', name: 'Medina', icon: '🕌', description: 'Medina, Yanbu, Badr' }
    ],
    'ae': [
      { id: 'du', name: 'Dubai', icon: '🏗️', description: 'Dubai, Deira, Bur Dubai' },
      { id: 'ad', name: 'Abu Dhabi', icon: '🏛️', description: 'Abu Dhabi, Al Ain, Zayed City' },
      { id: 'sh', name: 'Sharjah', icon: '🎨', description: 'Sharjah, Kalba, Khor Fakkan' },
      { id: 'aj', name: 'Ajman', icon: '🏖️', description: 'Ajman, Manama, Masfout' }
    ],
    'tr': [
      { id: 'ist', name: 'Istanbul', icon: '🌉', description: 'Istanbul, Beyoğlu, Kadıköy' },
      { id: 'ank', name: 'Ankara', icon: '🏛️', description: 'Ankara, Çankaya, Keçiören' },
      { id: 'izm', name: 'İzmir', icon: '🌊', description: 'İzmir, Konak, Bornova' },
      { id: 'bur', name: 'Bursa', icon: '🏔️', description: 'Bursa, Osmangazi, Nilüfer' }
    ]
  },
  cities: {
    // UNITED STATES
    'ca': [
      { id: 'los-angeles', name: 'Los Angeles', icon: '🌴', coordinates: { lat: 34.0522, lon: -118.2437 }, description: 'City of Angels' },
      { id: 'san-francisco', name: 'San Francisco', icon: '🌉', coordinates: { lat: 37.7749, lon: -122.4194 }, description: 'Golden Gate City' },
      { id: 'san-diego', name: 'San Diego', icon: '🏄', coordinates: { lat: 32.7157, lon: -117.1611 }, description: 'Americas Finest City' },
      { id: 'san-jose', name: 'San Jose', icon: '💻', coordinates: { lat: 37.3382, lon: -121.8863 }, description: 'Capital of Silicon Valley' },
      { id: 'fresno', name: 'Fresno', icon: '🍇', coordinates: { lat: 36.7378, lon: -119.7871 }, description: 'Central Valley Hub' }
    ],
    'ny': [
      { id: 'new-york-city', name: 'New York City', icon: '🗽', coordinates: { lat: 40.7128, lon: -74.0060 }, description: 'The Big Apple' },
      { id: 'buffalo', name: 'Buffalo', icon: '❄️', coordinates: { lat: 42.8864, lon: -78.8784 }, description: 'Queen City' },
      { id: 'rochester', name: 'Rochester', icon: '🏭', coordinates: { lat: 43.1566, lon: -77.6088 }, description: 'Flower City' },
      { id: 'yonkers', name: 'Yonkers', icon: '🏘️', coordinates: { lat: 40.9312, lon: -73.8988 }, description: 'City of Hills' },
      { id: 'syracuse', name: 'Syracuse', icon: '🏫', coordinates: { lat: 43.0481, lon: -76.1474 }, description: 'Salt City' }
    ],
    'tx': [
      { id: 'houston', name: 'Houston', icon: '🚀', coordinates: { lat: 29.7604, lon: -95.3698 }, description: 'Space City' },
      { id: 'dallas', name: 'Dallas', icon: '🏙️', coordinates: { lat: 32.7767, lon: -96.7970 }, description: 'Big D' },
      { id: 'austin', name: 'Austin', icon: '🎸', coordinates: { lat: 30.2672, lon: -97.7431 }, description: 'Keep Austin Weird' },
      { id: 'san-antonio', name: 'San Antonio', icon: '🏛️', coordinates: { lat: 29.4241, lon: -98.4936 }, description: 'Alamo City' },
      { id: 'fort-worth', name: 'Fort Worth', icon: '🤠', coordinates: { lat: 32.7555, lon: -97.3308 }, description: 'Cowtown' }
    ],
    'fl': [
      { id: 'miami', name: 'Miami', icon: '🏖️', coordinates: { lat: 25.7617, lon: -80.1918 }, description: 'Magic City' },
      { id: 'orlando', name: 'Orlando', icon: '🏰', coordinates: { lat: 28.5383, lon: -81.3792 }, description: 'Theme Park Capital' },
      { id: 'tampa', name: 'Tampa', icon: '⚡', coordinates: { lat: 27.9506, lon: -82.4572 }, description: 'Lightning City' },
      { id: 'jacksonville', name: 'Jacksonville', icon: '🐆', coordinates: { lat: 30.3322, lon: -81.6557 }, description: 'River City' }
    ],
    'il': [
      { id: 'chicago', name: 'Chicago', icon: '🏙️', coordinates: { lat: 41.8781, lon: -87.6298 }, description: 'Windy City' },
      { id: 'aurora', name: 'Aurora', icon: '🌅', coordinates: { lat: 41.7606, lon: -88.3201 }, description: 'City of Lights' },
      { id: 'rockford', name: 'Rockford', icon: '🏭', coordinates: { lat: 42.2711, lon: -89.0940 }, description: 'Forest City' }
    ],

    // CANADA
    'on': [
      { id: 'toronto', name: 'Toronto', icon: '🏙️', coordinates: { lat: 43.6532, lon: -79.3832 }, description: 'The 6ix' },
      { id: 'ottawa', name: 'Ottawa', icon: '🏛️', coordinates: { lat: 45.4215, lon: -75.6972 }, description: 'Capital City' },
      { id: 'hamilton', name: 'Hamilton', icon: '🏭', coordinates: { lat: 43.2557, lon: -79.8711 }, description: 'Steel City' },
      { id: 'london', name: 'London', icon: '🎓', coordinates: { lat: 42.9849, lon: -81.2453 }, description: 'Forest City' }
    ],
    'qc': [
      { id: 'montreal', name: 'Montreal', icon: '🎭', coordinates: { lat: 45.5017, lon: -73.5673 }, description: 'City of Festivals' },
      { id: 'quebec-city', name: 'Quebec City', icon: '🏰', coordinates: { lat: 46.8139, lon: -71.2080 }, description: 'La Capitale' },
      { id: 'laval', name: 'Laval', icon: '🌊', coordinates: { lat: 45.6066, lon: -73.7124 }, description: 'Island City' }
    ],
    'bc': [
      { id: 'vancouver', name: 'Vancouver', icon: '🏔️', coordinates: { lat: 49.2827, lon: -123.1207 }, description: 'Beautiful British Columbia' },
      { id: 'victoria', name: 'Victoria', icon: '🌸', coordinates: { lat: 48.4284, lon: -123.3656 }, description: 'Garden City' },
      { id: 'surrey', name: 'Surrey', icon: '🌲', coordinates: { lat: 49.1913, lon: -122.8490 }, description: 'City of Parks' }
    ],

    // MEXICO
    'cdmx': [
      { id: 'mexico-city', name: 'Mexico City', icon: '🏛️', coordinates: { lat: 19.4326, lon: -99.1332 }, description: 'Capital of Mexico' }
    ],
    'jal': [
      { id: 'guadalajara', name: 'Guadalajara', icon: '🌶️', coordinates: { lat: 20.6597, lon: -103.3496 }, description: 'Pearl of the West' },
      { id: 'zapopan', name: 'Zapopan', icon: '🏛️', coordinates: { lat: 20.7227, lon: -103.3844 }, description: 'Metropolitan Area' }
    ],

    // UNITED KINGDOM
    'england': [
      { id: 'london', name: 'London', icon: '🏰', coordinates: { lat: 51.5074, lon: -0.1278 }, description: 'Capital of England' },
      { id: 'manchester', name: 'Manchester', icon: '⚽', coordinates: { lat: 53.4808, lon: -2.2426 }, description: 'Industrial Heritage' },
      { id: 'birmingham', name: 'Birmingham', icon: '🏭', coordinates: { lat: 52.4862, lon: -1.8904 }, description: 'Second City' },
      { id: 'liverpool', name: 'Liverpool', icon: '🎵', coordinates: { lat: 53.4084, lon: -2.9916 }, description: 'Beatles City' },
      { id: 'leeds', name: 'Leeds', icon: '🏭', coordinates: { lat: 53.8008, lon: -1.5491 }, description: 'Yorkshire Hub' }
    ],
    'scotland': [
      { id: 'edinburgh', name: 'Edinburgh', icon: '🏰', coordinates: { lat: 55.9533, lon: -3.1883 }, description: 'Athens of the North' },
      { id: 'glasgow', name: 'Glasgow', icon: '🎨', coordinates: { lat: 55.8642, lon: -4.2518 }, description: 'Dear Green Place' },
      { id: 'aberdeen', name: 'Aberdeen', icon: '🛢️', coordinates: { lat: 57.1497, lon: -2.0943 }, description: 'Granite City' }
    ],
    'wales': [
      { id: 'cardiff', name: 'Cardiff', icon: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', coordinates: { lat: 51.4816, lon: -3.1791 }, description: 'Capital of Wales' },
      { id: 'swansea', name: 'Swansea', icon: '🌊', coordinates: { lat: 51.6214, lon: -3.9436 }, description: 'Ugly Lovely Town' }
    ],

    // GERMANY
    'nw': [
      { id: 'cologne', name: 'Cologne', icon: '⛪', coordinates: { lat: 50.9375, lon: 6.9603 }, description: 'Cathedral City' },
      { id: 'dusseldorf', name: 'Düsseldorf', icon: '🎨', coordinates: { lat: 51.2277, lon: 6.7735 }, description: 'Fashion Capital' },
      { id: 'dortmund', name: 'Dortmund', icon: '⚽', coordinates: { lat: 51.5136, lon: 7.4653 }, description: 'Football City' }
    ],
    'by': [
      { id: 'munich', name: 'Munich', icon: '🍺', coordinates: { lat: 48.1351, lon: 11.5820 }, description: 'Oktoberfest City' },
      { id: 'nuremberg', name: 'Nuremberg', icon: '🏰', coordinates: { lat: 49.4521, lon: 11.0767 }, description: 'Imperial City' }
    ],

    // FRANCE
    'idf': [
      { id: 'paris', name: 'Paris', icon: '🗼', coordinates: { lat: 48.8566, lon: 2.3522 }, description: 'City of Light' }
    ],
    'ara': [
      { id: 'lyon', name: 'Lyon', icon: '🍷', coordinates: { lat: 45.7640, lon: 4.8357 }, description: 'Gastronomic Capital' },
      { id: 'grenoble', name: 'Grenoble', icon: '🏔️', coordinates: { lat: 45.1885, lon: 5.7245 }, description: 'Capital of the Alps' }
    ],

    // ITALY
    'lom': [
      { id: 'milan', name: 'Milan', icon: '👗', coordinates: { lat: 45.4642, lon: 9.1900 }, description: 'Fashion Capital' }
    ],
    'laz': [
      { id: 'rome', name: 'Rome', icon: '🏛️', coordinates: { lat: 41.9028, lon: 12.4964 }, description: 'Eternal City' }
    ],
    'cam': [
      { id: 'naples', name: 'Naples', icon: '🍕', coordinates: { lat: 40.8518, lon: 14.2681 }, description: 'Pizza Capital' }
    ],

    // SPAIN
    'mad': [
      { id: 'madrid', name: 'Madrid', icon: '👑', coordinates: { lat: 40.4168, lon: -3.7038 }, description: 'Royal Capital' }
    ],
    'cat': [
      { id: 'barcelona', name: 'Barcelona', icon: '🏛️', coordinates: { lat: 41.3851, lon: 2.1734 }, description: 'Modernist City' }
    ],
    'and': [
      { id: 'seville', name: 'Seville', icon: '💃', coordinates: { lat: 37.3891, lon: -5.9845 }, description: 'Flamenco Capital' }
    ],

    // INDIA - ALL 28 STATES + 8 UNION TERRITORIES
    'maharashtra': [
      { id: 'mumbai', name: 'Mumbai', icon: '🏙️', coordinates: { lat: 19.0760, lon: 72.8777 }, description: 'Financial Capital of India' },
      { id: 'pune', name: 'Pune', icon: '🎓', coordinates: { lat: 18.5204, lon: 73.8567 }, description: 'Oxford of the East' },
      { id: 'nagpur', name: 'Nagpur', icon: '🍊', coordinates: { lat: 21.1458, lon: 79.0882 }, description: 'Orange City' },
      { id: 'nashik', name: 'Nashik', icon: '🍇', coordinates: { lat: 19.9975, lon: 73.7898 }, description: 'Wine Capital' },
      { id: 'aurangabad', name: 'Aurangabad', icon: '🏛️', coordinates: { lat: 19.8762, lon: 75.3433 }, description: 'City of Gates' },
      { id: 'solapur', name: 'Solapur', icon: '🏭', coordinates: { lat: 17.6599, lon: 75.9064 }, description: 'Textile Hub' },
      { id: 'thane', name: 'Thane', icon: '🏙️', coordinates: { lat: 19.2183, lon: 72.9781 }, description: 'City of Lakes' },
      { id: 'kolhapur', name: 'Kolhapur', icon: '🏛️', coordinates: { lat: 16.7050, lon: 74.2433 }, description: 'City of Palaces' },
      { id: 'sangli', name: 'Sangli', icon: '🍇', coordinates: { lat: 16.8524, lon: 74.5815 }, description: 'Turmeric City' },
      { id: 'akola', name: 'Akola', icon: '🌾', coordinates: { lat: 20.7002, lon: 77.0082 }, description: 'Cotton City' },
      { id: 'latur', name: 'Latur', icon: '🌾', coordinates: { lat: 18.4088, lon: 76.5604 }, description: 'Sugar Bowl' },
      { id: 'ahmednagar', name: 'Ahmednagar', icon: '🏛️', coordinates: { lat: 19.0948, lon: 74.7480 }, description: 'Historical City' }
    ],
    'karnataka': [
      { id: 'bangalore', name: 'Bangalore', icon: '💻', coordinates: { lat: 12.9716, lon: 77.5946 }, description: 'Silicon Valley of India' },
      { id: 'mysore', name: 'Mysore', icon: '🏰', coordinates: { lat: 12.2958, lon: 76.6394 }, description: 'City of Palaces' },
      { id: 'hubli', name: 'Hubli', icon: '🏭', coordinates: { lat: 15.3647, lon: 75.1240 }, description: 'Commercial Hub' },
      { id: 'mangalore', name: 'Mangalore', icon: '🌊', coordinates: { lat: 12.9141, lon: 74.8560 }, description: 'Port City' }
    ],
    'tamil-nadu': [
      { id: 'chennai', name: 'Chennai', icon: '🏖️', coordinates: { lat: 13.0827, lon: 80.2707 }, description: 'Detroit of India' },
      { id: 'coimbatore', name: 'Coimbatore', icon: '🏭', coordinates: { lat: 11.0168, lon: 76.9558 }, description: 'Manchester of South India' },
      { id: 'madurai', name: 'Madurai', icon: '🏛️', coordinates: { lat: 9.9252, lon: 78.1198 }, description: 'Temple City' },
      { id: 'salem', name: 'Salem', icon: '🏭', coordinates: { lat: 11.6643, lon: 78.1460 }, description: 'Steel City' }
    ],
    'delhi': [
      { id: 'new-delhi', name: 'New Delhi', icon: '🏛️', coordinates: { lat: 28.6139, lon: 77.2090 }, description: 'Capital of India' },
      { id: 'gurgaon', name: 'Gurgaon', icon: '🏢', coordinates: { lat: 28.4595, lon: 77.0266 }, description: 'Millennium City' },
      { id: 'faridabad', name: 'Faridabad', icon: '🏭', coordinates: { lat: 28.4089, lon: 77.3178 }, description: 'Industrial Hub' }
    ],
    'gujarat': [
      { id: 'ahmedabad', name: 'Ahmedabad', icon: '🕌', coordinates: { lat: 23.0225, lon: 72.5714 }, description: 'Manchester of India' },
      { id: 'surat', name: 'Surat', icon: '💎', coordinates: { lat: 21.1702, lon: 72.8311 }, description: 'Diamond City' },
      { id: 'vadodara', name: 'Vadodara', icon: '🏛️', coordinates: { lat: 22.3072, lon: 73.1812 }, description: 'Cultural Capital' },
      { id: 'rajkot', name: 'Rajkot', icon: '🏭', coordinates: { lat: 22.3039, lon: 70.8022 }, description: 'Industrial City' }
    ],
    'rajasthan': [
      { id: 'jaipur', name: 'Jaipur', icon: '🏰', coordinates: { lat: 26.9124, lon: 75.7873 }, description: 'Pink City' },
      { id: 'jodhpur', name: 'Jodhpur', icon: '🏰', coordinates: { lat: 26.2389, lon: 73.0243 }, description: 'Blue City' },
      { id: 'udaipur', name: 'Udaipur', icon: '🏰', coordinates: { lat: 24.5854, lon: 73.7125 }, description: 'City of Lakes' },
      { id: 'kota', name: 'Kota', icon: '🎓', coordinates: { lat: 25.2138, lon: 75.8648 }, description: 'Education Hub' }
    ],
    'west-bengal': [
      { id: 'kolkata', name: 'Kolkata', icon: '🏛️', coordinates: { lat: 22.5726, lon: 88.3639 }, description: 'City of Joy' },
      { id: 'howrah', name: 'Howrah', icon: '🌉', coordinates: { lat: 22.5958, lon: 88.2636 }, description: 'Twin City' },
      { id: 'durgapur', name: 'Durgapur', icon: '🏭', coordinates: { lat: 23.5204, lon: 87.3119 }, description: 'Steel City' }
    ],
    'uttar-pradesh': [
      { id: 'lucknow', name: 'Lucknow', icon: '🕌', coordinates: { lat: 26.8467, lon: 80.9462 }, description: 'City of Nawabs' },
      { id: 'kanpur', name: 'Kanpur', icon: '🏭', coordinates: { lat: 26.4499, lon: 80.3319 }, description: 'Manchester of the East' },
      { id: 'agra', name: 'Agra', icon: '🕌', coordinates: { lat: 27.1767, lon: 78.0081 }, description: 'City of Taj Mahal' },
      { id: 'varanasi', name: 'Varanasi', icon: '🕉️', coordinates: { lat: 25.3176, lon: 82.9739 }, description: 'Spiritual Capital' }
    ],
    'telangana': [
      { id: 'hyderabad', name: 'Hyderabad', icon: '💎', coordinates: { lat: 17.3850, lon: 78.4867 }, description: 'City of Pearls' },
      { id: 'warangal', name: 'Warangal', icon: '🏛️', coordinates: { lat: 17.9689, lon: 79.5941 }, description: 'Tri-City' },
      { id: 'nizamabad', name: 'Nizamabad', icon: '🌾', coordinates: { lat: 18.6725, lon: 78.0941 }, description: 'Rice Bowl' },
      { id: 'karimnagar', name: 'Karimnagar', icon: '🌾', coordinates: { lat: 18.4386, lon: 79.1288 }, description: 'Granary of Telangana' },
      { id: 'khammam', name: 'Khammam', icon: '🏭', coordinates: { lat: 17.2473, lon: 80.1514 }, description: 'Coal Hub' },
      { id: 'mahbubnagar', name: 'Mahbubnagar', icon: '🏛️', coordinates: { lat: 16.7460, lon: 77.9982 }, description: 'Palamuru Region' },
      { id: 'nalgonda', name: 'Nalgonda', icon: '🏛️', coordinates: { lat: 17.0542, lon: 79.2673 }, description: 'Historical City' },
      { id: 'adilabad', name: 'Adilabad', icon: '🌳', coordinates: { lat: 19.6718, lon: 78.5318 }, description: 'Cotton City' },
      { id: 'medak', name: 'Medak', icon: '🏛️', coordinates: { lat: 18.0488, lon: 78.2751 }, description: 'Fort City' },
      { id: 'rangareddy', name: 'Ranga Reddy', icon: '🏢', coordinates: { lat: 17.4065, lon: 78.4772 }, description: 'IT Corridor' },
      { id: 'sangareddy', name: 'Sangareddy', icon: '🏭', coordinates: { lat: 17.6186, lon: 78.0831 }, description: 'Industrial Hub' },
      { id: 'siddipet', name: 'Siddipet', icon: '🌾', coordinates: { lat: 18.1018, lon: 78.8492 }, description: 'Turmeric Town' },
      { id: 'ramagundam', name: 'Ramagundam', icon: '⚡', coordinates: { lat: 18.7581, lon: 79.4738 }, description: 'Thermal Power Hub' },
      { id: 'miryalaguda', name: 'Miryalaguda', icon: '🌾', coordinates: { lat: 16.8667, lon: 79.5667 }, description: 'Rice City' },
      { id: 'suryapet', name: 'Suryapet', icon: '🌾', coordinates: { lat: 17.1404, lon: 79.6190 }, description: 'Agricultural Hub' },
      { id: 'jagtial', name: 'Jagtial', icon: '🌾', coordinates: { lat: 18.7894, lon: 78.9113 }, description: 'Turmeric Market' }
    ],
    'andhra-pradesh': [
      { id: 'visakhapatnam', name: 'Visakhapatnam', icon: '🌊', coordinates: { lat: 17.6868, lon: 83.2185 }, description: 'City of Destiny' },
      { id: 'vijayawada', name: 'Vijayawada', icon: '🌊', coordinates: { lat: 16.5062, lon: 80.6480 }, description: 'Business Capital' },
      { id: 'guntur', name: 'Guntur', icon: '🌶️', coordinates: { lat: 16.3067, lon: 80.4365 }, description: 'Chilli Capital' }
    ],
    'kerala': [
      { id: 'kochi', name: 'Kochi', icon: '🌴', coordinates: { lat: 9.9312, lon: 76.2673 }, description: 'Queen of Arabian Sea' },
      { id: 'thiruvananthapuram', name: 'Thiruvananthapuram', icon: '🏛️', coordinates: { lat: 8.5241, lon: 76.9366 }, description: 'Evergreen City' },
      { id: 'kozhikode', name: 'Kozhikode', icon: '🌊', coordinates: { lat: 11.2588, lon: 75.7804 }, description: 'City of Spices' }
    ],
    'punjab': [
      { id: 'ludhiana', name: 'Ludhiana', icon: '🏭', coordinates: { lat: 30.9010, lon: 75.8573 }, description: 'Manchester of India' },
      { id: 'amritsar', name: 'Amritsar', icon: '🕌', coordinates: { lat: 31.6340, lon: 74.8723 }, description: 'Holy City' },
      { id: 'jalandhar', name: 'Jalandhar', icon: '🏏', coordinates: { lat: 31.3260, lon: 75.5762 }, description: 'Sports Capital' }
    ],
    'haryana': [
      { id: 'faridabad', name: 'Faridabad', icon: '🏭', coordinates: { lat: 28.4089, lon: 77.3178 }, description: 'Industrial Hub' },
      { id: 'gurgaon', name: 'Gurgaon', icon: '🏢', coordinates: { lat: 28.4595, lon: 77.0266 }, description: 'Millennium City' },
      { id: 'panipat', name: 'Panipat', icon: '🧵', coordinates: { lat: 29.3909, lon: 76.9635 }, description: 'Textile City' }
    ],
    'bihar': [
      { id: 'patna', name: 'Patna', icon: '🏛️', coordinates: { lat: 25.5941, lon: 85.1376 }, description: 'Ancient Capital' },
      { id: 'gaya', name: 'Gaya', icon: '🕉️', coordinates: { lat: 24.7914, lon: 85.0002 }, description: 'Holy City' },
      { id: 'bhagalpur', name: 'Bhagalpur', icon: '🧵', coordinates: { lat: 25.2425, lon: 86.9842 }, description: 'Silk City' }
    ],
    'odisha': [
      { id: 'bhubaneswar', name: 'Bhubaneswar', icon: '🏛️', coordinates: { lat: 20.2961, lon: 85.8245 }, description: 'Temple City' },
      { id: 'cuttack', name: 'Cuttack', icon: '🏛️', coordinates: { lat: 20.4625, lon: 85.8828 }, description: 'Silver City' },
      { id: 'rourkela', name: 'Rourkela', icon: '🏭', coordinates: { lat: 22.2604, lon: 84.8536 }, description: 'Steel City' }
    ],
    'jharkhand': [
      { id: 'ranchi', name: 'Ranchi', icon: '🏔️', coordinates: { lat: 23.3441, lon: 85.3096 }, description: 'City of Waterfalls' },
      { id: 'jamshedpur', name: 'Jamshedpur', icon: '🏭', coordinates: { lat: 22.8046, lon: 86.2029 }, description: 'Steel City' },
      { id: 'dhanbad', name: 'Dhanbad', icon: '⛏️', coordinates: { lat: 23.7957, lon: 86.4304 }, description: 'Coal Capital' }
    ],
    'chhattisgarh': [
      { id: 'raipur', name: 'Raipur', icon: '🌾', coordinates: { lat: 21.2514, lon: 81.6296 }, description: 'Rice Bowl' },
      { id: 'bhilai', name: 'Bhilai', icon: '🏭', coordinates: { lat: 21.1938, lon: 81.3509 }, description: 'Steel City' },
      { id: 'korba', name: 'Korba', icon: '⚡', coordinates: { lat: 22.3595, lon: 82.7501 }, description: 'Power Hub' }
    ],
    'madhya-pradesh': [
      { id: 'bhopal', name: 'Bhopal', icon: '🏛️', coordinates: { lat: 23.2599, lon: 77.4126 }, description: 'City of Lakes' },
      { id: 'indore', name: 'Indore', icon: '🏭', coordinates: { lat: 22.7196, lon: 75.8577 }, description: 'Commercial Capital' },
      { id: 'gwalior', name: 'Gwalior', icon: '🏰', coordinates: { lat: 26.2183, lon: 78.1828 }, description: 'City of Music' }
    ],
    'assam': [
      { id: 'guwahati', name: 'Guwahati', icon: '🌊', coordinates: { lat: 26.1445, lon: 91.7362 }, description: 'Gateway to Northeast' },
      { id: 'dibrugarh', name: 'Dibrugarh', icon: '🍃', coordinates: { lat: 27.4728, lon: 94.9120 }, description: 'Tea City' },
      { id: 'silchar', name: 'Silchar', icon: '🌾', coordinates: { lat: 24.8333, lon: 92.7789 }, description: 'Island of Peace' }
    ],
    'himachal-pradesh': [
      { id: 'shimla', name: 'Shimla', icon: '🏔️', coordinates: { lat: 31.1048, lon: 77.1734 }, description: 'Queen of Hills' },
      { id: 'manali', name: 'Manali', icon: '🏔️', coordinates: { lat: 32.2432, lon: 77.1892 }, description: 'Valley of Gods' },
      { id: 'dharamshala', name: 'Dharamshala', icon: '🏔️', coordinates: { lat: 32.2190, lon: 76.3234 }, description: 'Little Lhasa' }
    ],
    'uttarakhand': [
      { id: 'dehradun', name: 'Dehradun', icon: '🏔️', coordinates: { lat: 30.3165, lon: 78.0322 }, description: 'Doon Valley' },
      { id: 'haridwar', name: 'Haridwar', icon: '🕉️', coordinates: { lat: 29.9457, lon: 78.1642 }, description: 'Gateway to Gods' },
      { id: 'nainital', name: 'Nainital', icon: '🏔️', coordinates: { lat: 29.3803, lon: 79.4636 }, description: 'Lake District' }
    ],
    'jammu-kashmir': [
      { id: 'srinagar', name: 'Srinagar', icon: '🏔️', coordinates: { lat: 34.0837, lon: 74.7973 }, description: 'Paradise on Earth' },
      { id: 'jammu', name: 'Jammu', icon: '🏛️', coordinates: { lat: 32.7266, lon: 74.8570 }, description: 'City of Temples' },
      { id: 'leh', name: 'Leh', icon: '🏔️', coordinates: { lat: 34.1526, lon: 77.5771 }, description: 'Land of High Passes' }
    ],
    'goa': [
      { id: 'panaji', name: 'Panaji', icon: '🏖️', coordinates: { lat: 15.4909, lon: 73.8278 }, description: 'Pearl of the Orient' },
      { id: 'margao', name: 'Margao', icon: '🏖️', coordinates: { lat: 15.2993, lon: 73.9626 }, description: 'Commercial Capital' },
      { id: 'vasco', name: 'Vasco da Gama', icon: '⚓', coordinates: { lat: 15.3955, lon: 73.8313 }, description: 'Port City' }
    ],
    'manipur': [
      { id: 'imphal', name: 'Imphal', icon: '🏔️', coordinates: { lat: 24.8170, lon: 93.9368 }, description: 'Jewel of India' },
      { id: 'thoubal', name: 'Thoubal', icon: '🌾', coordinates: { lat: 24.6340, lon: 93.9896 }, description: 'Rice Bowl' }
    ],
    'meghalaya': [
      { id: 'shillong', name: 'Shillong', icon: '🏔️', coordinates: { lat: 25.5788, lon: 91.8933 }, description: 'Scotland of the East' },
      { id: 'tura', name: 'Tura', icon: '🏔️', coordinates: { lat: 25.5138, lon: 90.2022 }, description: 'Land of Orange' }
    ],
    'tripura': [
      { id: 'agartala', name: 'Agartala', icon: '🏛️', coordinates: { lat: 23.8315, lon: 91.2868 }, description: 'City of Temples' },
      { id: 'udaipur', name: 'Udaipur', icon: '🏛️', coordinates: { lat: 23.5333, lon: 91.4833 }, description: 'Lake City' }
    ],
    'nagaland': [
      { id: 'kohima', name: 'Kohima', icon: '🏔️', coordinates: { lat: 25.6751, lon: 94.1086 }, description: 'Land of Festivals' },
      { id: 'dimapur', name: 'Dimapur', icon: '🏭', coordinates: { lat: 25.9044, lon: 93.7267 }, description: 'Gateway to Nagaland' }
    ],
    'mizoram': [
      { id: 'aizawl', name: 'Aizawl', icon: '🏔️', coordinates: { lat: 23.7271, lon: 92.7176 }, description: 'Home of Highlanders' },
      { id: 'lunglei', name: 'Lunglei', icon: '🏔️', coordinates: { lat: 22.8880, lon: 92.7319 }, description: 'Bridge of Rock' }
    ],
    'arunachal-pradesh': [
      { id: 'itanagar', name: 'Itanagar', icon: '🏔️', coordinates: { lat: 27.0844, lon: 93.6053 }, description: 'Land of Rising Sun' },
      { id: 'naharlagun', name: 'Naharlagun', icon: '🏔️', coordinates: { lat: 27.1050, lon: 93.6950 }, description: 'Satellite Town' }
    ],
    'sikkim': [
      { id: 'gangtok', name: 'Gangtok', icon: '🏔️', coordinates: { lat: 27.3389, lon: 88.6065 }, description: 'Land of Monasteries' },
      { id: 'namchi', name: 'Namchi', icon: '🏔️', coordinates: { lat: 27.1667, lon: 88.3667 }, description: 'Sky High' }
    ],

    // JAPAN
    'tokyo': [
      { id: 'tokyo', name: 'Tokyo', icon: '🗼', coordinates: { lat: 35.6762, lon: 139.6503 }, description: 'Capital of Japan' },
      { id: 'shibuya', name: 'Shibuya', icon: '🌃', coordinates: { lat: 35.6598, lon: 139.7006 }, description: 'Youth Culture Hub' }
    ],
    'osaka': [
      { id: 'osaka', name: 'Osaka', icon: '🏯', coordinates: { lat: 34.6937, lon: 135.5023 }, description: 'Kitchen of Japan' }
    ],
    'kanagawa': [
      { id: 'yokohama', name: 'Yokohama', icon: '🌊', coordinates: { lat: 35.4437, lon: 139.6380 }, description: 'Port City' }
    ],

    // CHINA
    'beijing': [
      { id: 'beijing', name: 'Beijing', icon: '🏛️', coordinates: { lat: 39.9042, lon: 116.4074 }, description: 'Capital of China' }
    ],
    'shanghai': [
      { id: 'shanghai', name: 'Shanghai', icon: '🏙️', coordinates: { lat: 31.2304, lon: 121.4737 }, description: 'Pearl of the Orient' }
    ],
    'guangdong': [
      { id: 'guangzhou', name: 'Guangzhou', icon: '🏭', coordinates: { lat: 23.1291, lon: 113.2644 }, description: 'Canton' },
      { id: 'shenzhen', name: 'Shenzhen', icon: '💻', coordinates: { lat: 22.5431, lon: 114.0579 }, description: 'Silicon Valley of China' }
    ],

    // AUSTRALIA
    'nsw': [
      { id: 'sydney', name: 'Sydney', icon: '🌉', coordinates: { lat: -33.8688, lon: 151.2093 }, description: 'Harbour City' },
      { id: 'newcastle', name: 'Newcastle', icon: '⚓', coordinates: { lat: -32.9283, lon: 151.7817 }, description: 'Steel City' }
    ],
    'vic': [
      { id: 'melbourne', name: 'Melbourne', icon: '☕', coordinates: { lat: -37.8136, lon: 144.9631 }, description: 'Cultural Capital' }
    ],
    'qld': [
      { id: 'brisbane', name: 'Brisbane', icon: '🌞', coordinates: { lat: -27.4698, lon: 153.0251 }, description: 'River City' },
      { id: 'gold-coast', name: 'Gold Coast', icon: '🏄', coordinates: { lat: -28.0167, lon: 153.4000 }, description: 'Surfers Paradise' }
    ],

    // SOUTH KOREA
    'seoul': [
      { id: 'seoul', name: 'Seoul', icon: '🏙️', coordinates: { lat: 37.5665, lon: 126.9780 }, description: 'Capital of South Korea' }
    ],
    'busan': [
      { id: 'busan', name: 'Busan', icon: '🌊', coordinates: { lat: 35.1796, lon: 129.0756 }, description: 'Port City' }
    ],

    // BRAZIL
    'sp': [
      { id: 'sao-paulo', name: 'São Paulo', icon: '🏙️', coordinates: { lat: -23.5505, lon: -46.6333 }, description: 'Largest City in South America' },
      { id: 'guarulhos', name: 'Guarulhos', icon: '✈️', coordinates: { lat: -23.4538, lon: -46.5333 }, description: 'Airport City' }
    ],
    'rj': [
      { id: 'rio-de-janeiro', name: 'Rio de Janeiro', icon: '🏖️', coordinates: { lat: -22.9068, lon: -43.1729 }, description: 'Marvelous City' }
    ],

    // ARGENTINA
    'caba': [
      { id: 'buenos-aires', name: 'Buenos Aires', icon: '🏛️', coordinates: { lat: -34.6118, lon: -58.3960 }, description: 'Paris of South America' }
    ],

    // SOUTH AFRICA
    'gp': [
      { id: 'johannesburg', name: 'Johannesburg', icon: '💎', coordinates: { lat: -26.2041, lon: 28.0473 }, description: 'City of Gold' },
      { id: 'pretoria', name: 'Pretoria', icon: '🏛️', coordinates: { lat: -25.7479, lon: 28.2293 }, description: 'Jacaranda City' }
    ],
    'wc': [
      { id: 'cape-town', name: 'Cape Town', icon: '🏔️', coordinates: { lat: -33.9249, lon: 18.4241 }, description: 'Mother City' }
    ],

    // SAUDI ARABIA
    'ri': [
      { id: 'riyadh', name: 'Riyadh', icon: '🏛️', coordinates: { lat: 24.7136, lon: 46.6753 }, description: 'Capital of Saudi Arabia' }
    ],
    'mk': [
      { id: 'jeddah', name: 'Jeddah', icon: '🌊', coordinates: { lat: 21.4858, lon: 39.1925 }, description: 'Gateway to Mecca' },
      { id: 'mecca', name: 'Mecca', icon: '🕋', coordinates: { lat: 21.3891, lon: 39.8579 }, description: 'Holy City' }
    ],

    // UAE
    'du': [
      { id: 'dubai', name: 'Dubai', icon: '🏗️', coordinates: { lat: 25.2048, lon: 55.2708 }, description: 'City of Gold' }
    ],
    'ad': [
      { id: 'abu-dhabi', name: 'Abu Dhabi', icon: '🏛️', coordinates: { lat: 24.4539, lon: 54.3773 }, description: 'Capital of UAE' }
    ],

    // TURKEY
    'ist': [
      { id: 'istanbul', name: 'Istanbul', icon: '🌉', coordinates: { lat: 41.0082, lon: 28.9784 }, description: 'Bridge Between Continents' }
    ],
    'ank': [
      { id: 'ankara', name: 'Ankara', icon: '🏛️', coordinates: { lat: 39.9334, lon: 32.8597 }, description: 'Capital of Turkey' }
    ]
  }
};

// Helper functions
export const getZones = () => locationData.zones;

export const getCountriesByZone = (zoneId) => locationData.countries[zoneId] || [];

export const getStatesByCountry = (zoneId, countryId) => locationData.states[countryId] || [];

export const getCitiesByState = (zoneId, countryId, stateId) => locationData.cities[stateId] || [];
