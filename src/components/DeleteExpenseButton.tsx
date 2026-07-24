import React from 'react';
import { deleteExpense } from '../services/apiClient';

const DeleteExpenseButton = ({ expenseId, onDelete }) => {
    const handleDelete = async () => {
        await deleteExpense(expenseId);
        onDelete(); // Callback to refresh the expense list
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteExpenseButton;