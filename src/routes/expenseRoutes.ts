import express from 'express';
import { addExpense, fetchExpenses, editExpense, removeExpense } from '../controllers/expenseController';

const router = express.Router();

router.post('/', addExpense);
router.get('/', fetchExpenses);
router.put('/:id', editExpense);
router.delete('/:id', removeExpense);

export default router;