import React, { useState, useEffect } from 'react';
import { fetchCountryData, countryNameMapping } from './CountryUtils';

const CountryList = ({ onSelectCountry, onSearchChange }) => {
  const [countries, setCountries] = useState([]);
  const [flags, setFlags] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page
  const countriesPerPage = 5; // Number of countries to display per page

  // Fetch data when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { countries, flagMap } = await fetchCountryData();
        setCountries(countries);
        setFlags(flagMap);
        setFilteredCountries(countries); // Initialize filtered list
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Filter the countries list whenever the search query or countries state changes
  useEffect(() => {
    const filtered = countries.filter(
      (country) =>
        country.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCountries(filtered);

    if (onSearchChange) {
      onSearchChange(searchQuery);
    }

    setCurrentPage(0); // Reset to the first page on search
  }, [searchQuery, countries, onSearchChange]);

  // Pagination: Calculate the slice of countries to display
  const startIndex = currentPage * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;
  const countriesToDisplay = filteredCountries.slice(startIndex, endIndex);

  // Show a loading message if data is still being fetched
  if (loading) return <p className="text-blue-500 text-lg">Loading data...</p>;

  return (
    <div className="p-4 w-full md:w-2/3 lg:w-1/2">
      <h2 className="text-3xl font-bold text-white mb-4">Country-City Population Data</h2>
      <input
        type="text"
        placeholder="Search by City or Country..." // Placeholder remains unaffected
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchQuery}
        onChange={(e) => {
          const value = e.target.value;
          // Ensure only the input text is capitalized, placeholder remains as is
          const capitalizedValue =
            value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
          setSearchQuery(capitalizedValue);
        }}
      />
      <ul className="space-y-3">
        {countriesToDisplay.map((country) => {
          const population = Math.round(country.populationCounts?.[0]?.value || 0);
          let bgColor = 'bg-green-100';
          if (population > 1000000) bgColor = 'bg-yellow-100';
          if (population > 5000000) bgColor = 'bg-red-100';

          const standardizedCountryName =
            countryNameMapping[country.country.toLowerCase()] || country.country;
          const flag = flags[standardizedCountryName.toLowerCase()] || '';

          return (
            <li
              key={`${country.country}-${country.city}`}
              className={`p-4 border rounded-lg ${bgColor} cursor-pointer hover:bg-opacity-80 flex items-center`}
              onClick={() => onSelectCountry(country)}
            >
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
        {countriesToDisplay.length === 0 && (
          <p className="text-gray-400 text-lg">No cities or countries match your search.</p>
        )}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 0} // Disable "Previous" if on the first page
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={endIndex >= filteredCountries.length} // Disable "Next" if on the last page
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
