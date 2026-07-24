import React from 'react';
import { deleteExpense } from '../services/apiClient';

const DeleteExpenseButton = ({ expenseId, onDeleted }) => {
    const handleDelete = async () => {
        await deleteExpense(expenseId);
        onDeleted(); // Callback to refresh the expense list
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteExpenseButton;