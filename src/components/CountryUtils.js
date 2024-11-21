// CountryUtils.js

import { getPopulationData, getCountryFlags } from '../api/api'; // Import API functions to fetch population and flag data

// Mapping for country names to handle inconsistencies and ensure flag matching
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

  // Iterate over the flag data to standardize names and map flags
  flags.forEach((item) => {
    const standardizedName = item.name.toLowerCase(); // Convert flag country name to lowercase for matching
    const mappedName = countryNameMapping[standardizedName] || item.name; // Use standardized name or original name
    flagMap[mappedName.toLowerCase()] = item.flag; // Map the standardized name to the flag URL
  });

  // Return both the country population data and the mapped flags
  return { countries, flagMap };
};
