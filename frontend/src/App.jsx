import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import CountryPopulation from './components/CountryPopulation';
import PopulationChart from './components/PopulationChart';
import CountryPopulationChart from './components/CountryPopulationChart';
import { downloadAsJSON, downloadAsCSV } from './components/downloadUtils'; // Import the utility functions for download

// CompactLegend Component: Displays a legend with population categories
const CompactLegend = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the current legend index

  // Legend options with labels and background colors
  const legendOptions = [
    { label: 'Low Population (< 1M)', color: 'bg-green-200' },
    { label: 'Medium Pop. (1M - 5M)', color: 'bg-yellow-200' },
    { label: 'Over-Populated (> 5M)', color: 'bg-red-200' },
  ];

  // Handles cycling through the legend options
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % legendOptions.length); // Loop through options
  };

  return (
    <div
      className={`mt-4 flex justify-center items-center p-4 shadow-md rounded-lg cursor-pointer ${legendOptions[currentIndex].color}`}
      onClick={handleNext} // Change legend category on click
      style={{ minWidth: '150px', maxWidth: '210px', marginLeft: '165px', marginTop: '-5px' }}
      aria-label="Change category"
    >
      <span className="text-gray-700 font-semibold">{legendOptions[currentIndex].label}</span>
    </div>
  );
};

// Main App Component
const App = () => {
  const [backgroundPosition, setBackgroundPosition] = useState(0); // Background animation position
  const [direction, setDirection] = useState(1); // Animation direction (1 for forward, -1 for backward)
  const [selectedData, setSelectedData] = useState([]); // Tracks selected country data
  const [showCountryList, setShowCountryList] = useState(true); // Toggles between views

  // Background animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => {
        const nextPosition = prev + direction * 0.25; // Adjust the animation speed and direction
        if (nextPosition >= 100 || nextPosition <= 0) {
          setDirection(-direction); // Reverse direction if limits are reached
        }
        return nextPosition;
      });
    }, 50);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [direction]);

  // Inline styles for the animated background gradient
  const animatedBackgroundStyle = {
    background: 'linear-gradient(135deg, #1D4ED8, #60A5FA, #3B82F6, #2563EB, #93C5FD, #3B82F6, #1D4ED8)',
    backgroundSize: '400% 100%',
    backgroundPosition: `${backgroundPosition}% 50%`,
  };

  // Handles the selection of a country
  const handleSelectCountry = (country) => {
    setSelectedData([country]); // Store the selected country data
  };

  // Toggles between "Country-City Population" and "Country Population" views
  const toggleView = () => {
    setShowCountryList((prevState) => !prevState); // Switch view
    setSelectedData([]); // Clear selected data
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={animatedBackgroundStyle} // Apply animated background
    >
      {/* Header Section */}
      <header className="relative mb-8 py-8">
        {/* App Logo */}
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

        {/* Button to Toggle View */}
        <div className="text-center mt-4">
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400"
            onClick={toggleView}
          >
            {showCountryList ? 'Switch to Country Population' : 'Switch to Country-City Population'}
          </button>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
        {/* Left Panel: Conditional Rendering of Lists */}
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

        {/* Right Panel: Chart and Download Buttons */}
        <div className="md:w-1/3 w-full">
          <div
            style={{
              top: 'auto',
              transform: 'translate(-250px, 0px)', // Center the chart
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

          {/* Download Buttons */}
          <div className="mt-4 text-center" style={{ transform: 'translateX(-240px)' }}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 disabled:opacity-50"
              onClick={() => downloadAsJSON(selectedData, showCountryList)} // Call JSON download
              disabled={selectedData.length === 0} // Disable if no data is selected
            >
              Download as JSON
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              onClick={() => downloadAsCSV(selectedData, showCountryList)} // Call CSV download
              disabled={selectedData.length === 0} // Disable if no data is selected
            >
              Download as CSV
            </button>
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
