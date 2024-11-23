import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import CountryPopulation from './components/CountryPopulation';
import PopulationChart from './components/PopulationChart';
import CountryPopulationChart from './components/CountryPopulationChart';

// CompactLegend Component: Displays a legend and changes the category when clicked
const CompactLegend = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current index in the legend options

  const legendOptions = [
    { label: 'Low Population (< 1M)', color: 'bg-green-100' }, // Green for low population
    { label: 'Medium Pop. (1M - 5M)', color: 'bg-yellow-100' }, // Yellow for medium population
    { label: 'Over-Populated (> 5M)', color: 'bg-red-100' }, // Red for high population
  ];

  // Move to the next category in the legend options
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % legendOptions.length);
  };

  return (
    <div
      className={`mt-4 flex justify-center items-center p-4 shadow-md rounded-lg cursor-pointer ${legendOptions[currentIndex].color}`}
      onClick={handleNext} // Change category when clicked
      style={{ minWidth: '150px', maxWidth: '210px', marginLeft: '165px', marginTop: '-5px' }}
      aria-label="Change category"
    >
      <span className="text-gray-700 font-semibold">{legendOptions[currentIndex].label}</span>
    </div>
  );
};

// Main App Component
const App = () => {
  // Tracks the position of the background gradient
  const [backgroundPosition, setBackgroundPosition] = useState(0);

  // Tracks the direction of the background animation (forward or backward)
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    // Set up an interval to animate the background gradient
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => {
        const nextPosition = prev + direction * 0.25; // Increment or decrement the position
        if (nextPosition >= 100 || nextPosition <= 0) {
          setDirection(-direction); // Reverse the direction if limits are reached
        }
        return nextPosition;
      });
    }, 50); // Adjust speed of animation (slower with higher value)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [direction]);

  // Inline styles for the animated background gradient
  const animatedBackgroundStyle = {
    background: 'linear-gradient(135deg, #1D4ED8, #60A5FA, #3B82F6, #2563EB, #93C5FD, #3B82F6, #1D4ED8)',
    backgroundSize: '400% 100%', // Stretch gradient for a smoother animation
    backgroundPosition: `${backgroundPosition}% 50%`, // Update position dynamically
  };

  const [selectedData, setSelectedData] = useState([]); // Selected country data
  const [showCountryList, setShowCountryList] = useState(true); // Toggle between views

  // Update the selected data when a country is clicked
  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  // Toggle between country and population views
  const toggleView = () => {
    setShowCountryList((prevState) => !prevState);
    setSelectedData([]); // Reset selected data when switching views
  };

  return (
    <div
      className="min-h-screen flex flex-col" // Full-screen layout
      style={animatedBackgroundStyle} // Apply animated background
    >
      {/* Header Section */}
      <header className="relative mb-8 py-8">
        {/* Elanco Logo on the Top-Left */}
        <div className="absolute top-10 left-14">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Elanco</span>
          </h1>
        </div>

        {/* App Title */}
        <h1
          className="text-4xl font-bold text-center"
          style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Population App
        </h1>
        <p className="text-lg mt-2 text-center text-gray-200">
          Explore population statistics by city and country with ease.
        </p>

        {/* Toggle Button to Switch Views */}
        <div className="text-center mt-4">
          <button
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
            onClick={toggleView}
          >
            {showCountryList ? 'Switch to Country Population' : 'Switch to Country-City Population'}
          </button>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Conditionally Render Country List or Population View */}
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
              transform: 'translate(-250px, 0px)', // Align chart with layout
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
