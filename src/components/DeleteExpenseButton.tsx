import React from 'react';
import { deleteExpense } from '../services/apiClient';
import useExpenseStore from '../store/expenseStore';

const DeleteExpenseButton = ({ expense }) => {
    const deleteExpenseFromStore = useExpenseStore(state => state.deleteExpense);

    const handleDelete = async () => {
        await deleteExpense(expense.id);
        deleteExpenseFromStore(expense.id);
    };

    return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteExpenseButton;