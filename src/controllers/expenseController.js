const Expense = require('../models/expenseModel');

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        await Expense.findByIdAndDelete(id);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting expense', error });
    }
};