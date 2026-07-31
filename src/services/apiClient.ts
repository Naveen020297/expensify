// Import logging library
import logger from '../utils/logger';

// Example API call with error logging
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        // Log error details
        logger.error({
            message: error.message,
            stack: error.stack,
            url: url,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
}

export { fetchData };