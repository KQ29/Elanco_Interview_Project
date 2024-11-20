import React from 'react'; // Import React library
import ReactDOM from 'react-dom'; // Import ReactDOM for rendering components to the DOM
import './index.css'; // Import global CSS styles
import App from './App'; // Import the root component (App)

// Render the App component inside the root DOM node
ReactDOM.render(
  <React.StrictMode>
    {/* React.StrictMode helps detect potential issues in an application */}
    <App />
  </React.StrictMode>,
  document.getElementById('root') // The root DOM node in the HTML where the React app will be injected
);
