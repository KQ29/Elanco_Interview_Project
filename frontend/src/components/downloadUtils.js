import axios from 'axios'; // Import axios for API calls

// Base URL for flag API
const FLAG_API_BASE_URL = 'https://restcountries.com/v3.1/name';

// Function to fetch the flag for a given country
const fetchFlag = async (countryName) => {
  try {
    const response = await axios.get(`${FLAG_API_BASE_URL}/${encodeURIComponent(countryName)}`);
    // Extract flag URL from the API response
    return response.data[0]?.flags?.png || response.data[0]?.flags?.svg || 'No flag available';
  } catch (error) {
    console.error(`Error fetching flag for ${countryName}:`, error);
    return 'No flag available'; // Return a fallback value if the flag cannot be fetched
  }
};

// Function to download data as a JSON file
export const downloadAsJSON = async (selectedData, showCountryList) => {
  if (selectedData.length > 0) {
    const firstItem = selectedData[0];
    let flag = 'No flag available';

    // Only fetch flag if in "Country-City Population Data" view (State 1)
    if (showCountryList) {
      const countryName = firstItem?.country;
      flag = await fetchFlag(countryName);
    }

    // Prepare the data object
    const data = showCountryList
      ? {
          city: firstItem?.city || 'Unknown',
          country: firstItem?.country || 'Unknown',
          population: firstItem?.populationCounts?.[0]?.value || 'Unknown',
          flag,
        }
      : {
          name: firstItem?.name || 'Unknown',
          population: firstItem?.population || 'Unknown',
          flag: firstItem?.flag || 'No flag available', // Use existing flag for State 2
        };

    // Create and download JSON
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.country || data.name}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
  } else {
    alert('No data selected for download.');
  }
};

// Function to download data as a CSV file
export const downloadAsCSV = async (selectedData, showCountryList) => {
  if (selectedData.length > 0) {
    const firstItem = selectedData[0];
    let flag = 'No flag available';

    // Only fetch flag if in "Country-City Population Data" view (State 1)
    if (showCountryList) {
      const countryName = firstItem?.country;
      flag = await fetchFlag(countryName);
    }

    // Prepare the CSV string
    const csv = showCountryList
      ? `City,Country,Population,Flag\n${firstItem?.city || 'Unknown'},${
          firstItem?.country || 'Unknown'
        },${firstItem?.populationCounts?.[0]?.value || 'Unknown'},${flag}`
      : `Name,Population,Flag\n${firstItem?.name || 'Unknown'},${
          firstItem?.population || 'Unknown'
        },${firstItem?.flag || 'No flag available'}`; // Use existing flag for State 2

    // Create and download CSV
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${firstItem?.country || firstItem?.name || 'Unknown'}_data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  } else {
    alert('No data selected for download.');
  }
};
