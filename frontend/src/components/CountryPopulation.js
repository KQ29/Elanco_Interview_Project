import React, { useState, useEffect } from 'react';
import { getCountriesData } from '../api/api_sec_st'; // Import the function to fetch country data

const CountryPopulation = ({ onCountryClick }) => {
  // State to store fetched country data
  const [countries, setCountries] = useState([]);
  // State to track the user's search input
  const [searchQuery, setSearchQuery] = useState('');
  // State to store the filtered list of countries based on search or sort criteria
  const [filteredCountries, setFilteredCountries] = useState([]);
  // State to show a loading indicator while data is being fetched
  const [loading, setLoading] = useState(true);
  // State to track the current page in the pagination
  const [currentPage, setCurrentPage] = useState(0);
  // State to track the selected sorting option
  const [sortOption, setSortOption] = useState('name-asc');
  // Number of countries displayed per page
  const countriesPerPage = 5;

  // Effect to fetch country data when the component is first mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountriesData(); // Fetch data from the API
        setCountries(data); // Store the fetched data in state
        setFilteredCountries(data); // Initialize the filtered list with all data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching countries data:', error); // Handle any errors during fetch
      }
    };

    fetchData(); // Call the async fetchData function
  }, []);

  // Effect to filter and sort the countries list when relevant states change
  useEffect(() => {
    // Filter countries based on the search query
    let filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort the filtered countries based on the selected sorting option
    switch (sortOption) {
      case 'name-asc': // Sort by name in ascending order
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc': // Sort by name in descending order
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'population-asc': // Sort by population in ascending order
        filtered = filtered.sort((a, b) => a.population - b.population);
        break;
      case 'population-desc': // Sort by population in descending order
        filtered = filtered.sort((a, b) => b.population - a.population);
        break;
      default:
        break;
    }

    setFilteredCountries(filtered); // Update the filtered countries list
    setCurrentPage(0); // Reset to the first page when filtering or sorting
  }, [searchQuery, countries, sortOption]);

  // Calculate the start and end indices for pagination
  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  // Get the subset of countries to display on the current page
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  // Show a loading message while the data is being fetched
  if (loading) {
    return <p className="text-blue-500 text-lg">Loading countries...</p>;
  }

  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-3xl font-bold text-white mb-4">Country Population Data</h2>

      {/* Input for searching countries by name */}
      <input
        type="text"
        placeholder="Search by Country Name..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query as user types
      />

      {/* Autocomplete suggestions for the search query */}
      {searchQuery && (
        <div className="bg-white shadow-lg rounded-lg mb-4 max-h-40 overflow-y-auto">
          {filteredCountries.slice(0, 8).map((country) => (
            <div
              key={country.name}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSearchQuery(country.name)} // Set the search query to the clicked suggestion
            >
              {country.name}
            </div>
          ))}
        </div>
      )}

      {/* Dropdown menu for sorting options */}
      <select
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)} // Update the sorting option when changed
      >
        <option value="name-asc">Sort by Name (A-Z)</option>
        <option value="name-desc">Sort by Name (Z-A)</option>
        <option value="population-asc">Sort by Population (Ascending)</option>
        <option value="population-desc">Sort by Population (Descending)</option>
      </select>

      {/* Display the list of countries */}
      <ul className="space-y-3">
        {countriesToDisplay.map((country) => {
          const { name, flag, population } = country;

          // Set background color based on population size
          let bgColor = 'bg-green-100';
          if (population > 1000000) bgColor = 'bg-yellow-100';
          if (population > 5000000) bgColor = 'bg-red-100';

          return (
            <li
              key={name}
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`}
              onClick={() => onCountryClick?.(country)} // Trigger callback on country click
            >
              <img
                src={flag} // Display the country's flag
                alt={`${name} flag`}
                className="w-10 h-6 mr-4 border rounded-lg"
              />
              <span className="font-semibold text-lg">{name}:</span>
              <span className="ml-2 font-bold text-lg">
                {population.toLocaleString()} people
              </span>
            </li>
          );
        })}
        {/* Message for no matching results */}
        {countriesToDisplay.length === 0 && (
          <p className="text-gray-400 text-lg">No countries match your search.</p>
        )}
      </ul>

      {/* Pagination controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 0} // Disable the "Previous" button on the first page
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={endIndex >= filteredCountries.length} // Disable the "Next" button on the last page
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

export default CountryPopulation;
