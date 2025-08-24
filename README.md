# Bandi Aggregator

An open-source aggregator for Italian startup funding opportunities ("Bandi").

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Overview

This project aims to create a definitive, open-source, and perpetually free-to-use platform that serves as the single source of truth for all public funding opportunities relevant to Italian startups. It systematically dismantles the information silos that currently define the landscape by leveraging automated data aggregation and presenting it through a clean, intuitive, and powerful user interface.

The Italian startup ecosystem is supported by a rich and diverse array of public funding opportunities, locally known as *bandi*. However, the potential of this system is fundamentally undermined by a critical flaw: extreme information fragmentation. Funding opportunities are scattered across a vast and disconnected network of government websites at the national, regional, provincial, and municipal levels.

The Bandi Aggregator solves this problem by:

1. Automatically scraping and aggregating funding opportunities from official government sources
2. Standardizing the data into a consistent format
3. Providing a powerful search and filtering interface
4. Offering alerts and bookmarks for personalized tracking

## Features (MVP)

- **Unified Search Engine**: Find all relevant funding opportunities through a single search interface
- **Advanced Filtering System**: Filter by:
  - Geography (Region, Province, Municipality)
  - Status (Open, Closing Soon, Closed)
  - Funding Type (Grants, Zero-interest Loans, Tax Credits, Vouchers, etc.)
  - Beneficiary Profile (Startup Innovativa, Impresa Giovanile, Impresa Femminile, PMI)
  - Industry/Sector
- **Standardized Bando Detail Page**: Consistent presentation of all funding opportunities with:
  - Key Information Box (Issuing Body, Deadline, Funding Amount, Type)
  - Concise Summary
  - Eligibility Checklist
  - Eligible Expenses List
  - Direct Link to Official Source
- **User Accounts**: Personalization features including:
  - Saved Searches
  - Bookmarking ("Favorites" or "Watchlist")
  - Email Alerts for new matching opportunities

## Technology Stack

- **Data Acquisition**: [Firecrawl API](https://www.firecrawl.dev/) for robust web scraping
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Deployment**: Vercel for frontend, AWS Lambda or similar for backend

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- Firecrawl API key (get one at https://www.firecrawl.dev/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bandi-aggregator.git
   cd bandi-aggregator
   ```

2. Install dependencies for all components:
   ```bash
   npm run install-all
   ```

3. Set up environment variables (see [DEVELOPMENT.md](DEVELOPMENT.md) for detailed instructions)

4. Run the application in development mode:
   ```bash
   npm run dev
   ```

For more detailed development setup instructions, please see [DEVELOPMENT.md](DEVELOPMENT.md).

## Project Structure

```
bandi-aggregator/
├── scraper/          # Data acquisition component
├── api/              # REST API backend
├── frontend/         # Next.js frontend application
│   ├── src/
│   │   ├── app/      # App router pages
│   │   │   ├── page.tsx (Homepage)
│   │   │   ├── bando/[id]/page.tsx (Bando detail page)
│   │   │   ├── layout.tsx (Root layout)
│   │   │   └── globals.css (Global styles)
│   │   └── components/ (Future components)
├── docs/             # Project documentation
├── README.md         # This file
├── LICENSE           # MIT License
├── CONTRIBUTING.md   # Contribution guidelines
└── DEVELOPMENT.md    # Development setup guide
```

## Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details on how to get involved.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was inspired by the need to democratize access to public funding opportunities for Italian startups.
- Thanks to [Firecrawl](https://www.firecrawl.dev/) for providing an excellent web scraping API.
- This project follows the principles of open source software development.