import React, { useState } from 'react';
import { updateExpense } from '../services/apiClient';

const EditExpenseForm = ({ expense, onUpdate }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedExpense = { amount, description, category };
        await updateExpense(expense.id, updatedExpense);
        onUpdate(); // Call the parent function to refresh the expense list
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type='text' value={category} onChange={(e) => setCategory(e.target.value)} required />
            <button type='submit'>Update Expense</button>
        </form>
    );
};

export default EditExpenseForm;