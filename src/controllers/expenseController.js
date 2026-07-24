const Expense = require('../models/expenseModel');

// Controller to get all expenses
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id }); // Assuming user ID is available in req.user
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};