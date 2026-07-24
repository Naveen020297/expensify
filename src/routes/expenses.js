// Express Router for Expense API
const express = require('express');
const { createExpense, getExpenses, editExpense, deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

// Create a new expense
router.post('/', createExpense);

// Retrieve all expenses
router.get('/', getExpenses);

// Edit an existing expense
router.put('/:id', editExpense);

// Delete an expense
router.delete('/:id', deleteExpense);

module.exports = router;