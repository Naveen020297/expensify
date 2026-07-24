const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Create a new expense
router.post('/', expenseController.createExpense);

// Get all expenses
router.get('/', expenseController.getExpenses);

// Edit an expense
router.put('/:id', expenseController.editExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;