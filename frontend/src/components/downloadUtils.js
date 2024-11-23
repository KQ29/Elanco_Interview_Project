export const downloadAsJSON = (selectedData, showCountryList) => {
    if (selectedData.length > 0) {
      const data = showCountryList
        ? {
            city: selectedData[0]?.city || 'Unknown',
            country: selectedData[0]?.country || 'Unknown',
            population: selectedData[0]?.populationCounts?.[0]?.value || 'Unknown',
          }
        : {
            name: selectedData[0]?.name || 'Unknown',
            population: selectedData[0]?.population || 'Unknown',
          };
  
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
  
  export const downloadAsCSV = (selectedData, showCountryList) => {
    if (selectedData.length > 0) {
      const data = selectedData[0];
      const csv = showCountryList
        ? `City,Country,Population\n${data?.city || 'Unknown'},${data?.country || 'Unknown'},${
            data?.populationCounts?.[0]?.value || 'Unknown'
          }`
        : `Name,Population\n${data?.name || 'Unknown'},${data?.population || 'Unknown'}`;
  
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data?.country || data?.name || 'Unknown'}_data.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No data selected for download.');
    }
  };
  