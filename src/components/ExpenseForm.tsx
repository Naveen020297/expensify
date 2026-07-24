import React, { useState } from 'react';
import { createExpense, updateExpense } from '../services/apiClient';

const ExpenseForm = ({ expense, onSubmit }) => {
    const [amount, setAmount] = useState(expense ? expense.amount : '');
    const [description, setDescription] = useState(expense ? expense.description : '');
    const [category, setCategory] = useState(expense ? expense.category : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { amount, description, category };
        if (expense) {
            await updateExpense(expense.id, expenseData);
        } else {
            await createExpense(expenseData);
        }
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' required />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='Description' required />
            <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} placeholder='Category' required />
            <button type='submit'>{expense ? 'Update' : 'Add'} Expense</button>
        </form>
    );
};

export default ExpenseForm;