import React, { useState, useEffect } from 'react';
import { getCountriesData } from '../api/api_sec_st'; // Import the API function

const CountryPopulation = ({ onCountryClick }) => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const countriesPerPage = 5; // Number of countries to display per page

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountriesData(); // Fetch countries data from the API
        setCountries(data);
        setFilteredCountries(data); // Initialize filtered list
        setLoading(false); // Set loading to false
      } catch (error) {
        console.error('Error fetching countries data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the countries list whenever the search query changes
  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentPage(0); // Reset to the first page on search
  }, [searchQuery, countries]);

  // Pagination logic
  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  if (loading) {
    return <p className="text-blue-500 text-lg">Loading countries...</p>;
  }

  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-3xl font-bold text-white mb-4">Country Population Data</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Country Name..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Autocomplete Suggestions */}
      {searchQuery && (
        <div className="bg-white shadow-lg rounded-lg mb-4">
          {filteredCountries.slice(0, 8).map((country) => (
            <div
              key={country.name}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => setSearchQuery(country.name)}
            >
              {country.name}
            </div>
          ))}
        </div>
      )}

      {/* Country List */}
      <ul className="space-y-3">
        {countriesToDisplay.map((country) => {
          const { name, flag, population } = country;

          // Determine background color based on population size
          let bgColor = 'bg-green-100';
          if (population > 1000000) bgColor = 'bg-yellow-100';
          if (population > 5000000) bgColor = 'bg-red-100';

          return (
            <li
              key={name}
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`}
              onClick={() => onCountryClick?.(country)} // Optional callback for country click
            >
              <img
                src={flag}
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
        {countriesToDisplay.length === 0 && (
          <p className="text-gray-400 text-lg">No countries match your search.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={endIndex >= filteredCountries.length}
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
