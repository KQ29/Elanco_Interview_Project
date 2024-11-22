import React, { useState } from 'react';
import CountryList from './components/CountryList';
import CountryPopulation from './components/CountryPopulation';
import PopulationChart from './components/PopulationChart';
import CountryPopulationChart from './components/CountryPopulationChart';

// Compact Legend Component with Background Color Change
const CompactLegend = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const legendOptions = [
    { label: 'Low Population (< 1M)', color: 'bg-green-100' },
    { label: 'Medium Pop. (1M - 5M)', color: 'bg-yellow-100' },
    { label: 'Over-Populated (> 5M)', color: 'bg-red-100' },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % legendOptions.length);
  };

  return (
    <div
      className={`mt-4 flex justify-center items-center p-4 shadow-md rounded-lg cursor-pointer ${legendOptions[currentIndex].color}`}
      onClick={handleNext} // Change the background color and text when clicked
      style={{ minWidth: '150px', maxWidth: '210px', marginLeft: '165px', marginTop: '-5px' }}
      aria-label="Change category"
    >
      <span className="text-gray-700 font-semibold">{legendOptions[currentIndex].label}</span>
    </div>
  );
};

const App = () => {
  const [selectedData, setSelectedData] = useState([]);
  const [showCountryList, setShowCountryList] = useState(true);

  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  const toggleView = () => {
    setShowCountryList((prevState) => !prevState);
    setSelectedData([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-elanco-gradient bg-cover bg-no-repeat">
      {/* Main Heading */}
      <header className="relative mb-8 py-8">
        {/* Elanco in the Top-Left */}
        <div className="absolute top-10 left-14">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Elanco</span>
          </h1>
        </div>

        {/* Centered Title */}
        <h1
          className="text-4xl font-bold text-center"
          style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Population App
        </h1>
        <p className="text-lg mt-2 text-center text-gray-200">
          Explore population statistics by city and country with ease.
        </p>

        {/* Toggle Button */}
        <div className="text-center mt-4">
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            onClick={toggleView}
          >
            {showCountryList ? 'Switch to Country Population' : 'Switch to Country-City Population'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Conditionally Rendered Section */}
        <div className="md:w-2/3 w-full">
          {showCountryList ? (
            <>
              <CountryList onSelectCountry={handleSelectCountry} />
              <CompactLegend />
            </>
          ) : (
            <>
              <CountryPopulation onCountryClick={handleSelectCountry} />
              <CompactLegend />
            </>
          )}
        </div>

        {/* Chart Section */}
        <div className="md:w-1/3 w-full">
          <div
            style={{
              top: 'auto',
              transform: 'translate(-250px, 0px)',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {showCountryList ? (
              <PopulationChart data={selectedData} />
            ) : (
              <CountryPopulationChart data={selectedData} />
            )}
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
