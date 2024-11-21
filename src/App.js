import React, { useState } from 'react';
import CountryList from './components/CountryList';
import PopulationChart from './components/PopulationChart';

const App = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [isSticky, setIsSticky] = useState(true); // State to control sticky vs. non-sticky behavior

  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  const handleSearchChange = (searchQuery) => {
    if (searchQuery.trim() === '') {
      setIsSticky(true); // If no search query, keep the chart sticky
    } else {
      setIsSticky(false); // When searching, make the chart non-sticky
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: 'linear-gradient(90deg, #1D4ED8, #60A5FA)', // Gradient background
        backgroundSize: 'cover', // Ensures the background covers the screen
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Main Heading */}
      <header className="text-center mb-8 py-8">
        <h1
          className="text-4xl font-bold"
          style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Elanco</span> Population App
        </h1>
        <p className="text-lg mt-2 text-gray-200">
          Explore population statistics by city and country with ease.
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Country List Section */}
        <div className="md:w-2/3 w-full">
          <CountryList
            onSelectCountry={handleSelectCountry}
            onSearchChange={handleSearchChange} // Pass the search handler to CountryList
          />
        </div>

        {/* Chart Section */}
        <div className="md:w-1/3 w-full">
          <div
            className={isSticky ? 'sticky' : ''} // Apply sticky class when in sticky mode
            style={{
              top: isSticky ? '50%' : 'auto', // Sticky: Vertically offset; Non-sticky: Default positioning
              transform: isSticky
                ? 'translate(-250px, -50%)' // Sticky: Center vertically and offset left
                : 'translate(-250px, 0)', // Non-sticky: Shift 150px left, no vertical offset
              display: 'flex',
              justifyContent: 'center', // Horizontally align the chart
            }}
          >
            <PopulationChart data={selectedData} />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 text-white text-center py-4 mt-8">
        <p className="text-sm">
          © {new Date().getFullYear()} Elanco Population App. All rights reserved.
        </p>
        <p className="text-sm">Powered by React and Tailwind CSS</p>
      </footer>
    </div>
  );
};

export default App;
