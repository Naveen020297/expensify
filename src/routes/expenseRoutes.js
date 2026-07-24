const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.put('/expenses/:id', expenseController.updateExpense);

module.exports = router;