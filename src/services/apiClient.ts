// Import necessary logging library
import logger from '../utils/logger';

// Example function to demonstrate error logging
export const apiCall = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        // Log the error details
        logger.error({
            message: error.message,
            stack: error.stack,
            url,
            options
        });
        throw error;
    }
};