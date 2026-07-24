// Express Router for expense-related endpoints
const express = require('express');
const { createExpense, getExpenses, deleteExpense, editExpense } = require('../controllers/expenseController');

const router = express.Router();

// Create a new expense
router.post('/', createExpense);

// Get all expenses
router.get('/', getExpenses);

// Edit an expense
router.put('/:id', editExpense);

// Delete an expense
router.delete('/:id', deleteExpense);

module.exports = router;