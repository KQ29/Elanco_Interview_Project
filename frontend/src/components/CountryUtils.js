import { getPopulationData, getCountryFlags } from '../api/api'; // Primary API
import axios from 'axios'; // Import axios for secondary API calls

// Mapping for country names to handle inconsistencies
export const countryNameMapping = {
    'åland islands': 'Aland Islands', // Standardize Åland Islands
    'american samoa': 'American Samoa', // Standardize American Samoa
    'bolivia (plurinational state of)': 'Bolivia', // Standardize Bolivia
    'british virgin islands': 'British Virgin Islands', // Standardize British Virgin Islands
    'brunei darussalam': 'Brunei', // Standardize Brunei
    'cabo verde': 'Cape Verde', // Standardize Cabo Verde
    'china, hong kong sar': 'Hong Kong', // Standardize Hong Kong
    'china, macao sar': 'Macao', // Standardize Macao
    "côte d'ivoire": 'Ivory Coast', // Standardize Côte d'Ivoire
    "democratic people's republic of korea": 'North Korea', // Standardize North Korea
    'faeroe islands': 'Faroe Islands', // Standardize Faroe Islands
    'falkland islands (malvinas)': 'Falkland Islands', // Standardize Falkland Islands
    'french guiana': 'French Guiana', // Standardize French Guiana
    'holy see': 'Vatican City', // Standardize Vatican City
    'iran (islamic republic of)': 'Iran', // Standardize Iran
    "lao people's democratic republic": 'Laos', // Standardize Laos
    'micronesia (federated states of)': 'Micronesia', // Standardize Micronesia
    'republic of korea': 'South Korea', // Standardize South Korea
    'republic of moldova': 'Moldova', // Standardize Moldova
    'republic of south sudan': 'South Sudan', // Standardize South Sudan
    'russian federation': 'Russia', // Standardize Russia
    'saint helena ex. dep.': 'Saint Helena', // Standardize Saint Helena
    'state of palestine': 'Palestine', // Standardize Palestine
    'tfyr of macedonia': 'North Macedonia', // Standardize North Macedonia
    'united kingdom of great britain and northern ireland': 'United Kingdom', // Standardize United Kingdom
    'united republic of tanzania': 'Tanzania', // Standardize Tanzania
    'united states of america': 'United States', // Standardize United States
    'united states virgin islands': 'United States Virgin Islands', // Standardize US Virgin Islands
    'venezuela (bolivarian republic of)': 'Venezuela', // Standardize Venezuela
    'wallis and futuna islands': 'Wallis and Futuna', // Standardize Wallis and Futuna
};

// Fetch and process data for population and flags
export const fetchCountryData = async () => {
  // Fetch population data for cities and countries
  const countries = await getPopulationData();

  // Fetch flag data for countries
  const flags = await getCountryFlags();

  // Map flags to country names using the standardized mapping
  const flagMap = {};

  // Standardize and map primary API flags
  flags.forEach((item) => {
    const standardizedName = item.name.toLowerCase();
    const mappedName = countryNameMapping[standardizedName] || item.name;
    flagMap[mappedName.toLowerCase()] = item.flag;
  });

  // Handle missing flags with the fallback API
  const missingFlags = [];
  countries.forEach((country) => {
    const countryName = countryNameMapping[country.country.toLowerCase()] || country.country;
    if (!flagMap[countryName.toLowerCase()]) {
      missingFlags.push(countryName);
    }
  });

  // If there are missing flags, fetch them from the secondary API
  if (missingFlags.length > 0) {
    const fallbackFlags = await fetchFallbackFlags(missingFlags);
    missingFlags.forEach((countryName) => {
      flagMap[countryName.toLowerCase()] = fallbackFlags[countryName.toLowerCase()] || '';
    });
  }

  return { countries, flagMap };
};

// Fetch missing flags from a secondary API
const fetchFallbackFlags = async (missingCountries) => {
    const fallbackFlagMap = {};
    const secondaryApiBaseUrl = 'https://restcountries.com/v3.1/name';
  
    for (const country of missingCountries) {
      // Skip invalid or unexpected entries
      if (!country || typeof country !== 'string' || country.match(/[^a-zA-Z\s'-]/)) {
        console.warn(`Skipping invalid country entry: ${country}`);
        continue;
      }
  
      // Correct country name if needed (e.g., Åland Islands)
      const correctedName = country === 'Aland Islands' ? 'Åland Islands' : country;
  
      try {
        const response = await axios.get(`${secondaryApiBaseUrl}/${encodeURIComponent(correctedName)}`);
        const flagUrl = response.data[0]?.flags?.png || response.data[0]?.flags?.svg || null;
  
        if (flagUrl) {
          fallbackFlagMap[country.toLowerCase()] = flagUrl;
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.warn(`Flag not found for ${country}: 404 Not Found`);
        } else {
          console.error(`Error fetching flag for ${country}:`, error.message);
        }
      }
    }
  
    return fallbackFlagMap;
  };
  