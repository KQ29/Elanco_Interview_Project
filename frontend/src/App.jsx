import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import CountryPopulation from './components/CountryPopulation';
import PopulationChart from './components/PopulationChart';
import CountryPopulationChart from './components/CountryPopulationChart';
import { downloadAsJSON, downloadAsCSV } from './components/downloadUtils'; // Import functions

const CompactLegend = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const legendOptions = [
    { label: 'Low Population (< 1M)', color: 'bg-green-200' },
    { label: 'Medium Pop. (1M - 5M)', color: 'bg-yellow-200' },
    { label: 'Over-Populated (> 5M)', color: 'bg-red-200' },
  ];

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

const App = () => {
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [showCountryList, setShowCountryList] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => {
        const nextPosition = prev + direction * 0.25;
        if (nextPosition >= 100 || nextPosition <= 0) {
          setDirection(-direction);
        }
        return nextPosition;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [direction]);

  const animatedBackgroundStyle = {
    background: 'linear-gradient(135deg, #1D4ED8, #60A5FA, #3B82F6, #2563EB, #93C5FD, #3B82F6, #1D4ED8)',
    backgroundSize: '400% 100%',
    backgroundPosition: `${backgroundPosition}% 50%`,
  };

  const handleSelectCountry = (country) => {
    setSelectedData([country]);
  };

  const toggleView = () => {
    setShowCountryList((prevState) => !prevState);
    setSelectedData([]);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={animatedBackgroundStyle}
    >
      <header className="relative mb-8 py-8">
        <div className="absolute top-10 left-14">
          <h1
            className="text-4xl font-bold"
            style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            <span style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Elanco</span>
          </h1>
        </div>

        <h1
          className="text-4xl font-bold text-center"
          style={{ color: '#FFFFFF', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Population App
        </h1>
        <p className="text-lg mt-2 text-center text-gray-200">
          Explore population statistics by city and country with ease.
        </p>

        <div className="text-center mt-4">
          <button
            className="bg-yellow-300 text-black px-4 py-2 rounded hover:bg-yellow-400"
            onClick={toggleView}
          >
            {showCountryList ? 'Switch to Country Population' : 'Switch to Country-City Population'}
          </button>
        </div>
      </header>

      <div className="flex-grow flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4">
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

          <div className="mt-4 text-center" style={{ transform: 'translateX(-240px)' }}>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2 disabled:opacity-50"
              onClick={() => downloadAsJSON(selectedData, showCountryList)}
              disabled={selectedData.length === 0}
            >
              Download as JSON
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
              onClick={() => downloadAsCSV(selectedData, showCountryList)}
              disabled={selectedData.length === 0}
            >
              Download as CSV
            </button>
          </div>
        </div>
      </div>

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
