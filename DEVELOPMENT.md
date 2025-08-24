# Development Setup Guide

This guide will help you set up your development environment for the Bandi Aggregator project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [PostgreSQL](https://www.postgresql.org/) (for the API database)
- [Git](https://git-scm.com/)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bandi-aggregator.git
   cd bandi-aggregator
   ```

2. Install dependencies for all components:
   ```bash
   npm run install-all
   ```

   This command will install dependencies for the main project, scraper, API, and frontend components.

## Setting Up Environment Variables

### API Component

1. Navigate to the API directory:
   ```bash
   cd api
   ```

2. Create a `.env` file based on the example:
   ```bash
   cp .env.example .env
   ```

3. Edit the `.env` file and fill in the required values:
   - `DB_HOST`: Your PostgreSQL host (usually localhost)
   - `DB_PORT`: Your PostgreSQL port (usually 5432)
   - `DB_NAME`: Database name for the project
   - `DB_USER`: Your PostgreSQL username
   - `DB_PASSWORD`: Your PostgreSQL password
   - `FIRECRAWL_API_KEY`: Your Firecrawl API key (required for scraping)

### Scraper Component

1. Navigate to the scraper directory:
   ```bash
   cd scraper
   ```

2. Create a `.env` file:
   ```bash
   echo "FIRECRAWL_API_KEY=your_firecrawl_api_key" > .env
   ```

3. Replace `your_firecrawl_api_key` with your actual Firecrawl API key.

## Database Setup

1. Create a PostgreSQL database for the project:
   ```sql
   CREATE DATABASE bandi_aggregator;
   ```

2. (Optional) Create a dedicated user for the application:
   ```sql
   CREATE USER bandi_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE bandi_aggregator TO bandi_user;
   ```

## Running the Application

### Development Mode

To run both the API and frontend in development mode simultaneously:

```bash
npm run dev
```

This will start:
- API server on http://localhost:3001
- Frontend development server on http://localhost:3000

### Running Components Individually

#### Scraper

To run the scraper:

```bash
npm run scrape
```

#### API

To run the API server:

```bash
cd api
npm start
```

Or for development with auto-restart:

```bash
cd api
npm run dev
```

#### Frontend

To run the frontend development server:

```bash
cd frontend
npm start
```

## Project Structure

The project is organized into three main components:

1. **Scraper** (`/scraper`): Responsible for fetching data from various sources using the Firecrawl API.
2. **API** (`/api`): Provides a RESTful interface to access the funding opportunities data.
3. **Frontend** (`/frontend`): A React application that provides a user-friendly interface to browse and search funding opportunities.

## Development Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and test them locally.

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request on GitHub.

## Code Style

This project uses ESLint for code linting. Before committing, ensure your code follows the established style by running:

```bash
npm run lint
```

## Testing

(To be implemented)

## Troubleshooting

If you encounter any issues during setup, please check:

1. All prerequisites are installed and accessible from your command line.
2. Environment variables are correctly set.
3. PostgreSQL is running and accessible.
4. Firecrawl API key is valid.

If you're still having issues, please open a GitHub issue with details about the problem.