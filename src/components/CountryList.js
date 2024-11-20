import React, { useState, useEffect } from 'react';
import { getPopulationData, getCountryFlags } from '../api/api';


// CountryList component
// Displays a searchable list of countries with their population and flags
const CountryList = ({ onSelectCountry }) => {
  // State to hold the full list of countries
  const [countries, setCountries] = useState([]);

  // State to hold the mapping of country names to their flag URLs
  const [flags, setFlags] = useState({});

  // State to store the user's search query
  const [searchQuery, setSearchQuery] = useState('');

  // State to hold the filtered list of countries based on the search query
  const [filteredCountries, setFilteredCountries] = useState([]);

  // State to track whether data is being loaded
  const [loading, setLoading] = useState(true);

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      // Fetch population data and update the countries state
      const populationData = await getPopulationData();
      setCountries(populationData);
      setFilteredCountries(populationData); // Initialize the filtered list with all countries

      // Fetch flags and map them to their respective country names
      const flagData = await getCountryFlags();
      const flagMap = {};
      flagData.forEach((item) => {
        flagMap[item.name.toLowerCase()] = item.flag;
      });
      setFlags(flagMap);

      // Data fetching is complete, set loading to false
      setLoading(false);
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // Filter the countries list whenever the search query or countries state changes
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase(); // Convert the search query to lowercase for case-insensitive matching
    const filtered = countries.filter(
      (country) =>
        country.country.toLowerCase().includes(lowercasedQuery) || // Check if country name matches the query
        country.city.toLowerCase().includes(lowercasedQuery) // Check if city name matches the query
    );
    setFilteredCountries(filtered); // Update the filtered countries list
  }, [searchQuery, countries]); // Dependencies: Runs when either `searchQuery` or `countries` changes

  // Show a loading message if data is still being fetched
  if (loading) return <p className="text-blue-500 text-lg">Loading data...</p>;

  // Render the component
  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      {/* Header */}
      <h2 className="text-3xl font-bold text-white mb-4">Country Population</h2>

      {/* Search bar for filtering countries */}
      <input
        type="text"
        placeholder="Search by city or country..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery} // Controlled input bound to `searchQuery` state
        onChange={(e) => setSearchQuery(e.target.value)} // Update `searchQuery` state on user input
      />

      {/* Filtered list of countries */}
      <ul className="space-y-3">
        {filteredCountries.map((country) => {
          // Extract the population of the current country, defaulting to 0 if data is unavailable
          const population = Math.round(country.populationCounts?.[0]?.value || 0);

          // Determine the background color based on the population range
          let bgColor = 'bg-green-100'; // Default green for low population
          if (population > 1000000) bgColor = 'bg-yellow-100'; // Yellow for medium population
          if (population > 5000000) bgColor = 'bg-red-100'; // Red for high population

          // Retrieve the flag for the current country from the flags mapping
          const flag = flags[country.country.toLowerCase()] || ''; // Default to an empty string if no flag is found

          // Render each country item
          return (
            <li
              key={country.city} // Use city as a unique key
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`} // Styling for the item
              onClick={() => onSelectCountry(country)} // Call the `onSelectCountry` callback when an item is clicked
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

export default CountryList;
