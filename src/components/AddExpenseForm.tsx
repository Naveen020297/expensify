import React, { useState } from 'react';
import { createExpense } from '../services/apiClient';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expense = { amount, description, category };
        await createExpense(expense);
        // Handle success (e.g., reset form or show message)
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