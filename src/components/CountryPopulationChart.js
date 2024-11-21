import React from 'react';
// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  ArcElement, // Required for Pie and Doughnut charts
  Tooltip, // Displays tooltips when hovering over data points
  Legend, // Displays the legend for datasets
  Title, // Adds a title to the chart
} from 'chart.js';

// Import the Pie component from react-chartjs-2 for rendering pie charts
import { Pie } from 'react-chartjs-2';

// Register the required Chart.js components globally
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CountryPopulationChart = ({ data }) => {
  // If no data is provided or the data array is empty, don't render the chart
  if (!data || data.length === 0) {
    return <p></p>; // Return message if no country is selected
  }

  // Prepare the data object for the Pie chart
  const chartData = {
    labels: data.map((item) => item.name), // Use country names as labels
    datasets: [
      {
        label: 'Population',
        data: data.map((item) => item.population || 0), // Extract population data
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgba(75, 192, 192, 0.6)', // Teal
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
        ], // Colors for each segment
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow the chart to adjust its height independently of its width
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top of the chart
      },
      title: {
        display: true, // Display the chart title
        text: 'Country Population Distribution', // Text for the chart title
      },
    },
  };

  // Render the chart inside a styled container
  return (
    <div
      className="flex justify-center items-center w-full bg-white shadow-lg p-4 border rounded-lg"
      style={{
        height: '600px', // Increase the height of the container to make the chart larger
        width: '100%', // Ensure the container takes the full width
      }}
    >
      {/* Render the Pie chart with the prepared data and options */}
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default CountryPopulationChart; // Export the PopulationChart component for use in other parts of the app
