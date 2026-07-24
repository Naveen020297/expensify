import React, { useState } from 'react';
import { createExpense } from '../services/apiClient';

const AddExpenseForm = () => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createExpense({ amount, category, date, description });
        // Handle success (e.g., reset form or show message)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description"></textarea>
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default AddExpenseForm;