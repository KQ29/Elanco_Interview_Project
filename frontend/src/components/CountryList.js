import React, { useState, useEffect } from 'react';
import { fetchCountryData, countryNameMapping } from './CountryUtils';

const CountryList = ({ onSelectCountry, onSearchChange }) => {
  // State variables for managing fetched data, filtered results, loading state, and pagination
  const [countries, setCountries] = useState([]); // List of all countries and cities
  const [flags, setFlags] = useState({}); // Mapping of country names to flag URLs
  const [searchQuery, setSearchQuery] = useState(''); // The current search input from the user
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered countries based on the search query
  const [loading, setLoading] = useState(true); // Tracks whether data is still being fetched
  const [currentPage, setCurrentPage] = useState(0); // Tracks the current pagination page
  const countriesPerPage = 5; // Number of countries displayed per page

  // Fetch data from an API or local utility function when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { countries, flagMap } = await fetchCountryData(); // Fetch country and flag data
        setCountries(countries); // Set the list of countries
        setFlags(flagMap); // Set the flag mapping
        setFilteredCountries(countries); // Initialize the filtered list to show all countries
        setLoading(false); // Data is now loaded
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors during the fetch
      }
    };

    fetchData(); // Trigger data fetching
  }, []);

  // Updates the filtered countries whenever the search query changes
  useEffect(() => {
    // Filter countries and cities that match the search query
    const filtered = countries.filter(
      (country) =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase()) || // Match country name
        country.city.toLowerCase().includes(searchQuery.toLowerCase()) // Match city name
    );
    setFilteredCountries(filtered); // Update the filtered countries list

    if (onSearchChange) {
      onSearchChange(searchQuery); // Notify parent component of search changes, if applicable
    }

    setCurrentPage(0); // Reset pagination to the first page whenever search changes
  }, [searchQuery, countries, onSearchChange]);

  // Calculate the slice of filtered countries to display based on pagination
  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  // Display a loading message while the data is being fetched
  if (loading) return <p className="text-blue-500 text-lg">Loading data...</p>;

  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      {/* Heading Section */}
      <h2 className="text-3xl font-bold text-white mb-4">Country-City Population Data</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by City or Country..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => {
          const value = e.target.value;
          // Capitalize the first letter of the input while keeping the rest lowercase
          const capitalizedValue =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          setSearchQuery(capitalizedValue); // Update the search query state
        }}
      />

      {/* List of Filtered Countries */}
      <ul className="space-y-3">
        {countriesToDisplay.map((country) => {
          const population = Math.round(country.populationCounts?.[0]?.value || 0); // Get population or default to 0
          let bgColor = 'bg-green-200'; // Default background color for low population
          if (population > 1000000) bgColor = 'bg-yellow-200'; // Medium population threshold
          if (population > 5000000) bgColor = 'bg-red-200'; // High population threshold

          // Standardize the country name for flag lookup
          const standardizedCountryName =
            countryNameMapping[country.country.toLowerCase()] || country.country;
          const flag = flags[standardizedCountryName.toLowerCase()] || ''; // Get the flag URL

          return (
            <li
              key={`${country.country}-${country.city}`} // Unique key for each country-city pair
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`}
              onClick={() => onSelectCountry(country)} // Notify parent component of selected country
            >
              {/* Display the country's flag */}
              {flag && (
                <img
                  src={flag}
                  alt={`${country.country} flag`}
                  className="w-10 h-6 mr-4 border rounded-lg"
                />
              )}
              <span className="font-semibold text-lg">
                {country.country} - {country.city}:
              </span>
              <span className="ml-2 font-bold text-lg">{population.toLocaleString()}</span>
            </li>
          );
        })}
        {/* Show a message if no countries match the search */}
        {countriesToDisplay.length === 0 && (
          <p className="text-gray-400 text-lg">No cities or countries match your search.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        {/* Previous Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 0} // Disable if on the first page
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        {/* Next Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={endIndex >= filteredCountries.length} // Disable if on the last page
          onClick={() =>
            setCurrentPage((prev) =>
              prev + 1 < Math.ceil(filteredCountries.length / countriesPerPage)
                ? prev + 1
                : prev
            )
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CountryList;
