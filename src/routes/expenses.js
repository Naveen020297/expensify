const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// DELETE an expense by ID
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;