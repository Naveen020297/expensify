import Expense from '../models/Expense';

export const createExpense = async (expenseData) => {
    const expense = new Expense(expenseData);
    return await expense.save();
};

export const getExpenses = async () => {
    return await Expense.find();
};

export const updateExpense = async (id, expenseData) => {
    return await Expense.findByIdAndUpdate(id, expenseData, { new: true });
};

export const deleteExpense = async (id) => {
    return await Expense.findByIdAndDelete(id);
};