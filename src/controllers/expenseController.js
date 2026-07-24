const Expense = require('../models/expenseModel');

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving expenses' });
    }
};

exports.createExpense = async (req, res) => {
    const { userId, amount, description, category, date } = req.body;
    const expense = new Expense({ userId, amount, description, category, date });
    try {
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: 'Error creating expense' });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, description, category, date } = req.body;
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(id, { amount, description, category, date }, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(400).json({ message: 'Error updating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: 'Error deleting expense' });
    }
};
