const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get all expenses
router.get('/expenses', expenseController.getAllExpenses);

// Create a new expense
router.post('/expenses', expenseController.createExpense);

// Update an expense
router.put('/expenses/:id', expenseController.updateExpense);

// Delete an expense
router.delete('/expenses/:id', expenseController.deleteExpense);

module.exports = router;
