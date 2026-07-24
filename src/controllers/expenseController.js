const Expense = require('../models/expenseModel');

exports.createExpense = async (req, res) => {
    const { amount, category, date, description } = req.body;
    try {
        const expense = new Expense({ amount, category, date, description });
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;
    try {
        const expense = await Expense.findByIdAndUpdate(id, { amount, category, date, description }, { new: true });
        res.status(200).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        await Expense.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};