const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// DELETE /api/expenses/:id
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;