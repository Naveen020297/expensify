import React, { useEffect, useState } from 'react';
import { deleteExpense } from '../services/apiClient';

const ExpenseList = ({ expenses, setExpenses }) => {
    const handleDelete = async (id) => {
        await deleteExpense(id);
        setExpenses(expenses.filter(expense => expense.id !== id));
    };

    return (
        <ul>
            {expenses.map(expense => (
                <li key={expense.id}>
                    {expense.description} - ${expense.amount} 
                    <button onClick={() => handleDelete(expense.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
