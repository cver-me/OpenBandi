const axios = require('axios');

// Firecrawl API base URL
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v0';

// Example sources from the PRD
const sources = [
  {
    name: 'Invitalia',
    url: 'https://www.invitalia.it/sites/it-it/bandi-e-avvisi/Pagine/ElencoBandi.aspx',
    tier: 'National'
  },
  {
    name: 'Incentivi.gov.it',
    url: 'https://www.incentivi.gov.it/cerca',
    tier: 'National'
  },
  {
    name: 'Italia Domani (PNRR)',
    url: 'https://www.italiadomani.gov.it/content/it/finanziamenti-e-bandi.html',
    tier: 'National'
  },
  {
    name: 'MIMIT Incentivi',
    url: 'https://www.mimit.gov.it/it/incentivi',
    tier: 'National'
  },
  {
    name: 'Regione Lombardia',
    url: 'https://bandi.regione.lombardia.it',
    tier: 'Regional'
  },
  {
    name: 'Regione Lazio',
    url: 'https://www.regione.lazio.it/rl_main/?vw=bandi',
    tier: 'Regional'
  }
];

// Function to scrape a single source using Firecrawl
async function scrapeSource(source, apiKey) {
  try {
    console.log(`Scraping ${source.name}...`);
    
    // Scrape the page using Firecrawl
    const response = await axios.post(
      `${FIRECRAWL_API_URL}/scrape`,
      {
        url: source.url
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Extract structured data using Firecrawl's extract endpoint
    const extractResponse = await axios.post(
      `${FIRECRAWL_API_URL}/extract`,
      {
        data: response.data.data,
        schema: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            deadline: { type: 'string' },
            funding_amount: { type: 'string' },
            eligibility: { type: 'string' }
          },
          required: ['title', 'description']
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log(`Successfully scraped ${source.name}`);
    return {
      source: source.name,
      tier: source.tier,
      data: extractResponse.data.data
    };
  } catch (error) {
    console.error(`Error scraping ${source.name}:`, error.message);
    return null;
  }
}

// Main function to scrape all sources
async function scrapeAllSources(apiKey) {
  const results = [];
  
  for (const source of sources) {
    const result = await scrapeSource(source, apiKey);
    if (result) {
      results.push(result);
    }
    // Add a delay to be respectful to the servers
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  return results;
}

module.exports = {
  scrapeAllSources
};