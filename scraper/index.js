const { scrapeAllSources } = require('./scraper');
const Database = require('./database');

// Get API key from environment variables
const apiKey = process.env.FIRECRAWL_API_KEY;

if (!apiKey) {
  console.error('FIRECRAWL_API_KEY environment variable is required');
  process.exit(1);
}

// Scrape all sources and store results
async function main() {
  console.log('Starting bandi scraping...');
  
  // Initialize database connection
  const db = new Database();
  await db.connect();
  
  try {
    const results = await scrapeAllSources(apiKey);
    
    console.log('\nScraping completed. Results:');
    console.log(`Successfully processed ${results.length} sources`);
    
    // Store results in database (placeholder)
    for (const result of results) {
      await db.storeBando(result);
    }
    
    // Log summary
    const successfulScrapes = results.filter(r => !r.error).length;
    console.log(`\nScraping summary:`);
    console.log(`- Total sources: ${results.length}`);
    console.log(`- Successful scrapes: ${successfulScrapes}`);
    console.log(`- Failed scrapes: ${results.length - successfulScrapes}`);
    
    // Close database connection
    await db.close();
    
    // Exit successfully
    console.log('\nScraping process completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error during scraping:', error.message);
    console.error('Stack trace:', error.stack);
    
    // Close database connection even if there's an error
    await db.close();
    
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

main();