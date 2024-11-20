import React from 'react';
// Import necessary components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale, // Handles categories on the x-axis
  LinearScale, // Handles linear scales on the y-axis
  BarElement, // Renders the bars in the chart
  Title, // Adds a title to the chart
  Tooltip, // Displays tooltips when hovering over data points
  Legend, // Displays the legend for datasets
} from 'chart.js';

// Import the Bar component from react-chartjs-2 for rendering bar charts
import { Bar } from 'react-chartjs-2';

// Register the required Chart.js components globally so they can be used in the chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PopulationChart = ({ data }) => {
  // If no data is provided or the data array is empty, don't render the chart
  if (!data || data.length === 0) {
    return null; // Return nothing if no city is selected
  }

  // Prepare the data object for the Bar chart
  const chartData = {
    labels: data.map((item) => item.city), // Use city names as labels on the x-axis
    datasets: [
      {
        label: 'Population', // Label for the dataset
        data: data.map((item) => item.populationCounts[0]?.value || 0), // Extract population data
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Semi-transparent teal color for the bars
        borderColor: 'rgba(75, 192, 192, 1)', // Solid teal color for the bar borders
        borderWidth: 1, // Width of the bar borders
        barThickness: 50, // Adjust the thickness of each bar
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true, // Make the chart responsive to screen size
    maintainAspectRatio: false, // Allow the chart to adjust its height independently of its width
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top of the chart
      },
      title: {
        display: true, // Display the chart title
        text: 'Population Chart', // Text for the chart title
      },
    },
    scales: {
      x: {
        title: {
          display: true, // Display title for the x-axis
          text: 'Cities', // Text for the x-axis title
        },
      },
      y: {
        title: {
          display: true, // Display title for the y-axis
          text: 'Population', // Text for the y-axis title
        },
        ticks: {
          callback: (value) => value.toLocaleString(), // Format population numbers with commas
        },
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
      {/* Render the Bar chart with the prepared data and options */}
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default PopulationChart; // Export the PopulationChart component for use in other parts of the app
