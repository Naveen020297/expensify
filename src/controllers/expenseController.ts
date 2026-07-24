import Expense from '../models/expenseModel';

export const createExpense = async (req, res) => {
    try {
        const expense = new Expense(req.body);
        await expense.save();
        res.status(201).send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id });
        res.status(200).send(expenses);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateExpense = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['amount', 'description', 'category', 'date'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });
        if (!expense) {
            return res.status(404).send();
        }

        updates.forEach((update) => expense[update] = req.body[update]);
        await expense.save();
        res.send(expense);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!expense) {
            return res.status(404).send();
        }
        res.send(expense);
    } catch (error) {
        res.status(500).send(error);
    }
};