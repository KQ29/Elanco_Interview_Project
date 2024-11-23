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

// Fetch and process population and flag data
export const fetchCountryData = async () => {
  // Step 1: Fetch country population data (primary API)
  const countries = await getPopulationData();

  // Step 2: Fetch flag data for countries (primary API)
  const flags = await getCountryFlags();

  // Step 3: Create a map of flags using standardized country names
  const flagMap = {};
  flags.forEach((item) => {
    const standardizedName = item.name.toLowerCase(); // Lowercase for consistency
    const mappedName = countryNameMapping[standardizedName] || item.name; // Use mapping if available
    flagMap[mappedName.toLowerCase()] = item.flag; // Store the flag URL with the standardized name
  });

  // Step 4: Identify countries with missing flags
  const missingFlags = [];
  countries.forEach((country) => {
    const countryName = countryNameMapping[country.country.toLowerCase()] || country.country;
    if (!flagMap[countryName.toLowerCase()]) {
      missingFlags.push(countryName); // Add to the list of missing flags
    }
  });

  // Step 5: Fetch missing flags from a secondary API, if needed
  if (missingFlags.length > 0) {
    const fallbackFlags = await fetchFallbackFlags(missingFlags); // Fetch flags from secondary API
    missingFlags.forEach((countryName) => {
      flagMap[countryName.toLowerCase()] = fallbackFlags[countryName.toLowerCase()] || ''; // Update the flag map with fallback flags
    });
  }

  return { countries, flagMap }; // Return processed data
};

// Function to fetch missing flags from a secondary API
const fetchFallbackFlags = async (missingCountries) => {
    const fallbackFlagMap = {}; // Object to store fallback flags
    const secondaryApiBaseUrl = 'https://restcountries.com/v3.1/name'; // Base URL for the secondary API
  
    for (const country of missingCountries) {
      // Skip invalid or unexpected entries
      if (!country || typeof country !== 'string' || country.match(/[^a-zA-Z\s'-]/)) {
        console.warn(`Skipping invalid country entry: ${country}`);
        continue;
      }
  
      // Correct country name for specific cases (e.g., Åland Islands)
      const correctedName = country === 'Aland Islands' ? 'Åland Islands' : country;
  
      try {
        // Fetch flag data from the secondary API
        const response = await axios.get(`${secondaryApiBaseUrl}/${encodeURIComponent(correctedName)}`);
        const flagUrl = response.data[0]?.flags?.png || response.data[0]?.flags?.svg || null; // Extract flag URL

        // Store the flag URL if available
        if (flagUrl) {
          fallbackFlagMap[country.toLowerCase()] = flagUrl;
        }
      } catch (error) {
        // Handle specific API errors, such as 404 (Not Found)
        if (error.response && error.response.status === 404) {
          console.warn(`Flag not found for ${country}: 404 Not Found`);
        } else {
          console.error(`Error fetching flag for ${country}:`, error.message);
        }
      }
    }
  
    return fallbackFlagMap; // Return the fallback flag map
  };
