import axios from 'axios'; // Import axios for making HTTP requests

// Base URL for the API
const BASE_URL = 'https://countriesnow.space/api/v0.1';

// Fetch population data
export const getPopulationData = async () => {
  try {
    // Make a GET request to fetch cities and their population data
    const response = await axios.get(`${BASE_URL}/countries/population/cities`);
    return response.data.data; // Return the data field from the response
  } catch (error) {
    console.error('Error fetching population data:', error); // Log any errors to the console
    return []; // Return an empty array in case of an error
  }
};

// Fetch country flags
export const getCountryFlags = async () => {
  try {
    // Make a GET request to fetch country flag images
    const response = await axios.get(`${BASE_URL}/countries/flag/images`);
    return response.data.data; // Return the data field from the response
  } catch (error) {
    console.error('Error fetching flags:', error); // Log any errors to the console
    return []; // Return an empty array in case of an error
  }
};
