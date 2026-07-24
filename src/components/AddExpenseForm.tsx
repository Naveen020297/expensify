import React, { useState } from 'react';
import { createExpense } from '../services/apiClient';
import useExpenseStore from '../store/expenseStore';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const addExpense = useExpenseStore(state => state.addExpense);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expense = { amount: parseFloat(amount), description, category, date: new Date() };
        const response = await createExpense(expense);
        addExpense(response.data);
        setAmount('');
        setDescription('');
        setCategory('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpenseForm;