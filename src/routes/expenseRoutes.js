const express = require('express');
const { deleteExpense } = require('../controllers/expenseController');

const router = express.Router();

// Other routes...

router.delete('/expenses/:id', deleteExpense);

module.exports = router;