const Expense = require('../models/Expense');

// Create a new expense
exports.createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Edit an expense
exports.editExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!expense) {
            return res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) {
            return res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
};