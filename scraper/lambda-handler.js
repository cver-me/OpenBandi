const { scrapeAllSources } = require('./scraper');

// AWS Lambda handler function
exports.handler = async (event, context) => {
  console.log('Starting bandi scraping process...');
  
  // Get API key from environment variables
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    console.error('FIRECRAWL_API_KEY environment variable is required');
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'FIRECRAWL_API_KEY environment variable is required'
      })
    };
  }
  
  try {
    console.log('Scraping all sources...');
    const results = await scrapeAllSources(apiKey);
    
    console.log(`Scraping completed. Processed ${results.length} sources`);
    
    // Log summary
    const successfulScrapes = results.filter(r => !r.error).length;
    console.log(`\nScraping summary:`);
    console.log(`- Total sources: ${results.length}`);
    console.log(`- Successful scrapes: ${successfulScrapes}`);
    console.log(`- Failed scrapes: ${results.length - successfulScrapes}`);
    
    // In a future implementation, we would store these results in the database
    // For now, we'll just return them
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Scraping completed successfully',
        sourcesProcessed: results.length,
        successfulScrapes: successfulScrapes,
        failedScrapes: results.length - successfulScrapes,
        results: results
      })
    };
  } catch (error) {
    console.error('Error during scraping:', error.message);
    console.error('Stack trace:', error.stack);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error during scraping process',
        message: error.message
      })
    };
  }
};