const Expense = require('../models/Expense');

exports.createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!expense) return res.status(404).send();
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndDelete(req.params.id);
        if (!expense) return res.status(404).send();
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
};