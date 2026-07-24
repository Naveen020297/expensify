import express from 'express';
import { addExpense, listExpenses, modifyExpense, removeExpense } from '../controllers/expenseController';

const router = express.Router();

router.post('/', addExpense);
router.get('/', listExpenses);
router.put('/:id', modifyExpense);
router.delete('/:id', removeExpense);

export default router;