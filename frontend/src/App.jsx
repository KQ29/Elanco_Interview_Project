import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import CountryPopulation from './components/CountryPopulation';
import PopulationChart from './components/PopulationChart';
import CountryPopulationChart from './components/CountryPopulationChart';

// CompactLegend Component: Displays a legend with population categories
const CompactLegend = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current legend index

  // Updated legend options with softer colors
  const legendOptions = [
    { label: 'Low Population (< 1M)', color: 'bg-green-200' }, // Softer green for low population
    { label: 'Medium Pop. (1M - 5M)', color: 'bg-yellow-200' }, // Softer yellow for medium population
    { label: 'Over-Populated (> 5M)', color: 'bg-red-200' }, // Softer red for high population
  ];

  // Handles the click to cycle through legend categories
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % legendOptions.length);
  };

  return (
    <div
      className={`mt-4 flex justify-center items-center p-4 shadow-md rounded-lg cursor-pointer ${legendOptions[currentIndex].color}`}
      onClick={handleNext}
      style={{ minWidth: '150px', maxWidth: '210px', marginLeft: '165px', marginTop: '-5px' }}
      aria-label="Change category"
    >
      <span className="text-gray-700 font-semibold">{legendOptions[currentIndex].label}</span>
    </div>
  );
};

// Main App Component
const App = () => {
  const [backgroundPosition, setBackgroundPosition] = useState(0); // Tracks background animation position
  const [direction, setDirection] = useState(1); // Animation direction (1 for forward, -1 for backward)

  useEffect(() => {
    // Interval for smooth background animation
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => {
        const nextPosition = prev + direction * 0.25; // Increment/decrement position
        if (nextPosition >= 100 || nextPosition <= 0) {
          setDirection(-direction); // Reverse direction at boundaries
        }
        return nextPosition;
      });
    }, 50); // Adjust animation speed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [direction]);

  // Styles for the animated gradient background
  const animatedBackgroundStyle = {
    background: 'linear-gradient(135deg, #1D4ED8, #60A5FA, #3B82F6, #93C5FD)', // Gradient with lighter blues
    backgroundSize: '400% 100%',
    backgroundPosition: `${backgroundPosition}% 50%`, // Dynamically update position
  };

  const [selectedData, setSelectedData] = useState([]); // Stores selected country data
  const [showCountryList, setShowCountryList] = useState(true); // Toggles between views

  // Handles the selection of a country
  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  // Toggles between country list and population views
  const toggleView = () => {
    setShowCountryList((prevState) => !prevState);
    setSelectedData([]); // Reset selected data
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={animatedBackgroundStyle}
    >
      {/* Header Section */}
      <header className="relative mb-8 py-8">
        {/* Elanco Logo */}
        <div className="absolute top-10 left-14">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Elanco</span>
          </h1>
        </div>

        {/* Title */}
        <h1
          className="text-4xl font-bold text-center"
          style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Population App
        </h1>
        <p className="text-lg mt-2 text-center text-gray-200">
          Explore population statistics by city and country with ease.
        </p>

        {/* Toggle View Button */}
        <div className="text-center mt-4">
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400"
            onClick={toggleView}
          >
            {showCountryList ? 'Switch to Country Population' : 'Switch to Country-City Population'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Conditional Rendering for Country List or Population View */}
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
