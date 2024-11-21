// CountryList.js

import React, { useState, useEffect } from 'react';
import { fetchCountryData, countryNameMapping } from './CountryUtils'; // Import utility functions and mappings

// CountryList component to display a searchable list of countries with population and flags
const CountryList = ({ onSelectCountry, onSearchChange }) => {
  // State to hold the full list of countries and their population
  const [countries, setCountries] = useState([]);

  // State to hold the mapping of country names to their flag URLs
  const [flags, setFlags] = useState({});

  // State to store the user's search query for filtering
  const [searchQuery, setSearchQuery] = useState('');

  // State to hold the filtered list of countries based on the search query
  const [filteredCountries, setFilteredCountries] = useState([]);

  // State to track whether the data is still loading
  const [loading, setLoading] = useState(true);

  // Fetch country data (population and flags) when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve country data and flag mappings
        const { countries, flagMap } = await fetchCountryData();

        // Set the full list of countries and their flags in state
        setCountries(countries);
        setFlags(flagMap);

        // Initially set the filtered list to contain all countries
        setFilteredCountries(countries);

        // Mark data loading as complete
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
      }
    };

    fetchData(); // Call the function to fetch data
  }, []); // Empty dependency array ensures this runs only once after component mounts

  // Update the filtered list of countries whenever the search query or countries change
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase(); // Convert query to lowercase for case-insensitive matching

    // Filter countries by checking if the country or city name includes the query
    const filtered = countries.filter(
      (country) =>
        country.country.toLowerCase().includes(lowercasedQuery) ||
        country.city.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredCountries(filtered); // Update the filtered list

    // Notify the parent component about the current search query (if provided)
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
  }, [searchQuery, countries, onSearchChange]); // Dependencies: Runs when `searchQuery`, `countries`, or `onSearchChange` changes

  // Display a loading message if the data is still being fetched
  if (loading) return <p className="text-blue-500 text-lg">Loading data...</p>;

  // Render the searchable list of countries with their flags and population
  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-4">Country Population</h2>

      {/* Search bar for filtering countries */}
      <input
        type="text"
        placeholder="Search by city or country..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 font-medium capitalize"
        value={searchQuery} // Controlled input bound to `searchQuery` state
        onChange={(e) =>
          setSearchQuery(
            e.target.value
              .toLowerCase() // Convert query to lowercase
              .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize the first letter of each word
          )
        }
      />

      {/* List of filtered countries */}
      <ul className="space-y-3">
        {filteredCountries.map((country) => {
          // Get the population value (default to 0 if not available)
          const population = Math.round(country.populationCounts?.[0]?.value || 0);

          // Determine the background color based on the population range
          let bgColor = 'bg-green-100'; // Default green for low population
          if (population > 1000000) bgColor = 'bg-yellow-100'; // Yellow for medium population
          if (population > 5000000) bgColor = 'bg-red-100'; // Red for high population

          // Standardize country names using the mapping utility
          const standardizedCountryName =
            countryNameMapping[country.country.toLowerCase()] || country.country;

          // Get the flag for the standardized country name (default to empty if not found)
          const flag = flags[standardizedCountryName.toLowerCase()] || '';

          // Render each country item
          return (
            <li
              key={`${country.country}-${country.city}`} // Unique key for each country-city pair
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`} // Styling for each item
              onClick={() => onSelectCountry(country)} // Notify parent component when a country is selected
            >
              {/* Display the country's flag */}
              {flag && (
                <img
                  src={flag} // Flag URL
                  alt={`${country.country} flag`} // Alt text for accessibility
                  className="w-10 h-6 mr-4 border rounded-lg" // Styling for the flag
                />
              )}

              {/* Display the country and city names */}
              <span className="font-semibold text-lg">
                {country.country} - {country.city}:
              </span>

              {/* Display the population formatted with commas */}
              <span className="ml-2 font-bold text-lg">{population.toLocaleString()}</span>
            </li>
          );
        })}

        {/* Display a message if no countries match the search query */}
        {filteredCountries.length === 0 && (
          <p className="text-gray-400 text-lg">No cities or countries match your search.</p>
        )}
      </ul>
    </div>
  );
};

export default CountryList; // Export the component for use in other parts of the app
