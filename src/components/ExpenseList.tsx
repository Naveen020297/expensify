import React from 'react';
import { deleteExpense } from '../services/apiClient';

const ExpenseList = ({ expenses, setExpenses }) => {
    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            setExpenses(expenses.filter(expense => expense.id !== id));
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.description} - {expense.amount} 
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;