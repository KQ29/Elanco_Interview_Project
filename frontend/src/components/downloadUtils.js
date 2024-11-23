// Function to download data as a JSON file
export const downloadAsJSON = (selectedData, showCountryList) => {
    // Check if there is any selected data
    if (selectedData.length > 0) {
      // Prepare the data object based on the current view (Country List or Country Population)
      const data = showCountryList
        ? {
            // For "Country-City Population" view, include city, country, and population
            city: selectedData[0]?.city || 'Unknown',
            country: selectedData[0]?.country || 'Unknown',
            population: selectedData[0]?.populationCounts?.[0]?.value || 'Unknown',
          }
        : {
            // For "Country Population" view, include name and population only
            name: selectedData[0]?.name || 'Unknown',
            population: selectedData[0]?.population || 'Unknown',
          };
  
      // Create a JSON file from the prepared data
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      // Generate a temporary URL for the file
      const url = URL.createObjectURL(blob);
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url; // Set the file URL
      a.download = `${data.country || data.name}_data.json`; // Set the file name
      a.click(); // Trigger the download
      URL.revokeObjectURL(url); // Clean up the temporary URL to free resources
    } else {
      // Show an alert if no data is selected
      alert('No data selected for download.');
    }
  };
  
  // Function to download data as a CSV file
  export const downloadAsCSV = (selectedData, showCountryList) => {
    // Check if there is any selected data
    if (selectedData.length > 0) {
      // Extract the first selected data item
      const data = selectedData[0];
      // Prepare the CSV string based on the current view (Country List or Country Population)
      const csv = showCountryList
        ? `City,Country,Population\n${data?.city || 'Unknown'},${data?.country || 'Unknown'},${
            data?.populationCounts?.[0]?.value || 'Unknown'
          }`
        : `Name,Population\n${data?.name || 'Unknown'},${data?.population || 'Unknown'}`;
  
      // Create a CSV file from the prepared string
      const blob = new Blob([csv], { type: 'text/csv' });
      // Generate a temporary URL for the file
      const url = URL.createObjectURL(blob);
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url; // Set the file URL
      a.download = `${data?.country || data?.name || 'Unknown'}_data.csv`; // Set the file name
      a.click(); // Trigger the download
      URL.revokeObjectURL(url); // Clean up the temporary URL to free resources
    } else {
      // Show an alert if no data is selected
      alert('No data selected for download.');
    }
  };
  