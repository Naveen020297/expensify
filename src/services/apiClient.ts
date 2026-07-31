// Existing code...

// Import the logging library
const logger = require('your-logging-library');

// Error logging middleware
function errorLoggingMiddleware(err, req, res, next) {
    logger.error({
        timestamp: new Date().toISOString(),
        message: err.message,
        stack: err.stack,
        request: {
            method: req.method,
            url: req.originalUrl,
            body: req.body,
            params: req.params,
            query: req.query
        }
    });
    next(err);
}

// Apply the middleware to your API routes
app.use(errorLoggingMiddleware);

// Existing code...