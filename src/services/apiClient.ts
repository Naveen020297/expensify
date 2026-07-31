// Import the logging library if available
import logger from 'your-logging-library';

// Function to handle API requests
async function apiRequest(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            // Log error details
            logger.error(`API Error: ${response.status} - ${response.statusText}`, { url, options });
        }
        return response;
    } catch (error) {
        // Log error details
        logger.error('API Request Failed', { error, url, options });
        throw error;
    }
}

export { apiRequest };