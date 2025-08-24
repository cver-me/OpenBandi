# Bandi Aggregator - Documentation

## Project Structure

```
bandi-aggregator/
├── scraper/
│   ├── index.js
│   ├── scraper.js
│   └── package.json
├── api/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── pages/
│   │       ├── HomePage.js
│   │       └── BandoDetailPage.js
│   └── package.json
├── README.md
├── package.json
└── .gitignore
```

## Components

### Scraper

The scraper component is responsible for fetching data from various sources using the Firecrawl API. It's designed to be run periodically to keep the database updated with the latest funding opportunities.

Key files:
- `scraper.js`: Contains the scraping logic
- `index.js`: Entry point for the scraper

### API

The API component provides a RESTful interface to access the funding opportunities data. It's built with Express.js and connects to a PostgreSQL database.

Key files:
- `index.js`: Main server file with routes

### Frontend

The frontend component is a React application that provides a user-friendly interface to browse and search funding opportunities.

Key files:
- `App.js`: Main application component with routing
- `HomePage.js`: Displays the list of funding opportunities with filtering
- `BandoDetailPage.js`: Shows detailed information about a specific funding opportunity

## Getting Started

1. Clone the repository
2. Install dependencies for each component:
   ```
   cd scraper && npm install
   cd ../api && npm install
   cd ../frontend && npm install
   ```
3. Set up environment variables (see .env.example files)
4. Run each component:
   ```
   cd scraper && npm start
   cd ../api && npm start
   cd ../frontend && npm start
   ```

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

This project is licensed under the MIT License.