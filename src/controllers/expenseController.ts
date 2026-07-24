import { createExpense, getExpenses, updateExpense, deleteExpense } from '../services/expenseService';

export const addExpense = async (req, res) => {
    try {
        const expense = await createExpense(req.body);
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const fetchExpenses = async (req, res) => {
    try {
        const expenses = await getExpenses();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const editExpense = async (req, res) => {
    try {
        const expense = await updateExpense(req.params.id, req.body);
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeExpense = async (req, res) => {
    try {
        await deleteExpense(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};