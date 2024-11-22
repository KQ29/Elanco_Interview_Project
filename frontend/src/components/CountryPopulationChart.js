import React from 'react';
// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  BarElement, // Required for Bar charts
  CategoryScale, // For the X-axis
  LinearScale, // For the Y-axis
  Tooltip, // Displays tooltips when hovering over data points
  Legend, // Displays the legend for datasets
  Title, // Adds a title to the chart
} from 'chart.js';

// Import the Bar component from react-chartjs-2 for rendering bar charts
import { Bar } from 'react-chartjs-2';

// Register the required Chart.js components globally
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const CountryPopulationChart = ({ data }) => {
  // If no data is provided or the data array is empty, don't render the chart
  if (!data || data.length === 0) {
    return <p></p>; // Return message if no data
  }

  // Prepare the data object for the Bar chart
  const chartData = {
    labels: data.map((item) => item.name), // Use country names as labels
    datasets: [
      {
        label: 'Population',
        data: data.map((item) => item.population || 0), // Extract population data
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        barThickness: 50, // Adjust the thickness of each bar
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
    scales: {
      x: {
        title: {
          display: true,
          text: 'Countries', // Label for the X-axis
        },
      },
      y: {
        title: {
          display: true,
          text: 'Population', // Label for the Y-axis
        },
        beginAtZero: true, // Start Y-axis at zero
        ticks: {
          callback: (value) => value.toLocaleString(), // Format numbers with commas
        },
      },
    },
  };

  // Render the chart inside a styled container
  return (
    <div
      className="flex justify-center items-center w-full bg-white shadow-lg p-4 border rounded-lg"
      style={{
        height: '600px', // Set the height of the container
        width: '100%', // Ensure the container takes the full width
      }}
    >
      {/* Render the Bar chart with the prepared data and options */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CountryPopulationChart;
