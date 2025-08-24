const { scrapeAllSources } = require('./scraper');

// Get API key from environment variables
const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  console.error('FIRECRAWL_API_KEY environment variable is required');
  process.exit(1);
}

// Scrape all sources and output results
async function main() {
  console.log('Starting bandi scraping...');
  
  try {
    const results = await scrapeAllSources(apiKey);
    
    console.log('\nScraping completed. Results:');
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error during scraping:', error.message);
    process.exit(1);
  }
}

main();