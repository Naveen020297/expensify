import React, { useState } from 'react';
import { updateExpense } from '../services/apiClient';
import useExpenseStore from '../store/expenseStore';

const EditExpenseForm = ({ expense }) => {
    const [amount, setAmount] = useState(expense.amount);
    const [description, setDescription] = useState(expense.description);
    const [category, setCategory] = useState(expense.category);
    const updateExpenseInStore = useExpenseStore(state => state.updateExpense);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedExpense = { ...expense, amount, description, category };
        await updateExpense(expense.id, updatedExpense);
        updateExpenseInStore(expense.id, updatedExpense);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <button type="submit">Update Expense</button>
        </form>
    );
};

export default EditExpenseForm;