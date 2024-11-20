import React, { useState } from 'react';
import CountryList from './components/CountryList';
import PopulationChart from './components/PopulationChart';

const App = () => {
  const [selectedData, setSelectedData] = useState([]);

  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  return (
    <div
      className="min-h-screen"
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
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Country List Section */}
        <div className="md:w-2/3 w-full">
          <CountryList onSelectCountry={handleSelectCountry} />
        </div>

        {/* Sticky Chart Section */}
        <div className="md:w-1/3 w-full">
          <div
            className="sticky"
            style={{
              top: '50%', // Vertically offset from the top of the viewport
              transform: 'translate(-250px, -50%)', // Center vertically and shift 250px to the left
              display: 'flex',
              justifyContent: 'center', // Horizontally align the chart
            }}
          >
            <PopulationChart data={selectedData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
