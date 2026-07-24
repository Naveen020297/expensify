const Expense = require('../models/expenseModel');

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedExpense) return res.status(404).send('Expense not found');
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).send(error);
    }
};