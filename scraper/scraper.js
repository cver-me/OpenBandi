const axios = require('axios');

// Firecrawl API base URL (updated to v1)
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1';

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

// Function to scrape a single source using Firecrawl with retry logic
async function scrapeSource(source, apiKey, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Scraping ${source.name} at URL: ${source.url} (attempt ${attempt}/${retries})`);
      
      // Scrape the page and extract structured data in one call using Firecrawl v1 API
      const response = await axios.post(
        `${FIRECRAWL_API_URL}/scrape`,
        {
          url: source.url,
          formats: ['markdown', 'extract'],
          onlyMainContent: true, // Focus on main content
          extract: {
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
          }
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          timeout: 60000 // Increased timeout to 60 seconds for slow sites
        }
      );
      
      console.log(`Received response for ${source.name}:`, response.status);
      
      // Check if the scrape was successful
      if (response.data.success !== true) {
        throw new Error(`Scraping failed for ${source.name}: ${response.data.error || 'Unknown error'}`);
      }
      
      // Log extracted data for verification
      console.log(`Extracted data for ${source.name}:`, JSON.stringify(response.data.data.extract, null, 2));
      
      console.log(`Successfully scraped and extracted data for ${source.name}`);
      return {
        source: source.name,
        tier: source.tier,
        url: source.url,
        scraped_at: new Date().toISOString(),
        data: response.data.data.extract || response.data.data
      };
    } catch (error) {
      console.error(`Error scraping ${source.name} (attempt ${attempt}/${retries}):`, error.message);
      if (error.response) {
        console.error(`Response data for ${source.name}:`, JSON.stringify(error.response.data, null, 2));
      }
      
      // If this was the last attempt, return the error
      if (attempt === retries) {
        return {
          source: source.name,
          tier: source.tier,
          url: source.url,
          scraped_at: new Date().toISOString(),
          error: error.message
        };
      }
      
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 5000 * attempt));
    }
  }
}

// Main function to scrape all sources
async function scrapeAllSources(apiKey) {
  console.log(`Starting scraping process for ${sources.length} sources...`);
  
  const results = [];
  
  for (const source of sources) {
    const result = await scrapeSource(source, apiKey);
    results.push(result);
    
    // Add a delay to be respectful to the servers
    await new Promise(resolve => setTimeout(resolve, 3000));
  }
  
  console.log(`Scraping process completed. Processed ${results.length} sources.`);
  return results;
}

module.exports = {
  scrapeAllSources,
  sources
};