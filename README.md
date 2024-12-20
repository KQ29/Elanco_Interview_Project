# Elanco Population App

## Overview

The Elanco Population App is a React-based web application that retrieves and displays population data for cities and countries using REST APIs. It provides stakeholders with an easy-to-use interface to explore and visualize population statistics.

This project was developed as part of the Software Engineers – Second Interview Assignment for Elanco, demonstrating technical and problem-solving skills.

---

## Features

### Dynamic Data Retrieval:

- **Fetches city population and country flag data from REST APIs**.
- **Supports flag retrieval using fallback APIs for missing data**.
- **Integrates dynamic fetching based on city names in the "Country-City Population Data" view**.

### Search and Filter:

- **Allows users to search cities and countries dynamically**.
- **Filters data in real time based on user input**.

### Data Export:

- **Enables exporting population data as JSON or CSV**.
- **Exports include dynamically fetched flags and handles missing data gracefully**.

### Interactive Visualization:

- **Displays population data through a bar chart using Chart.js**.
- **Chart updates dynamically based on user selection**.

### Modern Design:

- **A clean, responsive UI for enhanced usability**.
- **Interactive legends for population categorization**.

---

## Technologies Used

- **Frontend Framework**: React  
- **Styling**: Tailwind CSS  
- **Data Visualization**: Chart.js and React-Chart.js-2  
- **API Requests**: Axios  
- **Primary API Source**: Countries Now API  
- **Secondary API Source**: REST Countries API (for flag fallback) 

---

## API Endpoints Used

### City Population Data
- **Endpoint**: `https://countriesnow.space/api/v0.1/countries/population/cities`  
- **Method**: GET  
- **Purpose**: Fetches city population data.  

### Country Flags
- **Endpoint**: `https://countriesnow.space/api/v0.1/countries/flag/images`  
- **Method**: GET  
- **Purpose**: Fetches flag images for countries.

### Fallback Flags
- **Endpoint**: `https://restcountries.com/v3.1/name/{country}`  
- **Method**: GET  
- **Purpose**: Retrieves flag images for missing flags.  

---

## Installation and Setup

### Prerequisites

**Node.js and npm installed on your machine**.

### Steps

Clone the Repository:

```bash
git clone https://github.com/KQ29/Elanco_Interview_Project.git
cd Elanco_Interview_Project
```

### Install Dependencies:

``` bash
npm install
```

### Start the Development Server:

``` bash
npm start
```

**Open http://localhost:3000 in your browser to view the app**.

### Build for Production:

```bash
npm run build
```
---

## Development Stages

1. **Problem Understanding**  
The stakeholders needed a web app to display country and population data.

   **Key requirements**:
   - Consume REST APIs to fetch data.
   - Display the data in a visual and interactive format.
   - Provide a user-friendly experience.

2. **API Integration**  
   Implemented API calls using Axios:
   - `getPopulationData`: Fetches population data for cities.
   - `getCountryFlags`: Retrieves flag images for countries.
   - Fallback logic for missing flags via the REST Countries API.

3. **Component Development**  
   **CountryList Component**:
   - Displays countries, cities, and populations in a list format.
   - Includes a search bar for filtering results dynamically.  
   **PopulationChart Component**:
   - Uses Chart.js to render an interactive bar chart.
   - Dynamically updates based on user-selected data.

4. **Interactive Design**  
   - Added a sticky chart to enhance usability.
   - Used Tailwind CSS for a clean and consistent design.
   - Added dynamic legends with population categories.

5. **Data Export Feature**  
   - Implemented JSON and CSV download functionality.
   - Included dynamically fetched flags in the exported data.

6. **Enhancements**  
   - Added API error handling to gracefully manage issues.
   - Focused on modular and reusable components.

---

## How It Works

### Main Heading
- Displays the title **"Elanco Population App"** with a visually appealing design.

### Country List
- Dynamically loads cities and countries with their populations.
- Includes a search bar for real-time filtering.

### Population Chart
- Provides an interactive bar chart for visualizing population data.
- Updates dynamically based on user selection.

### Data Export
- Allows users to export population data in JSON or CSV formats.
- Dynamically retrieves flags for cities in State 1 (Country-City Population Data).

---

## Assessment Criteria

### Technical
- **Technical Approach**: Leveraged React, Axios, and Chart.js to meet functional and visual requirements.
- **Ease of Use**: Simple and intuitive design for non-technical stakeholders.
- **Readability**: Code is modular, well-structured, and thoroughly commented.

### Non-Technical
- **Problem Understanding**: Implemented all requirements while adhering to best practices.
- **Presentation Clarity**: The app demonstrates how it solves the problem effectively.

---

## Future Enhancements

### Additional Features
- Include capital city data using the `/countries/capital` API.

### User Authentication
- Allow users to save favorite countries or cities.

### Advanced Data Handling
- Support additional data formats (e.g., XML or Excel).

### Enhanced Visualizations
- Add pie charts or line graphs for deeper insights.

### Localization
- Add multi-language support for a global audience.

---

## Author

**Kamronbek Ibragimov**  

---

## License
This project is licensed under the MIT License.