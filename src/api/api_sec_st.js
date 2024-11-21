import axios from 'axios';

// Base URL for the REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

// Fetch flags, names, and population for all countries
export const getCountriesData = async () => {
  try {
    // Make a GET request to fetch all countries data
    const response = await axios.get(`${BASE_URL}/all`);
    // Map through the response to extract the required fields
    const countriesData = response.data.map(country => ({
      name: country.name.common, // Country name
      flag: country.flags.svg,  // Country flag (SVG format)
      population: country.population, // Country population
    }));

    return countriesData; // Return the array of countries' data
  } catch (error) {
    console.error('Error fetching countries data:', error); // Log errors
    return []; // Return an empty array in case of an error
  }
};

// Example of how to use the function
(async () => {
  const data = await getCountriesData();
  console.log(data); // Logs the data of all countries
})();
