const express = require('express');
const app = express();

// Import your error logging middleware
const errorLoggingMiddleware = require('./services/apiClient').errorLoggingMiddleware;

// Existing middleware and routes...

// Use the error logging middleware
app.use(errorLoggingMiddleware);

// Existing code...