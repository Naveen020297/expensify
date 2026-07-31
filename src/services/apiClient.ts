// Import existing logging framework
import logger from '../logging/logger';

// Extend the existing API client with error logging
const apiClient = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorDetails = await response.json();
            logger.error({
                message: 'API Error',
                url,
                status: response.status,
                error: errorDetails,
                timestamp: new Date().toISOString()
            });
            throw new Error(errorDetails.message);
        }
        return response.json();
    } catch (error) {
        logger.error({
            message: 'Fetch Error',
            url,
            error: error.message,
            timestamp: new Date().toISOString()
        });
        throw error;
    }
};

export default apiClient;